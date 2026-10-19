'use client';

import React from 'react';
import Image from 'next/image';
import { Phone, Calendar, ArrowRight, Clock, ShieldCheck, MessageSquare, Zap } from 'lucide-react';
import { SERVICE_AREAS_TEXT } from '@/lib/siteText';

const LandingFinalCTA = () => {
  return (
    <section className="bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Radiant ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#FB7E10]/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative rounded-3xl md:rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#111111] via-[#1A1A1A] to-[#0A0A0A] border border-white/15 p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl">
        
        {/* Background Graphic */}
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-15 pointer-events-none">
          <Image
            src="/images/cta-bg.webp"
            alt="Tyre tread background pattern"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover grayscale brightness-150"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-transparent to-[#111111]" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-6 text-center md:text-left">
          
          <div className="inline-flex items-center gap-2 bg-[#FB7E10]/20 border border-[#FB7E10]/40 px-4 py-1.5 rounded-full text-[#FB7E10] text-xs font-black uppercase tracking-widest shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FB7E10] animate-ping"></span>
            <span>24/7 RAPID MOBILE TYRE RESPONSE</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight">
            STILL STUCK?<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FB7E10] to-orange-400">
              LET'S GET YOU MOVING.
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed">
            24/7 mobile tyre fitting at your location. Certified technicians arrive with new tyres and digital balancing in <strong className="text-white">30–60 minutes</strong> across {SERVICE_AREAS_TEXT}.
          </p>

          {/* Big Phone Number Display */}
          <div className="pt-2">
            <span className="text-xs uppercase tracking-widest text-[#FB7E10] font-black block mb-1">
              Direct On-Duty Emergency Line:
            </span>
            <a
              href="tel:02071013856"
              data-conversion="phone-call"
              className="text-3xl sm:text-4xl md:text-5xl font-black text-white hover:text-[#FB7E10] transition-colors tracking-tight"
            >
              0207 101 3856
            </a>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
            <div className="w-full sm:w-auto animate-zoom-pulse sm:order-2">
              <a
                href="tel:02071013856"
                data-conversion="phone-call"
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-[#FB7E10] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black text-lg md:text-xl uppercase tracking-wider shadow-2xl shadow-orange-500/30 active:scale-95 transition-all text-center border border-orange-400/30"
              >
                <Phone size={24} className="fill-current animate-bounce" />
                <span>CALL NOW — 0207 101 3856</span>
              </a>
            </div>

            <a
              href="#postcode-checker"
              data-conversion="availability-check"
              className="w-full sm:w-auto sm:order-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 px-8 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg uppercase tracking-wider transition-all shadow-lg active:scale-95 text-center backdrop-blur-md"
            >
              <Calendar size={20} className="text-[#FB7E10]" />
              <span>CHECK AVAILABILITY</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

export default LandingFinalCTA;
