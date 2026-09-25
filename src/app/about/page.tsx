import type { Metadata } from "next"
import Link from "next/link"
import SiteHeader from "@/components/SiteHeader"
import Footer from "@/components/Footer"
import { principles } from "@/lib/projects"
import { getOrgRepoCount } from "@/lib/org"
import { releaseHistory } from "@/lib/releases"

export const metadata: Metadata = {
  title: "About",
  description:
    "Coccinella Labs develops small developer tools and the systems behind them, in the open.",
}

export default async function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
      <div className="border-b border-border">
        <div className="mx-auto w-full max-w-[1200px] px-6 py-12 lg:px-8 lg:py-16">
          <Link
            href="/"
            className="text-sm text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            ← Home
          </Link>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight lg:text-4xl">
            About
          </h1>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-6 py-12 lg:px-8 lg:py-16">
        <div className="max-w-2xl">
          <p className="text-lg leading-8 text-foreground/80">
            A developer tools and systems company, building in the open.
          </p>
          <p className="mt-4 text-base leading-7 text-muted">
            Every project is a working repository with tests, releases, and
            documentation, kept small enough to read and replace.
          </p>
          <p className="mt-4 text-base leading-7 text-muted">
            The work is organized into four systems: agent infrastructure,
            GPU and ML compute, runtimes and developer tooling, and build and
            release automation. Together they cover focused tools, shared
            libraries, and the machinery that ships them.
          </p>
          <p className="mt-4 text-base leading-7 text-muted">
            <a
              href="https://github.com/palmshed"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent underline-offset-4 transition-colors hover:underline"
            >
              Palmshed
            </a>{" "}
            is the name of its collection: the open-source projects here,
            shipped from{" "}
            <a
              href="https://github.com/coccinella-labs"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent underline-offset-4 transition-colors hover:underline"
            >
              GitHub
            </a>, alongside harpertoken, the machine-learning work on{" "}
            <a
              href="https://huggingface.co/harpertoken"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent underline-offset-4 transition-colors hover:underline"
            >
              Hugging Face
            </a>{" "}
            with open models, datasets, and Spaces. The org holds{" "}
            {await getOrgRepoCount()} repositories; infrastructure, websites,
            archives, and mirrors sit outside the project catalog.
          </p>
          <ul className="mt-10 flex flex-col gap-3">
            {principles.map((principle) => (
              <li key={principle} className="flex items-center gap-3">
                <span className="size-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-sm font-medium">{principle}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 overflow-hidden rounded-lg border border-border">
            <div className="border-b border-border p-5">
              <h2 className="text-base font-semibold">Release history</h2>
            </div>
            <ul className="flex flex-col">
              {releaseHistory.slice(-2)
                .reverse()
                .map((release) => (
                  <li
                    key={release.version}
                    className="border-b border-border px-5 py-4 last:border-b-0"
                  >
                    <p className="flex items-baseline justify-between gap-4">
                      <span className="font-mono text-sm font-medium text-accent">
                        v{release.version} · {release.name}
                      </span>
                      <span className="shrink-0 font-mono text-[11px] text-muted">
                        {release.date}
                      </span>
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted">
                      {release.notes}
                    </p>
                  </li>
                ))}
            </ul>
          </div>
          <Link
            href="/#projects"
            className="mt-10 inline-block rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:opacity-90"
          >
            Browse projects
          </Link>
        </div>
      </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}
