import { getOrgRepoCount } from "@/lib/org"
import { projects } from "@/lib/projects"
import { systems } from "@/lib/systems"

export default async function SysStatus() {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center gap-x-6 gap-y-1 px-6 py-5 font-mono text-[11px] text-muted lg:px-8">
      <span>projects: {projects.length}</span>
      <span title="Repositories on github.com/coccinella-labs, including infrastructure, websites, archives, and mirrors outside the project catalog">
        repositories: {await getOrgRepoCount()}
      </span>
      <span>systems: {systems.length}</span>
      <a
        href="https://github.com/coccinella-labs"
        target="_blank"
        rel="noopener noreferrer"
        className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
      >
        github.com/coccinella-labs ↗
      </a>
    </div>
  )
}
