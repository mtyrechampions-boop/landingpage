'use client';

import React from 'react';
import Image from 'next/image';
import { Phone, Clock } from 'lucide-react';

const LandingHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/images/MTC logo 2.webp"
              alt="Mobile Tyre Champions"
              width={48}
              height={48}
              className="w-10 h-10 sm:w-12 sm:h-12"
              priority
            />
          </a>

          {/* Center: Live Dispatch Status */}
          <div className="hidden sm:flex items-center gap-2 bg-gray-100 border border-gray-200 px-4 py-2 rounded-full">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              24/7 Emergency Dispatch Active • 30–60 Min Arrival
            </span>
          </div>

          {/* Right: Call CTA */}
          <a
            href="tel:02071013856"
            data-conversion="phone-call"
            className="flex items-center gap-2 bg-[#FB7E10] hover:bg-orange-600 text-white px-4 sm:px-6 py-2.5 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-orange-500/20 active:scale-95 transition-all"
          >
            <Phone size={16} className="fill-current" />
            <span className="hidden xs:inline">CALL NOW —</span>
            <span>0207 101 3856</span>
          </a>
          
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
