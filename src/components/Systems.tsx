import Link from "next/link"
import Section from "./Section"
import { getProject } from "@/lib/projects"

const systems = [
  {
    title: "Agent infrastructure",
    blurb: "Harnesses, runtimes, and bots.",
    tools: ["harper", "agent-sdk", "harperbot", "harpertoken", "agentware", "vesper"],
  },
  {
    title: "GPU & ML compute",
    blurb: "Metal runtimes, kernels, and inference.",
    tools: ["core", "kernels", "ml", "mlapi", "bitinfer"],
  },
  {
    title: "Runtime & developer tooling",
    blurb: "CLI foundations and code analysis.",
    tools: ["cli", "hub", "go-kit", "omnitype", "vertex", "cli-tools"],
  },
  {
    title: "Build & release automation",
    blurb: "Versioning, tagging, and delivery.",
    tools: ["release", "gh-tag", "release-assets", "fmtcheck", "rust-nightly", "bump"],
  },
]

function ToolLink({ slug }: { slug: string }) {
  const project = getProject(slug)
  if (!project) return null
  return (
    <li>
      <Link
        href={`/projects/${project.slug}/`}
        className="rounded px-1.5 py-1 font-mono text-sm text-foreground/80 transition-colors hover:bg-line hover:text-foreground"
      >
        {project.name}
      </Link>
      <span className="ml-1 font-mono text-[11px] text-muted">
        {project.language}
      </span>
    </li>
  )
}

const harperFacts = [
  "plans real work and executes it as sandboxed jobs",
  "pauses for approval before irreversible steps",
  "ships audited, signed results — self-hosted",
]

export default function Systems() {
  const harper = getProject("harper")

  return (
    <Section
      id="systems"
      eyebrow="Systems"
      title="The depth underneath."
      description="The catalog holds small tools. Beneath them is the systems work those tools depend on — agent infrastructure, GPU compute, and the build machinery that ships everything."
    >
      <div className="rounded-xl border border-line p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div>
            <h3 className="font-mono text-lg font-medium text-accent">harper</h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              An agent harness, not a pretty chatbot. It plans real work,
              executes it as sandboxed jobs, pauses for approval, and ships
              audited results, end to end.
            </p>
            <ul className="mt-5 flex flex-col gap-2">
              {harperFacts.map((fact) => (
                <li key={fact} className="flex items-baseline gap-2 text-sm text-foreground/80">
                  <span className="text-accent">→</span>
                  {fact}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                Related systems
              </p>
              <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-sm text-foreground/80">
                <Link href="/projects/agent-sdk/" className="underline-offset-4 hover:underline">
                  agent-sdk
                </Link>
                <Link href="/projects/harperbot/" className="underline-offset-4 hover:underline">
                  harperbot
                </Link>
                <Link href="/projects/harpertoken/" className="underline-offset-4 hover:underline">
                  harpertoken
                </Link>
              </p>
            </div>
            <div className="mt-auto flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/coccinella-labs/harper"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-line px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-foreground"
              >
                Repository
              </a>
              {harper ? (
                <Link
                  href={`/projects/harper/`}
                  className="rounded-lg border border-line px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-foreground"
                >
                  Project page
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {systems.map((system) => (
          <div key={system.title} className="rounded-xl border border-line p-5">
            <h4 className="text-sm font-semibold">{system.title}</h4>
            <p className="mt-1 text-xs leading-5 text-muted">{system.blurb}</p>
            <ul className="mt-4 flex flex-col items-start gap-1.5">
              {system.tools.map((slug) => (
                <ToolLink key={slug} slug={slug} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}