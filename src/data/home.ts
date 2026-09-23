/**
 * Home page copy, word for word from content/site-content.md (section 1).
 * Items marked CONFIRM / UPDATE are listed in /TODO-client.md; the page shows
 * a dev-only marker next to them.
 */

export const hero = {
  kicker: 'Interior designers in Coimbatore',
  lines: ['Spaces crafted', 'for the way you live'],
  sub: 'Homes, offices and shops across Coimbatore, Tiruppur and Pollachi. Designed in 3D first, then built and fitted by our own carpenters.',
  primary: { label: 'Get a free quote', href: '/get-a-quote/' },
  secondary: { label: 'See our work', href: '/our-works/' },
  /** Bottom strip. `confirm` = waiting on SKE (TODO-client, Home) */
  facts: [
    { text: 'Since 2011', confirm: 'founding year: 2011 or 2013' },
    { text: '100+ projects completed', confirm: 'update project count' },
    { text: 'Handover in about 30 days after design approval', confirm: 'handover timeline' },
  ],
};

export const intro = {
  heading: 'Fifteen years of homes, finished the way they were promised.',
  headingConfirm: '"fifteen" assumes founding in 2011',
  body: [
    'SKE Interiors is a Coimbatore interior design and execution studio. We plan, design and build residential and commercial interiors, and we handle flooring too. Every project starts with a conversation about how you live or work, becomes a 3D design you can see and change, and ends with a space handed over on the date we agreed.',
    "Clients tell us the same three things after handover: the pricing was clear, the finish was right, and it was ready on time. That's the standard we hold every project to.",
  ],
  link: { label: 'More about us', href: '/about-us/' },
  /** Animate once on view. value + suffix are split so they can count up. */
  numbers: [
    { value: 15, suffix: '+', label: 'years', confirm: 'years in business' },
    { value: 100, suffix: '+', label: 'projects completed', confirm: 'update: 2023 figure' },
    { value: 90, suffix: '+', label: 'happy clients', confirm: 'update' },
    { value: 40, suffix: '', label: 'people on the team', confirm: 'update' },
  ],
};

/** 1.3 Services: three cards, not numbered (CLAUDE.md) */
export const services = {
  heading: 'What we design and build',
  items: [
    {
      title: 'Residential interiors',
      text: 'Complete home interiors for apartments, independent houses and villas. Kitchens, wardrobes, living rooms and bedrooms, planned around your family and your budget.',
      link: { label: 'Explore residential', href: '/residential-interiors/' },
    },
    {
      title: 'Commercial interiors',
      text: 'Offices, shops and hospitality spaces that work hard and look the part. Layouts planned for how your team and customers actually move.',
      link: { label: 'Explore commercial', href: '/commercial-interiors/' },
    },
    {
      title: 'Flooring solutions',
      text: 'The right floor for every room, from hard-wearing finishes for busy spaces to warmer surfaces for bedrooms. Supplied and installed by our team.',
      link: { label: 'Explore flooring', href: '/flooring/' },
    },
  ],
};

/** 1.4 Signature: design vs reality */
export const signature = {
  heading: 'The 3D design you approve is the home you get.',
  body: 'Before a single panel is cut, you see your space in 3D and change what you want. Drag across to compare the approved design with the finished room.',
  control: 'Drag to compare',
};
