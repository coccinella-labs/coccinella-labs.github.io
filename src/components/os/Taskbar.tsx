"use client"

import { useEffect, useState } from "react"
import { fmtOSTime } from "@/lib/osLive"
import type { App, WinState } from "./types"

const focusable =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40 dark:focus-visible:ring-white/60"

type Props = {
  wins: WinState[]
  apps: App[]
  activeId: string | null
  onSelect: (id: string) => void
}

function useClock(): string {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    const immediate = window.setTimeout(() => setNow(new Date()), 0)
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => {
      window.clearTimeout(immediate)
      window.clearInterval(id)
    }
  }, [])

  return now ? fmtOSTime(now) : "--:--"
}

export default function Taskbar({ wins, apps, activeId, onSelect }: Props) {
  const time = useClock()
  if (wins.length === 0) return null

  return (
    <div className="fixed bottom-3 left-1/2 z-[90] flex max-w-[94vw] -translate-x-1/2 items-center gap-1 overflow-x-auto rounded-full border border-neutral-900/10 bg-white/90 px-2 py-1.5 shadow-2xl shadow-black/20 backdrop-blur dark:border-white/15 dark:bg-[#0b0e14]/90 dark:shadow-black/50">
      <span className="mx-1 size-2.5 shrink-0 rounded-full bg-[#f34b7d]" />
      {wins.map((win) => {
        const app = apps.find((candidate) => candidate.name === win.id)
        if (!app) return null
        const active = win.id === activeId && !win.minimized
        return (
          <button
            key={win.id}
            type="button"
            title={win.minimized ? `Restore ${app.name}` : `Focus ${app.name}`}
            onClick={() => onSelect(win.id)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs transition-colors ${focusable} ${
              active
                ? "bg-neutral-900/10 text-neutral-900 dark:bg-white/15 dark:text-white"
                : "text-neutral-500 hover:bg-neutral-900/5 hover:text-neutral-900 dark:text-white/50 dark:hover:bg-white/5 dark:hover:text-white"
            } ${win.minimized ? "opacity-60" : ""}`}
          >
            <span
              className={`flex size-5 items-center justify-center rounded-md bg-gradient-to-br text-[10px] text-white ${app.tint}`}
            >
              {app.glyph}
            </span>
            <span className="hidden max-w-24 truncate font-mono sm:inline">
              {app.name}
            </span>
          </button>
        )
      })}
      <span className="mx-1 h-4 w-px shrink-0 bg-neutral-900/10 dark:bg-white/15" />
      <span className="shrink-0 px-1 font-mono text-xs text-neutral-600 dark:text-white/70">
        {time}
      </span>
    </div>
  )
}
