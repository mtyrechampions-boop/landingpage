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
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-12">
          {trustItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2.5">
              <div className="p-1.5 bg-[#FB7E10]/10 rounded-lg">
                {item.icon}
              </div>
              <span className="text-xs sm:text-sm font-black text-gray-800 tracking-wider uppercase">
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
