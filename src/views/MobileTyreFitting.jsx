"use client";

import React from 'react';
import { SERVICE_AREAS_TEXT } from '@/lib/siteText';
import { Phone, CheckCircle, Truck, Zap, ShieldCheck, Clock, MapPin, Wrench, ChevronDown, Gauge, Users, Award, Cog } from 'lucide-react';

const MobileTyreFitting = () => {
    const [openFaq, setOpenFaq] = React.useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const tyreCategories = [
        {
            title: "Premium Brands",
            brands: "Michelin, Continental, Pirelli, Bridgestone, Goodyear, Dunlop, Yokohama"
        },
        {
            title: "Mid-Range Brands",
            brands: "Hankook, Falken, Toyo, Kumho, Nexen"
        },
        {
            title: "Budget Brands",
            brands: "Avon, Sailun, Autogreen"
        }
    ];

    const vehicleTypes = [
        "Cars from city cars and saloons to performance vehicles and luxury SUVs",
        "Vans and light commercial vehicles including common van tyres for Ford Transit, Vauxhall Vivaro, Mercedes Sprinter and more",
        "4x4 and SUV a wide range of all-terrain and road-biased SUV tyres",
        "Electric vehicles: EV-specific tyres from brands like Michelin and Goodyear",
        "Run-flat vehicles: we carry run-flat fitments for BMW, Mini, and other vehicles that require them"
    ];

    const servicesIncluded = [
        {
            icon: Truck,
            title: "Tyre Delivery",
            description: "Your new tyres arrive already loaded on our van"
        },
        {
            icon: Wrench,
            title: "Professional Fitting",
            description: "Safe removal and fitting of new tyres to your wheels"
        },
        {
            icon: Gauge,
            title: "Wheel Balancing",
            description: "Precision balancing equipment on every job"
        },
        {
            icon: Award,
            title: "Torque Settings",
            description: "Calibrated torque wrench with manufacturer specifications"
        },
        {
            icon: Cog,
            title: "Valve Stems",
            description: "New valve stems fitted as standard"
        },
        {
            icon: ShieldCheck,
            title: "Quality Check",
            description: "Tyre pressure, TPMS reset, and safety confirmation"
        }
    ];

    const faqs = [
        {
            q: "How quickly can you fit my tyres?",
            a: "A typical tyre fitting takes 30-45 minutes depending on your vehicle and number of tyres being replaced. We'll give you an accurate estimate when you book."
        },
        {
            q: "What if I don't know my tyre size?",
            a: "Simply provide your vehicle registration number and we'll look up the correct tyre size for you. You can also find it on the sidewall of your current tyre or in your vehicle's handbook."
        },
        {
            q: "Can you fit tyres to any vehicle?",
            a: "We fit tyres to most cars, vans, 4x4s, SUVs, electric vehicles, and run-flat vehicles. Contact us if you're unsure whether we can help with your specific vehicle."
        },
        {
            q: "Do you dispose of my old tyres?",
            a: "Yes. Your old tyres are taken away for responsible disposal as standard. There's no extra charge for this."
        },
        {
            q: "Can you fit tyres on a Sunday or evening?",
            a: "Yes. We operate extended hours to fit around your schedule. Contact us to check availability for your preferred time."
        },
        {
            q: "What's included in the service?",
            a: "Every fitting includes tyre removal and fitting, wheel balancing, new valve stems, torque settings on all wheel nuts, tyre pressure checks, TPMS reset (where applicable), and old tyre disposal."
        },
        {
            q: "Do I need to be home during the fitting?",
            a: "Yes, we'll need someone present at the location. For corporate or fleet bookings, one representative can oversee multiple vehicle fittings."
        },
        {
            q: "Can you fit tyres at my workplace?",
            a: "Absolutely. We fit tyres at homes, workplaces, motorway service stations, and anywhere with safe, level parking."
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* HERO SECTION */}
            <section className="relative h-[80vh] min-h-[600px] flex flex-col justify-center items-center overflow-hidden pt-20 md:pt-24 lg:pt-28">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/high spppppppppppp (39).webp"
                        alt={`Fully branded Mobile Tyre Champions van providing emergency mobile tyre fitting services ${SERVICE_AREAS_TEXT}`}
                        className="w-full h-full object-cover scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1528] via-[#0B1528]/80 to-[#0B1528]/40" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-10 lg:px-20 text-center animate-fadeIn">
                    <div className="inline-flex items-center gap-2 bg-[#FB7E10]/20 border border-[#FB7E10]/30 px-5 py-2 rounded-full mb-8 backdrop-blur-md">
                        <Truck size={16} className="text-[#FB7E10]" />
                        <span className="text-[#FB7E10] text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">Professional Mobile Service</span>
                    </div>
                    
                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8 drop-shadow-2xl">
                        Mobile Tyre <br className="hidden md:block"/> <span className="text-[#FB7E10]">Fitting</span>
                    </h1>
                    
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10 max-w-4xl mx-auto">
                        <div className="flex items-center gap-2 text-slate-300 font-bold text-sm md:text-base">
                            <Clock size={20} className="text-[#FB7E10]" />
                            <span>30-45 Minutes</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300 font-bold text-sm md:text-base">
                            <MapPin size={20} className="text-[#FB7E10]" />
                            <span>At Your Location</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300 font-bold text-sm md:text-base">
                            <ShieldCheck size={20} className="text-[#FB7E10]" />
                            <span>Professional Fitting</span>
                        </div>
                    </div>

                    <p className="text-slate-300 max-w-2xl mx-auto font-medium text-base md:text-xl mb-10 leading-relaxed px-4">
                        Professional tyre replacement — we come to you. No waiting rooms, no wasted hours, just fast and professional service wherever your vehicle happens to be.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <a
                            href="tel:02071013856"
                            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#FB7E10] text-white px-12 py-5 rounded-xl font-black text-lg uppercase tracking-[0.15em] hover:bg-orange-600 transition-all shadow-xl shadow-orange-900/40 hover:-translate-y-1 active:translate-y-0"
                        >
                            <Phone size={24} fill="white" className="stroke-none" />
                            Call Now
                        </a>
                    </div>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <section className="py-16 md:py-24 px-4 sm:px-10 lg:px-20 bg-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
                    
                    {/* Left: Detailed Info */}
                    <div className="lg:col-span-2 space-y-16">
                        
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-3xl md:text-6xl font-black text-black leading-[1] tracking-tighter uppercase">
                                    Mobile Tyre Fitting <span className="text-[#FB7E10]">At Your Location</span>
                                </h2>
                                <div className="w-20 h-2 bg-[#FB7E10]" />
                            </div>

                            <div className="space-y-6 text-gray-600 font-medium leading-relaxed">
                                <p className="text-lg">
                                    Mobile tyre fitting is exactly what it sounds like: instead of taking your car to a garage and waiting for hours, our technician drives to you, fits your tyres on the spot, and leaves your vehicle road-ready. No appointments at inconvenient times, no wasted hours in a waiting room — just a fast, professional service wherever your vehicle happens to be.
                                </p>
                            </div>
                        </div>

                        {/* Who Uses It */}
                        <div className="space-y-8 border-t-2 border-[#FB7E10]/20 pt-8">
                            <div className="space-y-4">
                                <h3 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tighter">
                                    Who Uses <span className="text-[#FB7E10]">Mobile Tyre Fitting?</span>
                                </h3>
                            </div>

                            <div className="space-y-4 text-gray-600 font-medium leading-relaxed">
                                <p>
                                    <strong className="text-black">Busy professionals</strong> who can't afford to take half a day out to sit in a garage. <strong className="text-black">Parents</strong> who need their car sorted while the kids are at school. <strong className="text-black">Fleet managers</strong> who need vehicles back on the road as fast as possible. <strong className="text-black">Drivers</strong> who discover a damaged tyre in the evening or on a weekend when traditional garages are closed.
                                </p>
                                <p>
                                    In short: <strong className="text-black">anyone who values their time</strong>. Mobile tyre fitting isn't a premium service for the few. It's a smarter way to get a job done for anyone who'd rather not waste their day.
                                </p>
                            </div>

                            <div className="mt-8 rounded-2xl overflow-hidden">
                                <img 
                                    src="/images/expert%20mech.webp" 
                                    alt="Experienced mobile tyre fitting technician inspecting vehicle wheel and tyre during professional on-site service" 
                                    className="w-full h-auto object-cover rounded-2xl shadow-lg"
                                />
                            </div>
                        </div>

                        {/* What's Included */}
                        <div className="space-y-8 border-t-2 border-[#FB7E10]/20 pt-8">
                            <div className="space-y-4">
                                <h3 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tighter">
                                    What's Included in Our <span className="text-[#FB7E10]">Service</span>
                                </h3>
                                <p className="text-gray-600 font-medium text-lg">
                                    When you book Mobile Tyre Champions, here's exactly what happens:
                                </p>
                            </div>

                            <div className="rounded-2xl overflow-hidden mb-8">
                                <img 
                                    src="/images/emergency tyre.webp" 
                                    alt="Mobile Tyre Champions emergency tyre replacement service vehicle attending a roadside callout" 
                                    className="w-full h-auto object-cover rounded-2xl shadow-lg"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {servicesIncluded.map((service, idx) => {
                                    const IconComponent = service.icon;
                                    return (
                                        <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition-all">
                                            <div className="flex items-start gap-4 mb-4">
                                                <div className="w-12 h-12 bg-[#FB7E10] rounded-xl flex items-center justify-center shrink-0">
                                                    <IconComponent size={24} className="text-white" />
                                                </div>
                                                <h4 className="text-lg font-black text-black uppercase tracking-tight">{service.title}</h4>
                                            </div>
                                            <p className="text-gray-600 font-medium leading-relaxed text-sm">
                                                {service.description}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="bg-orange-50 border-l-4 border-[#FB7E10] p-6 rounded-r-lg">
                                <p className="text-orange-900 font-bold text-base">
                                    Your old tyres are taken away for responsible disposal. Before leaving, the technician will check your tyre pressures, reset your TPMS (Tyre Pressure Monitoring System) warning light where applicable, and confirm that everything is safe and correct.
                                </p>
                            </div>
                        </div>

                        {/* Tyre Brands */}
                        <div className="space-y-8 border-t-2 border-[#FB7E10]/20 pt-8">
                            <div className="space-y-4">
                                <h3 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tighter">
                                    Tyre Brands We <span className="text-[#FB7E10]">Supply</span>
                                </h3>
                                <p className="text-gray-600 font-medium text-lg">
                                    We stock tyres from the UK's most trusted manufacturers. Our range includes:
                                </p>
                            </div>

                            <div className="space-y-4">
                                {tyreCategories.map((category, idx) => (
                                    <div key={idx} className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                        <h4 className="text-lg font-black text-black mb-3 uppercase">{category.title}</h4>
                                        <p className="text-gray-600 font-medium">{category.brands}</p>
                                    </div>
                                ))}
                            </div>

                            <p className="text-gray-600 font-medium leading-relaxed text-base">
                                Not sure which tyre is right for your vehicle? Tell us your registration number and we'll recommend the most suitable options at different price points. We never push customers toward unnecessary upgrades — we give you the information and let you decide.
                            </p>
                        </div>

                        {/* Vehicles We Fit */}
                        <div className="space-y-8 border-t-2 border-[#FB7E10]/20 pt-8">
                            <div className="space-y-4">
                                <h3 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tighter">
                                    Vehicles We Fit <span className="text-[#FB7E10]">Tyres For</span>
                                </h3>
                            </div>

                            <ul className="space-y-4">
                                {vehicleTypes.map((vehicle, idx) => (
                                    <li key={idx} className="flex items-start gap-4 text-gray-600 font-medium">
                                        <div className="w-2 h-2 bg-[#FB7E10] rounded-full mt-3 shrink-0" />
                                        <span>{vehicle}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Wheel Balancing */}
                        <div className="space-y-8 border-t-2 border-[#FB7E10]/20 pt-8">
                            <div className="space-y-4">
                                <h3 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tighter">
                                    Wheel Balancing <span className="text-[#FB7E10]">— Why It Matters</span>
                                </h3>
                                <p className="text-gray-600 font-medium text-lg">
                                    Every tyre fitting service from Mobile Tyre Champions includes professional wheel balancing as standard. Here's why this matters:
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                                <div className="space-y-6 text-gray-600 font-medium leading-relaxed">
                                    <p>
                                        When a tyre is fitted to a wheel, tiny weight variations in the tyre and wheel assembly can cause vibrations, particularly noticeable at motorway speeds. These vibrations accelerate tyre wear, stress your suspension components, and reduce ride comfort.
                                    </p>
                                    <p>
                                        Properly balanced wheels extend the life of your tyres significantly and make for a smoother, safer drive. Our technicians use professional wheel balancing equipment on every job. This isn't an optional extra — it's part of every fitting.
                                    </p>
                                </div>
                                <div className="rounded-2xl overflow-hidden">
                                    <img 
                                        src="/images/precision%20wheel.webp" 
                                        alt="Professional wheel balancing equipment in use during mobile tyre fitting to ensure smooth and safe driving" 
                                        className="w-full h-auto object-cover rounded-2xl shadow-lg"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Sticky CTA Box */}
                    <div className="lg:col-span-1">
                        <div className="static lg:sticky lg:top-32 lg:right-auto w-full max-w-sm lg:max-w-none mx-auto lg:mx-0 bg-gradient-to-br from-slate-900 to-slate-800 p-10 rounded-3xl border border-white/10 shadow-2xl space-y-8 z-40">
                            <div>
                                <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mb-2">Quick Service</p>
                                <p className="text-white text-3xl font-black leading-none">
                                    30-45 Minutes <span className="text-[#FB7E10]">Fitting Time</span>
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-[#FB7E10]/20 rounded-full flex items-center justify-center border border-[#FB7E10]/40">
                                        <CheckCircle size={16} className="text-[#FB7E10]" />
                                    </div>
                                    <span className="text-white font-bold text-sm">Professional Fitting</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-[#FB7E10]/20 rounded-full flex items-center justify-center border border-[#FB7E10]/40">
                                        <CheckCircle size={16} className="text-[#FB7E10]" />
                                    </div>
                                    <span className="text-white font-bold text-sm">Wheel Balancing</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-[#FB7E10]/20 rounded-full flex items-center justify-center border border-[#FB7E10]/40">
                                        <CheckCircle size={16} className="text-[#FB7E10]" />
                                    </div>
                                    <span className="text-white font-bold text-sm">Tyre Disposal</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-[#FB7E10]/20 rounded-full flex items-center justify-center border border-[#FB7E10]/40">
                                        <CheckCircle size={16} className="text-[#FB7E10]" />
                                    </div>
                                    <span className="text-white font-bold text-sm">Quality Assurance</span>
                                </div>
                            </div>

                            <a
                                href="tel:02071013856"
                                className="w-full flex items-center justify-center gap-3 bg-[#FB7E10] text-white px-10 py-5 rounded-xl font-black uppercase tracking-[0.15em] hover:bg-orange-600 transition-all shadow-xl shadow-orange-900/40 hover:-translate-y-1 active:translate-y-0 text-center"
                            >
                                <Phone size={24} fill="white" className="stroke-none" />
                                Call Now
                            </a>

                            <div className="pt-6 border-t border-white/10">
                                <p className="text-slate-400 font-medium text-sm leading-relaxed">
                                    Book your mobile tyre fitting. Tell us your vehicle registration and preferred time, and we'll confirm availability and price immediately.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="py-16 md:py-24 px-4 sm:px-10 lg:px-20 bg-slate-50">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-16 text-center">
                        <h2 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tighter mb-4">
                            Frequently Asked <span className="text-[#FB7E10]">Questions</span>
                        </h2>
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-2 bg-[#FB7E10]" />
                        </div>
                        <p className="text-gray-600 font-medium text-lg max-w-2xl mx-auto">
                            Everything you need to know about our mobile tyre fitting service.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-all"
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full px-8 py-6 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
                                >
                                    <h3 className="text-lg font-black text-black uppercase tracking-tight pr-4">
                                        {faq.q}
                                    </h3>
                                    <ChevronDown
                                        size={24}
                                        className={`text-[#FB7E10] shrink-0 transition-transform ${
                                            openFaq === index ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>

                                {openFaq === index && (
                                    <div className="px-8 py-6 border-t border-slate-100 bg-slate-50">
                                        <p className="text-gray-600 font-medium leading-relaxed">
                                            {faq.a}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MobileTyreFitting;
