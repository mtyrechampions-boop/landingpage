'use client';

import React from 'react';
import { Phone, Clock, Wrench } from 'lucide-react';

const steps = [
  {
    step: '01',
    title: 'Call or Send Your Location',
    desc: 'Tell us your tyre size or vehicle registration, plus your postcode, road name or live location. Not sure of the tyre size? We can help you identify it.',
    icon: Phone,
  },
  {
    step: '02',
    title: 'Get Your Price & Arrival Window',
    desc: "We'll confirm the available tyre options, provide a fixed quote for the agreed work and give you an estimated arrival time. No upfront deposit required.",
    icon: Clock,
  },
  {
    step: '03',
    title: 'We Fit. Balance. Check. You Pay.',
    desc: 'Our technician fits the tyre, balances the wheel where required and torque-checks the wheel fixings. You pay once the agreed fitting work has been completed and inspected.',
    icon: Wrench,
  },
];

const LandingHowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 lg:scroll-mt-24 relative overflow-hidden bg-[#0B1528] py-16 md:py-24 px-4 sm:px-6 lg:px-8"
    >
      {/* Ambient brand glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#FB7E10]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FB7E10]/15 border border-[#FB7E10]/30 text-[#FB7E10] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-[#FB7E10] animate-ping" />
            <span>Three-Step Zero-Friction Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.1]">
            Tell Us Where You Are.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FB7E10] to-orange-400">
              We'll Handle the Tyre.
            </span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            How our 24/7 rapid roadside and mobile tyre dispatch works:
          </p>
        </div>

        {/* Process rail */}
        <div className="relative">
          {/* Connector runs behind the cards and shows through the gaps, level with the step numbers */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute left-10 right-10 top-14 border-t-2 border-dashed border-white/15"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
            {steps.map(({ step, title, desc, icon: Icon }) => (
              <div
                key={step}
                className="relative z-10 h-full bg-[#101C33] border border-white/10 hover:border-[#FB7E10]/40 rounded-3xl p-7 sm:p-8 transition-colors duration-300 group"
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <span className="text-5xl font-black text-[#FB7E10] tracking-tighter leading-none">
                    {step}
                  </span>
                  <div className="p-3 rounded-2xl bg-[#FB7E10]/10 border border-[#FB7E10]/25 group-hover:bg-[#FB7E10] transition-colors duration-300">
                    <Icon className="w-6 h-6 text-[#FB7E10] group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white mb-3 tracking-tight leading-snug">
                  {title}
                </h3>

                <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom action banner */}
        <div className="mt-12 lg:mt-16 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 sm:p-8 text-center">
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Get Your Tyre Sorted Today
          </h3>
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href="tel:02071013856"
              data-conversion="phone-call"
              className="w-full sm:w-auto sm:order-2 flex items-center justify-center gap-2 bg-[#FB7E10] hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-black text-sm min-[380px]:text-base uppercase tracking-wide whitespace-nowrap shadow-xl shadow-orange-500/20 active:scale-95 transition-all"
            >
              <Phone size={18} className="fill-current shrink-0" />
              <span>Call 0207 101 3856</span>
            </a>
            <a
              href="#postcode-checker"
              data-conversion="availability-check"
              className="w-full sm:w-auto sm:order-1 flex items-center justify-center bg-white/10 hover:bg-white/15 text-white border border-white/20 px-8 py-4 rounded-2xl font-bold text-sm min-[380px]:text-base uppercase tracking-wide whitespace-nowrap transition-all active:scale-95 backdrop-blur-md"
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
