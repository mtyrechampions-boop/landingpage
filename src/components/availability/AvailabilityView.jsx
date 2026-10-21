'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Loader2,
  MapPinOff,
  MessageSquare,
  Phone,
  RefreshCw,
  SearchX,
  TriangleAlert,
  Wrench,
} from 'lucide-react';
import PostcodeAvailabilityForm from '../landing/PostcodeAvailabilityForm';
import { CONTAINER } from '../layout/container';
import { parsePostcode } from '../../lib/postcode';
import { BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_HREF, whatsappLink } from '../../lib/booking';

const REQUEST_TIMEOUT_MS = 10000;

const TONES = {
  good: { ring: 'border-emerald-200 bg-emerald-50', icon: 'bg-emerald-100 text-emerald-600', label: 'text-emerald-700' },
  caution: { ring: 'border-amber-200 bg-amber-50', icon: 'bg-amber-100 text-amber-600', label: 'text-amber-700' },
  problem: { ring: 'border-red-200 bg-red-50', icon: 'bg-red-100 text-red-600', label: 'text-red-700' },
};

// Every button in a row shares height, padding, radius and icon spacing; the row gives them equal
// widths so they sit on one baseline and labels never need to wrap.
const BUTTON_BASE =
  'inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl px-4 text-xs sm:text-[13px] font-black uppercase tracking-wider active:scale-95 transition-all';
const PRIMARY_BUTTON = `${BUTTON_BASE} bg-[#FB7E10] hover:bg-orange-600 text-white shadow-md shadow-orange-500/20`;
const SECONDARY_BUTTON = `${BUTTON_BASE} bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200`;
const WHATSAPP_BUTTON = `${BUTTON_BASE} bg-[#22C55E] hover:bg-green-600 text-white shadow-md shadow-green-500/20`;
const BUTTON_ROW = 'grid gap-3 sm:grid-flow-col sm:auto-cols-fr';

const STEPS = [
  { icon: MessageSquare, title: 'Send your details', body: 'Tell us your vehicle, tyre and exact location.' },
  { icon: Phone, title: 'We call you back', body: 'Our team confirms the tyre, the price and the arrival time.' },
  { icon: Wrench, title: 'We fit it where you are', body: 'Pay once the work is done and checked.' },
];

const CallLink = ({ className = SECONDARY_BUTTON, label }) => (
  <a href={BUSINESS_PHONE_HREF} data-conversion="phone-call" className={className}>
    <Phone size={18} className="fill-current" aria-hidden="true" />
    {label ?? `Call ${BUSINESS_PHONE_DISPLAY}`}
  </a>
);

const AvailabilityView = () => {
  const searchParams = useSearchParams();
  const rawPostcode = searchParams.get('postcode') ?? '';
  const parsed = parsePostcode(rawPostcode);

  const [attempt, setAttempt] = useState(0);
  const [response, setResponse] = useState(null); // { key, result }
  const headingRef = useRef(null);

  const requestKey = parsed ? `${parsed.normalized}#${attempt}` : null;
  const loading = Boolean(parsed) && response?.key !== requestKey;
  const result = !loading && parsed ? response.result : null;

  useEffect(() => {
    if (!parsed) return undefined;

    const controller = new AbortController();
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, REQUEST_TIMEOUT_MS);
    const key = `${parsed.normalized}#${attempt}`;

    fetch(`/api/availability?postcode=${encodeURIComponent(parsed.normalized)}`, { signal: controller.signal })
      .then(async (res) => {
        const body = await res.json().catch(() => null);
        if (!body?.status) throw new Error('Unexpected response');
        setResponse({ key, result: body });
      })
      .catch(() => {
        // An abort from unmounting or from a newer request is not a failure worth showing.
        if (controller.signal.aborted && !timedOut) return;
        setResponse({ key, result: { status: 'unavailable' } });
      })
      .finally(() => clearTimeout(timer));

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [parsed?.normalized, attempt]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (result) headingRef.current?.focus();
  }, [result]);

  // Carry the postcode to the booking step even if the link that follows has lost the query string.
  useEffect(() => {
    if (!parsed) return;
    try {
      sessionStorage.setItem('mtc:postcode', parsed.normalized);
    } catch {
      // Storage can be blocked; the URL still carries the postcode.
    }
  }, [parsed?.normalized]); // eslint-disable-line react-hooks/exhaustive-deps

  const postcode = parsed?.normalized ?? '';
  const bookingHref = `/booking?postcode=${encodeURIComponent(postcode)}`;
  const whatsapp = whatsappLink(`Hi Mobile Tyre Champions, I'd like to check tyre fitting availability. My postcode: ${postcode}`);

  const heading = (text) => (
    <h2 ref={headingRef} tabIndex={-1} className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-tight outline-none">
      {text}
    </h2>
  );

  const card = ({ tone, icon: Icon, label, title, children }) => {
    const styles = TONES[tone];
    return (
      <div className={`rounded-2xl border-2 p-5 sm:p-6 ${styles.ring}`}>
        <div className="flex items-center gap-4">
          <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${styles.icon}`}>
            <Icon size={24} aria-hidden="true" />
          </div>
          <div className="min-w-0 space-y-0.5">
            <p className={`text-xs font-black uppercase tracking-widest ${styles.label}`}>{label}</p>
            {heading(title)}
          </div>
        </div>
        <div className="mt-4 space-y-3 text-gray-700 text-[15px] leading-relaxed sm:pl-16">{children}</div>
      </div>
    );
  };

  let body;
  if (!parsed) {
    body = card({
      tone: 'caution',
      icon: SearchX,
      label: rawPostcode ? 'Postcode not recognised' : 'Check your area',
      title: rawPostcode ? "That doesn't look like a UK postcode" : 'Enter your postcode',
      children: (
        <p>
          {rawPostcode
            ? `"${rawPostcode.slice(0, 12)}" isn't a valid UK postcode format. Try something like GU11 3HY, or just the first part, GU11.`
            : 'Type your postcode below and we will check that you are inside our service area.'}
        </p>
      ),
    });
  } else if (loading) {
    body = (
      <div role="status" className="rounded-2xl border-2 border-gray-200 bg-white p-5 sm:p-6 flex items-center gap-4">
        <Loader2 size={28} className="animate-spin text-[#FB7E10] shrink-0" aria-hidden="true" />
        <div>
          <p className="font-black text-gray-900 text-lg">Checking coverage for {postcode}…</p>
          <p className="text-sm text-gray-500">This usually takes a couple of seconds.</p>
        </div>
      </div>
    );
  } else if (result.status === 'covered') {
    const miles = result.distanceMiles;
    body = card({
      tone: 'good',
      icon: CheckCircle2,
      label: 'Service area confirmed',
      title: `${postcode} is inside our service area`,
      children: (
        <>
          <p>
            {result.area?.district
              ? `${postcode} is in ${result.area.district}${result.area.region ? `, ${result.area.region}` : ''}`
              : `${postcode} is in an area we cover`}
            {typeof miles === 'number' ? `, about ${miles} miles from our Aldershot hub.` : '.'}
            {result.approximate ? ' This check used the postcode district, so we will confirm your exact location when you book.' : ''}
          </p>
          <p className="flex items-start gap-2 text-sm font-semibold text-gray-600">
            <Clock size={18} className="shrink-0 mt-0.5 text-[#FB7E10]" aria-hidden="true" />
            <span>
              We confirm fitter availability and your arrival time when you book or call. Typical arrival is 30–60 minutes,
              depending on your location, van availability and traffic.
            </span>
          </p>
          <div className={BUTTON_ROW}>
            <Link href={bookingHref} data-conversion="booking" className={PRIMARY_BUTTON}>
              Continue to booking <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <CallLink label="Call for emergency help" />
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" data-conversion="whatsapp" className={WHATSAPP_BUTTON}>
              <MessageSquare size={18} aria-hidden="true" /> WhatsApp
            </a>
          </div>
          <p className="text-xs text-gray-500 !mt-2">
            A booking is a request: it is not a confirmed appointment until our team contacts you.
          </p>
        </>
      ),
    });
  } else if (result.status === 'outside') {
    body = card({
      tone: 'caution',
      icon: MapPinOff,
      label: 'Outside our usual area',
      title: `${postcode} is outside our usual service area`,
      children: (
        <>
          <p>
            That postcode is about {result.distanceMiles} miles from our Aldershot hub, and we usually cover up to roughly{' '}
            {result.serviceRadiusMiles} miles. We may still be able to help, so please talk to us before ruling it out.
          </p>
          <div className={BUTTON_ROW}>
            <CallLink className={PRIMARY_BUTTON} label="Call to ask" />
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" data-conversion="whatsapp" className={WHATSAPP_BUTTON}>
              <MessageSquare size={18} aria-hidden="true" /> WhatsApp us
            </a>
          </div>
          <p className="text-sm">
            Prefer to leave your details?{' '}
            <Link href={bookingHref} className="font-bold text-[#FB7E10] underline underline-offset-2">
              Send a booking request anyway
            </Link>
            . We will tell you honestly whether we can reach you.
          </p>
        </>
      ),
    });
  } else if (result.status === 'unverified') {
    body = card({
      tone: 'caution',
      icon: SearchX,
      label: 'Postcode not found',
      title: `We couldn't locate ${postcode}`,
      children: (
        <>
          <p>
            {result.message} We have not confirmed whether this area is covered.
          </p>
          <div className={BUTTON_ROW}>
            <Link href={bookingHref} data-conversion="booking" className={PRIMARY_BUTTON}>
              Continue to booking <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <CallLink />
          </div>
          <p className="text-xs text-gray-500">You can correct the postcode on the booking form, and we will check it again.</p>
        </>
      ),
    });
  } else {
    body = card({
      tone: 'problem',
      icon: TriangleAlert,
      label: 'Checker unavailable',
      title: 'Our postcode checker is temporarily unavailable',
      children: (
        <>
          <p>
            That is a problem on our side, not yours. We could not confirm your coverage just now, but you can still send us a
            booking request and we will check your area when we call you back.
          </p>
          <div className={BUTTON_ROW}>
            <button type="button" onClick={() => setAttempt((n) => n + 1)} className={PRIMARY_BUTTON}>
              <RefreshCw size={18} aria-hidden="true" /> Try again
            </button>
            <Link href={bookingHref} data-conversion="booking" className={SECONDARY_BUTTON}>
              Continue to booking
            </Link>
            <CallLink />
          </div>
        </>
      ),
    });
  }

  return (
    <>
      <section className="bg-[#0B1528] text-white py-8 md:py-10">
        <div className={`${CONTAINER} text-center`}>
          <p className="inline-flex items-center gap-2 bg-[#FB7E10]/15 border border-[#FB7E10]/30 text-[#FB7E10] px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-widest mb-3">
            Postcode availability check
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight text-balance">
            {postcode ? (
              <>
                Tyre fitting near <span className="text-[#FB7E10]">{postcode}</span>
              </>
            ) : (
              'Is your area covered?'
            )}
          </h1>
        </div>
      </section>

      <section className="bg-slate-50 py-6 md:py-8">
        <div className={CONTAINER}>
          {/* One column, centred, so the result card, the search card and the steps share the same edges. */}
          <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
          <div aria-live="polite">{body}</div>

          <div className="rounded-2xl bg-white border border-gray-200 p-5 sm:p-6 shadow-sm">
            <h2 className="text-base font-black text-gray-900">{parsed ? 'Check a different postcode' : 'Your postcode'}</h2>
            <p className="text-sm text-gray-500 mt-0.5 mb-3">Full postcodes (GU11 3HY) and the first part (GU11) both work.</p>
            <PostcodeAvailabilityForm key={postcode} variant="light" source="availability-page" buttonLabel="Check" compact />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            {STEPS.map(({ icon: Icon, title, body: text }, index) => (
              <div key={title} className="rounded-2xl bg-white border border-gray-200 p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-9 h-9 rounded-xl bg-[#FB7E10]/10 text-[#FB7E10] flex items-center justify-center">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span className="text-xs font-black uppercase tracking-widest text-gray-400">Step {index + 1}</span>
                </div>
                <p className="font-black text-gray-900">{title}</p>
                <p className="text-sm text-gray-500 mt-1">{text}</p>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AvailabilityView;
