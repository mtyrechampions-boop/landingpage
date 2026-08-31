/**
 * Appointment Service API Integration Examples
 * =============================================
 * Complete examples and usage patterns for the appointmentService
 * 
 * This file demonstrates how to use the appointmentService in your React components
 */

// ============================================
// 1. BASIC COMPONENT INTEGRATION
// ============================================

/**
 * Basic example showing how to integrate appointmentService into a React component
 */
import React, { useState } from 'react';
import { submitAppointment, validateUKPhoneNumber, validateUKPostcode } from '../api/appointmentService';

export const BasicIntegrationExample = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await submitAppointment({
        fullName: 'John Doe',
        phoneNumber: '+44 207 101 3856',
        serviceType: 'Tyre Replacement',
        tyreSize: '225/45 R17',
        timingSlot: 'Morning (8AM - 12PM)',
        postcode: 'GU11 3HY',
        address: '123 High Street, GU11 3HY',
        latitude: 51.1476,
        longitude: -0.7488
      });

      setSuccess(true);
      console.log('Success:', result.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">Appointment submitted!</div>}
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Appointment'}
      </button>
    </div>
  );
};


// ============================================
// 2. FORM VALIDATION EXAMPLES
// ============================================

/**
 * Examples of using validation functions from appointmentService
 */

// Validate UK phone number
console.log(validateUKPhoneNumber('+44 207 101 3856')); // true
console.log(validateUKPhoneNumber('02071013856'));      // true
console.log(validateUKPhoneNumber('(020) 7101 3856')); // true
console.log(validateUKPhoneNumber('123456'));           // false

// Validate UK postcode
console.log(validateUKPostcode('GU11 3HY'));     // true
console.log(validateUKPostcode('SW1A 1AA'));     // true
console.log(validateUKPostcode('GU113HY'));      // true (also accepts without space)
console.log(validateUKPostcode('INVALID'));      // false

// Custom validation hook for React components
export const useFormValidation = (initialData) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'phoneNumber':
        if (!validateUKPhoneNumber(value)) {
          setErrors(prev => ({ ...prev, phoneNumber: 'Invalid UK phone number' }));
          return false;
        }
        setErrors(prev => ({ ...prev, phoneNumber: '' }));
        return true;

      case 'postcode':
        if (!validateUKPostcode(value)) {
          setErrors(prev => ({ ...prev, postcode: 'Invalid UK postcode' }));
          return false;
        }
        setErrors(prev => ({ ...prev, postcode: '' }));
        return true;

      case 'fullName':
        if (value.trim().length < 2) {
          setErrors(prev => ({ ...prev, fullName: 'Name must be at least 2 characters' }));
          return false;
        }
        setErrors(prev => ({ ...prev, fullName: '' }));
        return true;

      default:
        return true;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  return { formData, errors, handleChange, setFormData };
};


// ============================================
// 3. ERROR HANDLING EXAMPLES
// ============================================

/**
 * Complete error handling example with detailed scenarios
 */
export const ErrorHandlingExample = async () => {
  const appointmentData = {
    fullName: 'John Doe',
    phoneNumber: '+44 207 101 3856',
    serviceType: 'Tyre Replacement',
    tyreSize: '225/45 R17',
    timingSlot: 'Morning (8AM - 12PM)',
    postcode: 'GU11 3HY',
    address: '123 High Street, GU11 3HY',
    latitude: 51.1476,
    longitude: -0.7488
  };

  try {
    const result = await submitAppointment(appointmentData);
    console.log('Appointment submitted successfully:', result.data);

  } catch (error) {
    // Handle different error scenarios
    if (error.message.includes('Network error')) {
      console.error('Network issue - user is offline or API is unreachable');
      // Show offline message to user

    } else if (error.message.includes('Invalid UK phone number')) {
      console.error('Phone number format error - guide user to correct format');
      // Show phone format hint

    } else if (error.message.includes('API Error')) {
      console.error('Strapi backend error - possible misconfiguration');
      // Check Strapi logs and configuration

    } else {
      console.error('General error:', error.message);
      // Show generic error message
    }
  }
};


// ============================================
// 4. LOCATION BOOKING FORM INTEGRATION
// ============================================

/**
 * Full integration example with LocationBookingForm component
 * This is how it's implemented in src/components/LocationBookingForm.jsx
 */
export const LocationBookingFormIntegrationExample = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    postcode: '',
    address: '',
    latitude: 51.5074,
    longitude: -0.1278,
    serviceType: '',
    tyreSize: '',
    timingSlot: 'As Soon As Possible'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // All validation happens inside submitAppointment
      // It will throw an error if any validation fails
      const result = await submitAppointment(formData);
      
      setSuccess(true);
      
      // Reset form
      setFormData({
        fullName: '',
        phoneNumber: '',
        postcode: '',
        address: '',
        latitude: 51.5074,
        longitude: -0.1278,
        serviceType: '',
        tyreSize: '',
        timingSlot: 'As Soon As Possible'
      });

      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error-alert">{error}</div>}
      {success && <div className="success-alert">Appointment submitted successfully!</div>}
      
      <input
        name="fullName"
        value={formData.fullName}
        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        placeholder="Full Name"
      />
      
      <input
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
        placeholder="+44 (0) 207 101 3856"
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Appointment'}
      </button>
    </form>
  );
};


// ============================================
// 5. API PAYLOAD EXAMPLES
// ============================================

/**
 * Example payloads sent to Strapi
 */

// Valid appointment payload
const validAppointmentPayload = {
  data: {
    fullName: 'John Doe',
    phoneNumber: '+44 207 101 3856',
    serviceType: 'Tyre Replacement',
    tyreSize: '225/45 R17',
    timingSlot: 'Morning (8AM - 12PM)',
    postcode: 'GU11 3HY',
    address: '123 High Street, Aldershot, GU11 3HY',
    latitude: 51.1476,
    longitude: -0.7488,
    appointmentStatus: 'pending'
  }
};

// Expected Strapi response (success)
const sucessResponse = {
  data: {
    id: 1,
    attributes: {
      fullName: 'John Doe',
      phoneNumber: '+44 207 101 3856',
      serviceType: 'Tyre Replacement',
      tyreSize: '225/45 R17',
      timingSlot: 'Morning (8AM - 12PM)',
      postcode: 'GU11 3HY',
      address: '123 High Street, Aldershot, GU11 3HY',
      latitude: 51.1476,
      longitude: -0.7488,
      appointmentStatus: 'pending',
      createdAt: '2024-04-20T10:30:00.000Z',
      updatedAt: '2024-04-20T10:30:00.000Z',
      publishedAt: '2024-04-20T10:30:00.000Z'
    }
  }
};

// Expected Strapi response (error)
const errorResponse = {
  data: null,
  error: {
    status: 400,
    name: 'ValidationError',
    message: 'Invalid request body',
    details: {
      errors: [
        {
          path: ['phoneNumber'],
          message: 'This attribute must be defined'
        }
      ]
    }
  }
};


// ============================================
// 6. PHONE NUMBER FORMATTING
// ============================================

/**
 * Examples of phone number formatting helper
 */
import { formatPhoneNumber } from '../api/appointmentService';

console.log(formatPhoneNumber('+442071013856'));  // "+44 (0) 207 101 3856"
console.log(formatPhoneNumber('02071013856'));    // "020 710 13856"
console.log(formatPhoneNumber('+441632960000')); // "+44 (0) 163 296 0000"


// ============================================
// 7. ENVIRONMENT CONFIGURATION
// ============================================

/**
 * How to configure the API URL via environment variables
 * 
 * .env.local:
 * VITE_STRAPI_API_URL=https://your-strapi-domain.com/api
 * 
 * For local development:
 * VITE_STRAPI_API_URL=http://localhost:1337/api
 * 
 * The appointmentService automatically reads from VITE_STRAPI_API_URL
 * If not set, it defaults to the production URL
 */


// ============================================
// 8. TYPESCRIPT TYPES (if using TypeScript)
// ============================================

/**
 * TypeScript interface for appointment data
 */
/*
interface IAppointmentData {
  fullName: string;
  phoneNumber: string;
  serviceType: string;
  tyreSize: string;
  timingSlot: string;
  postcode: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface IAppointmentResponse {
  success: boolean;
  data: {
    id: number;
    attributes: IAppointmentData & {
      appointmentStatus: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  };
  message: string;
}

async function submitAppointment(data: IAppointmentData): Promise<IAppointmentResponse> {
  // Implementation...
}
*/


// ============================================
// 9. TESTING THE API SERVICE
// ============================================

/**
 * Unit test examples for appointment service
 */

// Test validation functions
export const runTests = () => {
  console.log('=== Running Appointment Service Tests ===\n');

  // Phone validation tests
  console.log('Phone Validation Tests:');
  const phoneTests = [
    { input: '+44 207 101 3856', expected: true },
    { input: '02071013856', expected: true },
    { input: '(020) 7101 3856', expected: true },
    { input: '123', expected: false },
    { input: '', expected: false }
  ];

  phoneTests.forEach(test => {
    const result = validateUKPhoneNumber(test.input);
    const status = result === test.expected ? '✓' : '✗';
    console.log(`${status} validateUKPhoneNumber('${test.input}'): ${result}`);
  });

  // Postcode validation tests
  console.log('\nPostcode Validation Tests:');
  const postcodeTests = [
    { input: 'GU11 3HY', expected: true },
    { input: 'SW1A 1AA', expected: true },
    { input: 'GU113HY', expected: true },
    { input: 'INVALID', expected: false },
    { input: '', expected: false }
  ];

  postcodeTests.forEach(test => {
    const result = validateUKPostcode(test.input);
    const status = result === test.expected ? '✓' : '✗';
    console.log(`${status} validateUKPostcode('${test.input}'): ${result}`);
  });

  console.log('\n=== Tests Complete ===');
};


// ============================================
// 10. DEBUGGING & MONITORING
// ============================================

/**
 * How to add logging for debugging and monitoring
 */
export const setupLogging = () => {
  // Intercept console.error for appointment errors
  const originalError = console.error;
  console.error = (...args) => {
    if (args[0]?.includes?.('Appointment')) {
      // Send to monitoring service (e.g., Sentry, LogRocket)
      // sendToMonitoring({ type: 'error', message: args.join(' ') });
    }
    originalError(...args);
  };
};

// Example monitoring in component
export const MonitoringExample = () => {
  const handleSubmit = async (data) => {
    try {
      const startTime = performance.now();
      const result = await submitAppointment(data);
      const duration = performance.now() - startTime;

      // Log performance metrics
      console.log(`Appointment submitted in ${duration}ms`);
      // sendMetric({ event: 'appointment_submitted', duration });

      return result;
    } catch (error) {
      // Log errors with context
      console.error('Appointment submission failed:', {
        error: error.message,
        timestamp: new Date().toISOString(),
        userData: data.phoneNumber // Only log non-sensitive data
      });
      // sendError({ event: 'appointment_failed', error: error.message });
      throw error;
    }
  };

  return { handleSubmit };
};


export default {
  BasicIntegrationExample,
  useFormValidation,
  ErrorHandlingExample,
  LocationBookingFormIntegrationExample,
  validAppointmentPayload,
  sucessResponse,
  errorResponse,
  runTests,
  setupLogging,
  MonitoringExample
};
