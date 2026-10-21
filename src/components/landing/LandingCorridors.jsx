'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { MapPin, Phone, Navigation, ShieldCheck, Clock, Radio, CheckCircle2 } from 'lucide-react';
import { ALL_LOCATIONS, HUB } from './LandingCorridorsMap';

// Google Maps loaded client-side only
const LandingCorridorsMap = dynamic(() => import('./LandingCorridorsMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 min-h-[440px]">
      <div className="w-10 h-10 border-3 border-[#FB7E10] border-t-transparent rounded-full animate-spin mb-3" />
      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Loading Coverage Map...</span>
    </div>
  ),
});

const REGIONS = [
  { id: 'all', label: 'All Areas (25+ Towns)' },
  { id: 'Hampshire', label: 'Hampshire' },
  { id: 'Surrey', label: 'Surrey' },
  { id: 'Berkshire', label: 'Berkshire' },
  { id: 'South Coast', label: 'South Coast' },
];

const LandingCorridors = () => {
  const [activeRegion, setActiveRegion] = useState('all');

  return (
    <section
      id="corridors"
      className="scroll-mt-20 lg:scroll-mt-24 bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-100"
    >
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-[#FB7E10]/10 border border-[#FB7E10]/20 text-[#FB7E10] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-3">
            <Radio size={14} className="animate-pulse" />
            <span>Interactive Regional Coverage Map</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 leading-tight">
            Surrey, Hampshire & South Coast Coverage Map
          </h2>
          <p className="mt-4 text-gray-500 text-base sm:text-lg leading-relaxed">
            Our fully equipped mobile tyre vans operate from our central Aldershot hub, providing rapid roadside, home, and workplace tyre fitting across all primary regional locations.
          </p>
        </div>

        {/* Full-Width Interactive Google Maps Card */}
        <div className="rounded-3xl md:rounded-[2.5rem] overflow-hidden bg-white border border-gray-200 shadow-xl shadow-slate-200/60 p-4 sm:p-6 mb-10">

          {/* Map Top Bar: Hub details & Regional Filter Pills */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FB7E10] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FB7E10]"></span>
              </span>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-gray-900 block leading-tight">
                  Aldershot Central Dispatch Hub (GU11)
                </span>
                <span className="text-[11px] font-bold text-gray-400">
                  40-mile primary response radius • 30–60 min estimated arrival
                </span>
              </div>
            </div>

            {/* Region Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar text-xs">
              {REGIONS.map((region) => (
                <button
                  key={region.id}
                  type="button"
                  onClick={() => setActiveRegion(region.id)}
                  className={`px-3.5 py-1.5 rounded-full font-extrabold transition-all whitespace-nowrap cursor-pointer ${
                    activeRegion === region.id
                      ? 'bg-[#FB7E10] text-white shadow-md shadow-orange-500/20'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {region.label}
                </button>
              ))}
            </div>
          </div>

          {/* The Google Map Container */}
          <div className="isolate relative w-full h-[460px] sm:h-[540px] lg:h-[600px] rounded-2xl overflow-hidden border border-gray-200">
            <LandingCorridorsMap activeRegion={activeRegion} />
          </div>

          {/* Map Legend */}
          <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-gray-600">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <li className="flex items-center gap-2">
                <span className="h-3.5 w-6 rounded-full border-2 border-[#FB7E10] bg-[#FB7E10]/10" aria-hidden="true" />
                <span>40-mile service radius from Aldershot</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded-full border-[3px] border-[#FB7E10] bg-white shadow-sm" aria-hidden="true" />
                <span>Towns & commercial centres we serve</span>
              </li>
            </ul>

            <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
              <Clock size={13} className="text-[#FB7E10]" />
              <span>Click any town pin for local dispatch information</span>
            </div>
          </div>
        </div>

        {/* Categorized Town Directory Grid */}
        <div className="bg-gray-50 rounded-3xl p-6 sm:p-8 border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                All Locations & Towns Covered
              </h3>
              <p className="text-sm text-gray-500 font-medium mt-1">
                Fast mobile tyre replacement dispatched straight to your postcode.
              </p>
            </div>
            <a
              href="tel:02071013856"
              className="inline-flex items-center justify-center gap-2 bg-[#FB7E10] hover:bg-orange-600 text-white px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-orange-500/20 active:scale-95 shrink-0"
            >
              <Phone size={14} className="fill-current" />
              <span>Call 0207 101 3856</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Hampshire */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#FB7E10] mb-3">
                <MapPin size={14} />
                <span>Hampshire</span>
              </div>
              <ul className="space-y-1.5 text-sm font-bold text-gray-700">
                {ALL_LOCATIONS.filter((l) => l.region === 'Hampshire').concat([HUB]).map((t) => (
                  <li key={t.name} className="flex items-center justify-between text-xs py-1 px-2 rounded-lg hover:bg-white transition-colors">
                    <span className={t.isHub ? 'font-black text-[#FB7E10]' : 'text-gray-800'}>
                      {t.name} {t.isHub && '★ (HQ)'}
                    </span>
                    <span className="text-[10px] text-gray-400 font-semibold bg-gray-200/70 px-1.5 py-0.5 rounded">
                      {t.postcode}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Surrey */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#FB7E10] mb-3">
                <MapPin size={14} />
                <span>Surrey</span>
              </div>
              <ul className="space-y-1.5 text-sm font-bold text-gray-700">
                {ALL_LOCATIONS.filter((l) => l.region === 'Surrey').map((t) => (
                  <li key={t.name} className="flex items-center justify-between text-xs py-1 px-2 rounded-lg hover:bg-white transition-colors">
                    <span className="text-gray-800">{t.name}</span>
                    <span className="text-[10px] text-gray-400 font-semibold bg-gray-200/70 px-1.5 py-0.5 rounded">
                      {t.postcode}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Berkshire */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#FB7E10] mb-3">
                <MapPin size={14} />
                <span>Berkshire</span>
              </div>
              <ul className="space-y-1.5 text-sm font-bold text-gray-700">
                {ALL_LOCATIONS.filter((l) => l.region === 'Berkshire').map((t) => (
                  <li key={t.name} className="flex items-center justify-between text-xs py-1 px-2 rounded-lg hover:bg-white transition-colors">
                    <span className="text-gray-800">{t.name}</span>
                    <span className="text-[10px] text-gray-400 font-semibold bg-gray-200/70 px-1.5 py-0.5 rounded">
                      {t.postcode}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* South Coast */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#FB7E10] mb-3">
                <MapPin size={14} />
                <span>South Coast</span>
              </div>
              <ul className="space-y-1.5 text-sm font-bold text-gray-700">
                {ALL_LOCATIONS.filter((l) => l.region === 'South Coast').map((t) => (
                  <li key={t.name} className="flex items-center justify-between text-xs py-1 px-2 rounded-lg hover:bg-white transition-colors">
                    <span className="text-gray-800">{t.name}</span>
                    <span className="text-[10px] text-gray-400 font-semibold bg-gray-200/70 px-1.5 py-0.5 rounded">
                      {t.postcode}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LandingCorridors;
