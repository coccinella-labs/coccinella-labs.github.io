"use client"

import { useEffect, useRef, useState } from "react"

export default function Counter({
  value,
  duration = 900,
}: {
  value: number
  duration?: number
}) {
  const [shown, setShown] = useState(value)
  const frame = useRef<number | null>(null)

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    if (reduced || value <= 0) return

    const start = performance.now()
    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - (1 - progress) ** 3
      setShown(Math.round(value * eased))
      if (progress < 1) {
        frame.current = requestAnimationFrame(step)
      }
    }
    frame.current = requestAnimationFrame(step)

    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current)
    }
  }, [value, duration])

  return (
    <>
      <span aria-hidden="true" className="count-blur tabular-nums">
        {shown}
      </span>
      <span className="sr-only">{value}</span>
    </>
  )
}
