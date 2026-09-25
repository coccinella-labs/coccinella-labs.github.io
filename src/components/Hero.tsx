import Link from "next/link"
import { projects } from "@/lib/projects"

export default function Hero() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-20 lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            coccinella-labs
          </p>
          <h1 className="text-4xl font-semibold tracking-tight lg:text-5xl">
            A quiet home for small developer tools.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted">
            Small, focused tools on the surface, and real systems work
            underneath — agent infrastructure, GPU compute, SDKs, and
            release tooling that keep the small things honest.
          </p>
          <p className="mt-6 font-mono text-sm text-foreground/70">
            agent infrastructure · gpu compute · runtime sdk · build automation
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="#discovery"
              className="rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent"
            >
              Browse the catalog
            </Link>
            <Link
              href="#systems"
              className="rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
            >
              See the systems
            </Link>
          </div>
          <p className="mt-10 border-t border-line pt-5 font-mono text-[11px] text-muted">
            {projects.length} tools · five categories · one workspace
          </p>
        </div>
      </div>
    </section>
  )
}