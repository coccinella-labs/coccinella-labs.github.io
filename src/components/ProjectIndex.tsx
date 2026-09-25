"use client"

import Link from "next/link"
import { useMemo, useState, useSyncExternalStore } from "react"
import { languages, projects, searchFilters } from "@/lib/projects"
import type { Language, Project } from "@/lib/projects"

const types = searchFilters.categories

const typeParam: Record<string, string> = {
  CLI: "cli",
  "GitHub Action": "action",
  Library: "library",
  Template: "template",
  Experiment: "experiment",
}

const typeByParam: Record<string, string> = Object.fromEntries(
  Object.entries(typeParam).map(([label, param]) => [param, label])
)

function parseSearch(search: string): { languages: Language[]; types: string[] } {
  const params = new URLSearchParams(search)
  const seeds = params
    .getAll("language")
    .map((value) => value.toLowerCase())
    .map((value) => languages.find((l) => l.toLowerCase() === value))
    .filter((l): l is Language => Boolean(l))
  const selectedTypes = params
    .getAll("type")
    .map((value) => value.toLowerCase())
    .map((value) => typeByParam[value])
    .filter((t): t is string => Boolean(t))
  return { languages: seeds, types: selectedTypes }
}

function subscribeToSearch(callback: () => void) {
  window.addEventListener("popstate", callback)
  return () => window.removeEventListener("popstate", callback)
}

function useSearch(): string {
  return useSyncExternalStore(
    subscribeToSearch,
    () => window.location.search,
    () => ""
  )
}

function syncUrl(activeLanguages: Language[], activeTypes: string[]) {
  const params = new URLSearchParams()
  activeLanguages.forEach((language) =>
    params.append("language", language.toLowerCase())
  )
  activeTypes.forEach((type) => params.append("type", typeParam[type]))
  const queryString = params.toString()
  const url = `${window.location.pathname}${queryString ? `?${queryString}` : ""}`
  window.history.replaceState(null, "", url)
}

export default function ProjectIndex({ all }: { all: Project[] }) {
  const search = useSearch()
  const seeded = useMemo(() => parseSearch(search), [search])
  const [query, setQuery] = useState("")
  const [activeLanguages, setActiveLanguages] = useState<Language[]>([])
  const [activeTypes, setActiveTypes] = useState<string[]>([])

  const effectiveLanguages =
    activeLanguages.length > 0 ? activeLanguages : seeded.languages
  const effectiveTypes =
    activeTypes.length > 0 ? activeTypes : seeded.types

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    const full: Project[] =
      Array.isArray(all) && all.length > 0 ? all : projects
    return full.filter((project) => {
      const matchesQuery =
        q.length === 0 ||
        project.name.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q)
      const matchesLanguage =
        effectiveLanguages.length === 0 ||
        effectiveLanguages.includes(project.language)
      const matchesType =
        effectiveTypes.length === 0 || effectiveTypes.includes(project.category)
      return matchesQuery && matchesLanguage && matchesType
    })
  }, [query, effectiveLanguages, effectiveTypes, all])

  function toggleLanguage(language: Language) {
    const next = effectiveLanguages.includes(language)
      ? effectiveLanguages.filter((l) => l !== language)
      : [...effectiveLanguages, language]
    setActiveLanguages(next)
    syncUrl(next, effectiveTypes)
  }

  function toggleType(type: string) {
    const next = effectiveTypes.includes(type)
      ? effectiveTypes.filter((t) => t !== type)
      : [...effectiveTypes, type]
    setActiveTypes(next)
    syncUrl(effectiveLanguages, next)
  }

  return (
    <details className="group">
      <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 rounded-lg border border-border px-5 py-4 font-mono text-sm text-foreground transition-colors hover:border-foreground hover:bg-surface-hover [&::-webkit-details-marker]:hidden">
        <span>Show all {all.length} projects</span>
        <span aria-hidden="true" className="text-xs text-muted">
          +
        </span>
      </summary>
      <div className="mt-6 grid min-w-0 gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside>
        <label htmlFor="project-search" className="sr-only">
          Search projects
        </label>
        <input
          id="project-search"
          type="search"
          placeholder="Search projects…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-sm outline-none transition-colors placeholder:text-muted focus:border-accent"
        />
        <div className="mt-8">
          <details>
            <summary className="flex cursor-pointer list-none items-center justify-between [&::-webkit-details-marker]:hidden">
              <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
                Language
                {effectiveLanguages.length > 0
                  ? ` · ${effectiveLanguages.length}`
                  : ""}
              </span>
              <span aria-hidden="true" className="font-mono text-xs text-muted">
                +
              </span>
            </summary>
            <ul className="mt-3 flex flex-col gap-1">
              {languages.map((language) => {
                const count = all.filter((p) => p.language === language).length
                return (
                  <li key={language}>
                    <label className="flex cursor-pointer items-center gap-2.5 py-0.5 font-mono text-sm text-foreground/80">
                      <input
                        type="checkbox"
                        checked={effectiveLanguages.includes(language)}
                        onChange={() => toggleLanguage(language)}
                        className="size-3.5 accent-[var(--accent)]"
                      />
                      {language}
                      <span className="ml-auto text-[11px] text-muted">
                        {count}
                      </span>
                    </label>
                  </li>
                )
              })}
            </ul>
          </details>
        </div>
        <div className="mt-6 border-t border-border pt-6">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
            Type
          </p>
          <ul className="mt-3 flex flex-col gap-1">
            {types.map((type) => {
              const count = all.filter((p) => p.category === type).length
              return (
                <li key={type}>
                  <label className="flex cursor-pointer items-center gap-2.5 py-0.5 font-mono text-sm text-foreground/80">
                    <input
                      type="checkbox"
                      checked={effectiveTypes.includes(type)}
                      onChange={() => toggleType(type)}
                      className="size-3.5 accent-[var(--accent)]"
                    />
                    {type}
                    <span className="ml-auto text-[11px] text-muted">
                      {count}
                    </span>
                  </label>
                </li>
              )
            })}
          </ul>
        </div>
      </aside>

      <div className="min-w-0">
        <p className="mb-2 font-mono text-[11px] text-muted">
          {results.length} of {all.length} projects
        </p>
        {results.length > 0 ? (
          <ul className="flex flex-col">
            {results.map((project) => (
              <li
                key={project.name}
                className="flex flex-col gap-1 border-b border-border py-3 last:border-b-0 sm:flex-row sm:items-baseline sm:gap-4"
              >
                <Link
                  href={`/projects/${project.slug}/`}
                  className="w-40 shrink-0 truncate font-mono text-sm font-medium text-accent underline-offset-4 hover:underline"
                >
                  {project.name}
                </Link>
                <p className="min-w-0 flex-1 truncate text-sm text-muted">
                  {project.description}
                </p>
                <p className="shrink-0 font-mono text-[11px] text-muted/80">
                  {project.language} · {project.category} · {project.status}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-12 text-sm text-muted">
            No projects match those filters.
          </p>
        )}
      </div>
      </div>
    </details>
  )
}