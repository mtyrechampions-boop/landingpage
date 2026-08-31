'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showCustomise, setShowCustomise] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true
    analytics: true,
    marketing: true,
  });

  useEffect(() => {
    setMounted(true);
    const savedConsent = localStorage.getItem('cookie-consent-preferences');
    if (!savedConsent) {
      // Delay slightly for a smoother appearance
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!mounted || !isOpen) return null;

  const handleAcceptAll = () => {
    const allPreferences = { necessary: true, analytics: true, marketing: true };
    localStorage.setItem('cookie-consent-preferences', JSON.stringify(allPreferences));
    setIsOpen(false);
  };

  const handleRejectAll = () => {
    const minPreferences = { necessary: true, analytics: false, marketing: false };
    localStorage.setItem('cookie-consent-preferences', JSON.stringify(minPreferences));
    setIsOpen(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookie-consent-preferences', JSON.stringify(preferences));
    setIsOpen(false);
  };

  const togglePreference = (key) => {
    if (key === 'necessary') return; // Cannot turn off necessary cookies
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 md:right-auto md:left-8 md:bottom-8 md:max-w-md w-auto z-[9999] animate-fade-in">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-6 md:p-7 text-slate-800 font-sans">
        <h3 className="text-xl font-bold text-slate-900 mb-2.5">
          We value your privacy
        </h3>
        
        <p className="text-sm text-slate-600 leading-relaxed mb-5">
          We use cookies to enhance your browsing experience, serve personalised ads or content, and analyse our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies. Read our{' '}
          <Link href="/cookies" className="text-[#FB7E10] hover:underline font-medium">
            Cookie Policy
          </Link>{' '}
          for details.
        </p>

        {/* Customise Cookie Preferences panel */}
        {showCustomise && (
          <div className="border-t border-slate-100 pt-4 mt-4 mb-5 space-y-3.5 transition-all duration-300 animate-slide-down">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Cookie Preferences
            </h4>
            
            {/* Necessary */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800">Essential Cookies</p>
                <p className="text-xs text-slate-500">Required for website functionality. Cannot be disabled.</p>
              </div>
              <div className="relative inline-flex items-center">
                <input
                  type="checkbox"
                  disabled
                  checked={preferences.necessary}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#FB7E10]/50 opacity-60"></div>
              </div>
            </div>

            {/* Analytics */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800">Analytics & Performance</p>
                <p className="text-xs text-slate-500">Helps us understand how visitors interact with our website.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={() => togglePreference('analytics')}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#FB7E10]"></div>
              </label>
            </div>

            {/* Marketing */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800">Marketing & Personalisation</p>
                <p className="text-xs text-slate-500">Used to deliver relevant ads and content to your interests.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={() => togglePreference('marketing')}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#FB7E10]"></div>
              </label>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-2 justify-end text-sm font-semibold">
          {!showCustomise ? (
            <>
              <button
                type="button"
                onClick={() => setShowCustomise(true)}
                className="w-full sm:w-auto px-4 py-2.5 text-center text-slate-700 border border-slate-300 hover:border-[#FB7E10] hover:text-[#FB7E10] rounded-xl transition-all duration-200 cursor-pointer"
              >
                Customise
              </button>
              <button
                type="button"
                onClick={handleRejectAll}
                className="w-full sm:w-auto px-4 py-2.5 text-center text-slate-700 border border-slate-300 hover:border-[#FB7E10] hover:text-[#FB7E10] rounded-xl transition-all duration-200 cursor-pointer"
              >
                Reject All
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="w-full sm:w-auto px-5 py-2.5 text-center text-white bg-[#FB7E10] hover:bg-orange-600 rounded-xl shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
              >
                Accept All
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setShowCustomise(false)}
                className="w-full sm:w-auto px-4 py-2.5 text-center text-slate-500 hover:text-slate-700 rounded-xl transition-all duration-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSavePreferences}
                className="w-full sm:w-auto px-5 py-2.5 text-center text-white bg-[#FB7E10] hover:bg-orange-600 rounded-xl shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
              >
                Save Preferences
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
