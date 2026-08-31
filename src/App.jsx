import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
// Navbar is provided by Next.js `src/app/layout.js`. To avoid duplicate
// navigation when running under the Next app router, do not render Navbar
// from this SPA entry. Keep the import commented for reference.
// import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Process from './components/Process';
import Services from './components/Services';
import RecentFittings from './components/RecentFittings';
import HowToReadTyre from './components/HowToReadTyre';
import CTA from './components/CTA';
// Footer handled by Next layout; commented out to avoid duplicate rendering
// import Footer from './components/Footer';
import HowItWorks from './components/HowItWorks';
import FAQ from './components/FAQ';
import AboutPage from './pages/AboutPage';
import TyreFinderPage from './pages/TyreFinderPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';
import LocationsPage from './pages/LocationsPage';
import ServiceDetail from './pages/ServiceDetail';
// Global UI handled by Next layout; comment out to avoid duplication
// import WhatsAppButton from './components/WhatsAppButton';
// import FloatingCallButton from './components/FloatingCallButton';
import LockingWheelNutRemoval from './pages/LockingWheelNutRemoval';
import TrailerTyreFitting from './pages/TrailerTyreFitting';
import EmergencyTyreFitting from './pages/EmergencyTyreFitting';
import MobileTyreFitting from './pages/MobileTyreFitting';
import PunctureRepair from './pages/PunctureRepair';
// TyrePartners is rendered in Next layout; avoid duplicate
// import TyrePartners from './components/TyrePartners';
import NotFoundPage from './pages/NotFoundPage';
import BookingPage from './pages/BookingPage';

/* ── Scroll to top on route change ─────────────────────────────────────── */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

/* ── Home page assembled from components ─────────────────────────────────── */
const HomePage = () => (
  <>
    <Hero />
    <Features />
    <Process />
    <HowToReadTyre />
    <Services />
    <RecentFittings />
    <HowItWorks />
    <FAQ />
    <CTA />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 font-['Outfit']">
        <ScrollToTop />
        {/* TyrePartners handled by layout */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/find-tyres" element={<TyreFinderPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/emergency-tyre-fitting" element={<EmergencyTyreFitting />} />
          <Route path="/services/mobile-tyre-fitting" element={<MobileTyreFitting />} />
          <Route path="/services/puncture-repair" element={<PunctureRepair />} />
          <Route path="/services/locking-wheel-nut-removal" element={<LockingWheelNutRemoval />} />
          <Route path="/services/trailer-tyre-fitting" element={<TrailerTyreFitting />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {/* Footer, WhatsAppButton, FloatingCallButton handled by layout */}
      </div>
    </BrowserRouter>
  );
}

export default App;
