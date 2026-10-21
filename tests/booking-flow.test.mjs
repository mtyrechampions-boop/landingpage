// Run with: npm test   (Node's built-in test runner, no extra dependencies)
import test from 'node:test';
import assert from 'node:assert/strict';

import { parsePostcode } from '../src/lib/postcode.js';
import { assessCoverage, distanceMiles, SERVICE_HUB } from '../src/lib/coverage.js';
import {
  validateBooking,
  emptyBooking,
  todayInLondon,
  addDays,
  parseTyreSize,
} from '../src/lib/booking.js';
import { handleAppointment, createStore } from '../src/lib/appointmentHandler.js';
import { GET as availabilityGET } from '../src/app/api/availability/route.js';

/* ───────────────────────── helpers ───────────────────────── */

const validBooking = (overrides = {}) => ({
  ...emptyBooking(),
  mode: 'scheduled',
  fullName: 'Sarah Collins',
  phoneNumber: '07700 900123',
  email: 'sarah@example.com',
  vehicleReg: 'ab12 cde',
  postcode: 'gu11 3hy',
  address: '12 High Street, Aldershot',
  date: addDays(todayInLondon(), 3),
  window: '12pm - 5pm',
  tyreWidth: '225',
  tyreProfile: '45',
  tyreRim: '17',
  tyreSpeed: 'W',
  idempotencyKey: crypto.randomUUID(),
  ...overrides,
});

const postRequest = (body, headers = {}) =>
  new Request('http://localhost/api/appointments', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': '203.0.113.7', ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });

const postcodesIoOk = (lat, lng) =>
  new Response(JSON.stringify({ status: 200, result: { latitude: lat, longitude: lng, admin_district: ['Rushmoor'], region: 'South East' } }), {
    status: 200,
  });

const strapiOk = (id = 41) => new Response(JSON.stringify({ data: { id, documentId: `doc${id}` } }), { status: 200 });
const strapiError = (status, message, errors = []) =>
  new Response(JSON.stringify({ error: { status, message, details: { errors } } }), { status });

/** Fake fetch that answers postcodes.io and Strapi separately and records the Strapi calls. */
const fakeNetwork = ({ strapi = () => strapiOk(), postcodes = () => postcodesIoOk(51.2467, -0.7609) } = {}) => {
  const strapiCalls = [];
  const fetchImpl = async (url, init = {}) => {
    if (String(url).includes('postcodes.io')) return postcodes(url, init);
    strapiCalls.push({ url: String(url), init, body: JSON.parse(init.body) });
    return strapi(strapiCalls.length, init);
  };
  return { fetchImpl, strapiCalls };
};

const withGlobalFetch = async (impl, run) => {
  const original = globalThis.fetch;
  globalThis.fetch = impl;
  try {
    return await run();
  } finally {
    globalThis.fetch = original;
  }
};

/* ───────────────────────── postcodes ───────────────────────── */

test('accepts a valid partial postcode', () => {
  assert.deepEqual(parsePostcode('GU11'), { kind: 'outcode', outcode: 'GU11', normalized: 'GU11' });
  assert.equal(parsePostcode('KT1').kind, 'outcode');
});

test('accepts a valid full postcode and inserts the space', () => {
  assert.equal(parsePostcode('GU113HY').normalized, 'GU11 3HY');
  assert.equal(parsePostcode('SW1A 1AA').normalized, 'SW1A 1AA');
  assert.equal(parsePostcode('GU11 3HY').kind, 'full');
});

test('normalises whitespace and lower case', () => {
  assert.equal(parsePostcode('  gu11   3hy ').normalized, 'GU11 3HY');
  assert.equal(parsePostcode('\tkt1\n').normalized, 'KT1');
});

test('rejects invalid postcodes', () => {
  for (const bad of ['', '   ', 'hello', '12345', 'GU', 'GU11 3H', 'GU11 3HYZ', 'ZZ', '<script>', null, undefined, 42]) {
    assert.equal(parsePostcode(bad), null, `expected ${JSON.stringify(bad)} to be rejected`);
  }
});

/* ───────────────────────── coverage ───────────────────────── */

test('coverage: the hub, Guildford and Southampton are inside, Manchester is outside', () => {
  assert.equal(assessCoverage({ outcode: 'GU11', lat: 51.2467, lng: -0.7609 }).status, 'covered');
  assert.equal(assessCoverage({ outcode: 'GU1', lat: 51.2362, lng: -0.5704 }).status, 'covered');
  // SO45 is not on the district list, so this relies on the radius alone.
  assert.equal(assessCoverage({ outcode: 'SO45', lat: 50.8528, lng: -1.3963 }).status, 'covered');
  assert.equal(assessCoverage({ outcode: 'M1', lat: 53.4808, lng: -2.2426 }).status, 'outside');
});

test('coverage: distance calculation is sane', () => {
  const miles = distanceMiles(SERVICE_HUB.lat, SERVICE_HUB.lng, 51.5074, -0.1278); // central London
  assert.ok(miles > 30 && miles < 40, `got ${miles}`);
});

/* ───────────────────────── /api/availability ───────────────────────── */

const callAvailability = (postcode, fetchImpl) =>
  withGlobalFetch(fetchImpl, async () => {
    const response = await availabilityGET(new Request(`http://localhost/api/availability?postcode=${encodeURIComponent(postcode)}`));
    return { status: response.status, body: await response.json() };
  });

test('availability: invalid format returns 400 without calling the lookup service', async () => {
  let called = false;
  const { status, body } = await callAvailability('not-a-postcode', async () => {
    called = true;
    return postcodesIoOk(0, 0);
  });
  assert.equal(status, 400);
  assert.equal(body.status, 'invalid');
  assert.equal(called, false);
});

test('availability: covered full postcode returns coordinates and distance', async () => {
  const { status, body } = await callAvailability('gu11 3hy', async () => postcodesIoOk(51.2467, -0.7609));
  assert.equal(status, 200);
  assert.equal(body.status, 'covered');
  assert.equal(body.postcode, 'GU11 3HY');
  assert.equal(body.approximate, false);
  assert.ok(body.coords.lat > 51 && body.distanceMiles < 2);
});

test('availability: a partial postcode is covered but marked approximate', async () => {
  const { body } = await callAvailability('GU11', async () => postcodesIoOk(51.248, -0.76));
  assert.equal(body.status, 'covered');
  assert.equal(body.approximate, true);
});

test('availability: outside the service area', async () => {
  const { status, body } = await callAvailability('M1 1AE', async () => postcodesIoOk(53.4808, -2.2426));
  assert.equal(status, 200);
  assert.equal(body.status, 'outside');
  assert.ok(body.distanceMiles > 100);
});

test('availability: a well-formed postcode that does not exist is unverified, not covered', async () => {
  const { status, body } = await callAvailability('ZZ99 9ZZ', async () => new Response('{}', { status: 404 }));
  assert.equal(status, 200);
  assert.equal(body.status, 'unverified');
});

test('availability: lookup outage is reported as unavailable (503)', async () => {
  const { status, body } = await callAvailability('SW1A 1AA', async () => {
    throw new TypeError('fetch failed');
  });
  assert.equal(status, 503);
  assert.equal(body.status, 'unavailable');
});

test('availability: a lookup timeout is reported as unavailable (503)', async () => {
  const { status, body } = await callAvailability('SW1A 1AA', async () => {
    const error = new Error('aborted');
    error.name = 'AbortError';
    throw error;
  });
  assert.equal(status, 503);
  assert.equal(body.reason, 'timeout');
});

test('availability: during an outage a district on our own list is still answered', async () => {
  const { status, body } = await callAvailability('GU11 3HY', async () => {
    throw new TypeError('fetch failed');
  });
  assert.equal(status, 200);
  assert.equal(body.status, 'covered');
  assert.equal(body.verifiedAgainst, 'district-list');
});

/* ───────────────────────── booking validation ───────────────────────── */

test('validation: a complete scheduled booking passes and is normalised', () => {
  const { ok, data } = validateBooking(validBooking());
  assert.equal(ok, true);
  assert.equal(data.postcode, 'GU11 3HY');
  assert.equal(data.vehicleReg, 'AB12CDE');
});

test('validation: missing fields are all reported', () => {
  const { ok, errors } = validateBooking({ mode: 'scheduled' });
  assert.equal(ok, false);
  for (const field of ['fullName', 'phoneNumber', 'email', 'vehicleReg', 'postcode', 'address', 'date', 'window', 'tyreWidth']) {
    assert.ok(errors[field], `expected an error for ${field}`);
  }
});

test('validation: invalid phone and email', () => {
  const { errors } = validateBooking(validBooking({ phoneNumber: '12345', email: 'not-an-email' }));
  assert.ok(errors.phoneNumber);
  assert.ok(errors.email);
});

test('validation: a booking needs a full postcode, not just GU11', () => {
  assert.ok(validateBooking(validBooking({ postcode: 'GU11' })).errors.postcode);
});

test('validation: past dates and dates beyond the horizon are rejected', () => {
  assert.ok(validateBooking(validBooking({ date: addDays(todayInLondon(), -1) })).errors.date);
  assert.ok(validateBooking(validBooking({ date: addDays(todayInLondon(), 200) })).errors.date);
  assert.ok(validateBooking(validBooking({ date: '2026-02-30' })).errors.date);
});

test('validation: an emergency request needs no date or window', () => {
  const { ok } = validateBooking(validBooking({ mode: 'emergency', date: '', window: '' }));
  assert.equal(ok, true);
});

test('validation: customers who do not know their tyre size can still book', () => {
  const { ok, errors } = validateBooking(validBooking({ tyreUnknown: true, tyreWidth: '', tyreProfile: '', tyreRim: '' }));
  assert.equal(ok, true);
  assert.equal(errors.tyreWidth, undefined);
});

test('validation: sizes outside the old dropdowns are accepted (e.g. 315/35 R20)', () => {
  assert.equal(validateBooking(validBooking({ tyreWidth: '315', tyreProfile: '35', tyreRim: '20' })).ok, true);
});

test('validation: tyre size can be read from a link', () => {
  assert.deepEqual(parseTyreSize('225/45R17'), { tyreWidth: '225', tyreProfile: '45', tyreRim: '17' });
  assert.equal(parseTyreSize('banana'), null);
});

/* ───────────────────────── POST /api/appointments ───────────────────────── */

test('booking: successful submission is saved to Strapi and confirmed', async () => {
  const { fetchImpl, strapiCalls } = fakeNetwork();
  const response = await handleAppointment(postRequest(validBooking()), { fetchImpl, store: createStore(), env: {} });
  const body = await response.json();

  assert.equal(response.status, 201);
  assert.equal(body.ok, true);
  assert.equal(body.reference, 'doc41');
  assert.equal(strapiCalls.length, 1);
  assert.match(strapiCalls[0].url, /\/appointments$/);

  const sent = strapiCalls[0].body.data;
  assert.deepEqual(Object.keys(sent).sort(), [
    'address', 'email', 'fullName', 'locationNotes', 'phoneNumber', 'postcode', 'serviceType', 'timingSlot', 'tyreSize', 'vehicleReg',
  ]);
  assert.equal(sent.postcode, 'GU11 3HY');
  assert.equal(sent.tyreSize, '225/45 R17 W');
  assert.match(sent.locationNotes, /inside service area/);
  assert.match(sent.locationNotes, /google\.com\/maps/);
});

test('booking: the server-only Strapi token is sent upstream and never returned', async () => {
  const { fetchImpl, strapiCalls } = fakeNetwork();
  const response = await handleAppointment(postRequest(validBooking()), {
    fetchImpl,
    store: createStore(),
    env: { STRAPI_API_TOKEN: 'secret-token-123' },
  });
  assert.equal(strapiCalls[0].init.headers.Authorization, 'Bearer secret-token-123');
  assert.doesNotMatch(JSON.stringify(await response.json()), /secret-token-123/);
});

test('booking: invalid input is rejected with field errors and nothing reaches Strapi', async () => {
  const { fetchImpl, strapiCalls } = fakeNetwork();
  const response = await handleAppointment(postRequest(validBooking({ phoneNumber: 'abc', email: 'x' })), {
    fetchImpl,
    store: createStore(),
    env: {},
  });
  const body = await response.json();
  assert.equal(response.status, 422);
  assert.ok(body.errors.phoneNumber && body.errors.email);
  assert.equal(strapiCalls.length, 0);
});

test('booking: malformed JSON and the honeypot are rejected', async () => {
  const { fetchImpl, strapiCalls } = fakeNetwork();
  const options = { fetchImpl, store: createStore(), env: {} };
  assert.equal((await handleAppointment(postRequest('{nope'), options)).status, 400);
  assert.equal((await handleAppointment(postRequest(validBooking({ company_website: 'http://spam' })), options)).status, 400);
  assert.equal(strapiCalls.length, 0);
});

test('booking: a Strapi validation error is passed back as a 422 and does not count as a save', async () => {
  const { fetchImpl } = fakeNetwork({
    strapi: () => strapiError(400, 'ValidationError', [{ path: ['email'], message: 'email must be a valid email' }]),
  });
  const response = await handleAppointment(postRequest(validBooking()), { fetchImpl, store: createStore(), env: {} });
  const body = await response.json();
  assert.equal(response.status, 422);
  assert.equal(body.errors.email, 'email must be a valid email');
});

test('booking: if Strapi restricts timingSlot or serviceType, one retry uses the legacy values', async () => {
  const { fetchImpl, strapiCalls } = fakeNetwork({
    strapi: (callNumber) =>
      callNumber === 1
        ? strapiError(400, 'ValidationError', [{ path: ['timingSlot'], message: 'timingSlot must be one of the following values' }])
        : strapiOk(77),
  });
  const response = await handleAppointment(postRequest(validBooking()), { fetchImpl, store: createStore(), env: {} });
  assert.equal(response.status, 201);
  assert.equal(strapiCalls.length, 2);
  assert.equal(strapiCalls[1].body.data.timingSlot, 'Slot 12pm - 5pm');
  assert.equal(strapiCalls[1].body.data.serviceType, 'Mobile Tyre Fitting');
});

test('booking: Strapi server errors give a 502 that keeps the customer on the form', async () => {
  const { fetchImpl } = fakeNetwork({ strapi: () => strapiError(500, 'Internal Server Error') });
  const response = await handleAppointment(postRequest(validBooking()), { fetchImpl, store: createStore(), env: {} });
  const body = await response.json();
  assert.equal(response.status, 502);
  assert.equal(body.ok, false);
  assert.match(body.message, /0207 101 3856/);
});

test('booking: Strapi rejecting our credentials is reported as a service problem, not a customer error', async () => {
  const { fetchImpl } = fakeNetwork({ strapi: () => strapiError(403, 'Forbidden') });
  const response = await handleAppointment(postRequest(validBooking()), { fetchImpl, store: createStore(), env: {} });
  assert.equal(response.status, 502);
});

test('booking: a Strapi 200 with no record id is not treated as saved', async () => {
  const { fetchImpl } = fakeNetwork({ strapi: () => new Response('{}', { status: 200 }) });
  const response = await handleAppointment(postRequest(validBooking()), { fetchImpl, store: createStore(), env: {} });
  assert.equal(response.status, 502);
});

test('booking: a network failure and a timeout both fail cleanly and can be retried', async () => {
  const store = createStore();
  const down = async (url) => {
    if (String(url).includes('postcodes.io')) return postcodesIoOk(51.2467, -0.7609);
    throw new TypeError('fetch failed');
  };
  const payload = validBooking();
  assert.equal((await handleAppointment(postRequest(payload), { fetchImpl: down, store, env: {} })).status, 502);

  const slow = async (url) => {
    if (String(url).includes('postcodes.io')) return postcodesIoOk(51.2467, -0.7609);
    const error = new Error('aborted');
    error.name = 'AbortError';
    throw error;
  };
  assert.equal((await handleAppointment(postRequest(payload), { fetchImpl: slow, store, env: {} })).status, 504);

  // The failures released the duplicate lock, so a retry with the same key goes through.
  const { fetchImpl } = fakeNetwork();
  assert.equal((await handleAppointment(postRequest(payload), { fetchImpl, store, env: {} })).status, 201);
});

test('booking: a repeat submission is answered from the first result and not sent to Strapi again', async () => {
  const { fetchImpl, strapiCalls } = fakeNetwork();
  const store = createStore();
  const payload = validBooking();
  const first = await handleAppointment(postRequest(payload), { fetchImpl, store, env: {} });
  const second = await handleAppointment(postRequest(payload), { fetchImpl, store, env: {} });

  assert.equal(first.status, 201);
  assert.equal(second.status, 200);
  const secondBody = await second.json();
  assert.equal(secondBody.duplicate, true);
  assert.equal(secondBody.reference, 'doc41');
  assert.equal(strapiCalls.length, 1);
});

test('booking: the same customer, postcode and slot under a new key is also caught as a duplicate', async () => {
  const { fetchImpl, strapiCalls } = fakeNetwork();
  const store = createStore();
  await handleAppointment(postRequest(validBooking({ idempotencyKey: 'aaaaaaaa-1111' })), { fetchImpl, store, env: {} });
  const second = await handleAppointment(postRequest(validBooking({ idempotencyKey: 'bbbbbbbb-2222' })), { fetchImpl, store, env: {} });
  assert.equal((await second.json()).duplicate, true);
  assert.equal(strapiCalls.length, 1);
});

test('booking: two simultaneous submissions only create one record', async () => {
  let release;
  const gate = new Promise((resolve) => (release = resolve));
  const { fetchImpl, strapiCalls } = fakeNetwork({
    strapi: async () => {
      await gate;
      return strapiOk();
    },
  });
  const store = createStore();
  const payload = validBooking();

  const first = handleAppointment(postRequest(payload), { fetchImpl, store, env: {} });
  await new Promise((resolve) => setTimeout(resolve, 20));
  const second = await handleAppointment(postRequest(payload), { fetchImpl, store, env: {} });
  assert.equal(second.status, 409);

  release();
  assert.equal((await first).status, 201);
  assert.equal(strapiCalls.length, 1);
});

test('booking: excessive requests from one address are rate limited', async () => {
  const { fetchImpl } = fakeNetwork();
  const store = createStore();
  let lastStatus = 0;
  for (let i = 0; i < 14; i += 1) {
    const response = await handleAppointment(postRequest({ mode: 'scheduled' }), { fetchImpl, store, env: {} });
    lastStatus = response.status;
  }
  assert.equal(lastStatus, 429);
});

test('booking: an emergency request is saved without a date and flags an out-of-area postcode', async () => {
  const { fetchImpl, strapiCalls } = fakeNetwork({ postcodes: () => postcodesIoOk(53.4808, -2.2426) });
  const response = await handleAppointment(
    postRequest(validBooking({ mode: 'emergency', date: '', window: '', postcode: 'M1 1AE' })),
    { fetchImpl, store: createStore(), env: {} }
  );
  assert.equal(response.status, 201);
  const sent = strapiCalls[0].body.data;
  assert.equal(sent.serviceType, 'Emergency Mobile Tyre Fitting');
  assert.match(sent.timingSlot, /Emergency/);
  assert.match(sent.locationNotes, /OUTSIDE usual service area/);
});
