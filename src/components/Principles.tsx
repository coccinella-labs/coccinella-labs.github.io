import Section from "./Section"
import { principles } from "@/lib/projects"

export default function Principles() {
  return (
    <Section
      eyebrow="Principles"
      title="Every project should."
      description="A short bar every tool has to clear before it joins the collection."
      className="border-t border-line"
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {principles.map((principle) => (
          <li
            key={principle}
            className="flex items-center gap-3 rounded-xl border border-line p-6"
          >
            <span className="size-1.5 shrink-0 rounded-full bg-accent" />
            <span className="text-sm font-medium">{principle}</span>
          </li>
        ))}
      </ul>
    </Section>
  )
}
