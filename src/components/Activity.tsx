"use client"

import Link from "next/link"
import Section from "./Section"
import { getProject, releases, recentlyUpdated } from "@/lib/projects"
import { timeAgo, useOrgEvents, type OrgEvent } from "@/lib/osLive"

function shortRepo(repo: string): string {
  return repo.replace("coccinella-labs/", "")
}

function shortTag(tag: string): string {
  return tag.length > 24 ? `${tag.slice(0, 21)}…` : tag
}

function branchOf(ref: string | null): string {
  if (!ref) return "main"
  return ref.replace("refs/heads/", "")
}

function eventLabel(event: OrgEvent): string | null {
  switch (event.type) {
    case "ReleaseEvent":
      if (event.action !== "published" || !event.tag) return null
      return `released ${shortTag(event.tag)}`
    case "PushEvent":
      return `pushed ${event.size} commit${event.size === 1 ? "" : "s"} to ${branchOf(event.ref)}`
    case "CreateEvent":
      if (event.refType === "tag") return `tagged ${event.ref ?? ""}`
      if (event.refType === "branch") return `branched ${event.ref ?? ""}`
      if (event.refType === "repository") return "created repo"
      return null
    case "ForkEvent":
      return `forked by ${event.actor}`
    case "WatchEvent":
      return `starred by ${event.actor}`
    case "PullRequestEvent":
      if (event.action === "opened") return `opened PR #${event.number ?? "?"}`
      if (event.action === "closed") {
        return event.merged
          ? `merged PR #${event.number ?? "?"}`
          : `closed PR #${event.number ?? "?"}`
      }
      return null
    default:
      return null
  }
}

function Skeleton() {
  return (
    <ul className="mt-4 flex flex-col">
      {[0, 1, 2, 3].map((i) => (
        <li
          key={i}
          className="flex items-center justify-between gap-4 border-b border-line py-3.5 last:border-b-0"
        >
          <span className="h-4 w-2/5 animate-pulse rounded bg-line" />
          <span className="h-4 w-1/4 animate-pulse rounded bg-line" />
        </li>
      ))}
    </ul>
  )
}

function StaticFallback() {
  return (
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
            <li className="py-3.5 text-sm text-muted">Nothing to show yet.</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default function Activity() {
  const events = useOrgEvents()

  if (!events) {
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
            <Skeleton />
          </div>
          <div className="rounded-xl border border-line p-6">
            <h3 className="text-base font-semibold">Recently Active</h3>
            <Skeleton />
          </div>
        </div>
      </Section>
    )
  }

  if (events.length === 0) {
    return (
      <Section
        id="activity"
        eyebrow="Latest Activity"
        title="What's happening."
        description="New releases and recent changes across the collection."
      >
        <StaticFallback />
      </Section>
    )
  }

  const liveReleases = events
    .filter(
      (event) =>
        event.type === "ReleaseEvent" &&
        event.action === "published" &&
        event.tag
    )
    .slice(0, 6)

  const liveActivity = events
    .map((event) => ({ event, label: eventLabel(event) }))
    .filter(
      (item): item is { event: OrgEvent; label: string } =>
        item.label !== null && item.event.type !== "ReleaseEvent"
    )
    .slice(0, 8)

  return (
    <Section
      id="activity"
      eyebrow="Latest Activity"
      title="What's happening."
      description="New releases and recent changes across the collection, live from GitHub."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-xl border border-line p-6">
          <h3 className="flex items-center gap-2 text-base font-semibold">
            Latest Releases
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
          </h3>
          <ul className="mt-4 flex flex-col">
            {liveReleases.length > 0 ? (
              liveReleases.map((event) => (
                <li
                  key={event.id}
                  className="flex flex-col items-start gap-1 border-b border-line py-3.5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                >
                  <span
                    title={event.tag ?? ""}
                    className="truncate font-mono text-sm text-accent"
                  >
                    {shortTag(event.tag ?? "")}
                  </span>
                  <span className="flex shrink-0 items-center gap-2">
                    <a
                      href={`https://github.com/${event.repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
                    >
                      {shortRepo(event.repo)}
                    </a>
                    <span className="font-mono text-[11px] text-muted/70">
                      {timeAgo(event.createdAt)}
                    </span>
                  </span>
                </li>
              ))
            ) : (
              <li className="py-3.5 text-sm text-muted">
                No releases in the last stretch.
              </li>
            )}
          </ul>
        </div>
        <div className="rounded-xl border border-line p-6">
          <h3 className="flex items-center gap-2 text-base font-semibold">
            Recently Active
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
          </h3>
          <ul className="mt-4 flex flex-col">
            {liveActivity.length > 0 ? (
              liveActivity.map(({ event, label }) => (
                <li
                  key={event.id}
                  className="flex flex-col items-start gap-1 border-b border-line py-3.5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                >
                  <span className="truncate text-sm text-muted">{label}</span>
                  <span className="flex shrink-0 items-center gap-2">
                    <a
                      href={`https://github.com/${event.repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
                    >
                      {shortRepo(event.repo)}
                    </a>
                    <span className="font-mono text-[11px] text-muted/70">
                      {timeAgo(event.createdAt)}
                    </span>
                  </span>
                </li>
              ))
            ) : (
              <li className="py-3.5 text-sm text-muted">
                Quiet for the moment.
              </li>
            )}
          </ul>
        </div>
      </div>
    </Section>
  )
}
