import React from 'react';
import LandingHeader from '../landing/LandingHeader';
import LandingFooter from '../landing/LandingFooter';
import LandingMobileStickyBar from '../landing/LandingMobileStickyBar';
import LandingWhatsAppFloat from '../landing/LandingWhatsAppFloat';

/**
 * Header, footer, sticky call bar and WhatsApp button for every page other than the landing page.
 * Their in-page anchors become "/#section" links back to the landing page.
 */
const PageShell = ({ children }) => (
  <div className="min-h-screen bg-white text-gray-900 font-['Outfit'] selection:bg-[#FB7E10] selection:text-white">
    <LandingHeader homeHref="/" />
    <main id="main">{children}</main>
    <LandingFooter homeHref="/" />
    <LandingMobileStickyBar homeHref="/" />
    <LandingWhatsAppFloat />
  </div>
);

export default PageShell;
