import Link from "next/link"
import Section from "./Section"
import { projects } from "@/lib/projects"

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="A quiet collection."
      description="Every project is small, stable, and independently useful."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
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
            </p>
          </Link>
        ))}
      </div>
    </Section>
  )
}
