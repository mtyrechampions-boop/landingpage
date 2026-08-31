'use client';

import React from 'react';
import { Phone, CheckCircle, AlertTriangle, PenTool, PhoneCall, HelpCircle, Wrench, ChevronDown, ShieldCheck, Zap } from 'lucide-react';
import { RESPONSE_PROMISE } from '@/lib/siteText';

const LockingWheelNutRemoval = () => {
    const [openFaq, setOpenFaq] = React.useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const faqs = [
        {
            q: "How quickly can you reach me?",
            a: RESPONSE_PROMISE
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
                        src="/images/locking.webp"
                        alt="Mobile Tyre Champions specialist using professional tools to safely remove a locking wheel nut without alloy damage"
                        className="w-full h-full object-cover scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1528] via-[#0B1528]/80 to-[#0B1528]/40" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-10 lg:px-20 text-center animate-fadeIn">
                    <div className="inline-flex items-center gap-2 bg-[#FB7E10]/20 border border-[#FB7E10]/30 px-5 py-2 rounded-full mb-8 backdrop-blur-md">
                        <Wrench size={16} className="text-[#FB7E10]" />
                        <span className="text-[#FB7E10] text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">Specialist Mobile Service</span>
                    </div>
                    
                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8 drop-shadow-2xl">
                        Locking Wheel <br className="hidden md:block"/> <span className="text-[#FB7E10]">Nut Removal</span>
                    </h1>
                    
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10 max-w-4xl mx-auto">
                        <div className="flex items-center gap-2 text-slate-300 font-bold text-sm md:text-base">
                            <ShieldCheck size={20} className="text-[#FB7E10]" />
                            <span>100% Damage-Free</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300 font-bold text-sm md:text-base">
                            <Zap size={20} className="text-[#FB7E10]" />
                            <span>Instant Dispatch</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300 font-bold text-sm md:text-base">
                            <CheckCircle size={20} className="text-[#FB7E10]" />
                            <span>Expert Techs</span>
                        </div>
                    </div>

                    <p className="text-slate-300 max-w-2xl mx-auto font-medium text-base md:text-xl mb-10 leading-relaxed px-4">
                        Lost your locking wheel nut key? Seized or damaged nuts? We provide emergency, specialist removal at your home or work.
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
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
                    
                    {/* Left: Detailed Info */}
                    <div className="lg:w-2/3 space-y-16">
                        
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-3xl md:text-6xl font-black text-black leading-[1] tracking-tighter uppercase">
                                    THE SPECIALIST <br className="hidden md:block"/> <span className="text-[#FB7E10]">REMOVAL SOLUTION</span>
                                </h2>
                                <div className="w-20 h-2 bg-[#FB7E10]" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-600 font-medium leading-relaxed text-base md:text-lg">
                                <div className="space-y-4">
                                    <p>
                                        Modern vehicles are commonly fitted with locking wheel nuts to prevent theft. However, they become a real headache when the key is lost, damaged, or the nuts themselves seize due to over-tightening. 
                                    </p>
                                    <ul className="space-y-3">
                                        {["Lost or misplaced key", "Damaged or worn key head", "Overtightened with air-guns", "Seized due to corrosion"].map((item, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-sm font-black text-black uppercase tracking-tight">
                                                <div className="w-1.5 h-1.5 bg-[#FB7E10] rounded-full" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="space-y-4">
                                    <p>
                                        Attempting DIY removal with improper tools often leads to cracked wheel studs and severe alloy damage. Our specialists ensure a non-invasive extraction.
                                    </p>
                                    <div className="p-4 bg-orange-50 border-l-4 border-[#FB7E10] italic text-sm font-bold text-orange-900">
                                        "99% of our removals are completed in under 15 minutes per wheel with zero alloy damage."
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Grid Features */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl group hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-6 group-hover:bg-[#FB7E10] group-hover:text-white transition-colors">
                                    <AlertTriangle size={24} className="text-[#FB7E10] group-hover:text-white" />
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-4">Why Avoid DIY?</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">
                                    Locking wheel nuts are designed to resist drilling, chiselling, and hammered removals. DIY attempts usually result in ruined alloys, cracked studs, and much higher repair bills. 
                                </p>
                            </div>
                            
                            <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl group hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-6 group-hover:bg-[#FB7E10] group-hover:text-white transition-colors">
                                    <PenTool size={24} className="text-[#FB7E10] group-hover:text-white" />
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-4">Our Specialist Tools</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">
                                    We use professional Chrome Molybdenum Laser Locking Wheel Nut Removers that grip the outside of the nut dynamically, bypassing the need for the original key completely damage-free.
                                </p>
                            </div>
                        </div>

                        {/* FAQs */}
                        <div className="space-y-8">
                            <div className="space-y-2">
                                <h2 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tight flex items-center gap-4">
                                    <HelpCircle size={32} className="text-[#FB7E10]" />
                                    Common Questions
                                </h2>
                                <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em] pl-1">Everything you need to know about locking nut removal</p>
                            </div>
                            
                            <div className="space-y-3">
                                {faqs.map((faq, idx) => (
                                    <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden transition-all duration-300">
                                        <button 
                                            onClick={() => toggleFaq(idx)}
                                            className="w-full flex items-center justify-between p-6 text-left group"
                                        >
                                            <span className="text-sm md:text-base font-black uppercase tracking-tight text-slate-900 group-hover:text-[#FB7E10] transition-colors">{faq.q}</span>
                                            <ChevronDown size={20} className={`text-slate-400 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-[#FB7E10]' : ''}`} />
                                        </button>
                                        <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <p className="text-slate-600 font-medium leading-relaxed text-sm">
                                                {faq.a}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Right: "Services Include" Card Sidebar */}
                    <div className="lg:w-1/3 w-full sticky top-32">
                        <div className="bg-[#FB7E10] rounded-3xl p-8 md:p-10 text-white relative shadow-[0_20px_40px_rgba(251,126,16,0.3)] overflow-hidden">
                           <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>

                           <div className="relative z-10 space-y-8">
                                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight drop-shadow-md">What's Included:</h3>
                                
                                <div className="space-y-5 pt-2">
                                    {[
                                        "Safe removal up to 4 locking nuts",
                                        "Non-damaging precision tools used",
                                        "Available at Home, Work or Roadside",
                                        "Can combine with tyre fitting",
                                        "Complete hub & wheel inspection",
                                        "Advice on replacement nuts"
                                    ].map((feature, i) => (
                                        <div key={i} className="flex items-start gap-4 group/item">
                                            <div className="w-6 h-6 mt-0.5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                                <CheckCircle size={14} className="text-white" />
                                            </div>
                                            <span className="font-bold text-white/90 leading-tight">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-8 border-t border-white/20">
                                    <h4 className="uppercase font-black text-[10px] tracking-[0.3em] text-white/70 mb-4 text-center">Standardized Response Line</h4>
                                    <a href="tel:02071013856" className="w-full flex items-center justify-center gap-3 bg-white text-[#FB7E10] py-5 rounded-xl font-black uppercase tracking-widest text-sm md:text-base hover:bg-slate-900 hover:text-white transition-all shadow-xl active:scale-95">
                                        <Phone size={20} />
                                        Call Now
                                    </a>
                                </div>
                           </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LockingWheelNutRemoval;
