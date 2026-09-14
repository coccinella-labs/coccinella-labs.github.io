"use client"

import Link from "next/link"
import Section from "./Section"
import { projects } from "@/lib/projects"
import { useOrgRepos } from "@/lib/osLive"

const featured = [
  "organictyping",
  "memoraxx",
  "hautofix",
  "browser",
  "press",
  "vesper",
  "tokensdk",
  "omnitype",
  "vertex",
]

export default function Projects() {
  const repos = useOrgRepos()
  const visible = projects.filter((project) =>
    featured.includes(project.name)
  )
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="A quiet collection."
      description="Every project is small, stable, and independently useful."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => {
          const info = repos?.[project.name]
          return (
            <Link
              key={project.name}
              href={`/projects/${project.slug}/`}
              className="group flex flex-col rounded-xl border border-line p-6 transition-colors hover:border-foreground"
            >
              <h3 className="font-mono text-base font-medium text-accent">
                {project.name}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-muted">
                {project.description}
              </p>
              <p className="mt-6 text-xs font-medium uppercase tracking-wider text-foreground/50">
                {project.language} • {project.category}
                {info ? ` · ★ ${info.stars}` : ""}
              </p>
            </Link>
          )
        })}
      </div>
      <div className="mt-8">
        <a
          href="#discovery"
          className="rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
        >
          Browse all {projects.length} tools
        </a>
      </div>
    </Section>
  )
}
