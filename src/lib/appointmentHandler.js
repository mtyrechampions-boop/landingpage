/* global process */
// Server-side handling of a booking request. Kept out of the route file so it can be unit tested
// with a fake Strapi, and because Next only allows HTTP-method exports from a route module.
import {
  validateBooking,
  SERVICE_MODES,
  describeTiming,
  describeTyre,
  formatDateLabel,
  googleMapsLink,
  tyreSizeLabel,
  BUSINESS_PHONE_DISPLAY,
} from './booking.js';
import { parsePostcode } from './postcode.js';
import { lookupPostcode } from './postcodeLookup.js';
import { assessCoverage } from './coverage.js';
import { buildAppointmentPayload, STRAPI_API_URL as DEFAULT_STRAPI_API_URL } from '../api/appointmentService.js';

const MAX_BODY_CHARS = 20_000;
const UPSTREAM_TIMEOUT_MS = 12_000;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_REQUESTS = 12;
const DEDUPE_TTL_MS = 30 * 60 * 1000;

/**
 * In-memory duplicate and rate-limit tracking. On a serverless host each instance keeps its own
 * copy, so this stops accidental double submits (the realistic case: a double tap or a retry
 * straight after a slow response) but is not a hard guarantee across instances.
 */
export const createStore = () => ({ requests: new Map(), attempts: new Map() });
const defaultStore = createStore();

const json = (body, status = 200, headers = {}) =>
  Response.json(body, { status, headers: { 'Cache-Control': 'no-store', ...headers } });

const fail = (status, code, message, extra = {}, headers = {}) =>
  json({ ok: false, code, message, ...extra }, status, headers);

const clientIp = (request) =>
  (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || request.headers.get('x-real-ip') || 'unknown';

const prune = (map, ttl, now) => {
  for (const [key, value] of map) {
    const at = Array.isArray(value) ? value[value.length - 1] : value.at;
    if (now - at > ttl) map.delete(key);
  }
};

const nearestSlot = (now) => {
  const hour = Number(
    new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', hour: '2-digit', hour12: false }).format(new Date(now))
  );
  if (hour < 12) return '7am - 12pm';
  if (hour < 17) return '12pm - 5pm';
  return '5pm - 12am';
};

const STRAPI_FIELD_TO_FORM_FIELD = {
  fullName: 'fullName',
  phoneNumber: 'phoneNumber',
  email: 'email',
  postcode: 'postcode',
  address: 'address',
  vehicleReg: 'vehicleReg',
  tyreSize: 'tyreWidth',
  timingSlot: 'date',
};

const describeCoverage = async (postcode, fetchImpl) => {
  const parsed = parsePostcode(postcode);
  if (!parsed) return 'not checked';
  const lookup = await lookupPostcode(parsed, { timeoutMs: 3000, fetchImpl });
  if (!lookup.ok) {
    return lookup.reason === 'not_found' ? 'postcode not found - please verify with the customer' : 'not checked (lookup unavailable)';
  }
  const { status, distanceMiles } = assessCoverage({ outcode: parsed.outcode, lat: lookup.lat, lng: lookup.lng });
  return status === 'covered'
    ? `inside service area (${distanceMiles} mi from Aldershot)`
    : `OUTSIDE usual service area (${distanceMiles} mi from Aldershot) - confirm before dispatch`;
};

const buildFields = (data, mode, coverage, { conservative, now }) => {
  const locationNotes = [
    `Request type: ${mode.label}`,
    `Preferred timing: ${describeTiming(data)}`,
    `Tyre: ${describeTyre(data)}`,
    `Vehicle reg: ${data.vehicleReg}`,
    data.locationNotes && `Location notes: ${data.locationNotes}`,
    data.notes && `Customer notes: ${data.notes}`,
    `Postcode check: ${coverage}`,
    `Map: ${googleMapsLink(data.address, data.postcode)}`,
    'Source: landing page booking form',
  ]
    .filter(Boolean)
    .join('\n');

  // `conservative` sticks to the exact serviceType / timingSlot values the old booking form sent,
  // for the case where Strapi turns out to restrict those two fields to a fixed list.
  const slotWindow = data.mode === 'scheduled' ? data.window : nearestSlot(now);
  return {
    fullName: data.fullName,
    phoneNumber: data.phoneNumber,
    email: data.email,
    vehicleReg: data.vehicleReg,
    postcode: data.postcode,
    address: data.address,
    serviceType: conservative ? 'Mobile Tyre Fitting' : mode.serviceType,
    tyreSize: data.tyreUnknown ? 'Not known - needs help' : tyreSizeLabel(data),
    timingSlot: conservative
      ? `Slot ${slotWindow}`
      : data.mode === 'emergency'
        ? mode.timingSlot
        : `${formatDateLabel(data.date)} - Slot ${data.window}`,
    locationNotes,
  };
};

const sendToStrapi = async (fields, { fetchImpl, env }) => {
  const baseUrl = (env.STRAPI_API_URL || DEFAULT_STRAPI_API_URL).replace(/\/+$/, '');
  const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };
  if (env.STRAPI_API_TOKEN) headers.Authorization = `Bearer ${env.STRAPI_API_TOKEN}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);
  try {
    const response = await fetchImpl(`${baseUrl}/appointments`, {
      method: 'POST',
      headers,
      body: JSON.stringify(buildAppointmentPayload(fields)),
      signal: controller.signal,
    });
    let body = null;
    try {
      body = await response.json();
    } catch {
      body = null;
    }
    return { response, body };
  } finally {
    clearTimeout(timer);
  }
};

const upstreamMessage = (body) =>
  body?.error?.details?.errors?.map((e) => e.message).filter(Boolean).join(' ') || body?.error?.message || '';

export const handleAppointment = async (
  request,
  { fetchImpl = globalThis.fetch, store = defaultStore, env = process.env, clock = Date.now } = {}
) => {
  const now = clock();

  prune(store.attempts, RATE_WINDOW_MS, now);
  prune(store.requests, DEDUPE_TTL_MS, now);

  const ip = clientIp(request);
  const recent = store.attempts.get(ip) ?? [];
  if (recent.length >= RATE_MAX_REQUESTS) {
    return fail(
      429,
      'rate_limited',
      `Too many attempts. Please wait a few minutes, or call us on ${BUSINESS_PHONE_DISPLAY}.`,
      {},
      { 'Retry-After': '600' }
    );
  }
  store.attempts.set(ip, [...recent, now]);

  let body;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_CHARS) return fail(413, 'too_large', 'That request was too large.');
    body = JSON.parse(text);
  } catch {
    return fail(400, 'bad_request', 'We could not read that request. Please reload the page and try again.');
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return fail(400, 'bad_request', 'We could not read that request. Please reload the page and try again.');
  }

  if (typeof body.company_website === 'string' && body.company_website.trim()) {
    return fail(400, 'rejected', `We could not accept that request. Please call us on ${BUSINESS_PHONE_DISPLAY}.`);
  }

  const { ok, errors, data } = validateBooking(body, { now: new Date(now) });
  if (!ok) return fail(422, 'validation', 'Please check the highlighted fields.', { errors });

  const mode = SERVICE_MODES.find((m) => m.id === data.mode);
  const fingerprint = [data.phoneNumber.replace(/\D/g, ''), data.postcode, data.mode, data.date, data.window].join('|');
  const keys = [`key:${data.idempotencyKey}`, `fp:${fingerprint}`];

  for (const key of keys) {
    const existing = store.requests.get(key);
    if (!existing) continue;
    if (existing.state === 'pending') {
      return fail(409, 'in_progress', 'Your request is already being sent. Please wait a moment.');
    }
    return json({ ok: true, duplicate: true, reference: existing.reference });
  }

  keys.forEach((key) => store.requests.set(key, { state: 'pending', at: now }));
  const release = () => keys.forEach((key) => store.requests.delete(key));

  try {
    const coverage = await describeCoverage(data.postcode, fetchImpl);
    let result = await sendToStrapi(buildFields(data, mode, coverage, { conservative: false, now }), { fetchImpl, env });

    if (result.response.status === 400 && /timingSlot|serviceType/.test(JSON.stringify(result.body ?? {}))) {
      result = await sendToStrapi(buildFields(data, mode, coverage, { conservative: true, now }), { fetchImpl, env });
    }

    const { response, body: upstream } = result;

    if (response.ok) {
      const reference = upstream?.data?.documentId ?? upstream?.data?.id;
      if (reference === undefined || reference === null) {
        console.error('[appointments] Strapi answered OK without a record id');
        release();
        return fail(502, 'upstream_unexpected', `We could not confirm that your request was saved. Please call us on ${BUSINESS_PHONE_DISPLAY}.`);
      }
      keys.forEach((key) => store.requests.set(key, { state: 'done', at: now, reference: String(reference) }));
      return json({ ok: true, reference: String(reference) }, 201);
    }

    release();
    console.error(`[appointments] Strapi responded ${response.status}: ${upstreamMessage(upstream)}`);

    if (response.status === 400 || response.status === 422) {
      const fieldErrors = {};
      for (const issue of upstream?.error?.details?.errors ?? []) {
        const field = STRAPI_FIELD_TO_FORM_FIELD[issue?.path?.[0]];
        if (field && issue.message) fieldErrors[field] = issue.message;
      }
      return fail(
        422,
        'upstream_validation',
        upstreamMessage(upstream) || 'Our booking system could not accept some of those details.',
        { errors: fieldErrors }
      );
    }

    return fail(
      502,
      'upstream_error',
      `We could not save your request just now. Your details are still on screen, so please try again, or call us on ${BUSINESS_PHONE_DISPLAY}.`
    );
  } catch (error) {
    release();
    if (error?.name === 'AbortError') {
      return fail(504, 'upstream_timeout', `The booking system took too long to answer. Please try again, or call us on ${BUSINESS_PHONE_DISPLAY}.`);
    }
    console.error('[appointments] unexpected failure:', error?.message);
    return fail(502, 'upstream_error', `We could not reach the booking system. Please try again, or call us on ${BUSINESS_PHONE_DISPLAY}.`);
  }
};
