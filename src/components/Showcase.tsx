import Section from "./Section"
import { HarperMockup } from "@/os/mockups"

const pitches = [
  {
    title: "Deploy in days, not quarters",
    body: "Drop-in products with clear integration points, tailored for your stack.",
  },
  {
    title: "Perpetual license or SaaS",
    body: "Buy the software outright or run it managed. Your data stays yours either way.",
  },
  {
    title: "Self-hosted, even air-gapped",
    body: "Single binaries with no telemetry. Works where your network ends.",
  },
  {
    title: "Direct line to maintainers",
    body: "You talk to the people who wrote it, not a ticket queue.",
  },
]

export default function Showcase() {
  return (
    <Section
      id="showcase"
      eyebrow="Products"
      title="What we can ship for you."
      description="These are real tools the lab maintains, not concept art. Licensed as a product, embedded in your stack, or run for you."
    >
      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <HarperMockup />
        <div className="flex flex-col justify-center">
          <h3 className="font-mono text-lg font-medium text-accent">harper</h3>
          <p className="mt-2 text-sm leading-6 text-muted">
            An agent harness, not a pretty chatbot. Harper plans real work,
            executes it as sandboxed jobs, pauses for your approval, and
            ships audited results, end to end.
          </p>
          <ul className="mt-5 flex flex-col gap-3">
            {pitches.map((p) => (
              <li key={p.title}>
                <p className="text-sm font-medium">{p.title}</p>
                <p className="mt-0.5 text-sm leading-6 text-muted">{p.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/coccinella-labs/harper"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-accent"
            >
              Explore harper
            </a>
            <a
              href="mailto:coccinella.labs@icloud.com"
              className="rounded-lg border border-line px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-foreground"
            >
              Talk to the lab
            </a>
          </div>
        </div>
      </div>
    </Section>
  )
}