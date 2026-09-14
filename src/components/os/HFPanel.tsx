"use client"

import { timeAgo, useHFItems } from "@/lib/osLive"

function Loading() {
  return (
    <div className="flex items-center gap-2 p-4 font-mono text-[11px] text-muted">
      fetching from huggingface.co
      <span className="inline-flex gap-0.5">
        <span
          className="size-1 animate-dot rounded-full bg-muted"
          style={{ animationDelay: "0ms" }}
        />
        <span
          className="size-1 animate-dot rounded-full bg-muted"
          style={{ animationDelay: "150ms" }}
        />
        <span
          className="size-1 animate-dot rounded-full bg-muted"
          style={{ animationDelay: "300ms" }}
        />
      </span>
    </div>
  )
}

export default function HFPanel() {
  const models = useHFItems("models")
  const spaces = useHFItems("spaces")

  if (!models || !spaces) return <Loading />

  if (models.length === 0 && spaces.length === 0) {
    return (
      <div className="p-4 text-sm text-muted">
        Couldn{"'"}t reach Hugging Face right now.{" "}
        <a
          href="https://huggingface.co/harpertoken"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-accent hover:underline"
        >
          Open the profile ↗
        </a>
      </div>
    )
  }

  return (
    <div className="space-y-4 p-1">
      <section>
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted">
          Models · {models.length}
        </p>
        <ul className="flex flex-col gap-1.5">
          {models.map((model) => (
            <li key={model.id}>
              <a
                href={`https://huggingface.co/${model.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-line bg-background px-3 py-2 transition-colors hover:border-foreground"
              >
                <span className="min-w-0 flex-1 truncate font-mono text-[12px] text-foreground">
                  {model.id.replace("harpertoken/", "")}
                </span>
                <span className="shrink-0 font-mono text-[10px] text-muted">
                  ♥ {model.likes}
                  {model.downloads !== null ? ` · ⬇ ${model.downloads}` : ""}
                  {` · ${timeAgo(model.lastModified)}`}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
      {spaces.length > 0 ? (
        <section>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted">
            Spaces · {spaces.length}
          </p>
          <ul className="flex flex-col gap-1.5">
            {spaces.map((space) => (
              <li key={space.id}>
                <a
                  href={`https://huggingface.co/spaces/${space.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-line bg-background px-3 py-2 transition-colors hover:border-foreground"
                >
                  <span className="min-w-0 flex-1 truncate font-mono text-[12px] text-foreground">
                    {space.id.replace("harpertoken/", "")}
                  </span>
                  <span className="shrink-0 font-mono text-[10px] text-muted">
                    ♥ {space.likes}
                    {` · ${timeAgo(space.lastModified)}`}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  )
}
