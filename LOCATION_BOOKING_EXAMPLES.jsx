/**
 * ========================================
 * LOCATION BOOKING SYSTEM - CODE EXAMPLES
 * ========================================
 * 
 * This file shows code examples for using the location booking components
 * in different scenarios.
 */

// ============================================
// Example 1: Use LocationBookingForm directly
// ============================================

import LocationBookingForm from '@/components/LocationBookingForm';

export function BookingPage() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg p-8 shadow-lg">
        <LocationBookingForm googleMapsApiKey={apiKey} />
      </div>
    </div>
  );
}

// ============================================
// Example 2: Use PostcodeAutocomplete alone
// ============================================

import PostcodeAutocomplete from '@/components/PostcodeAutocomplete';
import { useState } from 'react';

export function QuickPostcodeLookup() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <div className="space-y-4">
      <h2>Find Your Location</h2>
      
      <PostcodeAutocomplete
        onSelect={(data) => {
          setSelectedLocation(data);
          console.log('Selected:', data);
          // Do something with the location data
        }}
        placeholder="Enter postcode to search..."
      />

      {selectedLocation && (
        <div className="p-4 bg-blue-50 rounded-lg">
          <p><strong>Postcode:</strong> {selectedLocation.postcode}</p>
          <p><strong>District:</strong> {selectedLocation.district}</p>
          <p><strong>Coordinates:</strong> {selectedLocation.latitude}, {selectedLocation.longitude}</p>
        </div>
      )}
    </div>
  );
}

// ============================================
// Example 3: Use MapPicker alone
// ============================================

import MapPicker from '@/components/MapPicker';
import { useState } from 'react';

export function LocationSelector() {
  const [location, setLocation] = useState(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <div className="space-y-4">
      <h2>Select Your Service Location</h2>
      
      <MapPicker
        initialLat={51.5074}
        initialLng={-0.1278}
        onLocationChange={(locData) => {
          setLocation(locData);
          console.log('Location changed:', locData);
        }}
        googleMapsApiKey={apiKey}
      />

      {location && (
        <button
          onClick={() => submitLocation(location)}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold"
        >
          Confirm Location
        </button>
      )}
    </div>
  );
}

// ============================================
// Example 4: Custom form using both components
// ============================================

import PostcodeAutocomplete from '@/components/PostcodeAutocomplete';
import MapPicker from '@/components/MapPicker';
import { useState } from 'react';

export function CustomBookingForm() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  
  const [formData, setFormData] = useState({
    postcode: '',
    latitude: 51.5074,
    longitude: -0.1278,
    address: ''
  });

  const handlePostcodeSelect = (postcodeData) => {
    setFormData(prev => ({
      ...prev,
      postcode: postcodeData.postcode,
      latitude: postcodeData.latitude,
      longitude: postcodeData.longitude,
      address: `${postcodeData.postcode}, ${postcodeData.district}`
    }));
  };

  const handleLocationChange = (locationData) => {
    setFormData(prev => ({
      ...prev,
      latitude: locationData.latitude,
      longitude: locationData.longitude,
      address: locationData.address
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Your custom submission logic here
    console.log('Form Data:', formData);
    
    // Example: Submit to custom endpoint
    const response = await fetch('/api/custom-booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    const result = await response.json();
    console.log('Response:', result);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto p-6 bg-white rounded-lg">
      <h2 className="text-2xl font-bold">Book Service</h2>

      {/* Postcode Selection */}
      <div>
        <label className="block font-semibold mb-2">Find by Postcode</label>
        <PostcodeAutocomplete
          onSelect={handlePostcodeSelect}
          placeholder="Enter UK postcode"
        />
      </div>

      {/* Map Refinement */}
      {formData.postcode && (
        <div>
          <label className="block font-semibold mb-2">Refine on Map</label>
          <MapPicker
            initialLat={formData.latitude}
            initialLng={formData.longitude}
            onLocationChange={handleLocationChange}
            googleMapsApiKey={apiKey}
          />
        </div>
      )}

      {/* Selected Address Display */}
      {formData.address && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm font-semibold text-green-900">Selected Address:</p>
          <p className="text-green-700">{formData.address}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700"
      >
        Submit Booking
      </button>
    </form>
  );
}

// ============================================
// Example 5: Handle postcode data programmatically
// ============================================

export function PostcodeDataExample() {
  /**
   * When you select a postcode, you get this data structure:
   */
  const postcodeData = {
    postcode: "GU11 3HY",
    latitude: 51.1476,
    longitude: -0.7488,
    district: "East Hampshire",
    region: "Hampshire"
  };

  /**
   * When map location changes, you get this data structure:
   */
  const locationData = {
    latitude: 51.1476,
    longitude: -0.7488,
    address: "123 Main Street, Aldershot, Hampshire GU11 3HY"
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg space-y-4">
      <h3>Data Structures</h3>
      
      <div>
        <p className="font-bold">Postcode Select Data:</p>
        <pre className="bg-white p-4 rounded overflow-x-auto">
          {JSON.stringify(postcodeData, null, 2)}
        </pre>
      </div>

      <div>
        <p className="font-bold">Location Change Data:</p>
        <pre className="bg-white p-4 rounded overflow-x-auto">
          {JSON.stringify(locationData, null, 2)}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// Example 6: Advanced - Custom API Integration
// ============================================

export function AdvancedBookingFlow() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [step, setStep] = useState('postcode'); // 'postcode' | 'map' | 'details' | 'confirm'
  const [bookingData, setBookingData] = useState({
    postcode: '',
    latitude: 51.5074,
    longitude: -0.1278,
    address: '',
    name: '',
    phone: ''
  });

  const handlePostcodeSelect = (data) => {
    setBookingData(prev => ({
      ...prev,
      postcode: data.postcode,
      latitude: data.latitude,
      longitude: data.longitude,
      address: `${data.postcode}, ${data.district}`
    }));
    setStep('map'); // Move to next step
  };

  const handleLocationChange = (data) => {
    setBookingData(prev => ({
      ...prev,
      latitude: data.latitude,
      longitude: data.longitude,
      address: data.address
    }));
  };

  const handleFinalSubmit = async () => {
    // Custom submission with your API
    const response = await fetch('https://your-api.com/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });

    if (response.ok) {
      setStep('confirm');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Step 1: Postcode */}
      {step === 'postcode' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Step 1: Find Location</h2>
          <PostcodeAutocomplete
            onSelect={handlePostcodeSelect}
          />
        </div>
      )}

      {/* Step 2: Map Refinement */}
      {step === 'map' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Step 2: Confirm on Map</h2>
          <button
            onClick={() => setStep('postcode')}
            className="text-blue-600 underline mb-4"
          >
            ← Back to Postcode
          </button>
          <MapPicker
            initialLat={bookingData.latitude}
            initialLng={bookingData.longitude}
            onLocationChange={handleLocationChange}
            googleMapsApiKey={apiKey}
          />
          <button
            onClick={() => setStep('details')}
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            Continue →
          </button>
        </div>
      )}

      {/* Step 3: Details */}
      {step === 'details' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Step 3: Your Details</h2>
          <input
            type="text"
            placeholder="Your Name"
            onChange={(e) => setBookingData(prev => ({
              ...prev,
              name: e.target.value
            }))}
            className="w-full border rounded-lg p-2"
          />
          <input
            type="tel"
            placeholder="Your Phone"
            onChange={(e) => setBookingData(prev => ({
              ...prev,
              phone: e.target.value
            }))}
            className="w-full border rounded-lg p-2"
          />
          <button
            onClick={() => setStep('confirm')}
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            Review & Confirm →
          </button>
        </div>
      )}

      {/* Step 4: Confirmation */}
      {step === 'confirm' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Confirm Booking</h2>
          <div className="p-4 bg-blue-50 rounded-lg space-y-2">
            <p><strong>Location:</strong> {bookingData.address}</p>
            <p><strong>Name:</strong> {bookingData.name}</p>
            <p><strong>Phone:</strong> {bookingData.phone}</p>
          </div>
          <button
            onClick={handleFinalSubmit}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-bold"
          >
            Submit Booking
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================
// Export all examples
// ============================================

export {
  BookingPage,
  QuickPostcodeLookup,
  LocationSelector,
  CustomBookingForm,
  PostcodeDataExample,
  AdvancedBookingFlow
};
