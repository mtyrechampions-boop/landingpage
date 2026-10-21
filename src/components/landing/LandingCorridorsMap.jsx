'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Loader2, MapPin, Phone } from 'lucide-react';
import { loadGoogleMaps } from '../../lib/googleMapsLoader';

const ORANGE = '#FB7E10';
const INK = '#0F172A';
const LAND = '#eef2f6';
const MUTED = '#475569';
const EDGE = '#CBD5E1';

// 40-mile service radius from Aldershot hub
const SERVICE_RADIUS_METRES = 40 * 1609.344;

const circlePath = (centre, radiusMetres, steps = 180) => {
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;
  const toDeg = (r) => (r * 180) / Math.PI;
  const lat1 = toRad(centre.lat);
  const lng1 = toRad(centre.lng);
  const d = radiusMetres / R;
  return Array.from({ length: steps }, (_, i) => {
    const bearing = (2 * Math.PI * i) / steps;
    const lat2 = Math.asin(Math.sin(lat1) * Math.cos(d) + Math.cos(lat1) * Math.sin(d) * Math.cos(bearing));
    const lng2 = lng1 + Math.atan2(Math.sin(bearing) * Math.sin(d) * Math.cos(lat1), Math.cos(d) - Math.sin(lat1) * Math.sin(lat2));
    return { lat: toDeg(lat2), lng: toDeg(lng2) };
  });
};

export const HUB = {
  name: 'Aldershot',
  region: 'Hampshire',
  postcode: 'GU11',
  lat: 51.2484,
  lng: -0.756,
  isHub: true,
};

// Comprehensive list of all towns and coverage areas
export const ALL_LOCATIONS = [
  // Hampshire
  { name: 'Farnborough', region: 'Hampshire', postcode: 'GU14', lat: 51.2905, lng: -0.754, dir: 'right', primary: true },
  { name: 'Fleet', region: 'Hampshire', postcode: 'GU51', lat: 51.2834, lng: -0.8456, dir: 'left', primary: true },
  { name: 'Yateley', region: 'Hampshire', postcode: 'GU46', lat: 51.341, lng: -0.828, dir: 'left', primary: true },
  { name: 'Blackwater', region: 'Hampshire', postcode: 'GU17', lat: 51.3298, lng: -0.7788, dir: 'top' },
  { name: 'Basingstoke', region: 'Hampshire', postcode: 'RG21', lat: 51.2667, lng: -1.0876, dir: 'left', primary: true },
  { name: 'Alton', region: 'Hampshire', postcode: 'GU34', lat: 51.1492, lng: -0.9765, dir: 'bottom', primary: true },
  { name: 'Hook', region: 'Hampshire', postcode: 'RG27', lat: 51.282, lng: -0.961, dir: 'top' },
  { name: 'Winchester', region: 'Hampshire', postcode: 'SO22', lat: 51.0632, lng: -1.308, dir: 'left', primary: true },
  { name: 'Southampton', region: 'South Coast', postcode: 'SO14', lat: 50.9097, lng: -1.4044, dir: 'bottom', primary: true },
  { name: 'Portsmouth', region: 'South Coast', postcode: 'PO1', lat: 50.8198, lng: -1.088, dir: 'bottom', primary: true },
  { name: 'Fareham', region: 'South Coast', postcode: 'PO16', lat: 50.854, lng: -1.1798, dir: 'bottom', primary: true },
  { name: 'Havant', region: 'South Coast', postcode: 'PO9', lat: 50.852, lng: -0.985, dir: 'bottom' },

  // Surrey
  { name: 'Camberley', region: 'Surrey', postcode: 'GU15', lat: 51.335, lng: -0.743, dir: 'right', primary: true },
  { name: 'Frimley', region: 'Surrey', postcode: 'GU16', lat: 51.3142, lng: -0.7397, dir: 'right' },
  { name: 'Farnham', region: 'Surrey', postcode: 'GU9', lat: 51.2144, lng: -0.7983, dir: 'left', primary: true },
  { name: 'Guildford', region: 'Surrey', postcode: 'GU1', lat: 51.2362, lng: -0.5704, dir: 'right', primary: true },
  { name: 'Woking', region: 'Surrey', postcode: 'GU21', lat: 51.3168, lng: -0.56, dir: 'right', primary: true },
  { name: 'Godalming', region: 'Surrey', postcode: 'GU7', lat: 51.1857, lng: -0.6137, dir: 'bottom', primary: true },
  { name: 'Haslemere', region: 'Surrey', postcode: 'GU27', lat: 51.0886, lng: -0.7126, dir: 'bottom', primary: true },
  { name: 'Bagshot', region: 'Surrey', postcode: 'GU19', lat: 51.363, lng: -0.689, dir: 'right' },

  // Berkshire
  { name: 'Bracknell', region: 'Berkshire', postcode: 'RG12', lat: 51.416, lng: -0.749, dir: 'top', primary: true },
  { name: 'Ascot', region: 'Berkshire', postcode: 'SL5', lat: 51.41, lng: -0.67, dir: 'right', primary: true },
  { name: 'Reading', region: 'Berkshire', postcode: 'RG1', lat: 51.4543, lng: -0.9781, dir: 'top', primary: true },
  { name: 'Wokingham', region: 'Berkshire', postcode: 'RG40', lat: 51.41, lng: -0.835, dir: 'top' },
  { name: 'Sandhurst', region: 'Berkshire', postcode: 'GU47', lat: 51.35, lng: -0.8, dir: 'top' },
  { name: 'Windsor', region: 'Berkshire', postcode: 'SL4', lat: 51.4839, lng: -0.6044, dir: 'top', primary: true },
  { name: 'Slough', region: 'Berkshire', postcode: 'SL1', lat: 51.5105, lng: -0.595, dir: 'top', primary: true },
  { name: 'Maidenhead', region: 'Berkshire', postcode: 'SL6', lat: 51.5218, lng: -0.718, dir: 'top', primary: true },
  { name: 'Newbury', region: 'Berkshire', postcode: 'RG14', lat: 51.401, lng: -1.323, dir: 'left', primary: true },
];

// Clean light styling for maximum clarity
const LIGHT_STYLE = [
  { elementType: 'geometry', stylers: [{ color: '#f4f6f9' }] },
  { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#64748b' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#ffffff' }, { weight: 3 }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: EDGE }] },
  { featureType: 'administrative.locality', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'landscape.natural', elementType: 'geometry', stylers: [{ color: LAND }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#e2e8f0' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#fde1c3' }] },
  { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#f7c58f' }] },
  { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#b45309' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#cfe8f7' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#3b82a6' }] },
];

const LABEL_POSITION = {
  top: 'bottom:12px;left:50%;transform:translateX(-50%)',
  bottom: 'top:12px;left:50%;transform:translateX(-50%)',
  left: 'right:14px;top:50%;transform:translateY(-50%)',
  right: 'left:14px;top:50%;transform:translateY(-50%)',
};

const LABEL_FONT = `font:800 12px Outfit,system-ui,sans-serif;color:${INK};white-space:nowrap;text-shadow:0 0 3px #fff,0 0 6px #fff,0 1px 2px #fff`;

const townHtml = (town) => `
<div style="position:relative;cursor:pointer" title="${town.name} (${town.postcode}) - Mobile Tyre Service Area">
  <span data-accent style="position:absolute;left:-7px;top:-7px;width:14px;height:14px;border-radius:9999px;background:#fff;border:3px solid ${ORANGE};box-shadow:0 0 0 3px rgba(251,126,16,.2),0 1px 4px rgba(15,23,42,.3)"></span>
  <span data-label style="position:absolute;${LABEL_POSITION[town.dir]};${LABEL_FONT};transition:opacity .25s">${town.name}</span>
</div>`;

const hubHtml = () => `
<div style="position:relative;cursor:pointer" title="Aldershot Operating Hub - Central Dispatch">
  <span class="animate-ping" style="position:absolute;left:-20px;top:-20px;width:40px;height:40px;border-radius:9999px;background:rgba(251,126,16,.4)"></span>
  <span style="position:absolute;left:-12px;top:-12px;width:24px;height:24px;border-radius:9999px;background:${ORANGE};border:4px solid #fff;box-shadow:0 0 0 3px rgba(251,126,16,.35),0 2px 8px rgba(15,23,42,.45)"></span>
  <span style="position:absolute;right:18px;top:50%;transform:translateY(-62%);text-align:right;white-space:nowrap;text-shadow:0 0 3px #fff,0 0 6px #fff,0 1px 2px #fff">
    <span style="display:block;font:900 16px Outfit,system-ui,sans-serif;color:${INK}">Aldershot</span>
    <span style="display:block;font:800 9px Outfit,system-ui,sans-serif;letter-spacing:.18em;color:#D96A00">OPERATING HUB</span>
  </span>
</div>`;

const createHtmlOverlayClass = (google) =>
  class HtmlOverlay extends google.maps.OverlayView {
    constructor({ position, html, interactive = false, onClick }) {
      super();
      this.position = new google.maps.LatLng(position.lat, position.lng);
      this.root = document.createElement('div');
      this.root.style.cssText = `position:absolute;width:0;height:0;${interactive ? 'pointer-events:auto;cursor:pointer' : 'pointer-events:none'}`;
      this.root.innerHTML = html;
      if (onClick) this.root.addEventListener('click', onClick);
    }

    onAdd() {
      this.getPanes().overlayMouseTarget.appendChild(this.root);
    }

    draw() {
      const projection = this.getProjection();
      if (!projection) return;
      const pixel = projection.fromLatLngToDivPixel(this.position);
      this.root.style.left = `${pixel.x}px`;
      this.root.style.top = `${pixel.y}px`;
    }

    onRemove() {
      this.root.remove();
    }
  };

const MESSAGES = {
  'no-key': 'Google Maps is not configured for this site yet.',
  auth: 'Google Maps could not verify this site, so the map is unavailable.',
  load: 'The map could not be loaded.',
};

const LandingCorridorsMap = ({ activeRegion, onLocationSelect }) => {
  const containerRef = useRef(null);
  const [status, setStatus] = useState('loading');
  const [selectedTown, setSelectedTown] = useState(null);
  const mapInstanceRef = useRef(null);
  const filterRegionRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};

    loadGoogleMaps()
      .then((google) => {
        if (cancelled || !containerRef.current) return;

        const map = new google.maps.Map(containerRef.current, {
          center: { lat: 51.2484, lng: -0.756 },
          zoom: 9,
          styles: LIGHT_STYLE,
          disableDefaultUI: false,
          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER,
          },
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          gestureHandling: 'cooperative',
          clickableIcons: false,
        });

        mapInstanceRef.current = map;

        // Faded mask outside 40-mile service radius
        const outsideMask = new google.maps.Polygon({
          map,
          paths: [
            [
              { lat: 62, lng: -14 },
              { lat: 62, lng: 12 },
              { lat: 42, lng: 12 },
              { lat: 42, lng: -14 },
            ],
            circlePath(HUB, SERVICE_RADIUS_METRES).reverse(),
          ],
          fillColor: '#ffffff',
          fillOpacity: 0.62,
          strokeWeight: 0,
          clickable: false,
          zIndex: 0,
        });

        // 40-mile service radius circular boundary
        const serviceEdge = new google.maps.Circle({
          map,
          center: { lat: HUB.lat, lng: HUB.lng },
          radius: SERVICE_RADIUS_METRES,
          strokeColor: ORANGE,
          strokeOpacity: 0.95,
          strokeWeight: 2,
          fillColor: ORANGE,
          fillOpacity: 0.04,
          clickable: false,
          zIndex: 0,
        });

        const HtmlOverlay = createHtmlOverlayClass(google);
        const overlays = [];
        const pins = [];

        const addOverlay = (item, isHub = false) => {
          const overlay = new HtmlOverlay({
            position: item,
            html: isHub ? hubHtml() : townHtml(item),
            interactive: true,
            onClick: (e) => {
              e.stopPropagation();
              setSelectedTown(item);
              if (onLocationSelect) onLocationSelect(item);
            },
          });
          overlay.setMap(map);
          overlays.push(overlay);
          pins.push({ overlay, ...item });
        };

        // Add Hub
        addOverlay(HUB, true);

        // Add all coverage towns
        ALL_LOCATIONS.forEach((town) => {
          addOverlay(town);
        });

        map.addListener('click', () => {
          setSelectedTown(null);
        });

        // Dynamic region filtering and bounds fitting
        filterRegionRef.current = (region) => {
          const bounds = new google.maps.LatLngBounds();
          bounds.extend({ lat: HUB.lat, lng: HUB.lng });

          const filtered = !region || region === 'all'
            ? ALL_LOCATIONS
            : ALL_LOCATIONS.filter((t) => t.region === region);

          filtered.forEach((t) => bounds.extend({ lat: t.lat, lng: t.lng }));
          map.fitBounds(bounds, { top: 50, right: 50, bottom: 50, left: 50 });

          // Update pin opacity based on region filter
          pins.forEach(({ overlay, region: townRegion, isHub }) => {
            const el = overlay.root.firstElementChild;
            if (!el || isHub) return;
            const matches = !region || region === 'all' || townRegion === region;
            el.style.opacity = matches ? '1' : '0.25';
          });
        };

        const fit = () => {
          filterRegionRef.current(activeRegion);
        };

        fit();

        const observer = new ResizeObserver(() => {
          google.maps.event.trigger(map, 'resize');
          fit();
        });
        observer.observe(containerRef.current);

        setStatus('ready');
        cleanup = () => {
          observer.disconnect();
          overlays.forEach((o) => o.setMap(null));
          outsideMask.setMap(null);
          serviceEdge.setMap(null);
          google.maps.event.clearInstanceListeners(map);
          mapInstanceRef.current = null;
        };
      })
      .catch((error) => {
        if (!cancelled) setStatus(MESSAGES[error?.message] ? error.message : 'load');
      });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  useEffect(() => {
    if (filterRegionRef.current) {
      filterRegionRef.current(activeRegion);
    }
  }, [activeRegion]);

  return (
    <div className="relative w-full h-full" style={{ background: LAND }}>
      <div
        ref={containerRef}
        role="region"
        aria-label="Interactive Google Map showing 24/7 mobile tyre fitting coverage across Surrey, Hampshire, Berkshire and the South Coast"
        className="w-full h-full"
      />

      {status === 'loading' && (
        <div role="status" className="absolute inset-0 flex items-center justify-center" style={{ background: LAND }}>
          <Loader2 size={32} className="animate-spin text-[#FB7E10]" aria-hidden="true" />
          <span className="sr-only">Loading Google Map</span>
        </div>
      )}

      {MESSAGES[status] && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center" style={{ background: LAND }}>
          <MapPin size={32} className="text-[#FB7E10]" aria-hidden="true" />
          <p className="text-sm font-semibold text-slate-700 max-w-xs">{MESSAGES[status]}</p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Mobile+Tyre+Champions+Aldershot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#FB7E10] text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider"
          >
            Open in Google Maps <ExternalLink size={12} aria-hidden="true" />
          </a>
        </div>
      )}

      {/* Selected Location Popup Card */}
      {selectedTown && (
        <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl p-4 shadow-xl max-w-xs animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#FB7E10]">
                {selectedTown.isHub ? 'Central Operating Hub' : `${selectedTown.region} • ${selectedTown.postcode}`}
              </span>
              <h4 className="text-base font-black text-gray-900 leading-tight">
                {selectedTown.name}
              </h4>
            </div>
            <button
              onClick={() => setSelectedTown(null)}
              className="text-gray-400 hover:text-gray-600 text-sm font-bold p-1 cursor-pointer"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <p className="mt-1.5 text-xs text-gray-500 font-medium leading-relaxed">
            24/7 emergency roadside & mobile tyre replacement. Typical arrival in 30–60 minutes.
          </p>
          <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between gap-2">
            <span className="text-[11px] font-extrabold text-emerald-600">● 30–60 Min Response</span>
            <a
              href="tel:02071013856"
              className="inline-flex items-center gap-1 bg-[#FB7E10] hover:bg-orange-600 text-white font-black px-3 py-1.5 rounded-lg text-xs uppercase tracking-wider transition-all shadow-md shadow-orange-500/20 active:scale-95"
            >
              <Phone size={12} className="fill-current" />
              <span>Call Van</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingCorridorsMap;
