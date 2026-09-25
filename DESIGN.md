# Site design — record of what is now

Snapshot of the current design, kept so it can be re-evaluated later.
This file describes what exists today, not what it should become. It was
written because the current design may be carrying too much hype, which
risks eye fatigue and diluting the site's direct message. Do not treat the
"Concern" section as agreed conclusions; treat it as the open questions a
future re-evaluation should answer.

- Snapshot date: 2026-09-25
- Version: 1.1.0
- Next.js 16.3.5 + Tailwind CSS 4 + TypeScript, static export

## What the site claims to be

The positioning (README, metadata, copy) is:

> "A quiet home for small developer tools."

The stated principles everywhere: small over large, stable over clever,
useful over busy, independent by design.

## What the design actually presents

The presentation contradicts the "quiet" claim on the surface. The front
page is an interactive simulated operating system, layered with live data
and motion, followed by a hard sales pitch for harper.

## Page structure (home)

Sections in render order (`src/app/page.tsx`):

1. **Sticky header** — logo + wordmark, nav (Products / Projects / About),
   GitHub button, theme switch, mobile hamburger menu. `backdrop-blur`,
   `border-b border-line`.
2. **OS home** (`src/os/OSHome.tsx`) — the hero:
   - `Wallpaper`: fixed full-viewport dotted grid (26px dot pattern) plus
     two huge blurred color blobs (brand pink `#f34b7d`, sky blue) at
     15–20% opacity, 120–130px blur.
   - `BootScreen`: on first load, a full-screen dark overlay with round
     icon, OS name/version, animated progress bar; auto-dismisses after
     1.2s (0s under reduced motion) or on click.
   - `StatusBar`: live clock (per-second), date, OS name + version, plus
     real browser APIs rendered as OS chrome — online/offline, Wi-Fi signal
     (RTT-derived arcs), battery %, charging bolt.
   - `Banner`: harper flagship — pink-dot oversized headline, agent-harness
     pitch, three chips ("sandboxed jobs", "human approvals",
     "self-hosted"), "Open harper" / "Source" buttons, live line from
     GitHub (`★ N · language · updated …`).
   - **Search** with `⌕`, placeholder "Search apps, models, tools…",
     `/` keyboard shortcut, live filtering across apps.
   - **App shelves**: horizontally scrolling "Applications" tiles — one per
     product with a gradient glyph, name, tag, live GitHub/Hugging Face
     metric lines, and a hover-toggled "open ↗" hint and pink ring glow.
   - **App windows**: each tile opens a draggable, focusable, minimizable,
     maximizable window showing an animated product mockup. Taskbar at the
     bottom manages open windows.
3. **Philosophy** — "Small tools, strong opinions." 4-cell hairline grid.
4. **Showcase** — "What we can ship for you." harper mockup + four sales
   pitches ("Deploy in days, not quarters", "Perpetual license or SaaS",
   "Self-hosted, even air-gapped", "Direct line to maintainers") + CTAs.
5. **Projects** — "A quiet collection." 9 featured project cards.
6. **Categories** — "Where projects live." 5 bucket cards with counts.
7. **Discovery** — "Find a tool." search + language/type filters, state
   synced to URL query params.
8. **Activity** — "What's happening." two live panels (releases, recent
   activity) fed by GitHub org events, with pulsing green live dots.
9. **Principles** — "Every project should." 4 text bars.
10. **Footer** — background `alaska-footer.jpg` (20% opacity, grayscale),
    license/company links, build date.

## Sub-pages

- `/projects/[slug]/` — header band (back link, mono title, language ·
  category, status pill), Overview and Installation (copy-to-clipboard)
  columns, Details sidebar (repo / license / language / type / status) and
  related tools.
- `/about/` — text page.
- Plus manifest, sitemap, 404.

## Visual language

- **Type**: Inter for body; heavy use of `font-mono` (default mono stack)
  for eyebrows, names, versions, metadata, "status line" text. Uppercase +
  `tracking-widest` on section eyebrows.
- **Color tokens** (CSS vars, light/dark): background `#fff`/`#0d1117`,
  foreground `#111`/`#e6edf3`, line `#ececec`/`#30363d`, muted
  `#6b7280`/`#8b949e`, accent green `#1f883d`/`#3fb950`.
- **Brand pink** `#f34b7d`: harper dot, CTA buttons, tile hover glow,
  wallpaper blob, boot progress bar. Occurs as the only saturated hue in an
  otherwise muted palette.
- **Surfaces**: mostly flat paper with `border-line` hairline outlines and
  near-invisible fills (`bg-neutral-900/[0.03]`, `dark:bg-white/[0.04]`).
  Radius mix: `rounded-xl` sections, `rounded-2xl/3xl` OS hero surfaces,
  `rounded-full` chips/pills.
- **Shadows**: OS windows `shadow-2xl shadow-black/40–50`; otherwise no
  drop shadows outside the OS layer.

## Motion & animation inventory

Global (`globals.css` keyframes): `blink` (terminal cursor), `dot` (typing
dots), `eq` (equalizer bars), `progress` (indeterminate bar), `ghost`
(3px rise + fade-in pop).

Live uses, by surface:

- Boot screen progress bar; boot delay 1.2s.
- Mockups (`src/os/mockups.tsx`, ~564 lines): blinking cursors, pulsing
  green status dots, spinning loaders, staggered typing-dot indicators,
  progress bars, equalizer bars, ghosted text that pops in ("live" lines).
- OS tiles/banner: `animate-ghost` pop-in for live metric lines.
- Tile hover: whole-tile transition + pink ring `shadow-[0_0_0_3px_rgba(243,75,125,0.35)]`.
- Global hover transitions (200ms) on bg/border/color for most elements
  (only under `prefers-reduced-motion: no-preference`).
- `prefers-reduced-motion: reduce` strips every animation to ~0ms and
  forces `autoplay: 0` boot.

Count of animated/glowing elements is high: each mockup keeps multiple
indefinitely-running animations at once (spinner + pulse + progress +
blink + eq + dot stacking in one viewport).

## Interactivity & "live" layer

- Simulated OS behaviors: draggable/focusable/min/max windows, taskbar
  switching, `/` + Enter search.
- Real browser APIs dressed as OS chrome: `navigator.onLine`, Network
  Information API (effectiveType / downlink / rtt), Battery API, live clock.
- Real data: GitHub org repos (stars, language, last push) and org events;
  Hugging Face models/spaces for harpertoken. Labels say "live from
  GitHub", "live from Hugging Face".
- Theme switch: light/dark/system, `localStorage` key `coccinella-labs:theme`,
  applied pre-hydration via inline script (no flash).
- Discovery filters sync to URL search params (shareable).

## Scale

- 144 project pages generated statically from `src/lib/projects.ts`.
- All content is typed data; interactivity is client-side only.

## Concern (open questions for re-evaluation)

The site's stated identity is quiet and small, but much of the current
surface is loud and busy:

**Candidate fatigue / hype sources, as built today**
- The OS boot sequence on every load.
- Four-plus concurrent animations visible at once (mockups + live dots +
  ghost lines + pulsing badges), some driving contrast/blob glows.
- Two giant blurred color blobs + dotted grid wallpaper always behind the
  hero.
- Live metric clutter ("★ N · language · updated X", thumbs/equals counts,
  model counts) chasing the eye on every tile, banner, and window status
  line.
- The Showcase section's wholesale B2B sales pitch ("Deploy in days", "You
  talk to the people who wrote it") is a strong tone shift away from quiet.
- Two separate marketing surfaces for the same product before the catalog
  (OS banner + Showcase), and an "Open harper" CTA front and center.
- A second search UI (hero search vs. Discovery section search) and
  duplicated listing concepts (OS app shelves vs. Projects vs. Discovery).

**Signal the design may be working against itself**
- "A quiet home for small developer tools" reads as the opposite of the
  boot screen, fake status bar, and glowing OS.
- The direct message of the catalog ("small tools that do one thing well")
  is delivered plainly and clearly in Projects / Discovery / Principles —
  which are the lowest-effort sections on the page.

**Questions a re-evaluation should answer**
1. What is the one thing a first-time visitor should take away, and does
   the current first screen say it?
2. Which surfaces (OS metaphor, live data, mockups, sales pitch) actually
   serve that message, and which are decoration?
3. Is the OS + live-data layer a signature worth keeping, or a source of
   the fatigue?
4. If we quieted the site, which elements would we keep as-is? Projects,
   Discovery, Principles, project pages are the obvious candidates.

This is a record, not a plan: nothing here is committed to change.