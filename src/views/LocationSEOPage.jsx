"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Shield, Clock, Zap, CheckCircle, MapPin } from 'lucide-react';
import { locationSeoData } from '@/data/locationSeoData';
import { locations } from '@/data/locations';
import OfficialPartners from '@/components/OfficialPartners';

const locationFaqsData = {
    hampshire: [
        {
            q: "How fast is your mobile tyre fitting response time in Hampshire?",
            a: "Our average emergency dispatch time in Hampshire is 30–60 minutes. Since we station our technicians near key routes like the M3, A3, and around Basingstoke, Aldershot, and Winchester, we can reach you extremely fast."
        },
        {
            q: "Which areas of Hampshire do you cover?",
            a: "We cover all major towns and postcodes across Hampshire. This includes Aldershot (GU11), Basingstoke (RG21), Winchester (SO22), Southampton (SO14), Fleet (GU51), Farnborough (GU14), Hook (RG27), and Alton (GU34)."
        },
        {
            q: "Do you provide emergency roadside tyre fitting on Hampshire motorways?",
            a: "Yes, our technicians are fully certified and equipped to perform roadside emergency tyre fittings and repairs safely on high-speed roads, including the M3, A3, and other major Hampshire bypasses."
        },
        {
            q: "What tyre services do you offer in Hampshire?",
            a: "We provide complete 24/7 emergency tyre replacement, mobile puncture repair, locking wheel nut removal, wheel balancing, and commercial van tyre fitting at your driveway, work, or roadside."
        },
        {
            q: "Do I need to visit a garage?",
            a: "No, we are a 100% mobile service. We bring the tyre shop directly to you, saving you the hassle of driving on a flat or waiting in line at a traditional garage."
        }
    ],
    berkshire: [
        {
            q: "How quickly can you replace a tyre in Berkshire?",
            a: "Our technicians aim to arrive within 30 to 60 minutes for emergency bookings. We have dedicated fitters stationed near the M4 corridor to serve Berkshire drivers instantly."
        },
        {
            q: "Which postcodes in Berkshire are covered?",
            a: "We cover postcodes across Berkshire including Slough (SL1), Windsor (SL4), Maidenhead (SL6), Bracknell (RG12), Ascot (SL5), Sunningdale (SL5), Langley (SL3), Eton (SL4), Newbury (RG14), Thatcham (RG18), Hungerford (RG17), Twyford (RG10), Crowthorne (RG45), Sandhurst (GU47), and surrounding areas."
        },
        {
            q: "Can you remove locking wheel nuts in Berkshire?",
            a: "Yes, we carry specialized locking wheel nut extraction tools to safely remove most locking nuts without causing damage to your alloy wheels."
        },
        {
            q: "Are you open on weekends and bank holidays in Berkshire?",
            a: "Yes, our mobile tyre service operates 24 hours a day, 7 days a week, 365 days a year, ensuring you're never stranded in Berkshire."
        },
        {
            q: "What tyre brands do you supply in Berkshire?",
            a: "We stock premium brands like Michelin, Continental, Pirelli, and Goodyear, alongside quality mid-range and budget tyres to fit all passenger vehicles and vans."
        }
    ],
    surrey: [
        {
            q: "How long does it take for a tyre fitter to arrive in Surrey?",
            a: "Our technicians typically arrive within 30–60 minutes. Being based near Guildford, Woking, and the M25 allows us to navigate Surrey quickly."
        },
        {
            q: "Which Surrey postcodes do you cover?",
            a: "We cover Guildford (GU1), Woking (GU21), Camberley (GU15), Farnham (GU9), Cranleigh (GU6), Haslemere (GU27), Hindhead (GU26), Bagshot (GU19), and many other Surrey locations."
        },
        {
            q: "Can you fit tyres at my home or workplace in Surrey?",
            a: "Absolutely! We can perform mobile tyre fittings on your driveway, office car park, or at the roadside."
        },
        {
            q: "Do you cover the M25 motorway in Surrey?",
            a: "Yes, our experts are trained to perform high-speed roadside tyre replacements safely on the M25 and major Surrey bypasses."
        },
        {
            q: "How do I pay for my tyre fitting in Surrey?",
            a: "We accept secure card payments and digital payments on-site once the job is completed to your satisfaction."
        }
    ],
    reading: [
        {
            q: "How fast is your response time for mobile tyre fitting in Reading?",
            a: "We aim to reach all Reading locations in 30–60 minutes. Our local technicians are strategically based near Caversham, Tilehurst, and the M4 junctions."
        },
        {
            q: "Which areas of Reading do you cover?",
            a: "We cover Reading Central (RG1), Reading West (RG30), Caversham (RG4), Tilehurst (RG31), Earley (RG6), Woodley (RG5), Shinfield (RG2), and Wokingham (RG40)."
        },
        {
            q: "Can you repair a flat tyre on-site in Reading instead of replacing it?",
            a: "Yes, if the puncture meets British Safety Standards (BS AU 159), we will gladly repair it on-site to save you the cost of a new tyre."
        },
        {
            q: "What vehicles do you service in Reading?",
            a: "We service passenger cars, electric vehicles, 4x4s, SUVs, and light commercial vans of all makes and models."
        },
        {
            q: "Do you offer locking wheel nut removal in Reading?",
            a: "Yes, we provide damage-free locking wheel nut removal for drivers who have lost or broken their key in the Reading area."
        }
    ]
};

const LocationSEOPage = ({ location }) => {
    // Get unique data or use a fallback if somehow an unknown slug is accessed
    const normalizedLoc = location.toLowerCase();
    const data = locationSeoData[normalizedLoc] || {
        heroTitle: `24/7 Mobile Tyre Fitting in ${location}`,
        heroSubtitle: `Rapid roadside tyre replacement across ${location}. Our local technicians aim to reach you in 30-60 minutes.`,
        ctaText: "Book Local Fitter",
        trustIndicators: [
            { title: "Local Fleet", desc: `Based across ${location}` },
            { title: "Fast Response", desc: "Rapid dispatch" },
            { title: "Fully Equipped", desc: "All tyre sizes carried" }
        ],
        uniqueContent: {
            heading: `Why ${location} Drivers Choose Us`,
            paragraph1: `Navigating ${location} means tyre trouble can strike anywhere. Our dedicated mobile tyre fitting units are strategically stationed to guarantee the fastest possible dispatch.`,
            paragraph2: "We specialize in emergency puncture repairs, locking wheel nut removal, and complete mobile tyre replacements. Skip the garage wait times and let our local experts bring the tyre shop directly to your driveway, workplace, or roadside location."
        }
    };

    const formattedLocationName = normalizedLoc.charAt(0).toUpperCase() + normalizedLoc.slice(1);
    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const localAreas = locations.filter(loc => loc.region.toLowerCase() === normalizedLoc);
    const localFaqs = locationFaqsData[normalizedLoc] || [];

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* HERO: service-style, image background with dark overlay */}
            <section className="relative h-[80vh] min-h-[600px] flex flex-col justify-center items-center overflow-hidden pt-20 md:pt-24 lg:pt-28">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/mobile-tyre-champions-van1.webp"
                        alt={data.heroTitle}
                        className="w-full h-full object-cover scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1528] via-[#0B1528]/80 to-[#0B1528]/40" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-10 lg:px-20 text-center animate-fadeIn">
                    {/* badge removed per request */}

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-tight mb-4">
                        {data.heroTitle}
                    </h1>

                    <p className="text-slate-300 max-w-3xl mx-auto font-medium text-sm sm:text-base md:text-lg mb-6 leading-relaxed px-2 sm:px-0">
                        {data.heroSubtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="tel:02071013856"
                            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#FB7E10] text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-orange-600 transition-shadow shadow-xl"
                        >
                            <Phone size={18} /> Call Now
                        </a>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-3 bg-white text-[#0B1528] px-6 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-gray-100 transition-all shadow-sm"
                        >
                            Book Online
                        </Link>
                    </div>
                </div>
            </section>

            {/* Unique Trust Indicators */}
            <section className="bg-white py-12 border-b border-gray-100 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {data.trustIndicators.map((indicator, index) => {
                        const icons = [<Zap size={24} />, <Clock size={24} />, <Shield size={24} />];
                        const colors = ["bg-orange-50 text-[#FB7E10]", "bg-blue-50 text-blue-600", "bg-green-50 text-green-600"];
                        return (
                            <div key={index} className="flex items-center justify-center gap-4 group">
                                <div className={`w-12 h-12 rounded-full ${colors[index]} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                    {icons[index]}
                                </div>
                                <div className="text-left">
                                    <h4 className="font-black uppercase text-black text-sm font-sans">{indicator.title}</h4>
                                    <p className="text-gray-500 text-xs font-medium font-sans">{indicator.desc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* MAIN CONTENT: left details + right sticky CTA card (service-style) */}
            <section className="py-16 md:py-24 px-4 sm:px-10 lg:px-20 bg-white">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
                    {/* Left: Detailed Info */}
                    <div className="lg:w-2/3 space-y-12">
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-5xl font-black text-black tracking-tight leading-tight">
                                {data.uniqueContent.heading || `Why Choose Mobile Tyre Champions in ${formattedLocationName}`}
                            </h2>
                            <div className="w-20 h-2 bg-[#FB7E10]" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-600 font-medium leading-relaxed text-base md:text-lg">
                                <div className="space-y-4">
                                    <p>{data.uniqueContent.paragraph1}</p>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-3 text-sm font-black text-black uppercase tracking-tight"><div className="w-1.5 h-1.5 bg-[#FB7E10] rounded-full" />Fast local response</li>
                                        <li className="flex items-center gap-3 text-sm font-black text-black uppercase tracking-tight"><div className="w-1.5 h-1.5 bg-[#FB7E10] rounded-full" />Fully equipped mobile vans</li>
                                        <li className="flex items-center gap-3 text-sm font-black text-black uppercase tracking-tight"><div className="w-1.5 h-1.5 bg-[#FB7E10] rounded-full" />Professional, safety-first technicians</li>
                                    </ul>
                                </div>
                                <div className="space-y-4">
                                    <p>{data.uniqueContent.paragraph2}</p>
                                    <div className="p-4 bg-orange-50 border-l-4 border-[#FB7E10] italic text-sm font-bold text-orange-900">Experienced local fitters, rapid dispatch across {formattedLocationName}.</div>
                                </div>
                            </div>
                        </div>

                        {/* Grid Features */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl group hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-6 group-hover:bg-[#FB7E10] group-hover:text-white transition-colors">
                                    <Shield size={24} className="text-[#FB7E10] group-hover:text-white" />
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-4">Safe, Professional Fitters</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">Our technicians follow strict safety procedures and are trained for roadside and driveway operations.</p>
                            </div>

                            <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl group hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-6 group-hover:bg-[#FB7E10] group-hover:text-white transition-colors">
                                    <Zap size={24} className="text-[#FB7E10] group-hover:text-white" />
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-4">Rapid On-Site Service</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">We aim for fast arrival times across local postcodes to minimise disruption.</p>
                            </div>
                        </div>

                        {/* FAQs (local) */}
                        {localFaqs.length > 0 && (
                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <h2 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tight flex items-center gap-4">Frequently Asked <span className="text-[#FB7E10]">Questions</span></h2>
                                    <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em]">Everything you need to know about our mobile tyre fitting service in {formattedLocationName}</p>
                                </div>

                                <div className="space-y-3">
                                    {localFaqs.map((faq, idx) => (
                                        <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden transition-all duration-300">
                                            <button 
                                                onClick={() => toggleFaq(idx)}
                                                className="w-full flex items-center justify-between p-6 text-left group"
                                            >
                                                <span className="text-sm md:text-base font-black uppercase tracking-tight text-slate-900 group-hover:text-[#FB7E10] transition-colors">{faq.q}</span>
                                                <svg className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openFaqIndex === idx ? 'rotate-180 text-[#FB7E10]' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
                                            </button>
                                            <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === idx ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                                                <p className="text-slate-600 font-medium leading-relaxed text-sm">{faq.a}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: sticky CTA / What's Included card */}
                    <aside className="lg:w-1/3 w-full lg:sticky lg:top-28 mt-8 lg:mt-0">
                        <div className="bg-[#0B1528] rounded-3xl p-5 md:p-8 text-white relative shadow-[0_20px_40px_rgba(11,21,40,0.45)]">
                            <div className="relative z-10 space-y-6">
                                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight drop-shadow-md">Quick Overview</h3>
                                <p className="text-white/90">On-site tyre fitting, puncture repair and emergency replacements across {formattedLocationName}.</p>

                                <ul className="space-y-3 pt-2">
                                    {['30–60 minutes typical arrival','Fully equipped mobile vans','Wheel balancing available','Secure on-site payments'].map((f, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className="w-6 h-6 mt-1 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                                <CheckCircle size={14} className="text-white" />
                                            </div>
                                            <span className="font-bold text-white/95 leading-tight">{f}</span>
                                        </div>
                                    ))}
                                </ul>

                                <div className="pt-4">
                                    <a href="tel:02071013856" className="w-full flex items-center justify-center gap-3 bg-[#FB7E10] text-white py-3 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-orange-600 hover:scale-105 transition-transform duration-200 shadow-md">
                                        <Phone size={18} /> Call Now
                                    </a>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            {/* Official Partners Section */}
            <OfficialPartners />

            {/* Postcode Locations Covered Section */}
            {localAreas.length > 0 && (
                <section className="py-20 px-6 bg-white border-t border-gray-100 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-blue-50/40 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                            <h2 className="text-3xl md:text-5xl font-black uppercase text-black tracking-tight font-sans">
                                Areas We Cover in <span className="text-[#FB7E10]">{formattedLocationName}</span>
                            </h2>
                            <p className="text-gray-500 font-medium text-base md:text-lg font-sans">
                                We dispatch local, fully-equipped mobile tyre vans directly to all residential, roadside, and business addresses in these areas:
                            </p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                            {localAreas.map((area, index) => (
                                <div 
                                    key={index}
                                    className="bg-slate-50/50 border border-slate-100 hover:border-orange-500/20 rounded-2xl p-4 flex items-center gap-3 hover:-translate-y-1 hover:shadow-[0_12px_24px_-10px_rgba(0,0,0,0.06)] hover:bg-white transition-all duration-300 group cursor-pointer"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-orange-50 group-hover:bg-[#FB7E10] flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                                        <MapPin className="w-5 h-5 text-[#FB7E10] group-hover:text-white transition-colors duration-300" />
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-bold text-slate-800 text-sm md:text-base truncate group-hover:text-[#FB7E10] transition-colors font-sans">{area.name}</h4>
                                        <span className="inline-block text-[10px] font-black tracking-wider text-slate-400 uppercase font-sans">{area.postcode}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ Section */}
            {localFaqs.length > 0 && (
                <section className="py-20 px-6 bg-slate-50 border-t border-gray-100">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-3xl md:text-5xl font-black uppercase text-black tracking-tight font-sans">
                                Frequently Asked <span className="text-[#FB7E10]">Questions</span>
                            </h2>
                            <p className="text-gray-500 font-medium text-base md:text-lg font-sans">
                                Get answers to the most common questions about our mobile tyre fitting services in {formattedLocationName}.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {localFaqs.map((faq, index) => {
                                const isOpen = openFaqIndex === index;
                                return (
                                    <div 
                                        key={index}
                                        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
                                    >
                                        <button
                                            onClick={() => toggleFaq(index)}
                                            className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left font-bold text-slate-900 md:text-lg hover:text-[#FB7E10] transition-colors font-sans"
                                        >
                                            <span>{faq.q}</span>
                                            <span className={`w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 text-slate-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180 bg-orange-50 text-[#FB7E10]' : ''}`}>
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </span>
                                        </button>
                                        
                                        <div 
                                            className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] border-t border-slate-50 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
                                        >
                                            <div className="p-6 text-gray-600 font-medium leading-relaxed bg-slate-50/50 font-sans">
                                                {faq.a}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* Bespoke Local CTA to replace shared component */}
            <section className="py-24 px-6 bg-[#0B1528] text-center border-t border-white/5">
                <div className="max-w-3xl mx-auto space-y-8">
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter font-sans">
                        READY FOR <span className="text-[#FB7E10]">DISPATCH?</span>
                    </h2>
                    <p className="text-gray-400 text-lg font-sans">
                        Don't let a flat tyre ruin your day. Call our direct dispatch line now for immediate assistance.
                    </p>
                    <a
                        href="tel:02071013856"
                        className="inline-flex items-center justify-center gap-3 bg-[#FB7E10] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-lg hover:bg-orange-600 transition-all shadow-xl shadow-orange-900/30 active:scale-95 font-sans"
                    >
                        <Phone size={22} fill="white" /> 0207 101 3856
                    </a>
                </div>
            </section>
        </div>
    );
};

export default LocationSEOPage;

