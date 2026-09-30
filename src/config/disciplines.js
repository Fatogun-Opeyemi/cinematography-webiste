/* ==========================================================================
   DISCIPLINE PRESETS
   --------------------------------------------------------------------------
   This site is written for one craft at a time, but it is built to be handed
   to another: a photographer, director, editor, colourist or producer.
   A preset supplies every craft-specific string and — importantly — the
   credit schema used on a project page.

   To re-skin: change `disciplineId` in `config/site.js`. That is the only
   edit required; no component changes.
   ========================================================================== */

/** Credit keys → English labels. Presets reorder and may override wording. */
export const CREDIT_LABELS = {
  director: 'Director',
  cinematographer: 'Cinematographer',
  production: 'Production',
  client: 'Client',
  agency: 'Agency',
  cast: 'Cast',
  editor: 'Editor',
  colorist: 'Colourist',
  sound: 'Sound',
  post: 'Post',
  format: 'Format',
  camera: 'Camera',
  lenses: 'Optics',
  location: 'Location',
  runtime: 'Runtime',
};

export const DISCIPLINES = {
  cinematographer: {
    id: 'cinematographer',
    role: 'Director of Photography',
    short: 'Cinematography',
    workLabel: 'Selected Work',
    indexEyebrow: 'Filmography',
    featuredLabel: 'Featured Film',
    reelLabel: 'Showreel',
    plural: 'films',
    capabilitiesTitle: 'How the work is shot',
    capabilities: [
      {
        title: 'Narrative',
        body: 'Feature, short and episodic photography. A look built with the director, then defended take after take.',
      },
      {
        title: 'Commercial & brand',
        body: 'Product, talent and texture under a schedule that does not move. Pre-lit for the edit, not the monitor.',
      },
      {
        title: 'Documentary',
        body: 'Available-light vérité on a rig that never becomes the reason the moment is lost.',
      },
      {
        title: 'Music & fashion',
        body: 'Colour, movement and long-lens intimacy — shot to the track, cut to the frame.',
      },
    ],
    creditOrder: ['director', 'production', 'client', 'format', 'camera', 'lenses', 'location', 'runtime'],
    creditLabelOverrides: {},
    metaLabels: {
      clients: 'Clients & Collaborators',
      recognition: 'Festivals & Recognition',
      kit: 'Formats & Kits',
    },
  },

  photographer: {
    id: 'photographer',
    role: 'Photographer',
    short: 'Photography',
    workLabel: 'Selected Work',
    indexEyebrow: 'Portfolio',
    featuredLabel: 'Featured Series',
    reelLabel: 'Reel',
    plural: 'shoots',
    capabilitiesTitle: 'How the work is made',
    capabilities: [
      {
        title: 'Editorial',
        body: 'Frames built with a stylist, a gaffer and a fixed idea of what the page will look like.',
      },
      {
        title: 'Portrait',
        body: 'Sittings that keep a subject present rather than posed, on film and digital alike.',
      },
      {
        title: 'Reportage',
        body: 'Unobtrusive coverage of places and people exactly as they happen to be.',
      },
      {
        title: 'Campaign',
        body: 'Series work that survives being cropped, cropped again and resized for every format.',
      },
    ],
    creditOrder: ['client', 'director', 'agency', 'production', 'format', 'camera', 'lenses', 'location'],
    creditLabelOverrides: { director: 'Art Direction', format: 'Format / Output' },
    metaLabels: {
      clients: 'Commissions',
      recognition: 'Exhibitions & Press',
      kit: 'Kit & Output',
    },
  },

  director: {
    id: 'director',
    role: 'Director',
    short: 'Direction',
    workLabel: 'Selected Work',
    indexEyebrow: 'Filmography',
    featuredLabel: 'Featured Film',
    reelLabel: 'Showreel',
    plural: 'films',
    capabilitiesTitle: 'How a film gets made',
    capabilities: [
      {
        title: 'Story & treatment',
        body: 'From the written treatment to a shot list that already knows where the edit lands.',
      },
      {
        title: 'Performance',
        body: 'Casting and rehearsal that earn the take long before the camera is rolling.',
      },
      {
        title: 'Design',
        body: 'Production, wardrobe and light treated as one continuous idea rather than departments.',
      },
      {
        title: 'Post',
        body: 'In the grade and the mix, holding the original intent all the way to delivery.',
      },
    ],
    creditOrder: ['production', 'client', 'agency', 'cinematographer', 'editor', 'cast', 'format', 'location', 'runtime'],
    creditLabelOverrides: {},
    metaLabels: {
      clients: 'Commissions & Representation',
      recognition: 'Festivals & Awards',
      kit: 'Formats & Crew',
    },
  },

  editor: {
    id: 'editor',
    role: 'Editor',
    short: 'Editing',
    workLabel: 'Selected Work',
    indexEyebrow: 'Selects',
    featuredLabel: 'Featured Cut',
    reelLabel: 'Reel',
    plural: 'cuts',
    capabilitiesTitle: 'How the cut is built',
    capabilities: [
      {
        title: 'Assembly',
        body: 'Finding the film inside the rushes before anyone has to argue about it.',
      },
      {
        title: 'Feature & episodic',
        body: 'Long-form structure, pacing, and the discipline of knowing which scene is not needed.',
      },
      {
        title: 'Commercial',
        body: 'Agencies, revisions and a delivery date that is not going to move for anybody.',
      },
      {
        title: 'Music-led',
        body: 'Cutting to frame-accurate picture with the track treated as score, not background.',
      },
    ],
    creditOrder: ['director', 'production', 'client', 'cinematographer', 'colorist', 'sound', 'format', 'runtime'],
    creditLabelOverrides: { format: 'Source & Delivery', camera: 'Source Media' },
    metaLabels: {
      clients: 'Cut For',
      recognition: 'Festivals & Awards',
      kit: 'Suites & Formats',
    },
  },

  colorist: {
    id: 'colorist',
    role: 'Colourist',
    short: 'Colour',
    workLabel: 'Selected Work',
    indexEyebrow: 'Grades',
    featuredLabel: 'Featured Grade',
    reelLabel: 'Reel',
    plural: 'grades',
    capabilitiesTitle: 'How a grade is finished',
    capabilities: [
      {
        title: 'Grade',
        body: 'Balance first, then the look. Never the other way around, whatever the reference suggests.',
      },
      {
        title: 'Look development',
        body: 'Building the pipeline on set with the DP and carrying it intact through post.',
      },
      {
        title: 'Matching & restoration',
        body: 'Reconciling cameras, angles and decades into one continuous, invisible grade.',
      },
      {
        title: 'Delivery',
        body: 'HDR and SDR trims, QC and the exact specs your broadcaster or platform requires.',
      },
    ],
    creditOrder: ['director', 'cinematographer', 'production', 'post', 'format', 'location', 'runtime'],
    creditLabelOverrides: { format: 'Deliverables', post: 'Finishing', camera: 'Cameras' },
    metaLabels: {
      clients: 'Graded For',
      recognition: 'Awards & Craft',
      kit: 'Suites & Pipelines',
    },
  },

  producer: {
    id: 'producer',
    role: 'Producer',
    short: 'Production',
    workLabel: 'Selected Work',
    indexEyebrow: 'Productions',
    featuredLabel: 'Featured Production',
    reelLabel: 'Reel',
    plural: 'productions',
    capabilitiesTitle: 'How a production is run',
    capabilities: [
      {
        title: 'Development',
        body: 'Budgeting the story, and knowing precisely where the money has to go.',
      },
      {
        title: 'Physical production',
        body: 'Crew, permits and logistics organised around a schedule that protects the work.',
      },
      {
        title: 'Post supervision',
        body: 'Vendors, deliveries and the unglamorous paperwork that keeps a release on track.',
      },
      {
        title: 'Partnerships',
        body: 'Brand and studio relationships that exist because something was delivered well.',
      },
    ],
    creditOrder: ['director', 'cinematographer', 'client', 'agency', 'production', 'format', 'location', 'runtime'],
    creditLabelOverrides: {},
    metaLabels: {
      clients: 'Produced For',
      recognition: 'Festivals & Awards',
      kit: 'Capabilities & Scales',
    },
  },
};

export const DISCIPLINE_IDS = Object.keys(DISCIPLINES);

export function getDiscipline(id) {
  return DISCIPLINES[id] ?? DISCIPLINES.cinematographer;
}

/** Resolve the label for a credit key under the active discipline. */
export function creditLabel(discipline, key) {
  return discipline.creditLabelOverrides?.[key] ?? CREDIT_LABELS[key] ?? key;
}
