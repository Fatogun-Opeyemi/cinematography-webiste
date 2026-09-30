/* ==========================================================================
   PROJECTS
   --------------------------------------------------------------------------
   PLACEHOLDER CONTENT. Every image and video here is third-party demo
   material — see ./media.js for how to swap it for real work.

   Project shape
   -------------
   slug      URL segment (/work/:slug) — also the React key
   title     Display title, set in the serif face
   year      4-digit number, used for sorting and the index
   type      Filter category, see TYPES below
   featured  true → promoted to the large frame on the home page
   logline   One sentence, set large on the project page
   synopsis  Array of body paragraphs
   runtime   Free text ("18 min", "3 × 60s")
   location  Free text
   poster    Card / index image
   hero      Opening full-bleed frame
   video     Plays in the film overlay
   gallery   Array of { src, ratio, caption }
   credits   Keyed by CREDIT_LABELS in config/disciplines.js — a project page
             renders only the keys the active discipline asks for, so the same
             records work for a cinematographer, editor or colourist site.
   awards    Array of strings; omit if none
   ========================================================================== */

import { VIDEOS, still } from './media';

/** Compact gallery entry builder — keeps the data below readable. */
const frame = (seed, caption, ratio = 'cinema') => ({
  src: still(seed, ratio),
  ratio,
  caption,
});

export const TYPES = [
  'Short Film',
  'Feature',
  'Commercial',
  'Documentary',
  'Music Video',
  'Fashion Film',
];

export const projects = [
  {
    slug: 'hollow-light',
    title: 'Hollow Light',
    year: 2025,
    type: 'Short Film',
    featured: true,
    logline: 'A widow keeps the lights on in a village that has already moved away.',
    synopsis: [
      'Shooting in a valley that loses the sun at three in the afternoon, we built the film entirely around practicals and a single bounced source. Nothing is keyed; everything is shaped. The village becomes a character with its own failing electrical system.',
      'Photographed on 35mm anamorphic over eighteen days with a crew of eleven. The grade was kept deliberately flat in the mid-tones so the last ten minutes can find their contrast for the first time.',
    ],
    runtime: '18 min',
    location: 'Serra da Estrela, PT',
    poster: still('hollow-light-poster', 'wide'),
    hero: still('hollow-light-hero', 'cinema'),
    video: VIDEOS.clipDocumentary,
    gallery: [
      frame('hollow-light-01', 'Dawn, day 12 — practicals only'),
      frame('hollow-light-02', 'Kitchen interior, 2K bounce', 'photo'),
      frame('hollow-light-03', 'The valley road, last light'),
      frame('hollow-light-04', 'Anamorphic flare, take 6', 'wide'),
    ],
    credits: {
      director: 'Inês Rocha',
      production: 'Marlowe & Field',
      format: '35mm anamorphic',
      camera: 'ARRICAM LT',
      lenses: 'Panavision C-Series',
      location: 'Serra da Estrela, PT',
      runtime: '18 min',
    },
    awards: [
      'Sundance Film Festival — Best Cinematography, 2025',
      'Camerimage — Official Selection, 2024',
    ],
  },

  {
    slug: 'saltline',
    title: 'Saltline',
    year: 2025,
    type: 'Commercial',
    logline: 'A car film that refuses to show the car until the final four seconds.',
    synopsis: [
      'Shot across two coastlines in four days, with the car kept out of frame as a discipline rather than a reveal. Long lenses, handheld inside the cabin, and a great deal of waiting for weather that behaved.',
      'The agency brief asked for landscape first and product last. We delivered ninety seconds of the former so the latter would land.',
    ],
    runtime: '90s',
    location: 'Costa Vicentina, PT',
    poster: still('saltline-poster', 'wide'),
    hero: still('saltline-hero', 'cinema'),
    video: VIDEOS.clipCommercial,
    gallery: [
      frame('saltline-01', 'Coast road, magic hour'),
      frame('saltline-02', 'Interior, handheld, 40mm', 'photo'),
      frame('saltline-03', 'Salt pans at noon — four stops over'),
    ],
    credits: {
      director: 'Tomas Lund',
      production: 'Somesuch',
      client: 'Volvo',
      format: 'Large format',
      camera: 'ARRI Alexa Mini LF',
      lenses: 'Cooke S7/i',
      location: 'Costa Vicentina, PT',
      runtime: '90s',
    },
  },

  {
    slug: 'atlas-of-dust',
    title: 'Atlas of Dust',
    year: 2024,
    type: 'Documentary',
    logline: 'Three winters with the last salt harvesters on the Algarve coast.',
    synopsis: [
      'A two-person crew, available light, and a Super 16 camera small enough to be forgotten about. The film took three winters because the work itself happens across about six weeks a year.',
      'The stock was pushed a stop and a half in places, which is why the interiors sit so soft. I would not change a frame of it.',
    ],
    runtime: '74 min',
    location: 'Algarve, PT',
    poster: still('atlas-poster', 'wide'),
    hero: still('atlas-hero', 'cinema'),
    video: VIDEOS.reelAmbient,
    gallery: [
      frame('atlas-01', 'First winter — salt pans, 05:40'),
      frame('atlas-02', 'Hands, 16mm, pushed 1.5 stops', 'photo'),
      frame('atlas-03', 'Barn interior, single window', 'wide'),
      frame('atlas-04', 'Last harvest, third winter'),
    ],
    credits: {
      director: 'Marta Vieira',
      production: 'BBC Studios',
      format: 'Super 16 / digital',
      camera: 'Arriflex 416',
      lenses: 'Zeiss Super Speed',
      location: 'Algarve, PT',
      runtime: '74 min',
    },
    awards: ['IDFA — Official Selection, 2024'],
  },

  {
    slug: 'slow-architecture',
    title: 'Slow Architecture',
    year: 2024,
    type: 'Commercial',
    logline: 'Three films about buildings that were designed to be quiet.',
    synopsis: [
      'Three sixty-second films for a skincare house, each built around a single room and a single decision about where the light enters. Shot over one week in Kyoto and Osaka.',
      'We lit almost nothing. The brief was restraint, so the job was mostly scheduling — knowing which hour of the day would do the work for us.',
    ],
    runtime: '3 × 60s',
    location: 'Kyoto, JP',
    poster: still('slow-architecture-poster', 'wide'),
    hero: still('slow-architecture-hero', 'cinema'),
    video: VIDEOS.clipTexture,
    gallery: [
      frame('slow-arch-01', 'Tatami room, north light'),
      frame('slow-arch-02', 'Concrete stair, no fill', 'photo'),
      frame('slow-arch-03', 'Evening, mixed practicals'),
    ],
    credits: {
      director: 'Yuki Tanaka',
      production: 'Chapter Nine',
      client: 'Aesop',
      format: 'Large format',
      camera: 'ARRI Alexa 35',
      lenses: 'Cooke S7/i',
      location: 'Kyoto, JP',
      runtime: '3 × 60s',
    },
  },

  {
    slug: 'the-long-drift',
    title: 'The Long Drift',
    year: 2023,
    type: 'Short Film',
    logline: 'Two brothers, one trawler, and the last night of the season.',
    synopsis: [
      'Filmed at sea over nine nights, entirely on 35mm, with the camera tethered to whatever could be tethered. Every light on the boat was replaced or gelled, and the rest is moonlight.',
      'The whole film happens between two and four in the morning, which meant three hours of usable darkness per day and a great deal of patience.',
    ],
    runtime: '22 min',
    location: 'Peniche, PT',
    poster: still('long-drift-poster', 'wide'),
    hero: still('long-drift-hero', 'cinema'),
    video: VIDEOS.reelLong,
    gallery: [
      frame('long-drift-01', 'The trawler, 02:10'),
      frame('long-drift-02', 'Wheelhouse, gelled practicals', 'photo'),
      frame('long-drift-03', 'Moonlight, 500 ASA pushed'),
      frame('long-drift-04', 'Return, 05:30', 'wide'),
    ],
    credits: {
      director: 'Inês Rocha',
      production: 'Marlowe & Field',
      format: '35mm',
      camera: 'ARRICAM LT',
      lenses: 'Cooke S4/i',
      location: 'Peniche, PT',
      runtime: '22 min',
    },
    awards: ['Camerimage — Silver Tadpole, 2024'],
  },

  {
    slug: 'bone-china',
    title: 'Bone China',
    year: 2023,
    type: 'Fashion Film',
    logline: 'A porcelain collection filmed like a slow accident.',
    synopsis: [
      'Six minutes, one set, one lens, and a lighting change every forty seconds. Shot on large format to hold the detail in the glaze without ever letting the frame feel like a product shot.',
      'Everything was practical and everything was white. The difficulty was keeping the whites from flattening into each other.',
    ],
    runtime: '6 min',
    location: 'Paris, FR',
    poster: still('bone-china-poster', 'wide'),
    hero: still('bone-china-hero', 'cinema'),
    video: VIDEOS.clipStudio,
    gallery: [
      frame('bone-china-01', 'Set, day 1 — nine practicals'),
      frame('bone-china-02', 'Detail, 100mm macro', 'photo'),
      frame('bone-china-03', 'Silhouette against the light box'),
    ],
    credits: {
      director: 'Yuki Tanaka',
      production: 'Chapter Nine',
      client: 'Hermès',
      format: 'Large format',
      camera: 'ARRI Alexa 35',
      lenses: 'Cooke S7/i',
      location: 'Paris, FR',
      runtime: '6 min',
    },
  },

  {
    slug: 'night-porter',
    title: 'Night Porter',
    year: 2022,
    type: 'Music Video',
    logline: 'A single-take performance film shot entirely in a hotel corridor.',
    synopsis: [
      'One corridor, one take, one dancer, and a dolly track laid over hotel carpet at two in the morning before anyone could complain.',
      'The track was built to be unlistenable on a laptop speaker, so the picture had to carry the rhythm instead. That became the whole grammar of the piece.',
    ],
    runtime: '4:12',
    location: 'Lisbon, PT',
    poster: still('night-porter-poster', 'wide'),
    hero: still('night-porter-hero', 'cinema'),
    video: VIDEOS.clipMusic,
    gallery: [
      frame('night-porter-01', 'Corridor, take 1 — the only take'),
      frame('night-porter-02', 'Steadicam rig, 02:40', 'photo'),
      frame('night-porter-03', 'Final frame, lit from the lift shaft'),
    ],
    credits: {
      director: 'Sam Okonjo',
      production: 'Somesuch',
      client: 'Nadia Bell',
      format: 'Anamorphic',
      camera: 'ARRI Alexa Mini',
      lenses: 'Kowa Prominar',
      location: 'Lisbon, PT',
      runtime: '4:12',
    },
    awards: ['Ciclope Festival — Grand Prix, 2022'],
  },

  {
    slug: 'after-the-factory',
    title: 'After the Factory',
    year: 2022,
    type: 'Documentary',
    logline: 'The last shift of a textile mill, and the town that outlived it.',
    synopsis: [
      'Fifty-two minutes shot across a year in a town of nine thousand people, following three former mill workers through the first year of closure.',
      'We built interview setups in under twenty minutes each and kept the camera moving between them. The film is edited down from almost ninety hours of material.',
    ],
    runtime: '52 min',
    location: 'Covilhã, PT',
    poster: still('after-factory-poster', 'wide'),
    hero: still('after-factory-hero', 'cinema'),
    video: VIDEOS.clipShort,
    gallery: [
      frame('after-factory-01', 'Mill floor, last week of operation'),
      frame('after-factory-02', 'Interview, available light', 'photo'),
      frame('after-factory-03', 'Town square, first autumn after'),
    ],
    credits: {
      director: 'Marta Vieira',
      production: 'Le Monde / Arte',
      format: 'Digital',
      camera: 'Sony Venice',
      lenses: 'Zeiss Master Prime',
      location: 'Covilhã, PT',
      runtime: '52 min',
    },
  },
];

/* --- Selectors ---------------------------------------------------------- */

/** Newest first — the site always reads in reverse chronological order. */
export const projectsByYear = [...projects].sort(
  (a, b) => b.year - a.year || a.title.localeCompare(b.title),
);

export const featuredProject =
  projectsByYear.find((project) => project.featured) ?? projectsByYear[0];

export function getProject(slug) {
  return projectsByYear.find((project) => project.slug === slug);
}

/** Previous / next in the ordered list, wrapping, for project-page navigation. */
export function getProjectNeighbours(slug) {
  const index = projectsByYear.findIndex((project) => project.slug === slug);
  if (index === -1) return { previous: null, next: null };
  const total = projectsByYear.length;
  return {
    previous: projectsByYear[(index - 1 + total) % total],
    next: projectsByYear[(index + 1) % total],
  };
}

/** Distinct types actually present, in TYPES order, for the work filter row. */
export const availableTypes = TYPES.filter((type) =>
  projects.some((project) => project.type === type),
);
