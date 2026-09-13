export type Language =
  | "Rust"
  | "Go"
  | "TypeScript"
  | "Python"
  | "Shell"
  | "YAML"

export type Category =
  "CLI" | "GitHub Action" | "Library" | "Template" | "Experiment"

export type SectionCategory =
  "CLI" | "GitHub" | "Libraries" | "Templates" | "Experiments"

export type Project = {
  name: string
  slug: string
  description: string
  language: Language
  category: Category
  github: string
  overview: string
  installation: string
  license: string
  status: "Stable" | "Experimental"
  related: string[]
}

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export const languages: Language[] = [
  "Rust",
  "Go",
  "TypeScript",
  "Python",
  "Shell",
  "YAML",
]

export const categories: {
  name: SectionCategory
  blurb: string
  count: number
}[] = [
  {
    name: "CLI",
    blurb: "Developer utilities for everyday workflows.",
    count: 2,
  },
  {
    name: "GitHub",
    blurb: "Actions, reusable workflows, and automation.",
    count: 20,
  },
  {
    name: "Libraries",
    blurb: "Reusable building blocks.",
    count: 1,
  },
  {
    name: "Templates",
    blurb: "Project starters and boilerplates.",
    count: 1,
  },
  {
    name: "Experiments",
    blurb: "Ideas that may eventually become tools.",
    count: 1,
  },
]

export const projects: Project[] = [
  {
    name: "clipb",
    slug: "clipb",
    description: "A lightweight clipboard utility for developers.",
    language: "Rust",
    category: "CLI",
    github: "https://github.com/coccinella-labs/clipb",
    overview:
      "clipb copies file paths to the system clipboard without leaving your terminal. It prints the copied paths back to stdout so you can chain it into other commands, and it handles spaces, symlinks, and relative paths correctly. No wrappers, no daemons, no bloat.",
    installation: "cargo install --git https://github.com/coccinella-labs/clipb",
    license: "MIT",
    status: "Stable",
    related: ["dotenv-keep", "craft"],
  },
  {
    name: "craft",
    slug: "craft",
    description: "Experimental Rust developer tool.",
    language: "Rust",
    category: "Experiment",
    github: "https://github.com/coccinella-labs/craft",
    overview:
      "craft explores installing tools as single, signed binaries without package-manager lock-in. It is an experiment: the interface may change, and the philosophy is being tested. Try it, break it, and tell us what you find.",
    installation: "cargo install --git https://github.com/coccinella-labs/craft",
    license: "MIT",
    status: "Experimental",
    related: ["clipb"],
  },
  {
    name: "dotenv-keep",
    slug: "dotenv-keep",
    description: "Keep and manage .env files safely.",
    language: "Python",
    category: "CLI",
    github: "https://github.com/coccinella-labs/dotenv-keep",
    overview:
      "dotenv-keep compares your .env.example against the variables referenced in your code and reports names that are missing, unused, or drifted. It catches the silent misconfig that only shows up in production.",
    installation: "pip install git+https://github.com/coccinella-labs/dotenv-keep",
    license: "MIT",
    status: "Stable",
    related: ["clipb"],
  },
  {
    name: "mini",
    slug: "mini",
    description: "A minimal Go utility library.",
    language: "Go",
    category: "Library",
    github: "https://github.com/coccinella-labs/mini",
    overview:
      "mini is a single-file HTTP client with no third-party dependencies. It keeps memory use small enough for embedded runtimes, exposes a straightforward request/response API, and can be vendored directly into any project.",
    installation: "go get github.com/coccinella-labs/mini@latest",
    license: "MIT",
    status: "Stable",
    related: ["startkit"],
  },
  {
    name: "startkit",
    slug: "startkit",
    description: "Minimal project template for new libraries.",
    language: "TypeScript",
    category: "Template",
    github: "https://github.com/coccinella-labs/startkit",
    overview:
      "startkit gives you a publish-ready library with nothing beyond the essentials: a test runner, a linter, and a release script. Run it, rename it, and ship. It follows the coccinella-labs principles by making the small choices for you.",
    installation: "npx --yes github:coccinella-labs/startkit mylib",
    license: "MIT",
    status: "Stable",
    related: ["mini"],
  },
  {
    name: "release-notes",
    slug: "release-notes",
    description: "GitHub Action for generating release notes.",
    language: "TypeScript",
    category: "GitHub Action",
    github: "https://github.com/coccinella-labs/release-notes",
    overview:
      "release-notes reads the commits merged between two tags, groups them by conventional-commit type, and writes a markdown file you can attach to a GitHub release. It keeps the changelog honest without a dedicated changelog tool in the repo.",
    installation: "- uses: coccinella-labs/release-notes@main",
    license: "MIT",
    status: "Stable",
    related: ["gh-tag"],
  },
  {
    name: "fmtcheck",
    slug: "fmtcheck",
    description: "GitHub Action for formatting checks.",
    language: "Go",
    category: "GitHub Action",
    github: "https://github.com/coccinella-labs/fmtcheck",
    overview:
      "fmtcheck runs your language's canonical formatter in check mode and fails the build on any diff. Formatting debates stay out of code review because the machine settles them in CI. Zero configuration for the common case.",
    installation: "- uses: coccinella-labs/fmtcheck@main",
    license: "MIT",
    status: "Stable",
    related: ["release-notes", "rust-fix"],
  },
  {
    name: "gh-tag",
    slug: "gh-tag",
    description: "GitHub Action for automated version tagging.",
    language: "TypeScript",
    category: "GitHub Action",
    github: "https://github.com/coccinella-labs/gh-tag",
    overview:
      "gh-tag checks whether a tag already exists, creates it as an annotated semver tag pointing at the current commit, and reports whether it was created. It pairs with release-notes to turn a push into a fully tagged release.",
    installation: "- uses: coccinella-labs/gh-tag@main",
    license: "MIT",
    status: "Stable",
    related: ["release-notes", "release"],
  },
  {
    name: "release",
    slug: "release",
    description: "Runs release automation.",
    language: "Shell",
    category: "GitHub Action",
    github: "https://github.com/coccinella-labs/release",
    overview:
      "An automated release workflow for multi-package repositories. release analyzes commits since the last release tag, determines the version bump type (major, minor, or patch), and can create a release PR, commit and tag directly, or wait for a merge before tagging.",
    installation: "- uses: coccinella-labs/release@v1.0.0",
    license: "MIT",
    status: "Stable",
    related: ["bump", "gh-tag"],
  },
  {
    name: "stale",
    slug: "stale",
    description: "Closes stale issues.",
    language: "Shell",
    category: "GitHub Action",
    github: "https://github.com/coccinella-labs/stale",
    overview:
      "A reusable action that closes stale issues after a period of inactivity, so the issue list stays honest and current.",
    installation: "- uses: coccinella-labs/stale@v1",
    license: "MIT",
    status: "Stable",
    related: [],
  },
  {
    name: "auto-merge",
    slug: "auto-merge",
    description: "Merges pull requests automatically.",
    language: "Shell",
    category: "GitHub Action",
    github: "https://github.com/coccinella-labs/auto-merge",
    overview:
      "Enables or disables auto-merge on pull requests. It can wait for checks to pass, cancel auto-merge, or merge immediately.",
    installation: "- uses: coccinella-labs/auto-merge@v1",
    license: "MIT",
    status: "Stable",
    related: ["lock"],
  },
  {
    name: "title",
    slug: "title",
    description: "Fixes pull request titles.",
    language: "Shell",
    category: "GitHub Action",
    github: "https://github.com/coccinella-labs/title",
    overview:
      "Rewrites pull request titles into a conventional format, so commit history and changelogs line up without hand-editing.",
    installation: "- uses: coccinella-labs/title@v1",
    license: "MIT",
    status: "Stable",
    related: ["prune"],
  },
  {
    name: "cancel",
    slug: "cancel",
    description: "Cancels workflow runs.",
    language: "Shell",
    category: "GitHub Action",
    github: "https://github.com/coccinella-labs/cancel",
    overview:
      "Cancels in-progress and queued workflow runs for a branch, so superseded CI stops wasting runner time.",
    installation: "- uses: coccinella-labs/cancel@v1",
    license: "MIT",
    status: "Stable",
    related: [],
  },
  {
    name: "lock",
    slug: "lock",
    description: "Locks merged pull requests.",
    language: "Shell",
    category: "GitHub Action",
    github: "https://github.com/coccinella-labs/lock",
    overview:
      "Locks merged pull requests after a configurable delay, keeping conversation concentrated on open work.",
    installation: "- uses: coccinella-labs/lock@v1",
    license: "MIT",
    status: "Stable",
    related: ["stale"],
  },
  {
    name: "auto-label",
    slug: "auto-label",
    description: "Labels issues and pull requests.",
    language: "Shell",
    category: "GitHub Action",
    github: "https://github.com/coccinella-labs/auto-label",
    overview:
      "Labels issues and pull requests automatically based on commits, changed files, and the shape of the change.",
    installation: "- uses: coccinella-labs/auto-label@v2",
    license: "MIT",
    status: "Stable",
    related: ["title"],
  },
  {
    name: "prune",
    slug: "prune",
    description: "Normalizes pull request descriptions.",
    language: "Shell",
    category: "GitHub Action",
    github: "https://github.com/coccinella-labs/prune",
    overview:
      "Writes a pull request description from the actual diff, so reviewers always have an accurate summary of what changed.",
    installation: "- uses: coccinella-labs/prune@v1",
    license: "MIT",
    status: "Stable",
    related: ["title"],
  },
  {
    name: "rust-fix",
    slug: "rust-fix",
    description: "Applies Rust code fixes.",
    language: "Rust",
    category: "GitHub Action",
    github: "https://github.com/coccinella-labs/rust-fix",
    overview:
      "Auto-fixes Rust code with cargo fmt and clippy and opens a fix as a pull request, keeping the formatting debate out of review.",
    installation: "- uses: coccinella-labs/rust-fix@v1",
    license: "MIT",
    status: "Stable",
    related: ["fmtcheck"],
  },
  {
    name: "bump",
    slug: "bump",
    description: "Automates version bumps.",
    language: "Shell",
    category: "GitHub Action",
    github: "https://github.com/coccinella-labs/bump",
    overview:
      "Orchestrates version bumps after merged pull requests, handling the version-bump PR, tagging, and release flow as one reusable action.",
    installation: "- uses: coccinella-labs/bump@main",
    license: "MIT",
    status: "Stable",
    related: ["release", "gh-tag"],
  },
  {
    name: "echo",
    slug: "echo",
    description: "Suggests related issues.",
    language: "Python",
    category: "GitHub Action",
    github: "https://github.com/coccinella-labs/echo",
    overview:
      "Suggests potentially similar existing issues and posts a triage comment, so duplicates are spotted before the queue grows.",
    installation: "- uses: coccinella-labs/echo@main",
    license: "MIT",
    status: "Stable",
    related: ["auto-label"],
  },
  {
    name: "gon",
    slug: "gon",
    description: "Reviews Dependabot pull requests.",
    language: "Python",
    category: "GitHub Action",
    github: "https://github.com/coccinella-labs/gon",
    overview:
      "A calm reusable workflow that gently reviews Dependabot pull requests and provides clear summaries to help you merge confidently.",
    installation: "- uses: coccinella-labs/gon/.github/workflows/gon.yml@main",
    license: "MIT",
    status: "Stable",
    related: ["auto-merge"],
  },
  {
    name: "nightly",
    slug: "nightly",
    description: "Builds Flutter desktop nightlies.",
    language: "YAML",
    category: "GitHub Action",
    github: "https://github.com/coccinella-labs/nightly",
    overview:
      "A reusable workflow that builds Flutter desktop apps overnight, only when there are new commits since the last nightly, and tags each build with a dated tag.",
    installation: "- uses: coccinella-labs/nightly/.github/workflows/nightly.yml@main",
    license: "MIT",
    status: "Stable",
    related: [],
  },
  {
    name: "rust-nightly",
    slug: "rust-nightly",
    description: "Builds Rust nightlies.",
    language: "YAML",
    category: "GitHub Action",
    github: "https://github.com/coccinella-labs/rust-nightly",
    overview:
      "A reusable nightly workflow for Rust projects: runs the full test suite with all features, builds in release mode, and can upload coverage.",
    installation: "- uses: coccinella-labs/rust-nightly/.github/workflows/nightly.yml@main",
    license: "MIT",
    status: "Stable",
    related: ["fmtcheck"],
  },
  {
    name: "release-assets",
    slug: "release-assets",
    description: "Builds signed release assets.",
    language: "Python",
    category: "GitHub Action",
    github: "https://github.com/coccinella-labs/release-assets",
    overview:
      "A reusable workflow that builds, packages, signs, smoke-tests, and publishes release assets for CLI tools across a platform matrix.",
    installation: "- uses: coccinella-labs/release-assets/.github/workflows/release-assets.yml@main",
    license: "MIT",
    status: "Stable",
    related: ["release", "rust-fix"],
  },
  {
    name: "activity",
    slug: "activity",
    description: "Tracks project activity.",
    language: "YAML",
    category: "GitHub Action",
    github: "https://github.com/coccinella-labs/activity",
    overview:
      "A reusable workflow that tracks project activity in a central issue, giving a single place to see what moved across a repository.",
    installation: "- uses: coccinella-labs/activity/.github/workflows/tracking.yml@main",
    license: "MIT",
    status: "Stable",
    related: [],
  },
  {
    name: "bot",
    slug: "bot",
    description: "Bot identity for automation.",
    language: "Shell",
    category: "GitHub Action",
    github: "https://github.com/coccinella-labs/bot",
    overview:
      "A programmable GitHub bot used for automated commits. It provides an action that commits changes under a dedicated bot identity with a stable avatar.",
    installation: "- uses: coccinella-labs/bot/actions/commit@v1",
    license: "MIT",
    status: "Stable",
    related: ["prune", "rust-fix"],
  },
]

export type Release = {
  version: string
  slug: string
}

export const releases: Release[] = [
  { version: "v0.1.0", slug: "clipb" },
  { version: "v0.1.0", slug: "craft" },
  { version: "v0.1.0", slug: "dotenv-keep" },
  { version: "v0.1.0", slug: "fmtcheck" },
  { version: "v0.1.0", slug: "gh-tag" },
  { version: "v0.1.0", slug: "mini" },
  { version: "v0.1.0", slug: "release-notes" },
  { version: "v0.1.0", slug: "startkit" },
  { version: "v0.1.0", slug: "bump" },
  { version: "v0.1.0", slug: "echo" },
  { version: "v0.1.0", slug: "gon" },
  { version: "v0.1.0", slug: "nightly" },
  { version: "v0.1.0", slug: "release-assets" },
  { version: "v0.1.0", slug: "rust-nightly" },
  { version: "v1", slug: "auto-merge" },
  { version: "v1", slug: "bot" },
  { version: "v1", slug: "cancel" },
  { version: "v1", slug: "lock" },
  { version: "v1", slug: "prune" },
  { version: "v1", slug: "rust-fix" },
  { version: "v1", slug: "stale" },
  { version: "v1", slug: "title" },
  { version: "v1.0.0", slug: "activity" },
  { version: "v1.0.0", slug: "release" },
  { version: "v2", slug: "auto-label" },
]

export type Activity = {
  label: string
  slug: string
}

export const recentlyUpdated: Activity[] = [
  { label: "Recent", slug: "clipb" },
  { label: "Recent", slug: "craft" },
  { label: "Recent", slug: "dotenv-keep" },
  { label: "Recent", slug: "fmtcheck" },
  { label: "Recent", slug: "gh-tag" },
  { label: "Recent", slug: "mini" },
  { label: "Recent", slug: "release-notes" },
  { label: "Recent", slug: "startkit" },
  { label: "Recent", slug: "bump" },
  { label: "Recent", slug: "echo" },
  { label: "Recent", slug: "gon" },
  { label: "Recent", slug: "nightly" },
  { label: "Recent", slug: "release-assets" },
  { label: "Recent", slug: "rust-nightly" },
  { label: "Recent", slug: "auto-merge" },
  { label: "Recent", slug: "bot" },
  { label: "Recent", slug: "cancel" },
  { label: "Recent", slug: "lock" },
  { label: "Recent", slug: "prune" },
  { label: "Recent", slug: "rust-fix" },
  { label: "Recent", slug: "stale" },
  { label: "Recent", slug: "title" },
  { label: "Recent", slug: "activity" },
  { label: "Recent", slug: "release" },
  { label: "Recent", slug: "auto-label" },
]

export const philosophy = [
  {
    title: "Small over large",
    body: "A tool should be small enough to read, reason about, and replace.",
  },
  {
    title: "Stable over clever",
    body: "Predictable behavior beats impressive internals.",
  },
  {
    title: "Useful over busy",
    body: "Features earn their place by solving real problems.",
  },
  {
    title: "Independent by design",
    body: "Every project stands on its own. No lock-in, no scaffolding.",
  },
]

export const principles = [
  "solve one problem",
  "stay easy to understand",
  "have clear documentation",
  "remain independently useful",
]

export const searchFilters = {
  languages,
  categories: [
    "CLI",
    "GitHub Action",
    "Library",
    "Template",
    "Experiment",
  ] as Category[],
}