'use client';

import React from 'react';
import { MapPin, Phone, Navigation, Radio } from 'lucide-react';

const primaryTowns = [
  'Aldershot', 'Farnham', 'Fleet', 'Camberley', 'Guildford',
  'Woking', 'Basingstoke', 'Farnborough', 'Bracknell', 'Reading',
  'Slough', 'Maidenhead', 'Godalming', 'Alton', 'Ascot', 'Eton',
  'Windsor', 'Haslemere', 'Hook', 'Sandhurst', 'Yateley', 'Newbury',
  'Portsmouth', 'Southampton'
];

// The six priority towns for this page. Each card carries the surrounding areas the
// same van covers, so a visitor from a neighbouring town still sees themselves here.
const targetLocations = [
  { name: 'Camberley', county: 'Surrey', nearby: 'Frimley, Bagshot, Lightwater, Deepcut, Blackwater — M3 J3–J4, A30' },
  { name: 'Farnborough', county: 'Hampshire', nearby: 'Aldershot, Cove, Ash Vale, Mytchett, Farnham — M3 J4, A331' },
  { name: 'Yateley', county: 'Hampshire', nearby: 'Blackwater, Hawley, Eversley, Fleet, Hartley Wintney — M3 J4a' },
  { name: 'Guildford', county: 'Surrey', nearby: 'Godalming, Woking, Merrow, Burpham, Ripley — A3, A31' },
  { name: 'Portsmouth', county: 'Hampshire', nearby: 'Southsea, Cosham, Havant, Fareham, Waterlooville — M27, A3(M)' },
  { name: 'Southampton', county: 'Hampshire', nearby: 'Eastleigh, Totton, Hedge End, Romsey, Chandler’s Ford — M27, M3' }
];

const LandingCoverage = () => {
  return (
    <section id="areas" className="scroll-mt-20 lg:scroll-mt-24 bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FB7E10]/10 text-[#FB7E10] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3 border border-[#FB7E10]/20">
            <Radio size={14} className="animate-pulse" />
            <span>Live Regional Dispatch Radar</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 leading-tight">
            24/7 Mobile Tyre Coverage Areas
          </h2>
          <p className="mt-3 text-gray-500 text-base sm:text-lg">
            Rapid mobile tyre fitting and emergency roadside recovery across Camberley, Farnborough, Yateley, Guildford, Portsmouth, Southampton & the connecting motorway network.
          </p>
        </div>

        {/* Target Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
          {targetLocations.map((loc) => (
            <div
              key={loc.name}
              id={`areas-${loc.name.toLowerCase()}`}
              className="scroll-mt-28 lg:scroll-mt-32 bg-gray-50 hover:bg-white border border-gray-200 hover:border-[#FB7E10]/30 rounded-3xl p-6 transition-all duration-300 space-y-4 shadow-sm hover:shadow-lg group"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-[#FB7E10] font-black text-lg">
                  <MapPin size={20} className="shrink-0" />
                  <span>{loc.name}</span>
                </div>
                <span className="text-[10px] font-bold text-[#FB7E10] bg-[#FB7E10]/10 border border-[#FB7E10]/20 px-2.5 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
                  {loc.county}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Mobile tyre fitting in {loc.name} and {loc.nearby}
              </p>
            </div>
          ))}
        </div>

        {/* Motorway & trunk road callouts */}
        <div className="mb-10 bg-gray-900 text-white rounded-3xl px-6 py-5 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center shadow-lg">
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#FB7E10] whitespace-nowrap">
            Motorways & Trunk Roads
          </span>
          <span className="text-xs sm:text-sm text-slate-300 font-medium">
            M3, M27, M25, M4, A3, A3(M), A31, A331 — safe roadside & hard-shoulder callouts
          </span>
        </div>

        {/* Primary Town Badges */}
        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FB7E10] animate-ping"></span>
            <h3 className="text-sm sm:text-base font-black uppercase tracking-widest text-[#FB7E10] text-center">
              Active Immediate Dispatch Zones (30–60 Min Response)
            </h3>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {primaryTowns.map((town) => (
              <a
                key={town}
                href="https://mobiletyrechampions.com/booking?postcode=GU11%203HY"
                className="bg-white hover:bg-[#FB7E10] hover:text-white transition-all border border-gray-200 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-gray-700 shadow-sm active:scale-95 flex items-center gap-1.5"
              >
                <Navigation size={12} className="text-[#FB7E10]" />
                <span>{town}</span>
              </a>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="text-xs sm:text-sm text-gray-500">
              📍 <strong className="text-gray-900">Don't see your town listed?</strong> We cover all surrounding roads and postcodes within a 35+ mile radius.
            </div>
            <a
              href="tel:02071013856"
              data-conversion="phone-call"
              className="bg-[#FB7E10] hover:bg-orange-600 text-white px-7 py-3 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all whitespace-nowrap shadow-lg shadow-orange-500/15 active:scale-95"
            >
              Call For Instant ETA
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LandingCoverage;
