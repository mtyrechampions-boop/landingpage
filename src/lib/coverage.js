/* global process */
// Service-area rules. Pure functions, no network access.
import { locations } from '../data/locations.js';

// Aldershot operating hub (GU11).
export const SERVICE_HUB = { name: 'Aldershot', lat: 51.2484, lng: -0.756 };

// Business assumption, not a measured fact: the landing page promises "a 35+ mile radius" and lists
// Southampton (about 37 miles) and West London as covered, so the default sits at 40 miles.
// Set SERVICE_RADIUS_MILES in the environment to change it without a code change.
const configuredRadius = Number(typeof process !== 'undefined' ? process.env.SERVICE_RADIUS_MILES : undefined);
export const SERVICE_RADIUS_MILES = Number.isFinite(configuredRadius) && configuredRadius > 0 ? configuredRadius : 40;

const EARTH_RADIUS_MILES = 3958.8;
const toRadians = (degrees) => (degrees * Math.PI) / 180;

export const distanceMiles = (lat1, lng1, lat2, lng2) => {
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_MILES * Math.asin(Math.sqrt(a));
};

const LISTED_DISTRICTS = new Set(
  locations.filter((l) => l.status === 'Operational').map((l) => l.postcode.toUpperCase())
);

export const isListedDistrict = (outcode) => LISTED_DISTRICTS.has(String(outcode).toUpperCase());

/** Coverage for a known point. A district on our operational list is always covered. */
export const assessCoverage = ({ outcode, lat, lng }) => {
  const miles = distanceMiles(SERVICE_HUB.lat, SERVICE_HUB.lng, lat, lng);
  const covered = isListedDistrict(outcode) || miles <= SERVICE_RADIUS_MILES;
  return { status: covered ? 'covered' : 'outside', distanceMiles: Math.round(miles * 10) / 10 };
};
