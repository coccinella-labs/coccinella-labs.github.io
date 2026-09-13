import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import CopyCommand from "@/components/CopyCommand"
import { getProject, projects } from "@/lib/projects"

const siteUrl = "https://coccinella-labs.github.io"

export const dynamicParams = false

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  const url = `${siteUrl}/projects/${project.slug}/`
  return {
    title: project.name,
    description: project.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${project.name} · coccinella-labs`,
      description: project.description,
      siteName: "coccinella-labs",
    },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return notFound()

  const related = project.related
    .map(getProject)
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  return (
    <main className="flex-1">
      <div className="border-b border-line">
        <div className="mx-auto w-full max-w-[1200px] px-6 py-12 lg:px-8 lg:py-16">
          <Link
            href="/#projects"
            className="text-sm text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            ← All projects
          </Link>
          <h1 className="mt-6 font-mono text-3xl font-medium tracking-tight lg:text-4xl">
            {project.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
            {project.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <span className="text-xs font-medium uppercase tracking-wider text-foreground/50">
              {project.language} • {project.category}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs font-medium text-muted">
              <span className="size-1.5 rounded-full bg-accent" />
              Status: {project.status}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-6 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-semibold tracking-tight">
                Overview
              </h2>
              <p className="mt-4 text-base leading-7 text-foreground/80">
                {project.overview}
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold tracking-tight">
                Installation
              </h2>
              <CopyCommand command={project.installation} />
            </section>
          </div>

          <aside className="space-y-8">
            <div className="rounded-xl border border-line p-6">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted">
                Details
              </h3>
              <dl className="mt-4 flex flex-col">
                <div className="flex items-center justify-between border-b border-line py-3">
                  <dt className="text-sm text-muted">Repository</dt>
                  <dd>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-accent underline-offset-4 transition-colors hover:underline"
                    >
                      GitHub
                    </a>
                  </dd>
                </div>
                <div className="flex items-center justify-between border-b border-line py-3">
                  <dt className="text-sm text-muted">License</dt>
                  <dd className="text-sm font-medium">{project.license}</dd>
                </div>
                <div className="flex items-center justify-between border-b border-line py-3">
                  <dt className="text-sm text-muted">Language</dt>
                  <dd className="text-sm font-medium">{project.language}</dd>
                </div>
                <div className="flex items-center justify-between border-b border-line py-3">
                  <dt className="text-sm text-muted">Type</dt>
                  <dd className="text-sm font-medium">{project.category}</dd>
                </div>
                <div className="flex items-center justify-between py-3">
                  <dt className="text-sm text-muted">Status</dt>
                  <dd className="text-sm font-medium">{project.status}</dd>
                </div>
              </dl>
            </div>

            {related.length > 0 ? (
              <div className="rounded-xl border border-line p-6">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted">
                  Related tools
                </h3>
                <ul className="mt-4 flex flex-col">
                  {related.map((item) => (
                    <li
                      key={item.slug}
                      className="border-b border-line py-3 last:border-b-0"
                    >
                      <Link
                        href={`/projects/${item.slug}/`}
                        className="font-mono text-sm font-medium text-accent underline-offset-4 transition-colors hover:underline"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-1 text-sm text-muted">
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </main>
  )
}
