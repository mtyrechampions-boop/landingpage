import React from 'react';
import Image from 'next/image';

// Navigation stays on this site: section links scroll to the landing page's own sections
// (prefixed with `homeHref` when the footer is rendered on another page), service links open
// the internal /services pages, and tyre sizes pre-fill the booking form.

const BRAND_SERVICES = [
  { label: 'Emergency Tyre Replacement', href: '/services/flat-tyre-replacement' },
  { label: 'Puncture Repairs', href: '/services/puncture-repair' },
  { label: 'Roadside Tyre Fitting', href: '/services/roadside-tyre-fitting' },
];

const OUR_SERVICES = [
  { label: 'Emergency Tyre Fitting', href: '/services/roadside-tyre-fitting' },
  { label: 'Wheel Balancing', href: '/services/flat-tyre-replacement' },
  { label: 'Locking Wheel Nut Removal', href: '/services/locking-wheel-nut-removal' },
  { label: 'Mobile Trailer Tyre Fitting', href: '/services/commercial-tyres' },
];

const QUICK_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Services', href: '#why-us' },
  { label: 'About', href: '#why-us' },
  { label: 'All Locations', href: '#areas' },
  // The coverage grid is now built around the six target towns, so the county links
  // land on the section itself rather than a card that no longer exists.
  { label: 'Camberley', href: '#areas-camberley' },
  { label: 'Farnborough', href: '#areas-farnborough' },
  { label: 'Guildford', href: '#areas-guildford' },
  { label: 'Portsmouth', href: '#areas-portsmouth' },
  { label: 'Southampton', href: '#areas-southampton' },
  { label: 'Contact', href: '#contact' },
];

const POPULAR_TYRE_SIZES = [
  '205/55R16', '225/45R17', '195/65R15', '225/40R18', '185/65R15', '215/55R17',
  '225/50R17', '235/45R18', '175/65R14', '205/45R17', '245/40R18', '255/35R19',
  '195/55R16', '215/60R16', '235/40R18', '185/60R15', '215/50R17', '225/55R17',
  '205/60R16', '225/45R18', '255/40R19', '275/35R19', '235/35R19', '255/35R18',
  '245/45R18', '215/45R17', '205/50R17', '195/60R15', '175/70R14', '185/55R15',
  '255/30R20', '285/30R20', '275/40R20', '315/35R20', '295/35R21', '235/55R17',
  '235/60R18', '225/65R17', '215/65R16', '235/50R18',
];

const REVIEW_PLATFORMS = [
  { label: 'TopGoogle', href: 'https://www.topgoogle.com/listing/mobile-tyre-champions/', star: 'text-[#FBBC05]' },
  { label: 'Google', href: 'https://share.google/fl7N5RA9cbcogzGy7', star: 'text-[#FBBC05]' },
  { label: 'Trustpilot', href: 'https://www.trustpilot.com/review/mobiletyrechampions.com', star: 'text-[#00B67A]' },
];

const SOCIAL_BUTTON =
  'w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#FB7E10] hover:text-white transition-all duration-300 border border-white/10 group shadow-lg';
const COLUMN_LINK =
  'text-gray-400 hover:text-[#FB7E10] transition-all text-sm font-medium hover:scale-105 duration-200';
const SOCIAL_ICON = 'w-5 h-5 group-hover:scale-110 transition-transform';

const StarIcon = ({ className }) => (
  <svg className={`w-3.5 h-3.5 ${className}`} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const LandingFooter = ({ homeHref = '' }) => {
  const resolve = (href) => (href.startsWith('#') ? `${homeHref}${href}` : href);

  return (
    <footer className="bg-[#0B1528] pt-16 md:pt-24 pb-24 md:pb-12 px-6 sm:px-10 lg:px-20 border-t border-white/5 relative overflow-hidden text-center">
      {/* Orange hairline across the top edge */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#FB7E10]/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 xl:gap-12 justify-items-center items-start">

          {/* Brand column */}
          <div className="space-y-6 flex flex-col items-center">
            {/* Logo — deliberately not a link, so visitors stay on the landing page */}
            <div className="flex items-center h-16 md:h-20">
              <div className="relative h-full w-48">
                <Image
                  src="/images/MTC logo 3.webp"
                  alt="Mobile Tyre Champions brand logo for emergency mobile tyre fitting, tyre replacement, and roadside support"
                  fill
                  sizes="192px"
                  className="object-contain"
                />
              </div>
            </div>

            <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-xs mx-auto">
              Mobile Tyre Champions — Headquarters in Aldershot, serving Surrey, Hampshire, Berkshire and West London.
            </p>

            <div className="mt-4 text-sm text-white font-bold space-y-1">
              <div>Mobile Tyre Champions</div>
              <div className="text-[#FB7E10]">24/7 Mobile Tyre Fitting</div>
              <div className="text-gray-300">Serving Surrey, Hampshire, Berkshire and West London</div>
            </div>

            <ul className="mt-4 flex flex-col gap-2 text-sm">
              {BRAND_SERVICES.map((link) => (
                <li key={link.label}>
                  <a href={resolve(link.href)} className="text-gray-400 hover:text-[#FB7E10]">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-center gap-4">
              <a
                href="https://www.facebook.com/people/Mobile-Tyre-Champions/61572150444121/"
                target="_blank"
                rel="noopener noreferrer"
                className={SOCIAL_BUTTON}
              >
                <svg className={SOCIAL_ICON} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="sr-only">Facebook</span>
              </a>

              <a
                href="https://www.instagram.com/mobiletyrechampions/"
                target="_blank"
                rel="noopener noreferrer"
                className={SOCIAL_BUTTON}
              >
                <svg
                  className={SOCIAL_ICON}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <span className="sr-only">Instagram</span>
              </a>

              <a
                href="https://www.tiktok.com/@mobiletyrechampions"
                target="_blank"
                rel="noopener noreferrer"
                className={SOCIAL_BUTTON}
              >
                <svg className={SOCIAL_ICON} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.09-1.47-.88-.64-1.6-1.53-2.03-2.52V15.14c.05 3.44-2.14 6.99-5.73 7.84-3.94 1.12-8.38-1.12-9.61-4.99-1.3-3.79 1.12-8.38 5.73-8.84.44-.04.88-.04 1.32.02v4.01c-.44-.06-.88-.06-1.32-.02-1.99.23-3.72 2.05-3.6 4.09.12 2.04 2.14 3.73 4.13 3.42 1.99-.31 3.42-2.31 3.42-4.33V0h1.36z" />
                </svg>
                <span className="sr-only">TikTok</span>
              </a>
            </div>
          </div>

          {/* Our Services */}
          <div className="space-y-6 flex flex-col items-center">
            <h4 className="text-white font-bold text-lg">Our Services</h4>
            <div className="flex flex-col space-y-3.5">
              {OUR_SERVICES.map((link) => (
                <a key={link.label} href={resolve(link.href)} className={COLUMN_LINK}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6 flex flex-col items-center">
            <h4 className="text-white font-bold text-lg">Quick Links</h4>
            <div className="flex flex-col space-y-3.5 text-gray-400 text-sm font-medium">
              {QUICK_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={resolve(link.href)}
                  className="hover:text-[#FB7E10] transition-all hover:scale-105 duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* 24/7 Hotline card */}
          <div className="flex flex-col items-center w-full">
            <div className="bg-gradient-to-br from-[#111A2C] to-[#0A1222] border border-white/10 rounded-3xl p-6 xl:p-8 space-y-6 text-center shadow-2xl relative group w-full max-w-[320px] mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FB7E10]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />

              <div className="space-y-1 relative">
                <span className="text-[10px] font-bold text-[#FB7E10] uppercase tracking-[0.2em] block">
                  24/7 Hotline
                </span>
                <a
                  href="tel:02071013856"
                  data-conversion="phone-call"
                  className="text-white font-black text-xl xl:text-2xl tracking-tight whitespace-nowrap hover:text-[#FB7E10] transition-colors"
                >
                  0207 101 3856
                </a>
              </div>

              <div className="flex flex-col gap-4 items-center relative">
                <a
                  href="tel:02071013856"
                  data-conversion="phone-call"
                  className="bg-[#FB7E10] text-white w-full py-3.5 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-orange-600 transition-all text-center shadow-lg shadow-orange-900/20 active:scale-[0.98] ring-4 ring-[#FB7E10]/10"
                >
                  Call Now
                </a>
                <a
                  href="mailto:info@mobiletyrechampions.com"
                  className="text-gray-400 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest text-center"
                >
                  Email Support
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Popular Tyre Sizes */}
        <div className="mt-20 pt-12 border-t border-white/5">
          <h4 className="text-white font-bold text-lg mb-8">Popular Tyre Sizes</h4>
          <div className="flex flex-wrap justify-center gap-2 max-w-6xl mx-auto">
            {POPULAR_TYRE_SIZES.map((size) => (
              <a
                key={size}
                href={`/booking?tyre=${size}`}
                className="text-[10px] font-bold text-gray-500 hover:text-[#FB7E10] hover:bg-white/5 border border-white/5 px-2.5 py-1.5 rounded-md transition-all duration-200 uppercase tracking-tighter"
              >
                {size.replace('R', ' R')}
              </a>
            ))}
          </div>
        </div>

        {/* Rated Across Top Platforms */}
        <div className="mt-16 pt-12 border-t border-white/5">
          <h4 className="text-white font-bold text-lg mb-8">Rated Across Top Platforms</h4>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {REVIEW_PLATFORMS.map((platform) => (
              <a
                key={platform.label}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-[#F5F0E1] border border-[#E8DFC8] hover:border-[#FB7E10]/50 rounded-2xl px-6 py-4 transition-all duration-300 hover:shadow-[0_0_30px_rgba(251,126,16,0.15)] hover:-translate-y-0.5"
              >
                <div className="text-left">
                  <p className="text-[#0B1528] font-black text-sm leading-none mb-1.5">{platform.label}</p>
                  <div className="flex items-center gap-0.5">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <StarIcon key={i} className={platform.star} />
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Copyright & legal */}
        <div className="pt-10 mt-16 border-t border-white/5">
          <div className="flex flex-col items-center justify-center gap-6 px-4 text-center">
            <p className="text-gray-500 text-xs font-medium">
              © {new Date().getFullYear()} Mobile Tyre Champions. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[11px] font-bold uppercase tracking-wider text-gray-500">
              <a href="/privacy" className="hover:text-[#FB7E10] transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-[#FB7E10] transition-colors">Terms &amp; Conditions</a>
              <a href="/cookies" className="hover:text-[#FB7E10] transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>

        {/* Back to top — a plain anchor, so it works without JavaScript and inherits
            the page's smooth scrolling. Inline SVG keeps this a server component. */}
        <div className="mt-10 flex justify-center">
          <a
            href={`${homeHref}#top`}
            aria-label="Back to top of page"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 hover:bg-[#FB7E10] hover:border-[#FB7E10] px-6 py-3 text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FB7E10] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1528]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
              aria-hidden="true"
            >
              <path d="M18 15l-6-6-6 6" />
            </svg>
            <span>Back to top</span>
          </a>
        </div>

      </div>
    </footer>
  );
};

export default LandingFooter;
