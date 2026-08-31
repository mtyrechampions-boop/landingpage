'use client';

import React from 'react';
import { Phone, CheckCircle, Wrench, ShieldCheck, Clock, AlertTriangle, ChevronDown, Zap, AlertCircle, Gauge } from 'lucide-react';

const PunctureRepair = () => {
    const [openFaq, setOpenFaq] = React.useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const repairableConditions = [
        "A puncture in the central three-quarters of the tread area (the 'minor repair zone')",
        "Caused by a nail, screw, or similar object",
        "A hole no larger than 6 mm in diameter",
        "In a tyre that has not been driven on while flat"
    ];

    const notRepairableConditions = [
        "Punctures in the tyre shoulder or sidewall",
        "Punctures larger than 6mm in diameter",
        "Multiple punctures too close together",
        "Tyres that have been driven on while flat (internal structural damage)",
        "Tyres showing sidewall bulges, cracking, or significant tread wear",
        "Run-flat tyres (these cannot be repaired)"
    ];

    const faqs = [
        {
            q: "How much does puncture repair cost?",
            a: "Puncture repairs are significantly cheaper than full tyre replacements. We'll give you a fixed price quote over the phone before we dispatch. If a repair isn't possible and you need a replacement, we'll provide replacement pricing as well."
        },
        {
            q: "How long does a puncture repair take?",
            a: "The whole process typically takes under 45 minutes from arrival to completion. This includes wheel removal, inspection, repair, wheel balancing, and refitting."
        },
        {
            q: "Is a patched tyre safe to drive on?",
            a: "Yes. A vulcanized patch repair, applied to the inside of the tyre according to British Standard BS AU 159, is completely safe and legal. This is the only repair method we use."
        },
        {
            q: "Can you repair a slow puncture?",
            a: "Yes, if the cause is a small object in the tread, we can repair it. If the slow puncture is caused by a faulty valve stem or damage to the tyre bead, a replacement will be necessary."
        },
        {
            q: "What's the difference between a patch and a plug?",
            a: "A patch repair (applied internally) is the only method approved by British Standard BS AU 159 and is what we use. External plugs are temporary measures and not approved as permanent repairs in the UK."
        },
        {
            q: "What if I have a TPMS warning light after repair?",
            a: "Our technicians carry TPMS diagnostic tools and can reset your sensors immediately after repair. This saves you a trip to the dealer and ensures your system is properly calibrated."
        },
        {
            q: "Will you come to me for a puncture repair?",
            a: "Absolutely. We repair punctures at your home, work, or roadside. Describe the situation and location, and we'll send a technician with all the necessary equipment."
        },
        {
            q: "What if my puncture can't be repaired?",
            a: "We'll explain honestly why the repair isn't possible and provide tyre replacement options at different price points. We never push unnecessary replacements, but we'll ensure your vehicle is safe."
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* HERO SECTION */}
            <section className="relative h-[80vh] min-h-[600px] flex flex-col justify-center items-center overflow-hidden pt-20 md:pt-24 lg:pt-28">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/puncture.webp"
                        alt="Mobile tyre fitting specialist carrying out puncture repair service on a damaged vehicle tyre"
                        className="w-full h-full object-cover scale-105"
                    />
                    <div className="absolute inset-0 bg-[#0B1528]/80 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0B1528]/50 via-[#0B1528]/75 to-[#0B1528]" />
                </div>

                <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-10 lg:px-20 text-center animate-fadeIn">
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white uppercase tracking-tight mb-6">
                        Puncture Repair
                    </h1>

                    <p className="text-slate-200 max-w-3xl mx-auto font-medium text-base md:text-lg lg:text-xl mb-10 leading-relaxed px-4">
                        Most punctures are repairable — and fixing one costs far less than replacing
                        the tyre. We assess the damage on the spot and give you an honest answer
                        before touching anything.
                    </p>

                    <div className="flex flex-col items-center gap-5">
                        <a
                            href="tel:02071013856"
                            className="flex items-center justify-center gap-3 bg-[#FB7E10] text-white px-8 sm:px-12 py-4 sm:py-4.5 rounded-xl font-black text-base sm:text-lg uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                        >
                            <Phone size={20} fill="white" className="stroke-none" />
                            <span>Call Now: 0207 101 3856</span>
                        </a>

                        <div className="flex items-center gap-2 text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mt-2">
                            <span className="text-[#FB7E10]">✓</span>
                            <span>No Hidden Callout Fees</span>
                        </div>
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
                                    Fixed Where <span className="text-[#FB7E10]">You Are</span>
                                </h2>
                                <div className="w-20 h-2 bg-[#FB7E10]" />
                            </div>

                            <div className="space-y-6 text-gray-600 font-medium leading-relaxed">
                                <p className="text-lg">
                                    Not every puncture means you need a new tyre. If the puncture is in the central tread area and the damage is small enough, a professional repair is safe, legal, and significantly cheaper than a full replacement. Mobile Tyre Champions will assess your puncture honestly and carry out a repair where it's safe to do so or recommend a replacement only when genuinely necessary.
                                </p>
                            </div>
                        </div>

                        {/* Can My Puncture Be Repaired */}
                        <div className="space-y-8 border-t-2 border-[#FB7E10]/20 pt-8">
                            <div className="space-y-4">
                                <h3 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tighter">
                                    Can My Puncture Be <span className="text-[#FB7E10]">Repaired?</span>
                                </h3>
                                <p className="text-gray-600 font-medium text-lg">
                                    British Standard BS AU 159 sets out exactly when a tyre puncture can legally and safely be repaired. Here's a simplified guide:
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl border-2 border-orange-200">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-12 h-12 bg-[#FB7E10] rounded-xl flex items-center justify-center shrink-0">
                                            <CheckCircle size={24} className="text-white" />
                                        </div>
                                        <h4 className="text-xl font-black text-black uppercase tracking-tight">Repairable</h4>
                                    </div>
                                    <ul className="space-y-3">
                                        {repairableConditions.map((condition, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-orange-900 font-medium text-sm">
                                                <div className="w-1.5 h-1.5 bg-[#FB7E10] rounded-full mt-2 shrink-0" />
                                                <span>{condition}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl border-2 border-orange-200">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-12 h-12 bg-[#FB7E10] rounded-xl flex items-center justify-center shrink-0">
                                            <AlertTriangle size={24} className="text-white" />
                                        </div>
                                        <h4 className="text-xl font-black text-black uppercase tracking-tight">Not Repairable</h4>
                                    </div>
                                    <ul className="space-y-3">
                                        {notRepairableConditions.map((condition, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-orange-900 font-medium text-sm">
                                                <div className="w-1.5 h-1.5 bg-[#FB7E10] rounded-full mt-2 shrink-0" />
                                                <span>{condition}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            
                        </div>

                        {/* How It Works */}
                        <div className="space-y-8 border-t-2 border-[#FB7E10]/20 pt-8">
                            <div className="space-y-4">
                                <h3 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tighter">
                                    How Our Mobile Puncture <span className="text-[#FB7E10]">Repair Works</span>
                                </h3>
                            </div>

                            <div className="space-y-6">
                                <div className="flex gap-6 items-start">
                                    <div className="w-12 h-12 bg-[#FB7E10] rounded-xl flex items-center justify-center shrink-0 text-white font-black text-lg">
                                        1
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-black text-black mb-2 uppercase">Call & Quote</h4>
                                        <p className="text-gray-600 font-medium leading-relaxed">
                                            When you call us, describe the situation and your location. We'll confirm whether a repair or replacement is more likely based on your description, give you an estimated cost for both options, and send a technician to you.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-6 items-start">
                                    <div className="w-12 h-12 bg-[#FB7E10] rounded-xl flex items-center justify-center shrink-0 text-white font-black text-lg">
                                        2
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-black text-black mb-2 uppercase">Inspect & Repair</h4>
                                        <p className="text-gray-600 font-medium leading-relaxed">
                                            The technician removes the wheel, inspects the tyre internally and externally, and carries out the repair using a vulcanized patch, not a plug. A patch repair, carried out from the inside of the tyre, is the only repair method approved under BS AU 159.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-6 items-start">
                                    <div className="w-12 h-12 bg-[#FB7E10] rounded-xl flex items-center justify-center shrink-0 text-white font-black text-lg">
                                        3
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-black text-black mb-2 uppercase">Balance & Complete</h4>
                                        <p className="text-gray-600 font-medium leading-relaxed">
                                            After the repair, the tyre is refitted, the wheel is balanced, and your vehicle is returned to the correct tyre pressure. The whole process typically takes under 45 minutes.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Slow Puncture */}
                        <div className="space-y-8 border-t-2 border-[#FB7E10]/20 pt-8">
                            <div className="space-y-4">
                                <h3 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tighter">
                                    What About a <span className="text-[#FB7E10]">Slow Puncture?</span>
                                </h3>
                            </div>

                            <div className="space-y-6 text-gray-600 font-medium leading-relaxed">
                                <p>
                                    Slow punctures, where a tyre gradually loses pressure over hours or days, are often caused by a small nail or screw embedded in the tread, a faulty or damaged valve stem, or a damaged tyre bead (the seal between the tyre and the wheel rim).
                                </p>
                                <p>
                                    If your TPMS warning light is illuminated, or if you notice one tyre consistently lower than the others, call us before the situation becomes an emergency. Slow punctures always get worse, and driving on an underinflated tyre significantly increases fuel consumption, reduces handling safety, and causes premature tyre wear.
                                </p>
                            </div>

                            <div className="rounded-2xl overflow-hidden">
                                <img 
                                    src="/images/flat%20tyre%201.webp" 
                                    alt="Close-up of a flat tyre on a vehicle highlighting slow puncture damage requiring professional mobile tyre repair" 
                                    className="w-full h-auto object-cover rounded-2xl shadow-lg"
                                />
                            </div>
                        </div>

                        {/* TPMS Reset */}
                        <div className="space-y-8 border-t-2 border-[#FB7E10]/20 pt-8">
                            <div className="space-y-4">
                                <h3 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tighter">
                                    TPMS Reset After <span className="text-[#FB7E10]">Repair</span>
                                </h3>
                                <p className="text-gray-600 font-medium text-lg">
                                    Modern vehicles manufactured after 2012 are equipped with a Tyre Pressure Monitoring System (TPMS). After any tyre work, this system may display a warning light.
                                </p>
                            </div>

                            <div className="flex gap-6 items-start">
                                <div className="w-12 h-12 bg-[#FB7E10] rounded-xl flex items-center justify-center shrink-0">
                                    <Gauge size={24} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-gray-600 font-medium leading-relaxed">
                                        Our technicians carry TPMS diagnostic tools and can reset or re-learn your sensors after fitting or repair, saving you a trip to the dealer. Your vehicle will be fully functional and compliant immediately.
                                    </p>
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
                                    Under 45 Minutes <span className="text-[#FB7E10]">Repair</span>
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-[#FB7E10]/20 rounded-full flex items-center justify-center border border-[#FB7E10]/40">
                                        <CheckCircle size={16} className="text-[#FB7E10]" />
                                    </div>
                                    <span className="text-white font-bold text-sm">BS AU 159 Approved</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-[#FB7E10]/20 rounded-full flex items-center justify-center border border-[#FB7E10]/40">
                                        <CheckCircle size={16} className="text-[#FB7E10]" />
                                    </div>
                                    <span className="text-white font-bold text-sm">Vulcanized Patch Repair</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-[#FB7E10]/20 rounded-full flex items-center justify-center border border-[#FB7E10]/40">
                                        <CheckCircle size={16} className="text-[#FB7E10]" />
                                    </div>
                                    <span className="text-white font-bold text-sm">TPMS Reset Included</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-[#FB7E10]/20 rounded-full flex items-center justify-center border border-[#FB7E10]/40">
                                        <CheckCircle size={16} className="text-[#FB7E10]" />
                                    </div>
                                    <span className="text-white font-bold text-sm">Honest Assessment</span>
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
                                    Describe your puncture situation and we'll give you an instant quote and ETA before dispatch.
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
                            Everything you need to know about our puncture repair service.
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

export default PunctureRepair;
