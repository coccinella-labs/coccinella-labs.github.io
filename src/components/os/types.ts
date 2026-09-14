import type { ComponentType } from "react"

export type AppSource = "github" | "hf"

export type App = {
  name: string
  tag: string
  glyph: string
  tint: string
  repo: string
  source: AppSource
  Mockup?: ComponentType
}

export type WinState = {
  id: string
  minimized: boolean
  maximized: boolean
  x: number
  y: number
}
