"use client"

import { useCallback, useMemo, useState } from "react"
import { timeAgo, useHFItems, useOrgRepos } from "@/lib/osLive"
import type { App, WinState } from "./types"
import { OS_CODENAME, OS_NAME, OS_VERSION } from "./types"
import { allApps, apps } from "./apps"
import AppWindow from "./windows/AppWindow"
import Taskbar from "./windows/Taskbar"

const focusable =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40 dark:focus-visible:ring-white/60"

function Tile({
  app,
  fact,
  onOpen,
}: {
  app: App
  fact: string | null
  onOpen: (app: App) => void
}) {
  return (
    <button
      key={app.name}
      type="button"
      onClick={() => onOpen(app)}
      className={`w-44 shrink-0 snap-start rounded-2xl border border-neutral-900/10 bg-neutral-900/[0.03] p-4 text-left transition-colors hover:border-neutral-900/25 hover:bg-neutral-900/[0.05] sm:w-52 dark:border-white/15 dark:bg-white/[0.04] dark:hover:border-white/30 dark:hover:bg-white/[0.07] ${focusable}`}
    >
      <div
        className={`flex size-11 items-center justify-center rounded-xl bg-gradient-to-br text-lg text-white ${app.tint}`}
      >
        {app.glyph}
      </div>
      <p className="mt-3 truncate text-sm font-medium text-neutral-900 dark:text-white">
        {app.name}
      </p>
      <p className="mt-0.5 truncate text-xs text-neutral-500 dark:text-white/45">
        {app.tag}
      </p>
      {fact ? (
        <p className="mt-1.5 truncate font-mono text-[10px] text-neutral-500 dark:text-white/40">
          {fact}
        </p>
      ) : (
        <p aria-hidden="true" className="mt-1.5 select-none font-mono text-[10px] opacity-0">
          &nbsp;
        </p>
      )}
    </button>
  )
}

function Shelf({
  title,
  hint,
  apps,
  factFor,
  onOpen,
}: {
  title: string
  hint: string
  apps: App[]
  factFor: (app: App) => string | null
  onOpen: (app: App) => void
}) {
  return (
    <div className="mt-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-wide text-neutral-700 dark:text-white/80">
          {title}
        </h2>
        <span className="font-mono text-[11px] text-neutral-400 dark:text-white/30">
          {hint}
        </span>
      </div>
      <div className="-mx-6 flex snap-x gap-4 overflow-x-auto px-6 pb-4 pt-2 lg:-mx-8 lg:px-8 [scrollbar-color:rgba(255,255,255,0.2)_transparent] [scrollbar-width:thin]">
        {apps.map((app) => (
          <Tile key={app.name} app={app} fact={factFor(app)} onOpen={onOpen} />
        ))}
      </div>
    </div>
  )
}

export default function OSHome() {
  const [wins, setWins] = useState<WinState[]>([])
  const repos = useOrgRepos()
  const hfModels = useHFItems("models")
  const hfSpaces = useHFItems("spaces")

  const openApp = useCallback((app: App) => {
    setWins((prev) => {
      const existing = prev.find((win) => win.id === app.name)
      const rest = prev.filter((win) => win.id !== app.name)
      if (existing) {
        return [...rest, { ...existing, minimized: false }]
      }
      const n = prev.length
      const width = Math.min(880, window.innerWidth * 0.94)
      const x = Math.max(
        8,
        (window.innerWidth - width) / 2 + ((n % 5) * 30 - 60)
      )
      const y = 90 + (n % 5) * 26
      return [
        ...prev,
        { id: app.name, minimized: false, maximized: false, x, y },
      ]
    })
  }, [])

  const closeWin = useCallback((id: string) => {
    setWins((prev) => prev.filter((win) => win.id !== id))
  }, [])

  const focusWin = useCallback((id: string) => {
    setWins((prev) => {
      const win = prev.find((candidate) => candidate.id === id)
      if (!win) return prev
      return [...prev.filter((candidate) => candidate.id !== id), win]
    })
  }, [])

  const toggleMin = useCallback((id: string) => {
    setWins((prev) => {
      const win = prev.find((candidate) => candidate.id === id)
      if (!win) return prev
      if (win.minimized) {
        return [
          ...prev.filter((candidate) => candidate.id !== id),
          { ...win, minimized: false },
        ]
      }
      return prev.map((candidate) =>
        candidate.id === id ? { ...candidate, minimized: true } : candidate
      )
    })
  }, [])

  const toggleMax = useCallback((id: string) => {
    setWins((prev) =>
      prev.map((win) =>
        win.id === id ? { ...win, maximized: !win.maximized } : win
      )
    )
  }, [])

  const selectWin = useCallback((id: string) => {
    setWins((prev) => {
      const win = prev.find((candidate) => candidate.id === id)
      if (!win) return prev
      if (win.minimized) {
        return [
          ...prev.filter((candidate) => candidate.id !== id),
          { ...win, minimized: false },
        ]
      }
      const visible = prev.filter((candidate) => !candidate.minimized)
      const top = visible[visible.length - 1]
      if (top && top.id === id) {
        return prev.map((candidate) =>
          candidate.id === id ? { ...candidate, minimized: true } : candidate
        )
      }
      return [...prev.filter((candidate) => candidate.id !== id), win]
    })
  }, [])

  const moveWin = useCallback((id: string, x: number, y: number) => {
    setWins((prev) =>
      prev.map((win) =>
        win.id === id
          ? { ...win, x: Math.max(-400, x), y: Math.max(0, y) }
          : win
      )
    )
  }, [])

  const factFor = useCallback(
    (app: App): string | null => {
      if (app.source === "hf") {
        if (!hfModels || !hfSpaces) return null
        return `${hfModels.length} models · ${hfSpaces.length} spaces`
      }
      const info = repos?.[app.name]
      if (!info) return null
      return `${info.language ?? "code"} · updated ${timeAgo(info.pushedAt)}`
    },
    [repos, hfModels, hfSpaces]
  )

  const activeId = useMemo(() => {
    const visible = wins.filter((win) => !win.minimized)
    if (visible.length === 0) return null
    return visible[visible.length - 1].id
  }, [wins])

  const hfSummary =
    hfModels && hfSpaces
      ? `${hfModels.length} models · ${hfSpaces.length} spaces`
      : null

  return (
    <section id="home" className="border-b border-line">
      <div className="relative border-t border-line">
        <div className="mx-auto w-full max-w-[1200px] px-6 py-20 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
              OS lab
            </p>
            <h2 className="text-3xl font-semibold tracking-tight lg:text-4xl">
              coccinella-labs OS
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              Every product opened as a working window. Pick an app and it
              opens over the page — no boot sequence, no gauges.
            </p>
            <p className="mt-3 font-mono text-[11px] text-muted">
              {OS_NAME} · v{OS_VERSION} · {OS_CODENAME}
            </p>
          </div>
          <Shelf
            title="Applications"
            hint="select an app to open a window"
            apps={apps}
            factFor={factFor}
            onOpen={openApp}
          />
        </div>
      </div>
      {wins.map((win, index) => {
        const app = allApps.find((candidate) => candidate.name === win.id)
        if (!app) return null
        return (
          <AppWindow
            key={win.id}
            app={app}
            win={win}
            zIndex={60 + index}
            focused={win.id === activeId}
            info={app.source === "github" ? (repos?.[app.name] ?? null) : null}
            hfSummary={app.source === "hf" ? hfSummary : null}
            onFocus={focusWin}
            onClose={closeWin}
            onToggleMin={toggleMin}
            onToggleMax={toggleMax}
            onMove={moveWin}
          />
        )
      })}
      <Taskbar
        wins={wins}
        apps={allApps}
        activeId={activeId}
        onSelect={selectWin}
      />
    </section>
  )
}