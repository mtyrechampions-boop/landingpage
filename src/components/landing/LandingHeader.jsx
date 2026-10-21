'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Phone, Menu, X } from 'lucide-react';
import { LANDING_NAV } from '@/data/landingNav';
import { PHONE_HREF, PHONE_DISPLAY } from '@/data/mtcNavigation';

const FOCUS_RING = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FB7E10] focus-visible:ring-offset-2';
const DESKTOP_LINK = `flex items-center gap-1 rounded-lg px-2.5 xl:px-3 2xl:px-4 py-2.5 text-[15px] xl:text-[17px] font-bold whitespace-nowrap transition-colors ${FOCUS_RING}`;

// `homeHref` is '' on the landing page itself (nav links are in-page anchors) and '/' on every
// other page, where the same anchors must point back at the landing page.
const LandingHeader = ({ homeHref = '' }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const drawerRef = useRef(null);
  const menuButtonRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Compact header once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile drawer: scroll lock, focus management, Escape, focus trap
  useEffect(() => {
    if (!mobileOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab' || !drawerRef.current) return;
      const focusable = [...drawerRef.current.querySelectorAll('a[href], button')].filter((el) => !el.closest('[inert]'));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onBreakpoint = (e) => {
      if (e.matches) setMobileOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onBreakpoint);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onBreakpoint);
    };
  }, [mobileOpen]);

  const closeMobile = () => {
    setMobileOpen(false);
    menuButtonRef.current?.focus();
  };

  // Tapping a section link closes the drawer so the scroll is visible. The body scroll
  // lock is released by the effect cleanup before the browser jumps to the anchor.
  const closeMobileForNav = () => setMobileOpen(false);

  const navLabel = (entry) =>
    entry.shortLabel ? (
      <>
        <span className="xl:hidden">{entry.shortLabel}</span>
        <span className="hidden xl:inline">{entry.label}</span>
      </>
    ) : (
      entry.label
    );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* Live dispatch strip — collapses once scrolled */}
        <div
          aria-hidden={scrolled}
          className={`bg-gray-950 text-white overflow-hidden transition-[max-height] duration-300 ${scrolled ? 'max-h-0' : 'max-h-8'}`}
        >
          <div className="h-8 flex items-center justify-center gap-2 px-4">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider whitespace-nowrap">
              <span className="sm:hidden">24/7 Dispatch • 30–60 Min Arrival</span>
              <span className="hidden sm:inline">24/7 Emergency Available Active • 30–60 Min Arrival</span>
            </span>
          </div>
        </div>

        <div className={`bg-white/95 backdrop-blur-xl border-b border-gray-200 transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
          <nav aria-label="Main" className="max-w-7xl 2xl:max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`flex items-center justify-between gap-3 transition-[height] duration-300 ${scrolled ? 'h-14 lg:h-[72px] xl:h-20' : 'h-16 lg:h-[84px] xl:h-24'}`}>

              {/* Logo — not a link on the landing page itself; elsewhere it returns there */}
              <div className="shrink-0">
                {(() => {
                  const logo = (
                    <Image
                      src="/images/MTC logo 2.webp"
                      alt="Mobile Tyre Champions"
                      width={80}
                      height={80}
                      className={`transition-all duration-300 ${scrolled ? 'w-10 h-10 lg:w-14 lg:h-14 xl:w-16 xl:h-16' : 'w-11 h-11 lg:w-16 lg:h-16 xl:w-20 xl:h-20'}`}
                      priority
                    />
                  );
                  return homeHref ? (
                    <a href={homeHref} aria-label="Mobile Tyre Champions home" className={`block rounded-lg ${FOCUS_RING}`}>
                      {logo}
                    </a>
                  ) : (
                    logo
                  );
                })()}
              </div>

              {/* Desktop navigation — in-page sections only */}
              <ul className="hidden lg:flex items-center gap-0.5 xl:gap-1 2xl:gap-2">
                {LANDING_NAV.map((entry) => (
                  <li key={entry.href}>
                    <a href={`${homeHref}${entry.href}`} className={`${DESKTOP_LINK} text-gray-700 hover:text-[#FB7E10] hover:bg-orange-50`}>
                      {navLabel(entry)}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2 shrink-0">
                {/* Desktop call CTA */}
                <a
                  href={PHONE_HREF}
                  data-conversion="phone-call"
                  aria-label={`Call now on ${PHONE_DISPLAY}`}
                  className={`hidden lg:flex items-center gap-2.5 bg-[#FB7E10] hover:bg-orange-600 text-white px-5 xl:px-6 py-3 xl:py-3.5 rounded-2xl shadow-lg shadow-orange-500/20 active:scale-95 transition-all ${FOCUS_RING}`}
                >
                  <Phone size={20} className="fill-current shrink-0" aria-hidden="true" />
                  <span className="font-black text-base xl:text-lg tracking-wide whitespace-nowrap">{PHONE_DISPLAY}</span>
                </a>

                {/* Mobile: call + menu */}
                <a
                  href={PHONE_HREF}
                  data-conversion="phone-call"
                  aria-label={`Call now on ${PHONE_DISPLAY}`}
                  className={`lg:hidden flex items-center justify-center gap-2 h-11 min-w-11 px-3 sm:px-4 bg-[#FB7E10] hover:bg-orange-600 text-white rounded-xl font-black text-xs uppercase tracking-wider shadow-lg shadow-orange-500/20 active:scale-95 transition-all ${FOCUS_RING}`}
                >
                  <Phone size={18} className="fill-current" aria-hidden="true" />
                  <span className="hidden sm:inline">Call Now</span>
                </a>
                <button
                  ref={menuButtonRef}
                  type="button"
                  aria-label="Menu"
                  aria-expanded={mobileOpen}
                  aria-controls="mtc-mobile-menu"
                  onClick={() => setMobileOpen(true)}
                  className={`lg:hidden flex items-center justify-center w-11 h-11 rounded-xl border border-gray-200 bg-white text-gray-900 hover:bg-gray-50 active:scale-95 transition-all ${FOCUS_RING}`}
                >
                  <Menu size={22} aria-hidden="true" />
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Reserves the header's expanded height (strip 32px + nav + 1px border) so content never sits underneath it */}
      <div aria-hidden="true" className="h-[97px] lg:h-[117px] xl:h-[129px]" />

      {/* Mobile drawer — outside <header> so it stacks above the fixed bottom bar */}
      <div
        inert={!mobileOpen}
        className={`lg:hidden fixed inset-0 z-[60] ${mobileOpen ? 'visible' : 'invisible transition-[visibility] duration-300'}`}
      >
        <div
          aria-hidden="true"
          onClick={closeMobile}
          className={`absolute inset-0 bg-gray-950/60 backdrop-blur-sm transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
        />
        <div
          id="mtc-mobile-menu"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
          className={`absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100 shrink-0">
            <div>
              <Image src="/images/MTC logo 2.webp" alt="Mobile Tyre Champions" width={44} height={44} className="w-11 h-11" />
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close menu"
              onClick={closeMobile}
              className={`flex items-center justify-center w-11 h-11 rounded-xl border border-gray-200 text-gray-900 hover:bg-gray-50 transition-colors ${FOCUS_RING}`}
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Main" className="flex-1 overflow-y-auto overscroll-contain px-4 py-2">
            <ul>
              {LANDING_NAV.map((entry) => (
                <li key={entry.href} className="border-b border-gray-100">
                  <a
                    href={`${homeHref}${entry.href}`}
                    onClick={closeMobileForNav}
                    className={`block py-4 text-base font-bold text-gray-900 hover:text-[#FB7E10] transition-colors rounded-lg ${FOCUS_RING}`}
                  >
                    {entry.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="shrink-0 border-t border-gray-100 px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <a
              href={PHONE_HREF}
              data-conversion="phone-call"
              className={`flex w-full items-center justify-center gap-2 bg-[#FB7E10] hover:bg-orange-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-wider shadow-lg shadow-orange-500/25 active:scale-[0.98] transition-all ${FOCUS_RING}`}
            >
              <Phone size={18} className="fill-current" aria-hidden="true" />
              Call Now — {PHONE_DISPLAY}
            </a>
            <p className="mt-2 text-center text-xs font-semibold text-gray-500">24/7 hotline • 30–60 min typical arrival</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingHeader;
