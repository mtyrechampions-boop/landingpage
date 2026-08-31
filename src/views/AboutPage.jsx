'use client';

import Link from 'next/link';
import { Phone, ArrowRight, Shield, Clock, Users, Wrench, MapPin, CheckCircle, Zap, Award, HeartHandshake } from 'lucide-react';
import { RESPONSE_PROMISE, SERVICE_AREAS_TEXT } from '@/lib/siteText';

/* ─── Data ──────────────────────────────────────────────────────────────── */


const values = [
  {
    icon: <Zap className="w-6 h-6 text-[#FB7E10]" />,
    title: 'Speed Without Compromise',
    desc: "Our dispatchers match you to the nearest certified technician so your GPS guides us to you in seconds — average arrival in under 60 minutes.",
  },
  {
    icon: <Shield className="w-6 h-6 text-[#FB7E10]" />,
    title: 'Workshop-Grade Equipment',
    desc: 'Every van runs the same tools, machines, and stock as a full workshop. No cutting corners, no compromise — just convenience.',
  },
  {
    icon: <Award className="w-6 h-6 text-[#FB7E10]" />,
    title: 'IMI-Certified Technicians',
    desc: '  Every technician holds a minimum of 5 years full certification, including cars and vans and far more vehicle types.',
  },
  {
    icon: <HeartHandshake className="w-6 h-6 text-[#FB7E10]" />,
    title: 'Transparent Pricing',
    desc: 'No hidden fees, no nasty surprises. You get upfront quotes covering tyres, fitting, and all services before we start.',
  },
  {
    icon: <Clock className="w-6 h-6 text-[#FB7E10]" />,
    title: '24/7 — Rain or Shine',
    desc: 'Available 24 hours a day, 7 days a week — including bank holidays, late nights, and early mornings. If you need us, we’re there. No exceptions.',
  },
  {
    icon: <MapPin className="w-6 h-6 text-[#FB7E10]" />,
    title: 'We Come to You',
    desc: 'At home, at work, or stranded roadside — we bring the van safely to your location. No garage visits, no waiting rooms.',
  },
];

const services = [
  'Mobile Tyre Fitting (Emergency & Scheduled)',
  'Puncture Repair',
  'Tyre Sales',
  'Precision Wheel Balancing',
  'Mobile Car Battery Replacement',
  'Tyre Inspection & Rotation',
  'Emergency Tyre Fitting',
  'Tyre Recycling',
  'Alloy Wheel Welding',
  'Locking Wheel Nut Removal',
];



/* ─── Animated counter hook ─────────────────────────────────────────────── */

/* ─── Component ─────────────────────────────────────────────────────────── */

const AboutPage = () => {
  return (
    <div className="font-['Outfit'] bg-slate-50 min-h-screen overflow-x-hidden">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[560px] md:min-h-[680px] flex items-center bg-gray-900 overflow-hidden">
        {/* bg image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/fitting-step.webp"
            alt="Mobile tyre fitting technician securing a vehicle wheel during roadside tyre replacement and repair service"
            className="w-full h-full object-cover opacity-40 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
        </div>

        {/* decorative ring */}

        <div className="container mx-auto px-4 md:px-10 lg:px-20 relative z-10 py-16 md:py-24">
          <div className="max-w-3xl space-y-6">
            {/* badge */}
            <div className="inline-flex items-center gap-2 bg-[#33251a] border border-[#fb7e10]/30 px-4 py-1.5 rounded-full">
              <span className="text-orange-500">⚡</span>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-orange-400">
                UK's Most Trusted Mobile Tyre Service
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight tracking-tight">
              About{' '}
              <span className="text-[#FB7E10]">Mobile<br className="hidden md:block" /> Tyre Champions</span>
            </h1>

            <p className="text-gray-300 text-base md:text-xl leading-relaxed max-w-2xl">
              We exist to make tyre care hassle-free. Whether you're stuck at the roadside or planning a service day, our team delivers premium mobile tyre fitting directly to you — with expert technicians, fully equipped vans, and zero waiting rooms.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a href="tel:02071013856" className="flex items-center justify-center gap-3 bg-[#FB7E10] text-white px-8 py-4 rounded-xl font-black text-base hover:bg-orange-600 transition-all shadow-xl active:scale-95">
                <Phone size={18} fill="white" />
                Call Now: 0207 101 3856
              </a>
              <a
                href="#why-us"
                className="flex items-center justify-center gap-3 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-white/20 transition-all"
              >
                Why Choose Us
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── ENVIRONMENT COMMITMENT ─────────────────────────────────────── */}
      <section className="bg-white py-6 md:py-10 px-4 sm:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-2/3">
              <div className="flex items-start gap-6">
                <div className="mt-1">
                  <div className="w-1.5 h-12 bg-[#FB7E10] rounded-full" />
                </div>

                <div>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight text-black">Our Commitment to the Environment</h2>
                  <div className="w-20 h-1.5 bg-[#FB7E10] mt-4 rounded-full" />
                  <div className="text-gray-600 mt-4 space-y-4">
                    <p>
                      Old tyres are a significant environmental challenge. We never leave old tyres at the roadside or dispose of them irresponsibly. Every tyre we remove is taken away for proper recycling through our registered waste disposal partners. Used tyres are processed into rubber crumb for use in playgrounds, sports surfaces, and road construction.
                    </p>
                    <p>
                      We're also actively transitioning our van fleet toward lower-emission vehicles because we believe a mobile service should minimise its footprint as well as your inconvenience.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/3">
              <div className="rounded-2xl overflow-hidden bg-[#F1F3F6] p-4 shadow-md">
                <img src="/images/mobile tyre champions contribution to environment.webp" alt="Mobile Tyre Champions environmentally responsible tyre recycling and waste disposal process for sustainable tyre management" className="w-full h-48 object-cover rounded-lg" />
                <div className="mt-4 text-sm text-gray-600">We partner with registered waste disposal partners to recycle tyres into rubber crumb used in playgrounds, sports surfaces and road construction.</div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ── OUR STORY ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-6 md:py-8 px-4 sm:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <div className="w-full md:w-1/2 relative">
            <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img
                src="/images/high spppppppppppp (42) (1).webp"
                alt="Mobile Tyre Champions team and service van showcasing the company story of professional mobile tyre fitting and roadside assistance"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                onError={(e) => { e.target.src = '/images/fitting-step.webp'; }}
              />
            </div>
            {/* floating badge */}

          </div>

          {/* Text side */}
          <div className="w-full md:w-1/2 space-y-6">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-black">
                We Bring the<br />
                <span className="text-[#FB7E10]">Workshop to You.</span>
              </h2>
              <div className="w-16 h-1.5 bg-[#FB7E10] mt-4" />
            </div>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Mobile Tyre Champions was founded by people who understood that the traditional garage model isn't built for how modern life actually works. You discover a flat tyre at 7am, just before the school run. You notice your tyres are wearing thin on a Sunday evening. You blow a tyre on a dual carriageway at midnight. None of these moments are convenient. None of them fit neatly into a 9-to-5 booking slot.
            </p>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              We set out to build a mobile tyre service that genuinely works for drivers – one that's fast, honest, professionally equipped, and available when people actually need it.
            </p>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              While our central headquarters and main depot are based in <strong>Aldershot, Hampshire</strong>, we operate a fully mobile, strategically stationed fleet of technicians. This allows us to provide rapid coverage and 24/7 mobile tyre fitting across {SERVICE_AREAS_TEXT} and surrounding regions. {RESPONSE_PROMISE}
            </p>

            {/* service bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {services.slice(0, 6).map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-[#FB7E10] shrink-0" />
                  <span className="text-gray-700 font-medium text-sm">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ── WHAT WE STAND FOR (CARDS) ─────────────────────────────────────── */}
      <section className="bg-white py-6 md:py-10 px-4 sm:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-left">
            <div className="flex items-start gap-6">
              <div className="mt-1">
                <div className="w-1.5 h-12 bg-[#FB7E10] rounded-full" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-black">What We Stand For</h2>
                <div className="w-20 h-1.5 bg-[#FB7E10] mt-4 rounded-full" />
                <p className="text-gray-600 mt-4 max-w-2xl"></p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 - dark */}
            <div className="relative rounded-2xl p-6 md:p-8 bg-[#0B1528] text-white shadow-[0_10px_30px_rgba(2,6,23,0.4)] overflow-hidden">
              <div className="absolute bottom-4 right-4 opacity-5 pointer-events-none">
                <Wrench className="w-28 h-28" />
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white/5 mb-4">
                <CheckCircle className="w-6 h-6 text-[#FB7E10]" />
              </div>
              <h3 className="text-lg font-black uppercase mb-2">Honesty Above Everything</h3>
              <p className="text-gray-300">We will never tell you that you need a new tyre when a repair will do the job safely. We will never quote one price and charge another. We give clear information so you can make the right decision for your budget.</p>
            </div>

            {/* Card 2 - light */}
            <div className="relative rounded-2xl p-6 md:p-8 bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden">
              <div className="absolute bottom-4 right-4 opacity-5 pointer-events-none">
                <Wrench className="w-28 h-28" />
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[#FB7E10]/10 mb-4">
                <Shield className="w-6 h-6 text-[#FB7E10]" />
              </div>
              <h3 className="text-lg font-black uppercase mb-2">Quality That Doesn't Cut Corners</h3>
              <p className="text-gray-700">Every tyre we fit is balanced using professional equipment. Every wheel nut is torqued to manufacturer specification. Every repair is carried out to British Standard BS AU 159. We treat every customer's vehicle the way we'd want ours treated.</p>
            </div>

            {/* Card 3 - light */}
            <div className="relative rounded-2xl p-6 md:p-8 bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden">
              <div className="absolute bottom-4 right-4 opacity-5 pointer-events-none">
                <Wrench className="w-28 h-28" />
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[#FB7E10]/10 mb-4">
                <Clock className="w-6 h-6 text-[#FB7E10]" />
              </div>
              <h3 className="text-lg font-black uppercase mb-2">Availability When It Matters</h3>
              <p className="text-gray-700">Tyre emergencies don't happen on schedule. We operate 24 hours a day, 7 days a week, 365 days a year because we believe a reliable tyre service has to be there when the road throws something unexpected at you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ─────────────────────────────────────────────────── */}
      <section id="why-us" className="bg-[#F1F3F6] py-6 md:py-8 px-4 sm:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* heading */}
          <div className="mb-12 md:mb-16 text-center md:text-left flex flex-col items-center md:items-start">
            <div className="font-black text-black text-4xl sm:text-5xl md:text-6xl leading-tight">Why Thousands Choose</div>
            <div className="font-black text-[#FB7E10] text-4xl sm:text-5xl md:text-7xl leading-tight tracking-tight -mt-1">Mobile Tyre Champions</div>
            <div className="w-16 h-1.5 bg-[#FB7E10] mt-4" />
          </div>

          {/* 6-card bento */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
            {values.map((v, i) => (
              <div
                key={i}
                className={`rounded-2xl md:rounded-3xl p-6 md:p-8 relative overflow-hidden group hover:shadow-lg transition-all duration-300 ${i === 0 || i === 3 ? 'bg-[#0B1528] text-white' : 'bg-white'}`}
              >
                {/* watermark icon */}
                <div className="absolute bottom-4 right-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                  <Wrench className="w-24 h-24" />
                </div>

                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${i === 0 || i === 3 ? 'bg-white/10' : 'bg-[#F1F3F6] border border-gray-100'}`}>
                  {v.icon}
                </div>
                <h3 className={`text-lg font-black uppercase tracking-tight mb-3 ${i === 0 || i === 3 ? 'text-white' : 'text-black'}`}>
                  {v.title}
                </h3>
                <p className={`font-medium leading-relaxed text-sm ${i === 0 || i === 3 ? 'text-gray-400' : 'text-gray-500'}`}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ── CONTACT INFO STRIP ────────────────────────────────────────────── */}
      <section className="bg-[#0B1528] py-8 md:py-10 px-4 sm:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {/* Address */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-[#FB7E10]/10 border border-[#FB7E10]/20 rounded-xl flex items-center justify-center">
              <MapPin size={22} className="text-[#FB7E10]" />
            </div>
            <div>
              <div className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">HQ Address</div>
              <div className="text-white font-bold text-sm md:text-base leading-snug">Grosvenor Road, Aldershot<br />GU11 3HY</div>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-[#FB7E10]/10 border border-[#FB7E10]/20 rounded-xl flex items-center justify-center">
              <Phone size={22} className="text-[#FB7E10]" />
            </div>
            <div>
              <div className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">Contact</div>
              <a href="tel:02071013856" className="text-white font-bold text-sm md:text-base hover:text-[#FB7E10] transition-colors">0207 101 3856</a>
              <br />
              <a href="mailto:info@mobiletyrechampions.com" className="text-white font-bold text-sm md:text-base hover:text-[#FB7E10] transition-colors">info@mobiletyrechampions.com</a>
            </div>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-[#FB7E10]/10 border border-[#FB7E10]/20 rounded-xl flex items-center justify-center">
              <Clock size={22} className="text-[#FB7E10]" />
            </div>
            <div>
              <div className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">Open Hours</div>
              <div className="text-[#FB7E10] font-black text-lg md:text-2xl">24/7</div>
              <div className="text-white/60 text-xs font-medium">We are always available!</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="bg-white py-8 px-4 sm:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto relative rounded-2xl md:rounded-[2.5rem] overflow-hidden bg-black min-h-[350px] md:min-h-[420px] flex items-center p-6 md:p-16 lg:p-20 shadow-2xl">
          {/* bg image */}
          <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-30 md:opacity-40 pointer-events-none">
            <img
              src="/images/cta-bg.webp"
              alt="Detailed tyre tread design showcasing quality replacement tyres and professional mobile tyre fitting services"
              className="w-full h-full object-cover grayscale brightness-200"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-transparent to-black" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-6 md:space-y-8 text-center md:text-left w-full">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-none tracking-tight">
              Stuck on the<br className="hidden sm:block" /> road? Call now.
            </h2>
            <p className="text-gray-400 font-medium text-base md:text-lg leading-relaxed">
              Whether you're at home, work, or stranded roadside — our expert team arrives quickly and gets you back on the road in just 30 minutes, guaranteed.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 pt-2">
              <a href="tel:02071013856" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#FB7E10] text-white px-8 md:px-10 py-3 md:py-4 rounded-xl font-black text-base md:text-lg hover:bg-orange-600 transition-all shadow-xl active:scale-95">
                <Phone size={18} fill="white" />
                Call 0207 101 3856
              </a>
              <Link
                href="/contact"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white px-8 md:px-10 py-3 md:py-4 rounded-xl font-black text-base md:text-lg hover:bg-[#0B1528] hover:border-transparent transition-all shadow-xl active:scale-95"
              >
                Book Appointment
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
