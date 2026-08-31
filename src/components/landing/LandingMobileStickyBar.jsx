'use client';

import React from 'react';
import { Phone, Calendar } from 'lucide-react';

const LandingMobileStickyBar = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-gray-200 px-3 py-2.5 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      <div className="grid grid-cols-12 gap-2 max-w-md mx-auto items-center">
        
        {/* Call Now button (7 cols) */}
        <a
          href="tel:02071013856"
          data-conversion="phone-call"
          className="col-span-7 flex items-center justify-center gap-2 bg-[#FB7E10] hover:bg-orange-600 text-white py-3.5 px-3 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg shadow-orange-500/25 active:scale-95 transition-transform text-center whitespace-nowrap"
        >
          <Phone size={16} className="fill-current animate-bounce" />
          <span>CALL 0207 101 3856</span>
        </a>

        {/* Check Availability button (5 cols) */}
        <a
          href="#postcode-checker"
          data-conversion="availability-check"
          className="col-span-5 flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-900 py-3.5 px-2 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-sm active:scale-95 transition-transform text-center whitespace-nowrap"
        >
          <Calendar size={15} className="text-[#FB7E10]" />
          <span>AVAILABILITY</span>
        </a>

      </div>
    </div>
  );
};

export default LandingMobileStickyBar;
