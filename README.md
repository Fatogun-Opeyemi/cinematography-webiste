# Reel — a portfolio for filmmakers, photographers and picture people

A cinematic portfolio MVP built with **React 19 + Vite**. Dark, editorial, photography-first: the work is the interface, the chrome gets out of the way.

Built for a cinematographer, but architected so the same codebase serves a **photographer, director, editor, colourist or producer** by changing one value.

---

## Running it

```bash
npm install
npm run dev       # development server
npm run build     # production build → dist/
npm run preview   # serve the production build
npm run lint      # ESLint (flat config, React Hooks rules)
npm run smoke     # renders every route through React and asserts the content
```

`npm run smoke` is a tiny, dependency-free render test: it loads each page through Vite's SSR pipeline, renders it with `react-dom/server`, and fails if a route throws, drops expected copy, or leaks `undefined` into the markup. It catches the bugs a build cannot.

---

## What's in it

**Routes** — flat and shareable, because every project deserves its own URL.

| Route | Page |
| --- | --- |
| `/` | Hero reel, featured film, index, approach, record, about, contact |
| `/work` | Full index with a text filter by category |
| `/work/:slug` | Project: title card, synopsis, credits, awards, stills, pager |
| `/about` | Biography, method, full record including kit |
| `/contact` | Availability, representation, address |
| `*` | Quiet 404 (also reused when a project slug does not resolve) |

**The home page** is a sequence of movements, not a stack of modules: `00` reel → `01` work → `02` approach → `03` record → `04` about → `05` contact.

---

## Design system

Everything visual is a token in `src/styles/tokens.css`. Components never hard-code colour, type or motion.

- **Palette** — near-black (`#0a0a0c`) and a warm off-white (`#edeae4`), hairline rules instead of borders, and one restrained accent: emulsion amber `#c2a075`. No gradients anywhere, including the hero scrim, which is a flat matte.
- **Type** — three roles, three families: `Instrument Serif` for display, `Instrument Sans` for text, `IBM Plex Mono` uppercase with wide tracking for everything that is *metadata* (credits, formats, years, labels). The mono voice is what makes a page read like a credit block rather than a marketing page.
- **Motion** — one reveal primitive (`components/primitives/Reveal` → `data-reveal` + `IntersectionObserver`, styled once in `styles/utilities.css`), plus hover states that only shift hairlines and scale to `1.02`. Easing is `cubic-bezier(0.16, 1, 0.3, 1)`; nothing bounces. Every transition collapses to `1ms` under `prefers-reduced-motion`.
- **Layers** — `--z-header: 60`, `--z-overlay: 80`, `--z-grain: 90`. The mobile menu deliberately sits *beneath* the header so the close control stays tappable.

**Deliberately absent:** no WebGL, no animation library, no CSS framework, no icon library (four hairline SVG strokes in `primitives/Glyph.jsx`), no cards, no dashboard patterns, no contact form (a form with no backend is a broken promise — the address is the action, with copy-to-clipboard).

---

## Re-skinning it for another craft

Two files, no component changes.

**1. Pick a discipline** — `src/config/site.js`:

```js
const disciplineId = 'cinematographer'
// 'photographer' | 'director' | 'editor' | 'colorist' | 'producer'
```

Each preset in `src/config/disciplines.js` supplies the craft-specific language — role, capabilities copy, the word for a body of work, and crucially the **credit schema**:

```js
cinematographer: { creditOrder: ['director', 'production', 'format', 'camera', 'lenses', …] }
colorist:        { creditOrder: ['director', 'cinematographer', 'post', 'format', …],
                   creditLabelOverrides: { format: 'Deliverables', post: 'Finishing' } }
```

The project page renders whatever the active discipline asks for, in its order, under its labels. The same project records read correctly for a DP, an editor and a colourist — nothing is duplicated.

**2. Replace the details** — `site` in the same file holds identity, contact, navigation, hero copy, biography, clients, awards and kit. It is placeholder content: an invented DP called Elena Marchetti, an invented filmography. Swap it all.

Page-level headings that differ by craft (`Clients & Collaborators` vs `Cut For` vs `Graded For`) come from `discipline.metaLabels` and are consumed by `sections/Recognition.jsx` — so no component knows what a cinematographer is.

---

## Swapping the placeholder media for real work

Every image and video is third-party demo material referenced by URL — nothing ships in the repo.

1. Put files in `public/media/` (or point at your CDN).
2. Replace the entries in `src/data/media.js`:

```js
export const VIDEOS = { reelLong: '…', clipTexture: '…' }   // verified demo MP4s
export function still(seed, ratio) { … }                     // picsum.photos, grayscale
```

3. Replace the `still('seed', 'ratio')` calls in `src/data/projects.js` and the `poster` in `site.hero.reel`.
4. Set `--hero-media-filter: none` in `src/styles/tokens.css` so the hero plays at its own grade instead of the matte used for the demo loop.

Placeholder stills are **grayscale at the source** (a URL parameter), never by CSS filter — so real work can never inherit an unintended grade. Every placeholder clip was checked for `200 / video/mp4`; `Frame` falls back to its poster if a video fails, and skips video entirely for reduced-motion visitors.

`Frame` takes a named ratio (`cinema` 2.39:1, `wide`, `photo`, `portrait`, `square`) plus `contained` when a full frame must not be cropped — photographers will want that one.

---

## Architecture

```
src/
  config/     site.js          ← identity + discipline switch
              disciplines.js   ← per-craft language and credit schema
  data/       media.js         ← placeholder stills and clips
              projects.js      ← projects + selectors (sorting, neighbours, types)
  styles/     tokens.css  reset.css  base.css  utilities.css
  hooks/      useScroll  useLockBodyScroll  useMediaQuery  usePrefersReducedMotion
              usePointerPreview  useTimecode  useCopyToClipboard  useSeo
  context/    filmContext.js (context + useFilm)  FilmProvider.jsx (component only)
  components/
    layout/     SiteHeader  SiteMenu  SiteFooter  GrainOverlay  ScrollProgress
                SkipLink  RouteView
    primitives/ Reveal  Frame  Eyebrow  SectionHead  ArrowLink  PlayButton
                MetaList  Glyph
    work/       WorkIndex  WorkRow  FeatureProject  FilmPlayer
    sections/   Hero  SelectedWork  Approach  Recognition  AboutSpread
                PageIntro  ContactCta
  pages/      Home  Work  Project  About  Contact  NotFound
```

Conventions worth keeping:

- **One component per file, CSS Modules beside it.** No shared class namespace, no coupling between a component's styles and its consumers' markup.
- **Global CSS is four files only.** `utilities.css` holds a handful of genuinely global classes (`.shell`, `.section`, `.measure`, `.rule`, `.sr-only`) and the reveal primitive.
- **`Reveal` is the only scroll animation.** If a new section needs motion, wrap it — do not invent a second mechanism.
- **The film overlay is global.** `useFilm().openFilm({ src, poster, title, meta })` opens it from anywhere; one dialog, one `<video>`, one place to change playback behaviour. `FilmPlayer` locks scroll, restores focus on close and closes on `Escape`.
- **Media primitives over `<img>` tags.** Use `Frame` so ratios, captions, loading and treatments stay consistent.

### Hooks of note

| Hook | Purpose |
| --- | --- |
| `useScroll` | One rAF-throttled listener supplying offset, page progress, direction and `atTop` — shared by the header and the progress line instead of each attaching its own |
| `usePointerPreview` | Writes the cursor-trailing preview's transform straight to the node inside a rAF loop: following the pointer never triggers a React render |
| `useTimecode` | The 24fps `HH:MM:SS:FF` readout in the hero base strip, written to `textContent` — it updates 24 times a second without re-rendering the hero |
| `useMediaQuery` | Built on `useSyncExternalStore`, so the browser is the single source of truth and nothing is mirrored into state inside an effect |

---

## Accessibility and motion

- Skip link, `aria-current` on the active nav item, `inert` on the closed mobile panel, focus restored when the film overlay closes, `Escape` to close, focus-visible rings on the accent hairline.
- Section headings are wired with `aria-labelledby`, and the reference is dropped whenever an optional heading is suppressed — never a dangling id.
- `prefers-reduced-motion` removes transitions *and* stops the hero loop, freezes the timecode, disables the cursor preview and disables inline video (posters remain).
- Pointer tracking is gated on `(hover: hover) and (pointer: fine)`; on touch the work index shows inline thumbnails instead.

---

## Deployment

`BrowserRouter` means the host must serve `index.html` for unknown paths so `/work/hollow-light` survives a hard refresh.

- Netlify / Cloudflare Pages — `public/_redirects` is included.
- Vercel — `vercel.json` is included.
- nginx / Apache — add the equivalent SPA fallback, or switch `App.jsx` to `HashRouter` if you cannot control the server.

---

## Where to take it next

- Real assets in `public/media`, then delete the demo URLs from `data/media.js`.
- A per-page `<meta>` / Open Graph layer — `hooks/useSeo.js` is the only file that touches the document head.
- A stills lightbox: `Frame` is the natural place to hang it, and `FilmProvider` is the template for the overlay pattern.
- CMS wiring: `data/projects.js` and `config/site.js` are plain data with no component knowledge, so they are the seam to replace with a fetch.

