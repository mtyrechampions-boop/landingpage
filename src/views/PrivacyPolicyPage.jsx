"use client";

import Link from 'next/link';
import { SERVICE_AREAS_TEXT } from '@/lib/siteText';
import { Shield, Phone, ArrowRight, Mail, MapPin, Clock, FileText, Eye, Database, Lock, UserCheck, Globe, Bell, Trash2, AlertTriangle } from 'lucide-react';

/* ─── Policy Section Data ────────────────────────────────────────────────── */

const policySections = [
  {
    id: 'information-we-collect',
    icon: <Database className="w-5 h-5 text-[#FB7E10]" />,
    title: 'Information We Collect',
    content: [
      {
        subtitle: 'Personal Information You Provide',
        text: 'When you use our services, book a mobile tyre fitting, or contact us, we may collect the following information:',
        list: [
          'Full name and contact details (phone number, email address)',
          'Vehicle registration number, make, model, and tyre size',
          'Your location or address for mobile tyre fitting services',
          'Payment information (processed securely through our payment providers)',
          'Any correspondence or messages you send to us via phone, email, WhatsApp, or our contact form',
        ],
      },
      {
        subtitle: 'Information Collected Automatically',
        text: 'When you visit our website, we may automatically collect:',
        list: [
          'IP address and browser type',
          'Device information (operating system, screen resolution)',
          'Pages visited, time spent on pages, and navigation patterns',
          'Referral source (how you found our website)',
          'Cookies and similar tracking technologies (see our Cookie Policy for details)',
        ],
      },
    ],
  },
  {
    id: 'how-we-use',
    icon: <Eye className="w-5 h-5 text-[#FB7E10]" />,
    title: 'How We Use Your Information',
    content: [
      {
        text: 'We use the information we collect for the following purposes:',
        list: [
          'To provide our mobile tyre fitting, puncture repair, and emergency tyre services',
          'To process your bookings and dispatch our nearest technician to your location',
          'To communicate with you about your service, including appointment confirmations, updates, and follow-ups',
          'To process payments securely',
          'To respond to your enquiries and provide customer support via phone, email, or WhatsApp',
          'To improve our website, services, and customer experience',
          'To send you service-related communications (e.g., booking confirmations, tyre fitting reminders)',
          'To comply with legal obligations and protect our legitimate business interests',
          'To analyse website traffic and usage patterns using tools such as Google Analytics',
        ],
      },
    ],
  },
  {
    id: 'legal-basis',
    icon: <FileText className="w-5 h-5 text-[#FB7E10]" />,
    title: 'Legal Basis for Processing',
    content: [
      {
        text: 'Under the UK General Data Protection Regulation (UK GDPR), we process your personal data on the following legal bases:',
        list: [
          'Contract Performance — to fulfil the tyre fitting and repair services you have requested',
          'Legitimate Interests — to improve our services, manage our business, and ensure security',
          'Consent — where you have opted in to receive marketing communications',
          'Legal Obligation — to comply with applicable laws and regulations',
        ],
      },
    ],
  },
  {
    id: 'data-sharing',
    icon: <UserCheck className="w-5 h-5 text-[#FB7E10]" />,
    title: 'Who We Share Your Data With',
    content: [
      {
        text: 'We do not sell your personal data to third parties. We may share your information with:',
        list: [
          'Our mobile tyre fitting technicians — to fulfil your service booking and arrive at your location',
          'Payment processors — to securely process transactions',
          'Website hosting and analytics providers (e.g., Vercel, Google Analytics) — to maintain and improve our website',
          'Communication platforms (e.g., WhatsApp Business) — to respond to your messages',
          'Legal and regulatory authorities — where required by law',
          'Tyre manufacturers and suppliers — solely for order fulfilment purposes',
        ],
      },
    ],
  },
  {
    id: 'data-security',
    icon: <Lock className="w-5 h-5 text-[#FB7E10]" />,
    title: 'Data Security',
    content: [
      {
        text: 'We take the security of your personal information seriously. We implement appropriate technical and organisational measures to protect your data, including:',
        list: [
          'SSL/TLS encryption on our website to protect data in transit',
          'Secure payment processing through PCI-compliant providers',
          'Access controls to limit who can view personal data within our organisation',
          'Regular security reviews of our systems and processes',
        ],
      },
      {
        text: 'While we take every reasonable precaution, no data transmission over the internet is 100% secure. We encourage you to contact us immediately if you suspect any unauthorised access to your data.',
      },
    ],
  },
  {
    id: 'data-retention',
    icon: <Clock className="w-5 h-5 text-[#FB7E10]" />,
    title: 'Data Retention',
    content: [
      {
        text: 'We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected:',
        list: [
          'Service records and booking history — retained for up to 6 years for legal and warranty purposes',
          'Payment records — retained as required by HMRC and financial regulations',
          'Marketing consent records — retained until you withdraw your consent',
          'Website analytics data — retained in anonymised form',
          'Customer enquiries — retained for up to 2 years after the last interaction',
        ],
      },
    ],
  },
  {
    id: 'your-rights',
    icon: <Shield className="w-5 h-5 text-[#FB7E10]" />,
    title: 'Your Rights',
    content: [
      {
        text: 'Under the UK GDPR, you have the following rights regarding your personal data:',
        list: [
          'Right of Access — request a copy of the personal data we hold about you',
          'Right to Rectification — request correction of inaccurate or incomplete data',
          'Right to Erasure — request deletion of your personal data (subject to legal obligations)',
          'Right to Restriction — request that we limit how we use your data',
          'Right to Data Portability — receive your data in a structured, machine-readable format',
          'Right to Object — object to processing based on legitimate interests or for marketing purposes',
          'Right to Withdraw Consent — withdraw consent at any time where processing is based on consent',
        ],
      },
      {
        text: 'To exercise any of these rights, please contact us at info@mobiletyrechampions.com or call 0207 101 3856. We will respond to your request within 30 days.',
      },
    ],
  },
  {
    id: 'cookies',
    icon: <Globe className="w-5 h-5 text-[#FB7E10]" />,
    title: 'Cookies & Tracking',
    content: [
      {
        text: 'Our website uses cookies and similar technologies to enhance your browsing experience. These include:',
        list: [
          'Essential Cookies — required for the website to function properly (e.g., session management)',
          'Analytics Cookies — help us understand how visitors use our website (e.g., Google Analytics)',
          'Functional Cookies — remember your preferences and settings',
        ],
      },
      {
        text: 'You can manage your cookie preferences through your browser settings. For more details, please see our Cookie Policy.',
      },
    ],
  },
  {
    id: 'third-party-links',
    icon: <Globe className="w-5 h-5 text-[#FB7E10]" />,
    title: 'Third-Party Links',
    content: [
      {
        text: 'Our website may contain links to third-party websites, including our social media profiles on Facebook, Instagram, and TikTok. We are not responsible for the privacy practices of these external sites. We encourage you to read their privacy policies before providing any personal information.',
      },
    ],
  },
  {
    id: 'childrens-privacy',
    icon: <AlertTriangle className="w-5 h-5 text-[#FB7E10]" />,
    title: "Children's Privacy",
    content: [
      {
        text: 'Our services are not directed at individuals under the age of 18. We do not knowingly collect personal data from children. If you believe that we have inadvertently collected data from a minor, please contact us immediately so we can take appropriate action.',
      },
    ],
  },
  {
    id: 'changes',
    icon: <Bell className="w-5 h-5 text-[#FB7E10]" />,
    title: 'Changes to This Policy',
    content: [
      {
        text: 'We may update this Privacy Policy from time to time to reflect changes in our services, legal requirements, or business practices. Any updates will be posted on this page with a revised "Last Updated" date. We encourage you to review this policy periodically.',
      },
    ],
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

const PrivacyPolicyPage = () => {
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
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FB7E10]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FB7E10]/3 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />
        </div>

        <div className="container mx-auto px-4 md:px-10 lg:px-20 relative z-10 py-16 md:py-24">
          <div className="max-w-3xl space-y-6">
            {/* badge */}
            <div className="inline-flex items-center gap-2 bg-[#33251a] border border-[#fb7e10]/30 px-4 py-1.5 rounded-full">
              <Shield className="w-4 h-4 text-orange-500" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-orange-400">
                Your Privacy Matters
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight tracking-tight">
              Privacy{' '}
              <span className="text-[#FB7E10]">Policy</span>
            </h1>

            <p className="text-gray-300 text-base md:text-xl leading-relaxed max-w-2xl">
              At Mobile Tyre Champions, we are committed to protecting your privacy and handling your personal data responsibly. This policy explains how we collect, use, store, and protect your information when you use our website and services.
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
            {policySections.slice(0, 7).map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-xs font-bold text-gray-500 hover:text-[#FB7E10] transition-colors whitespace-nowrap px-3 py-1.5 rounded-full border border-gray-200 hover:border-[#FB7E10]/30 hover:bg-[#FB7E10]/5"
              >
                {section.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── POLICY CONTENT ─────────────────────────────────────────────────── */}
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
                    Mobile Tyre Champions ("we", "us", "our") operates the website{' '}
                    <a href="https://www.mobiletyrechampions.com" className="text-[#FB7E10] font-bold hover:underline" target="_blank" rel="noopener noreferrer">
                      www.mobiletyrechampions.com
                    </a>{' '}
                    and provides mobile tyre fitting, puncture repair, emergency tyre services, locking wheel nut removal, trailer tyre fitting, and related automotive services. {SERVICE_AREAS_TEXT} and surrounding areas.
                  </p>
                  <p>
                    This Privacy Policy describes how we collect, use, and protect your personal information in accordance with the UK General Data Protection Regulation (UK GDPR), the Data Protection Act 2018, and the Privacy and Electronic Communications Regulations (PECR).
                  </p>
                  <p>
                    Our registered business address is Grosvenor Road, Aldershot, GU11 3HY. For any privacy-related enquiries, you can reach us at{' '}
                    <a href="mailto:info@mobiletyrechampions.com" className="text-[#FB7E10] font-bold hover:underline">
                      info@mobiletyrechampions.com
                    </a>{' '}
                    or call us on{' '}
                    <a href="tel:02071013856" className="text-[#FB7E10] font-bold hover:underline">
                      0207 101 3856
                    </a>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Policy Sections */}
          {policySections.map((section, sectionIndex) => (
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
              Questions About Your <span className="text-[#FB7E10]">Privacy?</span>
            </h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto">
              If you have any questions about this Privacy Policy or wish to exercise your data protection rights, please don't hesitate to contact us.
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

          <div className="pt-4">
            <p className="text-gray-500 text-xs">
              You also have the right to lodge a complaint with the{' '}
              <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-[#FB7E10] hover:underline font-bold">
                Information Commissioner's Office (ICO)
              </a>{' '}
              if you believe your data protection rights have been violated.
            </p>
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
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FB7E10]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />

          <div className="relative z-10 max-w-2xl space-y-6 md:space-y-8 text-center md:text-left w-full">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-none tracking-tight">
              Need a Tyre<br className="hidden sm:block" /> Fitted Now?
            </h2>
            <p className="text-gray-400 font-medium text-base md:text-lg leading-relaxed">
              Our expert mobile technicians come to you — at home, at work, or roadside. Available 24/7, 365 days a year.
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

export default PrivacyPolicyPage;
