/**
 * Business details, navigation and footer content.
 * Source: content/site-content.md, section 0 (Global). Keep this file and the
 * content file identical: NAP must match everywhere, word for word.
 *
 * `null` means "waiting on SKE" (a [CONFIRM] item). Components render a
 * dev-only placeholder for these and nothing in production.
 */

export const business = {
  name: 'SKE Interiors',
  address: {
    street: 'No. 1, S.F. No. 151/2B, Sendadu Road',
    locality: 'Kottaipalayam, S.S. Kulam',
    city: 'Coimbatore',
    postcode: '641110',
    region: 'Tamil Nadu',
    /** One-line version, exactly as in the content file */
    full: 'No. 1, S.F. No. 151/2B, Sendadu Road, Kottaipalayam, S.S. Kulam, Coimbatore – 641110, Tamil Nadu',
  },
  phones: {
    mobile: [
      { label: '+91 98945 88673', tel: '+919894588673' },
      { label: '+91 99405 88673', tel: '+919940588673' },
    ],
    landline: { label: '0422 421 8673', tel: '+914224218673' },
  },
  /** WhatsApp goes to the first mobile number (the one the content file's error message uses) */
  whatsapp: {
    number: '919894588673',
    message: "Hi SKE Interiors, I'd like a quote for my [home/office] interior in [area].",
  },
  email: null as string | null, // [CONFIRM: one email only]
  hours: null as string | null, // [CONFIRM]
  founded: null as string | null, // [CONFIRM: 2011 or 2013]
  social: {
    instagram: 'https://www.instagram.com/ske_interiors/',
    facebook: 'https://www.facebook.com/skeinteriors/',
  },
  areasServed: ['Coimbatore', 'Tiruppur', 'Pollachi'], // [CONFIRM more areas]
} as const;

/** WhatsApp deep link with the prefilled message */
export const whatsappUrl = (message: string = business.whatsapp.message) =>
  `https://wa.me/${business.whatsapp.number}?text=${encodeURIComponent(message)}`;

/** Google Maps search for the address (the listing link is still [CONFIRM]) */
export const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${business.name}, ${business.address.full}`
)}`;

export const services = [
  { label: 'Residential interiors', short: 'Residential', href: '/residential-interiors/' },
  { label: 'Commercial interiors', short: 'Commercial', href: '/commercial-interiors/' },
  { label: 'Flooring', short: 'Flooring', href: '/flooring/' },
] as const;

export type NavItem = { label: string; href: string; children?: readonly { label: string; href: string }[] };

export const nav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about-us/' },
  { label: 'Services', href: '/residential-interiors/', children: services },
  { label: 'Our work', href: '/our-works/' },
  { label: 'Contact', href: '/contact-us/' },
];

export const quoteHref = '/get-a-quote/';

export const footer = {
  line: 'Home and commercial interiors in Coimbatore, designed in 3D and built by our own team.',
  studio: [
    { label: 'About', href: '/about-us/' },
    { label: 'Our work', href: '/our-works/' },
    { label: 'Contact', href: '/contact-us/' },
    { label: 'Get a quote', href: quoteHref },
  ],
  copyright: '© 2026 SKE Interiors. All rights reserved.',
  privacyHref: '/privacy/',
};
