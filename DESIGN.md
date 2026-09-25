# Site design — record of what is now

Snapshot of the current design, kept so it can be re-evaluated later. This
file describes what exists today, not what it should become.

The previous snapshot (2026-09-25, version 1.1.0) recorded a front page built
as a simulated operating system and flagged that its loudness contradicted the
site's quiet positioning. That gap has since been closed. The OS metaphor,
boot sequence, status bar, showcase pitch, and mockups are no longer part of
the rendered site; the layer survives only as unreferenced code under
`src/os/`. What follows describes the design as it now stands.

- Snapshot date: 2026-09-25
- Version: 1.1.0 (unreleased work on `main`)
- Next.js 16.3.5 + Tailwind CSS 4 + TypeScript, static export

## What the site claims to be

The positioning (README, metadata, copy) is:

> "A quiet home for small developer tools."

Stated principles: small over large, stable over clever, useful over busy,
independent by design.

The presentation now matches that claim. The first screen is three numbers
and nothing else.

## Page structure (home)

Sections in render order (`src/app/page.tsx`):

1. **Sticky header** — two rows at `h-12` plus a nav row: logo and wordmark
   on the first row with the theme switch at the right, then nav links
   (Systems / Projects / Activity / About) left-aligned beneath the wordmark
   at the same 32px gutter. Center stays empty. `backdrop-blur`,
   `border-b border-border`.
2. **Hero** (`src/components/Hero.tsx`) — three figures only: project count,
   repository count, system count. `h1` is `sr-only`. No navigation, no
   search, no call to action.
3. **Systems** — section intro, a 4-column index grid linking to each system
   row, then one row per system with stack, connects-to, and a collapsed
   repository list.
4. **Projects** — a single collapsed disclosure ("Show all 145 projects")
   over a search-and-filter index. Filter state syncs to URL search params.
5. **Activity** — two collapsed disclosures ("Latest Releases",
   "Recently Active") fed live by GitHub org events, with a static fallback.
6. **SysStatus** (`src/components/SysStatus.tsx`) — one plain line: project,
   repository, and system counts plus the GitHub org link. No band, no border,
   no live indicator.
7. **Footer** — `alaska-footer.jpg` at 20% opacity in grayscale, copyright,
   and the Palmshed link.

Eight `<details>` elements on the home page, all closed by default, all
server-rendered.

## Sub-pages

- `/projects/[slug]/` — header band (back link, mono title, language ·
  category · status · license, repository button), then Overview, optional
  Architecture and Capabilities, Installation with a copy button, a Technical
  details sidebar, and related projects. The Overview section renders only
  when it adds information beyond the page description.
- `/about/` — prose, principles, and a release history card showing the two
  most recent entries.
- Plus manifest, sitemap, 404.

## Visual language

- **Type**: Inter for body; `font-mono` for eyebrows, names, versions, and
  metadata. Uppercase + `tracking-widest` on section eyebrows.
- **Color tokens** (CSS vars, light/dark): background `#ffffff`/`#262626`,
  foreground `#111111`/`#dedede`, border `#ececec`/`#424242`, muted
  `#6b7280`/`#9d9d9d`, surface `#fafafa`/`#2c2c2c`, surface-hover
  `#f0f0f0`/`#303030`. Accent equals foreground in both modes. No saturated
  hue remains in the interface; the only green is the logo mark.
- **Surfaces**: flat, with `border-border` hairlines and a single raised
  surface tone. Full-bleed sections and 1px rules stay square; rounding a
  full-width band would break the layout.
- **Radius**: two values. `rounded-md` for controls (buttons, links, inputs),
  `rounded-lg` for bounded cards and panels, `rounded-full` for avatars and
  dots.
- **Shadows**: none.

## Motion

Global keyframes for the terminal cursor, typing dots, equalizer bars,
indeterminate progress, and the ghosted-text pop-in survive in
`globals.css`, used only by the orphaned OS layer. The rendered site relies on
200ms background/border/color transitions under
`prefers-reduced-motion: no-preference`, and the skeleton pulse in Activity.

## Interactivity & live data

- **Theme**: two states, light and dark. `localStorage` key
  `coccinella-labs:theme`. With nothing stored the site follows the OS
  preference; the first click makes the choice explicit. Applied
  pre-hydration by an inline script, so there is no flash.
- **Real data**: GitHub org events feed Activity, with a static fallback when
  the fetch fails. The repository count is fetched from the GitHub API during
  the build and falls back to 156 if the API is unavailable.
- **Catalog filters** sync to URL search params and are shareable.

## Scale

- 145 project pages generated statically from `src/lib/projects.ts`.
- 142 carry a factual Overview sourced from the repository's own README. Three
  placeholders (`bible`, `commitfix`, `gitkeep`) are intentionally left thin
  because their READMEs say nothing.
- All content is typed data; interactivity is client-side only.

## Unresolved

- `src/os/` holds the retired OS layer. It renders nowhere but is still in the
  tree and still carried in diffs. Removing it is a separate decision.
- 43 repositories in the catalog have no license file that GitHub can detect.
  The catalog says "No license file" where it was corrected; the rest are
  recorded as findings, pending a human decision.
