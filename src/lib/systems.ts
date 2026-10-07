// The technical layers underneath the Coccinella Labs collection.
// Members must be real slugs from /lib/projects.
//
// `standalone` marks work that sits outside the five systems rather than
// being a sixth one, matching how the organization profile presents it.
export type System = {
  id: string
  index: string
  title: string
  remit: string
  stack: string[]
  connectsTo: string[]
  members: string[]
  standalone?: true
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
      "core",
      "metal",
      "ml",
      "mlapi",
      "bitinfer",
      "mlxlm",
      "jupyterml",
      "gpucomm-fs",
      "gpucomm-bot",
    ],
  },
  {
    id: "runtime-tooling",
    index: "03",
    title: "Runtimes & developer tooling",
    remit:
      "CLI foundations, runtimes, and code tools the rest of the collection is built on.",
    stack: ["Rust", "Go", "TypeScript"],
    connectsTo: ["gpu-ml-compute", "models-datasets", "build-release"],
    members: [
      "cli",
      "hub",
      "go-kit",
      "omnitype",
      "vertex",
      "simengine",
      "dotenv-keep",
      "harpertoken",
      "tokensdk",
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
      "buildanywhere",
      "bot",
    ],
  },
  {
    id: "models-datasets",
    index: "05",
    title: "Models & datasets",
    remit:
      "Verified models and the controlled data behind them, published on Hugging Face. The training sources for the Hub models stay private.",
    stack: ["Python"],
    connectsTo: ["gpu-ml-compute", "runtime-tooling"],
    members: ["rl", "sandbox-lifecycle"],
  },
  {
    id: "apps-utilities",
    index: "",
    title: "Apps & utilities",
    remit:
      "Standalone tools outside the five systems above: end-user applications and the shared legal documents that govern the collection.",
    stack: ["Rust", "Dart", "Markdown"],
    connectsTo: [],
    members: ["browser", "clipb", "license"],
    standalone: true,
  },
]

export const systemCount = systems.filter((s) => !s.standalone).length

export function getSystem(id: string): System | undefined {
  return systems.find((system) => system.id === id)
}