// The complete GitHub organization footprint: current repository count
// including infrastructure, websites, archives, and mirrors that sit
// outside the curated project catalog (/lib/projects).
const FALLBACK_REPO_COUNT = 156

const headers: Record<string, string> = {
  Accept: "application/vnd.github+json",
  "User-Agent": "coccinella-labs-site",
}

if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
}

async function fetchRepoCount(): Promise<number> {
  try {
    const res = await fetch(
      "https://api.github.com/orgs/coccinella-labs/repos?per_page=1",
      { headers, cache: "force-cache" },
    )
    if (!res.ok) return FALLBACK_REPO_COUNT
    const last = res.headers.get("link")?.match(/page=(\d+)>; rel="last"/)
    return last ? Number(last[1]) : FALLBACK_REPO_COUNT
  } catch {
    return FALLBACK_REPO_COUNT
  }
}

let pending: Promise<number> | null = null

export function getOrgRepoCount(): Promise<number> {
  if (!pending) pending = fetchRepoCount()
  return pending
}
