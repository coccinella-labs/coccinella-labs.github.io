"use client"

import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react"
import { timeAgo, type RepoInfo } from "@/lib/osLive"
import type { App, WinState } from "./types"
import HFPanel from "./HFPanel"

const focusable =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40 dark:focus-visible:ring-white/60"

type Props = {
  app: App
  win: WinState
  zIndex: number
  focused: boolean
  info: RepoInfo | null
  hfSummary: string | null
  onFocus: (id: string) => void
  onClose: (id: string) => void
  onToggleMin: (id: string) => void
  onToggleMax: (id: string) => void
  onMove: (id: string, x: number, y: number) => void
}

export default function AppWindow({
  app,
  win,
  zIndex,
  focused,
  info,
  hfSummary,
  onFocus,
  onClose,
  onToggleMin,
  onToggleMax,
  onMove,
}: Props) {
  if (win.minimized) return null
  const Mockup = app.Mockup

  const style: CSSProperties = win.maximized
    ? { left: 8, top: 8, right: 8, bottom: 68, zIndex }
    : {
        left: win.x,
        top: win.y,
        width: "min(880px, 94vw)",
        zIndex,
      }

  function startDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (win.maximized) return
    if ((event.target as HTMLElement).closest("button")) return
    const startX = event.clientX - win.x
    const startY = event.clientY - win.y
    const handleMove = (move: PointerEvent) => {
      onMove(win.id, move.clientX - startX, move.clientY - startY)
    }
    const handleUp = () => {
      window.removeEventListener("pointermove", handleMove)
      window.removeEventListener("pointerup", handleUp)
    }
    window.addEventListener("pointermove", handleMove)
    window.addEventListener("pointerup", handleUp, { once: true })
  }

  return (
    <div
      role="dialog"
      aria-label={`${app.name} app window`}
      onPointerDownCapture={() => onFocus(app.name)}
      style={style}
      className={`fixed flex flex-col overflow-hidden rounded-2xl border bg-background shadow-2xl shadow-black/50 ${
        focused
        ? "border-neutral-900/25 dark:border-white/25"
        : "border-neutral-900/10 dark:border-white/10"
      }`}
    >
      <div
        onPointerDown={startDrag}
        className={`flex items-center justify-between gap-2 border-b border-line bg-surface px-3 py-2 select-none ${
          win.maximized ? "" : "cursor-grab touch-none active:cursor-grabbing"
        } ${focusable}`}
      >
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="size-2.5 shrink-0 rounded-full bg-[#f34b7d]" />
          <span className="truncate font-mono text-xs text-muted">
            {app.name}
          </span>
          <span className="hidden shrink-0 rounded border border-line px-1.5 font-mono text-[10px] text-muted sm:inline">
            coccinella-labs OS
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-0.5 font-mono">
          <button
            type="button"
            aria-label={`Minimize ${app.name}`}
            onClick={() => onToggleMin(app.name)}
            className={`rounded-md px-2 py-1 text-sm leading-none text-muted transition-colors hover:bg-line hover:text-foreground ${focusable}`}
          >
            –
          </button>
          <button
            type="button"
            aria-label={win.maximized ? `Restore ${app.name}` : `Maximize ${app.name}`}
            onClick={() => onToggleMax(app.name)}
            className={`rounded-md px-2 py-1 text-xs leading-none text-muted transition-colors hover:bg-line hover:text-foreground ${focusable}`}
          >
            {win.maximized ? "❐" : "▢"}
          </button>
          <button
            type="button"
            aria-label={`Close ${app.name}`}
            onClick={() => onClose(app.name)}
            className={`rounded-md px-2 py-1 text-sm leading-none text-muted transition-colors hover:bg-line hover:text-foreground ${focusable}`}
          >
            ×
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2 border-b border-line px-4 py-1.5 font-mono text-[10px] text-muted">
        <span className="size-1 shrink-0 animate-pulse rounded-full bg-emerald-500" />
        {app.source === "github" ? (
          info ? (
            <span className="truncate">
              ★ {info.stars} · {info.language ?? "code"} · updated{" "}
              {timeAgo(info.pushedAt)}
            </span>
          ) : (
            <span>live · connecting…</span>
          )
        ) : (
          <span className="truncate">
            {hfSummary ?? "live · huggingface.co/harpertoken"}
          </span>
        )}
        <a
          href={app.repo}
          target="_blank"
          rel="noopener noreferrer"
          className={`ml-auto shrink-0 transition-colors hover:text-foreground ${focusable}`}
        >
          open ↗
        </a>
      </div>
      <div
        className={
          win.maximized
            ? "min-h-0 flex-1 overflow-y-auto p-3 sm:p-4"
            : "h-[min(68vh,620px)] overflow-y-auto p-3 sm:p-4"
        }
      >
        {app.source === "hf" || !Mockup ? <HFPanel /> : <Mockup />}
      </div>
    </div>
  )
}
