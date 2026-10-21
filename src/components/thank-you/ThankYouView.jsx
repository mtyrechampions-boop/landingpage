'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CalendarDays, CheckCircle2, ClipboardCheck, Phone, PhoneCall, Wrench } from 'lucide-react';
import { BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_HREF, SERVICE_MODES } from '../../lib/booking';

const NEXT_STEPS = [
  { icon: ClipboardCheck, title: 'We review your request', body: 'We check your area, your vehicle and the tyre you need.' },
  { icon: PhoneCall, title: 'We call you to confirm', body: 'We confirm the tyre, the price and your arrival time on the number you gave us.' },
  { icon: Wrench, title: 'We fit it where you are', body: 'You pay once the work has been completed and checked.' },
];

// Only a short reference is worth showing to a customer; Strapi's long document ids are not.
const showableReference = (reference) => (reference && String(reference).length <= 10 ? String(reference) : null);

const ThankYouView = () => {
  const [summary, setSummary] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let stored = null;
    try {
      stored = JSON.parse(sessionStorage.getItem('mtc:lastBooking') ?? 'null');

      // Tell Tag Manager once per booking. No personal details are included.
      if (stored && !sessionStorage.getItem('mtc:thankYouTracked')) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: 'booking_request_submitted', booking_mode: stored.mode });
        sessionStorage.setItem('mtc:thankYouTracked', '1');
      }
    } catch {
      stored = null;
    }
    setSummary(stored);
    setLoaded(true);
  }, []);

  const mode = SERVICE_MODES.find((m) => m.id === summary?.mode);
  const reference = showableReference(summary?.reference);
  const rows = summary
    ? [
        ['Request', mode?.label],
        ['Preferred timing', summary.timing],
        ['Postcode', summary.postcode],
        ['Tyre', summary.tyre],
        ['Reference', reference],
      ].filter(([, value]) => value)
    : [];

  return (
    <>
      <section className="bg-[#0B1528] text-white px-4 sm:px-6 lg:px-8 pt-14 pb-24 md:pt-20 md:pb-28">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center">
            <CheckCircle2 size={44} className="text-emerald-400" aria-hidden="true" />
          </div>
          <p className="inline-block bg-[#FB7E10]/15 border border-[#FB7E10]/30 text-[#FB7E10] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4">
            Booking request received
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            {summary?.firstName ? `Thanks ${summary.firstName}, we've got your request` : "Thanks, we've got your request"}
          </h1>
          <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-xl mx-auto">
            Our team will phone you to confirm availability, the price and when we can arrive. Your fitting is not confirmed until
            we have spoken.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto -mt-14 space-y-6">
          {loaded && rows.length > 0 && (
            <div className="rounded-3xl bg-white border border-gray-200 shadow-sm p-6 sm:p-8">
              <h2 className="flex items-center gap-2 text-lg font-black text-gray-900 mb-4">
                <CalendarDays size={20} className="text-[#FB7E10]" aria-hidden="true" /> What you sent us
              </h2>
              <dl className="divide-y divide-gray-100">
                {rows.map(([label, value]) => (
                  <div key={label} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 py-3">
                    <dt className="sm:w-40 shrink-0 text-xs font-black uppercase tracking-widest text-gray-400">{label}</dt>
                    <dd className="font-bold text-gray-900">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="rounded-3xl bg-white border border-gray-200 shadow-sm p-6 sm:p-8">
            <h2 className="text-lg font-black text-gray-900 mb-5">What happens next</h2>
            <ol className="space-y-5">
              {NEXT_STEPS.map(({ icon: Icon, title, body }, index) => (
                <li key={title} className="flex items-start gap-4">
                  <span className="shrink-0 w-11 h-11 rounded-2xl bg-[#FB7E10]/10 text-[#FB7E10] flex items-center justify-center">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-black text-gray-900">
                      <span className="text-gray-400 mr-2">{index + 1}.</span>
                      {title}
                    </p>
                    <p className="text-sm text-gray-500 mt-0.5">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-3xl bg-[#0B1528] text-white p-6 sm:p-8 text-center space-y-4">
            <p className="text-lg font-black">Stranded, or can't wait for a callback?</p>
            <p className="text-sm text-slate-300">Call us now. Our dispatch team answers 24 hours a day, 7 days a week.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={BUSINESS_PHONE_HREF}
                data-conversion="phone-call"
                className="inline-flex items-center justify-center gap-2 bg-[#FB7E10] hover:bg-orange-600 text-white px-7 py-4 rounded-2xl font-black text-sm uppercase tracking-wider shadow-lg shadow-orange-500/25 active:scale-95 transition-all"
              >
                <Phone size={18} className="fill-current" aria-hidden="true" /> Call {BUSINESS_PHONE_DISPLAY}
              </a>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white px-7 py-4 rounded-2xl font-black text-sm uppercase tracking-wider active:scale-95 transition-all"
              >
                Back to the home page <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ThankYouView;
