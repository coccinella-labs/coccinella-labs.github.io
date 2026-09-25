// The four technical layers underneath the Palmshed collection.
// Members must be real slugs from /lib/projects.
export type System = {
  id: string
  index: string
  title: string
  remit: string
  stack: string[]
  connectsTo: string[]
  members: string[]
}

export const systems: System[] = [
  {
    id: "agent-infrastructure",
    index: "01",
    title: "Agent infrastructure",
    remit:
      "Harnesses, runtimes, and bots that plan real work, execute it in sandboxed jobs, pause for approval, and ship audited results.",
    stack: ["Rust", "Python", "TypeScript"],
    connectsTo: ["gpu-ml-compute", "runtime-tooling"],
    members: ["harper", "agent-sdk", "harperbot", "agentware", "swe-agent"],
  },
  {
    id: "gpu-ml-compute",
    index: "02",
    title: "GPU & ML compute",
    remit:
      "Apple Silicon kernels, Metal runtimes, and inference interfaces for local and serverless machine learning.",
    stack: ["Swift", "Metal", "Python", "C++"],
    connectsTo: ["agent-infrastructure"],
    members: [
      "kernels",
      "kernelgo",
      "kerneljs",
      "kernelswift",
      "macoskernel",
      "applekernel",
      "metal",
      "ml",
      "mlapi",
      "bitinfer",
      "mlxlm",
      "jupyterml",
    ],
  },
  {
    id: "runtime-tooling",
    index: "03",
    title: "Runtimes & developer tooling",
    remit:
      "CLI foundations, runtimes, and code tools the rest of the collection is built on.",
    stack: ["Rust", "Go", "TypeScript"],
    connectsTo: ["build-release"],
    members: [
      "cli",
      "hub",
      "go-kit",
      "omnitype",
      "vertex",
      "simengine",
      "threading",
      "dotenv-keep",
      "harpertoken",
    ],
  },
  {
    id: "build-release",
    index: "04",
    title: "Build & release automation",
    remit:
      "Versioning, tagging, CI checks, and delivery that ship every other project in the collection.",
    stack: ["Go", "Rust", "TypeScript", "Bash"],
    connectsTo: [],
    members: [
      "release",
      "release-notes",
      "release-assets",
      "gh-tag",
      "bump",
      "nightly",
      "rust-nightly",
      "fmtcheck",
      "auto-label",
      "auto-merge",
      "proof",
      "second",
    ],
  },
]

export function getSystem(id: string): System | undefined {
  return systems.find((system) => system.id === id)
}