"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import ThemeSwitch from "./ThemeSwitch"

function iconProps() {
  return {
    className: "size-4 shrink-0",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  } as const
}

function IconSystems() {
  return (
    <svg {...iconProps()}>
      <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
    </svg>
  )
}

function IconProjects() {
  return (
    <svg {...iconProps()}>
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  )
}

function IconActivity() {
  return (
    <svg {...iconProps()}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  )
}

function IconAbout() {
  return (
    <svg {...iconProps()}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

const links = [
  { href: "/#systems", section: "systems", label: "Systems", Icon: IconSystems },
  { href: "/#projects", section: "projects", label: "Projects", Icon: IconProjects },
  { href: "/#activity", section: "activity", label: "Activity", Icon: IconActivity },
  { href: "/about/", section: null, label: "About", Icon: IconAbout },
]

function focusable() {
  return "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
}

export default function SiteHeader() {
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  const [trackedPath, setTrackedPath] = useState(pathname)
  if (trackedPath !== pathname) {
    setTrackedPath(pathname)
    setActiveSection(null)
    setMobileOpen(false)
  }

  useEffect(() => {
    const targets = links
      .map((link) => link.section)
      .filter((section): section is string => section !== null)
      .map((section) => document.getElementById(section))
      .filter((el): el is HTMLElement => el !== null)

    if (targets.length === 0) return

    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.add(entry.target.id)
          } else {
            visible.delete(entry.target.id)
          }
        }
        const ids = [...visible]
        setActiveSection(ids.length > 0 ? ids[ids.length - 1] : null)
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: 0 }
    )

    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [pathname])

  useEffect(() => {
    if (!mobileOpen) return
    const onPointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMobileOpen(false)
      }
    }
    document.addEventListener("pointerdown", onPointerDown)
    return () => document.removeEventListener("pointerdown", onPointerDown)
  }, [mobileOpen])

  const isActive = (href: string, section: string | null) => {
    if (section) return activeSection === section
    const clean = (value: string) => value.replace(/\/+$/, "")
    return clean(pathname) === clean(href)
  }

  const linkClass = (active: boolean) =>
    `inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-normal transition-colors ${
      active ? "text-foreground" : "text-muted hover:text-foreground"
    } ${focusable()}`

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur"
    >
      <div className="flex h-12 w-full items-center justify-between gap-3 px-6 lg:px-8">
        <Link
          href="/"
          className={`flex min-w-0 items-center gap-2 rounded-md ${focusable()}`}
        >
          <Image
            src="/coccinella-labs-icon.png"
            alt=""
            width={32}
            height={32}
            priority
            className="size-6 shrink-0 rounded-full"
          />
          <span className="truncate text-base font-medium tracking-tight text-foreground">
            Coccinella Labs
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeSwitch />
          <button
            type="button"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
            className={`rounded-md p-2 text-muted transition-colors hover:text-foreground md:hidden ${focusable()}`}
          >
            {mobileOpen ? (
              <svg
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <nav
        aria-label="Primary"
        className="hidden w-full items-center gap-1 px-6 pb-2.5 md:flex lg:px-8"
      >
        {links.map((link) => {
          const active = isActive(link.href, link.section)
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={linkClass(active)}
            >
              <link.Icon />
              {link.label}
            </Link>
          )
        })}
      </nav>

      {mobileOpen ? (
        <div className="border-t border-border md:hidden">
          <nav
            aria-label="Primary mobile"
            className="flex flex-col gap-1 px-6 py-3 lg:px-8"
          >
            {links.map((link) => {
              const active = isActive(link.href, link.section)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMobileOpen(false)}
                  className={linkClass(active)}
                >
                  <link.Icon />
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>
      ) : null}
    </header>
  )
}