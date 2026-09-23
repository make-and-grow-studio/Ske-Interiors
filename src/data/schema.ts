/**
 * JSON-LD (schema.org) builders. NAP comes from src/data/site.ts, so it
 * matches the content file exactly. Fields still marked [CONFIRM] (hours,
 * rating, founding year, email, geo) are left out until SKE confirms them.
 */
import { business } from './site';

const SITE = 'https://skeinteriors.com';

export const businessSchema = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': `${SITE}/#business`,
  name: business.name,
  url: `${SITE}/`,
  image: `${SITE}/og/default.jpg`,
  logo: `${SITE}/icon-512.png`,
  telephone: business.phones.mobile[0].tel,
  address: {
    '@type': 'PostalAddress',
    streetAddress: business.address.street,
    addressLocality: `${business.address.locality}, ${business.address.city}`,
    addressRegion: business.address.region,
    postalCode: business.address.postcode,
    addressCountry: 'IN',
  },
  areaServed: business.areasServed.map((name) => ({ '@type': 'City', name })),
  sameAs: [business.social.instagram, business.social.facebook],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE}/#website`,
  name: business.name,
  url: `${SITE}/`,
  inLanguage: 'en-IN',
  publisher: { '@id': `${SITE}/#business` },
};

/**
 * FAQPage for the home FAQ, built from the same data as the accordion so the
 * two can't drift apart. Unanswered questions (answer: null) are left out.
 */
export const faqSchema = (items: readonly { q: string; answer: string | null }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items
    .filter((i) => i.answer)
    .map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.answer },
    })),
});
