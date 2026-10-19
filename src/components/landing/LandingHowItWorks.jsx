'use client';

import React from 'react';
import { Phone, MapPin, Wrench, CheckCircle } from 'lucide-react';

const steps = [
  {
    step: '01',
    title: 'TELL US WHERE YOU ARE',
    desc: 'Call 0207 101 3856 or enter your postcode. Tell us your location and tyre size.',
    icon: <Phone className="w-6 h-6 text-[#FB7E10]" />
  },
  {
    step: '02',
    title: 'WE DISPATCH A MOBILE VAN',
    desc: 'A certified mobile technician with a fully equipped tyre workshop heads directly to you.',
    icon: <MapPin className="w-6 h-6 text-[#FB7E10]" />
  },
  {
    step: '03',
    title: 'WE FIT & BALANCE YOUR TYRE',
    desc: 'Professional on-site tyre fitting, electronic digital balancing, and new valve installation.',
    icon: <Wrench className="w-6 h-6 text-[#FB7E10]" />
  },
  {
    step: '04',
    title: 'BACK ON THE ROAD',
    desc: 'Pay safely after fitting is completed to your satisfaction. Drive away with zero hassle.',
    icon: <CheckCircle className="w-6 h-6 text-[#FB7E10]" />
  }
];

const LandingHowItWorks = () => {
  return (
    <section className="bg-gray-50 py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-[#FB7E10]/10 border border-[#FB7E10]/20 text-[#FB7E10] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-3">
            <span>Fast 4-Step Emergency Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 leading-tight">
            FROM STRANDED TO MOVING.
          </h2>
          <p className="mt-3 text-gray-500 text-base sm:text-lg">
            How our 24/7 rapid roadside and mobile tyre dispatch works:
          </p>
        </div>

        {/* Vertical Stepper */}
        <div className="relative">
          {/* Vertical Connecting Line on Desktop */}
          <div className="hidden md:block absolute top-8 bottom-8 left-1/2 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#FB7E10] via-[#FB7E10]/30 to-gray-200" />

          <div className="space-y-8 md:space-y-12">
            {steps.map((s, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div
                  key={idx}
                  className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 ${
                    isEven ? 'md:flex-row-reverse text-center md:text-left' : 'text-center md:text-left'
                  }`}
                >
                  {/* Step Card */}
                  <div className="w-full md:w-[45%] bg-white hover:shadow-lg border border-gray-200 hover:border-[#FB7E10]/30 rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-3xl font-black text-[#FB7E10] tracking-tighter">
                        {s.step}
                      </span>
                      <div className="p-2.5 rounded-2xl bg-[#FB7E10]/10 border border-[#FB7E10]/20">
                        {s.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-2 tracking-tight">
                      {s.title}
                    </h3>
                    
                    <p className="text-sm text-gray-500 leading-relaxed font-normal">
                      {s.desc}
                    </p>
                  </div>

                  {/* Center Node Indicator */}
                  <div className="hidden md:flex w-12 h-12 rounded-full bg-white border-2 border-[#FB7E10] items-center justify-center text-[#FB7E10] font-black text-sm shadow-lg z-10 shrink-0">
                    {idx + 1}
                  </div>

                  {/* Empty Spacer */}
                  <div className="hidden md:block w-[45%]" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Fast Action Banner */}
        <div className="mt-14 p-6 sm:p-8 bg-white border-2 border-gray-200 rounded-3xl text-center space-y-4 shadow-lg">
          <h3 className="text-xl sm:text-2xl font-black text-gray-900">
            Need urgent assistance right this second?
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="tel:02071013856"
              data-conversion="phone-call"
              className="w-full sm:w-auto sm:order-2 bg-[#FB7E10] hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-black text-base uppercase tracking-wider shadow-lg active:scale-95 transition-all"
            >
              CALL 0207 101 3856 NOW
            </a>
            <a
              href="#postcode-checker"
              data-conversion="availability-check"
              className="w-full sm:w-auto sm:order-1 bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-200 px-8 py-4 rounded-2xl font-bold text-base uppercase tracking-wider transition-all active:scale-95"
            >
              Check Availability
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LandingHowItWorks;
