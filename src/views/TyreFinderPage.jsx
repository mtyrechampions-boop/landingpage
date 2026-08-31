"use client";

import React, { useEffect } from 'react';
import { SERVICE_AREAS_TEXT } from '@/lib/siteText';
import TyreFinder from '../components/TyreFinder';
import { ArrowRight, ShieldCheck, Zap, HelpCircle, Star, Phone } from 'lucide-react';
import Link from 'next/link';

const TyreFinderPage = () => {
    useEffect(() => {
        document.title = "Find the Right Tyres for Your Car | Mobile Tyre Champions";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute("content", `Use our free tyre registration lookup tool to find the exact tyres for your vehicle in seconds. Search by size or reg plate — then book a mobile fitting across ${SERVICE_AREAS_TEXT} with us.`);
        }
    }, []);

    return (
        <div className="font-['Outfit'] bg-[#060C18] min-h-screen text-white overflow-x-hidden">

            {/* ── PREMIUM HERO SECTION ───────────────────────────────────────── */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 overflow-hidden">
                {/* Background animations */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FB7E10]/10 rounded-full blur-[120px] -mr-40 -mt-20 animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] -ml-40 -mb-20"></div>
                </div>

                {/* Grid Overlay */}
                <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                ></div>

                <div className="max-w-7xl mx-auto relative z-10 text-center space-y-8">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-sm px-4 py-2 rounded-full animate-in fade-in slide-in-from-top-4 duration-700">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FB7E10] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FB7E10]"></span>
                        </span>
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#FB7E10]">UK's Smartest Tyre Lookup</span>
                    </div>

                    <div className="space-y-4 max-w-4xl mx-auto">
                        <h1 className="text-3xl sm:text-5xl md:text-8xl font-bold tracking-tight leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 text-center">
                            Registration<br />Lookup Tool
                        </h1>
                        <div className="w-16 sm:w-24 h-1.5 sm:h-2 bg-[#FB7E10] mx-auto rounded-full"></div>
                        <p className="text-gray-400 text-base sm:text-lg md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 px-2">
                            Identify your vehicle's specifications in seconds. Enter your registration number and we'll handle the rest.
                        </p>
                    </div>

                    {/* Quick Action Button for emergency */}
                    <div className="pt-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                        <a href="tel:02071013856" className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-2xl transition-all group">
                            <Phone className="text-[#FB7E10] group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-black uppercase tracking-widest text-[#FB7E10]">Need Help?


                                Call 0207 101 3856</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* ── TYRE FINDER COMPONENT SECTION ─────────────────────────────── */}
            <section className="relative z-20 -mt-10 mb-20">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center my-8"></h2>
                    <TyreFinder />
                </div>
            </section>

            {/* ── BENTO STYLE INFO GRID ──────────────────────────────────────── */}
            <section className="bg-white py-24 md:py-32 px-4 md:px-10 lg:px-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto space-y-20">

                    {/* Section Header */}
                    <div className="max-w-3xl space-y-4">
                        <h2 className="text-4xl md:text-6xl font-bold text-black tracking-tighter">
                            Why accuracy <br /> <span className="text-[#FB7E10]">matters</span>
                        </h2>
                        <p className="text-gray-500 font-medium text-lg md:text-xl">Every car is unique. Our lookup tool ensures you get the exact performance your car was engineered for.</p>
                    </div>

                    {/* Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <div className="bg-[#F1F3F6] rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 space-y-8 sm:space-y-12 group hover:shadow-2xl transition-all duration-500 cursor-default border border-gray-100">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-gray-100 group-hover:scale-110 transition-transform duration-500">
                                <ShieldCheck size={28} className="sm:w-8 sm:h-8" />
                            </div>
                            <div className="space-y-3 sm:space-y-4">
                                <h4 className="text-black font-black text-xl sm:text-2xl uppercase tracking-tight">Safety Guaranteed</h4>
                                <p className="text-gray-500 font-medium leading-relaxed text-sm sm:text-base">
                                    The wrong size can affect the ABS, stability control, and braking performance. We eliminate the risk of incorrect fittment.
                                </p>
                            </div>
                        </div>

                        {/* Card 2 (Highlighted) */}
                        <div className="bg-[#0B1528] rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 space-y-8 sm:space-y-12 group hover:shadow-2xl transition-all duration-500 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FB7E10]/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center text-[#FB7E10] shadow-sm border border-white/5 group-hover:scale-110 transition-transform duration-500 relative z-10">
                                <Zap size={28} className="sm:w-8 sm:h-8" />
                            </div>
                            <div className="space-y-3 sm:space-y-4 relative z-10">
                                <h4 className="text-white font-black text-xl sm:text-2xl uppercase tracking-tight">Instant Search</h4>
                                <p className="text-gray-400 font-medium leading-relaxed text-sm sm:text-base">
                                    Powered by high-performance datasets, our lookup provides detailed vehicle specs in under 5 seconds. Speed is at our core.
                                </p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-[#F1F3F6] rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 space-y-8 sm:space-y-12 group hover:shadow-2xl transition-all duration-500 cursor-default border border-gray-100">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center text-green-600 shadow-sm border border-gray-100 group-hover:scale-110 transition-transform duration-500">
                                <HelpCircle size={28} className="sm:w-8 sm:h-8" />
                            </div>
                            <div className="space-y-3 sm:space-y-4">
                                <h4 className="text-black font-black text-xl sm:text-2xl uppercase tracking-tight">Expert Support</h4>
                                <p className="text-gray-500 font-medium leading-relaxed text-sm sm:text-base">
                                    Registration not listed? Our team has access to tier-1 manufacturing databases to find the right tyre for any vehicle.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* ── SECTION 5 — CLOSING CTA BANNER ─────────────────────────────── */}
            <section className="bg-[#0B1528] py-24 px-4 text-center relative overflow-hidden">
                {/* Deco elements */}
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl -mt-32"></div>
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#FB7E10]/10 rounded-full blur-3xl -mb-32"></div>

                <div className="max-w-4xl mx-auto space-y-12 relative z-10">
                    <h2 className="text-4xl md:text-7xl font-bold text-white uppercase tracking-tighter leading-none">
                        Ready to get <br /> <span className="text-[#FB7E10]">moving?</span>
                    </h2>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                        <Link
                            href="/about"
                            className="w-full sm:w-auto px-12 py-5 bg-[#FB7E10] text-white rounded-2xl font-bold tracking-widest text-sm hover:bg-orange-600 transition-all shadow-xl shadow-orange-900/20 active:scale-95 text-center"
                        >
                            Learn About Us
                        </Link>
                        <a
                            href="tel:02071013856"
                            className="w-full sm:w-auto px-12 py-5 bg-transparent border-2 border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white hover:text-black hover:border-white transition-all active:scale-95 text-center"
                        >
                            Emergency? Call Now
                        </a>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default TyreFinderPage;
