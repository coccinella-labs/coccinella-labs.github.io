"use client"

import { useEffect, useState } from "react"

export type RepoInfo = {
  name: string
  description: string
  stars: number
  language: string | null
  pushedAt: string | null
  url: string
}

export type HFItem = {
  id: string
  likes: number
  downloads: number | null
  lastModified: string | null
}

let reposCache: Promise<Record<string, RepoInfo>> | null = null
let modelsCache: Promise<HFItem[]> | null = null
let spacesCache: Promise<HFItem[]> | null = null

const CACHE_TTL = 10 * 60 * 1000
const REPOS_KEY = "coccinella-labs:repos"
const EVENTS_KEY = "coccinella-labs:events"

function readStored<T>(key: string): { data: T; at: number } | null {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return null
    const parsed = JSON.parse(raw) as { data: T; at: number }
    if (!parsed || typeof parsed.at !== "number") return null
    return parsed
  } catch {
    return null
  }
}

function writeStored(key: string, data: unknown): void {
  try {
    window.localStorage.setItem(
      key,
      JSON.stringify({ data, at: Date.now() })
    )
  } catch {}
}

async function withStoredCache<T>(
  key: string,
  fetchFresh: () => Promise<T>,
  isEmpty: (data: T) => boolean
): Promise<T> {
  const stored = readStored<T>(key)
  if (stored && Date.now() - stored.at < CACHE_TTL && !isEmpty(stored.data)) {
    return stored.data
  }
  try {
    const fresh = await fetchFresh()
    if (!isEmpty(fresh)) writeStored(key, fresh)
    return fresh
  } catch {
    if (stored && !isEmpty(stored.data)) return stored.data
    throw new Error("unavailable")
  }
}

async function fetchReposFresh(): Promise<Record<string, RepoInfo>> {
  const pages = await Promise.all(
    [1, 2].map(async (page) => {
      const res = await fetch(
        `https://api.github.com/orgs/coccinella-labs/repos?per_page=100&page=${page}`
      )
      if (!res.ok) throw new Error(`GitHub API ${res.status}`)
      return (await res.json()) as Array<{
        name: string
        description: string | null
        stargazers_count: number
        language: string | null
        pushed_at: string | null
        html_url: string
      }>
    })
  )
  const map: Record<string, RepoInfo> = {}
  for (const repo of pages.flat()) {
    map[repo.name] = {
      name: repo.name,
      description: repo.description ?? "",
      stars: repo.stargazers_count,
      language: repo.language,
      pushedAt: repo.pushed_at,
      url: repo.html_url,
    }
  }
  return map
}

async function fetchHF(
  kind: "models" | "spaces"
): Promise<HFItem[]> {
  const res = await fetch(
    `https://huggingface.co/api/${kind}?author=harpertoken&limit=12&sort=lastModified&direction=-1`
  )
  if (!res.ok) throw new Error(`Hugging Face API ${res.status}`)
  const items = (await res.json()) as Array<{
    id: string
    likes?: number
    downloads?: number
    lastModified?: string | null
  }>
  return items.map((item) => ({
    id: item.id,
    likes: item.likes ?? 0,
    downloads: item.downloads ?? null,
    lastModified: item.lastModified ?? null,
  }))
}

export function useOrgRepos(): Record<string, RepoInfo> | null {
  const [repos, setRepos] = useState<Record<string, RepoInfo> | null>(null)

  useEffect(() => {
    let cancelled = false
    if (!reposCache) {
      reposCache = withStoredCache(REPOS_KEY, fetchReposFresh, (map) =>
        Object.keys(map).length === 0
      ).catch(() => ({}))
    }
    reposCache.then((map) => {
      if (!cancelled) setRepos(map)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return repos
}

export function useHFItems(kind: "models" | "spaces"): HFItem[] | null {
  const [items, setItems] = useState<HFItem[] | null>(null)

  useEffect(() => {
    let cancelled = false
    const getCache = () => {
      if (kind === "models") {
        if (!modelsCache) modelsCache = fetchHF("models").catch(() => [])
        return modelsCache
      }
      if (!spacesCache) spacesCache = fetchHF("spaces").catch(() => [])
      return spacesCache
    }
    getCache().then((list) => {
      if (!cancelled) setItems(list)
    })
    return () => {
      cancelled = true
    }
  }, [kind])

  return items
}

export type OrgEvent = {
  id: string
  type: string
  repo: string
  actor: string
  action: string | null
  ref: string | null
  refType: string | null
  tag: string | null
  size: number
  number: number | null
  merged: boolean
  createdAt: string
}

let eventsCache: Promise<OrgEvent[]> | null = null

async function fetchOrgEvents(): Promise<OrgEvent[]> {
  const res = await fetch(
    "https://api.github.com/orgs/coccinella-labs/events?per_page=30"
  )
  if (!res.ok) throw new Error(`GitHub API ${res.status}`)
  const raw = (await res.json()) as Array<{
    id: string | number
    type: string
    actor?: { login?: string }
    repo?: { name?: string }
    payload?: {
      action?: string
      ref?: string
      ref_type?: string
      release?: { tag_name?: string }
      size?: number
      commits?: unknown[]
      number?: number
      pull_request?: { number?: number; merged?: boolean }
    }
    created_at: string
  }>
  return raw.map((event) => ({
    id: String(event.id),
    type: event.type,
    repo: event.repo?.name ?? "",
    actor: event.actor?.login ?? "",
    action: event.payload?.action ?? null,
    ref: event.payload?.ref ?? null,
    refType: event.payload?.ref_type ?? null,
    tag: event.payload?.release?.tag_name ?? null,
    size:
      event.payload?.size ?? event.payload?.commits?.length ?? 0,
    number:
      event.payload?.number ??
      event.payload?.pull_request?.number ??
      null,
    merged: event.payload?.pull_request?.merged ?? false,
    createdAt: event.created_at,
  }))
}

export function useOrgEvents(): OrgEvent[] | null {
  const [events, setEvents] = useState<OrgEvent[] | null>(null)

  useEffect(() => {
    let cancelled = false
    if (!eventsCache) {
      eventsCache = withStoredCache(
        EVENTS_KEY,
        fetchOrgEvents,
        (list) => list.length === 0
      ).catch(() => [])
    }
    eventsCache.then((list) => {
      if (!cancelled) setEvents(list)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return events
}

export function useOnline(): boolean | null {
  const [online, setOnline] = useState<boolean | null>(null)

  useEffect(() => {
    const update = () => setOnline(window.navigator.onLine)
    const immediate = window.setTimeout(update, 0)
    window.addEventListener("online", update)
    window.addEventListener("offline", update)
    return () => {
      window.clearTimeout(immediate)
      window.removeEventListener("online", update)
      window.removeEventListener("offline", update)
    }
  }, [])

  return online
}

export type BatteryInfo = {
  level: number
  charging: boolean
}

type BatteryManagerLike = {
  level: number
  charging: boolean
  addEventListener(
    type: "levelchange" | "chargingchange",
    listener: () => void
  ): void
  removeEventListener(
    type: "levelchange" | "chargingchange",
    listener: () => void
  ): void
}

export function useBattery(): BatteryInfo | null {
  const [battery, setBattery] = useState<BatteryInfo | null>(null)

  useEffect(() => {
    let cancelled = false
    let manager: BatteryManagerLike | null = null
    const update = () => {
      if (manager && !cancelled) {
        setBattery({ level: manager.level, charging: manager.charging })
      }
    }
    const nav = window.navigator as Navigator & {
      getBattery?: () => Promise<BatteryManagerLike>
    }
    if (!nav.getBattery) return
    nav
      .getBattery()
      .then((info) => {
        if (cancelled) return
        manager = info
        update()
        info.addEventListener("levelchange", update)
        info.addEventListener("chargingchange", update)
      })
      .catch(() => {})
    return () => {
      cancelled = true
      manager?.removeEventListener("levelchange", update)
      manager?.removeEventListener("chargingchange", update)
    }
  }, [])

  return battery
}

export type ConnectionInfo = {
  effectiveType: string
  downlink: number | null
  rtt: number | null
  saveData: boolean
}

type ConnectionLike = {
  effectiveType?: string
  downlink?: number
  rtt?: number
  saveData?: boolean
  addEventListener(type: "change", listener: () => void): void
  removeEventListener(type: "change", listener: () => void): void
}

export function useConnection(): ConnectionInfo | null {
  const [connection, setConnection] = useState<ConnectionInfo | null>(null)

  useEffect(() => {
    const nav = window.navigator as Navigator & {
      connection?: ConnectionLike
    }
    const info = nav.connection
    if (!info) return
    let cancelled = false
    const update = () => {
      if (!cancelled) {
        setConnection({
          effectiveType: info.effectiveType ?? "unknown",
          downlink: info.downlink ?? null,
          rtt: info.rtt ?? null,
          saveData: info.saveData ?? false,
        })
      }
    }
    const immediate = window.setTimeout(update, 0)
    info.addEventListener("change", update)
    return () => {
      cancelled = true
      window.clearTimeout(immediate)
      info.removeEventListener("change", update)
    }
  }, [])

  return connection
}

export function useRtt(intervalMs = 10000): number | null {
  const [rtt, setRtt] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    const ping = async () => {
      if (document.hidden) return
      const start = window.performance.now()
      try {
        await fetch(`/manifest.webmanifest?t=${Date.now()}`, {
          cache: "no-store",
        })
        if (!cancelled) {
          setRtt(Math.round(window.performance.now() - start))
        }
      } catch {
        if (!cancelled) setRtt(null)
      }
    }
    const immediate = window.setTimeout(ping, 0)
    const id = window.setInterval(ping, intervalMs)
    return () => {
      cancelled = true
      window.clearTimeout(immediate)
      window.clearInterval(id)
    }
  }, [intervalMs])

  return rtt
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

export function fmtOSDate(date: Date): string {
  return `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()}`
}

export function fmtOSTime(date: Date): string {
  const hours24 = date.getHours()
  const suffix = hours24 >= 12 ? "PM" : "AM"
  const hours12 = hours24 % 12 || 12
  const minutes = String(date.getMinutes()).padStart(2, "0")
  return `${String(hours12).padStart(2, "0")}:${minutes} ${suffix}`
}

export function timeAgo(iso: string | null): string {  if (!iso) return "unknown"
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return "unknown"
  const seconds = Math.max(0, Math.floor((Date.now() - then) / 1000))
  if (seconds < 60) return "just now"
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  return `${Math.floor(months / 12)}y ago`
}
