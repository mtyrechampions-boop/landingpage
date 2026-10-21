'use client';

import React from 'react';
import { MessageSquare, Check, Zap, CalendarCheck } from 'lucide-react';

// Same prefilled quote request the hero uses.
const WHATSAPP_HREF =
  'https://wa.me/447494024653?text=Hi%20Mobile%20Tyre%20Champions%2C%20I%20need%20a%20tyre%20quote.%0AMy%20tyre%20size%3A%20%0AMy%20location%3A%20';

const URGENT_POINTS = [
  'Emergency tyre replacement',
  'Roadside puncture repairs where safe and suitable',
  'Locking wheel nut removal',
  'Mobile wheel balancing',
  'Car, van and suitable trailer tyres',
];

const PLANNED_POINTS = [
  'Home and workplace tyre fitting',
  'Premium and budget tyre options',
  'Michelin, Bridgestone, Continental and Goodyear',
  'Wheel balancing and fitting checks',
  'Convenient appointments to suit availability',
];

const LandingWhyGarage = () => {
  return (
    <section id="why-us" className="scroll-mt-20 lg:scroll-mt-24 bg-gray-50 py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FB7E10]/10 border border-[#FB7E10]/20 text-[#FB7E10] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-3">
            <span>The Mobile Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 leading-tight">
            WHY DRIVE TO A GARAGE?
          </h2>
          <p className="mt-3 text-xl sm:text-2xl font-bold text-[#FB7E10]">
            WE BRING THE GARAGE TO YOU.
          </p>
        </div>

        {/* Dual-intent service panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">

          {/* LEFT: URGENT ASSISTANCE */}
          <div className="bg-white border-2 border-[#FB7E10]/40 rounded-3xl p-6 sm:p-10 flex flex-col justify-between gap-6 shadow-xl shadow-orange-500/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FB7E10]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-[#FB7E10]/10 border border-[#FB7E10]/25 text-[#FB7E10] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-4">
                <span className="w-2 h-2 rounded-full bg-[#FB7E10] animate-ping"></span>
                <span>Urgent Assistance</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                Stranded With a Flat Tyre?
              </h3>
              <p className="mt-2 text-base sm:text-lg font-bold text-[#FB7E10]">
                We'll bring the tyre fitting service to you.
              </p>

              <p className="mt-4 text-sm sm:text-base text-gray-500 leading-relaxed">
                A blowout, flat tyre or damaged wheel can bring your journey to a halt. Our 24/7 mobile team responds to roadside tyre emergencies across Surrey and Hampshire, including routes connecting the M3, A3, A31 and M27.
              </p>

              <ul className="mt-6 space-y-3">
                {URGENT_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm sm:text-base font-bold text-gray-800">
                    <span className="w-6 h-6 rounded-full bg-[#FB7E10]/10 border border-[#FB7E10]/25 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={14} className="text-[#FB7E10]" strokeWidth={3} />
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="tel:02071013856"
              data-conversion="phone-call"
              className="relative flex items-center justify-center gap-2 bg-[#FB7E10] hover:bg-orange-600 text-white px-6 py-4 rounded-2xl text-sm font-black uppercase tracking-wider transition-all shadow-lg shadow-orange-500/20 active:scale-95"
            >
              <Zap size={16} className="fill-current shrink-0" />
              <span>Call for Emergency Help</span>
            </a>
          </div>

          {/* RIGHT: PLANNED APPOINTMENTS */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 flex flex-col justify-between gap-6 shadow-sm">
            <div>
              <div className="inline-flex items-center gap-2 bg-gray-100 border border-gray-200 text-gray-600 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-4">
                <CalendarCheck size={13} className="shrink-0" />
                <span>Planned Appointments</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                New Tyres Without a Garage Visit.
              </h3>
              <p className="mt-2 text-base sm:text-lg font-bold text-gray-500">
                Your driveway. Your workplace. Your schedule.
              </p>

              <p className="mt-4 text-sm sm:text-base text-gray-500 leading-relaxed">
                Need new tyres but don't want to spend your morning in a garage waiting room? Book a mobile fitting appointment and let us handle the job where your vehicle is parked.
              </p>

              <ul className="mt-6 space-y-3">
                {PLANNED_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm sm:text-base font-bold text-gray-800">
                    <span className="w-6 h-6 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={14} className="text-gray-500" strokeWidth={3} />
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              data-conversion="whatsapp"
              className="flex items-center justify-center gap-2 bg-[#22C55E] hover:bg-green-600 text-white px-6 py-4 rounded-2xl text-sm font-black uppercase tracking-wider transition-all shadow-lg shadow-green-500/20 active:scale-95"
            >
              <MessageSquare size={16} className="shrink-0" />
              <span>Get My Tyre Fitting Quote</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LandingWhyGarage;
