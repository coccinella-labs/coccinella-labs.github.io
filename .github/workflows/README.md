# Workflows

Two workflows run in CI. Both are enforced remotely; the local
pre-commit hook is only a fast mirror and can be skipped, so CI stays
the authority.

## CI (`ci.yml`)

Runs on pull requests and pushes to `main`:

1. `npm ci`
2. `npm run lint`
3. `npm run typecheck`
4. `npm run build`

All four must pass. There is intentionally no blocking prettier check:
the repo has pre-existing formatting drift, so enforcing it would turn
every PR red until a full reformat lands. Run `npm run format` locally
before opening a PR.

## Deploy (`deploy.yml`)

Publishes the static export to the `gh-pages` branch, which serves the
live site. Triggers on pushes to `main` that touch `src/**`,
`public/**`, `next.config.ts`, `package.json`, `package-lock.json`,
`postcss.config.*`, or this workflow file — plus manual dispatch
(`workflow_dispatch`). Docs-only changes (markdown, `.githooks/`) do
not redeploy.

## Local pre-commit hook

`.githooks/pre-commit` mirrors CI locally for speed: blocking `lint` +
`typecheck`, with prettier drift on staged files as a warning only.
Enable once per clone with `npm run setup:hooks`. Bypass with
`git commit --no-verify` when needed; CI will still verify.
