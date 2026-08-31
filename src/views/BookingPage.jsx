'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Phone, Calendar, MapPin, ChevronDown, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import dynamic from 'next/dynamic';
import { submitAppointment, validateUKPhoneNumber } from '../api/appointmentService';

// Dynamically import LeafletMap component with ssr disabled
const LeafletMap = dynamic(() => import('../components/LeafletMap'), { ssr: false });

const BookingPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPostcode = searchParams.get('postcode') || '';

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    vehicleReg: '',
    postcode: initialPostcode,
    tyreWidth: '',
    profile: '',
    rim: '',
    speed: '',
    timingSlot: 'Slot 7am - 12pm',
    locationNotes: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [mapCenter, setMapCenter] = useState([51.5074, -0.1278]); // Default London [lat, lng]
  const [isGeocoding, setIsGeocoding] = useState(false);

  useEffect(() => {
    if (initialPostcode) {
      geocodePostcode(initialPostcode);
    }
  }, [initialPostcode]);

  const geocodePostcode = async (pc) => {
    setIsGeocoding(true);
    try {
      // Using postcodes.io for free UK geocoding
      const response = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(pc)}`);
      const data = await response.json();
      
      if (data.status === 200 && data.result) {
        setMapCenter([data.result.latitude, data.result.longitude]);
      }
    } catch (err) {
      console.error('Geocoding error:', err);
    } finally {
      setIsGeocoding(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.fullName.trim()) return setError('Name is required');
    if (!formData.phoneNumber.trim()) return setError('Phone number is required');
    if (!validateUKPhoneNumber(formData.phoneNumber)) return setError('Invalid UK phone number');
    // Email required and basic validation
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) return setError('Email is required');
    if (!emailRe.test(formData.email.trim())) return setError('Please enter a valid email address');
    if (!formData.vehicleReg.trim()) return setError('Vehicle registration is required');
    if (!formData.tyreWidth || !formData.profile || !formData.rim || !formData.speed) {
      return setError('Please provide all tyre details');
    }

    setLoading(true);
    setError('');

    try {
      const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formData.postcode + ' ' + (formData.locationNotes || ''))}`;
      
      const appointmentData = {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        serviceType: 'Mobile Tyre Fitting',
        tyreSize: `${formData.tyreWidth}/${formData.profile} R${formData.rim} ${formData.speed}`,
        timingSlot: formData.timingSlot,
        postcode: formData.postcode,
        address: formData.locationNotes || 'See Notes',
        locationNotes: `${formData.locationNotes}\n\n📍 View on Maps: ${googleMapsLink}`,
        vehicleReg: formData.vehicleReg
      };
      
      // Removed latitude and longitude as requested

      await submitAppointment(appointmentData);
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err.message || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen pt-16 md:pt-20 pb-12 font-['Outfit']">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight uppercase leading-[1.1]">
            Good News! We Have A Mobile <br className="md:hidden" /> Tyre Fitter Available Near You!
          </h1>
          <p className="text-xs md:text-base text-gray-500 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            <MapPin size={16} className="text-[#FB7E10]" />
            Location found for: <span className="text-black">{formData.postcode || 'Unknown'}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* Left: Leaflet Map */}
          <div className="bg-gray-100 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-xl md:shadow-2xl border-4 border-white h-[300px] md:h-[500px] lg:h-[650px] lg:sticky lg:top-24 z-10">
            <LeafletMap mapCenter={mapCenter} postcode={formData.postcode} />
            
            {isGeocoding && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-[1000]">
                <Loader className="animate-spin text-[#FB7E10]" size={30} />
              </div>
            )}
          </div>

          {/* Right: Form */}
          <div className="bg-slate-50 p-5 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-gray-100 mb-8">
            {success ? (
              <div className="text-center py-8 md:py-12 space-y-6">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={40} className="md:w-12 md:h-12" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 uppercase">Booking Confirmed!</h2>
                <p className="text-gray-600 font-medium text-base md:text-lg">
                  Thank you, {formData.fullName}. Our team will call you at {formData.phoneNumber} shortly to confirm your service.
                </p>
                <button
                  onClick={() => router.push('/')}
                  className="bg-[#0B1528] text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-slate-900 transition-all"
                >
                  Back to Homepage
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start gap-3">
                    <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
                    <p className="text-red-700 text-sm font-bold">{error}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-3.5 focus:border-[#FB7E10] focus:ring-0 transition-all font-semibold outline-none shadow-sm"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phoneNumber"
                      placeholder="Phone Number"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-3.5 focus:border-[#FB7E10] focus:ring-0 transition-all font-semibold outline-none shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-3.5 focus:border-[#FB7E10] focus:ring-0 transition-all font-semibold outline-none shadow-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="vehicleReg"
                      placeholder="Your Vehicle Reg. No."
                      value={formData.vehicleReg}
                      onChange={handleInputChange}
                      className="w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-3.5 focus:border-[#FB7E10] focus:ring-0 transition-all font-semibold outline-none shadow-sm"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="postcode"
                      placeholder="Postcode"
                      value={formData.postcode}
                      readOnly
                      className="w-full bg-gray-200 border-2 border-gray-200 rounded-xl px-4 py-3.5 font-black uppercase outline-none cursor-not-allowed text-gray-500"
                    />
                  </div>
                </div>

                {/* Location Notes / Full Address */}
                <div>
                  <textarea
                    name="locationNotes"
                    placeholder="Type your full address or any location notes here..."
                    value={formData.locationNotes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-3.5 focus:border-[#FB7E10] focus:ring-0 transition-all font-semibold outline-none resize-none shadow-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <select
                      name="tyreWidth"
                      value={formData.tyreWidth}
                      onChange={handleInputChange}
                      className="w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-3.5 appearance-none font-semibold focus:border-[#FB7E10] outline-none shadow-sm"
                    >
                      <option value="">Tyre Width</option>
                      <option>195</option>
                      <option>205</option>
                      <option>215</option>
                      <option>225</option>
                      <option>235</option>
                      <option>245</option>
                      <option>255</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                  </div>
                  <div className="relative">
                    <select
                      name="profile"
                      value={formData.profile}
                      onChange={handleInputChange}
                      className="w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-3.5 appearance-none font-semibold focus:border-[#FB7E10] outline-none shadow-sm"
                    >
                      <option value="">Profile</option>
                      <option>35</option>
                      <option>40</option>
                      <option>45</option>
                      <option>50</option>
                      <option>55</option>
                      <option>60</option>
                      <option>65</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <select
                      name="rim"
                      value={formData.rim}
                      onChange={handleInputChange}
                      className="w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-3.5 appearance-none font-semibold focus:border-[#FB7E10] outline-none shadow-sm"
                    >
                      <option value="">Rim</option>
                      <option>15</option>
                      <option>16</option>
                      <option>17</option>
                      <option>18</option>
                      <option>19</option>
                      <option>20</option>
                      <option>21</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                  </div>
                  <div className="relative">
                    <select
                      name="speed"
                      value={formData.speed}
                      onChange={handleInputChange}
                      className="w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-3.5 appearance-none font-semibold focus:border-[#FB7E10] outline-none shadow-sm"
                    >
                      <option value="">Speed</option>
                      <option>H</option>
                      <option>V</option>
                      <option>W</option>
                      <option>Y</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-black text-gray-900 uppercase tracking-widest">Select Your Time Slot</p>
                  <div className="grid grid-cols-3 gap-2">
                    {['Slot 7am - 12pm', 'Slot 12pm - 5pm', 'Slot 5pm - 12am'].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, timingSlot: slot }))}
                        className={`py-3 px-1 rounded-xl text-[10px] md:text-xs font-bold border-2 transition-all ${
                          formData.timingSlot === slot
                            ? 'border-[#FB7E10] bg-orange-50 text-[#FB7E10]'
                            : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
                        }`}
                      >
                        {slot.replace('Slot ', '')}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <a
                    href="tel:02071013856"
                    className="w-full bg-[#FB7E10] hover:bg-orange-600 text-white py-4 md:py-5 rounded-2xl font-black uppercase tracking-tight shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-3 text-base md:text-lg text-center"
                  >
                    <Phone size={20} className="md:w-[22px] md:h-[22px]" fill="currentColor" />
                    Call Now for Express Service
                  </a>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#FB7E10] hover:bg-orange-600 text-white py-4 md:py-5 rounded-2xl font-black uppercase tracking-tight shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-3 text-base md:text-lg"
                  >
                    {loading ? (
                      <Loader className="animate-spin" size={24} />
                    ) : (
                      <>
                        <Calendar size={22} />
                        Book An Appointment
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
