/* ==========================================================================
   SITE CONFIG
   --------------------------------------------------------------------------
   PLACEHOLDER IDENTITY — replace every string in `site` with the real
   photographer's details. `disciplineId` is the one switch that re-skins the
   language of the whole site for a different craft (see ./disciplines.js).

     disciplineId: 'cinematographer' | 'photographer' | 'director'
                 | 'editor' | 'colorist' | 'producer'
   ========================================================================== */

import { getDiscipline } from './disciplines';
import { FORMATS, VIDEOS, still } from '../data/media';

const disciplineId = 'cinematographer';

/** Shared so the hero strip and the contact block can never drift apart. */
const availability = 'Booking Q2 2026';

export const discipline = getDiscipline(disciplineId);

export const site = {
  disciplineId,

  /* --- Identity --------------------------------------------------------- */
  name: 'Elena Marchetti',
  mark: 'EM', // monogram, used in the header and footer
  title: 'Elena Marchetti — Director of Photography',
  description:
    'Director of Photography shooting narrative, commercial and documentary work across Europe. Selected frames, credits and availability.',

  /* --- Contact ---------------------------------------------------------- */
  email: 'studio@elenamarchetti.com',
  phone: '+351 900 000 000',
  location: 'Lisbon, Portugal',
  timezone: 'WET · UTC+0',
  availability,
  representation: [
    { label: 'Commercial', value: 'Chapter Nine, London' },
    { label: 'Narrative', value: 'Marlowe & Field, Paris' },
  ],

  /* --- Navigation ------------------------------------------------------- */
  nav: [
    { label: 'Work', to: '/work' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ],

  /* --- Social / external ------------------------------------------------ */
  socials: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'Vimeo', href: 'https://vimeo.com' },
    { label: 'IMDb', href: 'https://imdb.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
  ],

  /* --- Hero -------------------------------------------------------------
     Not a headline-and-buttons block: a single full-bleed reel frame with the
     name set in the display face and craft metadata along the base. */
  hero: {
    eyebrow: 'Director of Photography',
    statement:
      'A frame is a decision about what the audience is allowed to feel. Everything else is logistics.',
    reel: {
      label: 'Play showreel',
      runtime: '2:14',
      src: VIDEOS.reelLong,
      poster: still('hero-reel-frame', 'wide'),
    },
    /* Base strip, read top to bottom on small screens, in columns above. */
    meta: [
      { label: 'Based in', value: 'Lisbon, PT' },
      { label: 'Working across', value: 'Europe & UK' },
      { label: 'Formats', value: FORMATS.join(' · ') },
      { label: 'Status', value: availability },
    ],
  },

  /* --- About ------------------------------------------------------------
     `portrait` is a placeholder seed; see data/media.js. */
  about: {
    eyebrow: 'About',
    lead: 'Fifteen years behind the camera, mostly spent solving the same problem: how to make a room feel like something.',
    paragraphs: [
      'I shoot narrative, commercial and documentary work, usually as a director of photography and occasionally operating. The approach does not change much between them — read the script, decide what the light is doing emotionally, then build a rig and a crew fast enough to chase it.',
      'Trained on film, working digital, and stubborn about what happens in camera rather than in the grade. I collaborate closely with directors and designers from treatment through to the final DI, and I like being in the room when the edit is being argued about.',
      'Based in Lisbon and shooting across Europe, with a regular crew and kit list I know inside out. Available for features, episodic, commercials and documentary, and always happy to talk about something difficult.',
    ],
    portrait: 'elena-marchetti-portrait',
    portraitCaption: 'Studio, Lisbon — 2025',
    stats: [
      { value: '14', label: 'Years shooting' },
      { value: '40+', label: 'Features & shorts' },
      { value: '60+', label: 'Commercials' },
      { value: '9', label: 'Festival selections' },
    ],
    /* Long-form kit list; label + items are pure data. */
    kit: [
      { label: 'Formats', items: ['35mm', 'Anamorphic', 'Large format', 'Super 16'] },
      { label: 'Bodies', items: ['ARRI Alexa 35', 'ARRI Alexa Mini LF', 'Sony Venice 2', 'ARRICAM LT'] },
      { label: 'Optics', items: ['Cooke S7/i', 'Zeiss Master Prime', 'Panavision C-Series'] },
      { label: 'Support & light', items: ['Steadicam', 'Technocrane', 'HMI & LED package', 'DIT / data'] },
    ],
  },

  /* --- Clients & recognition -------------------------------------------- */
  clients: [
    'Aesop',
    'A24',
    'The National Theatre',
    'Hermès',
    'BBC Studios',
    'Nowness',
    'Monocle',
    'Volvo',
    'Dazed',
    'Somesuch',
    'Le Monde',
    'Sonos',
  ],

  recognition: [
    { year: '2025', title: 'Best Cinematography', detail: 'Sundance Film Festival — Hollow Light' },
    { year: '2025', title: 'Craft Award, Gold', detail: 'Cannes Lions — Saltline' },
    { year: '2024', title: 'Official Selection', detail: 'IDFA — Atlas of Dust' },
    { year: '2024', title: 'Silver Tadpole', detail: 'Camerimage — The Long Drift' },
    { year: '2023', title: 'Nomination, Best Photography', detail: 'British Independent Film Awards' },
    { year: '2022', title: 'Grand Prix', detail: 'Ciclope Festival — Night Porter' },
  ],

  /* --- Contact ---------------------------------------------------------- */
  contact: {
    eyebrow: 'Contact',
    lead: 'Tell me about the film.',
    note: 'Treatments, scripts, boards — or a rough idea and a date. All of it is useful. I read everything and reply within two working days.',
    secondaryNote: 'Full credits, references and a longer reel are available on request.',
  },

  /* --- SEO / social preview --------------------------------------------- */
  seo: {
    description:
      'Elena Marchetti is a Director of Photography based in Lisbon, shooting narrative, commercial and documentary work.',
  },
};

/** Nav entries reused by the footer. */
export const footerNav = site.nav;
