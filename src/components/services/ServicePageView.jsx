import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, ChevronDown, Clock, MessageSquare, Phone, ShieldCheck, Wrench } from 'lucide-react';
import PostcodeAvailabilityForm from '../landing/PostcodeAvailabilityForm';
import { SERVICE_PAGES } from '../../data/servicePages';
import { BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_HREF, whatsappLink } from '../../lib/booking';

const STEPS = [
  { icon: Phone, title: 'Tell us what you need', body: 'Call, message us, or send a booking request with your tyre size or registration and your location.' },
  { icon: Clock, title: 'Get your quote and arrival time', body: 'We confirm the tyre options, a clear price for the agreed work and an estimated arrival time. No upfront deposit.' },
  { icon: Wrench, title: 'We fit it, you pay after', body: 'Our technician completes the work, checks it, and you pay once it is done.' },
];

const ServicePageView = ({ page }) => {
  const related = page.related.map((slug) => SERVICE_PAGES.find((p) => p.slug === slug)).filter(Boolean);
  const bookingHref = `/booking?mode=${page.defaultMode}`;
  const whatsapp = whatsappLink(`Hi Mobile Tyre Champions, I need help with: ${page.title}.`);

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: page.title,
      serviceType: page.title,
      description: page.lead,
      areaServed: ['Surrey', 'Hampshire', 'Berkshire'],
      provider: {
        '@type': 'AutoRepair',
        name: 'Mobile Tyre Champions',
        telephone: '+44-207-101-3856',
        email: 'info@mobiletyrechampions.com',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
  ];

  return (
    <>
      {schema.map((entry) => (
        <script key={entry['@type']} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }} />
      ))}

      {/* Hero */}
      <section className="relative bg-[#0A0A0A] text-white overflow-hidden px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <Image src={page.image} alt="" fill priority sizes="100vw" className="object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/40" aria-hidden="true" />
        <div className="relative max-w-5xl mx-auto">
          <nav aria-label="Breadcrumb" className="text-xs font-bold text-slate-400 mb-5">
            <Link href="/" className="hover:text-white">Home</Link> <span aria-hidden="true">/</span>{' '}
            <Link href="/#services" className="hover:text-white">Services</Link> <span aria-hidden="true">/</span>{' '}
            <span className="text-slate-200">{page.title}</span>
          </nav>

          <p className="inline-flex items-center gap-2 bg-[#FB7E10]/15 border border-[#FB7E10]/30 text-[#FB7E10] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4">
            {page.eyebrow}
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] max-w-3xl">{page.heading}</h1>
          <p className="mt-5 text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl">{page.lead}</p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-2xl">
            <Link
              href={bookingHref}
              data-conversion="booking"
              className="inline-flex items-center justify-center gap-2 bg-[#FB7E10] hover:bg-orange-600 text-white px-7 py-4 rounded-2xl font-black text-sm uppercase tracking-wider shadow-xl shadow-orange-500/25 active:scale-95 transition-all"
            >
              {page.bookLabel} <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a
              href={BUSINESS_PHONE_HREF}
              data-conversion="phone-call"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/25 text-white px-7 py-4 rounded-2xl font-black text-sm uppercase tracking-wider active:scale-95 transition-all"
            >
              <Phone size={18} className="fill-current" aria-hidden="true" /> {BUSINESS_PHONE_DISPLAY}
            </a>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              data-conversion="whatsapp"
              className="inline-flex items-center justify-center gap-2 bg-[#22C55E] hover:bg-green-600 text-white px-7 py-4 rounded-2xl font-black text-sm uppercase tracking-wider active:scale-95 transition-all"
            >
              <MessageSquare size={18} aria-hidden="true" /> WhatsApp
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold text-slate-200">
            {['24/7 dispatch', 'Typical arrival 30–60 min', 'Pay after fitting'].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check size={16} className="text-[#FB7E10]" aria-hidden="true" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What's included + postcode check */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-3">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-6">What you get</h2>
            <ul className="space-y-3.5">
              {page.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-gray-700 font-semibold">
                  <span className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-[#FB7E10]/10 border border-[#FB7E10]/25 flex items-center justify-center">
                    <Check size={14} className="text-[#FB7E10]" aria-hidden="true" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:col-span-2 rounded-3xl bg-slate-50 border border-gray-200 p-6 sm:p-7">
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#FB7E10] mb-2">
              <ShieldCheck size={15} aria-hidden="true" /> Check your area
            </p>
            <h2 className="text-xl font-black text-gray-900 mb-1">Do you cover my postcode?</h2>
            <p className="text-sm text-gray-500 mb-4">Enter it and we will check you are inside our service area.</p>
            <PostcodeAvailabilityForm variant="light" source={`service-${page.slug}`} stacked buttonLabel="Check my postcode" />
          </aside>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-50 px-4 sm:px-6 lg:px-8 py-14 md:py-20 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight text-center mb-10">How it works</h2>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {STEPS.map(({ icon: Icon, title, body }, index) => (
              <li key={title} className="rounded-3xl bg-white border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-11 h-11 rounded-2xl bg-[#FB7E10]/10 text-[#FB7E10] flex items-center justify-center">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span className="text-xs font-black uppercase tracking-widest text-gray-400">Step {index + 1}</span>
                </div>
                <h3 className="font-black text-gray-900 text-lg">{title}</h3>
                <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Good to know */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-8">Good to know</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {page.goodToKnow.map((item) => (
              <div key={item.title} className="rounded-3xl bg-slate-50 border border-gray-200 p-6">
                <h3 className="font-black text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ: native <details>, so it works without JavaScript */}
      <section className="bg-slate-50 px-4 sm:px-6 lg:px-8 py-14 md:py-20 border-y border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-8">Common questions</h2>
          <div className="space-y-3">
            {page.faqs.map((faq) => (
              <details key={faq.q} className="group rounded-2xl bg-white border border-gray-200 open:border-[#FB7E10]/40 open:shadow-md transition-all">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 font-black text-gray-900 [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <ChevronDown size={20} className="shrink-0 text-gray-400 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="px-5 pb-5 text-gray-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-8">Other services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="group rounded-3xl bg-slate-50 border-2 border-gray-200 hover:border-[#FB7E10] p-6 transition-all"
              >
                <p className="text-xs font-black uppercase tracking-widest text-[#FB7E10] mb-1">{item.eyebrow}</p>
                <h3 className="font-black text-gray-900 text-lg group-hover:text-[#FB7E10] transition-colors">{item.title}</h3>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-black text-gray-500 group-hover:text-[#FB7E10]">
                  Learn more <ArrowRight size={15} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Closing call to action */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 md:pb-24 bg-white">
        <div className="max-w-5xl mx-auto rounded-3xl md:rounded-[2.5rem] bg-gradient-to-br from-[#111111] via-[#1A1A1A] to-[#0A0A0A] border border-white/10 text-white text-center px-6 py-12 md:py-16">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Ready when you are</h2>
          <p className="mt-3 text-slate-300 max-w-xl mx-auto">
            No upfront payment, and a clear quote before any work begins. Across Surrey, Hampshire and Berkshire.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={bookingHref}
              data-conversion="booking"
              className="inline-flex items-center justify-center gap-2 bg-[#FB7E10] hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-wider shadow-xl shadow-orange-500/25 active:scale-95 transition-all"
            >
              {page.bookLabel} <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a
              href={BUSINESS_PHONE_HREF}
              data-conversion="phone-call"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/25 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-wider active:scale-95 transition-all"
            >
              <Phone size={18} className="fill-current" aria-hidden="true" /> Call {BUSINESS_PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicePageView;
