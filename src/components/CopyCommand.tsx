"use client"

import { useState } from "react"

export default function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false)

  async function copyCommand() {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="relative mt-4">
      <pre className="overflow-x-auto rounded-xl border border-line bg-muted/10 p-5 pr-16 font-mono text-sm leading-6 text-foreground">
        <code>{command}</code>
      </pre>
      <button
        type="button"
        onClick={copyCommand}
        aria-label={copied ? "Copied installation command" : "Copy installation command"}
        title={copied ? "Copied" : "Copy command"}
        className="absolute right-3 top-3 rounded-md p-2 text-muted/60 transition-colors hover:bg-muted/10 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
      >
        {copied ? (
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m5 12 4 4L19 6" />
          </svg>
        ) : (
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
            <rect width="8" height="8" x="8" y="8" rx="1" />
            <path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" />
          </svg>
        )}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "Installation command copied." : ""}
      </span>
    </div>
  )
}
