import type { ComponentType } from "react"

// Stated OS identity. OS_VERSION and OS_CODENAME always reflect the
// newest entry in OS_HISTORY below, so the history is the chain anchor
// and the boot screen and status bar read from one place.
//
// Version policy:
// - This track is independent from the site version in package.json.
//   The two ship together but move separately; drift is expected.
// - Append a history entry for new apps and new OS capabilities
//   (windowing, taskbar, search, live data sources). Copy tweaks and
//   styling do not merit an entry.
export const OS_NAME = "coccinella-labs OS"

// Release names follow ladybirds, suiting the org (Coccinella is a
// ladybird genus): spot counts first, then species. Each upgrade takes
// the next unused name.
export const OS_RELEASE_NAMES = [
  "Seven Spot",
  "Two Spot",
  "Eleven Spot",
  "Fourteen Spot",
  "Twenty-Two Spot",
  "Eyed",
  "Larch",
  "Orange",
  "Kidney Spot",
  "Pine",
] as const

export type OSRelease = {
  version: string
  name: string
  date: string
  notes: string
}

// Append-only version history. Each upgrade appends one entry with the
// next unused name from OS_RELEASE_NAMES, so the chain is the ledger
// itself: read top to bottom, oldest to newest.
export const OS_HISTORY: OSRelease[] = [
  {
    version: "0.1.0",
    name: "Seven Spot",
    date: "2026-09-18",
    notes:
      "First stated release. Serves 11 apps with windowing, taskbar, search, boot screen, and live GitHub and Hugging Face data.",
  },
]

const OS_CURRENT = OS_HISTORY[OS_HISTORY.length - 1]

export const OS_VERSION = OS_CURRENT.version
export const OS_CODENAME = OS_CURRENT.name

export type AppSource = "github" | "hf"

export type App = {
  name: string
  tag: string
  glyph: string
  tint: string
  repo: string
  source: AppSource
  Mockup?: ComponentType
}

export type WinState = {
  id: string
  minimized: boolean
  maximized: boolean
  x: number
  y: number
}
