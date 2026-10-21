import React from 'react';
import LandingHeader from '@/components/landing/LandingHeader';
import LandingHero from '@/components/landing/LandingHero';
import LandingTrustBar from '@/components/landing/LandingTrustBar';
import LandingPostcodeChecker from '@/components/landing/LandingPostcodeChecker';
import LandingWhyGarage from '@/components/landing/LandingWhyGarage';
import LandingHowItWorks from '@/components/landing/LandingHowItWorks';
import LandingCoverage from '@/components/landing/LandingCoverage';
import LandingCorridors from '@/components/landing/LandingCorridors';
import LandingReviews from '@/components/landing/LandingReviews';
import LandingQuoteForm from '@/components/landing/LandingQuoteForm';
import LandingFAQ from '@/components/landing/LandingFAQ';
import LandingFinalCTA from '@/components/landing/LandingFinalCTA';
import LandingFooter from '@/components/landing/LandingFooter';
import LandingMobileStickyBar from '@/components/landing/LandingMobileStickyBar';
import LandingWhatsAppFloat from '@/components/landing/LandingWhatsAppFloat';

// The page is served at /landing and /landing-page too, but LANDING_URL is the SEO
// target from the content brief and the canonical all three versions point at.
const LANDING_URL = 'https://mobiletyrechampions.com/emergency-mobile-tyre-fitting-surrey-hampshire/';

export const metadata = {
  title: '24/7 Mobile Tyre Fitting Surrey & Hampshire | Tyre Champions',
  description: `Flat tyre in Camberley, Farnborough, Guildford, Portsmouth or Southampton? 24/7 mobile tyre fitting, typical 30–60 min arrival. Call 0207 101 3856.`,
  openGraph: {
    title: '24/7 Mobile Tyre Fitting Surrey & Hampshire | Tyre Champions',
    description: `Flat tyre in Camberley, Farnborough, Guildford, Portsmouth or Southampton? 24/7 mobile tyre fitting, typical 30–60 min arrival. Call 0207 101 3856.`,
    url: LANDING_URL,
    siteName: 'Mobile Tyre Champions',
    images: [
      {
        url: 'https://mobiletyrechampions.com/images/mobile-tyre-champions-van1.webp',
        width: 1200,
        height: 630,
        alt: 'Mobile Tyre Champions 24/7 Service Van'
      }
    ],
    locale: 'en_GB',
    type: 'website',
  },
  alternates: {
    canonical: LANDING_URL
  }
};

const landingSchema = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "@id": `${LANDING_URL}#business`,
  name: "Mobile Tyre Champions",
  url: LANDING_URL,
  logo: "https://mobiletyrechampions.com/images/MTC%20logo%202.webp",
  image: "https://mobiletyrechampions.com/images/mobile-tyre-champions-van1.webp",
  telephone: "+44-207-101-3856",
  email: "info@mobiletyrechampions.com",
  description: "24/7 emergency mobile tyre fitting, puncture repair and roadside tyre assistance across Surrey, Hampshire and Berkshire.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Grosvenor Road",
    addressLocality: "Aldershot",
    addressRegion: "Hampshire",
    postalCode: "GU11 3HY",
    addressCountry: "GB"
  },
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    opens: "00:00",
    closes: "23:59"
  }],
  areaServed: [
    { "@type": "AdministrativeArea", name: "Surrey" },
    { "@type": "AdministrativeArea", name: "Hampshire" },
    { "@type": "AdministrativeArea", name: "Berkshire" },
    { "@type": "Place", name: "Aldershot" },
    { "@type": "Place", name: "Farnham" },
    { "@type": "Place", name: "Guildford" },
    { "@type": "Place", name: "Camberley" },
    { "@type": "Place", name: "Woking" },
    { "@type": "Place", name: "Basingstoke" },
    { "@type": "Place", name: "Farnborough" },
    { "@type": "Place", name: "Yateley" },
    { "@type": "Place", name: "Portsmouth" },
    { "@type": "Place", name: "Southampton" }
  ],
  priceRange: "££"
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-['Outfit'] selection:bg-[#FB7E10] selection:text-white">
      {/* Schema Markup for Google & Local SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(landingSchema) }}
      />

      {/* 1. Header (24/7 status strip + main-site navigation linking to mobiletyrechampions.com + Call CTA) */}
      <LandingHeader />

      {/* 2. Hero — Emergency Response */}
      <LandingHero />

      {/* 3. Emergency Status / Trust Strip */}
      <LandingTrustBar />

      {/* 4. Primary Conversion Section (HOW CLOSE IS YOUR TYRE TECHNICIAN?) */}
      <LandingPostcodeChecker />

      {/* 5. "WHY DRIVE TO A GARAGE?" (Visual Comparison) */}
      <LandingWhyGarage />

      {/* 7. How It Works (FROM STRANDED TO MOVING) */}
      <LandingHowItWorks />

      {/* 8. Service Areas (MOBILE TYRE FITTING IN YOUR AREA) */}
      <LandingCoverage />

      {/* 8b. Local Corridor Coverage (town-level detail + coverage map) */}
      <LandingCorridors />

      {/* 9. Social Proof (Verified Customer Testimonials) */}
      <LandingReviews />

      {/* 9b. Callback Request Form (name, number, location, tyre, service) */}
      <LandingQuoteForm />

      {/* 10. FAQ (Accessible Compact Accordions) */}
      <LandingFAQ />

      {/* 11. Final Conversion Section (STILL STUCK? LET'S GET YOU MOVING.) */}
      <LandingFinalCTA />

      {/* 12. Minimal Conversion Footer */}
      <LandingFooter />

      {/* 13. Mobile Sticky Bottom Conversion Bar */}
      <LandingMobileStickyBar />

      {/* 14. Floating WhatsApp Chat Button (right side) */}
      <LandingWhatsAppFloat />
    </div>
  );
}
