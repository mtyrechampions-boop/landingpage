'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const ORANGE = '#FB7E10';
const NAVY = '#0B1528';

// Standard OpenStreetMap tiles, darkened with a filter so no map API key is needed. For heavy
// traffic, swap TILE_URL for a hosted provider (MapTiler, Stadia) and drop DARK_TILE_FILTER
// if the provider's style is already dark.
const TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const DARK_TILE_FILTER = 'invert(1) hue-rotate(190deg) saturate(0.5) brightness(0.82) contrast(0.95)';

const HUB = { name: 'Aldershot', lat: 51.2484, lng: -0.756 };

// `dir` is the side of the pin the label sits on, chosen so neighbouring towns don't collide.
const TOWNS = [
  { name: 'Yateley', lat: 51.341, lng: -0.828, corridor: 'camberley-yateley', dir: 'left' },
  { name: 'Camberley', lat: 51.335, lng: -0.743, corridor: 'camberley-yateley', dir: 'right' },
  { name: 'Farnborough', lat: 51.2905, lng: -0.754, corridor: 'farnborough-aldershot', dir: 'right' },
  { name: 'Farnham', lat: 51.2144, lng: -0.7983, corridor: 'guildford-surrey', dir: 'bottom' },
  { name: 'Guildford', lat: 51.2362, lng: -0.5704, corridor: 'guildford-surrey', dir: 'top' },
  { name: 'Southampton', lat: 50.9097, lng: -1.4044, corridor: 'portsmouth-southampton', dir: 'bottom' },
  { name: 'Portsmouth', lat: 50.8198, lng: -1.088, corridor: 'portsmouth-southampton', dir: 'bottom' },
];

const point = (name) => (name === HUB.name ? HUB : TOWNS.find((t) => t.name === name));

// Straight legs between towns. The map is indicative of the corridors we cover, not of exact road geometry.
const ROUTES = [
  { corridor: 'farnborough-aldershot', stops: ['Aldershot', 'Farnborough'] },
  { corridor: 'camberley-yateley', stops: ['Farnborough', 'Camberley'] },
  { corridor: 'camberley-yateley', stops: ['Farnborough', 'Yateley'] },
  { corridor: 'guildford-surrey', stops: ['Aldershot', 'Farnham', 'Guildford'] },
  { corridor: 'portsmouth-southampton', stops: ['Aldershot', 'Southampton'] },
  { corridor: 'portsmouth-southampton', stops: ['Aldershot', 'Portsmouth'] },
  { corridor: 'portsmouth-southampton', stops: ['Southampton', 'Portsmouth'] },
];

// `minZoom` hides a shield at rest when it would crowd the town labels; hovering its corridor or
// zooming in brings it back.
const SHIELDS = [
  { id: 'A30', lat: 51.346, lng: -0.79, corridor: 'camberley-yateley', minZoom: 11 },
  { id: 'M3 J4', lat: 51.315, lng: -0.742, corridor: 'camberley-yateley', minZoom: 11 },
  { id: 'A331', lat: 51.268, lng: -0.764, corridor: 'farnborough-aldershot', minZoom: 11 },
  { id: 'A31', lat: 51.225, lng: -0.684, corridor: 'guildford-surrey', minZoom: 0 },
  { id: 'M3', lat: 51.08, lng: -1.09, corridor: 'portsmouth-southampton', minZoom: 0 },
  { id: 'A3', lat: 51.03, lng: -0.925, corridor: 'portsmouth-southampton', minZoom: 0 },
  { id: 'M27', lat: 50.845, lng: -1.25, corridor: 'portsmouth-southampton', minZoom: 0 },
];

const LABEL_POSITION = {
  top: 'bottom:15px;left:50%;transform:translateX(-50%)',
  bottom: 'top:15px;left:50%;transform:translateX(-50%)',
  left: 'right:16px;top:50%;transform:translateY(-50%)',
  right: 'left:16px;top:50%;transform:translateY(-50%)',
};

const LABEL_FONT = "font:700 13px Outfit,system-ui,sans-serif;color:#fff;white-space:nowrap;text-shadow:0 1px 3px #000,0 0 10px rgba(11,21,40,.95)";

const townIcon = (town) =>
  L.divIcon({
    className: 'mtc-map-pin',
    iconSize: [0, 0],
    html: `<div style="position:relative;transition:opacity .3s">
      <span data-accent style="position:absolute;left:-8px;top:-8px;width:16px;height:16px;border-radius:9999px;background:${NAVY};border:3px solid ${ORANGE};box-shadow:0 0 0 5px rgba(251,126,16,.16);cursor:pointer"></span>
      <span style="position:absolute;${LABEL_POSITION[town.dir]};${LABEL_FONT}">${town.name}</span>
    </div>`,
  });

const hubIcon = () =>
  L.divIcon({
    className: 'mtc-map-pin',
    iconSize: [0, 0],
    html: `<div style="position:relative">
      <span class="animate-ping" style="position:absolute;left:-20px;top:-20px;width:40px;height:40px;border-radius:9999px;background:rgba(251,126,16,.45)"></span>
      <span style="position:absolute;left:-12px;top:-12px;width:24px;height:24px;border-radius:9999px;background:${ORANGE};border:4px solid #fff;box-shadow:0 0 18px rgba(251,126,16,.9)"></span>
      <span style="position:absolute;right:20px;top:50%;transform:translateY(-62%);text-align:right;white-space:nowrap;text-shadow:0 1px 3px #000,0 0 10px rgba(11,21,40,.95)">
        <span style="display:block;font:900 16px Outfit,system-ui,sans-serif;color:#fff">Aldershot</span>
        <span style="display:block;font:800 9px Outfit,system-ui,sans-serif;letter-spacing:.18em;color:${ORANGE}">OPERATING HUB</span>
      </span>
    </div>`,
  });

const shieldIcon = (id) =>
  L.divIcon({
    className: 'mtc-map-pin',
    iconSize: [0, 0],
    html: `<div style="position:relative;transition:opacity .3s">
      <span data-accent style="position:absolute;left:0;top:0;transform:translate(-50%,-50%);white-space:nowrap;padding:2px 7px;border-radius:7px;background:${NAVY};border:1.5px solid rgba(148,163,184,.4);color:#94A3B8;font:800 11px Outfit,system-ui,sans-serif;transition:color .3s,border-color .3s">${id}</span>
    </div>`,
  });

const lineStyle = (state) => {
  if (state === 'live') return { color: ORANGE, opacity: 1, weight: 5 };
  if (state === 'dim') return { color: '#334155', opacity: 0.7, weight: 3 };
  return { color: ORANGE, opacity: 0.65, weight: 3 };
};

const LandingCorridorsMap = ({ active, onActiveChange }) => {
  const containerRef = useRef(null);
  const applyRef = useRef(null);
  const onChangeRef = useRef(onActiveChange);

  useEffect(() => {
    onChangeRef.current = onActiveChange;
  }, [onActiveChange]);

  useEffect(() => {
    const map = L.map(containerRef.current, {
      scrollWheelZoom: false, // page scroll should never get hijacked by the map
      dragging: !L.Browser.mobile, // one-finger scroll must keep working on phones
      zoomSnap: 0.25,
      tap: false,
    });

    L.tileLayer(TILE_URL, {
      maxZoom: 13,
      minZoom: 7,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
    }).addTo(map);
    map.getPane('tilePane').style.filter = DARK_TILE_FILTER;

    const attribution = map.attributionControl.getContainer();
    attribution.style.background = 'rgba(11,21,40,0.8)';
    attribution.style.color = '#94A3B8';
    attribution.querySelectorAll('a').forEach((a) => {
      a.style.color = '#CBD5E1';
    });

    const hubLatLng = [HUB.lat, HUB.lng];

    // Dispatch range rings, decorative only
    [20000, 40000, 60000].forEach((radius, i) => {
      L.circle(hubLatLng, {
        radius,
        color: '#94A3B8',
        weight: 1,
        opacity: 0.25,
        dashArray: '3 8',
        fillColor: ORANGE,
        fillOpacity: i === 0 ? 0.06 : 0,
        interactive: false,
      }).addTo(map);
    });

    const routes = ROUTES.map((route) => {
      const latlngs = route.stops.map((name) => {
        const p = point(name);
        return [p.lat, p.lng];
      });
      const glow = L.polyline(latlngs, { color: ORANGE, weight: 14, opacity: 0, lineCap: 'round', interactive: false }).addTo(map);
      const line = L.polyline(latlngs, { ...lineStyle('rest'), lineCap: 'round', lineJoin: 'round', interactive: false }).addTo(map);
      return { corridor: route.corridor, glow, line };
    });

    const pins = [];

    SHIELDS.forEach((shield) => {
      const marker = L.marker([shield.lat, shield.lng], {
        icon: shieldIcon(shield.id),
        interactive: false,
        keyboard: false,
        zIndexOffset: 100,
      }).addTo(map);
      pins.push({ corridor: shield.corridor, marker, minZoom: shield.minZoom });
    });

    TOWNS.forEach((town) => {
      const marker = L.marker([town.lat, town.lng], {
        icon: townIcon(town),
        title: town.name,
        alt: town.name,
        zIndexOffset: 500,
      }).addTo(map);
      marker.on('mouseover', () => onChangeRef.current(town.corridor));
      marker.on('mouseout', () => onChangeRef.current(null));
      marker.on('click', () => onChangeRef.current(town.corridor));
      pins.push({ corridor: town.corridor, marker });
    });

    L.marker(hubLatLng, { icon: hubIcon(), title: `${HUB.name} operating hub`, alt: `${HUB.name} operating hub`, zIndexOffset: 1000 }).addTo(map);

    map.on('click', () => onChangeRef.current(null));

    let currentActive = null;

    applyRef.current = (activeId) => {
      currentActive = activeId;
      routes.forEach(({ corridor, glow, line }) => {
        const state = !activeId ? 'rest' : activeId === corridor ? 'live' : 'dim';
        line.setStyle(lineStyle(state));
        glow.setStyle({ opacity: state === 'live' ? 0.3 : 0 });
        if (state === 'live') {
          glow.bringToFront();
          line.bringToFront();
        }
      });
      pins.forEach(({ corridor, marker, minZoom = 0 }) => {
        const el = marker.getElement()?.firstElementChild;
        if (!el) return;
        const state = !activeId ? 'rest' : activeId === corridor ? 'live' : 'dim';
        const hidden = state !== 'live' && map.getZoom() < minZoom;
        el.style.opacity = hidden ? '0' : state === 'dim' ? '0.3' : '1';
        const accent = el.querySelector('[data-accent]');
        if (accent && accent.textContent.trim()) {
          accent.style.color = state === 'live' ? ORANGE : '#94A3B8';
          accent.style.borderColor = state === 'live' ? ORANGE : 'rgba(148,163,184,.4)';
        }
      });
    };

    map.on('zoomend', () => applyRef.current?.(currentActive));

    const bounds = L.latLngBounds([hubLatLng, ...TOWNS.map((t) => [t.lat, t.lng])]);
    map.fitBounds(bounds, { padding: [48, 48] });
    applyRef.current(null);

    // Leaflet only measures its container on load, so re-measure when the layout changes.
    const observer = new ResizeObserver(() => {
      map.invalidateSize();
      map.fitBounds(bounds, { padding: [48, 48], animate: false });
    });
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      applyRef.current = null;
      map.remove();
    };
  }, []);

  useEffect(() => {
    applyRef.current?.(active);
  }, [active]);

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Map of the mobile tyre fitting corridors radiating from the Aldershot hub to Yateley, Camberley, Farnborough, Farnham, Guildford, Southampton and Portsmouth."
      className="w-full h-full"
      style={{ background: NAVY }}
    />
  );
};

export default LandingCorridorsMap;
