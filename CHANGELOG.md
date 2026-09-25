# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- The three figures in the hero now count from zero to their real value over
  900ms behind a blur that resolves from 12px, so the row settles rather than
  appearing. The final value is what gets server-rendered, the animating
  digits are `aria-hidden` with an `sr-only` copy of the true value, and the
  whole effect is skipped under `prefers-reduced-motion`.

### Changed

- `tokensdk` tracked through its rebrand. The repository moved to a `next`
  default branch and became `@coccinella-labs/tokensdk` on npm, serving the
  Coccinella REST API. The catalog description, overview, and install command
  all named the old Harper API and the `harpertoken` package.

## [2.0.0] - 2026-09-25

A new major release. The simulated operating system that formed the front
page through v1.x is gone, along with the showcase pitch and the duplicate
discovery surfaces. The site is now the catalog, presented plainly.

### Removed

- OS home layer: boot sequence, status bar, wallpaper, app windows, taskbar,
  and the mockups that fed them. The code remains under `src/os/` but is no
  longer rendered.
- The harper showcase and its B2B sales copy.
- `Categories` and `Discovery` components, folded into the project index.
- The green accent and brand pink from the interface.
- The "system online" status line and its live indicator.

### Added

- Full favicon set wired up: multi-size `favicon.ico`, `favicon.svg`,
  `apple-touch-icon.png`, and both manifest icons with correct sizes.
- Build-time repository count: `src/lib/org.ts` reads the exact figure from
  the GitHub API during the build and falls back to 156 when the API is
  unavailable. The hero, status line, and About page all read from it.
- `--surface-hover` token, applied to the project index disclosure.

### Changed

- Refreshed README project layout, local setup, and deploy docs; added a
  workflows README covering CI, deploy, and the pre-commit hook.
- Palette replaced with a neutral grayscale system. Dark mode is
  `#262626`/`#dedede`/`#424242`/`#9d9d9d`/`#2c2c2c`; the green accent and
  brand pink are gone from the interface. Page backgrounds now use
  `bg-background` instead of hardcoded hex values, so light mode is true
  white rather than blue-grey.
- Theme switch reduced to two states, light and dark, with sun and moon
  icons. An unset preference follows the OS and the first click makes it
  explicit. Hydration is handled with `useSyncExternalStore`, which removed a
  mismatch that made React regenerate the tree and warn about a script tag.
- Header is two rows: brand and theme switch above, nav links left-aligned
  beneath at the same gutter, center left empty. Anchor offsets updated for
  the taller bar.
- Hero reduced to the three counts, with the duplicate navigation removed
  after the links moved into the header.
- Radius reduced to a two-value scale: `rounded-md` for controls,
  `rounded-lg` for cards and panels. Full-bleed sections stay square.
- Status line reduced to one plain line of counts and the org link; the
  "system online" line, its green dot, and the surface band were removed.
- Catalog content rebuilt from repository documentation: 142 of 145 project
  pages now carry a factual Overview, and 43 thin descriptions were rewritten.
  Three placeholder repositories are intentionally left as they are.
- Redesigned `DESIGN.md` to describe the current site. The previous snapshot
  documented the retired OS layer.

### Fixed

- 21 installation commands that did not work. Each was tested rather than
  assumed: the `pip install git+` form fails for 17 repositories that are not
  installable packages, `npm install github:` pointed at names that do not
  exist, and `go get` was wrong for a CLI. The five `pip install` commands
  that do resolve were left alone.
- Published metadata corrected against the repositories: `diff` is MIT plus
  custom terms rather than plain MIT, `diff-mac` and `weight` have no license
  file, `path` is CC BY 4.0, and `harpertoken` is a Perl linting tool rather
  than a fine-tuning project. `l2` and `vesper` are documented as two
  entrypoints of the same `friday_gemini_ai` gem.
- 28 kebab-case project names display as readable text; slugs and URLs are
  unchanged.
- Removed 116 project pages whose Overview repeated the page description
  verbatim.
- Hero no longer renders 64px of empty space above the counts.
- Three redundant horizontal rules removed, and list row spacing unified.

## [1.1.0] - 2026-09-18

### Added

- Founding v0.1.0 releases for the eight new tools, with real installation
  commands and release/activity listings.
- The complete org collection is now listed: the existing GitHub Actions
  (release, stale, auto-merge, auto-label, title, cancel, lock, prune,
  rust-fix, bump, echo), reusable workflows (gon, nightly,
  rust-nightly, release-assets, activity, bot), and the new tools.
- Six more org repos now listed: config, dotfiles, gradledemo, hbotest,
  hello, and hi, with a Java language filter.
- coccinella-labs OS v0.1.0 "Seven Spot": stated version with ladybird
  release names, an append-only history ledger, and a version card on
  the About page.
- Local pre-commit hook (`.githooks/`, `npm run setup:hooks`) mirroring
  CI lint and typecheck.

### Changed

- Project statuses updated from "In development" to their shipped states;
  installation commands now point at real releases.
- Category counts reflect the full org collection.
- Language filters extended for Shell and YAML workflows.
- Fixed stale catalog data: harper and homebrew-tap descriptions, bot and
  startkit languages.
- The live GitHub status line under "Open harper" (and on app tiles) now
  reserves its space and fades in instead of popping in with a layout
  shift.

## [1.0.0] - 2026-08-07

Initial release of the coccinella-labs website.

### Added

- Landing page with hero, philosophy, projects, categories, discovery,
  activity, and principles sections
- Static project pages at `/projects/<slug>/` with overview, installation,
  repository, license, and related tools
- Interactive project discovery with search and filters shared via the URL
  (`?language=rust&type=action`)
- Custom 404 page
- About page at `/about`
- Full metadata: Open Graph, Twitter cards, canonical URLs, JSON-LD
  Organization schema, sitemap, robots.txt, and web app manifest
- Custom logo with `favicon.ico`, `favicon.svg`, `apple-touch-icon.png`, and
  social preview image
- GitHub Actions deployment to GitHub Pages with automatic build date
- Repository governance: `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`, `SECURITY.md`,
  `CHANGELOG.md`, and license
- Single-theme design with the Inter typeface, no dark mode
