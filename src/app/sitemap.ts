import type { MetadataRoute } from "next"
import { projects } from "@/lib/projects"

const siteUrl = "https://coccinella-labs.github.io"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/about/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...projects.map(
      (project) =>
        ({
          url: `${siteUrl}/projects/${project.slug}/`,
          lastModified,
          changeFrequency: "weekly",
          priority: 0.8,
        }) as const
    ),
  ]
}
