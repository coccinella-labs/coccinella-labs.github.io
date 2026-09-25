import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import CopyCommand from "@/components/CopyCommand"
import Footer from "@/components/Footer"
import SiteHeader from "@/components/SiteHeader"
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

function DocHeading({ children }: { children: string }) {
  return (
    <h2 className="border-b border-border pb-2 font-mono text-xs uppercase tracking-widest text-muted">
      {children}
    </h2>
  )
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

  const hasOverview =
    project.overview.trim().toLowerCase() !==
    project.description.trim().toLowerCase()

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
      <div className="border-b border-border">
        <div className="mx-auto w-full max-w-[1200px] px-6 py-12 lg:px-8 lg:py-16">
          <Link
            href="/#projects"
            className="font-mono text-sm text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            ← project index
          </Link>
          <h1 className="mt-6 font-mono text-3xl font-medium tracking-tight lg:text-4xl">
            {project.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
            {project.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-muted">
            <span>{project.language}</span>
            <span aria-hidden="true">·</span>
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.status}</span>
            <span aria-hidden="true">·</span>
            <span>{project.license}</span>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 rounded-md border border-border px-3 py-1.5 font-sans text-sm font-medium text-foreground transition-colors hover:border-foreground"
            >
              Repository ↗
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-6 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0 space-y-12">
            {hasOverview ? (
              <section>
                <DocHeading>Overview</DocHeading>
                <p className="mt-4 text-[15px] leading-7 text-foreground/80">
                  {project.overview}
                </p>
              </section>
            ) : null}

            {project.architecture ? (
              <section>
                <DocHeading>Architecture</DocHeading>
                <p className="mt-4 text-[15px] leading-7 text-foreground/80">
                  {project.architecture}
                </p>
              </section>
            ) : null}

            {project.capabilities && project.capabilities.length > 0 ? (
              <section>
                <DocHeading>Capabilities</DocHeading>
                <ul className="mt-4 flex flex-col gap-2">
                  {project.capabilities.map((capability) => (
                    <li
                      key={capability}
                      className="flex items-baseline gap-3 text-[15px] leading-7 text-foreground/80"
                    >
                      <span aria-hidden="true" className="shrink-0 font-mono text-accent">
                        →
                      </span>
                      {capability}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section>
              <DocHeading>Installation</DocHeading>
              <div className="mt-4">
                <CopyCommand command={project.installation} />
              </div>
              {project.usage ? (
                <p className="mt-4 text-[15px] leading-7 text-foreground/80">
                  {project.usage}
                </p>
              ) : null}
            </section>
          </div>

          <aside className="min-w-0">
            <div className="border-t border-border">
              <h3 className="pb-2 pt-6 font-mono text-xs uppercase tracking-widest text-muted">
                Technical details
              </h3>
              <dl className="mt-2 flex flex-col">
                <div className="flex items-center justify-between border-b border-border py-3">
                  <dt className="font-mono text-[11px] uppercase tracking-widest text-muted">
                    Repository
                  </dt>
                  <dd>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
                    >
                      GitHub ↗
                    </a>
                  </dd>
                </div>
                <div className="flex items-center justify-between border-b border-border py-3">
                  <dt className="font-mono text-[11px] uppercase tracking-widest text-muted">
                    License
                  </dt>
                  <dd className="font-mono text-sm">{project.license}</dd>
                </div>
                <div className="flex items-center justify-between border-b border-border py-3">
                  <dt className="font-mono text-[11px] uppercase tracking-widest text-muted">
                    Language
                  </dt>
                  <dd className="font-mono text-sm">{project.language}</dd>
                </div>
                <div className="flex items-center justify-between border-b border-border py-3">
                  <dt className="font-mono text-[11px] uppercase tracking-widest text-muted">
                    Type
                  </dt>
                  <dd className="font-mono text-sm">{project.category}</dd>
                </div>
                <div className="flex items-center justify-between py-3">
                  <dt className="font-mono text-[11px] uppercase tracking-widest text-muted">
                    Status
                  </dt>
                  <dd className="font-mono text-sm">{project.status}</dd>
                </div>
              </dl>
            </div>

            {related.length > 0 ? (
              <div className="mt-8 border-t border-border">
                <h3 className="pb-2 pt-6 font-mono text-xs uppercase tracking-widest text-muted">
                  Related
                </h3>
                <ul className="mt-2 flex flex-col">
                  {related.map((item) => (
                    <li
                      key={item.slug}
                      className="border-b border-border py-3 last:border-b-0"
                    >
                      <Link
                        href={`/projects/${item.slug}/`}
                        className="font-mono text-sm font-medium text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
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
        <Footer />
      </div>
    </div>
  )
}