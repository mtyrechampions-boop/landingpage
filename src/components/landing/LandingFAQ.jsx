'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Phone, MessageSquare } from 'lucide-react';
import { RESPONSE_PROMISE } from '@/lib/siteText';

const faqs = [
  {
    q: "How quickly can a mobile tyre van reach me?",
    a: RESPONSE_PROMISE || "Our mobile tyre fitting vans typically arrive within 30–60 minutes depending on your location and traffic across Surrey, Hampshire, and Berkshire."
  },
  {
    q: "Do you offer emergency roadside and motorway callouts?",
    a: "Yes, 100%. Our vans and technicians are fully certified and equipped with high-visibility lighting, heavy-duty jacks, and motorway-safe gear for hard shoulders, laybys, dual carriageways, and driveways."
  },
  {
    q: "Do I have to pay upfront or pay a deposit?",
    a: "No deposit or upfront payment required. We quote your price clearly upfront with no hidden callout charges, and you pay only after the tyre has been fitted and balanced to your satisfaction."
  },
  {
    q: "Are you genuinely open 24 hours a day, 7 days a week?",
    a: "Yes. We operate 24 hours a day, 365 days a year. Whether you blow a tyre at 2:00 AM on Sunday, during bank holidays, or during peak rush hour, our mobile fitting team is always available."
  },
  {
    q: "What tyre brands and sizes do you carry on the vans?",
    a: "We carry all major vehicle tyre sizes across premium brands (Michelin, Continental, Pirelli, Goodyear, Bridgestone) as well as mid-range and budget options for cars, 4x4s, SUVs, and commercial vans."
  },
  {
    q: "Can you help if I lost or rounded my locking wheel nut key?",
    a: "Yes. Our technicians carry specialist inverse-fluted extraction tools to safely remove overtightened, damaged, or lost locking wheel nuts without causing any damage to your alloy rims."
  }
];

const LandingFAQ = () => {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="faq" className="scroll-mt-20 lg:scroll-mt-24 bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FB7E10]/10 border border-[#FB7E10]/20 text-[#FB7E10] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3">
            <HelpCircle size={14} />
            <span>Got Questions? We Have Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-gray-500 text-base sm:text-lg">
            Everything you need to know about our 24/7 mobile tyre fitting dispatch process.
          </p>
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className={`bg-white border-2 ${
                  isOpen ? 'border-[#FB7E10]/40 shadow-lg' : 'border-gray-200'
                } rounded-3xl overflow-hidden transition-all duration-300`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left group"
                  aria-expanded={isOpen}
                >
                  <span className={`text-base sm:text-lg font-bold pr-4 transition-colors ${
                    isOpen ? 'text-[#FB7E10]' : 'text-gray-900 group-hover:text-[#FB7E10]'
                  }`}>
                    {faq.q}
                  </span>
                  <div className={`p-2 rounded-xl transition-all duration-300 shrink-0 ${
                    isOpen ? 'rotate-180 bg-[#FB7E10] text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-[#FB7E10]/10 group-hover:text-[#FB7E10]'
                  }`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out px-5 sm:px-6 overflow-hidden ${
                    isOpen ? 'max-h-60 pb-6 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-gray-500 font-normal leading-relaxed text-sm sm:text-base pt-3 border-t border-gray-100">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Card */}
        <div className="mt-12 p-6 sm:p-8 bg-gray-50 border border-gray-200 rounded-3xl text-center space-y-4 shadow-sm">
          <h3 className="text-lg sm:text-xl font-black text-gray-900">
            Have an urgent tyre size requirement or specific question?
          </h3>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            Our expert dispatch controllers are on the line 24/7 to check stock and give you an immediate fixed quote.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="tel:02071013856"
              data-conversion="phone-call"
              className="inline-flex items-center gap-2 bg-[#FB7E10] hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-wider transition-all shadow-lg active:scale-95"
            >
              <Phone size={16} />
              <span>Call 0207 101 3856</span>
            </a>
            <a
              href="https://wa.me/447494024653"
              target="_blank"
              rel="noopener noreferrer"
              data-conversion="whatsapp"
              className="inline-flex items-center gap-2 bg-[#22C55E] hover:bg-green-600 text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-wider transition-all shadow-lg active:scale-95"
            >
              <MessageSquare size={16} />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LandingFAQ;
