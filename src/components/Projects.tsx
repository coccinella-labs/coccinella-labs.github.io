import Section from "./Section"
import ProjectIndex from "./ProjectIndex"
import { orderedProjects, projects } from "@/lib/projects"

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Project index."
      description="Search or filter by language and type."
    >
      <ProjectIndex all={orderedProjects(projects)} />
    </Section>
  )
}