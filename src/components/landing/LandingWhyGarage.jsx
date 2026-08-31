'use client';

import React from 'react';
import { Phone } from 'lucide-react';

const LandingWhyGarage = () => {
  return (
    <section className="bg-gray-50 py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FB7E10]/10 border border-[#FB7E10]/20 text-[#FB7E10] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-3">
            <span>The Mobile Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 leading-tight">
            WHY DRIVE TO A GARAGE?
          </h2>
          <p className="mt-3 text-xl sm:text-2xl font-bold text-[#FB7E10]">
            WE BRING THE GARAGE TO YOU.
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          
          {/* LEFT: TRADITIONAL GARAGE */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 flex flex-col justify-between space-y-6 shadow-sm">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-500 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-4">
                <span>Old Inconvenient Way</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-black text-gray-400 mb-6 tracking-tight">
                TRADITIONAL GARAGE
              </h3>

              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-500 text-base sm:text-lg">
                  <div className="w-8 h-8 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                    <span className="text-lg">🚗</span>
                  </div>
                  <span>Drive there (or pay £150+ for a recovery tow truck)</span>
                </li>
                <li className="flex items-center gap-3 text-gray-500 text-base sm:text-lg">
                  <div className="w-8 h-8 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                    <span className="text-lg">⏳</span>
                  </div>
                  <span>Wait days for an available appointment slot</span>
                </li>
                <li className="flex items-center gap-3 text-gray-500 text-base sm:text-lg">
                  <div className="w-8 h-8 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                    <span className="text-lg">🪑</span>
                  </div>
                  <span>Sit and wait hours in a noisy waiting room</span>
                </li>
                <li className="flex items-center gap-3 text-gray-500 text-base sm:text-lg">
                  <div className="w-8 h-8 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                    <span className="text-lg">🚗</span>
                  </div>
                  <span>Drive home after wasting half your day</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-gray-100 text-xs text-gray-400">
              ❌ High hassle • Wasted time • Added recovery expenses
            </div>
          </div>

          {/* RIGHT: MOBILE TYRE CHAMPIONS */}
          <div className="bg-white border-2 border-[#FB7E10]/40 rounded-3xl p-6 sm:p-10 flex flex-col justify-between space-y-6 shadow-xl shadow-orange-500/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FB7E10]/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-2 bg-[#FB7E10]/10 border border-[#FB7E10]/25 text-[#FB7E10] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-4">
                <span className="w-2 h-2 rounded-full bg-[#FB7E10] animate-ping"></span>
                <span>Fast 24/7 Mobile Service</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-6 tracking-tight">
                MOBILE TYRE CHAMPIONS
              </h3>

              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-800 text-base sm:text-lg font-bold">
                  <div className="w-8 h-8 rounded-full bg-[#FB7E10]/10 border border-[#FB7E10]/25 flex items-center justify-center shrink-0">
                    <span className="text-lg">📍</span>
                  </div>
                  <span>Stay where you are</span>
                </li>
                <li className="flex items-center gap-3 text-gray-800 text-base sm:text-lg font-bold">
                  <div className="w-8 h-8 rounded-full bg-[#FB7E10]/10 border border-[#FB7E10]/25 flex items-center justify-center shrink-0">
                    <span className="text-lg">🚐</span>
                  </div>
                  <span>We come to you in 30–60 mins</span>
                </li>
                <li className="flex items-center gap-3 text-gray-800 text-base sm:text-lg font-bold">
                  <div className="w-8 h-8 rounded-full bg-[#FB7E10]/10 border border-[#FB7E10]/25 flex items-center justify-center shrink-0">
                    <span className="text-lg">🛞</span>
                  </div>
                  <span>Tyre fitted & balanced on-site</span>
                </li>
                <li className="flex items-center gap-3 text-gray-800 text-base sm:text-lg font-bold">
                  <div className="w-8 h-8 rounded-full bg-[#FB7E10]/10 border border-[#FB7E10]/25 flex items-center justify-center shrink-0">
                    <span className="text-lg">✅</span>
                  </div>
                  <span>Back on the road with zero stress</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs font-bold text-[#FB7E10]">
                ⚡ Pay after tyre is fitted & balanced
              </span>
              <a
                href="tel:02071013856"
                data-conversion="phone-call"
                className="bg-[#FB7E10] hover:bg-orange-600 text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md active:scale-95"
              >
                Call Dispatch
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LandingWhyGarage;
