'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Loader2, MapPin } from 'lucide-react';
import { loadGoogleMaps } from '../../lib/googleMapsLoader';

const ORANGE = '#FB7E10';
const INK = '#0F172A';
const LAND = '#eef2f6';
const MUTED = '#475569';
const EDGE = '#CBD5E1';

// The service area promised on the page and used by the postcode checker (see lib/coverage.js).
const SERVICE_RADIUS_METRES = 40 * 1609.344;

// Points of a circle around `centre`, as { lat, lng } going clockwise.
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

const HUB = { name: 'Aldershot', lat: 51.2484, lng: -0.756 };

// `dir` is the side of the pin the label sits on, chosen so neighbouring towns don't collide.
const TOWNS = [
  { name: 'Yateley', lat: 51.341, lng: -0.828, corridor: 'camberley-yateley', dir: 'left' },
  { name: 'Camberley', lat: 51.335, lng: -0.743, corridor: 'camberley-yateley', dir: 'right' },
  { name: 'Farnborough', lat: 51.2905, lng: -0.754, corridor: 'farnborough-aldershot', dir: 'right', crowded: true },
  { name: 'Farnham', lat: 51.2144, lng: -0.7983, corridor: 'guildford-surrey', dir: 'bottom', crowded: true },
  { name: 'Guildford', lat: 51.2362, lng: -0.5704, corridor: 'guildford-surrey', dir: 'right' },
  { name: 'Southampton', lat: 50.9097, lng: -1.4044, corridor: 'portsmouth-southampton', dir: 'top' },
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
  { id: 'M27', lat: 50.849, lng: -1.19, corridor: 'portsmouth-southampton', minZoom: 0 },
];

// Light, low-noise map: white roads, warm motorways, pale water, so the orange coverage reads clearly.
const LIGHT_STYLE = [
  { elementType: 'geometry', stylers: [{ color: '#f4f6f9' }] },
  { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#64748b' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#ffffff' }, { weight: 3 }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: EDGE }] },
  // Our own pins label the towns we serve; Google's town names would print on top of them.
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
  top: 'bottom:15px;left:50%;transform:translateX(-50%)',
  bottom: 'top:15px;left:50%;transform:translateX(-50%)',
  left: 'right:16px;top:50%;transform:translateY(-50%)',
  right: 'left:16px;top:50%;transform:translateY(-50%)',
};

const LABEL_FONT = `font:800 13px Outfit,system-ui,sans-serif;color:${INK};white-space:nowrap;text-shadow:0 0 3px #fff,0 0 6px #fff,0 1px 2px #fff`;

const townHtml = (town) => `<div style="position:relative;transition:opacity .3s">
  <span data-accent style="position:absolute;left:-8px;top:-8px;width:16px;height:16px;border-radius:9999px;background:#fff;border:3px solid ${ORANGE};box-shadow:0 0 0 4px rgba(251,126,16,.22),0 1px 4px rgba(15,23,42,.35);cursor:pointer"></span>
  <span data-label style="position:absolute;${LABEL_POSITION[town.dir]};${LABEL_FONT};transition:opacity .3s">${town.name}</span>
</div>`;

const hubHtml = () => `<div style="position:relative">
  <span class="animate-ping" style="position:absolute;left:-20px;top:-20px;width:40px;height:40px;border-radius:9999px;background:rgba(251,126,16,.4)"></span>
  <span style="position:absolute;left:-12px;top:-12px;width:24px;height:24px;border-radius:9999px;background:${ORANGE};border:4px solid #fff;box-shadow:0 0 0 3px rgba(251,126,16,.35),0 2px 8px rgba(15,23,42,.45)"></span>
  <span style="position:absolute;right:20px;top:50%;transform:translateY(-62%);text-align:right;white-space:nowrap;text-shadow:0 0 3px #fff,0 0 6px #fff,0 1px 2px #fff">
    <span style="display:block;font:900 16px Outfit,system-ui,sans-serif;color:${INK}">Aldershot</span>
    <span style="display:block;font:800 9px Outfit,system-ui,sans-serif;letter-spacing:.18em;color:#D96A00">OPERATING HUB</span>
  </span>
</div>`;

const shieldHtml = (id) => `<div style="position:relative;transition:opacity .3s">
  <span data-accent style="position:absolute;left:0;top:0;transform:translate(-50%,-50%);white-space:nowrap;padding:2px 7px;border-radius:7px;background:#fff;border:1.5px solid ${EDGE};color:${MUTED};box-shadow:0 1px 3px rgba(15,23,42,.18);font:800 11px Outfit,system-ui,sans-serif;transition:color .3s,border-color .3s">${id}</span>
</div>`;

const lineStyle = (state) => {
  if (state === 'live') return { strokeColor: ORANGE, strokeOpacity: 1, strokeWeight: 5 };
  if (state === 'dim') return { strokeColor: '#94A3B8', strokeOpacity: 0.55, strokeWeight: 3 };
  return { strokeColor: ORANGE, strokeOpacity: 0.85, strokeWeight: 3.5 };
};

// Google's OverlayView lets the pins be the same HTML as before, anchored to a map position.
const createHtmlOverlayClass = (google) =>
  class HtmlOverlay extends google.maps.OverlayView {
    constructor({ position, html, interactive = false, onEnter, onLeave, onClick }) {
      super();
      this.position = new google.maps.LatLng(position.lat, position.lng);
      this.root = document.createElement('div');
      this.root.style.cssText = `position:absolute;width:0;height:0;${interactive ? 'pointer-events:auto;cursor:pointer' : 'pointer-events:none'}`;
      this.root.innerHTML = html;
      if (onEnter) this.root.addEventListener('mouseenter', onEnter);
      if (onLeave) this.root.addEventListener('mouseleave', onLeave);
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

const LandingCorridorsMap = ({ active, onActiveChange }) => {
  const containerRef = useRef(null);
  const applyRef = useRef(null);
  const onChangeRef = useRef(onActiveChange);
  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'no-key' | 'auth' | 'load'

  useEffect(() => {
    onChangeRef.current = onActiveChange;
  }, [onActiveChange]);

  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};

    loadGoogleMaps()
      .then((google) => {
        if (cancelled || !containerRef.current) return;

        const map = new google.maps.Map(containerRef.current, {
          center: { lat: HUB.lat, lng: HUB.lng },
          zoom: 9,
          minZoom: 7,
          maxZoom: 14,
          styles: LIGHT_STYLE,
          backgroundColor: LAND,
          disableDefaultUI: true,
          zoomControl: true,
          gestureHandling: 'cooperative', // page scroll and one-finger swipes are never hijacked
          clickableIcons: false,
        });

        // Coverage highlight: the map is faded back outside the service area (a big rectangle with a
        // circular hole) and the edge is outlined, so inside stays clear and full-colour.
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
        const serviceEdge = new google.maps.Circle({
          map,
          center: { lat: HUB.lat, lng: HUB.lng },
          radius: SERVICE_RADIUS_METRES,
          strokeColor: ORANGE,
          strokeOpacity: 0.95,
          strokeWeight: 2.5,
          fillColor: ORANGE,
          fillOpacity: 0.05,
          clickable: false,
          zIndex: 0,
        });
        const areas = [outsideMask, serviceEdge];

        const routes = ROUTES.map((route) => {
          const path = route.stops.map((name) => {
            const p = point(name);
            return { lat: p.lat, lng: p.lng };
          });
          const glow = new google.maps.Polyline({ map, path, strokeColor: ORANGE, strokeOpacity: 0, strokeWeight: 14, clickable: false, zIndex: 1 });
          const line = new google.maps.Polyline({ map, path, ...lineStyle('rest'), clickable: false, zIndex: 2 });
          return { corridor: route.corridor, glow, line };
        });

        const HtmlOverlay = createHtmlOverlayClass(google);
        const overlays = [];
        const pins = [];
        const add = (config, extra) => {
          const overlay = new HtmlOverlay(config);
          overlay.setMap(map);
          overlays.push(overlay);
          if (extra) pins.push({ overlay, ...extra });
        };

        SHIELDS.forEach((s) =>
          add({ position: s, html: shieldHtml(s.id) }, { corridor: s.corridor, minZoom: s.minZoom })
        );
        TOWNS.forEach((town) =>
          add(
            {
              position: town,
              html: townHtml(town),
              interactive: true,
              onEnter: () => onChangeRef.current(town.corridor),
              onLeave: () => onChangeRef.current(null),
              onClick: (event) => {
                event.stopPropagation();
                onChangeRef.current(town.corridor);
              },
            },
            { corridor: town.corridor, minZoom: 0, crowded: Boolean(town.crowded) }
          )
        );
        add({ position: HUB, html: hubHtml() });

        map.addListener('click', () => onChangeRef.current(null));

        let currentActive = null;
        applyRef.current = (activeId) => {
          currentActive = activeId;
          const zoom = map.getZoom() ?? 9;

          routes.forEach(({ corridor, glow, line }) => {
            const state = !activeId ? 'rest' : activeId === corridor ? 'live' : 'dim';
            line.setOptions({ ...lineStyle(state), zIndex: state === 'live' ? 4 : 2 });
            glow.setOptions({ strokeOpacity: state === 'live' ? 0.3 : 0, zIndex: state === 'live' ? 3 : 1 });
          });

          // On a narrow map the whole region fits in ~330px, so a few labels would print on top of each
          // other. Those are hidden until the map is zoomed in or their corridor is active.
          const narrow = (containerRef.current?.clientWidth ?? 600) < 480;

          pins.forEach(({ corridor, overlay, minZoom, crowded }) => {
            const el = overlay.root.firstElementChild;
            if (!el) return;
            const state = !activeId ? 'rest' : activeId === corridor ? 'live' : 'dim';
            const hidden = state !== 'live' && zoom < minZoom;
            el.style.opacity = hidden ? '0' : state === 'dim' ? '0.3' : '1';
            const label = el.querySelector('[data-label]');
            if (label) label.style.opacity = crowded && narrow && state !== 'live' && zoom < 10.5 ? '0' : '1';
            const accent = el.querySelector('[data-accent]');
            if (accent && accent.textContent.trim()) {
              accent.style.color = state === 'live' ? '#D96A00' : MUTED;
              accent.style.borderColor = state === 'live' ? ORANGE : EDGE;
            }
          });
        };

        map.addListener('zoom_changed', () => applyRef.current?.(currentActive));

        // The standard map only zooms in whole steps, so the view is either tight (towns legible, service
        // area outline partly cut off) or wide (whole circle, but labels collide). Towns win. On a wider
        // map there is room for a little extra to the north and east, which shows more of the outline.
        const fit = () => {
          const bounds = new google.maps.LatLngBounds();
          bounds.extend({ lat: HUB.lat, lng: HUB.lng });
          TOWNS.forEach((t) => bounds.extend({ lat: t.lat, lng: t.lng }));
          if ((containerRef.current?.clientWidth ?? 0) >= 480) {
            bounds.extend({ lat: HUB.lat + 0.3, lng: HUB.lng });
            bounds.extend({ lat: HUB.lat, lng: HUB.lng + 0.4 });
          }
          map.fitBounds(bounds, 48);
        };
        fit();
        google.maps.event.addListenerOnce(map, 'idle', () => applyRef.current?.(null));

        // Refit when the container changes size, e.g. rotating a phone or resizing the window.
        const observer = new ResizeObserver(() => {
          google.maps.event.trigger(map, 'resize');
          fit();
          applyRef.current?.(currentActive);
        });
        observer.observe(containerRef.current);

        setStatus('ready');
        cleanup = () => {
          observer.disconnect();
          overlays.forEach((o) => o.setMap(null));
          areas.forEach((a) => a.setMap(null));
          routes.forEach(({ glow, line }) => {
            glow.setMap(null);
            line.setMap(null);
          });
          google.maps.event.clearInstanceListeners(map);
          applyRef.current = null;
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
    applyRef.current?.(active);
  }, [active]);

  return (
    <div className="relative w-full h-full" style={{ background: LAND }}>
      <div
        ref={containerRef}
        role="region"
        aria-label="Map of the mobile tyre fitting corridors radiating from the Aldershot hub to Yateley, Camberley, Farnborough, Farnham, Guildford, Southampton and Portsmouth."
        className="w-full h-full"
      />

      {status === 'loading' && (
        <div role="status" className="absolute inset-0 flex items-center justify-center" style={{ background: LAND }}>
          <Loader2 size={30} className="animate-spin text-[#FB7E10]" aria-hidden="true" />
          <span className="sr-only">Loading map</span>
        </div>
      )}

      {MESSAGES[status] && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center" style={{ background: LAND }}>
          <MapPin size={30} className="text-[#FB7E10]" aria-hidden="true" />
          <p className="text-sm font-semibold text-slate-700 max-w-xs">{MESSAGES[status]}</p>
          <p className="text-xs text-slate-500 max-w-xs">We cover Aldershot, Camberley, Farnborough, Guildford, Portsmouth and Southampton.</p>
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
    </div>
  );
};

export default LandingCorridorsMap;
