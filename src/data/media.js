/* ==========================================================================
   PLACEHOLDER MEDIA
   --------------------------------------------------------------------------
   Every asset below is third-party demo content, referenced by URL so nothing
   ships in the repo. When real work arrives:
     1. Drop files in /public/media (or point at your CDN).
     2. Replace the `VIDEOS` entries and the `still()` seeds used in
        `data/projects.js`.
     3. Set `--hero-media-filter: none` in `styles/tokens.css` so the hero
        footage plays at its own grade.
   Nothing else needs to change.
   ========================================================================== */

/** Ratio presets → pixel dimensions requested from the placeholder service. */
const DIMENSIONS = {
  cinema: [2400, 1004], // 2.39:1 anamorphic frame
  wide: [1920, 1080], // 16:9
  photo: [1800, 1200], // 3:2 still
  portrait: [1200, 1500], // 4:5
  square: [1400, 1400],
};

/**
 * Deterministic monochrome placeholder photograph.
 * Grayscale is requested at the source — the site never filters work in CSS,
 * so swapping in real assets cannot inherit an unintended grade.
 */
export function still(seed, ratio = 'wide') {
  const [w, h] = DIMENSIONS[ratio] ?? DIMENSIONS.wide;
  return `https://picsum.photos/seed/${seed}/${w}/${h}?grayscale`;
}

/**
 * Verified placeholder video sources (HTTP 200, video/mp4, small).
 * Deliberately short clips — long enough to read as motion, small enough to
 * loop on a hero without cost.
 */
export const VIDEOS = {
  /** ~4.4 MB, 52s. Good for a hero loop. */
  reelLong: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
  /** ~2.8 MB, 32s. Neutral, quiet, works as an ambient hero. */
  reelAmbient: 'https://media.w3.org/2010/05/video/movie_300.mp4',
  /** ~1.0 MB, 10s. Clean, well-lit, reads as commercial footage. */
  clipCommercial: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4',
  /** ~1.0 MB, 10s. High-contrast, textural. */
  clipTexture: 'https://test-videos.co.uk/vids/jellyfish/mp4/h264/1080/Jellyfish_1080_10s_1MB.mp4',
  /** ~1.0 MB, 10s. Wide landscape, reads as documentary. */
  clipDocumentary: 'https://test-videos.co.uk/vids/sintel/mp4/h264/1080/Sintel_1080_10s_1MB.mp4',
  /** ~1.1 MB, 6s. Close and delicate — good for an inset loop. */
  clipStudio: 'https://mdn.github.io/shared-assets/videos/flower.mp4',
  /** ~0.5 MB, 5s. Very small loop for inline use. */
  clipShort: 'https://mdn.github.io/shared-assets/videos/friday.mp4',
  /** ~6.7 MB, moody and abstract. Music-video register. */
  clipMusic: 'https://cdn.pixabay.com/video/2020/05/25/40130-424930032_large.mp4',
};

/** Formats quoted in the hero meta strip and the kit lists. */
export const FORMATS = ['35mm', 'Anamorphic', 'ARRI Alexa 35', 'Large format'];
