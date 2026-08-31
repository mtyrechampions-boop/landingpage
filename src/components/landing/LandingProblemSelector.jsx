'use client';

import React, { useState } from 'react';
import { Phone, ArrowRight, Wrench } from 'lucide-react';

const problems = [
  {
    id: 'flat-tyre',
    icon: '🚨',
    title: 'FLAT TYRE',
    tag: 'Most Common',
    desc: 'Woke up to a flat tyre or lost pressure on the road? Our mobile service brings the correct new tyre directly to your driveway or parking space.',
    actionText: 'Get Flat Tyre Replaced'
  },
  {
    id: 'puncture',
    icon: '📌',
    title: 'PUNCTURE',
    tag: 'Cost-Effective',
    desc: 'Picked up a nail or screw in the tread? If safe and compliant with BS AU 159 regulations, we repair punctures on-site at a fraction of replacement cost.',
    actionText: 'Book Puncture Repair'
  },
  {
    id: 'blowout',
    icon: '💥',
    title: 'BLOWOUT / ROADSIDE',
    tag: '24/7 Rapid',
    desc: 'Tyre shredded or burst on the motorway or dual carriageway? Stay safe behind the barrier while our rapid response mobile van comes to replace it.',
    actionText: 'Emergency Roadside Dispatch'
  },
  {
    id: 'damaged-tyre',
    icon: '⚠️',
    title: 'DAMAGED / BULGING TYRE',
    tag: 'Safety Critical',
    desc: 'Hit a kerb or pothole causing a dangerous sidewall bulge or split? Driving on a bulging tyre is illegal and dangerous. We fit a fresh tyre on-site.',
    actionText: 'Replace Damaged Tyre'
  },
  {
    id: 'locking-nut',
    icon: '🔐',
    title: 'LOST LOCKING NUT KEY',
    tag: 'Alloy-Safe',
    desc: 'Key rounded or missing before an MOT or wheel change? We carry specialist non-destructive extraction tools to safely remove locking nuts without alloy damage.',
    actionText: 'Remove Locking Nut'
  },
  {
    id: 'van-commercial',
    icon: '📦',
    title: 'VAN / COMMERCIAL TYRE',
    tag: 'Fleet & Trade',
    desc: 'Commercial van or delivery fleet down? We fit reinforced commercial C-rated tyres on-site at your yard, work depot, or roadside with VAT receipts.',
    actionText: 'Fit Commercial Tyres'
  }
];

const LandingProblemSelector = () => {
  const [activeProblem, setActiveProblem] = useState('flat-tyre');

  return (
    <section className="bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FB7E10]/10 border border-[#FB7E10]/20 text-[#FB7E10] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-3">
            <Wrench size={14} />
            <span>Problem-Specific Dispatch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 leading-tight">
            WHAT'S WRONG WITH YOUR TYRE?
          </h2>
          <p className="mt-3 text-gray-500 text-base sm:text-lg">
            Select your issue below for rapid assistance or call our 24/7 dispatch hotline directly.
          </p>
        </div>

        {/* 6 Problem Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {problems.map((p) => {
            const isSelected = activeProblem === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setActiveProblem(p.id)}
                className={`cursor-pointer bg-white hover:bg-gray-50 border-2 ${
                  isSelected ? 'border-[#FB7E10] shadow-xl shadow-orange-500/10' : 'border-gray-200 hover:border-gray-300'
                } rounded-3xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{p.icon}</span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#FB7E10] bg-[#FB7E10]/10 border border-[#FB7E10]/20 px-3 py-1 rounded-full">
                      {p.tag}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-3 tracking-tight group-hover:text-[#FB7E10] transition-colors">
                    {p.title}
                  </h3>

                  <p className="text-sm text-gray-500 leading-relaxed mb-6 font-normal">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                  <a
                    href="https://mobiletyrechampions.com/booking?postcode=GU11%203HY"
                    data-conversion="booking"
                    className="flex-1 bg-[#FB7E10] hover:bg-orange-600 text-white py-3 px-4 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all text-center flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                  >
                    <span>{p.actionText}</span>
                    <ArrowRight size={14} />
                  </a>

                  <a
                    href="tel:02071013856"
                    data-conversion="phone-call"
                    className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-all text-center border border-gray-200 active:scale-95"
                    title="Call Now"
                  >
                    <Phone size={16} className="text-[#FB7E10]" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default LandingProblemSelector;
