/* global process */
// Loads the Google Maps JavaScript API once per page and shares the result.
// The key comes from NEXT_PUBLIC_GOOGLE_MAPS_API_KEY. It is visible in the browser by design, so it
// must be restricted to this site's domains (HTTP referrers) and to the Maps JavaScript API in the
// Google Cloud console.

const SCRIPT_ID = 'google-maps-script';

let pending = null;

export const googleMapsKey = () => process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

/** @returns {Promise<typeof google>} Rejects with an Error whose message is 'no-key', 'auth' or 'load'. */
export const loadGoogleMaps = () => {
  if (typeof window === 'undefined') return Promise.reject(new Error('load'));
  if (window.google?.maps?.Map) return Promise.resolve(window.google);
  if (pending) return pending;

  const key = googleMapsKey();
  if (!key) return Promise.reject(new Error('no-key'));

  pending = new Promise((resolve, reject) => {
    // Google calls this when the key is rejected (wrong referrer, billing off, API not enabled).
    window.gm_authFailure = () => {
      pending = null;
      reject(new Error('auth'));
    };

    const existing = document.getElementById(SCRIPT_ID);
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    // With loading=async the classes arrive through importLibrary, and Google calls `callback` once
    // that function exists (the script's own onload fires too early for it).
    window.__mtcGoogleMapsReady = () => {
      Promise.all([window.google.maps.importLibrary('maps'), window.google.maps.importLibrary('core')])
        .then(() => resolve(window.google))
        .catch(() => {
          pending = null;
          reject(new Error('load'));
        });
    };
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&v=weekly&loading=async&callback=__mtcGoogleMapsReady`;
    script.async = true;
    script.onerror = () => {
      pending = null;
      reject(new Error('load'));
    };
    document.head.appendChild(script);
  });

  return pending;
};
