'use client';
import { SERVICE_AREAS_TEXT } from '@/lib/siteText';

import Link from 'next/link';
import { Shield, Phone, ArrowRight, Mail, MapPin, Clock, FileText, Scale, Truck, CreditCard, AlertTriangle, Ban, RefreshCw, Wrench, ShieldCheck, ScrollText, Handshake, Info, CircleDot } from 'lucide-react';

/* ─── Terms Section Data ─────────────────────────────────────────────────── */

const termsSections = [
  {
    id: 'definitions',
    icon: <Info className="w-5 h-5 text-[#FB7E10]" />,
    title: 'Definitions',
    content: [
      {
        text: 'In these Terms and Conditions, the following definitions apply:',
        list: [
          '"Company", "we", "us", "our" — refers to Mobile Tyre Champions, operating from Grosvenor Road, Aldershot, GU11 3HY',
          '"Customer", "you", "your" — refers to any individual or business using our services or website',
          '"Services" — refers to all mobile tyre fitting, puncture repair, emergency tyre services, locking wheel nut removal, trailer tyre fitting, wheel balancing, and any other automotive services we provide',
          '"Website" — refers to www.mobiletyrechampions.com and all associated pages',
          '"Technician" — refers to our IMI-certified mobile tyre fitting engineers',
          '"Vehicle" — refers to any car, van, trailer, or other vehicle on which our services are performed',
        ],
      },
    ],
  },
  {
    id: 'services-overview',
    icon: <Truck className="w-5 h-5 text-[#FB7E10]" />,
    title: 'Our Services',
    content: [
      {
        text: 'Mobile Tyre Champions provides a comprehensive range of mobile tyre and automotive services, including but not limited to:',
        list: [
          'Mobile Tyre Fitting — we come to your home, workplace, or roadside location to fit new tyres',
          'Emergency Tyre Fitting — 24/7 emergency callout for tyre blowouts, punctures, and roadside breakdowns',
          'Puncture Repair — carried out to British Standard BS AU 159 where the tyre is deemed safe to repair',
          'Locking Wheel Nut Removal — specialist removal of damaged, spinning, or missing-key locking wheel nuts',
          'Trailer Tyre Fitting — mobile fitting for caravans, horse trailers, plant trailers, and commercial trailers',
          'Wheel Balancing — precision balancing using professional workshop-grade equipment',
          'Tyre Inspection & Rotation — visual inspection, tread depth checks, and tyre rotation services',
        ],
      },
      {
        text: 'All services are subject to availability, weather conditions, and safe working conditions at the customer\'s location. We reserve the right to refuse service if the working environment is deemed unsafe for our technicians.',
      },
    ],
  },
  {
    id: 'bookings',
    icon: <ScrollText className="w-5 h-5 text-[#FB7E10]" />,
    title: 'Bookings & Appointments',
    content: [
      {
        text: 'By placing a booking with Mobile Tyre Champions, you agree to the following:',
        list: [
          'You must provide accurate vehicle details including registration number, make, model, and tyre size at the time of booking',
          'You must ensure the vehicle is accessible and in a safe, legal location for our technician to work on',
          'You must be present (or an authorised representative) at the agreed location at the scheduled time',
          'Bookings are confirmed via phone, WhatsApp, or email. A confirmed booking constitutes a binding agreement for the agreed services',
          'We aim to arrive within the estimated time window provided, but arrival times are approximate and may vary due to traffic, weather, or prior appointments',
          'For emergency callouts, we prioritise response time and will provide a realistic ETA at the time of booking',
        ],
      },
    ],
  },
  {
    id: 'pricing-payment',
    icon: <CreditCard className="w-5 h-5 text-[#FB7E10]" />,
    title: 'Pricing & Payment',
    content: [
      {
        subtitle: 'Quotes and Pricing',
        text: null,
        list: [
          'All prices quoted are inclusive of VAT unless stated otherwise',
          'Quotes provided are valid for the specific service, tyre size, and brand discussed at the time of enquiry',
          'Our quotes include the cost of the tyre(s), mobile fitting, wheel balancing, and disposal of old tyres unless otherwise specified',
          'Prices may vary depending on tyre availability, vehicle type, location, and time of service (e.g., out-of-hours or bank holiday callouts)',
          'We reserve the right to adjust pricing if the vehicle details provided at booking differ from the actual vehicle, or if additional work is required',
        ],
      },
      {
        subtitle: 'Payment Terms',
        text: null,
        list: [
          'Payment is due upon completion of the service unless alternative arrangements have been agreed in writing',
          'We accept payment by cash, bank transfer, and all major debit/credit cards',
          'For business accounts, payment terms may be agreed separately in writing',
          'Failure to make payment upon completion may result in recovery action and additional charges',
        ],
      },
    ],
  },
  {
    id: 'cancellations',
    icon: <Ban className="w-5 h-5 text-[#FB7E10]" />,
    title: 'Cancellations & Rescheduling',
    content: [
      {
        text: 'We understand that plans change. Our cancellation policy is as follows:',
        list: [
          'Cancellations made more than 2 hours before the scheduled appointment — no charge',
          'Cancellations made less than 2 hours before the scheduled appointment — a cancellation fee may apply to cover the cost of tyres already sourced and technician dispatch',
          'If our technician has already been dispatched or has arrived at your location, a callout fee may be charged',
          'No-shows without prior notice may incur a full callout charge',
          'Rescheduling is free of charge provided reasonable notice is given',
          'In cases of severe weather or unsafe conditions, either party may reschedule without penalty',
        ],
      },
    ],
  },
  {
    id: 'warranty',
    icon: <ShieldCheck className="w-5 h-5 text-[#FB7E10]" />,
    title: 'Warranty & Guarantees',
    content: [
      {
        subtitle: 'Tyre Warranty',
        text: null,
        list: [
          'All new tyres supplied by Mobile Tyre Champions carry the manufacturer\'s warranty against manufacturing defects',
          'Warranty claims must be made directly to us, and we will liaise with the manufacturer on your behalf',
          'Tyre warranties do not cover damage caused by road hazards, improper use, under/over-inflation, misalignment, kerb damage, or normal wear and tear',
        ],
      },
      {
        subtitle: 'Workmanship Guarantee',
        text: null,
        list: [
          'We guarantee all fitting and repair work carried out by our technicians',
          'If you experience any issues related to our workmanship (e.g., incorrect balancing, loose wheel nuts), contact us immediately and we will rectify the issue at no additional charge',
          'Puncture repairs are guaranteed provided the repair meets British Standard BS AU 159 criteria. Tyres repaired outside these criteria (at the customer\'s request) are not covered',
          'Our workmanship guarantee does not cover pre-existing vehicle faults, subsequent damage from other providers, or issues caused by customer negligence',
        ],
      },
    ],
  },
  {
    id: 'liability',
    icon: <Scale className="w-5 h-5 text-[#FB7E10]" />,
    title: 'Limitation of Liability',
    content: [
      {
        text: 'While we take every care when working on your vehicle, the following limitations apply:',
        list: [
          'Mobile Tyre Champions carries full public liability insurance and employer\'s liability insurance',
          'We are liable for damage directly caused by our technicians during the course of their work, subject to fair investigation',
          'We are not liable for pre-existing damage to wheels, bodywork, suspension, or other vehicle components that is identified before or during our service',
          'We are not responsible for wheel damage caused by corrosion, previously over-tightened or cross-threaded wheel bolts, or seized components beyond our control',
          'Our liability is limited to the cost of the services provided. We are not liable for indirect, consequential, or incidental losses (e.g., loss of earnings, travel costs, vehicle hire)',
          'Customers are responsible for ensuring their vehicle is roadworthy and that the information provided at booking is accurate and complete',
          'If pre-existing issues are discovered during our service (e.g., corroded wheel studs, brake faults), we will inform you before proceeding',
        ],
      },
    ],
  },
  {
    id: 'customer-responsibilities',
    icon: <Handshake className="w-5 h-5 text-[#FB7E10]" />,
    title: 'Customer Responsibilities',
    content: [
      {
        text: 'To ensure a smooth and safe service, customers agree to:',
        list: [
          'Provide accurate vehicle and location information at the time of booking',
          'Ensure the vehicle is parked on a firm, level surface with adequate space for our technician to work safely',
          'Inform us of any known issues with the vehicle (e.g., locking wheel nut key location, TPMS sensors, wheel spacers)',
          'Ensure the vehicle handbrake is engaged and the vehicle is in gear or Park',
          'Keep children, pets, and bystanders at a safe distance from the work area',
          'Not drive on a tyre that has been identified as unsafe — if our technician deems a tyre dangerous, it must be replaced before the vehicle is driven',
          'Report any concerns about our work within 48 hours of service completion',
        ],
      },
    ],
  },
  {
    id: 'intellectual-property',
    icon: <FileText className="w-5 h-5 text-[#FB7E10]" />,
    title: 'Intellectual Property',
    content: [
      {
        text: 'All content on the Mobile Tyre Champions website is protected by intellectual property rights:',
        list: [
          'All text, images, logos, branding, graphics, and design elements are the property of Mobile Tyre Champions or our licensors',
          'You may not copy, reproduce, distribute, or use any content from our website without our prior written consent',
          'The Mobile Tyre Champions name, logo, and branding are trademarks of our business. Unauthorised use is prohibited',
          'User-submitted content (e.g., reviews, photos) may be used by us for marketing purposes unless you notify us otherwise',
        ],
      },
    ],
  },
  {
    id: 'complaints',
    icon: <AlertTriangle className="w-5 h-5 text-[#FB7E10]" />,
    title: 'Complaints Procedure',
    content: [
      {
        text: 'We are committed to providing an excellent service. If something goes wrong, our complaints process is as follows:',
        list: [
          'Contact us as soon as possible by calling 0207 101 3856 or emailing info@mobiletyrechampions.com',
          'Provide your booking reference, vehicle details, and a description of the issue',
          'We will acknowledge your complaint within 24 hours and investigate promptly',
          'Where appropriate, we will arrange for a technician to inspect the work and resolve any issues',
          'We aim to resolve all complaints within 14 working days',
          'If you are not satisfied with our response, you may seek independent advice from your local Citizens Advice Bureau or Trading Standards office',
        ],
      },
    ],
  },
  {
    id: 'force-majeure',
    icon: <RefreshCw className="w-5 h-5 text-[#FB7E10]" />,
    title: 'Force Majeure',
    content: [
      {
        text: 'Mobile Tyre Champions shall not be held liable for any failure or delay in performing our obligations where such failure or delay results from circumstances beyond our reasonable control, including but not limited to:',
        list: [
          'Severe weather conditions (storms, flooding, snow, ice)',
          'Road closures, traffic incidents, or restricted access',
          'Supply chain disruptions affecting tyre availability',
          'Government regulations, lockdowns, or public health emergencies',
          'Equipment failure beyond our reasonable control',
          'Acts of God, war, terrorism, or civil unrest',
        ],
      },
      {
        text: 'In such circumstances, we will make every reasonable effort to reschedule your appointment at the earliest available opportunity.',
      },
    ],
  },
  {
    id: 'governing-law',
    icon: <Scale className="w-5 h-5 text-[#FB7E10]" />,
    title: 'Governing Law & Jurisdiction',
    content: [
      {
        text: 'These Terms and Conditions are governed by and construed in accordance with the laws of England and Wales. Any disputes arising from these terms or our services shall be subject to the exclusive jurisdiction of the courts of England and Wales.',
      },
      {
        text: 'If any provision of these Terms and Conditions is found to be invalid or unenforceable by a court of law, the remaining provisions shall continue in full force and effect.',
      },
    ],
  },
  {
    id: 'changes',
    icon: <RefreshCw className="w-5 h-5 text-[#FB7E10]" />,
    title: 'Changes to These Terms',
    content: [
      {
        text: 'We reserve the right to update or amend these Terms and Conditions at any time. Changes will be posted on this page with a revised "Last Updated" date. Continued use of our services after changes are published constitutes acceptance of the updated terms.',
      },
      {
        text: 'We recommend reviewing these terms periodically to stay informed of any changes.',
      },
    ],
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

const TermsAndConditionsPage = () => {
  return (
    <div className="font-['Outfit'] bg-slate-50 min-h-screen overflow-x-hidden">

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[440px] md:min-h-[520px] flex items-center bg-gray-900 overflow-hidden">
        {/* bg pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#0B1528]" />
          {/* Decorative grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
          {/* Gradient overlays */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#FB7E10]/5 rounded-full blur-[120px] -translate-y-1/3 -translate-x-1/4" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#FB7E10]/3 rounded-full blur-[100px] translate-y-1/2 translate-x-1/3" />
        </div>

        <div className="container mx-auto px-4 md:px-10 lg:px-20 relative z-10 py-16 md:py-24">
          <div className="max-w-3xl space-y-6">
            {/* badge */}
            <div className="inline-flex items-center gap-2 bg-[#33251a] border border-[#fb7e10]/30 px-4 py-1.5 rounded-full">
              <Scale className="w-4 h-4 text-orange-500" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-orange-400">
                Service Agreement
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight tracking-tight">
              Terms &{' '}
              <span className="text-[#FB7E10]">Conditions</span>
            </h1>

            <p className="text-gray-300 text-base md:text-xl leading-relaxed max-w-2xl">
              Please read these Terms and Conditions carefully before using our mobile tyre fitting services. By booking a service or using our website, you agree to be bound by these terms.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FB7E10]" />
                <span>Last Updated: 1 June 2026</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-600 hidden sm:block" />
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#FB7E10]" />
                <span>Effective Immediately</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK NAV ──────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100 py-6 px-4 sm:px-10 lg:px-20 sticky top-[72px] md:top-[88px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0">Jump to:</span>
            {[
              { id: 'services-overview', label: 'Services' },
              { id: 'bookings', label: 'Bookings' },
              { id: 'pricing-payment', label: 'Pricing' },
              { id: 'cancellations', label: 'Cancellations' },
              { id: 'warranty', label: 'Warranty' },
              { id: 'liability', label: 'Liability' },
              { id: 'complaints', label: 'Complaints' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-xs font-bold text-gray-500 hover:text-[#FB7E10] transition-colors whitespace-nowrap px-3 py-1.5 rounded-full border border-gray-200 hover:border-[#FB7E10]/30 hover:bg-[#FB7E10]/5"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── TERMS CONTENT ──────────────────────────────────────────────────── */}
      <section className="bg-white py-12 md:py-20 px-4 sm:px-10 lg:px-20">
        <div className="max-w-4xl mx-auto">

          {/* Introduction */}
          <div className="mb-16 pb-12 border-b border-gray-100">
            <div className="flex items-start gap-6">
              <div className="mt-1">
                <div className="w-1.5 h-12 bg-[#FB7E10] rounded-full" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-black">Introduction</h2>
                <div className="w-20 h-1.5 bg-[#FB7E10] mt-4 rounded-full" />
                <div className="text-gray-600 mt-6 space-y-4 text-base md:text-lg leading-relaxed">
                  <p>
                    These Terms and Conditions ("Terms") govern your use of the{' '}
                    <a href="https://www.mobiletyrechampions.com" className="text-[#FB7E10] font-bold hover:underline" target="_blank" rel="noopener noreferrer">
                      Mobile Tyre Champions website
                    </a>{' '}
                    and all services provided by Mobile Tyre Champions, a mobile tyre fitting business based at Grosvenor Road, Aldershot, GU11 3HY.
                  </p>
                  <p>
                    By using our website, booking a service, or engaging with our technicians, you confirm that you have read, understood, and agree to these Terms. If you do not agree with any part of these Terms, you should not use our services.
                  </p>
                  <p>
                    These Terms apply to all customers — both private individuals and business clients — across all service areas including {SERVICE_AREAS_TEXT} and surrounding regions. For any questions, contact us at{' '}
                    <a href="mailto:info@mobiletyrechampions.com" className="text-[#FB7E10] font-bold hover:underline">
                      info@mobiletyrechampions.com
                    </a>{' '}
                    or call{' '}
                    <a href="tel:02071013856" className="text-[#FB7E10] font-bold hover:underline">
                      0207 101 3856
                    </a>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Highlights */}
          <div className="mb-16 pb-12 border-b border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: <ShieldCheck className="w-5 h-5 text-[#FB7E10]" />, title: 'Fully Insured', desc: 'Public liability & employer\'s liability insurance on all jobs' },
                { icon: <Wrench className="w-5 h-5 text-[#FB7E10]" />, title: 'BS AU 159', desc: 'All puncture repairs meet British Standard specifications' },
                { icon: <CreditCard className="w-5 h-5 text-[#FB7E10]" />, title: 'Transparent Pricing', desc: 'Upfront quotes with no hidden fees or surprise charges' },
                { icon: <Clock className="w-5 h-5 text-[#FB7E10]" />, title: '24/7 Service', desc: 'Available around the clock including bank holidays' },
                { icon: <Shield className="w-5 h-5 text-[#FB7E10]" />, title: 'Workmanship Guarantee', desc: 'All fitting work guaranteed by our certified technicians' },
                { icon: <Truck className="w-5 h-5 text-[#FB7E10]" />, title: 'Free Cancellation', desc: 'Cancel free of charge with more than 2 hours notice' },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`rounded-2xl p-5 relative overflow-hidden group hover:shadow-md transition-all duration-300 ${i === 0 ? 'bg-[#0B1528] text-white' : 'bg-[#F1F3F6] border border-gray-100'}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${i === 0 ? 'bg-white/10' : 'bg-white border border-gray-200'}`}>
                    {item.icon}
                  </div>
                  <h3 className={`text-sm font-black uppercase tracking-tight mb-1 ${i === 0 ? 'text-white' : 'text-black'}`}>
                    {item.title}
                  </h3>
                  <p className={`text-xs leading-relaxed ${i === 0 ? 'text-gray-400' : 'text-gray-500'}`}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Terms Sections */}
          {termsSections.map((section, sectionIndex) => (
            <div
              key={section.id}
              id={section.id}
              className="mb-12 pb-12 border-b border-gray-100 last:border-b-0 last:pb-0 scroll-mt-40"
            >
              <div className="flex items-start gap-4 md:gap-6">
                {/* Section number */}
                <div className="shrink-0 mt-1">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#FB7E10]/10 border border-[#FB7E10]/20 flex items-center justify-center">
                    <span className="text-[#FB7E10] font-black text-sm md:text-base">{String(sectionIndex + 1).padStart(2, '0')}</span>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  {/* Section title */}
                  <div className="flex items-center gap-3 mb-1">
                    {section.icon}
                    <h2 className="text-xl md:text-2xl font-black tracking-tight text-black">
                      {section.title}
                    </h2>
                  </div>
                  <div className="w-12 h-1 bg-[#FB7E10] rounded-full mb-6" />

                  {/* Section content */}
                  {section.content.map((block, blockIndex) => (
                    <div key={blockIndex} className="mb-6 last:mb-0">
                      {block.subtitle && (
                        <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3">
                          {block.subtitle}
                        </h3>
                      )}
                      {block.text && (
                        <p className="text-gray-600 leading-relaxed mb-4">
                          {block.text}
                        </p>
                      )}
                      {block.list && (
                        <ul className="space-y-3">
                          {block.list.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#FB7E10] shrink-0 mt-2" />
                              <span className="text-gray-600 leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT STRIP ──────────────────────────────────────────────────── */}
      <section className="bg-[#0B1528] py-12 md:py-16 px-4 sm:px-10 lg:px-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Questions About Our <span className="text-[#FB7E10]">Terms?</span>
            </h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto">
              If you have any questions about these Terms and Conditions, or need clarification on any of our policies, our team is here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Phone */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-[#FB7E10]/10 border border-[#FB7E10]/20 rounded-xl flex items-center justify-center">
                <Phone size={22} className="text-[#FB7E10]" />
              </div>
              <div>
                <div className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">Call Us</div>
                <a href="tel:02071013856" className="text-white font-bold text-sm md:text-base hover:text-[#FB7E10] transition-colors">
                  0207 101 3856
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-[#FB7E10]/10 border border-[#FB7E10]/20 rounded-xl flex items-center justify-center">
                <Mail size={22} className="text-[#FB7E10]" />
              </div>
              <div>
                <div className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">Email Us</div>
                <a href="mailto:info@mobiletyrechampions.com" className="text-white font-bold text-xs md:text-sm hover:text-[#FB7E10] transition-colors break-all">
                  info@mobiletyrechampions.com
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-[#FB7E10]/10 border border-[#FB7E10]/20 rounded-xl flex items-center justify-center">
                <MapPin size={22} className="text-[#FB7E10]" />
              </div>
              <div>
                <div className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">Address</div>
                <div className="text-white font-bold text-sm leading-snug">
                  Grosvenor Road, Aldershot<br />GU11 3HY
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="bg-white py-8 px-4 sm:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto relative rounded-2xl md:rounded-[2.5rem] overflow-hidden bg-black min-h-[300px] md:min-h-[350px] flex items-center p-6 md:p-16 lg:p-20 shadow-2xl">
          {/* bg pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 0.5px, transparent 0)`,
                backgroundSize: '32px 32px',
              }}
            />
          </div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FB7E10]/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />

          <div className="relative z-10 max-w-2xl space-y-6 md:space-y-8 text-center md:text-left w-full">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-none tracking-tight">
              Ready to Book<br className="hidden sm:block" /> Your Service?
            </h2>
            <p className="text-gray-400 font-medium text-base md:text-lg leading-relaxed">
              Our expert mobile technicians are ready to help — at home, at work, or roadside. Available 24/7 with transparent pricing and no hidden fees.
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

export default TermsAndConditionsPage;
