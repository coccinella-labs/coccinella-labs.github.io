import Section from "./Section"
import { philosophy } from "@/lib/projects"

export default function Philosophy() {
  return (
    <Section
      eyebrow="Philosophy"
      title="Small tools, strong opinions."
      description="What we build, and just as importantly what we refuse to build."
    >
      <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {philosophy.map((item) => (
          <div key={item.title} className="bg-background p-8">
            <h3 className="text-base font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">{item.body}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
