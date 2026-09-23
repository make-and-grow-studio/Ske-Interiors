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

/** 1.5 Process: a real sequence, so the steps are numbered */
export const process = {
  heading: 'How your project moves, from first call to handover',
  steps: [
    {
      title: 'Plan',
      text: "We meet, at our studio or your site, and talk through how you use the space, what you love, and what isn't working. You leave with a clear brief.",
    },
    {
      title: 'Estimate',
      text: 'We measure your space and prepare a detailed estimate based on your size, needs and budget. No surprises later.',
    },
    {
      title: 'Design',
      text: 'Our designers build your space in 3D from that brief. You review it, ask for changes, and approve the final design.',
    },
    {
      title: 'Build',
      text: 'Materials are procured and furniture goes into production. Our carpenters install everything on site, with handover in about 30 days from production start.',
      confirm: 'timeline',
    },
  ],
  link: { label: 'Get a free quote', href: '/get-a-quote/' },
};

/** 1.6 Recent work (cards link to the project pages) */
export const recentWork = {
  heading: 'Recent homes',
  confirm: '3 projects is thin for a 15-year studio: ask SKE for 6–10 more with photos',
  link: { label: 'See all work', href: '/our-works/' },
};

/** 1.7 Testimonials: client wording as given (typos fixed only) */
export const testimonials = {
  heading: 'What our clients say',
  ratingConfirm: '★ 4.x from NN Google reviews',
  reviewsLink: 'Read reviews on Google',
  quotes: [
    {
      text: 'Best interior in my opinion. Great in terms of pricing, transparency and open to modifications anytime. Can go blindfolded for interior works. Very economical and efficient carpenter team with loads of experience. Special thanks to SKE Interiors team and carpenters. Keep up the good work!',
      name: 'Jayakumar',
      town: 'Coimbatore',
    },
    {
      text: 'SKE Interiors have amazing ideas and their execution is marvelous. Aesthetically everything was just like they narrated and I dreamt about my home. I had researched a couple of weeks before hiring them and I am happy that I have taken the right decision. Best part is that they completed my house in the given time. Highly recommended!',
      name: 'Vijayakumar',
      town: 'Tiruppur',
    },
    {
      text: "The interior work was well designed and I'm 100 percent satisfied with the finishing. Especially your carpenters were well experienced. My friends and relatives appreciated the interior work done by you. Another good mark is my flat was handed over on time.",
      name: 'Jacline',
      town: 'Pollachi',
    },
    {
      text: 'When we planned the interior for our new house, we approached SKE Interiors. They were very professional and transparent in explaining various designs, and gave us ideas based on the design of our house. We were extremely satisfied with their work and the timelines given were adhered to.',
      name: 'Rajesh Kumar',
      town: 'Coimbatore',
    },
  ],
};

/** 1.8 Budget estimator. Prices live in src/data/pricing.json (not approved yet) */
export const estimator = {
  heading: 'Get a rough budget in 30 seconds',
  body: "Pick your home and what you want done. We'll show an indicative range, then refine it with a free site visit.",
  property: ['1BHK', '2BHK', '3BHK', 'Villa', 'Office'],
  scope: ['Kitchen only', 'Kitchen + wardrobes', 'Full home'],
  finish: ['Essential', 'Premium', 'Luxury'],
  button: 'Show my estimate',
  smallPrint: 'This is an estimate for planning only. Your final quote comes after measurement and design.',
  /** Section 8 (contact form) error message, reused for every form */
  error: "Your enquiry didn't send. Check your phone number and try again, or WhatsApp us on +91 98945 88673.",
};

/**
 * 1.9 FAQ. Also the source of the FAQPage JSON-LD, so the schema always
 * matches what's on the page. `answer: null` = waiting on SKE: the question
 * is left out of the live site (and the schema) until it's answered.
 */
export const faq = {
  heading: 'Questions we get asked',
  items: [
    {
      q: 'How much does interior design cost in Coimbatore?',
      answer:
        "It depends on the size of your home, the rooms you want done and the materials you choose. Use the estimator above for an indicative range, or book a free visit and we'll give you a detailed estimate.",
      confirm: 'add a real starting range if SKE agrees',
    },
    {
      q: 'How long does a full home interior take?',
      answer:
        'Once you approve the 3D design, production and installation take about 30 days for most homes. We confirm the exact timeline in your estimate.',
      confirm: 'timeline',
    },
    {
      q: 'Will I see the design before work starts?',
      answer:
        'Yes. We create a 3D design of your space and revise it with you until you approve it. Nothing goes into production before that.',
    },
    {
      q: 'Do you handle everything, or just design?',
      answer:
        'Both. We design, supply materials, manufacture and install, so you deal with one team from start to finish.',
    },
    {
      q: 'Which areas do you work in?',
      answer: 'Coimbatore and nearby towns including Tiruppur and Pollachi.',
      confirm: 'full list',
    },
    {
      q: 'Is the quote free?',
      answer: 'Yes. The first consultation and quote are free.',
      confirm: 'site visit is free',
    },
    {
      q: 'Do you offer a warranty?',
      answer: null as string | null,
      confirm: 'warranty terms (high-trust answer if SKE offers one)',
    },
  ],
};

/** 1.10 Closing call to action */
export const closing = {
  heading: "Let's plan your space.",
  body: "Tell us about your home or office. We'll call you back within one working day.",
  bodyConfirm: 'response time',
};
