'use client';

import React from 'react';
import { Phone, CheckCircle, AlertTriangle, Zap, ShieldCheck, Clock, MapPin, Wrench, ChevronDown, PhoneCall, Truck, AlertOctagon } from 'lucide-react';
import { RESPONSE_PROMISE, SERVICE_AREAS_TEXT } from '@/lib/siteText';

const EmergencyTyreFitting = () => {
    const [openFaq, setOpenFaq] = React.useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const emergencySituations = [
        {
            title: "Tyre Blowouts",
            description: "High-speed blowouts leave tyres completely destroyed. We carry a wide range of replacement tyres and will have the right size for most vehicles."
        },
        {
            title: "Slow Punctures",
            description: "A tyre losing pressure gradually can be just as dangerous as a sudden blowout. We'll assess the damage and advise whether a repair or replacement is needed."
        },
        {
            title: "Sidewall Damage",
            description: "Hitting a kerb or pothole at the wrong angle can cause bulging or splitting in the tyre sidewall. Sidewall damage cannot be repaired — the tyre must be replaced, and driving on it is illegal and dangerous."
        },
        {
            title: "Run-Flat Tyre Failure",
            description: "Run-flat tyres are designed to continue functioning for a limited distance after a puncture, but they still need replacing. We carry run-flat tyres for common vehicle makes and models."
        },
        {
            title: "Locking Wheel Nut Issues",
            description: "Lost your locking wheel nut key? Our technicians carry specialist tools to remove locking wheel nuts safely without damaging your alloys."
        }
    ];

    const coverageAreas = [
        "Surrey",
        "Hampshire",
        "West London",
        "M25 Motorway",
        "M3 Motorway",
        "M4 Motorway",
        "A3 Highway",
        "A31 Highway"
    ];

    const faqs = [
        {
            q: "How quickly can you reach me?",
            a: RESPONSE_PROMISE
        },
        {
            q: "What should I do if I have a flat tyre on the motorway?",
            a: "Steer gently to the hard shoulder or the nearest safe stopping point. Switch on your hazard lights immediately. Do not attempt to change a tyre on a live motorway lane. Exit the vehicle via the passenger side, move behind the barrier, and call us immediately."
        },
        {
            q: "Is it safe to drive on a flat tyre?",
            a: "No. Even at low speed, you risk destroying the wheel rim, damaging the brake lines, and losing control of the vehicle. Call us — it's always safer than attempting to limp to the nearest garage."
        },
        {
            q: "Do I need to go anywhere for the repair?",
            a: "No. Whether you're at home, work, or stranded at the roadside, tell us your postcode or location and we'll come to your vehicle wherever it's parked."
        },
        {
            q: "Will you come to me on the motorway?",
            a: "Yes. Our technicians are equipped to work safely at motorway locations. Always stay behind the crash barrier while waiting."
        },
        {
            q: "What if you don't have my tyre size in stock?",
            a: "We carry a very wide range of common tyre sizes. In the rare event we don't have your exact tyre on the van, we'll source and deliver the correct tyre as quickly as possible and keep you updated throughout."
        },
        {
            q: "Do I need to pay upfront?",
            a: "We'll confirm the price before we dispatch. Payment is taken after the job is completed to your satisfaction."
        },
        {
            q: "Can you help if I've lost my locking wheel nut key?",
            a: "Yes. Our technicians carry specialist tools for this exact situation."
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* HERO SECTION */}
            <section className="relative h-[80vh] min-h-[600px] flex flex-col justify-center items-center overflow-hidden pt-20 md:pt-24 lg:pt-28">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/emergency tyre.webp"
                        alt="Mobile Tyre Champions technician performing emergency roadside tyre replacement at night for a stranded vehicle"
                        className="w-full h-full object-cover scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1528] via-[#0B1528]/80 to-[#0B1528]/40" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-10 lg:px-20 text-center animate-fadeIn">
                    <div className="inline-flex items-center gap-2 bg-[#FB7E10]/20 border border-[#FB7E10]/30 px-5 py-2 rounded-full mb-8 backdrop-blur-md">
                        <AlertOctagon size={16} className="text-[#FB7E10]" />
                        <span className="text-[#FB7E10] text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">24/7 Emergency Response</span>
                    </div>
                    
                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8 drop-shadow-2xl">
                        Emergency Tyre <br className="hidden md:block"/> <span className="text-[#FB7E10]">Fitting</span>
                    </h1>
                    
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10 max-w-4xl mx-auto">
                        <div className="flex items-center gap-2 text-slate-300 font-bold text-sm md:text-base">
                            <Clock size={20} className="text-[#FB7E10]" />
                            <span>60-Minute Response</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300 font-bold text-sm md:text-base">
                            <Zap size={20} className="text-[#FB7E10]" />
                            <span>24/7 Coverage</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300 font-bold text-sm md:text-base">
                            <ShieldCheck size={20} className="text-[#FB7E10]" />
                            <span>Fixed Pricing</span>
                        </div>
                    </div>

                    <p className="text-slate-300 max-w-2xl mx-auto font-medium text-base md:text-xl mb-10 leading-relaxed px-4">
                        {SERVICE_AREAS_TEXT}. {RESPONSE_PROMISE}
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
                                    We're <br className="hidden md:block"/> <span className="text-[#FB7E10]">On Our Way</span>
                                </h2>
                                <div className="w-20 h-2 bg-[#FB7E10]" />
                            </div>

                            <div className="prose prose-lg max-w-none text-gray-600 font-medium leading-relaxed space-y-6">
                                <p>
                                    Stuck with a flat tyre? Blown a tyre on the motorway? Call Mobile Tyre Champions. Typical arrival within 30–60 minutes depending on traffic and location, bringing everything needed to get you moving again.
                                </p>
                            </div>
                        </div>

                        {/* What To Do Section */}
                        <div className="space-y-8 border-t-2 border-[#FB7E10]/20 pt-8">
                            <div className="space-y-4">
                                <h3 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tighter">
                                    What to Do When <span className="text-[#FB7E10]">You Have a Flat Tyre</span>
                                </h3>
                                <p className="text-gray-600 font-medium text-lg">
                                    First, stay calm. A flat tyre, even at speed, is manageable when you know what to do:
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-12 h-12 bg-[#FB7E10] rounded-xl flex items-center justify-center shrink-0">
                                            <AlertTriangle size={24} className="text-white" />
                                        </div>
                                        <h4 className="text-xl font-black text-black uppercase tracking-tight">At the Roadside or Motorway</h4>
                                    </div>
                                    <p className="text-gray-600 font-medium leading-relaxed">
                                        If possible, steer gently to the hard shoulder or the nearest safe stopping point. Switch on your hazard lights immediately. Do not attempt to change a tyre on a live motorway lane. Exit the vehicle via the passenger side, move behind the barrier, and call us.
                                    </p>
                                </div>

                                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-12 h-12 bg-[#FB7E10] rounded-xl flex items-center justify-center shrink-0">
                                            <Wrench size={24} className="text-white" />
                                        </div>
                                        <h4 className="text-xl font-black text-black uppercase tracking-tight">At Home or Work</h4>
                                    </div>
                                    <p className="text-gray-600 font-medium leading-relaxed">
                                        You don't need to go anywhere. Tell us your postcode, and we'll come to your vehicle wherever it's parked.
                                    </p>
                                </div>
                            </div>

                            
                        </div>

                        {/* Emergency Response Promise */}
                        <div className="space-y-8 border-t-2 border-[#FB7E10]/20 pt-8">
                            <div className="space-y-4">
                                <h3 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tighter">
                                    Our Emergency Response <span className="text-[#FB7E10]">Promise</span>
                                </h3>
                                <p className="text-gray-600 font-medium text-lg">
                                    We know that when you're stuck at the roadside, time is everything. Here's what you can expect when you call Mobile Tyre Champions:
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex gap-6 items-start">
                                    <div className="w-12 h-12 bg-[#FB7E10]/10 rounded-xl flex items-center justify-center shrink-0 border border-[#FB7E10]/20">
                                        <Phone size={24} className="text-[#FB7E10]" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black text-black mb-2">Speak to a Real Person</h4>
                                        <p className="text-gray-600 font-medium leading-relaxed">
                                            When you call, you'll speak to a real person, not an automated system. We'll take your vehicle details and location, confirm what tyre you need, and give you a fixed price before we dispatch a technician. No surprises on arrival.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-6 items-start">
                                    <div className="w-12 h-12 bg-[#FB7E10]/10 rounded-xl flex items-center justify-center shrink-0 border border-[#FB7E10]/20">
                                        <Truck size={24} className="text-[#FB7E10]" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black text-black mb-2">Rapid Professional Service</h4>
                                        <p className="text-gray-600 font-medium leading-relaxed">
                                            Our technician will update you with an ETA and message you when they're close. They'll arrive with the right tyre for your vehicle already loaded, carry out the fitting and balancing professionally, and have you on your way as quickly as possible.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Emergency Situations */}
                        <div className="space-y-8 border-t-2 border-[#FB7E10]/20 pt-8">
                            <div className="space-y-4">
                                <h3 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tighter">
                                    Emergency Tyre <span className="text-[#FB7E10]">Situations We Handle</span>
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {emergencySituations.map((situation, idx) => (
                                    <div key={idx} className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-2xl border border-slate-200 hover:shadow-lg transition-all">
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="w-10 h-10 bg-[#FB7E10] rounded-lg flex items-center justify-center shrink-0 text-white font-black">
                                                {idx + 1}
                                            </div>
                                            <h4 className="text-lg font-black text-black uppercase tracking-tight">{situation.title}</h4>
                                        </div>
                                        <p className="text-gray-600 font-medium leading-relaxed text-sm">
                                            {situation.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Coverage Areas */}
                        <div className="space-y-8 border-t-2 border-[#FB7E10]/20 pt-8">
                            <div className="space-y-4">
                                <h3 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tighter">
                                    24/7 Emergency Coverage <span className="text-[#FB7E10]">{SERVICE_AREAS_TEXT}</span>
                                </h3>
                                <p className="text-gray-600 font-medium text-lg">
                                    Our emergency mobile tyre service operates across the United Kingdom, including all major motorways and A-roads. We cover:
                                </p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {coverageAreas.map((area, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-4 bg-orange-50 border border-orange-100 rounded-lg hover:shadow-md transition-all">
                                        <MapPin size={16} className="text-[#FB7E10] shrink-0" />
                                        <span className="font-bold text-gray-800 text-sm">{area}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-700">
                                <p className="text-white font-medium text-lg leading-relaxed">
                                    Not sure if we cover your area? <strong>Call us and we'll tell you immediately — 24 hours a day, 7 days a week.</strong>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Sticky CTA Box */}
                    <div className="lg:col-span-1">
                        <div className="static lg:sticky lg:top-32 lg:right-auto w-full max-w-sm lg:max-w-none mx-auto lg:mx-0 bg-gradient-to-br from-slate-900 to-slate-800 p-10 rounded-3xl border border-white/10 shadow-2xl space-y-8 z-40">
                            <div>
                                <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mb-2">Emergency Response</p>
                                <p className="text-white text-3xl font-black leading-none">
                                    60 Minutes <span className="text-[#FB7E10]">Response Time</span>
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-[#FB7E10]/20 rounded-full flex items-center justify-center border border-[#FB7E10]/40">
                                        <CheckCircle size={16} className="text-[#FB7E10]" />
                                    </div>
                                    <span className="text-white font-bold text-sm">Available 24/7/365</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-[#FB7E10]/20 rounded-full flex items-center justify-center border border-[#FB7E10]/40">
                                        <CheckCircle size={16} className="text-[#FB7E10]" />
                                    </div>
                                    <span className="text-white font-bold text-sm">Fixed Upfront Pricing</span>
                                </div>
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
                                    <span className="text-white font-bold text-sm">Wide UK Coverage</span>
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
                                    Speak to our team. We'll confirm your requirements, give you a fixed price, and dispatch a technician immediately.
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
                            Everything you need to know about our emergency tyre fitting service.
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

export default EmergencyTyreFitting;
