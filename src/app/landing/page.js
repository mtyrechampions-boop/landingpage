import React from 'react';
import LandingHeader from '@/components/landing/LandingHeader';
import LandingHero from '@/components/landing/LandingHero';
import LandingTrustBar from '@/components/landing/LandingTrustBar';
import LandingPostcodeChecker from '@/components/landing/LandingPostcodeChecker';
import LandingWhyGarage from '@/components/landing/LandingWhyGarage';
import LandingProblemSelector from '@/components/landing/LandingProblemSelector';
import LandingHowItWorks from '@/components/landing/LandingHowItWorks';
import LandingCoverage from '@/components/landing/LandingCoverage';
import LandingReviews from '@/components/landing/LandingReviews';
import LandingFAQ from '@/components/landing/LandingFAQ';
import LandingFinalCTA from '@/components/landing/LandingFinalCTA';
import LandingFooter from '@/components/landing/LandingFooter';
import LandingMobileStickyBar from '@/components/landing/LandingMobileStickyBar';
import { SERVICE_AREAS_TEXT } from '@/lib/siteText';

export const metadata = {
  title: '24/7 Mobile Tyre Fitting | Mobile Tyre Champions',
  description: `24/7 emergency mobile tyre fitting at home, work or roadside across Surrey, Hampshire, Berkshire and surrounding areas. Typical arrival in 30–60 minutes. Call 0207 101 3856.`,
  openGraph: {
    title: '24/7 Mobile Tyre Fitting — We Come To You | Mobile Tyre Champions',
    description: `Emergency 24/7 mobile tyre fitting and roadside tyre assistance across Surrey, Hampshire, Berkshire. Typical arrival in 30–60 minutes.`,
    url: 'https://mobiletyrechampions.com/landing',
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
    canonical: 'https://mobiletyrechampions.com/landing'
  }
};

const landingSchema = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "@id": "https://mobiletyrechampions.com/landing#business",
  name: "Mobile Tyre Champions",
  url: "https://mobiletyrechampions.com/landing",
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
    { "@type": "Place", name: "Basingstoke" }
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

      {/* 6. Service Problem Selector (WHAT'S WRONG WITH YOUR TYRE?) */}
      <LandingProblemSelector />

      {/* 7. How It Works (FROM STRANDED TO MOVING) */}
      <LandingHowItWorks />

      {/* 8. Service Areas (MOBILE TYRE FITTING IN YOUR AREA) */}
      <LandingCoverage />

      {/* 9. Social Proof (Verified Customer Testimonials) */}
      <LandingReviews />

      {/* 10. FAQ (Accessible Compact Accordions) */}
      <LandingFAQ />

      {/* 11. Final Conversion Section (STILL STUCK? LET'S GET YOU MOVING.) */}
      <LandingFinalCTA />

      {/* 12. Minimal Conversion Footer */}
      <LandingFooter />

      {/* 13. Mobile Sticky Bottom Conversion Bar */}
      <LandingMobileStickyBar />
    </div>
  );
}
