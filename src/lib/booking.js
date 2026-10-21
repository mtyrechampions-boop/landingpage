// Booking request rules shared by the browser form and POST /api/appointments.
// Relative imports only: this file is also loaded by plain Node in the tests.
import { validateUKPhoneNumber } from '../api/appointmentService.js';
import { parsePostcode } from './postcode.js';

export const BUSINESS_PHONE = '02071013856';
export const BUSINESS_PHONE_DISPLAY = '0207 101 3856';
export const BUSINESS_PHONE_HREF = `tel:${BUSINESS_PHONE}`;
export const WHATSAPP_NUMBER = '447494024653';

export const SERVICE_MODES = [
  {
    id: 'emergency',
    label: 'Emergency roadside help',
    hint: 'Stranded or unsafe to drive. Dispatch as soon as a van is free.',
    serviceType: 'Emergency Mobile Tyre Fitting',
    timingSlot: 'Emergency - as soon as possible',
  },
  {
    id: 'scheduled',
    label: 'Scheduled fitting',
    hint: 'Home or workplace, on a day and time window that suits you.',
    serviceType: 'Mobile Tyre Fitting',
  },
];

// The three service windows the existing booking form already used. A window is a preference:
// the team confirms the actual arrival time by phone.
export const TIME_WINDOWS = ['7am - 12pm', '12pm - 5pm', '5pm - 12am'];

export const BOOKING_HORIZON_DAYS = 90;

// Wider than the old dropdowns (195-255 wide, 15-21 rim) so unusual sizes still fit.
export const TYRE_WIDTHS = Array.from({ length: 47 }, (_, i) => 125 + i * 5); // 125 - 355
export const TYRE_PROFILES = Array.from({ length: 13 }, (_, i) => 25 + i * 5); // 25 - 85
export const RIM_SIZES = Array.from({ length: 15 }, (_, i) => 12 + i); // 12 - 26
export const SPEED_RATINGS = ['Q', 'R', 'S', 'T', 'U', 'H', 'V', 'W', 'Y', 'ZR'];

export const CONSTRAINTS = {
  fullName: { min: 2, max: 80 },
  email: { max: 120 },
  address: { min: 5, max: 250 },
  locationNotes: { max: 500 },
  notes: { max: 1000 },
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const KEY_PATTERN = /^[A-Za-z0-9-]{8,64}$/;
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

const clean = (value) => (typeof value === 'string' ? value.replace(CONTROL_CHARS, '').trim() : '');

/** Today's date in the UK as YYYY-MM-DD, regardless of the visitor's own timezone. */
export const todayInLondon = (now = new Date()) =>
  new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/London',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);

export const addDays = (isoDate, days) => {
  const [y, m, d] = isoDate.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d + days));
  return date.toISOString().slice(0, 10);
};

const isRealDate = (isoDate) => {
  if (!DATE_PATTERN.test(isoDate)) return false;
  const [y, m, d] = isoDate.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
};

export const formatDateLabel = (isoDate) => {
  if (!isRealDate(isoDate)) return '';
  const [y, m, d] = isoDate.split('-').map(Number);
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'UTC',
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(Date.UTC(y, m - 1, d)));
};

export const normaliseRegistration = (value) => clean(value).toUpperCase().replace(/[\s-]+/g, '');

export const tyreSizeLabel = ({ tyreWidth, tyreProfile, tyreRim, tyreSpeed }) =>
  `${tyreWidth}/${tyreProfile} R${tyreRim}${tyreSpeed ? ` ${tyreSpeed}` : ''}`;

/** Reads "225/45R17", "225/45 R17" or "225-45-17" from a link into form values. */
export const parseTyreSize = (input) => {
  if (typeof input !== 'string') return null;
  const match = /^(\d{3})[/\- ](\d{2})\s?-?R?(\d{2})$/i.exec(input.trim());
  if (!match) return null;
  const [, width, profile, rim] = match.map(Number);
  if (!TYRE_WIDTHS.includes(width) || !TYRE_PROFILES.includes(profile) || !RIM_SIZES.includes(rim)) return null;
  return { tyreWidth: String(width), tyreProfile: String(profile), tyreRim: String(rim) };
};

export const emptyBooking = () => ({
  mode: 'scheduled',
  fullName: '',
  phoneNumber: '',
  email: '',
  vehicleReg: '',
  postcode: '',
  address: '',
  locationNotes: '',
  date: '',
  window: '',
  tyreUnknown: false,
  tyreWidth: '',
  tyreProfile: '',
  tyreRim: '',
  tyreSpeed: '',
  notes: '',
  company_website: '', // honeypot: real visitors never see or fill this
  idempotencyKey: '',
});

/**
 * Validates and normalises a booking request. Used in the browser for instant feedback and again
 * on the server, which is the one that counts.
 * @returns {{ ok: boolean, errors: Record<string, string>, data: object }}
 */
export const validateBooking = (input = {}, { now = new Date() } = {}) => {
  const errors = {};
  const source = input && typeof input === 'object' ? input : {};

  const mode = SERVICE_MODES.find((m) => m.id === source.mode);
  if (!mode) errors.mode = 'Choose emergency help or a scheduled fitting.';

  const fullName = clean(source.fullName);
  if (fullName.length < CONSTRAINTS.fullName.min) errors.fullName = 'Please enter your full name.';
  else if (fullName.length > CONSTRAINTS.fullName.max) errors.fullName = 'That name is too long.';

  const phoneNumber = clean(source.phoneNumber);
  if (!phoneNumber) errors.phoneNumber = 'Please enter a phone number we can call you on.';
  else if (!validateUKPhoneNumber(phoneNumber)) errors.phoneNumber = 'Enter a valid UK phone number, e.g. 07700 900123.';

  const email = clean(source.email);
  if (!email) errors.email = 'Please enter your email address.';
  else if (email.length > CONSTRAINTS.email.max || !EMAIL_PATTERN.test(email)) errors.email = 'Enter a valid email address.';

  const vehicleReg = normaliseRegistration(source.vehicleReg);
  if (!vehicleReg) errors.vehicleReg = 'Please enter your vehicle registration.';
  else if (!/^[A-Z0-9]{2,8}$/.test(vehicleReg)) errors.vehicleReg = 'Enter a valid registration, e.g. AB12 CDE.';

  const parsedPostcode = parsePostcode(source.postcode);
  if (!clean(source.postcode)) errors.postcode = 'Please enter your postcode.';
  else if (!parsedPostcode) errors.postcode = "That doesn't look like a valid UK postcode.";
  else if (parsedPostcode.kind !== 'full') errors.postcode = 'Enter your full postcode, e.g. GU11 3HY.';

  const address = clean(source.address);
  if (address.length < CONSTRAINTS.address.min) errors.address = 'Tell us the street address or exact spot the vehicle is parked.';
  else if (address.length > CONSTRAINTS.address.max) errors.address = 'Please shorten the address.';

  const locationNotes = clean(source.locationNotes);
  if (locationNotes.length > CONSTRAINTS.locationNotes.max) errors.locationNotes = 'Please shorten the location notes.';

  const notes = clean(source.notes);
  if (notes.length > CONSTRAINTS.notes.max) errors.notes = 'Please shorten your notes.';

  let date = '';
  let window = '';
  if (mode?.id === 'scheduled') {
    date = clean(source.date);
    const today = todayInLondon(now);
    if (!date) errors.date = 'Choose the day you would like us to come.';
    else if (!isRealDate(date)) errors.date = 'Choose a valid date.';
    else if (date < today) errors.date = 'That date has already passed.';
    else if (date > addDays(today, BOOKING_HORIZON_DAYS)) {
      errors.date = `We can take bookings up to ${BOOKING_HORIZON_DAYS} days ahead.`;
    }

    window = clean(source.window);
    if (!window) errors.window = 'Pick the time window that suits you.';
    else if (!TIME_WINDOWS.includes(window)) errors.window = 'Pick one of the time windows shown.';
  }

  const tyreUnknown = source.tyreUnknown === true;
  let tyreWidth = '';
  let tyreProfile = '';
  let tyreRim = '';
  let tyreSpeed = '';
  if (!tyreUnknown) {
    tyreWidth = clean(String(source.tyreWidth ?? ''));
    tyreProfile = clean(String(source.tyreProfile ?? ''));
    tyreRim = clean(String(source.tyreRim ?? ''));
    tyreSpeed = clean(String(source.tyreSpeed ?? ''));
    if (!TYRE_WIDTHS.includes(Number(tyreWidth))) errors.tyreWidth = 'Choose the tyre width.';
    if (!TYRE_PROFILES.includes(Number(tyreProfile))) errors.tyreProfile = 'Choose the profile.';
    if (!RIM_SIZES.includes(Number(tyreRim))) errors.tyreRim = 'Choose the rim size.';
    if (tyreSpeed && !SPEED_RATINGS.includes(tyreSpeed)) errors.tyreSpeed = 'Choose a valid speed rating or leave it blank.';
  }

  const idempotencyKey = clean(source.idempotencyKey);
  if (!KEY_PATTERN.test(idempotencyKey)) errors.idempotencyKey = 'Reload the page and try again.';

  const data = {
    mode: mode?.id ?? '',
    fullName,
    phoneNumber,
    email,
    vehicleReg,
    postcode: parsedPostcode?.normalized ?? '',
    address,
    locationNotes,
    date,
    window,
    tyreUnknown,
    tyreWidth,
    tyreProfile,
    tyreRim,
    tyreSpeed,
    notes,
    idempotencyKey,
  };

  return { ok: Object.keys(errors).length === 0, errors, data };
};

/** Human-readable timing for the confirmation page and the Strapi record. */
export const describeTiming = (data) => {
  if (data.mode === 'emergency') return 'Emergency - as soon as possible';
  return `${formatDateLabel(data.date)}, ${data.window}`;
};

export const describeTyre = (data) =>
  data.tyreUnknown ? 'Not known - customer needs help identifying the tyre' : tyreSizeLabel(data);

export const googleMapsLink = (address, postcode) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${address} ${postcode}`.trim())}`;

export const whatsappLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
