'use client';

import React, { useState } from 'react';
import { Phone, Send, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { validateUKPhoneNumber } from '../../api/appointmentService';

const WHATSAPP_NUMBER = '447494024653';

const SERVICE_OPTIONS = [
  'Emergency roadside fitting',
  'Home or workplace fitting',
  'Puncture repair',
  'Locking wheel nut removal',
];

const TRUST_POINTS = [
  'Fixed quote before any work begins',
  'Typical arrival in 30–60 minutes',
  'Pay only once the tyre is fitted and checked',
];

/* ──────────────────────────────────────────────────────────────────────────
   Where the enquiry goes.

   This sends the completed enquiry to the WhatsApp Business number, which
   needs no backend and reaches the dispatch team straight away. To route it
   into a CRM or the Strapi booking backend instead, replace the body of this
   function — nothing else in the component needs to change.
   ────────────────────────────────────────────────────────────────────────── */
const deliverEnquiry = (form) => {
  const lines = [
    'Callback request from the Mobile Tyre Champions landing page:',
    '',
    `Name: ${form.name}`,
    `Mobile: ${form.phone}`,
    `Location: ${form.location}`,
    `Tyre size / registration: ${form.tyre.trim() || 'Not known — please help identify'}`,
    `Needs: ${form.service}`,
  ];
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
};

const EMPTY_FORM = { name: '', phone: '', location: '', tyre: '', service: '' };

const FIELD_CLASS =
  'w-full px-4 py-3.5 bg-gray-50 border-2 rounded-2xl text-gray-900 font-bold text-base placeholder:text-gray-400 placeholder:font-medium focus:bg-white focus:border-[#FB7E10] focus:outline-none transition-all';

const LandingQuoteForm = () => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (field) => (e) => {
    setForm((current) => ({ ...current, [field]: e.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nextErrors = {};
    if (form.name.trim().length < 2) nextErrors.name = 'Please tell us your name';
    if (!validateUKPhoneNumber(form.phone)) nextErrors.phone = 'Enter a valid UK mobile number';
    if (!form.location.trim()) nextErrors.location = 'We need a postcode, road name or location';
    if (!form.service) nextErrors.service = 'Pick the service you need';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    deliverEnquiry(form);
    setSent(true);
  };

  return (
    <section
      id="quote"
      className="scroll-mt-20 lg:scroll-mt-24 bg-gray-50 py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-100"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">

        {/* Pitch */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-[#FB7E10]/10 border border-[#FB7E10]/20 text-[#FB7E10] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-3">
            <Clock size={14} />
            <span>Callback Request</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 leading-tight">
            Get a Mobile Tyre Quote in Minutes
          </h2>

          <p className="mt-4 text-gray-500 text-base sm:text-lg leading-relaxed">
            Tell us what you need and where your vehicle is. We'll contact you with tyre options, pricing and the next available fitting window.
          </p>

          <ul className="mt-7 space-y-3 inline-block text-left">
            {TRUST_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm sm:text-base font-bold text-gray-700">
                <CheckCircle2 size={20} className="text-[#FB7E10] shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 p-5 bg-white border-2 border-gray-200 rounded-2xl">
            <p className="text-sm font-bold text-gray-700">
              Need help right now?
            </p>
            <a
              href="tel:02071013856"
              data-conversion="phone-call"
              className="mt-1 inline-flex items-center gap-2 text-xl sm:text-2xl font-black text-gray-900 hover:text-[#FB7E10] transition-colors tracking-tight"
            >
              <Phone size={20} className="text-[#FB7E10] fill-current shrink-0" />
              0207 101 3856
            </a>
            <p className="mt-1 text-xs text-gray-500 font-medium">
              Call instead of waiting for a callback.
            </p>
          </div>
        </div>

        {/* Form card */}
        <div className="bg-white border border-gray-200 rounded-3xl md:rounded-[2rem] p-6 sm:p-8 shadow-xl">
          {sent ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#FB7E10]/10 border border-[#FB7E10]/25 flex items-center justify-center">
                <CheckCircle2 size={32} className="text-[#FB7E10]" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">Request sent</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-sm mx-auto">
                Your enquiry is on its way to our dispatch team. If you need a tyre fitted right now, calling is still the fastest route.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <a
                  href="tel:02071013856"
                  data-conversion="phone-call"
                  className="flex items-center justify-center gap-2 bg-[#FB7E10] hover:bg-orange-600 text-white px-6 py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider transition-all shadow-lg active:scale-95"
                >
                  <Phone size={16} className="fill-current" />
                  Call 0207 101 3856
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setForm(EMPTY_FORM);
                    setSent(false);
                  }}
                  className="px-6 py-3.5 rounded-2xl font-bold text-sm uppercase tracking-wider text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all active:scale-95"
                >
                  Send another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label htmlFor="quote-name" className="block text-sm font-black text-gray-900 mb-1.5">
                  Your name
                </label>
                <input
                  id="quote-name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={update('name')}
                  placeholder="e.g. Sarah Collins"
                  aria-invalid={Boolean(errors.name)}
                  className={`${FIELD_CLASS} ${errors.name ? 'border-red-400' : 'border-gray-200'}`}
                />
                {errors.name && <p className="mt-1.5 text-xs font-bold text-red-500">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="quote-phone" className="block text-sm font-black text-gray-900 mb-1.5">
                  Mobile number
                </label>
                <input
                  id="quote-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={update('phone')}
                  placeholder="e.g. 07700 900123"
                  aria-invalid={Boolean(errors.phone)}
                  className={`${FIELD_CLASS} ${errors.phone ? 'border-red-400' : 'border-gray-200'}`}
                />
                {errors.phone && <p className="mt-1.5 text-xs font-bold text-red-500">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="quote-location" className="block text-sm font-black text-gray-900 mb-1.5">
                  Postcode or current location
                </label>
                <input
                  id="quote-location"
                  type="text"
                  autoComplete="postal-code"
                  value={form.location}
                  onChange={update('location')}
                  placeholder="e.g. GU11 3HY, or A31 near Farnham"
                  aria-invalid={Boolean(errors.location)}
                  className={`${FIELD_CLASS} ${errors.location ? 'border-red-400' : 'border-gray-200'}`}
                />
                {errors.location && <p className="mt-1.5 text-xs font-bold text-red-500">{errors.location}</p>}
              </div>

              <div>
                <label htmlFor="quote-tyre" className="block text-sm font-black text-gray-900 mb-1.5">
                  Tyre size or vehicle registration
                </label>
                <input
                  id="quote-tyre"
                  type="text"
                  value={form.tyre}
                  onChange={update('tyre')}
                  placeholder="e.g. 225/45 R17 or AB12 CDE"
                  aria-describedby="quote-tyre-hint"
                  className={`${FIELD_CLASS} border-gray-200`}
                />
                <p id="quote-tyre-hint" className="mt-1.5 text-xs text-gray-500 font-medium">
                  Not sure? Leave this blank. We'll help.
                </p>
              </div>

              <fieldset>
                <legend className="block text-sm font-black text-gray-900 mb-2">
                  What do you need help with?
                </legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {SERVICE_OPTIONS.map((option) => {
                    const selected = form.service === option;
                    return (
                      <label
                        key={option}
                        className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl border-2 cursor-pointer transition-all text-sm font-bold ${
                          selected
                            ? 'bg-[#FB7E10]/10 border-[#FB7E10] text-gray-900'
                            : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-[#FB7E10]/40'
                        }`}
                      >
                        <input
                          type="radio"
                          name="quote-service"
                          value={option}
                          checked={selected}
                          onChange={update('service')}
                          className="sr-only"
                        />
                        <span
                          className={`w-4 h-4 rounded-full border-2 shrink-0 transition-all ${
                            selected ? 'border-[#FB7E10] bg-[#FB7E10] ring-2 ring-inset ring-white' : 'border-gray-300'
                          }`}
                          aria-hidden="true"
                        />
                        <span>{option}</span>
                      </label>
                    );
                  })}
                </div>
                {errors.service && <p className="mt-1.5 text-xs font-bold text-red-500">{errors.service}</p>}
              </fieldset>

              <button
                type="submit"
                data-conversion="callback-request"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#FB7E10] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-4 rounded-2xl font-black text-base uppercase tracking-wide shadow-xl shadow-orange-500/25 active:scale-[0.98] transition-all border border-orange-400/30"
              >
                <Send size={18} className="shrink-0" />
                <span>Send My Callback Request</span>
              </button>

              <p className="flex items-start gap-2 text-xs text-gray-500 font-medium leading-relaxed">
                <ShieldCheck size={15} className="text-[#FB7E10] shrink-0 mt-0.5" />
                <span>No upfront payment. No obligation to book until you've received your quote.</span>
              </p>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};

export default LandingQuoteForm;
