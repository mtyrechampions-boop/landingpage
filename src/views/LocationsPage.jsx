"use client";

import React, { useState, useMemo } from 'react';
import { SERVICE_AREAS_TEXT } from '@/lib/siteText';
import Link from 'next/link';
import { MapPin, Phone, ArrowRight, Shield, Clock, Zap, Star, Search, Navigation } from 'lucide-react';

import { locations } from '@/data/locations';

const LocationsPage = () => {
   const [searchQuery, setSearchQuery] = useState('');
   const [activeRegion, setActiveRegion] = useState('All');

   const filteredLocations = useMemo(() => {
      return locations.filter(loc => {
         const matchesSearch =
            loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            loc.postcode.toLowerCase().includes(searchQuery.toLowerCase());

         const matchesRegion = activeRegion === 'All' || loc.region === activeRegion;

         return matchesSearch && matchesRegion;
      });
   }, [searchQuery, activeRegion]);

   return (
      <div className="bg-slate-50 min-h-screen text-slate-900 font-['Outfit'] overflow-hidden relative">

         {/* ── BACKGROUND ACCENTS ── */}
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-100/50 rounded-full blur-[150px] -mr-64 -mt-64"></div>
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[150px] -ml-64 -mb-64"></div>

         {/* ── HERO ── */}
         <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 border-b border-gray-200 z-10 overflow-hidden shadow-sm">
            <div className="absolute inset-0 z-0">
               <img
                  src="https://images.unsplash.com/photo-1544436074-c603a16fc0c1?q=80&w=2070&auto=format&fit=crop"
                  alt="Mobile Tyre Service Background"
                  className="w-full h-full object-cover opacity-10 grayscale scale-110"
               />
               <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-slate-50"></div>
            </div>

            <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
               <div className="inline-flex items-center gap-2.5 bg-orange-50 border border-orange-100 px-4 py-2 rounded-xl shadow-sm">
                  <span className="text-[#FB7E10] font-black uppercase text-[10px] tracking-widest animate-pulse">{SERVICE_AREAS_TEXT} Coverage</span>
               </div> <br></br>
               <h1 className="text-5xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] text-black">
                  AREAS WE <br /> <span className="text-[#FB7E10]">COVER </span>
               </h1>
               <p className="text-gray-500 text-lg md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
                  Find your local mobile tyre technician. We operate 24/7 across {locations.length} major zones.
               </p>

               {/* Search BAR (Interactive) */}
               <div className="max-w-xl mx-auto bg-white border border-gray-200 p-2 rounded-3xl sm:rounded-full shadow-2xl flex flex-col sm:flex-row items-center mt-16 md:mt-20 group focus-within:ring-4 focus-within:ring-orange-100 transition-all">
                  <div className="flex items-center flex-1 w-full px-6 py-2">
                     <Search size={20} className="text-gray-400 mr-3 group-focus-within:text-[#FB7E10] transition-colors" />
                     <input
                        type="text"
                        placeholder="Search city or postcode..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent outline-none font-bold text-black uppercase tracking-widest text-sm"
                     />
                  </div>
                  <button className="w-full sm:w-auto bg-[#0B1528] text-white px-10 py-5 rounded-2xl sm:rounded-full font-black uppercase text-xs tracking-widest hover:bg-[#FB7E10] transition-all shadow-md active:scale-95">
                     Search Loc
                  </button>
               </div>
            </div>
         </section>

         {/* ── LOCATION GRID ── */}
         <section className="py-16 md:py-24 px-6 relative z-10 bg-[#F8FAFC]">
            <div className="max-w-7xl mx-auto">

               {/* Results Count & Filters */}
               <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="space-y-1">
                     <h2 className="text-2xl font-black uppercase tracking-tight text-black">Serviceable Zones</h2>
                     <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Showing {filteredLocations.length} locations matching your search</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-4 text-xs md:text-sm font-black uppercase tracking-widest text-slate-400">
                     <button
                        onClick={() => setActiveRegion('All')}
                        className={`transition-colors hover:text-[#FB7E10] ${activeRegion === 'All' ? 'text-[#FB7E10]' : ''}`}
                     >
                        All Regions
                     </button>
                     <button
                        onClick={() => setActiveRegion('Hampshire')}
                        className={`flex items-center gap-2 transition-colors hover:text-[#FB7E10] ${activeRegion === 'Hampshire' ? 'text-[#FB7E10]' : ''}`}
                     >
                        <Navigation size={18} className={activeRegion === 'Hampshire' ? 'text-[#FB7E10]' : 'text-slate-300'} /> Hampshire
                     </button>
                     <button
                        onClick={() => setActiveRegion('Surrey')}
                        className={`flex items-center gap-2 transition-colors hover:text-[#FB7E10] ${activeRegion === 'Surrey' ? 'text-[#FB7E10]' : ''}`}
                     >
                        <Navigation size={18} className={activeRegion === 'Surrey' ? 'text-[#FB7E10]' : 'text-slate-300'} /> Surrey
                     </button>
                     <button
                        onClick={() => setActiveRegion('Berkshire')}
                        className={`flex items-center gap-2 transition-colors hover:text-[#FB7E10] ${activeRegion === 'Berkshire' ? 'text-[#FB7E10]' : ''}`}
                     >
                        <Navigation size={18} className={activeRegion === 'Berkshire' ? 'text-[#FB7E10]' : 'text-slate-300'} /> Berkshire
                     </button>
                     <button
                        onClick={() => setActiveRegion('Reading')}
                        className={`flex items-center gap-2 transition-colors hover:text-[#FB7E10] ${activeRegion === 'Reading' ? 'text-[#FB7E10]' : ''}`}
                     >
                        <Navigation size={18} className={activeRegion === 'Reading' ? 'text-[#FB7E10]' : 'text-slate-300'} /> Reading
                     </button>
                     <button
                        onClick={() => document.getElementById('highways-section').scrollIntoView({ behavior: 'smooth' })}
                        className="flex items-center gap-2 transition-colors hover:text-[#FB7E10]"
                     >
                        <Navigation size={18} className="text-slate-300" /> Highways
                     </button>
                  </div>
               </div>

               {filteredLocations.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                     {filteredLocations.map((loc, index) => (
                        <Link
                           href={`/contact?location=${loc.name}`}
                           key={index}
                           className="group relative bg-white border border-slate-200 rounded-[2rem] p-0 hover:border-[#FB7E10] transition-all duration-500 overflow-hidden flex flex-col shadow-sm hover:shadow-2xl hover:-translate-y-2 cursor-pointer outline-none focus:ring-4 focus:ring-orange-100"
                        >

                           {/* Card Header: Zone & Status */}
                           <div className="p-8 pb-4 flex justify-between items-start">
                              <div className="space-y-1">
                                 <span className="block text-[9px] font-black text-[#FB7E10] uppercase tracking-[0.3em]">Zone ID</span>
                                 <h4 className="text-2xl font-black text-[#0B1528] tracking-tighter">
                                    {loc.postcode}
                                 </h4>
                              </div>
                              <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
                                 <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                 <span className="text-green-700 text-[9px] font-black uppercase tracking-widest">{loc.status}</span>
                              </div>
                           </div>

                           <div className="px-8 pb-8 space-y-6 flex-1">
                              {/* Body: Location Name */}
                              <div className="space-y-1 group-hover:translate-x-1 transition-transform duration-300">
                                 <h3 className="text-3xl font-black text-black leading-none uppercase tracking-tight">
                                    {loc.name}
                                 </h3>
                                 <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                                    <MapPin size={12} className="text-[#FB7E10]" /> {loc.region}
                                 </p>
                              </div>

                              {/* Clear CTA (MTC-LOC-02 Fix) */}
                              <div className="pt-2">
                                 <div className="w-full bg-[#0B1528] text-white py-4 rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 group-hover:bg-[#FB7E10] transition-colors shadow-lg shadow-black/5 group-hover:shadow-orange-900/10">
                                    Book In {loc.name} <ArrowRight size={14} />
                                 </div>
                              </div>
                           </div>

                           {/* Footer: Tech Data Strip */}
                           <div className="bg-slate-50 px-8 py-5 flex items-center justify-between border-t border-slate-100 group-hover:bg-orange-50/30 transition-colors">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                                    <Clock size={16} className="text-[#FB7E10]" />
                                 </div>
                                 <div>
                                    <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest">Deployment</span>
                                    <span className="text-slate-800 text-[10px] font-black">30-60 MINS</span>
                                 </div>
                              </div>
                              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#FB7E10] opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                                 Live Now
                              </span>
                           </div>
                        </Link>
                     ))}
                  </div>
               ) : (
                  <div className="py-24 text-center bg-white rounded-[3rem] border border-dashed border-slate-300">
                     <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                        <Search size={40} />
                     </div>
                     <h3 className="text-2xl font-black uppercase text-black mb-2">No Matching Areas Found</h3>
                     <p className="text-slate-500 font-medium">Try a different city or the first part of your postcode.</p>
                     <button
                        onClick={() => setSearchQuery('')}
                        className="mt-6 text-[#FB7E10] font-black uppercase tracking-widest text-xs hover:underline"
                     >
                        Clear Search
                     </button>
                  </div>
               )}
            </div>
         </section>

         {/* ── HIGHWAYS COVERAGE ── */}
         <section id="highways-section" className="py-20 px-6 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto">
               <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                  <div className="space-y-4">
                     <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-lg border border-blue-100">
                        <Navigation size={14} className="animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Rapid Roadside Support</span>
                     </div>
                     <h2 className="text-4xl md:text-6xl font-black text-black leading-none uppercase tracking-tighter">
                        HIGHWAYS & <br /> <span className="text-[#FB7E10]">MAJOR ROUTES</span>
                     </h2>
                     <p className="text-gray-500 font-medium max-w-xl">
                        Stuck on the hard shoulder? Our mobile units are strategically stationed near major junctions for the fastest possible response times on all primary UK arteries.
                     </p>
                  </div>
                  <div className="bg-[#0B1528] p-6 rounded-3xl text-white space-y-2 min-w-[280px] shadow-xl">
                     <p className="text-[10px] font-black uppercase tracking-widest text-blue-400">Response Target</p>
                     <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-[#FB7E10]">30–60</span>
                        <span className="text-xl font-bold">MINS</span>
                     </div>
                     <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Average Roadside Arrival</p>
                  </div>
               </div>

               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {[
                     { id: 'M4', type: 'Motorway', color: 'bg-blue-600' },
                     { id: 'M3', type: 'Motorway', color: 'bg-blue-600' },
                     { id: 'M25', type: 'Motorway', color: 'bg-blue-600' },
                     { id: 'M27', type: 'Motorway', color: 'bg-blue-600' },
                     { id: 'M1', type: 'Motorway', color: 'bg-blue-600' },
                     { id: 'M40', type: 'Motorway', color: 'bg-blue-600' },
                     { id: 'A331', type: 'Primary Route', color: 'bg-green-600' },
                     { id: 'A30', type: 'Primary Route', color: 'bg-green-600' },
                     { id: 'A329', type: 'Primary Route', color: 'bg-green-600' },
                     { id: 'A31', type: 'Primary Route', color: 'bg-green-600' },
                     { id: 'A325', type: 'Primary Route', color: 'bg-green-600' },
                     { id: 'A323', type: 'Primary Route', color: 'bg-green-600' },
                  ].map((route) => (
                     <div key={route.id} className="group relative bg-slate-50 border border-slate-200 p-6 rounded-2xl hover:border-[#FB7E10] hover:bg-white transition-all duration-300 hover:shadow-xl cursor-default overflow-hidden">
                        <div className={`absolute top-0 right-0 w-12 h-12 ${route.color} opacity-5 rounded-bl-[2rem] group-hover:opacity-10 transition-opacity`}></div>
                        <div className="relative z-10 space-y-1">
                           <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${route.color} animate-pulse`}></div>
                              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{route.type}</span>
                           </div>
                           <h3 className="text-3xl font-black text-black tracking-tighter">{route.id}</h3>
                        </div>
                     </div>
                  ))}
               </div>

               <div className="mt-12 p-8 bg-slate-50 rounded-3xl border border-slate-200 flex flex-col md:flex-row items-center gap-8">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-100 flex-shrink-0">
                     <Shield size={24} className="text-[#FB7E10]" />
                  </div>
                  <div className="text-center md:text-left flex-1 space-y-1">
                     <h4 className="text-lg font-black text-black uppercase tracking-tight">High-Risk Zone Safety Protocol</h4>
                     <p className="text-gray-500 text-sm font-medium">Our technicians are fully trained for motorway recovery. We coordinate with Highways England where necessary to ensure your safety and the safety of other road users during the fitting process.</p>
                  </div>
                  <a href="tel:02071013856" className="w-full md:w-auto bg-black text-white px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-[#FB7E10] transition-all shadow-lg active:scale-95 whitespace-nowrap">
                     Emergency Roadside Call
                  </a>
               </div>
            </div>
         </section>

         {/* ── INFO STRIP ─────────────────────────────────────────────────────────── */}
         <section className="bg-white py-16 border-y border-gray-100 px-6 relative z-20">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 text-center md:text-left">
               <div className="flex items-center gap-6 group">
                  <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#FB7E10] shadow-sm group-hover:scale-110 transition-transform">
                     <Zap size={32} />
                  </div>
                  <div>
                     <h4 className="text-xl font-black uppercase tracking-tight text-black leading-none mb-2">Emergency Response</h4>
                     <p className="text-gray-400 font-medium text-sm">On-site in 60 minutes or less</p>
                  </div>
               </div>
               <div className="flex items-center gap-6 group">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                     <Shield size={32} />
                  </div>
                  <div>
                     <h4 className="text-xl font-black uppercase tracking-tight text-black leading-none mb-2">Certified Crew</h4>
                     <p className="text-gray-400 font-medium text-sm">IMI-Certified expert technicians</p>
                  </div>
               </div>
               <div className="flex items-center gap-6 group">
                  <div className="w-16 h-16 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center text-green-600 shadow-sm group-hover:scale-110 transition-transform">
                     <Clock size={32} />
                  </div>
                  <div>
                     <h4 className="text-xl font-black uppercase tracking-tight text-black leading-none mb-2">24/7 Service</h4>
                     <p className="text-gray-400 font-medium text-sm">Always available, 365 days a year</p>
                  </div>
               </div>
            </div>
         </section>

         {/* ── CALL TO ACTION (MTC-LOC-09 Fix: Better Emphasis) ───────────────────── */}
         <section className="py-24 px-6 relative z-10 bg-slate-50">
            <div className="max-w-6xl mx-auto bg-[#0B1528] rounded-[3.5rem] p-12 md:p-24 text-center space-y-12 border border-gray-100 shadow-2xl overflow-hidden relative group">

               {/* decoration */}
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FB7E10]/10 rounded-full -mr-64 -mt-64 blur-3xl group-hover:bg-[#FB7E10]/20 transition-all duration-700"></div>
               <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-400/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>

               <div className="relative z-10 space-y-6">
                  <div className="inline-flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/5">
                     <Navigation size={16} className="text-[#FB7E10]" />
                     <span className="text-white font-black uppercase text-[10px] tracking-widest">Expanded Network Access</span>
                  </div>
                  <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-white">
                     NOT ON <br /> <span className="text-[#FB7E10]">THE LIST?</span>
                  </h2>
                  <p className="text-white/60 font-medium text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
                     Our fleet expands daily. Even if your town isn't listed, we likely have a technician orbiting your area right now.
                  </p>
               </div>

               <div className="relative z-10 flex flex-col sm:flex-row gap-6 justify-center pt-4">
                  <a href="tel:02071013856" className="inline-flex items-center justify-center gap-4 bg-[#FB7E10] text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-lg md:text-xl hover:bg-orange-600 hover:scale-105 transition-all shadow-xl active:scale-95 shadow-orange-900/40">
                     <Phone size={24} fill="white" /> 0207 101 3856
                  </a>
                  <Link href="/contact" className="inline-flex items-center justify-center gap-4 bg-white text-[#0B1528] px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-lg md:text-xl hover:bg-[#FB7E10] hover:text-white transition-all shadow-xl active:scale-95">
                     Request Area Check
                  </Link>
               </div>

               <div className="relative z-10 pt-12 flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
                  <div className="flex items-center gap-3 text-white">
                     <Shield size={20} className="text-[#FB7E10]" />
                     <span className="text-xs font-black uppercase tracking-widest">Safe Work Certified</span>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                     <Clock size={20} className="text-[#FB7E10]" />
                     <span className="text-xs font-black uppercase tracking-widest">24/7 Availability</span>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                     <Zap size={20} className="text-[#FB7E10]" />
                     <span className="text-xs font-black uppercase tracking-widest">Rapid Response</span>
                  </div>
               </div>
            </div>
         </section>

      </div>
   );
};

export default LocationsPage;