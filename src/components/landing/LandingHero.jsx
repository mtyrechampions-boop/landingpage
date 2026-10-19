'use client';

import React, { useState } from 'react';
import { Phone, Calendar, ArrowRight, Clock, ShieldCheck, CheckCircle2, MapPin, Zap, AlertTriangle, Radio } from 'lucide-react';
import { validateUKPostcode } from '../../api/appointmentService';
import { SERVICE_AREAS_TEXT } from '@/lib/siteText';

const LandingHero = () => {
  const [postcode, setPostcode] = useState('');
  const [error, setError] = useState('');

  const handlePostcodeSubmit = (e) => {
    e.preventDefault();
    if (!postcode.trim()) {
      setError('Please enter your UK postcode');
      return;
    }
    if (!validateUKPostcode(postcode)) {
      setError('Please enter a valid UK postcode (e.g. GU11 3HY or GU11)');
      return;
    }
    window.location.href = `https://mobiletyrechampions.com/booking?postcode=${encodeURIComponent(postcode.trim().toUpperCase())}`;
  };

  return (
    <section className="relative bg-[#0A0A0A] text-white pt-8 pb-16 lg:pt-16 lg:pb-24 overflow-hidden border-b border-white/10">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover scale-[1.22] origin-top"
        >
          <source src="/mtc-hero-video.mp4" type="video/mp4" />
        </video>
        {/* Subtle gradient overlay to make text crisp while keeping video vivid & bright */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/35" />
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
                WE'LL COME TO YOU.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Fast mobile tyre fitting at home, work or roadside. Typical arrival in <strong className="text-white font-bold">30–60 minutes</strong> across Surrey, Hampshire & Berkshire. All tyre sizes in stock.
            </p>

            {/* Fast Benefit Tags */}
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto lg:mx-0 text-left pt-1">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#FB7E10] shrink-0" />
                <span>Pay After Fitting</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#FB7E10] shrink-0" />
                <span>30–60 Min Rapid Arrival</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#FB7E10] shrink-0" />
                <span>All Tyre Sizes Carried</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#FB7E10] shrink-0" />
                <span>Motorway & Roadside Safe</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 justify-center lg:justify-start">
              {/* Primary Call CTA */}
              <div className="w-full sm:w-auto animate-zoom-pulse sm:order-2">
                <a
                  href="tel:02071013856"
                  data-conversion="phone-call"
                  className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-[#FB7E10] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 sm:py-5 rounded-2xl font-black text-lg sm:text-xl uppercase tracking-wider shadow-2xl shadow-orange-500/30 active:scale-95 transition-all text-center border border-orange-400/30"
                >
                  <Phone size={24} className="fill-current animate-bounce" />
                  <span>CALL NOW — 0207 101 3856</span>
                </a>
              </div>

              {/* Secondary Check Availability CTA */}
              <a
                href="#postcode-checker"
                data-conversion="availability-check"
                className="w-full sm:w-auto sm:order-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 px-7 py-4 sm:py-5 rounded-2xl font-bold text-base uppercase tracking-wider transition-all shadow-lg active:scale-95 text-center backdrop-blur-md"
              >
                <Calendar size={20} className="text-[#FB7E10]" />
                <span>CHECK AVAILABILITY</span>
              </a>
            </div>

            {/* Under the buttons trust line */}
            <div className="pt-2 text-xs sm:text-sm font-black uppercase tracking-widest text-[#FB7E10] flex items-center justify-center lg:justify-start gap-2 flex-wrap">
              <span>24/7 SERVICE</span>
              <span className="text-white/40">•</span>
              <span>HOME</span>
              <span className="text-white/40">•</span>
              <span>WORK</span>
              <span className="text-white/40">•</span>
              <span>ROADSIDE</span>
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

                <form onSubmit={handlePostcodeSubmit} className="space-y-3">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-[#FB7E10]" />
                    </div>
                    <input
                      type="text"
                      value={postcode}
                      onChange={(e) => {
                        setPostcode(e.target.value);
                        setError('');
                      }}
                      placeholder="Enter Postcode (e.g. GU11 3HY)"
                      className={`w-full pl-12 pr-4 py-4 bg-white/10 border-2 ${
                        error ? 'border-red-500' : 'border-white/20'
                      } rounded-2xl text-white font-bold text-base placeholder:text-slate-400 focus:border-[#FB7E10] focus:bg-white/15 focus:outline-none transition-all`}
                    />
                  </div>

                  {error && (
                    <p className="text-xs font-bold text-red-400 pl-1">{error}</p>
                  )}

                  <button
                    type="submit"
                    data-conversion="availability-check"
                    className="w-full bg-gradient-to-r from-[#FB7E10] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 rounded-2xl font-black text-base uppercase tracking-wider shadow-xl shadow-orange-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 border border-orange-400/30"
                  >
                    <span>Check Fitter Availability</span>
                    <ArrowRight size={18} />
                  </button>
                </form>
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

              {/* Trust Micro-Pills */}
              <div className="mt-4 flex items-center justify-between text-[11px] font-semibold text-slate-400 px-1">
                <span>⏱ 30–60 min dispatch</span>
                <span>🔒 Zero upfront payment</span>
                <span>📍 We come to you</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LandingHero;
