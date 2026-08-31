/**
 * Appointment Service
 * Handles all API communication with Strapi backend for appointment/booking submissions
 * Uses Google Places API for premium address lookup
 */

const STRAPI_API_URL = (typeof process !== 'undefined' ? (process.env.NEXT_PUBLIC_STRAPI_API_URL || process.env.VITE_STRAPI_API_URL) : null) || 'https://enduring-morning-cf86e59201.strapiapp.com/api';

/**
 * Validation Helper Functions
 */

/**
 * Validate UK phone number format
 * Accepts: +44, 0, with spaces, brackets, hyphens
 * Examples: +44 207 101 3856, 02071013856, (020) 7101 3856
 * Formats:
 * - Domestic: 02071013856 (11 digits)
 * - International: +442071013856 (12+ digits with country code)
 * @param {string} phoneNumber - The phone number to validate
 * @returns {boolean} - True if valid UK phone format
 */
export const validateUKPhoneNumber = (phoneNumber) => {
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    return false;
  }

  // Remove all non-digit characters for validation
  const digitsOnly = phoneNumber.replace(/\D/g, '');

  // UK phone numbers: 10-13 digits (allows for both domestic and international formats)
  // Domestic (0): 02071013856 = 11 digits
  // International (+44): 442071013856 = 12 digits
  if (digitsOnly.length < 10 || digitsOnly.length > 13) {
    return false;
  }

  // Must start with 0 (for UK domestic) or 44 (for international)
  if (!digitsOnly.startsWith('0') && !digitsOnly.startsWith('44')) {
    return false;
  }

  return true;
};

/**
 * Validate UK postcode format
 * Regex matches: Valid UK postcode patterns (e.g., GU11 3HY, SW1A 1AA)
 * @param {string} postcode - The postcode to validate
 * @returns {boolean} - True if valid UK postcode
 */
export const validateUKPostcode = (postcode) => {
  if (!postcode || typeof postcode !== 'string') {
    return false;
  }

  // UK postcode regex pattern - allows both full (GU11 3HY) and partial (GU11, KT1)
  const postcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]?(\s?\d[A-Z]{2})?$/i;
  return postcodeRegex.test(postcode.trim());
};

/**
 * Validate tyre size format
 * Format: XXX/XX RXX or XXX/XX ZXX (e.g., 225/45 R17)
 * @param {string} tyreSize - The tyre size to validate
 * @returns {boolean} - True if valid tyre size format
 */
export const validateTyreSize = (tyreSize) => {
  if (!tyreSize || typeof tyreSize !== 'string') {
    return false;
  }

  const tyreSizeRegex = /^\d{3}\/\d{2}\s?[RZ]\d{2,3}(\s?[A-Z])?$/i;
  return tyreSizeRegex.test(tyreSize.trim());
};

/**
 * Validate coordinate values
 * Latitude: -90 to 90
 * Longitude: -180 to 180
 * @param {number} latitude - The latitude coordinate
 * @param {number} longitude - The longitude coordinate
 * @returns {boolean} - True if both coordinates are valid
 */
export const validateCoordinates = (latitude, longitude) => {
  return (
    typeof latitude === 'number' &&
    typeof longitude === 'number' &&
    latitude >= -90 && latitude <= 90 &&
    longitude >= -180 && longitude <= 180
  );
};

/**
 * Submit Appointment to Strapi Backend
 * Sends booking/appointment data to Strapi collection type "appointments"
 * 
 * @param {Object} appointmentData - The appointment data object
 * @param {string} appointmentData.fullName - Customer's full name
 * @param {string} appointmentData.phoneNumber - Customer's phone number
 * @param {string} appointmentData.serviceType - Type of service (e.g., "Tyre Replacement")
 * @param {string} appointmentData.tyreSize - Tyre size specification
 * @param {string} appointmentData.timingSlot - Preferred timing slot
 * @param {string} appointmentData.postcode - UK postcode
 * @param {string} appointmentData.address - Full address from reverse geocoding
 * @param {number} appointmentData.latitude - Location latitude
 * @param {number} appointmentData.longitude - Location longitude
 * @param {string} [appointmentData.locationNotes] - Optional exact location details/instructions
 * 
 * @returns {Promise<Object>} - Response data from Strapi
 * @throws {Error} - Throws error with detailed message if submission fails
 * 
 * @example
 * const response = await submitAppointment({
 *   fullName: "John Doe",
 *   phoneNumber: "+44 207 101 3856",
 *   serviceType: "Tyre Replacement",
 *   tyreSize: "225/45 R17",
 *   timingSlot: "Morning (8AM - 12PM)",
 *   postcode: "GU11 3HY",
 *   address: "123 High Street, GU11 3HY",
 *   latitude: 51.1476,
 *   longitude: -0.7488,
 *   locationNotes: "Behind the main gate"
 * });
 */
export const submitAppointment = async (appointmentData) => {
  // Validate basic required fields
  const basicRequiredFields = [
    'fullName', 'phoneNumber', 'serviceType', 'tyreSize', 'timingSlot'
  ];

  for (const field of basicRequiredFields) {
    if (!appointmentData[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  // Location validation: either structured address OR manual notes must exist
  if (!appointmentData.address && !appointmentData.locationNotes) {
    throw new Error('Please provide a location (either via search or manual entry)');
  }

  // Validate full name
  if (appointmentData.fullName.trim().length < 2) {
    throw new Error('Full name must be at least 2 characters');
  }

  // Validate phone number
  if (!validateUKPhoneNumber(appointmentData.phoneNumber)) {
    throw new Error('Invalid UK phone number format');
  }

  // Validate tyre size
  if (!validateTyreSize(appointmentData.tyreSize)) {
    throw new Error('Invalid tyre size format (e.g., 225/45 R17)');
  }

  // Validate service type is not empty
  if (appointmentData.serviceType.trim().length === 0) {
    throw new Error('Service type is required');
  }

  // Validate timing slot is not empty
  if (appointmentData.timingSlot.trim().length === 0) {
    throw new Error('Timing slot is required');
  }

  // Build Strapi payload using the keys known to work with the backend
  const payload = {
    data: {
      fullName: appointmentData.fullName.trim(),
      phoneNumber: appointmentData.phoneNumber.trim(),
      serviceType: appointmentData.serviceType.trim(),
      tyreSize: appointmentData.tyreSize.trim(),
      timingSlot: appointmentData.timingSlot.trim(),
      postcode: (appointmentData.postcode || 'MANUAL').trim(),

      // Mapping address/town
      address: (appointmentData.address || appointmentData.town || 'Manual').trim(),

      // Vehicle Registration
      vehicleReg: (appointmentData.vehicleReg || '').trim(),

      // Location Notes
      locationNotes: (appointmentData.locationNotes || '').trim()
      ,
      // Optional email field
      email: (appointmentData.email || '').trim()
    }
  };

  try {
    // Make API request to Strapi
    const response = await fetch(`${STRAPI_API_URL}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    // Parse response
    const responseData = await response.json();

    // Handle non-2xx responses
    if (!response.ok) {
      // Extract error message from Strapi error response
      const errorMessage = responseData?.error?.message ||
        responseData?.error?.details?.errors?.[0]?.message ||
        responseData?.message ||
        `API Error: ${response.status} ${response.statusText}`;

      throw new Error(errorMessage);
    }

    // Return successful response
    return {
      success: true,
      data: responseData.data,
      message: 'Appointment submitted successfully! Our team will contact you within 1 hour.'
    };

  } catch (error) {
    // Handle network errors
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error(
        'Network error: Unable to connect to appointment service. Please check your internet connection.'
      );
    }

    // Re-throw with context if not already an Error
    if (!(error instanceof Error)) {
      throw new Error(`Appointment submission failed: ${String(error)}`);
    }

    throw error;
  }
};

/**
 * Get appointment status by ID
 * Retrieves the status of a previously submitted appointment
 * 
 * @param {number|string} appointmentId - The appointment ID from Strapi
 * @returns {Promise<Object>} - Appointment data including status
 * @throws {Error} - Throws error if fetch fails
 */
export const getAppointmentStatus = async (appointmentId) => {
  if (!appointmentId) {
    throw new Error('Appointment ID is required');
  }

  try {
    const response = await fetch(`${STRAPI_API_URL}/appointments/${appointmentId}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error?.message || `Failed to fetch appointment ${appointmentId}`);
    }

    return data.data;
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Network error: Unable to connect to appointment service.');
    }
    throw error;
  }
};

/**
 * Format phone number for display
 * Converts phone number to readable format: +44 (0) XXX XXX XXXX
 * 
 * @param {string} phoneNumber - The phone number to format
 * @returns {string} - Formatted phone number
 * 
 * @example
 * formatPhoneNumber("+442071013856") // Returns: "+44 (0) 207 101 3856"
 */
export const formatPhoneNumber = (phoneNumber) => {
  const digits = phoneNumber.replace(/\D/g, '');

  if (digits.startsWith('44')) {
    const areaCode = digits.substring(2, 4);
    const firstPart = digits.substring(4, 7);
    const secondPart = digits.substring(7);
    return `+44 (0) ${areaCode} ${firstPart} ${secondPart}`;
  }

  if (digits.startsWith('0')) {
    const areaCode = digits.substring(0, 3);
    const firstPart = digits.substring(3, 6);
    const secondPart = digits.substring(6);
    return `${areaCode} ${firstPart} ${secondPart}`;
  }

  return phoneNumber;
};

export default {
  submitAppointment,
  getAppointmentStatus,
  validateUKPhoneNumber,
  validateUKPostcode,
  validateTyreSize,
  validateCoordinates,
  formatPhoneNumber,
  STRAPI_API_URL
};
