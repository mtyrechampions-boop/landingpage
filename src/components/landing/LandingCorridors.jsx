'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { MapPin, Phone, Navigation } from 'lucide-react';

// Google Maps needs the browser, so the map is only loaded client-side.
const LandingCorridorsMap = dynamic(() => import('./LandingCorridorsMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#0B1528]">
      <div className="w-8 h-8 border-2 border-[#FB7E10] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

const CORRIDORS = [
  {
    id: 'camberley-yateley',
    title: 'Camberley & Yateley',
    body: 'Flat tyre near the A30, Blackwater Valley or M3 Junction 4? Get mobile tyre assistance at your home, workplace or a safe roadside location without travelling to a garage.',
    coverage: 'Camberley, Yateley, Blackwater and surrounding roads.',
  },
  {
    id: 'farnborough-aldershot',
    title: 'Farnborough & Aldershot',
    body: 'Close to our Aldershot operating hub, we cover the A331 and A31 corridors, providing roadside assistance and convenient mobile fitting for local homes and businesses.',
    coverage: 'Farnborough, Aldershot, North Camp and nearby areas.',
  },
  {
    id: 'guildford-surrey',
    title: 'Guildford & Surrey Hills',
    body: "Whether you're travelling along the A3, commuting into Guildford or parked outside your workplace, our mobile fitters can come to you for tyre replacements and repairs.",
    coverage: 'Guildford town centre, A3, A31 and surrounding communities.',
  },
  {
    id: 'portsmouth-southampton',
    title: 'Portsmouth & Southampton',
    body: 'Need mobile tyre fitting on the South Coast? Contact our team for availability across Portsmouth, Southampton, the M27 corridor and nearby residential and commercial areas.',
    coverage: 'Portsmouth, Southampton, M27 and surrounding port routes.',
  },
];

const LandingCorridors = () => {
  const [active, setActive] = useState(null);

  return (
    <section
      id="corridors"
      className="scroll-mt-20 lg:scroll-mt-24 bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FB7E10]/10 border border-[#FB7E10]/20 text-[#FB7E10] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-3">
            <Navigation size={14} />
            <span>Aldershot-Based Mobile Tyre Support</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 leading-tight">
            Local Tyre Fitters Covering Surrey, Hampshire & the South Coast
          </h2>
          <p className="mt-4 text-gray-500 text-base sm:text-lg leading-relaxed">
            From the Blackwater Valley to the South Coast, our mobile tyre fitting service supports drivers across major commuter routes, residential areas and business locations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* Coverage map */}
          <div className="lg:sticky lg:top-28">
            <div className="rounded-3xl md:rounded-[2.5rem] overflow-hidden bg-white border border-gray-200 shadow-xl shadow-slate-200/60 p-3 sm:p-4">

              <div className="flex items-center justify-between gap-3 px-2 pt-1 pb-3">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FB7E10] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FB7E10]"></span>
                  </span>
                  <span className="text-xs font-black uppercase tracking-widest text-gray-900">Aldershot Operating Hub</span>
                </div>
                <span className="hidden sm:inline text-[11px] font-bold uppercase tracking-wider text-gray-400">Live coverage</span>
              </div>

              {/* `isolate` keeps the map's high z-index layers beneath the fixed header and sticky bar */}
              <div className="isolate relative w-full h-[440px] sm:h-[500px] lg:h-[560px] rounded-2xl overflow-hidden border border-gray-200">
                <LandingCorridorsMap active={active} onActiveChange={setActive} />
              </div>

              <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[11px] font-bold text-gray-600" aria-label="Map key">
                <li className="flex items-center gap-1.5">
                  <span className="h-3 w-5 rounded-full border-2 border-[#FB7E10] bg-[#FB7E10]/10" aria-hidden="true" />
                  Service area (about 40 miles from Aldershot)
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full border-[3px] border-[#FB7E10] bg-white" aria-hidden="true" />
                  Towns we serve
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-1 w-5 rounded-full bg-[#FB7E10]" aria-hidden="true" />
                  Corridors
                </li>
              </ul>
              <p className="mt-1.5 text-center text-[11px] font-semibold text-gray-500">
                Indicative routes — hover or tap a corridor to trace it on the map.
              </p>
            </div>
          </div>

          {/* Corridor cards */}
          <div className="space-y-5">
            {CORRIDORS.map((corridor) => {
              const isActive = active === corridor.id;
              return (
                <article
                  key={corridor.id}
                  onMouseEnter={() => setActive(corridor.id)}
                  onMouseLeave={() => setActive(null)}
                  onClick={() => setActive(isActive ? null : corridor.id)}
                  onFocus={() => setActive(corridor.id)}
                  onBlur={() => setActive(null)}
                  tabIndex={0}
                  className={`rounded-3xl p-6 sm:p-7 border-2 transition-all duration-300 outline-none ${isActive
                      ? 'bg-white border-[#FB7E10]/50 shadow-xl shadow-orange-500/10 -translate-y-0.5'
                      : 'bg-gray-50 border-gray-200 hover:border-[#FB7E10]/30'
                    } focus-visible:ring-2 focus-visible:ring-[#FB7E10] focus-visible:ring-offset-2`}
                >
                  <h3 className="flex items-center gap-2 text-lg sm:text-xl font-black text-gray-900 tracking-tight">
                    <MapPin size={20} className="text-[#FB7E10] shrink-0" />
                    {corridor.title}
                  </h3>

                  <p className="mt-3 text-sm sm:text-base text-gray-500 leading-relaxed">
                    {corridor.body}
                  </p>

                  <p className="mt-4 pt-3 border-t border-gray-200 text-xs sm:text-sm font-bold text-gray-700">
                    <span className="text-[#FB7E10] uppercase tracking-wider">Coverage: </span>
                    {corridor.coverage}
                  </p>
                </article>
              );
            })}

            <a
              href="tel:02071013856"
              data-conversion="phone-call"
              className="flex items-center justify-center gap-2 bg-[#FB7E10] hover:bg-orange-600 text-white px-6 py-4 rounded-2xl text-sm font-black uppercase tracking-wider transition-all shadow-lg shadow-orange-500/20 active:scale-95"
            >
              <Phone size={16} className="fill-current shrink-0" />
              <span>Check Cover For Your Road</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LandingCorridors;
