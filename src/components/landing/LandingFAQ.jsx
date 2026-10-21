'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Phone, MessageSquare } from 'lucide-react';

const faqs = [
  {
    q: "How quickly can you get to me?",
    a: "Our typical estimated arrival time is 30–60 minutes. This depends on your exact location, traffic conditions and the nearest available fitting van. We'll give you a realistic arrival estimate when we confirm your dispatch, rather than promise a time we can't meet."
  },
  {
    q: "Can you change my tyre on the motorway?",
    a: "We can assist with tyre emergencies on major routes including the M3, A3 and M27, provided the vehicle is in a location where work can be carried out safely and legally. If you're stopped on a live motorway lane or in an unsafe position, do not attempt to change the tyre. Follow National Highways safety guidance and contact emergency services where necessary. We'll discuss a safe fitting location with you."
  },
  {
    q: "Do I have to pay before you arrive?",
    a: "No. We don't require an upfront payment for the agreed fitting service. You'll receive a quote before work begins and pay once the tyre has been fitted and inspected."
  },
  {
    q: "How much does emergency mobile tyre fitting cost?",
    a: "The price depends on the tyre size, brand, fitting requirements and your location. We'll explain the total quoted price before you agree to the job, so you know what you're paying for."
  },
  {
    q: "What if I don't know my tyre size?",
    a: "That's fine. You can provide your vehicle registration and we'll help identify the correct tyre specification. We may ask you to confirm the size printed on the tyre sidewall before fitting."
  },
  {
    q: "Do you stock Michelin, Bridgestone, Continental and Goodyear?",
    a: "We can source major tyre brands including Michelin, Bridgestone, Continental and Goodyear, alongside more affordable budget options. Stock and fitting availability depend on the exact tyre specification. Contact us with your tyre size and we'll check the options."
  },
  {
    q: "Can you get unusual or low-profile tyre sizes?",
    a: "Tell us your exact tyre size and preferred brand. We'll check stock and advise on the earliest available fitting option. We won't confirm availability until we've checked it."
  },
  {
    q: "I've lost my locking wheel nut key. Can you still remove the wheel?",
    a: "Yes, we offer specialist locking wheel nut removal. Tell us that your key is missing when you call so we can check the equipment and access requirements for your vehicle."
  },
  {
    q: "Can you repair a puncture instead of replacing the tyre?",
    a: "Where the tyre is safe and suitable for repair, we'll assess whether a puncture repair is possible. Damage to the sidewall, certain tread areas or a tyre driven on while flat may mean replacement is necessary."
  },
  {
    q: "Can you fit tyres while I'm at work?",
    a: "Yes. We offer scheduled mobile tyre fitting at homes and workplaces across our service area, subject to safe access and appointment availability. You can carry on with your day while the work is completed."
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

                {/* Grid-rows transition rather than a max-height: answers vary in length
                    and a fixed cap clips the longer ones. */}
                <div
                  className={`grid transition-all duration-300 ease-in-out px-5 sm:px-6 ${
                    isOpen ? 'grid-rows-[1fr] pb-6 opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-gray-500 font-normal leading-relaxed text-sm sm:text-base pt-3 border-t border-gray-100">
                      {faq.a}
                    </p>
                  </div>
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
