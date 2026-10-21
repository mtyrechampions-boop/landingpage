'use client';

import React from 'react';
import { Phone, Calendar } from 'lucide-react';

const LandingMobileStickyBar = ({ homeHref = '' }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-gray-200 px-3 py-2.5 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      <div className="grid grid-cols-2 gap-2 max-w-md mx-auto items-center">

        {/* Call Now button */}
        <a
          href="tel:02071013856"
          data-conversion="phone-call"
          aria-label="Call now on 0207 101 3856"
          className="order-2 flex items-center justify-center gap-2 bg-[#FB7E10] hover:bg-orange-600 text-white py-3.5 px-3 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg shadow-orange-500/25 active:scale-95 transition-transform text-center whitespace-nowrap"
        >
          <Phone size={16} className="fill-current animate-bounce" />
          <span>CALL NOW</span>
        </a>

        {/* Check Availability button → existing postcode checker section */}
        <a
          href={`${homeHref}#postcode-checker`}
          data-conversion="availability-check"
          className="order-1 flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-900 py-3.5 px-2 rounded-2xl font-bold text-[11px] min-[390px]:text-xs uppercase tracking-wider shadow-sm active:scale-95 transition-transform text-center whitespace-nowrap"
        >
          <Calendar size={15} className="text-[#FB7E10] shrink-0" />
          <span><span className="hidden min-[390px]:inline">CHECK </span>AVAILABILITY</span>
        </a>

      </div>
    </div>
  );
};

export default LandingMobileStickyBar;
