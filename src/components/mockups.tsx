"use client"

import { useMemo } from "react"
import { useOrgRepos } from "@/lib/osLive"

export function WindowChrome({
  title,
  trailing,
}: {
  title: string
  trailing?: string
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-line px-3.5 py-2">
      <div className="flex min-w-0 items-center gap-2">
        <div className="flex shrink-0 gap-1.5">
          <span className="size-2.5 rounded-full bg-red-500/70" />
          <span className="size-2.5 rounded-full bg-amber-500/70" />
          <span className="size-2.5 rounded-full bg-emerald-500/70" />
        </div>
        <span className="truncate font-mono text-xs text-muted">{title}</span>
      </div>
      {trailing ? (
        <span className="shrink-0 rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">
          {trailing}
        </span>
      ) : null}
    </div>
  )
}

export function HarperMockup() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface">
      <WindowChrome title="harper · agent harness" trailing="harper v0.21.0" />
      <div className="grid flex-1 grid-cols-1 sm:grid-cols-[1.15fr_1fr]">
        <div className="flex min-w-0 flex-col">
          <div className="flex-1 space-y-3 p-4 font-mono text-[12px] leading-5">
            <div className="ml-auto max-w-[85%] rounded-lg rounded-tr-sm border border-line bg-background px-3 py-2">
              Ship this repo as a signed GitHub release.
            </div>
            <div className="max-w-[92%] rounded-lg rounded-tl-sm bg-line/50 px-3 py-2">
              On it. I{"'"}ll draft the plan, run the jobs with your approval,
              and hand you a signed release.
              <span className="ml-1 inline-flex gap-0.5">
                <span className="size-1 animate-dot rounded-full bg-muted" style={{ animationDelay: "0ms" }} />
                <span className="size-1 animate-dot rounded-full bg-muted" style={{ animationDelay: "150ms" }} />
                <span className="size-1 animate-dot rounded-full bg-muted" style={{ animationDelay: "300ms" }} />
              </span>
            </div>
            <div className="rounded-lg border border-line bg-background p-3">
              <p className="font-mono text-[11px] text-muted">harper wants to run</p>
              <p className="mt-1 break-all font-mono text-[12px] text-foreground">
                git commit -s -m &quot;release: v0.21.0&quot;
              </p>
              <div className="mt-2.5 flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-md bg-foreground px-3 py-1 text-[11px] font-medium text-background"
                >
                  Allow once
                </button>
                <button
                  type="button"
                  className="rounded-md border border-line px-3 py-1 text-[11px] text-muted"
                >
                  Deny
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 border-t border-line px-3 py-2.5">
            <span className="flex-1 rounded-md border border-line bg-background px-3 py-1.5 font-mono text-[11px] text-muted">
              Ask harper anything…
              <span className="ml-0.5 animate-blink text-foreground/60">|</span>
            </span>
            <span className="rounded-md bg-foreground px-3 py-1.5 text-[11px] font-medium text-background">
              Send
            </span>
          </div>
        </div>
        <div className="flex min-w-0 flex-col border-t border-line sm:border-l sm:border-t-0">
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-xs font-semibold">Plan &amp; execution</span>
            <span className="rounded-full bg-accent/10 px-2 py-0.5 font-mono text-[11px] text-accent">
              3/4
            </span>
          </div>
          <ul className="flex flex-1 flex-col gap-2 px-3">
            <li className="flex items-center gap-2 rounded-md px-2 py-1.5">
              <span className="text-accent">✓</span>
              <div className="min-w-0">
                <p className="truncate text-xs font-medium">Collect merged commits</p>
                <p className="truncate font-mono text-[10px] text-muted">
                  job · done · 0.4s
                </p>
              </div>
            </li>
            <li className="rounded-md bg-line/50 px-2 py-1.5">
              <div className="flex items-center gap-2">
                <span className="size-2.5 animate-spin rounded-full border border-foreground border-t-transparent" />
                <p className="text-xs font-medium">Draft release notes</p>
              </div>
              <div className="mt-1 space-y-0.5 font-mono text-[10px] leading-4 text-muted">
                <p>&gt; 12 commits · grouped into 5 types</p>
                <p>&gt; feat: serialization, api, harness</p>
              </div>
              <div className="mt-1.5 h-0.5 overflow-hidden rounded bg-line">
                <div className="h-full w-1/3 animate-progress bg-accent/60" />
              </div>
            </li>
            <li className="flex items-center gap-2 rounded-md px-2 py-1.5 text-muted">
              <span className="size-2 rounded-full border border-muted" />
              <div className="min-w-0">
                <p className="truncate text-xs">Validate with omnitype</p>
                <p className="truncate font-mono text-[10px]">queued</p>
              </div>
            </li>
            <li className="flex items-center gap-2 rounded-md px-2 py-1.5">
              <span className="size-2 rounded-full bg-amber-500" />
              <div className="min-w-0">
                <p className="truncate text-xs">Commit &amp; sign release</p>
                <p className="truncate font-mono text-[10px] text-muted">
                  needs approval
                </p>
              </div>
            </li>
          </ul>
          <div className="border-t border-line p-3">
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted">
              Strategy
            </p>
            <div className="flex gap-1 rounded-lg border border-line bg-background p-1">
              {["auto", "grounded", "deterministic", "model"].map((s) => (
                <span
                  key={s}
                  className={`min-w-0 flex-1 truncate rounded-md px-1.5 py-1 text-center font-mono text-[10px] ${
                    s === "grounded"
                      ? "bg-foreground text-background"
                      : "text-muted"
                  }`}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-line px-4 py-2 text-[11px] text-muted">
        <span>jobs 3/4 · sandbox on</span>
        <span className="font-mono">model: llama-3.1-8b</span>
      </div>
    </div>
  )
}

export function OrganicTypingMockup() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface">
      <WindowChrome title="organictyping · live session" />
      <div className="flex-1 p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold">Keystroke analysis</span>
          <span className="flex items-center gap-1.5 text-[11px] text-accent">
            <span className="size-1.5 animate-pulse rounded-full bg-accent" />
            Live
          </span>
        </div>
        <div className="mt-3 flex h-16 items-end gap-1.5">
          {[38, 52, 34, 64, 46, 72, 40, 58, 66, 30].map((h, i) => (
            <div
              key={i}
              style={{
                height: `${h}%`,
                animationDelay: `${i * 0.09}s`,
              }}
              className="grow origin-bottom animate-eq rounded-sm bg-accent/50"
            />
          ))}
        </div>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="font-mono text-3xl font-semibold tracking-tight">
              98.2%
            </p>
            <p className="text-[11px] text-muted">confidence · 4,120 ok</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="rounded border border-line bg-background px-2 py-1 font-mono text-[11px]">
              h e l l o ⏎
              <span className="ml-0.5 animate-blink text-foreground/60">|</span>
            </span>
            <span className="text-[11px] text-muted">rhythm match</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function MemoraxxMockup() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface">
      <WindowChrome title="memoraxx · llama terminal" />
      <div className="flex-1 bg-[#0d1117] p-4 font-mono text-[12px] leading-6 text-[#e6edf3]">
        <p className="text-muted">
          $ mx --model llama-3.1-8b
        </p>
        <p className="mt-1">
          <span className="text-accent">q</span> summarise the release notes
        </p>
        <p className="mt-1 text-[#c9d1d9]">
          v0.1.0 adds serialization, then the API stabilised.
          <br />
          Nothing else changed internally.
        </p>
        <div className="mt-2 h-0.5 w-1/2 overflow-hidden rounded bg-white/10">
          <div className="h-full w-1/3 animate-progress bg-white/40" />
        </div>
        <p className="mt-2 text-muted">
          $ <span className="animate-blink">▋</span>
        </p>
      </div>
    </div>
  )
}

export function HautofixMockup() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface">
      <WindowChrome title="autofix · draft.md" trailing="gemini-3-pro" />
      <div className="flex-1 bg-background p-4 font-mono text-[12px] leading-6">
        <p>
          The team ships{" "}
          <span className="animate-ghost rounded-sm bg-line/60 text-muted">
            the release notes on Friday.
          </span>{" "}
          <span className="animate-pulse text-foreground/50">|</span>
        </p>
        <p className="mt-1 text-muted">Nothing else went out this week.</p>
        <p className="mt-1 text-muted">Signatures are verified before publish.</p>
        <div className="mt-4 rounded-lg border border-line bg-surface px-3 py-2">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">
            Ghost text · sentence · casual
          </p>
          <p className="mt-1 animate-ghost text-[12px] text-foreground">
            &quot;the release notes on Friday.&quot;
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="rounded bg-foreground px-2 py-0.5 text-[10px] font-medium text-background">
              Tab accept
            </span>
            <span className="rounded border border-line px-2 py-0.5 text-[10px] text-muted">
              esc dismiss
            </span>
          </div>
        </div>
        <div className="mt-3 flex gap-1">
          {["word", "sentence", "paragraph"].map((m) => (
            <span
              key={m}
              className={`rounded px-2 py-0.5 text-[10px] ${
                m === "sentence"
                  ? "bg-foreground text-background"
                  : "border border-line text-muted"
              }`}
            >
              {m}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-line px-4 py-2 text-[11px] text-muted">
        <span>auto · gemini → sambanova</span>
        <span className="font-mono">500ms</span>
      </div>
    </div>
  )
}

export function BrowserMockup() {
  const repos = useOrgRepos()
  const names = useMemo(() => {
    if (!repos) {
      return ["clipb", "dotenv-keep", "harper", "hautofix", "mini", "omnitype"]
    }
    return Object.values(repos)
      .sort((a, b) => b.stars - a.stars)
      .slice(0, 6)
      .map((repo) => repo.name)
  }, [repos])
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface">
      <WindowChrome title="Browser · desktop app" trailing="v1.28.9" />
      <div className="flex items-center gap-1 border-b border-line bg-surface px-2 py-1.5">
        <span className="rounded border border-line px-1.5 font-mono text-[10px] text-muted">
          disqus.us
        </span>
        <span className="rounded border border-line px-1.5 font-mono text-[10px] text-muted">
          harper
        </span>
        <span className="flex items-center gap-1 rounded bg-line/60 px-1.5 font-mono text-[10px] text-foreground">
          coccinella-labs
        </span>
        <span className="ml-auto rounded border border-line px-1 font-mono text-[10px] text-muted">
          +
        </span>
      </div>
      <div className="flex items-center gap-2 border-b border-line bg-surface px-3 py-1.5">
        <span className="text-muted">‹</span>
        <span className="text-muted/40">›</span>
        <span className="text-muted">↻</span>
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-line bg-background px-2 py-1">
          <span className="size-2 animate-pulse rounded-full bg-accent/50" />
          <span className="truncate font-mono text-[10px] text-muted">
            https://coccinella-labs.github.io
          </span>
          <span className="ml-auto size-3 shrink-0 animate-spin rounded-full border border-muted border-t-transparent" />
        </div>
      </div>
      <div className="h-0.5 overflow-hidden bg-line/40">
        <div className="h-full w-1/3 animate-progress bg-accent/50" />
      </div>
      <div className="grid flex-1 grid-cols-2 gap-2 bg-background p-3">
        <div className="col-span-2 rounded-md border border-line bg-surface px-3 py-2">
          <p className="text-xs font-semibold">coccinella-labs</p>
          <p className="text-[10px] text-muted">
            Small tools, strong opinions. · 136 projects
          </p>
        </div>
        {names.map((name, i) => (
          <div
            key={name}
            className={`flex items-center gap-1.5 rounded-md border border-line px-2 py-1.5 ${
              i === 0 ? "bg-line/40" : "bg-surface"
            }`}
          >
            <span className="size-1.5 rounded-full bg-accent" />
            <span className="truncate font-mono text-[10px]">{name}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-line px-4 py-2 text-[11px] text-muted">
        <span>3 tabs · history synced</span>
        <span className="font-mono">settings encrypted</span>
      </div>
    </div>
  )
}

export function VesperMockup() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface">
      <WindowChrome title="vesper · PR review" trailing="gemini-2.5-pro" />
      <div className="flex-1 space-y-3 bg-background p-4 font-mono text-[11px] leading-5">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-semibold">
            <span className="size-1.5 rounded-full bg-accent" />
            vesper/repo <span className="font-normal text-muted">#214</span>
            <span className="ml-auto rounded border border-line px-1.5 text-[9px] font-normal text-muted">
              open
            </span>
          </p>
          <p className="text-[10px] text-muted">fix env defaults in setup.sh</p>
        </div>
        <div className="rounded-lg border border-line bg-surface p-2 text-[11px]">
          <p className="text-red-500">- require &quot;secrets&quot;</p>
          <p className="text-emerald-500">+ require &quot;dotenv/load&quot;</p>
        </div>
        <div className="rounded-lg border border-line bg-surface px-2.5 py-2">
          <p className="flex items-center gap-2 text-[11px] font-medium">
            <span className="size-2.5 shrink-0 animate-spin rounded-full border border-foreground border-t-transparent" />
            LGTM · 2 suggestions
          </p>
          <p className="mt-0.5 text-[10px] leading-4 text-muted">
            &quot;this also affects ci/setup.sh&quot;
            <span className="ml-1 inline-flex gap-0.5 align-baseline">
              <span className="size-1 animate-dot rounded-full bg-muted" style={{ animationDelay: "0ms" }} />
              <span className="size-1 animate-dot rounded-full bg-muted" style={{ animationDelay: "150ms" }} />
              <span className="size-1 animate-dot rounded-full bg-muted" style={{ animationDelay: "300ms" }} />
            </span>
          </p>
        </div>
        <div className="rounded-lg border border-line bg-background px-2.5 py-2">
          <p className="text-[10px] text-muted">you</p>
          <p className="text-[11px]">approve if the ci snap matches</p>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-line px-4 py-2 text-[11px] text-muted">
        <span className="flex items-center gap-1.5">
            <span className="size-1 animate-pulse rounded-full bg-accent" />
            auto-review on
          </span>
        <span className="font-mono">gemini</span>
      </div>
    </div>
  )
}

export function PressMockup() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface">
      <WindowChrome title="press · bookshelf" trailing="app" />
      <div className="flex-1 bg-background p-4">
        <div className="w-full rounded-md border border-line bg-surface px-3 py-1.5 text-[11px] text-muted">
          search the shelf…
          <span className="ml-0.5 animate-blink text-foreground/60">|</span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            ["The Love of God", "ch. 12 · 48%", "bg-accent/30"],
            ["Prayer", "ch. 3 · 14%", "bg-amber-400/30"],
            ["The Sermon", "finished", "bg-sky-400/30"],
          ].map(([title, meta, tone]) => (
            <div
              key={title}
              className="rounded-md border border-line bg-surface p-2"
            >
              <div className={`aspect-[3/4] rounded ${tone}`} />
              <p className="mt-1.5 truncate text-[10px] font-medium">{title}</p>
              <p className="text-[9px] text-muted">{meta}</p>
              <div className="mt-1 h-0.5 overflow-hidden rounded bg-line">
                <div className="h-full w-1/3 animate-progress bg-accent/40" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-line px-4 py-2 text-[11px] text-muted">
        <span>142 books</span>
        <span className="flex items-center gap-1 font-mono">
          <span className="size-1 animate-pulse rounded-full bg-accent" />
          sync
        </span>
      </div>
    </div>
  )
}

export function TokensdkMockup() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface">
      <WindowChrome title="tokensdk · SDK" trailing="v0.7.2" />
      <div className="flex-1 bg-[#0d1117] p-4 font-mono text-[11px] leading-6 text-[#e6edf3]">
        <p>
          <span className="text-sky-500">import</span> {"{"} mint, verify {"}"}{" "}
          <span className="text-sky-500">from</span>{" "}
          <span className="text-amber-500">&quot;@harpertoken/tokensdk&quot;</span>;
        </p>
        <p className="mt-1">
          <span className="text-sky-500">const</span> t ={" "}
          <span className="text-sky-500">await</span> mint({"{"} domain:{" "}
          <span className="text-amber-500">&quot;press.app&quot;</span>{"}"});
          <span className="ml-0.5 animate-blink">|</span>
        </p>
        <div className="mt-2 rounded-md border border-line px-2 py-1.5 text-[10px] text-muted">
          <p className="flex items-center gap-1.5 text-emerald-500">
            <span className="size-2.5 animate-spin rounded-full border border-emerald-500 border-t-transparent" />
            token issued
          </p>
          <p>hrtk_8f3a9c…</p>
          <p>balance · 1,250</p>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-line px-4 py-2 text-[11px] text-muted">
        <span>TypeScript</span>
        <span className="font-mono">graph: mainnet</span>
      </div>
    </div>
  )
}

export function OmnnitypeMockup() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface">
      <WindowChrome title="omnitype · typecheck" trailing="v0.1.2-beta.1" />
      <div className="flex-1 bg-[#0d1117] p-4 font-mono text-[11px] leading-6 text-[#e6edf3]">
        <p>
          <span className="text-muted">$</span> omnitype check src
          <span className="ml-0.5 animate-blink">|</span>
        </p>
        <p className="mt-1 text-muted">12 modules · 154ms</p>
        <div className="mt-1.5 h-0.5 w-2/3 overflow-hidden rounded bg-white/10">
          <div className="h-full w-1/3 animate-progress bg-white/30" />
        </div>
        <div className="mt-2 rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-2 text-red-400">
          <p>error: mismatched types</p>
          <p className="text-[10px] text-red-400/70">expected Result&lt;Byte&gt;</p>
          <p className="text-[10px] text-red-400/70">found Result&lt;u8&gt;</p>
          <p className="text-[10px] text-red-400/70">→ src/api.rs:18</p>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-line px-4 py-2 text-[11px] text-muted">
        <span className="flex items-center gap-1.5">
            <span className="size-1 animate-pulse rounded-full bg-emerald-500" />
            strict · CI
          </span>
        <span className="font-mono">rust 1.85</span>
      </div>
    </div>
  )
}

export function VertexMockup() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface">
      <WindowChrome title="vertex · repo insight" trailing="v2.4.0" />
      <div className="flex-1 bg-background p-4">
        <div className="flex items-center gap-2">
          <span className="flex-1 truncate rounded-md border border-line bg-surface px-3 py-1.5 font-mono text-[11px] text-muted">
            https://github.com/coccinella-labs/harper
            <span className="ml-0.5 animate-blink text-foreground/60">|</span>
          </span>
          <span className="rounded-md bg-foreground px-3 py-1.5 text-[11px] font-medium text-background">
            Inspect
          </span>
        </div>
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-medium">Evidence · 300 files</span>
            <span className="font-mono text-muted">scanned in 1.2s</span>
          </div>
          <div className="flex h-12 items-end gap-1.5">
            {[44, 70, 30, 58, 38, 26].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
                className="grow origin-bottom animate-eq rounded-sm bg-accent/50"
              />
            ))}
          </div>
          <div className="rounded-lg border border-line bg-surface px-3 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">
              Think
            </p>
            <p className="mt-1 text-[11px] leading-4 text-foreground">
              Serialization is the core; four prepared paths surface in the
              API.
            </p>
          </div>
          <div className="rounded-lg border border-line bg-surface px-3 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">
              Plan
            </p>
            <p className="mt-1 text-[11px] leading-4 text-foreground">
              Trace data flow before touching the model.
            </p>
            <div className="mt-1.5 h-0.5 overflow-hidden rounded bg-line">
              <div className="h-full w-1/3 animate-progress bg-accent/60" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-line px-4 py-2 text-[11px] text-muted">
        <span className="flex items-center gap-1.5">
          <span className="size-1 animate-pulse rounded-full bg-accent" />
          evidence verified
        </span>
        <span className="font-mono">typescript</span>
      </div>
    </div>
  )
}
