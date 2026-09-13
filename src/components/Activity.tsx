import Link from "next/link"
import Section from "./Section"
import { getProject, releases, recentlyUpdated } from "@/lib/projects"

export default function Activity() {
  return (
    <Section
      id="activity"
      eyebrow="Latest Activity"
      title="What's happening."
      description="New releases and recent changes across the collection."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-xl border border-line p-6">
          <h3 className="text-base font-semibold">Latest Releases</h3>
          <ul className="mt-4 flex flex-col">
            {releases.length > 0 ? (
              releases.map((release) => {
                const project = getProject(release.slug)
                if (!project) return null
                return (
                  <li
                    key={`${release.version}-${release.slug}`}
                    className="flex flex-col items-start gap-1 border-b border-line py-3.5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                  >
                    <span className="font-mono text-sm text-accent">
                      {release.version}
                    </span>
                    <Link
                      href={`/projects/${project.slug}/`}
                      className="text-sm text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
                    >
                      {project.name}
                    </Link>
                  </li>
                )
              })
            ) : (
              <li className="py-3.5 text-sm text-muted">
                No releases to show yet.
              </li>
            )}
          </ul>
        </div>
        <div className="rounded-xl border border-line p-6">
          <h3 className="text-base font-semibold">Recently Updated</h3>
          <ul className="mt-4 flex flex-col">
            {recentlyUpdated.length > 0 ? (
              recentlyUpdated.map((activity) => {
                const project = getProject(activity.slug)
                if (!project) return null
                return (
                  <li
                    key={activity.slug}
                    className="flex flex-col items-start gap-1 border-b border-line py-3.5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                  >
                    <span className="text-sm text-muted">{activity.label}</span>
                    <Link
                      href={`/projects/${project.slug}/`}
                      className="text-sm text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
                    >
                      {project.name}
                    </Link>
                  </li>
                )
              })
            ) : (
              <li className="py-3.5 text-sm text-muted">
                Nothing to show yet.
              </li>
            )}
          </ul>
        </div>
      </div>
    </Section>
  )
}
