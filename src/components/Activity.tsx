"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import Section from "./Section"
import { getProject, releases, recentlyUpdated } from "@/lib/projects"
import { timeAgo, useOrgEvents, type OrgEvent } from "@/lib/osLive"

function Reveal({
  label,
  count,
  right,
  children,
}: {
  label: string
  count?: number
  right?: ReactNode
  children: ReactNode
}) {
  return (
    <details className="group">
      <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 font-mono text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-foreground [&::-webkit-details-marker]:hidden">
        <span>
          {label}
          {count !== undefined ? ` · ${count}` : ""}
        </span>
        {right ?? <span aria-hidden="true">+</span>}
      </summary>
      <div className="mt-1">{children}</div>
    </details>
  )
}

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
    <ul className="mt-2 flex flex-col">
      {[0, 1, 2, 3].map((i) => (
        <li
          key={i}
          className="flex items-center justify-between gap-4 border-b border-border py-3 last:border-b-0"
        >
          <span className="h-4 w-2/5 animate-pulse rounded bg-border" />
          <span className="h-4 w-1/4 animate-pulse rounded bg-border" />
        </li>
      ))}
    </ul>
  )
}

function StaticFallback() {
  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div>
        <Reveal label="Latest Releases" count={releases.length}>
          <ul className="mt-2 flex flex-col">
            {releases.length > 0 ? (
              releases.map((release) => {
                const project = getProject(release.slug)
                if (!project) return null
                return (
                  <li
                    key={`${release.version}-${release.slug}`}
                    className="flex flex-col items-start gap-1 border-b border-border py-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                  >
                    <Link
                      href={`/projects/${project.slug}/`}
                      className="font-mono text-sm text-accent underline-offset-4 hover:underline"
                    >
                      {project.name}
                    </Link>
                    <span className="shrink-0 font-mono text-[11px] text-muted">
                      {release.version}
                    </span>
                  </li>
                )
              })
            ) : (
              <li className="py-3 text-sm text-muted">No releases to show yet.</li>
            )}
          </ul>
        </Reveal>
      </div>
      <div>
        <Reveal label="Recently Updated" count={recentlyUpdated.length}>
          <ul className="mt-2 flex flex-col">
            {recentlyUpdated.length > 0 ? (
              recentlyUpdated.map((activity) => {
                const project = getProject(activity.slug)
                if (!project) return null
                return (
                  <li
                    key={activity.slug}
                    className="flex flex-col items-start gap-1 border-b border-border py-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                  >
                    <span className="truncate text-sm text-muted">
                      {activity.label}
                    </span>
                    <Link
                      href={`/projects/${project.slug}/`}
                      className="shrink-0 font-mono text-sm text-accent underline-offset-4 hover:underline"
                    >
                      {project.name}
                    </Link>
                  </li>
                )
              })
            ) : (
              <li className="py-3 text-sm text-muted">Nothing to show yet.</li>
            )}
          </ul>
        </Reveal>
      </div>
    </div>
  )
}

function LiveFallback() {
  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div>
        <Reveal label="Latest Releases">
          <Skeleton />
        </Reveal>
      </div>
      <div>
        <Reveal label="Recently Active">
          <Skeleton />
        </Reveal>
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
        eyebrow="Activity"
        title="What’s shipping."
        description="New releases and recent changes across the projects."
      >
        <LiveFallback />
      </Section>
    )
  }

  if (events.length === 0) {
    return (
      <Section
        id="activity"
        eyebrow="Activity"
        title="What’s shipping."
        description="New releases and recent changes across the projects."
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
    .slice(0, 3)

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
      eyebrow="Activity"
      title="What’s shipping."
      description="New releases and recent changes across the projects, read live from GitHub."
    >
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <Reveal
            label="Latest Releases"
            count={liveReleases.length}
            right={
              <a
                href="https://github.com/coccinella-labs"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                GitHub ↗
              </a>
            }
          >
            <ul className="flex flex-col">
              {liveReleases.length > 0 ? (
                liveReleases.map((event) => (
                  <li
                    key={event.id}
                    className="flex flex-col items-start gap-1 border-b border-border py-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                  >
                    <a
                      href={`https://github.com/${event.repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={event.tag ?? ""}
                      className="max-w-full truncate font-mono text-sm text-accent underline-offset-4 hover:underline"
                    >
                      {shortTag(event.tag ?? "")} · {shortRepo(event.repo)}
                    </a>
                    <span className="shrink-0 font-mono text-[11px] text-muted/70">
                      {timeAgo(event.createdAt)}
                    </span>
                  </li>
                ))
              ) : (
                <li className="py-3 text-sm text-muted">
                  No releases in the last stretch.
                </li>
              )}
            </ul>
          </Reveal>
        </div>
        <div>
          <Reveal label="Recently Active" count={liveActivity.length}>
            <ul className="flex flex-col">
              {liveActivity.length > 0 ? (
                liveActivity.map(({ event, label }) => (
                  <li
                    key={event.id}
                    className="flex flex-col items-start gap-1 border-b border-border py-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                  >
                    <a
                      href={`https://github.com/${event.repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="max-w-full truncate text-sm text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
                      title={event.repo}
                    >
                      {label}
                    </a>
                    <span className="shrink-0 font-mono text-[11px] text-muted/70">
                      {shortRepo(event.repo)} · {timeAgo(event.createdAt)}
                    </span>
                  </li>
                ))
              ) : (
                <li className="py-3 text-sm text-muted">No recent activity.</li>
              )}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}