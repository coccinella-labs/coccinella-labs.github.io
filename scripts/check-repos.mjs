import { writeFileSync } from 'node:fs'
import { readFile } from 'node:fs/promises'

const org = 'coccinella-labs'
const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN
const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'coccinella-sync',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
}

async function fetchRepos() {
  const repos = []
  let page = 1
  while (true) {
    const res = await fetch(
      `https://api.github.com/orgs/${org}/repos?per_page=100&page=${page}&type=all`,
      { headers }
    )
    if (!res.ok) throw new Error(`GitHub API ${res.status}: ${await res.text()}`)
    const batch = await res.json()
    if (!Array.isArray(batch) || batch.length === 0) break
    repos.push(...batch)
    if (batch.length < 100) break
    page += 1
  }
  return repos
}

const projectsSource = await readFile('src/lib/projects.ts', 'utf8')
const known = new Set(
  [...projectsSource.matchAll(/github\.com\/coccinella-labs\/([A-Za-z0-9._-]+)/g)].map(
    (m) => m[1].toLowerCase()
  )
)

const ignore = new Set(['.github', 'discussions', 'kilo-config'])
const repos = await fetchRepos()
const missing = repos
  .filter((r) => !r.private && !r.fork && !r.archived)
  .filter((r) => !r.name.endsWith('.github.io'))
  .filter((r) => !ignore.has(r.name))
  .filter((r) => !known.has(r.name.toLowerCase()))
  .map((r) => ({
    name: r.name,
    description: r.description,
    language: r.language,
    archived: r.archived,
    updated_at: r.updated_at,
    html_url: r.html_url,
  }))
  .sort((a, b) => a.name.localeCompare(b.name))

writeFileSync('missing-repos.json', JSON.stringify(missing, null, 2) + '\n')
console.log(`Found ${missing.length} repos not listed in src/lib/projects.ts`)
