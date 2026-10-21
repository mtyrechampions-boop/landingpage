'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  ExternalLink,
  Info,
  Loader2,
  MapPin,
  Phone,
  RefreshCw,
  Send,
  TriangleAlert,
  Zap,
  CalendarDays,
} from 'lucide-react';
import { parsePostcode } from '../../lib/postcode';
import { CONTAINER } from '../layout/container';
import {
  BOOKING_HORIZON_DAYS,
  BUSINESS_PHONE_DISPLAY,
  BUSINESS_PHONE_HREF,
  CONSTRAINTS,
  RIM_SIZES,
  SERVICE_MODES,
  SPEED_RATINGS,
  TIME_WINDOWS,
  TYRE_PROFILES,
  TYRE_WIDTHS,
  addDays,
  describeTiming,
  describeTyre,
  emptyBooking,
  googleMapsLink,
  parseTyreSize,
  todayInLondon,
  tyreSizeLabel,
  validateBooking,
} from '../../lib/booking';

const PostcodeMap = dynamic(() => import('./PostcodeMap'), { ssr: false, loading: () => <MapMessage busy>Loading map…</MapMessage> });

const GEO_TIMEOUT_MS = 8000;
const SUBMIT_TIMEOUT_MS = 20000;
const RECENT_BOOKING_WINDOW_MS = 30 * 60 * 1000;

const FIELD_ORDER = [
  'mode', 'date', 'window', 'fullName', 'phoneNumber', 'email', 'postcode', 'address',
  'locationNotes', 'vehicleReg', 'tyreWidth', 'tyreProfile', 'tyreRim', 'tyreSpeed', 'notes',
];

// One control style for every input, select, date field and textarea: 2px border, 12px radius,
// 48px height (textareas grow), and the same orange focus ring.
const FIELD_BASE =
  'w-full px-4 bg-white border-2 rounded-xl text-gray-900 font-semibold text-base placeholder:text-gray-400 placeholder:font-medium focus:border-[#FB7E10] focus:ring-2 focus:ring-[#FB7E10]/20 focus:outline-none transition-colors disabled:bg-gray-100 disabled:text-gray-400';
const inputClass = (error) => `${FIELD_BASE} h-12 ${error ? 'border-red-400' : 'border-gray-200'}`;
const textareaClass = (error) => `${FIELD_BASE} py-3 ${error ? 'border-red-400' : 'border-gray-200'}`;

const newKey = () =>
  globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return isDesktop;
};

/* ───────────────────────── small pieces ───────────────────────── */

const Card = ({ title, step, children }) => (
  <section className="rounded-2xl bg-white border border-gray-200 p-5 sm:p-6 shadow-sm">
    <h2 className="flex items-center gap-3 text-lg font-black text-gray-900 tracking-tight mb-4">
      <span className="w-8 h-8 rounded-full bg-[#FB7E10] text-white text-sm flex items-center justify-center" aria-hidden="true">
        {step}
      </span>
      {title}
    </h2>
    <div className="space-y-4">{children}</div>
  </section>
);

const Field = ({ id, label, error, hint, required, children }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-black text-gray-900 mb-1.5">
      {label}
      {required && (
        <span className="text-[#FB7E10]" aria-hidden="true">
          {' '}*
        </span>
      )}
    </label>
    {children}
    {error ? (
      <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs font-bold text-red-600">
        {error}
      </p>
    ) : (
      hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-gray-500 font-medium">
          {hint}
        </p>
      )
    )}
  </div>
);

const describedBy = (id, error, hint) => (error ? `${id}-error` : hint ? `${id}-hint` : undefined);

function MapMessage({ children, busy, action }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-slate-100 text-center px-6">
      {busy ? (
        <Loader2 size={28} className="animate-spin text-[#FB7E10]" aria-hidden="true" />
      ) : (
        <MapPin size={28} className="text-gray-400" aria-hidden="true" />
      )}
      <p className="text-sm font-semibold text-gray-600 max-w-xs" role={busy ? 'status' : undefined}>
        {children}
      </p>
      {action}
    </div>
  );
}

const CoverageNotice = ({ geo }) => {
  const status = geo.result?.status;
  if (geo.phase === 'loading') {
    return (
      <p role="status" className="flex items-center gap-2 text-sm font-semibold text-gray-500">
        <Loader2 size={16} className="animate-spin text-[#FB7E10]" aria-hidden="true" /> Checking your area…
      </p>
    );
  }
  if (!status) return null;

  const notices = {
    covered: {
      style: 'bg-emerald-50 border-emerald-200 text-emerald-800',
      icon: CheckCircle2,
      text: 'This postcode is inside our service area. Our team confirms fitter availability and arrival time when they call you.',
    },
    outside: {
      style: 'bg-amber-50 border-amber-200 text-amber-800',
      icon: Info,
      text: 'This postcode looks outside our usual service area. You can still send the request and we will tell you honestly whether we can reach you.',
    },
    unverified: {
      style: 'bg-amber-50 border-amber-200 text-amber-800',
      icon: Info,
      text: "We couldn't find this postcode. Check it for typos; you can still send the request with your street address.",
    },
    unavailable: {
      style: 'bg-gray-50 border-gray-200 text-gray-600',
      icon: Info,
      text: "We couldn't check your area just now. That won't stop your request being sent.",
    },
  };
  const notice = notices[status] ?? notices.unavailable;
  const Icon = notice.icon;
  return (
    <p className={`flex items-start gap-2 rounded-xl border px-3.5 py-3 text-sm font-semibold ${notice.style}`}>
      <Icon size={18} className="shrink-0 mt-0.5" aria-hidden="true" />
      <span>{notice.text}</span>
    </p>
  );
};

const MapPanel = ({ geo, postcode, address, onRetry, tall }) => {
  const height = tall ? 'h-[480px]' : 'h-[260px] sm:h-[320px]';
  const retry = (
    <button
      type="button"
      onClick={onRetry}
      className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 hover:border-[#FB7E10] px-4 py-2 rounded-xl text-sm font-black text-gray-800 transition-colors"
    >
      <RefreshCw size={16} aria-hidden="true" /> Try again
    </button>
  );

  let content;
  switch (geo.phase) {
    case 'ready':
      content = <PostcodeMap lat={geo.coords.lat} lng={geo.coords.lng} label={postcode} />;
      break;
    case 'loading':
      content = <MapMessage busy>Finding {postcode} on the map…</MapMessage>;
      break;
    case 'needs-full':
      content = <MapMessage>Add your full postcode, for example GU11 3HY, to see it on the map.</MapMessage>;
      break;
    case 'no-result':
      content = (
        <MapMessage>
          We couldn't find {postcode} on the map. Check it for typos. You can still book: your street address is what we use.
        </MapMessage>
      );
      break;
    case 'timeout':
      content = <MapMessage action={retry}>The map lookup is taking too long.</MapMessage>;
      break;
    case 'error':
      content = <MapMessage action={retry}>The map is unavailable right now. You can still send your booking request.</MapMessage>;
      break;
    default:
      content = <MapMessage>Enter your postcode to see it on the map.</MapMessage>;
  }

  return (
    <div className="rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm">
      <div className={`isolate relative overflow-hidden ${height}`}>{content}</div>
      <div className="px-5 py-4 text-xs text-gray-500 font-medium space-y-2">
        <p>
          The pin marks the centre of the postcode and is approximate. Please give us your exact street address and any access
          notes.
        </p>
        {geo.phase === 'ready' && (
          <a
            href={googleMapsLink(address, postcode)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-black text-[#FB7E10] hover:underline"
          >
            Open in Google Maps <ExternalLink size={13} aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  );
};

/* ───────────────────────── geocoding ───────────────────────── */

const toGeoState = (result) => {
  if (result.status === 'unverified') return { phase: 'no-result', result };
  if (result.status === 'unavailable') {
    return { phase: result.reason === 'timeout' ? 'timeout' : 'error', result };
  }
  if (result.coords) return { phase: 'ready', coords: result.coords, result };
  return { phase: 'error', result };
};

const useGeocode = (postcodeInput) => {
  const parsed = parsePostcode(postcodeInput);
  const fullPostcode = parsed?.kind === 'full' ? parsed.normalized : null;

  // Wait for typing to pause so every keystroke isn't a request.
  const [settled, setSettled] = useState(fullPostcode);
  useEffect(() => {
    const timer = setTimeout(() => setSettled(fullPostcode), 500);
    return () => clearTimeout(timer);
  }, [fullPostcode]);

  const [attempt, setAttempt] = useState(0);
  const [response, setResponse] = useState(null); // { key, geo }
  const key = settled ? `${settled}#${attempt}` : null;

  useEffect(() => {
    if (!settled) return undefined;
    const controller = new AbortController();
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, GEO_TIMEOUT_MS);
    const requestKey = `${settled}#${attempt}`;

    fetch(`/api/availability?postcode=${encodeURIComponent(settled)}`, { signal: controller.signal })
      .then(async (res) => {
        const result = await res.json().catch(() => null);
        if (!result?.status) throw new Error('Unexpected response');
        setResponse({ key: requestKey, geo: toGeoState(result) });
      })
      .catch(() => {
        if (controller.signal.aborted && !timedOut) return;
        setResponse({
          key: requestKey,
          geo: { phase: timedOut ? 'timeout' : 'error', result: { status: 'unavailable' } },
        });
      })
      .finally(() => clearTimeout(timer));

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [settled, attempt]);

  let geo;
  if (!fullPostcode) geo = { phase: parsed ? 'needs-full' : 'idle' };
  else if (fullPostcode !== settled || response?.key !== key) geo = { phase: 'loading' };
  else geo = response.geo;

  return { geo, retry: () => setAttempt((n) => n + 1) };
};

/* ───────────────────────── the form ───────────────────────── */

const BookingView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDesktop = useIsDesktop();

  const [values, setValues] = useState(() => {
    const initial = emptyBooking();
    const postcode = parsePostcode(searchParams.get('postcode') ?? '');
    if (postcode) initial.postcode = postcode.normalized;
    const mode = searchParams.get('mode');
    if (SERVICE_MODES.some((m) => m.id === mode)) initial.mode = mode;
    const tyre = parseTyreSize(searchParams.get('tyre') ?? '');
    if (tyre) Object.assign(initial, tyre);
    return initial;
  });
  const [errors, setErrors] = useState({});
  const [formMessage, setFormMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [recentBooking, setRecentBooking] = useState(null);
  const keyRef = useRef('');
  const messageRef = useRef(null);

  const { geo, retry } = useGeocode(values.postcode);

  // Remember a valid postcode so it survives navigating away and back, or a refresh without the query.
  useEffect(() => {
    const parsed = parsePostcode(values.postcode);
    if (!parsed) return;
    try {
      sessionStorage.setItem('mtc:postcode', parsed.normalized);
    } catch {
      // Storage can be blocked; the URL still carries the postcode.
    }
  }, [values.postcode]);

  // Fall back to a postcode remembered from the landing page when the link carried none.
  useEffect(() => {
    try {
      const remembered = sessionStorage.getItem('mtc:postcode');
      if (remembered) setValues((current) => (current.postcode ? current : { ...current, postcode: remembered }));

      const last = JSON.parse(sessionStorage.getItem('mtc:lastBooking') ?? 'null');
      if (last?.submittedAt && Date.now() - last.submittedAt < RECENT_BOOKING_WINDOW_MS) setRecentBooking(last);
    } catch {
      // Storage can be blocked; the form works without it.
    }
  }, []);

  const set = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => (current[name] ? { ...current, [name]: undefined } : current));
  };
  const bind = (name) => ({
    id: `field-${name}`,
    name,
    value: values[name],
    onChange: (event) => set(name, event.target.value),
    'aria-invalid': Boolean(errors[name]),
  });

  const today = todayInLondon();
  const isScheduled = values.mode === 'scheduled';
  const tyreComplete = values.tyreWidth && values.tyreProfile && values.tyreRim;

  const focusFirstError = (found) => {
    const first = FIELD_ORDER.find((name) => found[name]);
    window.setTimeout(() => {
      const target = first ? document.getElementById(`field-${first}`) : null;
      (target ?? messageRef.current)?.focus();
    }, 0);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;

    keyRef.current ||= newKey();
    const payload = { ...values, idempotencyKey: keyRef.current };

    const check = validateBooking(payload);
    if (!check.ok) {
      setErrors(check.errors);
      setFormMessage('Please check the highlighted fields and try again.');
      focusFirstError(check.errors);
      return;
    }

    setErrors({});
    setFormMessage('');
    setSubmitting(true);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const body = await response.json().catch(() => null);

      if (response.ok && body?.ok) {
        try {
          sessionStorage.setItem(
            'mtc:lastBooking',
            JSON.stringify({
              firstName: check.data.fullName.split(/\s+/)[0],
              mode: check.data.mode,
              timing: describeTiming(check.data),
              postcode: check.data.postcode,
              tyre: describeTyre(check.data),
              reference: body.reference ?? null,
              submittedAt: Date.now(),
            })
          );
          sessionStorage.removeItem('mtc:thankYouTracked');
        } catch {
          // The thank-you page shows a generic confirmation if this can't be stored.
        }
        // Stay disabled while navigating so a second tap cannot send a second request.
        router.push('/thank-you');
        window.setTimeout(() => setSubmitting(false), 15000);
        return;
      }

      setSubmitting(false);
      if (body?.errors && Object.keys(body.errors).length > 0) {
        setErrors(body.errors);
        focusFirstError(body.errors);
      }
      setFormMessage(body?.message ?? `We could not send your request. Your details are still here, so please try again or call us on ${BUSINESS_PHONE_DISPLAY}.`);
      window.setTimeout(() => messageRef.current?.focus(), 0);
    } catch (error) {
      setSubmitting(false);
      setFormMessage(
        error?.name === 'AbortError'
          ? `That took too long. Your details are still here, so please try again or call us on ${BUSINESS_PHONE_DISPLAY}.`
          : `We couldn't reach our booking service. Check your connection and try again, or call us on ${BUSINESS_PHONE_DISPLAY}.`
      );
      window.setTimeout(() => messageRef.current?.focus(), 0);
    } finally {
      clearTimeout(timer);
    }
  };

  const mapPanel = (tall) => (
    <MapPanel geo={geo} postcode={parsePostcode(values.postcode)?.normalized ?? values.postcode} address={values.address} onRetry={retry} tall={tall} />
  );

  return (
    <>
      <section className="bg-[#0B1528] text-white py-8 md:py-10">
        <div className={`${CONTAINER} text-center`}>
          <p className="inline-flex items-center gap-2 bg-[#FB7E10]/15 border border-[#FB7E10]/30 text-[#FB7E10] px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-widest mb-3">
            Booking request
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight text-balance">
            Tell us where your <span className="text-[#FB7E10]">tyre</span> needs fitting
          </h1>
          <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto text-pretty">
            Send your details and our team will call you to confirm the tyre, the price and your arrival time. No payment is taken
            online.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-6 md:py-8">
        {/* 40% map / 60% form on desktop; one stacked column below 1024px. */}
        <div className={`${CONTAINER} grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-6 lg:gap-8 items-start`}>

          {/* The map sits beside the form on desktop and inside the location step below that, never both. */}
          <div className="hidden lg:block lg:sticky lg:top-28">{isDesktop && mapPanel(true)}</div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4 md:space-y-6 min-w-0">
            {recentBooking && (
              <p className="flex items-start gap-3 rounded-2xl bg-white border-2 border-[#FB7E10]/40 px-4 py-3.5 text-sm font-semibold text-gray-700">
                <Info size={20} className="shrink-0 text-[#FB7E10] mt-0.5" aria-hidden="true" />
                <span>
                  You already sent a request from this browser a few minutes ago. Submitting again creates a second request, so only
                  continue if this one is for a different vehicle or place.
                </span>
              </p>
            )}

            {/* 1 — Type of request */}
            <Card step="1" title="What do you need?">
              <fieldset>
                <legend className="sr-only">Type of request</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICE_MODES.map((mode, index) => {
                    const selected = values.mode === mode.id;
                    const Icon = mode.id === 'emergency' ? Zap : CalendarDays;
                    return (
                      <label
                        key={mode.id}
                        className={`flex items-start gap-3 rounded-2xl border-2 p-4 cursor-pointer transition-all focus-within:ring-2 focus-within:ring-[#FB7E10] focus-within:ring-offset-2 ${
                          selected ? 'border-[#FB7E10] bg-[#FB7E10]/5' : 'border-gray-200 bg-gray-50 hover:border-[#FB7E10]/40'
                        }`}
                      >
                        <input
                          type="radio"
                          name="mode"
                          id={index === 0 ? 'field-mode' : undefined}
                          value={mode.id}
                          checked={selected}
                          onChange={() => set('mode', mode.id)}
                          className="sr-only"
                        />
                        <span className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${selected ? 'bg-[#FB7E10] text-white' : 'bg-white text-[#FB7E10] border border-gray-200'}`}>
                          <Icon size={20} aria-hidden="true" />
                        </span>
                        <span>
                          <span className="block font-black text-gray-900">{mode.label}</span>
                          <span className="block text-xs text-gray-500 font-medium mt-0.5">{mode.hint}</span>
                        </span>
                      </label>
                    );
                  })}
                </div>
                {errors.mode && <p role="alert" className="mt-2 text-xs font-bold text-red-600">{errors.mode}</p>}
              </fieldset>

              {isScheduled ? (
                <>
                  <Field
                    id="field-date"
                    label="Preferred date"
                    required
                    error={errors.date}
                    hint={`Up to ${BOOKING_HORIZON_DAYS} days ahead.`}
                  >
                    <input
                      {...bind('date')}
                      type="date"
                      min={today}
                      max={addDays(today, BOOKING_HORIZON_DAYS)}
                      suppressHydrationWarning
                      aria-describedby={describedBy('field-date', errors.date, true)}
                      className={inputClass(errors.date)}
                    />
                  </Field>

                  <fieldset>
                    <legend className="block text-sm font-black text-gray-900 mb-1.5">
                      Preferred time window <span className="text-[#FB7E10]" aria-hidden="true">*</span>
                    </legend>
                    <div className="grid grid-cols-3 gap-2">
                      {TIME_WINDOWS.map((window, index) => {
                        const selected = values.window === window;
                        return (
                          <label
                            key={window}
                            className={`flex h-12 items-center justify-center text-center rounded-xl border-2 px-2 text-xs sm:text-sm font-black cursor-pointer transition-all focus-within:ring-2 focus-within:ring-[#FB7E10] focus-within:ring-offset-2 ${
                              selected ? 'border-[#FB7E10] bg-[#FB7E10]/10 text-[#FB7E10]' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="window"
                              id={index === 0 ? 'field-window' : undefined}
                              value={window}
                              checked={selected}
                              onChange={() => set('window', window)}
                              className="sr-only"
                            />
                            {window}
                          </label>
                        );
                      })}
                    </div>
                    {errors.window ? (
                      <p role="alert" className="mt-1.5 text-xs font-bold text-red-600">{errors.window}</p>
                    ) : (
                      <p className="mt-1.5 text-xs text-gray-500 font-medium">A preference only: we confirm the exact arrival time by phone.</p>
                    )}
                  </fieldset>
                </>
              ) : (
                <div className="rounded-2xl bg-orange-50 border border-orange-200 p-4 text-sm text-gray-700 font-medium space-y-3">
                  <p>
                    We dispatch emergency requests as soon as a van is free. <strong>Calling is the fastest way</strong> to get help
                    when you are stranded.
                  </p>
                  <a href={BUSINESS_PHONE_HREF} data-conversion="phone-call" className="inline-flex items-center gap-2 bg-[#FB7E10] hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-black text-sm uppercase tracking-wider transition-colors">
                    <Phone size={16} className="fill-current" aria-hidden="true" /> Call {BUSINESS_PHONE_DISPLAY}
                  </a>
                </div>
              )}
            </Card>

            {/* 2 — Contact details */}
            <Card step="2" title="Your details">
              <Field id="field-fullName" label="Full name" required error={errors.fullName}>
                <input
                  {...bind('fullName')}
                  type="text"
                  autoComplete="name"
                  maxLength={CONSTRAINTS.fullName.max}
                  placeholder="e.g. Sarah Collins"
                  aria-describedby={describedBy('field-fullName', errors.fullName)}
                  className={inputClass(errors.fullName)}
                />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field id="field-phoneNumber" label="Phone number" required error={errors.phoneNumber} hint="We call this number to confirm.">
                  <input
                    {...bind('phoneNumber')}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="e.g. 07700 900123"
                    aria-describedby={describedBy('field-phoneNumber', errors.phoneNumber, true)}
                    className={inputClass(errors.phoneNumber)}
                  />
                </Field>
                <Field id="field-email" label="Email address" required error={errors.email}>
                  <input
                    {...bind('email')}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    maxLength={CONSTRAINTS.email.max}
                    placeholder="you@example.com"
                    aria-describedby={describedBy('field-email', errors.email)}
                    className={inputClass(errors.email)}
                  />
                </Field>
              </div>
            </Card>

            {/* 3 — Location */}
            <Card step="3" title="Where is the vehicle?">
              <Field id="field-postcode" label="Full postcode" required error={errors.postcode} hint="For example GU11 3HY.">
                <input
                  {...bind('postcode')}
                  type="text"
                  autoComplete="postal-code"
                  autoCapitalize="characters"
                  spellCheck={false}
                  maxLength={10}
                  placeholder="e.g. GU11 3HY"
                  aria-describedby={describedBy('field-postcode', errors.postcode, true)}
                  className={`${inputClass(errors.postcode)} uppercase`}
                />
              </Field>
              <CoverageNotice geo={geo} />
              <Field id="field-address" label="Street address or exact location" required error={errors.address} hint="House number and road, or where the vehicle is parked.">
                <textarea
                  {...bind('address')}
                  rows={2}
                  maxLength={CONSTRAINTS.address.max}
                  autoComplete="street-address"
                  placeholder="e.g. 12 High Street, or lay-by on the A31 near Farnham"
                  aria-describedby={describedBy('field-address', errors.address, true)}
                  className={`${textareaClass(errors.address)} resize-none`}
                />
              </Field>
              <Field id="field-locationNotes" label="Access and location notes" error={errors.locationNotes} hint="Optional: gate code, car park level, hazard lights on, and so on.">
                <textarea
                  {...bind('locationNotes')}
                  rows={2}
                  maxLength={CONSTRAINTS.locationNotes.max}
                  aria-describedby={describedBy('field-locationNotes', errors.locationNotes, true)}
                  className={`${textareaClass(errors.locationNotes)} resize-none`}
                />
              </Field>
              {!isDesktop && mapPanel(false)}
            </Card>

            {/* 4 — Vehicle and tyres */}
            <Card step="4" title="Vehicle and tyre">
              <Field id="field-vehicleReg" label="Vehicle registration" required error={errors.vehicleReg} hint="We use it to check the right tyre for your vehicle.">
                <input
                  {...bind('vehicleReg')}
                  type="text"
                  autoCapitalize="characters"
                  spellCheck={false}
                  maxLength={10}
                  placeholder="e.g. AB12 CDE"
                  aria-describedby={describedBy('field-vehicleReg', errors.vehicleReg, true)}
                  className={`${inputClass(errors.vehicleReg)} uppercase`}
                />
              </Field>

              <label className="flex items-start gap-3 rounded-2xl border-2 border-gray-200 bg-gray-50 p-4 cursor-pointer focus-within:ring-2 focus-within:ring-[#FB7E10] focus-within:ring-offset-2">
                <input
                  type="checkbox"
                  checked={values.tyreUnknown}
                  onChange={(event) => set('tyreUnknown', event.target.checked)}
                  className="mt-1 h-5 w-5 accent-[#FB7E10]"
                />
                <span>
                  <span className="block font-black text-gray-900">I don't know my tyre size</span>
                  <span className="block text-xs text-gray-500 font-medium mt-0.5">
                    No problem. We'll identify the right tyre from your registration when we call.
                  </span>
                </span>
              </label>

              {!values.tyreUnknown && (
                <>
                  <p className="text-xs text-gray-500 font-medium">
                    The size is printed on the tyre's sidewall, for example <strong>225/45 R17 94W</strong>.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { name: 'tyreWidth', label: 'Width', options: TYRE_WIDTHS, placeholder: '225' },
                      { name: 'tyreProfile', label: 'Profile', options: TYRE_PROFILES, placeholder: '45' },
                      { name: 'tyreRim', label: 'Rim', options: RIM_SIZES, placeholder: '17' },
                      { name: 'tyreSpeed', label: 'Speed', options: SPEED_RATINGS, placeholder: 'Not sure' },
                    ].map(({ name, label, options, placeholder }) => (
                      <Field key={name} id={`field-${name}`} label={label} required={name !== 'tyreSpeed'} error={errors[name]}>
                        <div className="relative">
                          <select
                            {...bind(name)}
                            aria-describedby={describedBy(`field-${name}`, errors[name])}
                            className={`${inputClass(errors[name])} appearance-none pr-10`}
                          >
                            <option value="">{placeholder}</option>
                            {options.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                          <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" aria-hidden="true" />
                        </div>
                      </Field>
                    ))}
                  </div>
                  {tyreComplete && (
                    <p className="text-sm font-black text-gray-900">
                      Your tyre: <span className="text-[#FB7E10]">{tyreSizeLabel(values)}</span>
                    </p>
                  )}
                </>
              )}
            </Card>

            {/* 5 — Notes */}
            <Card step="5" title="Anything else we should know?">
              <Field id="field-notes" label="Additional notes" error={errors.notes} hint="Optional: locking wheel nut key missing, preferred brand, more than one tyre, and so on.">
                <textarea
                  {...bind('notes')}
                  rows={3}
                  maxLength={CONSTRAINTS.notes.max}
                  aria-describedby={describedBy('field-notes', errors.notes, true)}
                  className={`${textareaClass(errors.notes)} resize-none`}
                />
              </Field>
            </Card>

            {/* Honeypot: invisible to people, tempting to bots */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="field-company_website">Company website</label>
              <input
                id="field-company_website"
                type="text"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
                value={values.company_website}
                onChange={(event) => set('company_website', event.target.value)}
              />
            </div>

            {formMessage && (
              <div
                ref={messageRef}
                tabIndex={-1}
                role="alert"
                className="flex items-start gap-3 rounded-2xl bg-red-50 border-2 border-red-200 p-4 text-sm font-bold text-red-700 outline-none"
              >
                <TriangleAlert size={20} className="shrink-0 mt-0.5" aria-hidden="true" />
                <div className="space-y-2">
                  <p>{formMessage}</p>
                  <a href={BUSINESS_PHONE_HREF} data-conversion="phone-call" className="inline-flex items-center gap-1.5 underline underline-offset-2">
                    <Phone size={14} className="fill-current" aria-hidden="true" /> {BUSINESS_PHONE_DISPLAY}
                  </a>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <button
                type="submit"
                disabled={submitting}
                aria-busy={submitting}
                data-conversion="booking-submit"
                className="w-full flex h-14 items-center justify-center gap-3 bg-[#FB7E10] hover:bg-orange-600 text-white rounded-xl font-black text-base sm:text-lg uppercase tracking-wider shadow-xl shadow-orange-500/25 active:scale-[0.98] transition-all disabled:opacity-80 disabled:cursor-wait disabled:active:scale-100"
              >
                {submitting ? (
                  <>
                    <Loader2 size={22} className="animate-spin" aria-hidden="true" /> Sending your request…
                  </>
                ) : (
                  <>
                    <Send size={20} aria-hidden="true" /> Send booking request
                  </>
                )}
              </button>
              <p className="flex items-start gap-2 text-xs text-gray-500 font-medium">
                <CircleAlert size={15} className="shrink-0 mt-0.5 text-[#FB7E10]" aria-hidden="true" />
                <span>
                  This sends a request, not a confirmed appointment. Our team contacts you to confirm availability, price and arrival
                  time. No upfront payment.
                </span>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default BookingView;
