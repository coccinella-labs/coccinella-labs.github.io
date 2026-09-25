import Link from "next/link"
import Section from "./Section"
import { getProject } from "@/lib/projects"
import { systems, type System } from "@/lib/systems"

function SystemRepo({ slug }: { slug: string }) {
  const project = getProject(slug)
  if (!project) return null
  return (
    <li className="flex min-w-0 items-baseline gap-3 py-1.5">
      <Link
        href={`/projects/${project.slug}/`}
        className="truncate font-mono text-sm text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
      >
        {project.name}
      </Link>
      <span className="flex shrink-0 items-baseline gap-2 font-mono text-[11px] text-muted">
        {project.language}
        <span className="text-muted/60">·</span>
        {project.status}
      </span>
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.name} on GitHub`}
        className="ml-auto shrink-0 font-mono text-[11px] text-muted opacity-0 transition-opacity hover:text-foreground focus-visible:opacity-100 group-hover:opacity-100"
      >
        ↗
      </a>
    </li>
  )
}

function SystemRow({ system }: { system: System }) {
  return (
    <div
      id={`system-${system.id}`}
      className="scroll-mt-12 border-b border-border py-10 md:scroll-mt-24 lg:grid lg:grid-cols-[1.1fr_1.6fr] lg:gap-12"
    >
      <div>
        <p className="font-mono text-xs text-muted">
          §{system.index} · {system.id}
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight">
          {system.title}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-6 text-muted">
          {system.remit}
        </p>
      </div>
      <div className="mt-6 lg:mt-0">
        <dl className="grid gap-x-12 gap-y-5 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-widest text-muted">
              Stack
            </dt>
            <dd className="mt-2 font-mono text-sm text-foreground/85">
              {system.stack.join(" · ")}
            </dd>
          </div>
          {system.connectsTo.length > 0 ? (
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-widest text-muted">
                Connects to
              </dt>
              <dd className="mt-2 flex flex-wrap gap-x-2 gap-y-1 font-mono text-sm text-foreground/85">
                {system.connectsTo.map((id) => (
                  <Link
                    key={id}
                    href={`#system-${id}`}
                    className="text-foreground/85 underline-offset-4 transition-colors hover:text-accent hover:underline"
                  >
                    {id}
                  </Link>
                ))}
              </dd>
            </div>
          ) : null}
        </dl>
        <details className="group">
          <summary className="mt-6 flex cursor-pointer list-none items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-foreground [&::-webkit-details-marker]:hidden">
            Repositories · {system.members.length}
            <span aria-hidden="true">+</span>
          </summary>
          <ul className="group mt-1.5 flex flex-col">
            {system.members.map((slug) => (
              <SystemRepo key={slug} slug={slug} />
            ))}
          </ul>
        </details>
      </div>
    </div>
  )
}

export default function Systems() {
  return (
    <Section
      id="systems"
      eyebrow="Systems"
      title="The depth underneath."
      description="Agents that do work, compute that powers them, runtimes they run in, and the machinery that ships them."
    >
      <nav
        aria-label="Systems index"
        className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4"
      >
        {systems.map((system) => (
          <Link
            key={system.id}
            href={`#system-${system.id}`}
            className="flex items-baseline justify-between gap-3 bg-background px-5 py-4 text-sm transition-colors hover:bg-surface"
          >
            <span className="font-medium">{system.title}</span>
            <span className="font-mono text-[11px] text-muted">
              {system.members.length} repos
            </span>
          </Link>
        ))}
      </nav>
      <div className="mt-12">
        {systems.map((system) => (
          <SystemRow key={system.id} system={system} />
        ))}
      </div>
    </Section>
  )
}