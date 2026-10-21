// Content for the internal /services/[slug] pages. Every claim here is one the landing page
// already makes (coverage, 24/7 dispatch, quote before work, pay after fitting), so the pages
// stay consistent with it. No prices or guarantees are stated.

export const SERVICE_PAGES = [
  {
    slug: 'flat-tyre-replacement',
    title: 'Flat Tyre Replacement',
    metaTitle: 'Flat Tyre Replacement at Your Location | Mobile Tyre Champions',
    metaDescription:
      'Flat or damaged tyre? We bring a replacement and fit it at your home, workplace or a safe roadside spot across Surrey, Hampshire and Berkshire. 24/7.',
    eyebrow: 'Flat tyre replacement',
    heading: 'A Flat Tyre, Replaced Where You Are',
    lead: "Woke up to a flat, or lost pressure on the road? We bring the correct new tyre to your driveway, car park or a safe roadside bay, fit it, balance it and check it. No garage visit, no recovery truck.",
    image: '/images/flat-tyres.webp',
    imageAlt: 'Mobile tyre fitter replacing a flat tyre on a car',
    defaultMode: 'emergency',
    bookLabel: 'Request a replacement',
    features: [
      'New tyre supplied and fitted at your location',
      'Premium, mid-range and budget tyre options',
      'Michelin, Bridgestone, Continental and Goodyear available',
      'Wheel balancing and fitting checks',
      'Old tyre taken away for responsible disposal',
      'Car, van and suitable trailer tyres',
    ],
    goodToKnow: [
      {
        title: "If it's unsafe, don't change it yourself",
        text: 'If you are stopped on a live motorway lane or anywhere unsafe, follow National Highways guidance and contact the emergency services where necessary. We will talk you through a safe place to carry out the work.',
      },
      {
        title: 'Tell us your tyre size, or your registration',
        text: "The size is printed on the sidewall, for example 225/45 R17. Don't know it? Give us your vehicle registration and we will help identify the right tyre.",
      },
      {
        title: 'Stock depends on the exact size',
        text: "We won't confirm a tyre is available until we have checked it. You get a quote for the agreed work before anything is fitted.",
      },
    ],
    faqs: [
      {
        q: 'How quickly can you get to me for a flat tyre?',
        a: 'Typical arrival is 30–60 minutes, depending on your exact location, traffic and the nearest available van. We give you a realistic estimate when we confirm your job rather than promise a time we cannot meet.',
      },
      {
        q: 'Do I pay before you arrive?',
        a: 'No. We do not take an upfront payment for the agreed fitting. You receive a quote before work begins and pay once the tyre has been fitted and checked.',
      },
      {
        q: 'Can you fit just one tyre?',
        a: 'Yes. Tell us what is wrong and we will advise. On some vehicles, such as certain four-wheel-drive models, matching tyres matter, and we will let you know if that applies to yours.',
      },
    ],
    related: ['puncture-repair', 'roadside-tyre-fitting', 'locking-wheel-nut-removal'],
  },

  {
    slug: 'puncture-repair',
    title: 'Puncture Repair',
    metaTitle: 'Mobile Puncture Repair | Mobile Tyre Champions',
    metaDescription:
      'Picked up a nail or screw? Where it is safe and suitable, we repair punctures on site at your home, workplace or roadside across Surrey, Hampshire and Berkshire.',
    eyebrow: 'Puncture repair',
    heading: 'Puncture Repair, Done On Site',
    lead: "Not every puncture needs a new tyre. Where it is safe and compliant to do so, our technicians repair the puncture where your vehicle is parked, so you are back on the road for a fraction of the cost of a replacement.",
    image: '/images/puncture.webp',
    imageAlt: 'Technician inspecting a tyre for a puncture',
    defaultMode: 'scheduled',
    bookLabel: 'Book a puncture repair',
    features: [
      'Tyre inspected before any repair is attempted',
      'Repairs carried out where safe and suitable (BS AU 159)',
      'Done at your home, workplace or a safe roadside spot',
      'Replacement offered if the tyre cannot be repaired',
      'Wheel balancing and fitting checks',
      'Clear quote before work begins',
    ],
    goodToKnow: [
      {
        title: 'Some damage cannot be repaired',
        text: 'Sidewall damage, certain tread areas, or a tyre that has been driven on while flat usually means replacement. We will explain why, and quote for a replacement instead.',
      },
      {
        title: "Don't keep driving on a flat",
        text: 'Driving on a deflated tyre can destroy the sidewall and turn a repairable puncture into a replacement. If you can, stop somewhere safe and call us.',
      },
      {
        title: 'Spotted it early?',
        text: 'A slow leak caught early is the best case for a repair. Book a time that suits you, or call if it is getting worse.',
      },
    ],
    faqs: [
      {
        q: 'Can every puncture be repaired?',
        a: 'No. We inspect the tyre first and only repair where it is safe and suitable. If it cannot be repaired safely we will say so and quote for a replacement.',
      },
      {
        q: 'How long does a repair take?',
        a: 'Most of the time is getting to you. Once on site, inspecting and repairing a tyre is usually quick, and we will give you an arrival estimate when we confirm the job.',
      },
      {
        q: 'Is it urgent? Should I call instead?',
        a: 'If you are stranded or the tyre is going down quickly, call us for the fastest dispatch. If it is a slow leak, the booking form lets you choose a day and time window.',
      },
    ],
    related: ['flat-tyre-replacement', 'roadside-tyre-fitting', 'commercial-tyres'],
  },

  {
    slug: 'roadside-tyre-fitting',
    title: 'Roadside Tyre Fitting',
    metaTitle: '24/7 Roadside Tyre Fitting | Mobile Tyre Champions',
    metaDescription:
      'Blowout or tyre emergency on the road? Our 24/7 mobile team responds across Surrey and Hampshire, including routes connecting the M3, A3, A31 and M27.',
    eyebrow: '24/7 roadside assistance',
    heading: 'Roadside Tyre Fitting, 24 Hours a Day',
    lead: "A blowout, flat tyre or damaged wheel can stop your journey. Our 24/7 mobile team responds to roadside tyre emergencies across Surrey and Hampshire, including routes connecting the M3, A3, A31 and M27.",
    image: '/images/emergency.webp',
    imageAlt: 'Mobile tyre fitting van attending a roadside tyre emergency',
    defaultMode: 'emergency',
    bookLabel: 'Request emergency help',
    features: [
      'Dispatch 24 hours a day, 7 days a week',
      'Emergency tyre replacement at the roadside',
      'Roadside puncture repair where safe and suitable',
      'Locking wheel nut removal',
      'Mobile wheel balancing',
      'Car, van and suitable trailer tyres',
    ],
    goodToKnow: [
      {
        title: 'Calling is the fastest route',
        text: 'For an emergency, phone us rather than filling in a form. Our dispatch team answers around the clock and can start arranging a van straight away.',
      },
      {
        title: 'Your safety comes first',
        text: 'We can help on major routes provided the vehicle is somewhere work can be done safely and legally. If you are on a live motorway lane, do not attempt to change the tyre yourself: follow National Highways guidance and contact the emergency services where necessary.',
      },
      {
        title: 'What to tell us',
        text: 'Your location (postcode, road name or nearest junction), your tyre size or registration, and whether you have a locking wheel nut key.',
      },
    ],
    faqs: [
      {
        q: 'Can you change my tyre on the motorway?',
        a: 'We can assist on major routes including the M3, A3 and M27 when the vehicle is somewhere work can be carried out safely and legally. If you are stopped on a live lane or in an unsafe position, do not attempt the work yourself. We will discuss a safe fitting location with you.',
      },
      {
        q: 'How long until a van arrives?',
        a: 'Typical arrival is 30–60 minutes, depending on location, van availability and live traffic. We confirm an estimate when your job is dispatched.',
      },
      {
        q: 'Do you really work through the night?',
        a: 'Yes. Roadside dispatch runs 24 hours a day, 7 days a week.',
      },
    ],
    related: ['flat-tyre-replacement', 'puncture-repair', 'locking-wheel-nut-removal'],
  },

  {
    slug: 'locking-wheel-nut-removal',
    title: 'Locking Wheel Nut Removal',
    metaTitle: 'Locking Wheel Nut Removal | Mobile Tyre Champions',
    metaDescription:
      'Lost or rounded locking wheel nut key? We remove locking wheel nuts on site with specialist tools, aiming to protect your alloys. Surrey, Hampshire and Berkshire.',
    eyebrow: 'Locking wheel nut removal',
    heading: 'Lost Your Locking Wheel Nut Key?',
    lead: "Key missing, rounded or snapped before an MOT or a wheel change? We carry specialist extraction tools and remove locking wheel nuts at your home, workplace or roadside, with care taken to avoid damaging your alloys.",
    image: '/images/locking wheel 1.webp',
    imageAlt: 'Technician removing a locking wheel nut from an alloy wheel',
    defaultMode: 'scheduled',
    bookLabel: 'Book nut removal',
    features: [
      'Specialist non-destructive extraction tools',
      'Done on site: no need to drive anywhere',
      'Care taken to protect alloy wheels',
      'Can be combined with a tyre replacement or repair',
      'Available around the clock for urgent jobs',
      'Clear quote before work begins',
    ],
    goodToKnow: [
      {
        title: 'Tell us the key is missing when you book',
        text: 'It lets us check the equipment and access we need for your vehicle before we set off.',
      },
      {
        title: 'Check the glovebox first',
        text: 'The key is often stored in the glovebox, boot tool kit or door pocket. If you find it, you may not need us.',
      },
      {
        title: 'Need a tyre as well?',
        text: 'If a locked wheel is also the one that needs a new tyre or repair, mention it in the notes so we can plan one visit.',
      },
    ],
    faqs: [
      {
        q: 'Will removing the nut damage my wheel?',
        a: 'We use specialist non-destructive tools and take care to protect your alloys. Every vehicle and nut is different, so we will explain any risk before we start.',
      },
      {
        q: 'Can you do it at the roadside?',
        a: 'Yes, where it is safe to work. Tell us where you are and we will advise.',
      },
      {
        q: 'Do you replace the locking nuts afterwards?',
        a: 'Ask us when you book. We can advise on your options for the wheel nuts once the old ones are off.',
      },
    ],
    related: ['flat-tyre-replacement', 'puncture-repair', 'roadside-tyre-fitting'],
  },

  {
    slug: 'commercial-tyres',
    title: 'Commercial Tyres',
    metaTitle: 'Mobile Commercial, Van & Trailer Tyre Fitting | Mobile Tyre Champions',
    metaDescription:
      'Van, fleet or trailer tyre problem? We fit commercial tyres at your depot, yard or roadside across Surrey, Hampshire and Berkshire, with VAT receipts.',
    eyebrow: 'Vans, fleets and trailers',
    heading: 'Commercial Tyre Fitting, Without the Downtime',
    lead: "Delivery van down, or a fleet that cannot afford a day in the garage? We fit reinforced commercial tyres on site at your depot, work yard or roadside, with VAT receipts, so your vehicles keep earning.",
    image: '/images/mobile-trailer-tyre-fitting-new.webp',
    imageAlt: 'Mobile tyre fitter working on a van and trailer tyres',
    defaultMode: 'scheduled',
    bookLabel: 'Request commercial fitting',
    features: [
      'Commercial van tyres, including C-rated tyres',
      'Suitable trailer tyres fitted on site',
      'At your depot, yard, workplace or roadside',
      'VAT receipts provided',
      'Emergency dispatch 24/7 for vehicles off the road',
      'Wheel balancing and fitting checks',
    ],
    goodToKnow: [
      {
        title: 'Tell us the vehicle and the size',
        text: 'Commercial tyres are specified by load and size, so give us the registration and the sidewall markings and we will check the options.',
      },
      {
        title: 'Planning ahead saves downtime',
        text: 'For routine replacement across several vehicles, book a time window and we will plan the visit. For a vehicle that is off the road now, call.',
      },
      {
        title: 'Availability depends on the specification',
        text: "We won't confirm stock until we have checked the exact tyre, so you only plan around what we can supply.",
      },
    ],
    faqs: [
      {
        q: 'Do you fit tyres on fleet vehicles at our depot?',
        a: 'Yes, subject to safe access. Give us the location and the vehicles involved and we will confirm timing and the tyres needed.',
      },
      {
        q: 'Can I get a VAT receipt?',
        a: 'Yes, we provide VAT receipts for commercial work.',
      },
      {
        q: 'Do you fit trailer tyres?',
        a: 'We fit suitable trailer tyres on site. Tell us the trailer type and the tyre size when you enquire.',
      },
    ],
    related: ['flat-tyre-replacement', 'puncture-repair', 'roadside-tyre-fitting'],
  },
];

export const getServicePage = (slug) => SERVICE_PAGES.find((page) => page.slug === slug) ?? null;
