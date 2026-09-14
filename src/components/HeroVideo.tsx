"use client"

import Image from "next/image"
import { useRef, useState } from "react"

function SpeakerOnIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11 5 6 9H2v6h4l5 4V5Z" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  )
}

function SpeakerOffIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11 5 6 9H2v6h4l5 4V5Z" />
      <line x1="22" x2="16" y1="9" y2="15" />
      <line x1="16" x2="22" y1="9" y2="15" />
    </svg>
  )
}

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  function toggleMuted() {
    const video = videoRef.current
    if (!video) return
    const next = !video.muted
    video.muted = next
    setMuted(next)
    if (!next) video.play().catch(() => setMuted(true))
  }

  return (
    <div className="relative mx-auto aspect-video w-full max-w-lg overflow-hidden rounded-lg border border-line bg-surface">
      <video
        ref={videoRef}
        className="absolute inset-0 size-full object-contain"
        autoPlay
        muted
        playsInline
        poster="/coccinella-labs-icon.png"
        aria-hidden="true"
      >
        <source src="/coccinella-labs-wordmark.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-background/10" aria-hidden="true" />
      <Image
        src="/coccinella-labs-icon.png"
        alt="Coccinella Labs organization mark"
        width={280}
        height={280}
        sizes="64px"
        className="absolute bottom-4 left-4 size-14 rounded-md bg-background/85 p-2 object-contain shadow-lg lg:size-16"
        priority
      />
      <button
        type="button"
        onClick={toggleMuted}
        aria-label={muted ? "Unmute" : "Mute"}
        aria-pressed={!muted}
        className="absolute bottom-4 right-4 flex size-9 items-center justify-center rounded-md border border-line bg-background/85 text-foreground transition-colors hover:border-foreground lg:size-10"
      >
        {muted ? <SpeakerOffIcon /> : <SpeakerOnIcon />}
      </button>
    </div>
  )
}