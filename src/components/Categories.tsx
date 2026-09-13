import Section from "./Section"
import { categories } from "@/lib/projects"

export default function Categories() {
  return (
    <Section
      id="categories"
      eyebrow="Categories"
      title="Where projects live."
      description="Five buckets, no overlap."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category.name}
            className="flex flex-col rounded-xl border border-line p-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">{category.name}</h3>
              <span className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
                {category.count}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">
              {category.blurb}
            </p>
          </div>
        ))}
        <div className="flex flex-col items-start justify-center rounded-xl border border-dashed border-line p-6">
          <p className="text-sm text-muted">
            Have a small tool that fits the collection?{" "}
            <a
              href="https://github.com/coccinella-labs"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent underline-offset-4 transition-colors hover:underline"
            >
              Suggest a project.
            </a>
          </p>
        </div>
      </div>
    </Section>
  )
}
