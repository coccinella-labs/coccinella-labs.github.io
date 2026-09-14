"use client"

import Image from "next/image"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  HarperMockup,
  OrganicTypingMockup,
  MemoraxxMockup,
  HautofixMockup,
  BrowserMockup,
  VesperMockup,
  PressMockup,
  TokensdkMockup,
  OmnnitypeMockup,
  VertexMockup,
} from "./mockups"
import { fmtOSDate, fmtOSTime, timeAgo, useBattery, useConnection, useHFItems, useOnline, useOrgRepos, useRtt } from "@/lib/osLive"
import type { App, WinState } from "./os/types"
import AppWindow from "./os/AppWindow"
import Taskbar from "./os/Taskbar"

const apps: App[] = [
  {
    name: "organictyping",
    tag: "Keystroke analytics",
    glyph: "~",
    tint: "from-rose-500/70 to-amber-400/50",
    repo: "https://github.com/coccinella-labs/organictyping",
    source: "github",
    Mockup: OrganicTypingMockup,
  },
  {
    name: "memoraxx",
    tag: "Local LLM client",
    glyph: "▮",
    tint: "from-teal-500/70 to-emerald-400/50",
    repo: "https://github.com/coccinella-labs/memoraxx",
    source: "github",
    Mockup: MemoraxxMockup,
  },
  {
    name: "hautofix",
    tag: "AI text edit",
    glyph: "✎",
    tint: "from-indigo-500/70 to-sky-400/50",
    repo: "https://github.com/coccinella-labs/hautofix",
    source: "github",
    Mockup: HautofixMockup,
  },
  {
    name: "browser",
    tag: "Desktop browser",
    glyph: "◎",
    tint: "from-orange-500/70 to-rose-400/50",
    repo: "https://github.com/coccinella-labs/browser",
    source: "github",
    Mockup: BrowserMockup,
  },
  {
    name: "press",
    tag: "Bookshelf",
    glyph: "▤",
    tint: "from-sky-500/70 to-violet-400/50",
    repo: "https://github.com/coccinella-labs/press",
    source: "github",
    Mockup: PressMockup,
  },
  {
    name: "vesper",
    tag: "Gemini · PR review",
    glyph: "◇",
    tint: "from-fuchsia-500/70 to-pink-400/50",
    repo: "https://github.com/coccinella-labs/vesper",
    source: "github",
    Mockup: VesperMockup,
  },
  {
    name: "tokensdk",
    tag: "Harpertoken SDK",
    glyph: "◉",
    tint: "from-cyan-500/70 to-blue-400/50",
    repo: "https://github.com/coccinella-labs/tokensdk",
    source: "github",
    Mockup: TokensdkMockup,
  },
  {
    name: "omnitype",
    tag: "Rust type checker",
    glyph: "#",
    tint: "from-amber-500/70 to-yellow-400/50",
    repo: "https://github.com/coccinella-labs/omnitype",
    source: "github",
    Mockup: OmnnitypeMockup,
  },
  {
    name: "vertex",
    tag: "Repo insight",
    glyph: "⌗",
    tint: "from-violet-500/70 to-indigo-400/50",
    repo: "https://github.com/coccinella-labs/vertex",
    source: "github",
    Mockup: VertexMockup,
  },
  {
    name: "harpertoken",
    tag: "Models · Spaces · live",
    glyph: "♥",
    tint: "from-yellow-500/70 to-amber-400/50",
    repo: "https://huggingface.co/harpertoken",
    source: "hf",
  },
]

const harperApp: App = {
  name: "harper",
  tag: "Agent harness",
  glyph: "◆",
  tint: "from-[#f34b7d] to-[#f34b7d]/40",
  repo: "https://github.com/coccinella-labs/harper",
  source: "github",
  Mockup: HarperMockup,
}

const allApps: App[] = [harperApp, ...apps]

const focusable =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40 dark:focus-visible:ring-white/60"

function StatusBar() {
  const [now, setNow] = useState<Date | null>(null)
  const online = useOnline()
  const battery = useBattery()
  const connection = useConnection()
  const rtt = useRtt()
  const offline = online === false
  const wifiLevel = offline
    ? 0
    : rtt !== null
      ? rtt < 200
        ? 3
        : rtt < 700
          ? 2
          : 1
      : connection?.effectiveType === "slow-2g" ||
          connection?.effectiveType === "2g"
        ? 1
        : connection?.effectiveType === "3g"
          ? 2
          : 3
  const arc = (atLeast: number) =>
    wifiLevel >= atLeast ? "opacity-100" : "opacity-20"
  const wifiTitle = offline
    ? "Wi-Fi · offline"
    : rtt !== null
      ? `Wi-Fi · ${rtt} ms${connection ? ` · ${connection.effectiveType}` : ""}`
      : connection
        ? `Wi-Fi · ${connection.effectiveType}${connection.downlink !== null ? ` · ${connection.downlink} Mb/s` : ""}${connection.rtt !== null ? ` · ${connection.rtt} ms` : ""}`
        : "Wi-Fi"

  useEffect(() => {
    const immediate = window.setTimeout(() => setNow(new Date()), 0)
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => {
      window.clearTimeout(immediate)
      window.clearInterval(id)
    }
  }, [])

  const time = now ? fmtOSTime(now) : "--:--"
  const date = now ? fmtOSDate(now) : ""

  return (
    <header className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-4 text-neutral-500 dark:text-white/60 lg:px-8">
      <div className="flex items-center gap-3 text-xs">
        <span className="font-mono">{date}</span>
        <span className="hidden text-neutral-900/20 sm:inline dark:text-white/20">·</span>
        <span className="hidden font-mono text-xs tracking-tight sm:inline">
          coccinella-labs OS
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden font-mono text-xs sm:inline">
          {online === false ? "offline" : "online"}
        </span>
        <span title={wifiTitle}>
          <svg
            className={`size-4 ${offline ? "text-red-500" : "text-neutral-400 dark:text-white/40"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path
              d="M2 8.82a15 15 0 0 1 20 0"
              className={arc(3)}
            />
            <path
              d="M5 12.55a11 11 0 0 1 14.08 0"
              className={arc(2)}
            />
            <path
              d="M8.5 15.5a6.5 6.5 0 0 1 7.09 0"
              className={arc(1)}
            />
            <path d="M12 20h.01" />
          </svg>
        </span>
        <span
          className="flex items-center gap-1.5"
          title={
            battery
              ? `Battery ${Math.round(battery.level * 100)}% · ${battery.charging ? "charging" : "discharging"}`
              : "Battery"
          }
        >
          <svg
            className={`size-4 ${
              battery
                ? battery.charging
                  ? "text-emerald-500"
                  : battery.level <= 0.2
                    ? "text-red-500"
                    : "text-neutral-400 dark:text-white/40"
                : "text-neutral-400 dark:text-white/40"
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <rect x="2" y="7" width="17" height="10" rx="2.5" />
            <path d="M22 11v2" />
          </svg>
          {battery ? (
            <span className="hidden font-mono text-xs sm:inline">
              {Math.round(battery.level * 100)}%{battery.charging ? " ⚡" : ""}
            </span>
          ) : null}
        </span>
        <span className="font-mono text-base font-medium tracking-tight text-neutral-900 dark:text-white">
          {time}
        </span>
      </div>
    </header>
  )
}

export function Wallpaper() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div
        className="absolute inset-0 dark:hidden"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(17,17,17,0.08) 1px, transparent 0)",
          backgroundSize: "26px 26px",
        }}
      />
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="absolute -left-48 -top-48 size-[640px] rounded-full bg-[#f34b7d]/15 blur-[130px] dark:bg-[#f34b7d]/20" />
      <div className="absolute -bottom-56 right-0 size-[640px] rounded-full bg-sky-500/20 blur-[130px] dark:bg-sky-500/15" />
      <div className="absolute left-1/2 top-1/3 size-[480px] -translate-x-1/2 rounded-full bg-white/70 blur-[120px] dark:bg-white/[0.03]" />
    </div>
  )
}

function BootScreen({ onDone }: { onDone: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center gap-6 bg-[#0b0e14]"
      onClick={onDone}
      role="button"
      aria-label="Skip boot screen"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onDone()
      }}
    >
      <Image
        src="/coccinella-labs-icon.png"
        alt=""
        width={72}
        height={72}
        priority
        className="size-16 rounded-full sm:size-[72px]"
      />
      <p className="font-mono text-sm tracking-tight text-white/70">
        coccinella-labs OS
      </p>
      <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-1/3 animate-progress bg-[#f34b7d]/80" />
      </div>
    </div>
  )
}

function Banner({
  onOpen,
  live,
}: {
  onOpen: (app: App) => void
  live: string | null
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-neutral-900/10 bg-neutral-900/[0.03] dark:border-white/15 dark:bg-white/[0.04]">
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f34b7d]/[0.07] blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-48 -left-32 size-[360px] rounded-full bg-sky-500/10 blur-[130px]" />
      <div className="relative grid gap-10 p-8 sm:p-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 dark:text-white/40">
            flagship · agent harness
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-900 lg:text-5xl dark:text-white">
            harper<span className="text-[#f34b7d]">.</span>
          </h1>
          <p className="mt-4 max-w-md text-sm leading-7 text-neutral-600 dark:text-white/60">
            An agent harness, not a pretty chatbot. Harper plans real work,
            executes it as sandboxed jobs, pauses for your approval, and ships
            audited results, end to end.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["sandboxed jobs", "human approvals", "self-hosted"].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-neutral-900/15 px-3 py-1 font-mono text-[11px] text-neutral-600 dark:border-white/15 dark:text-white/60"
              >
                {chip}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onOpen(harperApp)}
              className={`rounded-lg bg-[#f34b7d] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#ff5f95] ${focusable}`}
            >
              Open harper
            </button>
            <a
              href="https://github.com/coccinella-labs/harper"
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-lg border border-neutral-900/20 px-5 py-2.5 text-sm font-medium text-neutral-800 transition-colors hover:border-neutral-900/50 hover:text-neutral-900 dark:border-white/20 dark:text-white/80 dark:hover:border-white/50 dark:hover:text-white ${focusable}`}
            >
              Source
            </a>
          </div>
          {live ? (
            <p className="mt-4 font-mono text-[11px] text-neutral-500 dark:text-white/40">{live}</p>
          ) : null}
        </div>
        <div className="hidden lg:block">
          <div className="rounded-xl shadow-2xl shadow-black/40">
            <HarperMockup />
          </div>
        </div>
      </div>
    </div>
  )
}

function Tile({
  app,
  live,
  onOpen,
}: {
  app: App
  live: string | null
  onOpen: (app: App) => void
}) {
  return (
    <button
      key={app.name}
      type="button"
      onClick={() => onOpen(app)}
      className={`group w-44 shrink-0 snap-start rounded-2xl border border-neutral-900/10 bg-neutral-900/[0.03] p-4 text-left transition-all duration-200 hover:border-neutral-900/25 hover:bg-neutral-900/[0.05] hover:shadow-[0_0_0_3px_rgba(243,75,125,0.35)] sm:w-52 dark:border-white/15 dark:bg-white/[0.04] dark:hover:border-white/30 dark:hover:bg-white/[0.07] ${focusable}`}
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
      {live ? (
        <p className="mt-1.5 truncate font-mono text-[10px] text-neutral-500 dark:text-white/40">
          {live}
        </p>
      ) : null}
      <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-neutral-900/0 transition-colors group-hover:text-neutral-900/40 dark:text-white/0 dark:group-hover:text-white/40">
        open ↗
      </p>
    </button>
  )
}

function Shelf({
  title,
  hint,
  apps,
  liveFor,
  onOpen,
}: {
  title: string
  hint: string
  apps: App[]
  liveFor: (app: App) => string | null
  onOpen: (app: App) => void
}) {
  return (
    <div className="mt-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-wide text-neutral-700 dark:text-white/80">
          {title}
        </h2>
        <span className="font-mono text-[11px] text-neutral-400 dark:text-white/30">{hint}</span>
      </div>
      <div className="-mx-6 flex snap-x gap-4 overflow-x-auto px-6 pb-4 pt-2 lg:-mx-8 lg:px-8 [scrollbar-color:rgba(255,255,255,0.2)_transparent] [scrollbar-width:thin]">
        {apps.map((app) => (
          <Tile key={app.name} app={app} live={liveFor(app)} onOpen={onOpen} />
        ))}
      </div>
    </div>
  )
}

export default function OSHome() {
  const [wins, setWins] = useState<WinState[]>([])
  const [query, setQuery] = useState("")
  const [booted, setBooted] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const repos = useOrgRepos()
  const hfModels = useHFItems("models")
  const hfSpaces = useHFItems("spaces")

  useEffect(() => {
    const wait = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? 0
      : 1200
    const id = window.setTimeout(() => setBooted(true), wait)
    return () => window.clearTimeout(id)
  }, [])

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

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      const typing =
        target.tagName === "INPUT" || target.tagName === "TEXTAREA"
      if (event.key === "/" && !typing && !event.metaKey && !event.ctrlKey) {
        event.preventDefault()
        searchRef.current?.focus()
      } else if (event.key === "Escape") {
        if (query) {
          setQuery("")
          searchRef.current?.blur()
        } else {
          setWins((prev) => {
            const visible = prev.filter((win) => !win.minimized)
            if (visible.length === 0) return prev
            const top = visible[visible.length - 1]
            return prev.filter((win) => win.id !== top.id)
          })
        }
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [query])

  const liveFor = useCallback(
    (app: App): string | null => {
      if (app.source === "hf") {
        if (!hfModels || !hfSpaces) return null
        const likes = hfModels.reduce((sum, item) => sum + item.likes, 0)
        return `♥ ${likes} · ${hfModels.length} models · ${hfSpaces.length} spaces`
      }
      const info = repos?.[app.name]
      if (!info) return null
      return `★ ${info.stars} · ${info.language ?? "code"} · ${timeAgo(info.pushedAt)}`
    },
    [repos, hfModels, hfSpaces]
  )

  const harperInfo = repos?.harper
  const harperLive = harperInfo
    ? `★ ${harperInfo.stars} · ${harperInfo.language ?? "code"} · updated ${timeAgo(harperInfo.pushedAt)} · live from GitHub`
    : null

  const hfSummary =
    hfModels && hfSpaces
      ? `${hfModels.length} models · ${hfSpaces.length} spaces · live from Hugging Face`
      : null

  const q = query.trim().toLowerCase()
  const results = q
    ? apps.filter(
        (app) =>
          app.name.toLowerCase().includes(q) ||
          app.tag.toLowerCase().includes(q)
      )
    : []

  const activeId = useMemo(() => {
    const visible = wins.filter((win) => !win.minimized)
    if (visible.length === 0) return null
    return visible[visible.length - 1].id
  }, [wins])

  return (
    <section id="home" className="relative border-b border-line">
      {!booted ? <BootScreen onDone={() => setBooted(true)} /> : null}
      <div className="relative">
        <StatusBar />
        <div className="relative mx-auto w-full max-w-[1200px] px-6 pb-16 lg:px-8">
          <Banner onOpen={openApp} live={harperLive} />
          <div className="relative mt-10">
            <span
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-mono text-sm text-neutral-400 dark:text-white/30"
              aria-hidden="true"
            >
              ⌕
            </span>
            <input
              ref={searchRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && results.length > 0) {
                  openApp(results[0])
                }
              }}
              type="search"
              placeholder="Search apps, models, tools…"
              aria-label="Search apps"
              className={`w-full rounded-2xl border border-neutral-900/15 bg-neutral-900/[0.04] py-3 pl-11 pr-16 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900/40 focus:outline-none dark:border-white/15 dark:bg-white/[0.05] dark:text-white dark:placeholder:text-white/30 dark:focus:border-white/40 ${focusable}`}
            />
            {query ? (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => {
                  setQuery("")
                  searchRef.current?.focus()
                }}
                className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 font-mono text-xs text-neutral-500 transition-colors hover:text-neutral-900 dark:text-white/50 dark:hover:text-white ${focusable}`}
              >
                ✕
              </button>
            ) : (
              <kbd className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rounded border border-neutral-900/15 px-1.5 font-mono text-[11px] text-neutral-400 dark:border-white/15 dark:text-white/40">
                /
              </kbd>
            )}
          </div>
          {q ? (
            <Shelf
              title={`${results.length} result${results.length === 1 ? "" : "s"}`}
              hint="enter opens the first hit"
              apps={results}
              liveFor={liveFor}
              onOpen={openApp}
            />
          ) : (
            <Shelf
              title="Applications"
              hint="select an app"
              apps={apps}
              liveFor={liveFor}
              onOpen={openApp}
            />
          )}
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
