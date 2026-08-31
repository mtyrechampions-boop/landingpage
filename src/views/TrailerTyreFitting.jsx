import React from 'react';
import { Phone, CheckCircle, Clock, MapPin, Wrench, ShieldCheck, Truck, Route, PhoneCall, Gauge, Star, Users, Zap } from 'lucide-react';
import { RESPONSE_PROMISE, SERVICE_AREAS_TEXT } from '@/lib/siteText';

const TrailerTyreFitting = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* HERO SECTION */}
            <section className="relative h-[80vh] min-h-[600px] flex flex-col justify-center items-center overflow-hidden pt-20 md:pt-24 lg:pt-28">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/sr6nfj1ypli5n81lf20b.webp"
                        alt="Mobile tyre fitting specialist replacing a trailer tyre on-site with professional roadside tyre services"
                        className="w-full h-full object-cover scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1528] via-[#0B1528]/80 to-[#0B1528]/40" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-10 lg:px-20 text-center animate-fadeIn">
                    <div className="inline-flex items-center gap-2 bg-[#FB7E10]/20 border border-[#FB7E10]/30 px-5 py-2 rounded-full mb-8 backdrop-blur-md">
                        <Truck size={16} className="text-[#FB7E10]" />
                        <span className="text-[#FB7E10] text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">Trailer, RV & Campervan Support</span>
                    </div>
                    
                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8 drop-shadow-2xl">
                        Mobile Trailer <br className="hidden md:block"/> <span className="text-[#FB7E10]">Tyre Fitting</span>
                    </h1>
                    


                    <p className="text-slate-300 max-w-2xl mx-auto font-medium text-base md:text-xl mb-10 leading-relaxed px-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                        Don’t drive on dangerous tyres. Our specialist mobile units come to your trailer, RV, or campervan 24/7/365.
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
            <section className="py-12 md:py-16 px-4 sm:px-10 lg:px-20 bg-white">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
                    
                    {/* Left: Detailed Info */}
                    <div className="lg:w-2/3 space-y-16">
                        
                        <div className="space-y-10">
                            <div className="space-y-4">
                                <h2 className="text-3xl md:text-6xl font-black text-black leading-[1] tracking-tighter uppercase">
                                    THE TRAILER <br className="hidden md:block"/> <span className="text-[#FB7E10]">TYRE SPECIALISTS</span>
                                </h2>
                                <div className="w-20 h-2 bg-[#FB7E10]" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-600 font-medium leading-relaxed text-base md:text-lg">
                                <div className="space-y-4">
                                    <p>
                                        Trailers and RVs require specialized care due to higher load ratings and heavier structures. Traveling to a workshop with a damaged trailer tyre is often dangerous or impossible.
                                    </p>
                                    <ul className="space-y-3">
                                        {["24/7 Roadside Assistance", "Horsebox & Boat Trailers", "Expert RV & Motorhome Support", "Heavy-Duty Load Rated Tyres"].map((item, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-sm font-black text-black uppercase tracking-tight">
                                                <div className="w-1.5 h-1.5 bg-[#FB7E10] rounded-full" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="space-y-4">
                                    <p>
                                        {SERVICE_AREAS_TEXT}. {RESPONSE_PROMISE}
                                    </p>
                                    <div className="p-5 bg-slate-900 rounded-3xl text-white flex items-center gap-5 border border-white/10 shadow-xl">
                                        <div className="w-12 h-12 bg-[#FB7E10] rounded-2xl flex items-center justify-center shrink-0">
                                            <Users size={24} className="text-white" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-black leading-none">15,000+</p>
                                            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Trailers Serviced</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Why Use Our Service grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl group hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-6 group-hover:bg-[#FB7E10] group-hover:text-white transition-colors">
                                    <Clock size={24} className="text-[#FB7E10] group-hover:text-white" />
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-4">Rapid On-Site Response</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">
                                    Why wait around? We strive to be with you in record time, complete with the correct tyres and tools so you can minimise your time off the road and avoid expensive detours.
                                </p>
                            </div>
                            
                            <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl group hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-6 group-hover:bg-[#FB7E10] group-hover:text-white transition-colors">
                                    <ShieldCheck size={24} className="text-[#FB7E10] group-hover:text-white" />
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-4">Designed for Heavy Loads</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">
                                    We supply and fit high-durability tyres perfectly suited for heavy structural loads typical in trailers and motorhomes, ensuring absolute safety for the journey ahead.
                                </p>
                            </div>
                        </div>
                        
                        {/* Custom Image Section */}
                        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl h-[400px] border-8 border-white">
                            <img 
                                src="/images/mobile-tyre-champions-van1.webp" 
                                alt={`Mobile Tyre Champions service vans ready for 24/7 mobile tyre fitting and roadside tyre assistance ${SERVICE_AREAS_TEXT}`} 
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-black/80 to-transparent">
                                <p className="text-white font-black text-2xl uppercase tracking-tighter">Ready for Any Challenge</p>
                                <p className="text-gray-300 font-medium">Equipped for every trailer, caravan and RV emergency.</p>
                            </div>
                        </div>

                        {/* How It Works Process */}
                        <div className="space-y-10 pt-4">
                            <div className="text-center md:text-left space-y-2">
                                <h3 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight">Our 3-Step Process</h3>
                                <div className="w-12 h-1 bg-[#FB7E10] mx-auto md:mx-0" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { step: "01", title: "Immediate Call", desc: "Contact our 24/7 hotline with your location and tyre size." },
                                    { step: "02", title: "Rapid Dispatch", desc: "A specialist mobile unit is dispatched within minutes to your site." },
                                    { step: "03", title: "Expert Fitting", desc: "On-site tyre mounting, balancing, and safety inspection." }
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-white border-2 border-slate-50 p-6 rounded-[2rem] hover:border-[#FB7E10]/30 transition-all shadow-sm">
                                        <span className="text-4xl font-black text-[#FB7E10]/20 block mb-4">{item.step}</span>
                                        <h4 className="text-lg font-black uppercase text-black mb-2">{item.title}</h4>
                                        <p className="text-gray-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* What We Provide List */}
                        <div className="space-y-8 bg-[#0B1528] p-8 md:p-12 rounded-[3rem] relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 -translate-y-4 translate-x-4 opacity-[0.03] pointer-events-none">
                                <Wrench size={300} className="text-white" />
                            </div>
                            
                            <h2 className="text-3xl font-black text-white uppercase tracking-tight relative z-10">Technical Specifications</h2>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10 pt-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shrink-0">
                                        <Route size={24} className="text-[#FB7E10]" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">Technical Assessment</h4>
                                        <p className="text-slate-400 text-sm font-medium leading-relaxed">Thorough on-site sidewall & structural integrity inspection.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shrink-0">
                                        <Truck size={24} className="text-[#FB7E10]" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">Precision Mounting</h4>
                                        <p className="text-slate-400 text-sm font-medium leading-relaxed">Safe, non-marking mechanical fitting for heavy-duty alloys.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shrink-0">
                                        <Gauge size={24} className="text-[#FB7E10]" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">High-Load Balancing</h4>
                                        <p className="text-slate-400 text-sm font-medium leading-relaxed">Eliminating vibration for structural stability at speed.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shrink-0">
                                        <ShieldCheck size={24} className="text-[#FB7E10]" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">Compliance & Safety</h4>
                                        <p className="text-slate-400 text-sm font-medium leading-relaxed">Full pressure and torque safety checks for trailer loading.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right: "Services Include" Card Sidebar */}
                    <div className="lg:w-1/3 w-full sticky top-32">
                        <div className="bg-[#FB7E10] rounded-3xl p-8 md:p-10 text-white relative shadow-[0_20px_40px_rgba(251,126,16,0.3)] overflow-hidden">
                           <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>

                           <div className="relative z-10 space-y-8">
                                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight drop-shadow-md">Services Include:</h3>
                                
                                <div className="space-y-5 pt-2">
                                    {[
                                        "On-site fitting for trailers, RVs, and campervans",
                                        "Tyre inspection, mounting & balancing",
                                        "Safety checks built for heavy hauls",
                                        "Specialist equipment for high load ratings",
                                        "Fast, convenient mobile assistance",
                                        "Puncture repairs where safe"
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
                                    <h4 className="uppercase font-black text-[10px] tracking-[0.3em] text-white/70 mb-4 text-center">Standard Response Line</h4>
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

export default TrailerTyreFitting;
