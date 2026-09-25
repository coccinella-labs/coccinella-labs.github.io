"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import ThemeSwitch from "./ThemeSwitch"

const links = [
  { href: "/#systems", section: "systems", label: "Systems" },
  { href: "/#projects", section: "projects", label: "Projects" },
  { href: "/about/", section: null, label: "About" },
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
    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      active ? "bg-line/70 text-foreground" : "text-muted hover:text-foreground"
    } ${focusable()}`

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-line bg-background/85 backdrop-blur"
    >
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-3 px-6 lg:px-8">
        <Link
          href="/"
          className={`flex min-w-0 items-center gap-2.5 rounded-md ${focusable()}`}
        >
          <Image
            src="/coccinella-labs-icon.png"
            alt=""
            width={32}
            height={32}
            priority
            className="size-8 shrink-0 rounded-full"
          />
          <span className="truncate text-base font-semibold tracking-tight text-foreground">
            coccinella-labs
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = isActive(link.href, link.section)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={linkClass(active)}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/coccinella-labs"
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden rounded-md border border-line px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-foreground md:inline-block ${focusable()}`}
          >
            GitHub
          </a>
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

      {mobileOpen ? (
        <div className="border-t border-line md:hidden">
          <nav
            aria-label="Primary mobile"
            className="mx-auto flex max-w-[1200px] flex-col gap-1 px-6 py-3 lg:px-8"
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
                  {link.label}
                </Link>
              )
            })}
            <a
              href="https://github.com/coccinella-labs"
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-1 rounded-md border border-line px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-foreground ${focusable()}`}
            >
              GitHub
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  )
}