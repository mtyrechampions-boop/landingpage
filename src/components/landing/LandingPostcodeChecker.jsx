'use client';

import React, { useState } from 'react';
import { MapPin, ArrowRight, Phone, Radio } from 'lucide-react';
import { validateUKPostcode } from '../../api/appointmentService';

const LandingPostcodeChecker = () => {
  const [postcode, setPostcode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postcode.trim()) {
      setError('Please enter your UK postcode');
      return;
    }
    if (!validateUKPostcode(postcode)) {
      setError('Please enter a valid UK postcode (e.g. GU11 3HY)');
      return;
    }
    window.location.href = `https://mobiletyrechampions.com/booking?postcode=${encodeURIComponent(postcode.trim().toUpperCase())}`;
  };

  return (
    <section id="postcode-checker" className="bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
      <div className="max-w-3xl mx-auto text-center">
        
        <div className="inline-flex items-center gap-2 bg-[#FB7E10]/10 border border-[#FB7E10]/20 text-[#FB7E10] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4">
          <Radio size={14} />
          <span>Live Technician Lookup</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 leading-tight mb-3">
          HOW CLOSE IS YOUR<br />
          <span className="text-[#FB7E10]">TYRE TECHNICIAN?</span>
        </h2>

        <p className="text-gray-500 text-base sm:text-lg mb-8 max-w-xl mx-auto">
          Enter your UK postcode below and we'll instantly check the nearest available mobile tyre fitter to your location.
        </p>

        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-[#FB7E10]" />
              </div>
              <input
                type="text"
                value={postcode}
                onChange={(e) => {
                  setPostcode(e.target.value);
                  setError('');
                }}
                placeholder="Enter Postcode (e.g. GU11 3HY)"
                className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 ${
                  error ? 'border-red-400' : 'border-gray-200'
                } rounded-2xl text-gray-900 font-bold text-base placeholder:text-gray-400 focus:border-[#FB7E10] focus:bg-white focus:outline-none transition-all`}
              />
            </div>

            <button
              type="submit"
              data-conversion="availability-check"
              className="bg-[#FB7E10] hover:bg-orange-600 text-white py-4 px-8 rounded-2xl font-black text-sm uppercase tracking-wider shadow-lg shadow-orange-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>CHECK NOW</span>
              <ArrowRight size={18} />
            </button>
          </div>

          {error && (
            <p className="mt-2 text-sm font-bold text-red-500 text-left pl-1">{error}</p>
          )}
        </form>

        <div className="mt-6 flex items-center justify-center gap-6 text-xs font-semibold text-gray-400">
          <span>⏱ Results in seconds</span>
          <span>📍 Real-time availability</span>
          <span>🔒 No obligation</span>
        </div>

      </div>
    </section>
  );
};

export default LandingPostcodeChecker;
