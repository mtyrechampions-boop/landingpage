'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const ORANGE = '#FB7E10';
const TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

const pinIcon = () =>
  L.divIcon({
    className: 'mtc-map-pin',
    iconSize: [0, 0],
    html: `<div style="position:relative">
      <span style="position:absolute;left:-14px;top:-14px;width:28px;height:28px;border-radius:9999px;background:${ORANGE};border:4px solid #fff;box-shadow:0 2px 10px rgba(0,0,0,.45)"></span>
    </div>`,
  });

/**
 * Leaflet map for a geocoded postcode. The pin marks the postcode's centre, so a dashed ring shows
 * that it is approximate; the customer's street address is what the fitter actually uses.
 */
const PostcodeMap = ({ lat, lng, label }) => {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const map = L.map(containerRef.current, {
      scrollWheelZoom: false, // page scroll should never get hijacked by the map
      dragging: !L.Browser.mobile,
      tap: false,
    }).setView([lat, lng], 16);

    L.tileLayer(TILE_URL, {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
    }).addTo(map);

    markerRef.current = L.marker([lat, lng], { icon: pinIcon(), title: label, alt: label, keyboard: false }).addTo(map);
    ringRef.current = L.circle([lat, lng], {
      radius: 120,
      color: ORANGE,
      weight: 2,
      dashArray: '4 6',
      fillColor: ORANGE,
      fillOpacity: 0.1,
      interactive: false,
    }).addTo(map);

    mapRef.current = map;
    const observer = new ResizeObserver(() => map.invalidateSize());
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      map.remove();
      mapRef.current = null;
    };
    // The map is created once; the effect below moves it when the postcode changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    markerRef.current?.setLatLng([lat, lng]);
    ringRef.current?.setLatLng([lat, lng]);
    mapRef.current.setView([lat, lng], 16, { animate: true });
  }, [lat, lng]);

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label={`Map showing the approximate location of ${label}`}
      className="w-full h-full"
      style={{ background: '#e5e7eb' }}
    />
  );
};

export default PostcodeMap;
