'use client';

import React from 'react';
import { Radio } from 'lucide-react';
import PostcodeAvailabilityForm from './PostcodeAvailabilityForm';

const LandingPostcodeChecker = () => {
  return (
    <section id="postcode-checker" className="scroll-mt-20 lg:scroll-mt-24 bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
      <div className="max-w-3xl mx-auto text-center">

        <div className="inline-flex items-center gap-2 bg-[#FB7E10]/10 border border-[#FB7E10]/20 text-[#FB7E10] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4">
          <Radio size={14} />
          <span>Live Technician Lookup</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 leading-tight mb-3">
          HOW CLOSE IS YOUR<br />
          <span className="text-[#FB7E10]">TYRE TECHNICIAN?</span>
        </h2>

        <p className="text-gray-500 text-base sm:text-lg mb-8 max-w-xl mx-auto">
          Enter your UK postcode and we'll check you're inside our service area, then take you straight to booking or a call with our dispatch team.
        </p>

        <div className="max-w-lg mx-auto">
          <PostcodeAvailabilityForm variant="light" source="postcode-checker" buttonLabel="Check now" />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-gray-400">
          <span>⏱ Results in seconds</span>
          <span>📍 Service area confirmed</span>
          <span>🔒 No obligation</span>
        </div>

      </div>
    </section>
  );
};

export default LandingPostcodeChecker;
