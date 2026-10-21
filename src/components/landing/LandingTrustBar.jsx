'use client';

import React from 'react';
import { Clock, Shield, MapPin, Wrench, CreditCard } from 'lucide-react';

const trustItems = [
  { icon: <Clock className="w-5 h-5 text-[#FB7E10]" />, label: '24/7 AVAILABLE' },
  { icon: <Shield className="w-5 h-5 text-[#FB7E10]" />, label: '30–60 MIN*' },
  { icon: <MapPin className="w-5 h-5 text-[#FB7E10]" />, label: 'WE COME TO YOU' },
  { icon: <Wrench className="w-5 h-5 text-[#FB7E10]" />, label: 'FULLY EQUIPPED' },
  { icon: <CreditCard className="w-5 h-5 text-[#FB7E10]" />, label: 'ZERO UPFRONT RISK' },
];

const LandingTrustBar = () => {
  return (
    <section className="bg-gray-50 border-y border-gray-200 py-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-x-4 sm:gap-x-8 lg:gap-x-12 gap-y-3.5 max-w-sm sm:max-w-none mx-auto">
          {trustItems.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-2 sm:gap-2.5 ${
                idx === trustItems.length - 1
                  ? 'col-span-2 justify-center'
                  : 'justify-start sm:justify-center'
              }`}
            >
              <div className="p-1 sm:p-1.5 bg-[#FB7E10]/10 rounded-lg shrink-0">
                {item.icon}
              </div>
              <span className="text-[11px] sm:text-xs md:text-sm font-black text-gray-800 tracking-wider uppercase whitespace-nowrap">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingTrustBar;
