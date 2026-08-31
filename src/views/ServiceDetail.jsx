'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { servicesData } from '../data/servicesData';
import { Phone, CheckCircle, ShieldCheck, Clock, MapPin, Star, Zap, Wrench, ArrowRight } from 'lucide-react';

const ServiceDetail = ({ id: propId }) => {
    const params = useParams();
    const id = propId || params?.id;
    const service = servicesData.find(s => s.id === id);

    if (!service) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
                <h2 className="text-3xl font-black text-slate-800 mb-4 uppercase">Service Not Found</h2>
                <p className="text-slate-500 mb-8">The service you're looking for or isn't available right now.</p>
                <Link href="/" className="bg-[#FB7E10] text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-sm">
                    Return Home
                </Link>
            </div>
        );
    }

    const isEmergency = service.priority || service.category === 'Emergency';

    return (
        <div className="bg-slate-50 min-h-screen pb-28 pt-0">
            {/* ── HERO SECTION ───────────────────────── */}
            <section className="relative h-[80vh] min-h-[600px] flex flex-col justify-center items-center overflow-hidden border-b-[10px] border-[#FB7E10] pt-20 md:pt-24 lg:pt-28">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={service.image}
                        alt={service.alt || service.title}
                        className={`w-full h-full ${service.fit === 'contain' ? 'object-contain bg-white' : 'object-cover object-center'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1528] via-[#0B1528]/60 to-black/20" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-10 lg:px-20 text-center">
                    {/* Urgency Badge */}
                    {isEmergency && (
                        <div className="inline-flex items-center gap-2 bg-red-600/90 text-white px-4 py-1.5 rounded-full mb-6 border border-red-400 shadow-[0_0_20px_rgba(220,38,38,0.4)] animate-pulse">
                            <Zap size={14} fill="currentColor" />
                            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest">Immediate 24/7 Dispatch</span>
                        </div>
                    )}
                    
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-[1] mb-6 drop-shadow-2xl">
                        {service.title}
                    </h1>
                    
                    <p className="text-gray-300 font-medium md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-sm sm:text-base">
                        {isEmergency 
                            ? "Stranded? Our mobile units are on standby. We come directly to your location with everything needed to get you back on the road safely." 
                            : service.description}
                    </p>

                    {/* Single Primary CTA */}
                    <div className="flex flex-col items-center justify-center gap-4">
                        <a
                            href="tel:02071013856"
                                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#FB7E10] text-white px-6 sm:px-12 py-3 sm:py-5 rounded-xl font-black text-base sm:text-lg md:text-xl uppercase tracking-widest hover:bg-orange-600 transition-all shadow-2xl hover:-translate-y-1 active:translate-y-0"
                        >
                            <Phone size={24} fill="white" className="stroke-none animate-bounce" />
                            Call Now: 0207 101 3856
                        </a>
                        <p className="text-white/60 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                            <CheckCircle size={14} className="text-[#FB7E10]" /> No hidden callout fees
                        </p>
                    </div>
                </div>
            </section>

            {/* ── MOBILE QUICK SUMMARY BAR ─────────────────────────────────────── */}
            <section className="bg-white border-b border-gray-100 py-4 px-4 sticky top-20 z-40 shadow-sm md:hidden">
                <div className="flex justify-between items-center max-w-md mx-auto text-xs font-bold uppercase tracking-widest text-[#0B1528]">
                    <div className="flex flex-col items-center gap-1">
                        <Clock size={16} className="text-[#FB7E10]" />
                        <span className="text-[9px] text-gray-500">{isEmergency ? '60-Min Response' : 'Fast Arrival'}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 border-l border-r border-gray-100 px-4">
                        <MapPin size={16} className="text-[#FB7E10]" />
                        <span className="text-[9px] text-gray-500">We Come To You</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Star size={16} className="text-[#FB7E10]" fill="currentColor"/>
                        <span className="text-[9px] text-gray-500">4.9/5 Rating</span>
                    </div>
                </div>
            </section>

            {/* ── TRUST SIGNALS BAR (Desktop mainly) ───────────────────────────── */}
            {service.id !== 'van-tyres' && (
                <section className="hidden md:block bg-[#0B1528]">
                    <div className="max-w-7xl mx-auto flex justify-around py-6 px-10">
                        {[
                            { icon: Clock, title: isEmergency ? "Rapid 60-Min Response" : "Same Day Availability" },
                            { icon: Star, title: `${service.rating || '4.9'} Average Rating (${service.reviews || '500+'} reviews)` },
                            { icon: ShieldCheck, title: "Over 5,000 Jobs Completed" },
                            { icon: Wrench, title: "Fully Equipped Mobile Units" }
                        ].map((trust, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-white">
                                <trust.icon size={24} className="text-[#FB7E10]" />
                                <span className="font-bold text-sm tracking-wide">{trust.title}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* ── SERVICE DETAILS & PROCESS ────────────────────────────────────── */}
            <section className="py-16 md:py-24 px-4 sm:px-10 lg:px-20 bg-white">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
                    
                    {/* Left: Step-by-Step Flow and Description */}
                    <div className="lg:w-2/3 space-y-16">
                        
                        {/* Process Flow - Critical for UX */}
                        <div className="space-y-8">
                            <div className="space-y-2">
                                <h2 className="text-3xl md:text-5xl font-black text-black leading-none tracking-tighter uppercase">
                                    How It <span className="text-[#FB7E10]">Works</span>
                                </h2>
                                <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Simple 3-Step Process</p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 realtive">
                                    <div className="text-4xl font-black text-slate-200 mb-2">01</div>
                                    <h4 className="text-lg font-black uppercase text-black mb-2">Request Service</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed">Call our dispatch team. Provide your location and tyre size for an instant fixed quote.</p>
                                </div>
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 realtive">
                                    <div className="text-4xl font-black text-slate-200 mb-2">02</div>
                                    <h4 className="text-lg font-black uppercase text-black mb-2">We Dispatch</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed">A fully-equipped mobile unit is dispatched immediately, with realistic ETA updates.</p>
                                </div>
                                <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 realtive">
                                    <div className="text-4xl font-black text-orange-200 mb-2">03</div>
                                    <h4 className="text-lg font-black uppercase text-[#FB7E10] mb-2">Problem Solved</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">Your tyre is repaired or replaced precisely on-site. You're back on the road instantly.</p>
                                </div>
                            </div>
                        </div>

                        {/* Text Description broken into scannable chunks */}
                        <div className="space-y-6">
                            <h3 className="text-2xl md:text-4xl font-black text-black leading-none tracking-tighter uppercase">
                                Why Choose Us for <span className="text-[#FB7E10]">{service.title}</span>?
                            </h3>
                            <div className="prose prose-lg text-gray-500">
                                <p>
                                    {service.description} We bring the expertise of a professional workshop directly to your driveway, workplace, or the roadside.
                                </p>
                                <ul className="mt-8 space-y-4 list-none pl-0">
                                    {service.features && service.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <CheckCircle size={20} className="text-[#FB7E10] shrink-0 mt-0.5" />
                                            <span className="font-bold text-slate-700">{feature}</span>
                                        </li>
                                    ))}
                                    <li className="flex items-start gap-3">
                                        <CheckCircle size={20} className="text-[#FB7E10] shrink-0 mt-0.5" />
                                        <span className="font-bold text-slate-700">Digital wheel balancing included as standard where applicable</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle size={20} className="text-[#FB7E10] shrink-0 mt-0.5" />
                                        <span className="font-bold text-slate-700">Old tyre environmental disposal</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>

                    {/* Right: Sticky Sidebar CTA */}
                    <div className="lg:w-1/3 w-full lg:sticky lg:top-32">
                        <div className="bg-[#0B1528] rounded-3xl p-8 lg:p-10 text-white relative shadow-2xl overflow-hidden mt-6 lg:mt-0 z-10">
                           <div className="relative z-10 space-y-6 text-center">
                                <h3 className="text-3xl font-black uppercase tracking-tight leading-tight">
                                    Need {service.title} <span className="text-[#FB7E10]">Now?</span>
                                </h3>
                                <div className="pt-4">
                                    <a 
                                        href="tel:02071013856"
                                        className="w-full flex items-center justify-center gap-3 bg-[#FB7E10] text-white py-5 rounded-xl font-black uppercase tracking-widest text-base hover:bg-orange-600 transition-all shadow-xl active:scale-95"
                                    >
                                        <Phone size={20} fill="currentColor" /> Call 0207 101 3856
                                    </a>
                                </div>
                                <p className="text-[#FB7E10] text-[10px] font-black uppercase tracking-widest pt-2">
                                    Live operator available
                                </p>
                           </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FINAL CTA SECTION ───────────────────────────────────────────────── */}
            <section className="pb-16 px-4 sm:px-10 lg:px-20 bg-white">
                <div className="max-w-7xl mx-auto bg-slate-900 rounded-[2.5rem] p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                    
                    <div className="relative z-10 space-y-8 flex flex-col items-center">
                        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight uppercase max-w-2xl">
                            Don't Let Tyre Issues <span className="text-[#FB7E10]">Slow You Down.</span>
                        </h2>
                        
                        <a 
                            href="tel:02071013856"
                            className="w-full sm:w-auto bg-[#FB7E10] text-white px-4 sm:px-10 md:px-16 py-3 md:py-6 rounded-2xl font-black uppercase tracking-widest text-sm sm:text-base md:text-xl hover:bg-white hover:text-slate-900 transition-all shadow-[0_0_30px_rgba(251,126,16,0.3)] active:scale-95 flex items-center justify-center gap-3 sm:gap-4 group"
                        >
                            <Phone size={20} className="sm:hidden animate-pulse" fill="currentColor" />
                            <span className="whitespace-nowrap">Get Back On The Road</span> 
                            <ArrowRight size={20} className="hidden sm:block group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServiceDetail;

