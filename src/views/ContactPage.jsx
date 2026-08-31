"use client";

import React, { useState, useEffect } from 'react';
import { SERVICE_AREAS_TEXT } from '@/lib/siteText';
import { useSearchParams, useRouter } from 'next/navigation';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Zap, Shield, Award } from 'lucide-react';

const ContactPage = () => {
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        postcode: '',
        serviceRequired: '',
        message: '',
    });

    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const location = searchParams.get('location');
        if (location) {
            setFormData(prev => ({
                ...prev,
                message: `I need mobile tyre assistance in ${location}.`,
                serviceRequired: 'Immediate Emergency Fitting'
            }));
            // Remove query parameter to keep a single canonical URL
            router.replace('/contact');
        }
    }, [searchParams]);

    const serviceOptions = [
        { value: '', label: 'Select Service Type' },
        { value: 'Immediate Emergency Fitting', label: 'Immediate Emergency Fitting' },
        { value: 'Premium Tyre Service', label: 'Premium Tyre Service' },
        { value: 'Puncture Repair', label: 'Puncture Repair' },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatusMessage('');

        try {
            const response = await fetch('https://enduring-morning-cf86e59201.strapiapp.com/api/contact-requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: {
                        fullName: formData.fullName,
                        phoneNumber: formData.phoneNumber,
                        postcode: formData.postcode,
                        serviceRequired: formData.serviceRequired,
                        message: formData.message,
                    },
                }),
            });

            if (!response.ok) {
                const errorText = await response.text().catch(() => null);
                let errorMessage = 'Unable to submit request.';
                try {
                    const errorData = errorText ? JSON.parse(errorText) : null;
                    errorMessage = errorData?.error || errorData?.message || errorMessage;
                } catch {
                    errorMessage = errorText || errorMessage;
                }
                throw new Error(errorMessage);
            }


            setSubmitted(true);
            setFormData({
                fullName: '',
                phoneNumber: '',
                postcode: '',
                serviceRequired: '',
                message: '',
            });
            setStatusMessage('Your request has been sent. We will contact you shortly.');
            setTimeout(() => setSubmitted(false), 5000);
        } catch (error) {
            setStatusMessage(error.message || 'Failed to send request. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (field) => (event) => {
        setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    };

    return (
        <div className="font-['Outfit'] bg-slate-50 min-h-screen text-slate-900 overflow-x-hidden">

            {/* ── HERO SECTION ── */}
            <section className="relative pt-8 pb-6 md:pt-12 md:pb-10 px-4 border-b border-gray-200 overflow-hidden bg-white">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=2070&auto=format&fit=crop"
                        alt="Professional customer support and mobile tyre fitting dispatch centre available 24/7 for emergency tyre assistance"
                        className="w-full h-full object-cover opacity-10 grayscale scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-slate-50"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center space-y-8">
                    <div className="inline-flex items-center gap-2.5 bg-orange-50 border border-orange-100 px-4 py-2 rounded-xl shadow-sm">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                        </span>
                        <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-green-700">Live: 50+ Technicians Online {SERVICE_AREAS_TEXT}</span>
                    </div>
                    <h1 className="text-5xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] text-black">
                        GET IN <br /> <span className="text-[#FB7E10]">TOUCH</span>
                    </h1>
                    <p className="text-gray-500 text-lg md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
                        Rapid response mobile tyre solutions at your fingertips. Our dispatch team is available 24/7 to assist you.
                    </p>
                </div>
            </section>

            {/* ── CONTACT GRID ── */}
            <section className="pt-4 md:pt-6 pb-10 px-4 md:px-10 lg:px-20 relative z-20">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                    {/* Left: Contact Info (4 cols) */}
                    <div className="lg:col-span-4 space-y-12">
                        <div className="space-y-4 flex flex-col items-center lg:items-start text-center lg:text-left">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-[2px] bg-[#FB7E10]"></div>
                                <span className="text-[#FB7E10] font-black uppercase text-xs tracking-widest">Connect With Us</span>
                                <div className="w-10 h-[2px] bg-[#FB7E10] lg:hidden"></div>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase leading-none text-black">Speak to our <br className="hidden sm:block" /> Expert Team.</h2>
                        </div>

                        <div className="space-y-6">
                            <a href="tel:02071013856" className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-6 md:p-8 bg-white border border-gray-100 rounded-3xl hover:shadow-2xl hover:border-[#FB7E10]/30 transition-all duration-500 shadow-xl overflow-hidden">
                                <div className="shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-orange-50 rounded-xl sm:rounded-2xl flex items-center justify-center text-[#FB7E10] border border-orange-100 group-hover:bg-[#FB7E10] group-hover:text-white group-active:bg-[#FB7E10] group-active:text-white transition-all duration-500">
                                    <Phone size={24} className="sm:w-8 sm:h-8" />
                                </div>
                                <div className="space-y-1 sm:space-y-0.5 min-w-0 w-full">
                                    <span className="block text-gray-400 text-[10px] font-black uppercase tracking-widest leading-none">Emergency Phone</span>
                                    <span className="block text-lg sm:text-2xl font-black text-black leading-tight break-words group-hover:text-[#FB7E10] group-active:text-[#FB7E10] active:text-[#FB7E10] transition-colors">0207 101 3856</span>
                                </div>
                            </a>

                            <div className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-6 md:p-8 bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden">
                                <div className="shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-blue-50 rounded-xl sm:rounded-2xl flex items-center justify-center text-blue-600 border border-blue-100">
                                    <MapPin size={24} className="sm:w-8 sm:h-8" />
                                </div>
                                <div className="space-y-1 sm:space-y-0.5 min-w-0 w-full">
                                    <span className="block text-gray-400 text-[10px] font-black uppercase tracking-widest leading-none">Global HQ</span>
                                    <span className="block text-base sm:text-xl font-black text-black leading-tight break-words">Grosvenor Road, Aldershot, Postcode: GU11 3HY</span>
                                </div>
                            </div>

                            <div className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-6 md:p-8 bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden">
                                <div className="shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-green-50 rounded-xl sm:rounded-2xl flex items-center justify-center text-green-600 border border-green-100">
                                    <Clock size={24} className="sm:w-8 sm:h-8" />
                                </div>
                                <div className="space-y-1 sm:space-y-0.5 min-w-0 w-full">
                                    <span className="block text-gray-400 text-[10px] font-black uppercase tracking-widest leading-none">Service Window</span>
                                    <span className="block text-lg sm:text-2xl font-black text-black leading-tight uppercase break-words">Always 24/7/365</span>
                                </div>
                            </div>

                            <a href="mailto:info@mobiletyrechampions.com" className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-6 md:p-8 bg-white border border-gray-100 rounded-3xl hover:shadow-2xl hover:border-[#FB7E10]/30 transition-all duration-500 shadow-xl overflow-hidden">
                                <div className="shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-blue-50 rounded-xl sm:rounded-2xl flex items-center justify-center text-blue-600 border border-blue-100 group-hover:bg-[#FB7E10] group-hover:text-white group-active:bg-[#FB7E10] group-active:text-white transition-all duration-500">
                                    <Mail size={24} className="sm:w-8 sm:h-8" />
                                </div>
                                <div className="space-y-1 sm:space-y-0.5 min-w-0 w-full">
                                    <span className="block text-gray-400 text-[10px] font-black uppercase tracking-widest leading-none">Support Email</span>
                                    <span className="block text-base sm:text-xl lg:text-base xl:text-lg font-black text-black leading-tight lowercase break-all group-hover:text-[#FB7E10] group-active:text-[#FB7E10] active:text-[#FB7E10] transition-colors">info@mobiletyrechampions.com</span>
                                </div>
                            </a>
                        </div>

                        <div className="bg-[#0B1528] rounded-[3rem] p-10 text-white space-y-8 relative overflow-hidden group shadow-2xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FB7E10]/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                            <div className="space-y-2">
                                <h4 className="text-2xl font-black uppercase tracking-tight">Rapid Response Matrix</h4>
                                <p className="text-gray-400 font-medium text-sm leading-relaxed">Our centralized dispatch system tracks every unit in real-time to provide a typical arrival within 30–60 minutes depending on traffic and location.</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
                                    <span className="block text-[#FB7E10] text-3xl font-black">30m</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Avg. Arrival</span>
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
                                    <span className="block text-[#FB7E10] text-3xl font-black">50+</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Live Units</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-[3rem] p-8 md:p-16 h-full border border-gray-100 shadow-2xl relative overflow-hidden">
                            {submitted && (
                                <div className="absolute inset-0 bg-white z-50 flex flex-col items-center justify-center p-10 text-center space-y-6 animate-in fade-in zoom-in duration-500">
                                    <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white scale-110 shadow-lg animate-bounce">
                                        <CheckCircle size={56} />
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-3xl font-black text-black uppercase">Deployment Scheduled!</h2>
                                        <p className="text-gray-500 font-medium">Our dispatch center has received your request. A technician will contact you in less than 5 minutes.</p>
                                    </div>
                                    <button onClick={() => setSubmitted(false)} className="text-[#FB7E10] font-black uppercase text-xs tracking-widest border-b-2 border-[#FB7E10] pb-1 hover:text-black hover:border-black transition-colors">
                                        Submit Another Request
                                    </button>
                                </div>
                            )}

                            <div className="space-y-12">
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-gray-100">
                                    <div className="space-y-3 flex flex-col items-center lg:items-start text-center lg:text-left w-full">
                                        <h3 className="text-black font-black text-3xl sm:text-7xl uppercase tracking-tighter leading-[0.8]">
                                            INITIATE <br /> <span className="text-[#FB7E10]">CONTACT</span>
                                        </h3>
                                        <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs pl-1">Technical Response Unit • 24H Readiness</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2.5">
                                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] pl-1" htmlFor="fullName">Full Name</label>
                                        <input
                                            id="fullName"
                                            required
                                            type="text"
                                            value={formData.fullName}
                                            onChange={handleChange('fullName')}
                                            placeholder="e.g. Lewis Hamilton"
                                            className="w-full bg-slate-50 border-2 border-transparent focus:border-[#FB7E10] focus:bg-white rounded-2xl px-6 py-5 font-bold text-black outline-none transition-all placeholder:text-gray-300 shadow-inner"
                                        />
                                    </div>
                                    <div className="space-y-2.5">
                                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] pl-1" htmlFor="phoneNumber">Direct Mobile</label>
                                        <input
                                            id="phoneNumber"
                                            required
                                            type="tel"
                                            value={formData.phoneNumber}
                                            onChange={handleChange('phoneNumber')}
                                            placeholder="+44 (0) 7..."
                                            className="w-full bg-slate-50 border-2 border-transparent focus:border-[#FB7E10] focus:bg-white rounded-2xl px-6 py-5 font-bold text-black outline-none transition-all placeholder:text-gray-300 shadow-inner"
                                        />
                                    </div>
                                    <div className="space-y-2.5 md:col-span-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] pl-1" htmlFor="postcode">Current Sector / Postcode</label>
                                        <input
                                            id="postcode"
                                            required
                                            type="text"
                                            value={formData.postcode}
                                            onChange={handleChange('postcode')}
                                            placeholder="e.g. GU11 3HY"
                                            className="w-full bg-slate-50 border-2 border-transparent focus:border-[#FB7E10] focus:bg-white rounded-2xl px-6 py-5 font-bold text-black outline-none transition-all placeholder:text-gray-300 shadow-inner"
                                        />
                                    </div>
                                    <div className="space-y-2.5 md:col-span-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] pl-1" htmlFor="serviceRequired">Service Required</label>
                                        <div className="relative">
                                            <select
                                                id="serviceRequired"
                                                required
                                                value={formData.serviceRequired}
                                                onChange={handleChange('serviceRequired')}
                                                className="w-full bg-slate-50 border-2 border-transparent focus:border-[#FB7E10] focus:bg-white rounded-2xl px-6 py-5 font-bold text-black outline-none transition-all appearance-none cursor-pointer shadow-inner"
                                            >
                                                {serviceOptions.map((option) => (
                                                    <option key={option.value} value={option.value} disabled={option.value === ''}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-20">▼</div>
                                        </div>
                                    </div>
                                    <div className="space-y-2.5 md:col-span-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] pl-1" htmlFor="message">Mission Details / Tyre Size</label>
                                        <textarea
                                            id="message"
                                            required
                                            rows="4"
                                            value={formData.message}
                                            onChange={handleChange('message')}
                                            placeholder="How can we assist you today?"
                                            className="w-full bg-slate-50 border-2 border-transparent focus:border-[#FB7E10] focus:bg-white rounded-2xl px-6 py-5 font-bold text-black outline-none transition-all placeholder:text-gray-300 resize-none shadow-inner"
                                        />
                                    </div>
                                    {statusMessage && (
                                        <div className="md:col-span-2 rounded-3xl border border-[#FB7E10]/30 bg-[#FB7E10]/5 px-6 py-5 text-sm font-bold text-[#0B1528]">
                                            {statusMessage}
                                        </div>
                                    )}
                                    <div className="md:col-span-2 pt-4">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="group w-full bg-gradient-to-r from-[#FB7E10] via-[#ff9743] to-[#FB7E10] bg-[length:200%_auto] hover:bg-right text-white py-5 md:py-6 rounded-2xl font-black uppercase tracking-[0.25em] text-base md:text-lg transition-all duration-500 shadow-[0_20px_40px_-10px_rgba(251,126,16,0.5)] hover:shadow-[0_25px_50px_-15px_rgba(251,126,16,0.8)] hover:-translate-y-1 flex items-center justify-center active:scale-[0.98] relative overflow-hidden border border-white/20 ring-4 ring-[#FB7E10]/10"
                                        >
                                            {/* Spotlight effect */}
                                            <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-[35deg] blur-md"></div>
                                            <span className="relative z-10 drop-shadow-md">{isSubmitting ? 'Submitting...' : 'Book Service Now'}</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
