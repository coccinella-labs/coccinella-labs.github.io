# Contributing to coccinella-labs

Thanks for wanting to contribute. The collection stays small and stable on
purpose; if you are unsure whether an idea fits, open an issue and ask before
building.

## Ground rules

Every project in the collection should:

- solve one problem
- stay easy to understand
- have clear documentation
- remain independently useful

## Adding a project to the website

The site is data-driven. To add a project:

1. Add an entry to `src/lib/projects.ts`. Include a name, slug, one-sentence
   description, language, category, GitHub URL, overview, installation
   command, license, and any related projects.
2. Optionally add the project to the `releases` or `recentlyUpdated` lists in
   the same file.
3. The `/projects/<slug>/` page and the sitemap entry are generated
   automatically at build time.

## Development setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

Run these before submitting a pull request:

```bash
npm run format   # prettier
npm run lint     # eslint
npm run build    # typecheck + static export
```

The build must succeed. The site is fully static; see `next.config.ts`.

## Code style

- Prettier is configured in `.prettierrc` (no semicolons, double quotes).
- Follow the conventions of the file you are editing.
- No new dependencies unless a plain static build cannot do the job.
- Client-side JavaScript only where interaction genuinely requires it.

## Opening a pull request

1. Branch from `main`.
2. Keep the change small and focused on one problem.
3. Update the CHANGELOG under `## [Unreleased]`.
4. Run the checks above.
5. Open the pull request. Explain what changed and why.

## Communication

- Bugs and feature ideas: open an issue.
- Questions: [hello@coccinella-labs.dev](mailto:hello@coccinella-labs.dev).
