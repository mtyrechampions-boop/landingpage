import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Clock, MapPin } from 'lucide-react';
import { SERVICE_AREAS_TEXT } from '@/lib/siteText';

const LandingFooter = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 text-xs py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-gray-800 text-center md:text-left">
          
          {/* Brand Logo & Tagline */}
          <div className="space-y-2 flex flex-col items-center md:items-start">
            <div className="relative h-12 w-48">
              <Image
                src="/images/MTC logo 3.webp"
                alt="Mobile Tyre Champions"
                fill
                sizes="192px"
                className="object-contain object-center md:object-left"
              />
            </div>
            <p className="text-gray-400 max-w-sm text-xs font-normal">
              24/7 Emergency & Same-Day Mobile Tyre Fitting across Surrey, Hampshire, Berkshire & West London.
            </p>
          </div>

          {/* Quick Contact summary */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2 text-gray-300">
              <Clock size={16} className="text-[#FB7E10]" />
              <span className="font-bold">Available 24 Hours / 7 Days</span>
            </div>
            
            <a
              href="tel:02071013856"
              data-conversion="phone-call"
              className="flex items-center gap-2 text-white hover:text-[#FB7E10] font-black text-base transition-colors"
            >
              <Phone size={18} className="text-[#FB7E10]" fill="currentColor" />
              <span>0207 101 3856</span>
            </a>
          </div>

        </div>

        {/* Coverage & Legal line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-gray-500">
          <div>
            <p>© {new Date().getFullYear()} Mobile Tyre Champions. All rights reserved.</p>
            <p className="mt-0.5 text-gray-400 font-normal">
              Headquarters: Grosvenor Road, Aldershot, Hampshire GU11 3HY • {SERVICE_AREAS_TEXT}
            </p>
          </div>

          {/* Essential Links */}
          <div className="flex flex-wrap justify-center gap-4 font-bold uppercase tracking-wider text-gray-400">
            <a href="https://mobiletyrechampions.com/booking?postcode=GU11%203HY" className="hover:text-[#FB7E10] transition-colors">
              Book Online
            </a>
            <a href="https://mobiletyrechampions.com/contact" className="hover:text-[#FB7E10] transition-colors">
              Contact Us
            </a>
            <a href="tel:02071013856" className="hover:text-[#FB7E10] transition-colors">
              0207 101 3856
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default LandingFooter;
