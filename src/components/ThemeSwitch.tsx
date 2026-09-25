"use client"

import { useEffect, useSyncExternalStore } from "react"

type Theme = "light" | "dark"

const STORAGE_KEY = "coccinella-labs:theme"

const DARK = "#262626"
const LIGHT = "#ffffff"

const listeners = new Set<() => void>()

function notify() {
  listeners.forEach((listener) => listener())
}

function subscribe(onChange: () => void) {
  listeners.add(onChange)
  return () => {
    listeners.delete(onChange)
  }
}

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

function getStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === "light" || stored === "dark") return stored
  } catch {}
  return null
}

function readTheme(): Theme {
  return getStoredTheme() ?? getSystemTheme()
}

function setThemeColorMeta(theme: Theme) {
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute("content", theme === "dark" ? DARK : LIGHT)
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.remove("light", "dark")
  root.classList.add(theme)
  setThemeColorMeta(theme)
}

function IconSun() {
  return (
    <svg
      className="size-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function IconMoon() {
  return (
    <svg
      className="size-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3a6.36 6.36 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  )
}

export default function ThemeSwitch() {
  const theme = useSyncExternalStore<Theme>(subscribe, readTheme, () => "light")

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = () => {
      if (!getStoredTheme()) notify()
    }
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [])

  const label = `Switch to ${theme === "dark" ? "light" : "dark"} theme`

  return (
    <button
      type="button"
      onClick={() => {
        const next: Theme = theme === "dark" ? "light" : "dark"
        try {
          localStorage.setItem(STORAGE_KEY, next)
        } catch {}
        applyTheme(next)
        notify()
      }}
      aria-label={label}
      title={label}
      className="rounded-md p-1.5 text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {theme === "dark" ? <IconMoon /> : <IconSun />}
    </button>
  )
}
