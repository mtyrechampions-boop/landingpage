'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Services from '../components/Services';
import { Phone, Star, ShieldCheck, Wrench, Clock, ArrowRight, CheckCircle } from 'lucide-react';


const ServicesPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Emergency', 'Standard', 'Specialist'];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-['Outfit']">

      {/* ── STICKY EMERGENCY BAR ── */}
      <div className="sticky top-0 z-50 bg-[#FB7E10] text-white py-3 px-4 text-center shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3">
          <span className="flex items-center gap-2 font-black uppercase text-xs md:text-sm tracking-widest">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            Emergency? We dispatch immediately — 24/7
          </span>
          <a
            href="tel:02071013856"
            className="flex items-center gap-2 bg-white text-[#FB7E10] px-5 py-1.5 rounded-full font-black text-xs md:text-sm uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow"
          >
            <Phone size={14} fill="currentColor" /> Call Now
          </a>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="relative h-[80vh] min-h-[600px] flex flex-col justify-center items-center overflow-hidden pt-20 md:pt-24 lg:pt-28 px-4 border-b border-gray-200">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544436074-c603a16fc0c1?q=80&w=2070&auto=format&fit=crop"
            alt="Professional mobile tyre fitting and replacement services showcasing the full range of tyre solutions by Mobile Tyre Champions"
            className="w-full h-full object-cover opacity-10 grayscale scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/70 to-slate-50"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2.5 bg-orange-50 border border-orange-100 px-4 py-2 rounded-xl shadow-sm">
            <span className="text-[#FB7E10] font-black uppercase text-[10px] tracking-widest animate-pulse">Professional Mobile Units</span>
          </div>
          <h1 className="text-5xl md:text-9xl font-black tracking-tighter leading-[0.85] text-black">
            Our <span className="text-[#FB7E10]">Services</span>
          </h1>
          <p className="text-gray-500 text-base md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed">
            High-precision mobile tyre solutions delivered at your request. Fast, reliable execution available 24 hours a day.
          </p>
        </div>
      </section>


      {/* ── CATEGORY QUICK-FILTER ── */}
      <section className="bg-white border-b border-gray-100 py-5 px-4 sticky top-[48px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 flex-wrap">
          <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest hidden sm:block">Filter:</span>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 rounded-full font-black text-xs uppercase tracking-widest border transition-all ${activeFilter === f
                ? 'bg-[#FB7E10] text-white border-[#FB7E10] shadow-lg shadow-orange-100'
                : 'bg-white text-slate-600 border-slate-200 hover:border-orange-300 hover:text-[#FB7E10]'
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* ── SERVICES COMPONENT ── */}
      <section className="bg-white">
        <Services filterCategory={activeFilter} />
      </section>

      {/* ── EMERGENCY CTA — full-width dominant ── */}
      <section className="bg-[#FB7E10] py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            <span className="text-white font-black uppercase text-[10px] tracking-widest">Live Dispatch Active</span>
          </div>
          <h2 className="text-white text-4xl md:text-8xl font-black tracking-tighter leading-[0.8]">
            Need an <br /><span className="text-[#0B1528]">emergency</span> quote?
          </h2>
          <p className="text-white/80 text-base md:text-xl font-medium max-w-xl mx-auto">
            A technician will be dispatched to you immediately. No wait times, no booking portals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:02071013856"
              className="inline-flex items-center gap-3 bg-white text-[#FB7E10] px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-base md:text-xl hover:bg-[#0B1528] hover:text-white transition-all shadow-2xl"
            >
              <Phone size={24} fill="currentColor" /> 0207 101 3856
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-white font-black uppercase tracking-widest text-sm border-2 border-white px-8 py-5 rounded-2xl hover:bg-white hover:text-[#FB7E10] transition-all"
            >
              Get a Quote <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="bg-white py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto space-y-12 text-center">
          <div className="space-y-3">
            <h2 className="text-black text-4xl md:text-7xl font-black tracking-tighter leading-none">
              The <span className="text-[#FB7E10]">mobile</span> advantage
            </h2>
            <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs">Why we outperform traditional workshops</p>
          </div>

          {/* Mobile: Cards / Desktop: Table */}
          <div className="rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">

            {/* Table Header — hidden on mobile */}
            <div className="hidden md:grid grid-cols-3 bg-[#0B1528] text-white">
              <div className="p-8 font-black uppercase text-xs tracking-widest opacity-50">Strategic Feature</div>
              <div className="p-8 font-black uppercase text-xs tracking-widest text-center">Mobile Tyre Champions</div>
              <div className="p-8 font-black uppercase text-xs tracking-widest text-center opacity-50">Local Garage</div>
            </div>

            {/* Rows */}
            {[
              ['TRAVEL TIME', '40 MINS', 'WE ARRIVE AT YOU', '90–120 MINS', 'DRIVE + WAIT'],
              ['OPERATIONAL MODE', 'WORK FROM HOME', 'WHILE WE FIT YOUR TYRES', 'IDLE', 'COLD WAITING ROOM'],
              ['PRICING', 'TRANSPARENT FIXED', 'NO HIDDEN SURPRISE', 'UNKNOWN', 'HIDDEN WORKSHOP FEES'],
              ['AVAILABILITY', '24/7/365', 'ANY TIME, ANY DAY', '9 AM – 5 PM', 'WEEKDAYS ONLY'],
            ].map(([feature, usMain, usSub, themMain, themSub], i) => (
              <div key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>

                {/* Mobile layout */}
                <div className="md:hidden p-5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">{feature}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Us */}
                    <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 text-center">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#FB7E10] mb-1">✅ Us</p>
                      <p className="text-sm font-black text-[#FB7E10] leading-tight">{usMain}</p>
                      <p className="text-[10px] text-orange-400 font-bold mt-1">{usSub}</p>
                    </div>
                    {/* Them */}
                    <div className="bg-slate-100 rounded-2xl p-4 text-center">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">❌ Garage</p>
                      <p className="text-sm font-black text-slate-500 leading-tight">{themMain}</p>
                      <p className="text-[10px] text-slate-400 font-bold mt-1">{themSub}</p>
                    </div>
                  </div>
                </div>

                {/* Desktop layout */}
                <div className="hidden md:grid grid-cols-3 hover:bg-orange-50/30 transition-colors border-t border-gray-100">
                  <div className="p-8 pl-12 font-black text-slate-700 text-sm uppercase tracking-widest">{feature}</div>
                  <div className="p-8 text-center">
                    <span className="font-black text-[#FB7E10] text-base">{usMain}</span>
                    <span className="block text-[10px] text-orange-400 font-bold mt-1">{usSub}</span>
                  </div>
                  <div className="p-8 text-center">
                    <span className="font-bold text-gray-400 text-base">{themMain}</span>
                    <span className="block text-[10px] text-gray-300 font-bold mt-1">{themSub}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </section>

      {/* ── TYRE RECYCLING ── */}
      <section className="bg-white py-16 md:py-24 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-black text-black tracking-tight">Tyre Recycling</h2>
            <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
              We responsibly collect and dispose of your old tyres. Our process meets industry and environmental standards, diverting scrap tyres from landfill and returning materials to the recycling stream.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            <div className="space-y-4">
              <h3 className="font-black text-lg">How we work</h3>
              <ul className="text-gray-600 list-inside list-disc space-y-2">
                <li>Collected on-site when we fit your new tyres or by appointment.</li>
                <li>Inspected and separated — tyres suitable for re-use are set aside.</li>
                <li>Non-reusable scrap tyres are routed to licensed recycling partners.</li>
                <li>We provide a disposal receipt for commercial customers on request.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-black text-lg">Environmental standards</h3>
              <p className="text-gray-600">We work with certified facilities that comply with UK waste regulations. Recovered rubber is repurposed for civil engineering, playground surfacing, and energy recovery where appropriate.</p>
              <p className="text-gray-600 font-bold">No illegal dumping — ever.</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-black text-lg">Pricing & notes</h3>
              <p className="text-gray-600">Small fees may apply for disposal depending on tyre size and quantity. For fleet and commercial collections we offer contract rates and documentation for audit purposes.</p>
              <Link href="/contact" className="inline-flex items-center gap-3 bg-[#FB7E10] text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg">
                Enquire About Recycling
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
