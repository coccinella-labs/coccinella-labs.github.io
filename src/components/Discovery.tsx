"use client"

import Link from "next/link"
import { useSearchParams, type ReadonlyURLSearchParams } from "next/navigation"
import { Suspense, useMemo, useState } from "react"
import Section from "./Section"
import { projects, languages, searchFilters, type Language } from "@/lib/projects"

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

function initialLanguages(params: ReadonlyURLSearchParams): Language[] {
  return params
    .getAll("language")
    .map((value) => value.toLowerCase())
    .map((value) => languages.find((l) => l.toLowerCase() === value))
    .filter((l): l is Language => Boolean(l))
}

function initialTypes(params: ReadonlyURLSearchParams): string[] {
  return params
    .getAll("type")
    .map((value) => value.toLowerCase())
    .map((value) => typeByParam[value])
    .filter((t): t is string => Boolean(t))
}

function DiscoveryPanel() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState("")
  const [activeLanguages, setActiveLanguages] = useState<Language[]>(() =>
    initialLanguages(searchParams)
  )
  const [activeTypes, setActiveTypes] = useState<string[]>(() =>
    initialTypes(searchParams)
  )

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects.filter((project) => {
      const matchesQuery =
        q.length === 0 ||
        project.name.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q)
      const matchesLanguage =
        activeLanguages.length === 0 ||
        activeLanguages.includes(project.language)
      const matchesType =
        activeTypes.length === 0 || activeTypes.includes(project.category)
      return matchesQuery && matchesLanguage && matchesType
    })
  }, [query, activeLanguages, activeTypes])

  function syncUrl(nextLanguages: Language[], nextTypes: string[]) {
    const params = new URLSearchParams()
    nextLanguages.forEach((language) =>
      params.append("language", language.toLowerCase())
    )
    nextTypes.forEach((type) => params.append("type", typeParam[type]))
    const queryString = params.toString()
    const url = `${window.location.pathname}${queryString ? `?${queryString}` : ""}`
    window.history.replaceState(null, "", url)
  }

  function toggleLanguage(language: Language) {
    const next = activeLanguages.includes(language)
      ? activeLanguages.filter((l) => l !== language)
      : [...activeLanguages, language]
    setActiveLanguages(next)
    syncUrl(next, activeTypes)
  }

  function toggleType(type: string) {
    const next = activeTypes.includes(type)
      ? activeTypes.filter((t) => t !== type)
      : [...activeTypes, type]
    setActiveTypes(next)
    syncUrl(activeLanguages, next)
  }

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-background">
      <div className="border-b border-line p-5">
        <label htmlFor="search" className="sr-only">
          Search projects
        </label>
        <input
          id="search"
          type="search"
          placeholder="Search projects..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full rounded-lg border border-line bg-background px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted focus:border-accent"
        />
      </div>

      <div className="grid min-w-0 gap-8 p-5 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              Language
            </p>
            <div className="mt-3 flex flex-col gap-2">
              {languages.map((language) => (
                <label
                  key={language}
                  className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground/80"
                >
                  <input
                    type="checkbox"
                    checked={activeLanguages.includes(language)}
                    onChange={() => toggleLanguage(language)}
                    className="size-4 rounded border-line text-accent focus:ring-accent focus:ring-offset-0"
                  />
                  {language}
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              Type
            </p>
            <div className="mt-3 flex flex-col gap-2">
              {types.map((type) => (
                <label
                  key={type}
                  className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground/80"
                >
                  <input
                    type="checkbox"
                    checked={activeTypes.includes(type)}
                    onChange={() => toggleType(type)}
                    className="size-4 rounded border-line text-accent focus:ring-accent focus:ring-offset-0"
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="min-w-0">
          {results.length > 0 ? (
            <ul className="flex flex-col">
              {results.map((project) => (
                <li
                  key={project.name}
                  className="flex flex-col items-start gap-2 border-b border-line py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                >
                  <div className="min-w-0">
                    <Link
                      href={`/projects/${project.slug}/`}
                      className="font-mono text-sm font-medium text-accent underline-offset-4 hover:underline"
                    >
                      {project.name}
                    </Link>
                    <p className="mt-1 truncate text-sm text-muted">
                      {project.description}
                    </p>
                  </div>
                  <p className="text-xs text-muted sm:shrink-0">
                    {project.language} • {project.category}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-12 text-center text-sm text-muted">
              No projects match those filters.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function DiscoveryFallback() {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-background">
      <div className="border-b border-line p-5">
        <div className="h-10 rounded-lg border border-line" />
      </div>
      <div className="grid min-w-0 gap-8 p-5 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="h-4 w-20 rounded bg-line" />
            <div className="h-4 w-28 rounded bg-line" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-16 rounded bg-line" />
            <div className="h-4 w-24 rounded bg-line" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-5 w-2/3 rounded bg-line" />
          <div className="h-5 w-1/2 rounded bg-line" />
        </div>
      </div>
    </div>
  )
}

export default function Discovery() {
  return (
    <Section
      id="discovery"
      eyebrow="Discovery"
      title="Find a tool."
      description="Search by name or description, then narrow by language and type. Filters are shared in the URL."
      className="bg-surface"
    >
      <Suspense fallback={<DiscoveryFallback />}>
        <DiscoveryPanel />
      </Suspense>
    </Section>
  )
}
