// Release history for the collection, shown on the About page.
//
// This track is independent from the site version in package.json. The two
// ship together but move separately; drift is expected.
//
// The first two iterations were consolidated into the 0.1.0 entry, so the
// chain reads: origin, then each later upgrade. Append one entry per
// substantive release; copy tweaks and styling do not merit an entry.
//
// Release names follow ladybirds, suiting the org (Coccinella is a ladybird
// genus): spot counts first, then species. Each upgrade takes the next
// unused name.

export type Release = {
  version: string
  name: string
  date: string
  notes: string
}

export const releaseNames = [
  "Seven Spot",
  "Eleven Spot",
  "Fourteen Spot",
  "Twenty-Two Spot",
  "Eyed",
  "Larch",
  "Orange",
  "Kidney Spot",
  "Pine",
] as const

export const releaseHistory: Release[] = [
  {
    version: "0.1.0",
    name: "Seven Spot",
    date: "2026-09-18",
    notes:
      "First stated release. Serves 11 apps with windowing, taskbar, and live GitHub and Hugging Face data. The surface is then quieted: the boot screen, status bar, and search are dropped, live metrics become static fact lines, and the desktop layer sits below the catalog as an exploration layer.",
  },
  {
    version: "0.2.0",
    name: "Eleven Spot",
    date: "2026-09-25",
    notes:
      "System interface. Presents state, not commands: a SYSTEM readout of projects, repositories, systems, and source instead of marketing copy or a fake boot sequence. Boot-inspired typography becomes the site's identity layer.",
  },
]
