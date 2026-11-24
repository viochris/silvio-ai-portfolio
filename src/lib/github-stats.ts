export interface GitHubStats {
  repos: number;
  stars: number;
  followers: number;
  topLanguages: string;
  totalCommits: number;
  fetchedAt: number;
  source: 'live' | 'cache' | 'fallback';
}

export const GITHUB_FALLBACK_STATS: GitHubStats = {
  repos: 99,
  stars: 110,
  followers: 0,
  topLanguages: 'Python',
  totalCommits: 0,
  fetchedAt: 0,
  source: 'fallback',
};

const CACHE_KEY = 'silvio_gh_stats_v1';
const CACHE_TTL_MS = 30 * 60 * 1000;

let inFlightRequest: Promise<GitHubStats> | null = null;

export function readCachedGitHubStats(): GitHubStats | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<GitHubStats>;
    if (typeof parsed.repos === 'number' && parsed.repos > 0 && typeof parsed.stars === 'number') {
      return {
        repos: parsed.repos,
        stars: parsed.stars,
        followers: typeof parsed.followers === 'number' ? parsed.followers : 0,
        topLanguages: parsed.topLanguages || 'Python',
        totalCommits: typeof parsed.totalCommits === 'number' ? parsed.totalCommits : 0,
        fetchedAt: typeof parsed.fetchedAt === 'number' ? parsed.fetchedAt : 0,
        source: parsed.source === 'live' ? 'cache' : 'fallback',
      };
    }
  } catch {
    // Ignore storage read errors in restricted contexts
  }
  return null;
}

function writeCachedGitHubStats(stats: GitHubStats) {
  if (typeof window === 'undefined' || stats.source === 'fallback') return;
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(stats));
  } catch {
    // Ignore storage quota errors
  }
}

export async function fetchCachedGitHubStats(): Promise<GitHubStats> {
  const cached = readCachedGitHubStats();
  if (cached && cached.fetchedAt > 0 && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached;
  }

  if (inFlightRequest) {
    return inFlightRequest;
  }

  inFlightRequest = (async () => {
    try {
      const res = await fetch('/api/github-stats');
      if (res.ok) {
        const data = (await res.json()) as GitHubStats;
        if (typeof data.repos === 'number' && data.repos > 0) {
          if (data.source === 'live') {
            writeCachedGitHubStats(data);
            return data;
          }
          if (cached && cached.repos > 0) {
            return cached;
          }
          return data;
        }
      }
    } catch {
      // Fall through cleanly to local cache or verified snapshot
    }

    return cached ?? GITHUB_FALLBACK_STATS;
  })();

  try {
    return await inFlightRequest;
  } finally {
    inFlightRequest = null;
  }
}
