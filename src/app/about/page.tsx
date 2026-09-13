import type { Metadata } from "next"
import Link from "next/link"
import { principles } from "@/lib/projects"

export const metadata: Metadata = {
  title: "About",
  description:
    "coccinella-labs is a company of Palmshed; a collection of small tools for software engineering.",
}

export default function AboutPage() {
  return (
    <main className="flex-1">
      <div className="border-b border-line">
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
            Most projects start by promising a lot. coccinella-labs started the
            other way around, from the small things.
          </p>
          <p className="mt-4 text-base leading-7 text-muted">
            A clipboard utility. A tagger. A nightly build. Nothing that
            needs a bow on it, only work that can be trusted to hold. Every
            project here is designed to solve one problem well and remain
            independently useful.
          </p>
          <p className="mt-4 text-base leading-7 text-muted">
            We keep the tools small enough to read, honest enough to keep,
            and easy enough to replace. Not because small is pretty. Because
            small is what lasts.
          </p>
          <p className="mt-4 text-base leading-7 text-muted">
            coccinella-labs is part of a small ecosystem alongside{" "}
            <a
              href="https://github.com/palmshed"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent underline-offset-4 transition-colors hover:underline"
            >
              Palmshed
            </a>
            , which builds open-source AI tools, agents, and SDKs, and{" "}
            <a
              href="https://github.com/coccinella-labs"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent underline-offset-4 transition-colors hover:underline"
            >
              harpertoken
            </a>
            . Together, the projects cover ambitious systems, focused
            software, and the small utilities that make daily work easier.
          </p>
          <ul className="mt-10 flex flex-col gap-3">
            {principles.map((principle) => (
              <li key={principle} className="flex items-center gap-3">
                <span className="size-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-sm font-medium">{principle}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/#projects"
            className="mt-10 inline-block rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent"
          >
            Browse projects
          </Link>
        </div>
      </div>
    </main>
  )
}
