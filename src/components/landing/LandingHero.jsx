'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Phone, MessageSquare, CheckCircle2 } from 'lucide-react';
import PostcodeAvailabilityForm from './PostcodeAvailabilityForm';

// Prefilled so the first WhatsApp message already carries what the fitter needs.
const WHATSAPP_HREF =
  'https://wa.me/447494024653?text=Hi%20Mobile%20Tyre%20Champions%2C%20I%20need%20a%20tyre%20quote.%0AMy%20tyre%20size%3A%20%0AMy%20location%3A%20';

const LandingHero = () => {
  // The background video is only mounted on desktop so phones and tablets never
  // download the MP4 — they get the lighter fitter photo instead.
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsDesktop(desktop.matches);
    update();
    desktop.addEventListener('change', update);
    return () => desktop.removeEventListener('change', update);
  }, []);

  return (
    <section id="top" className="relative bg-[#0A0A0A] text-white pt-8 pb-16 lg:pt-16 lg:pb-24 overflow-hidden border-b border-white/10">
      {/* Background: fitter photo on mobile & tablet, video on desktop */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <Image
          src="/images/mtc-hero-mobile.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 1px"
          className="object-cover object-[center_35%] lg:hidden"
        />
        {isDesktop && (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="hidden lg:block absolute inset-0 w-full h-full object-cover scale-[1.22] origin-top"
          >
            <source src="/mtc-hero-video.mp4" type="video/mp4" />
          </video>
        )}
        {/* Gradient overlay keeps the headline crisp over both backgrounds; heavier
            at the top on mobile where the text sits over the photo */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/70 lg:bg-gradient-to-r lg:from-black/75 lg:via-black/45 lg:to-black/35" />
      </div>

      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#FB7E10]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Emergency Response Headline & Action (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 bg-[#FB7E10]/15 border border-[#FB7E10]/30 px-4 py-2 rounded-full backdrop-blur-md">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FB7E10] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FB7E10]"></span>
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-[#FB7E10] tracking-wide uppercase">
                24/7 EMERGENCY MOBILE TYRE DISPATCH
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black tracking-tight text-white leading-[1.05]">
              FLAT TYRE?<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FB7E10] via-orange-400 to-amber-400">
                WE'LL COME TO YOU. FAST.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-tight">
              Emergency Mobile Tyre Fitting in 30–60 Minutes
            </p>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Stranded in Camberley, Farnborough, Yateley, Guildford, Portsmouth or Southampton? Our Aldershot-based mobile tyre fitters come directly to your home, workplace or roadside.
            </p>

            <p className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              <strong className="text-white font-bold">Estimated arrival time is 30–60 minutes</strong>, subject to location and traffic.
            </p>

            {/* The three objections, answered up front */}
            <p className="text-sm sm:text-base font-black text-[#FB7E10] leading-relaxed">
              No garage queues. No unnecessary recovery truck wait. No upfront payment.
            </p>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 max-w-2xl mx-auto lg:mx-0">
              {/* Primary Call CTA */}
              <div className="sm:order-2 space-y-2">
                <div className="animate-zoom-pulse">
                  <a
                    href="tel:02071013856"
                    data-conversion="phone-call"
                    className="w-full flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-[#FB7E10] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-3.5 sm:py-4 rounded-2xl font-black text-[15px] min-[380px]:text-base lg:text-lg uppercase tracking-wide whitespace-nowrap shadow-2xl shadow-orange-500/30 active:scale-95 transition-all text-center border border-orange-400/30"
                  >
                    <Phone size={24} className="w-[18px] h-[18px] sm:w-5 sm:h-5 shrink-0 fill-current animate-bounce" />
                    <span>CALL NOW 24/7</span>
                  </a>
                </div>
                <p className="text-xs sm:text-[13px] text-slate-400 font-medium">
                  <span className="text-white font-black">0207 101 3856</span> — emergency roadside assistance
                </p>
              </div>

              {/* Secondary WhatsApp CTA */}
              <div className="sm:order-1 space-y-2">
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-conversion="whatsapp"
                  className="w-full flex items-center justify-center gap-2 bg-[#22C55E] hover:bg-green-600 text-white px-4 py-3.5 sm:py-4 rounded-2xl font-black text-[15px] min-[380px]:text-base lg:text-lg uppercase tracking-wide whitespace-nowrap shadow-2xl shadow-green-500/25 active:scale-95 transition-all text-center border border-green-400/30"
                >
                  <MessageSquare size={20} className="w-[17px] h-[17px] sm:w-5 sm:h-5 shrink-0" />
                  <span>WhatsApp Quote</span>
                </a>
                <p className="text-xs sm:text-[13px] text-slate-400 font-medium">
                  Send your tyre size and location for a quick response.
                </p>
              </div>
            </div>

            {/* Fast Benefit Tags */}
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto lg:mx-0 text-left pt-1">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#FB7E10] shrink-0" />
                <span>Pay After Fitting</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#FB7E10] shrink-0" />
                <span>On-Site Wheel Balancing</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#FB7E10] shrink-0" />
                <span>24/7 Emergency Dispatch</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#FB7E10] shrink-0" />
                <span>Major Tyre Brands & Sizes</span>
              </div>
            </div>

          </div>

          {/* Right Column: High-Conversion Live Dispatch & Availability Console (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-br from-[#111111] via-[#1A1A1A] to-[#111111] rounded-3xl md:rounded-[2.5rem] border-2 border-white/15 p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
              
              {/* Radar Status Header */}
              <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <div>
                    <h3 className="text-sm font-black text-white uppercase tracking-wider">
                      Live Van Radar
                    </h3>
                    <p className="text-[11px] text-slate-400 font-medium">
                      Technicians on active patrol
                    </p>
                  </div>
                </div>

                <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                  Online 24/7
                </span>
              </div>

              {/* Instant Postcode Lookup */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-base sm:text-lg font-black text-white leading-tight mb-1">
                    Check Instant Technician ETA
                  </h4>
                  <p className="text-xs text-slate-400">
                    Enter your postcode to find the nearest on-call mobile tyre fitter:
                  </p>
                </div>

                <PostcodeAvailabilityForm
                  variant="dark"
                  source="hero"
                  stacked
                  buttonLabel="Check Fitter Availability"
                />
              </div>

              {/* Direct Emergency Call Banner */}
              <div className="mt-6 pt-5 border-t border-white/10">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#FB7E10] uppercase tracking-wider block">
                      Direct Emergency Controller:
                    </span>
                    <a
                      href="tel:02071013856"
                      data-conversion="phone-call"
                      className="text-lg sm:text-xl font-black text-white hover:text-[#FB7E10] transition-colors"
                    >
                      0207 101 3856
                    </a>
                  </div>
                  <a
                    href="tel:02071013856"
                    data-conversion="phone-call"
                    className="p-3 bg-[#FB7E10] hover:bg-orange-600 text-white rounded-xl shadow-md active:scale-95 transition-all"
                  >
                    <Phone size={18} className="fill-current" />
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LandingHero;
