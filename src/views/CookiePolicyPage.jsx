'use client';

import Link from 'next/link';
import { Shield, Phone, ArrowRight, Mail, MapPin, Clock, FileText, Eye, Info, CheckCircle, HelpCircle, Settings, ToggleLeft, ToggleRight } from 'lucide-react';
import { RESPONSE_PROMISE } from '@/lib/siteText';

/* ─── Cookies Section Data ───────────────────────────────────────────────── */

const cookieSections = [
  {
    id: 'what-are-cookies',
    icon: <Info className="w-5 h-5 text-[#FB7E10]" />,
    title: 'What Are Cookies?',
    content: [
      {
        text: 'Cookies are small text files that are stored on your computer, tablet, or mobile device when you visit a website. They are widely used to make websites work more efficiently, improve your browsing experience, and provide analytical information to the website owners.',
      },
      {
        text: 'Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device when you go offline, while session cookies are deleted as soon as you close your web browser.',
      },
    ],
  },
  {
    id: 'how-we-use-cookies',
    icon: <Eye className="w-5 h-5 text-[#FB7E10]" />,
    title: 'How We Use Cookies',
    content: [
      {
        text: 'We use cookies on the Mobile Tyre Champions website to enhance your user experience, evaluate website performance, and support our service features. Specifically, cookies help us to:',
        list: [
          'Keep our website secure and prevent fraud',
          'Remember your preferences, booking details, and selections as you move through our site',
          'Understand how visitors find and interact with our pages so we can make improvements',
          'Optimize page loading speeds and overall website performance',
          'Deliver relevant information, pricing, and support via integrated features (like WhatsApp or Google Maps)',
        ],
      },
    ],
  },
  {
    id: 'types-of-cookies',
    icon: <CheckCircle className="w-5 h-5 text-[#FB7E10]" />,
    title: 'Types of Cookies We Use',
    content: [
      {
        subtitle: '1. Essential / Strictly Necessary Cookies',
        text: 'These cookies are essential for you to browse the website and use its features, such as accessing secure areas, placing bookings, and validating forms. Without these cookies, the core functionality of our website cannot be provided.',
      },
      {
        subtitle: '2. Performance and Analytics Cookies',
        text: 'These cookies collect information about how you use our website, such as which pages you visit most often and if you receive error messages. This data is collected in an aggregated, anonymous format and is used solely to improve how our website works. We use Google Analytics for this purpose.',
      },
      {
        subtitle: '3. Functional Cookies',
        text: 'These cookies allow our website to remember choices you make (such as your location, search details, or preferences) and provide enhanced, more personal features. For example, they may be used to remember the tyre size you searched for.',
      },
      {
        subtitle: '4. Third-Party and Integration Cookies',
        text: 'Some pages on our website display content or use widgets from third-party providers (such as Google Maps for location selection, or WhatsApp Business for instant support). These third-party services may set their own cookies on your browser. We do not control these cookies and recommend checking the respective third-party privacy and cookie policies.',
      },
    ],
  },
  {
    id: 'managing-cookies',
    icon: <Settings className="w-5 h-5 text-[#FB7E10]" />,
    title: 'How to Manage and Disable Cookies',
    content: [
      {
        text: 'Most web browsers allow you to control cookies through their settings. You can configure your browser to accept or reject cookies, delete existing cookies, or notify you when a cookie is set. To find out how to manage cookies on popular browsers, visit the following links:',
        list: [
          'Google Chrome Settings',
          'Mozilla Firefox Options',
          'Apple Safari Preferences',
          'Microsoft Edge Settings',
        ],
      },
      {
        text: 'Please note that if you choose to block or disable all cookies (including essential cookies), you may not be able to access all or parts of our website, and certain features (such as the online tyre finder or booking forms) may not function correctly.',
      },
      {
        text: 'To opt out of being tracked by Google Analytics across all websites, visit: http://tools.google.com/dlpage/gaoptout.',
      },
    ],
  },
  {
    id: 'more-information',
    icon: <HelpCircle className="w-5 h-5 text-[#FB7E10]" />,
    title: 'More Information',
    content: [
      {
        text: 'For more general information about cookies and how they work, you can visit:',
        list: [
          'All About Cookies (www.allaboutcookies.org)',
          'About Cookies (www.aboutcookies.org)',
          'Information Commissioner\'s Office (ICO) Advice for Consumers',
        ],
      },
      {
        text: 'If you have any further questions about our use of cookies, please contact us at info@mobiletyrechampions.com or call 0207 101 3856.',
      },
    ],
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

const CookiePolicyPage = () => {
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
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FB7E10]/5 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FB7E10]/3 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />
        </div>

        <div className="container mx-auto px-4 md:px-10 lg:px-20 relative z-10 py-16 md:py-24">
          <div className="max-w-3xl space-y-6">
            {/* badge */}
            <div className="inline-flex items-center gap-2 bg-[#33251a] border border-[#fb7e10]/30 px-4 py-1.5 rounded-full">
              <Shield className="w-4 h-4 text-orange-500" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-orange-400">
                Cookie preferences
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight tracking-tight">
              Cookie{' '}
              <span className="text-[#FB7E10]">Policy</span>
            </h1>

            <p className="text-gray-300 text-base md:text-xl leading-relaxed max-w-2xl">
              This Policy explains how Mobile Tyre Champions uses cookies and similar tracking technologies on our website. We want to be transparent about how we process your online activities.
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

      {/* ── COOKIES CONTENT ────────────────────────────────────────────────── */}
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
                    Mobile Tyre Champions ("we", "us", "our") respects your privacy. This Cookie Policy explains what cookies are, how we use them on our website (
                    <a href="https://www.mobiletyrechampions.com" className="text-[#FB7E10] font-bold hover:underline" target="_blank" rel="noopener noreferrer">
                      www.mobiletyrechampions.com
                    </a>
                    ), and your choices regarding cookie management.
                  </p>
                  <p>
                    This policy should be read alongside our{' '}
                    <Link href="/privacy" className="text-[#FB7E10] font-bold hover:underline">
                      Privacy Policy
                    </Link>
                    , which provides additional details on how we collect, store, protect, and use your personal information.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Cookie Sections */}
          {cookieSections.map((section, sectionIndex) => (
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
              Need More <span className="text-[#FB7E10]">Information?</span>
            </h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto">
              If you have any questions or require additional details regarding our cookies and tracking practices, please contact us.
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
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#FB7E10]/10 rounded-full blur-[100px] translate-y-1/2 translate-x-1/4" />

          <div className="relative z-10 max-w-2xl space-y-6 md:space-y-8 text-center md:text-left w-full">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-none tracking-tight">
              Ready to Book Your<br className="hidden sm:block" /> Mobile Fitting?
            </h2>
            <p className="text-gray-400 font-medium text-base md:text-lg leading-relaxed">
              {RESPONSE_PROMISE} Premium service, affordable pricing.
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

export default CookiePolicyPage;
