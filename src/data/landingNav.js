// Header navigation for the landing page. Unlike `@/data/mtcNavigation` (which points
// at the live main site), every entry here is an in-page anchor — the landing page is
// self-contained and must not hand visitors off to mobiletyrechampions.com.
// Each `href` matches an `id` on the matching section in `@/app/landing/page`.
export const LANDING_NAV = [
  { label: 'Home', href: '#top' },
  { label: 'Check Availability', shortLabel: 'Availability', href: '#postcode-checker' },
  { label: 'Services', href: '#why-us' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Areas We Cover', shortLabel: 'Areas', href: '#areas' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];
