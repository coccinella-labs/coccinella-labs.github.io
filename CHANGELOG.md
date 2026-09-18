# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
