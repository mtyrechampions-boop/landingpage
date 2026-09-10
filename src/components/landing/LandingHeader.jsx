'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Phone, ChevronDown, ArrowRight, Menu, X } from 'lucide-react';
import { MTC_NAV, MTC_HOME_URL, PHONE_HREF, PHONE_DISPLAY } from '@/data/mtcNavigation';

const FOCUS_RING = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FB7E10] focus-visible:ring-offset-2';
const DESKTOP_LINK = `flex items-center gap-1 rounded-lg px-2.5 xl:px-3 py-2 text-sm xl:text-[15px] font-bold whitespace-nowrap transition-colors ${FOCUS_RING}`;
const HOVER_CLOSE_DELAY = 150;

const LandingHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // desktop dropdown id
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState(null); // mobile accordion id

  const navRef = useRef(null);
  const drawerRef = useRef(null);
  const menuButtonRef = useRef(null);
  const closeButtonRef = useRef(null);
  const hoverTimer = useRef(null);
  const lastPointer = useRef(null);

  // Compact header once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(hoverTimer.current);
    };
  }, []);

  // Desktop dropdown: close on outside click or Escape
  useEffect(() => {
    if (!openMenu) return undefined;
    const onPointerDown = (e) => {
      if (!navRef.current?.contains(e.target)) setOpenMenu(null);
    };
    const onKeyDown = (e) => {
      if (e.key !== 'Escape') return;
      if (navRef.current?.contains(document.activeElement)) {
        document.getElementById(`mtc-nav-trigger-${openMenu}`)?.focus();
      }
      setOpenMenu(null);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [openMenu]);

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

  const hoverOpen = (id) => {
    clearTimeout(hoverTimer.current);
    setOpenMenu(id);
  };

  const hoverClose = () => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpenMenu(null), HOVER_CLOSE_DELAY);
  };

  const handleTriggerClick = (id) => {
    const viaMouse = lastPointer.current === 'mouse';
    lastPointer.current = null;
    clearTimeout(hoverTimer.current);
    // A mouse user has already opened it by hovering — don't let the click snap it shut.
    if (viaMouse && openMenu === id) return;
    setOpenMenu((current) => (current === id ? null : id));
  };

  const openAndFocusFirst = (id) => {
    setOpenMenu(id);
    requestAnimationFrame(() => document.getElementById(`mtc-nav-panel-${id}`)?.querySelector('a')?.focus());
  };

  const closeMobile = () => {
    setMobileOpen(false);
    menuButtonRef.current?.focus();
  };

  const renderDropdown = (group) => {
    const isOpen = openMenu === group.id;
    const isMega = group.items.length > 6;
    const panelId = `mtc-nav-panel-${group.id}`;

    return (
      <li
        key={group.id}
        className="relative"
        onPointerEnter={(e) => e.pointerType === 'mouse' && hoverOpen(group.id)}
        onPointerLeave={(e) => e.pointerType === 'mouse' && hoverClose()}
        onBlur={(e) => {
          if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) {
            setOpenMenu((current) => (current === group.id ? null : current));
          }
        }}
      >
        <button
          id={`mtc-nav-trigger-${group.id}`}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onPointerDown={(e) => { lastPointer.current = e.pointerType; }}
          onClick={() => handleTriggerClick(group.id)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              openAndFocusFirst(group.id);
            }
          }}
          className={`${DESKTOP_LINK} ${isOpen ? 'text-[#FB7E10] bg-orange-50' : 'text-gray-700 hover:text-[#FB7E10] hover:bg-orange-50'}`}
        >
          {group.shortLabel ? (
            <>
              <span className="xl:hidden">{group.shortLabel}</span>
              <span className="hidden xl:inline">{group.label}</span>
            </>
          ) : (
            group.label
          )}
          <ChevronDown size={15} aria-hidden="true" className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <div
          id={panelId}
          className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 duration-200 ease-out ${
            isOpen
              ? 'visible opacity-100 translate-y-0 transition-[opacity,translate]'
              : 'invisible opacity-0 translate-y-1 pointer-events-none transition-[opacity,translate,visibility]'
          }`}
        >
          <div className={`rounded-2xl bg-white border border-gray-100 shadow-2xl shadow-gray-900/10 p-2 ${isMega ? 'w-[34rem]' : 'w-64'}`}>
            {group.overview && (
              <a
                href={group.overview.href}
                className={`group flex items-center justify-between gap-3 rounded-xl bg-gray-50 hover:bg-orange-50 px-4 py-3 mb-1.5 transition-colors ${FOCUS_RING}`}
              >
                <span>
                  <span className="block text-sm font-black text-gray-900 group-hover:text-[#FB7E10] transition-colors">{group.overview.label}</span>
                  <span className="block text-xs font-medium text-gray-500">{group.overview.description}</span>
                </span>
                <ArrowRight size={16} aria-hidden="true" className="text-[#FB7E10] shrink-0 transition-transform group-hover:translate-x-0.5" />
              </a>
            )}
            <ul className={isMega ? 'grid grid-cols-2 gap-0.5' : 'flex flex-col gap-0.5'}>
              {group.items.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`block rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-[#FB7E10] transition-colors ${FOCUS_RING}`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </li>
    );
  };

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
              <span className="hidden sm:inline">24/7 Emergency Dispatch Active • 30–60 Min Arrival</span>
            </span>
          </div>
        </div>

        <div className={`bg-white/95 backdrop-blur-xl border-b border-gray-200 transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
          <nav ref={navRef} aria-label="Main" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`flex items-center justify-between gap-3 transition-[height] duration-300 ${scrolled ? 'h-14 lg:h-16' : 'h-16 lg:h-[76px]'}`}>

              {/* Logo → main site home */}
              <a href={MTC_HOME_URL} className={`shrink-0 rounded-lg ${FOCUS_RING}`}>
                <Image
                  src="/images/MTC logo 2.webp"
                  alt="Mobile Tyre Champions"
                  width={56}
                  height={56}
                  className={`transition-all duration-300 ${scrolled ? 'w-10 h-10 lg:w-11 lg:h-11' : 'w-11 h-11 lg:w-14 lg:h-14'}`}
                  priority
                />
              </a>

              {/* Desktop navigation */}
              <ul className="hidden lg:flex items-center gap-0.5 xl:gap-1">
                {MTC_NAV.map((entry) =>
                  entry.items ? (
                    renderDropdown(entry)
                  ) : (
                    <li key={entry.label}>
                      <a href={entry.href} className={`${DESKTOP_LINK} text-gray-700 hover:text-[#FB7E10] hover:bg-orange-50`}>
                        {entry.label}
                      </a>
                    </li>
                  )
                )}
              </ul>

              <div className="flex items-center gap-2 shrink-0">
                {/* Desktop call CTA */}
                <a
                  href={PHONE_HREF}
                  data-conversion="phone-call"
                  aria-label={`Call now on ${PHONE_DISPLAY}`}
                  className={`hidden lg:flex items-center gap-2.5 bg-[#FB7E10] hover:bg-orange-600 text-white pl-4 pr-5 py-2.5 rounded-xl shadow-lg shadow-orange-500/20 active:scale-95 transition-all ${FOCUS_RING}`}
                >
                  <Phone size={18} className="fill-current shrink-0" aria-hidden="true" />
                  <span className="flex flex-col leading-tight text-left">
                    <span className="font-black text-sm uppercase tracking-wider">Call Now</span>
                    <span className="hidden xl:block text-xs font-bold text-white/85 tracking-wide">{PHONE_DISPLAY}</span>
                  </span>
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
      <div aria-hidden="true" className="h-[97px] lg:h-[109px]" />

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
            <a href={MTC_HOME_URL} className={`rounded-lg ${FOCUS_RING}`}>
              <Image src="/images/MTC logo 2.webp" alt="Mobile Tyre Champions" width={44} height={44} className="w-11 h-11" />
            </a>
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
              {MTC_NAV.map((entry) => {
                if (!entry.items) {
                  return (
                    <li key={entry.label} className="border-b border-gray-100">
                      <a href={entry.href} className={`block py-4 text-base font-bold text-gray-900 hover:text-[#FB7E10] transition-colors rounded-lg ${FOCUS_RING}`}>
                        {entry.label}
                      </a>
                    </li>
                  );
                }

                const isOpen = mobileSection === entry.id;
                const panelId = `mtc-mobile-panel-${entry.id}`;
                const links = entry.overview ? [entry.overview, ...entry.items] : entry.items;
                return (
                  <li key={entry.id} className="border-b border-gray-100">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setMobileSection(isOpen ? null : entry.id)}
                      className={`w-full flex items-center justify-between py-4 text-base font-bold rounded-lg transition-colors ${isOpen ? 'text-[#FB7E10]' : 'text-gray-900'} ${FOCUS_RING}`}
                    >
                      {entry.label}
                      <ChevronDown size={20} aria-hidden="true" className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div
                      id={panelId}
                      inert={!isOpen}
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                    >
                      <div className="overflow-hidden">
                        <ul className="pb-3 flex flex-col">
                          {links.map((item) => (
                            <li key={item.href}>
                              <a
                                href={item.href}
                                className={`block py-2.5 pl-4 pr-2 border-l-2 border-gray-100 hover:border-[#FB7E10] text-[15px] font-semibold text-gray-600 hover:text-[#FB7E10] transition-colors ${FOCUS_RING}`}
                              >
                                {item.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                );
              })}
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
