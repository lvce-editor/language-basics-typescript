import type { Repository } from '../Repository/Repository.ts'

interface GithubRepository {
  readonly archived?: boolean
  readonly description?: string | null
  readonly fork?: boolean
  readonly full_name?: string
  readonly html_url?: string
  readonly language?: string | null
  readonly name?: string
  readonly updated_at?: string
}

export interface GithubClient {
  readonly listRepositories: () => Promise<readonly Repository[]>
}

type Fetch = typeof fetch

const githubApiUrl = 'https://api.github.com/orgs/lvce-editor/repos'
const pageSize = 100

const getResponseError = async (response: Response): Promise<string> => {
  try {
    const value = (await response.json()) as { readonly message?: unknown }
    if (typeof value.message === 'string') {
      return value.message
    }
  } catch {
    // Fall back to the HTTP status below for non-JSON responses.
  }
  return response.statusText || `GitHub request failed (${response.status})`
}

const normalizeRepository = (
  repository: Readonly<GithubRepository>,
): Repository | undefined => {
  if (
    repository.archived ||
    repository.fork ||
    !repository.name ||
    !repository.full_name ||
    !repository.html_url
  ) {
    return undefined
  }
  return {
    description: repository.description || '',
    fullName: repository.full_name,
    language: repository.language || '',
    name: repository.name,
    updatedAt: repository.updated_at || '',
    url: repository.html_url,
  }
}
