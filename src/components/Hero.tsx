import { getOrgRepoCount } from "@/lib/org"
import { projects } from "@/lib/projects"
import { systems } from "@/lib/systems"

export default async function Hero() {
  const facts = [
    { label: "projects", value: projects.length },
    { label: "repositories", value: await getOrgRepoCount() },
    { label: "systems", value: systems.length },
  ]
  return (
    <section className="border-b border-border">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-24 lg:px-8 lg:py-32">
        <h1 className="sr-only">Coccinella Labs</h1>
        <dl className="flex flex-wrap gap-x-16 gap-y-10">
          {facts.map(({ label, value }) => (
            <div key={label}>
              <dd className="font-mono text-5xl font-medium tracking-tight text-foreground">
                {value}
              </dd>
              <dt className="mt-3 font-mono text-[11px] uppercase tracking-widest text-muted">
                {label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}