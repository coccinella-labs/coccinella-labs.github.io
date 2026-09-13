<p align="center">
  <img src="https://raw.githubusercontent.com/Coccinella-Labs/coccinella-labs.github.io/main/.github/assets/thumbnail.png" alt="coccinella-labs.github.io" width="100%">
</p>

# coccinella-labs

A quiet home for small developer tools.

[![Site](https://img.shields.io/website?up_message=online&down_message=offline&label=coccinella-labs.github.io&style=flat-square&url=https%3A%2F%2Fcoccinella-labs.github.io)](https://coccinella-labs.github.io)
[![GitHub Pages](https://img.shields.io/github/deployments/coccinella-labs/coccinella-labs.github.io/github-pages?label=GitHub%20Pages&logo=github&style=flat-square)](https://coccinella-labs.github.io)
[![License](https://img.shields.io/github/license/coccinella-labs/coccinella-labs.github.io?label=License&style=flat-square)](LICENSE)
[![Last Deploy](https://img.shields.io/github/actions/workflow/status/coccinella-labs/coccinella-labs.github.io/deploy.yml?label=Last%20Deploy&logo=github&style=flat-square)](https://github.com/coccinella-labs/coccinella-labs.github.io/actions/workflows/deploy.yml)

This is the source for [https://coccinella-labs.github.io](https://coccinella-labs.github.io).

coccinella-labs is a company of [Palmshed](https://github.com/palmshed), the
home of open-source AI tools, agents, and SDKs. Where Palmshed builds the
ambitious things, coccinella-labs keeps the small ones neat. The same way of
working runs through both: build carefully, ship honestly, and stay easy
to leave behind.

## Stack

- [Next.js](https://nextjs.org) (App Router) with **static export** (no server)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
- Deployed to [GitHub Pages](https://pages.github.com) via GitHub Actions

## Requirements

- Node.js 20 or newer
- npm

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

The site is configured for a fully static export (`output: "export"` in
`next.config.ts`). Build and inspect the output locally:

```bash
npm run build
```

The static site is written to `out/` and can be served from any static file
server:

```bash
npx serve out
```

### Static export constraints

The following are intentionally **not** used, because they require a server:

- Route Handlers
- API routes
- Middleware
- Server Actions
- ISR / dynamic rendering

All content lives in typed data files under `src/lib/`, and interactivity
(search and filters) runs entirely on the client.

## Deployment

Deployment is automatic via GitHub Actions (`.github/workflows/deploy.yml`).
On every push to `main`, the site is built and the static output is pushed to
the `gh-pages` branch, which GitHub Pages serves.

### One-time setup

1. Create the repository and name it **`coccinella-labs.github.io`**.
2. In **Settings → Pages → Build and deployment**, set **Source** to
   **Deploy from a branch** and choose the **`gh-pages`** branch.
3. Push to `main`. The `Deploy to GitHub Pages` workflow builds the site and
   publishes it to [https://coccinella-labs.github.io](https://coccinella-labs.github.io).

After that, every push to `main` updates the site with no manual steps.

### Verifying the workflow locally

The workflow uses the official GitHub Actions:

- `actions/checkout@v4`
- `actions/setup-node@v4`

## Project layout

```
src/
  app/            # App Router: layout, pages, sitemap, manifest, 404
  app/about/      # About page
  app/projects/   # Static project pages (/projects/[slug])
  components/     # UI sections (one per site section)
  lib/            # Data: projects, categories, activity, copy
public/           # Static assets served as-is
.github/
  workflows/      # Pages deployment workflow
  profile/        # Organization profile (repo README preview)
```

## Project pages

Every tool gets a page at `/projects/<slug>/` with an overview, installation
instructions, repository and license details, and related tools. Add a new
tool by adding an entry to `src/lib/projects.ts`; the page is generated
statically at build time.

## License

[MIT](LICENSE)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Reporting a security issue? See
[SECURITY.md](SECURITY.md).
