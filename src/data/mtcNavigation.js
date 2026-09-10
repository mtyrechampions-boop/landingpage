// Main-site navigation for the landing page header.
// Every href points at the LIVE page on mobiletyrechampions.com — these pages are
// not part of this project and must not be recreated here. URLs were taken from the
// live site's own navigation and each returned HTTP 200 when verified (2026-09-10).
const SITE = 'https://mobiletyrechampions.com';

export const MTC_HOME_URL = `${SITE}/`;
export const PHONE_HREF = 'tel:02071013856';
export const PHONE_DISPLAY = '0207 101 3856';

export const MTC_NAV = [
  { label: 'Home', href: `${SITE}/` },
  { label: 'About', href: `${SITE}/about` },
  { label: 'Find Tyres', href: `${SITE}/find-tyres` },
  {
    id: 'services',
    label: 'Services',
    overview: { label: 'All Services', href: `${SITE}/services`, description: 'Every mobile tyre service we offer' },
    items: [
      { label: 'Mobile Tyre Fitting', href: `${SITE}/services/mobile-tyre-fitting` },
      { label: 'Emergency Tyre Fitting', href: `${SITE}/services/emergency-tyre-fitting` },
      { label: 'Puncture Repair', href: `${SITE}/services/puncture-repair` },
      { label: 'Locking Wheel Nut Removal', href: `${SITE}/services/locking-wheel-nut-removal` },
      { label: 'Trailer Tyre Fitting', href: `${SITE}/services/trailer-tyre-fitting` },
      { label: 'Premium Tyre Service', href: `${SITE}/services/premium-tyre-service` },
      { label: '24/7 Tyre Service', href: `${SITE}/services/24-7-tyre-service` },
      { label: 'Wheel Balancing', href: `${SITE}/services/precision-wheel-balancing` },
      { label: 'Tyre Recycling', href: `${SITE}/services/tyre-recycling` },
      { label: 'Van Tyres', href: `${SITE}/services/van-tyres` },
    ],
  },
  {
    id: 'areas',
    label: 'Areas We Cover',
    shortLabel: 'Areas',
    overview: { label: 'All Locations', href: `${SITE}/locations`, description: 'See every town we cover' },
    items: [
      { label: 'Hampshire', href: `${SITE}/locations/hampshire` },
      { label: 'Berkshire', href: `${SITE}/locations/berkshire` },
      { label: 'Surrey', href: `${SITE}/locations/surrey` },
      { label: 'Reading', href: `${SITE}/locations/reading` },
    ],
  },
  {
    // The live site has no standalone Commercial Tyres page — it's a dropdown
    // grouping these service pages, so we mirror that rather than invent a URL.
    id: 'commercial',
    label: 'Commercial Tyres',
    items: [
      { label: 'Locking Wheel Nut Removal', href: `${SITE}/services/locking-wheel-nut-removal` },
      { label: 'Mobile Trailer Tyre Fitting', href: `${SITE}/services/trailer-tyre-fitting` },
      { label: 'Van Tyres', href: `${SITE}/services/van-tyres` },
    ],
  },
  { label: 'Blog', href: `${SITE}/blogs` },
  { label: 'Contact', href: `${SITE}/contact` },
];
