import { NextResponse } from 'next/server';
import { GITHUB_FALLBACK_STATS, type GitHubStats } from '@/lib/github-stats';

const CACHE_TTL_MS = 30 * 60 * 1000;
const RATE_LIMIT_COOLDOWN_MS = 10 * 60 * 1000;

let cachedLiveStats: GitHubStats | null = null;
let lastAttemptFailedAt = 0;

export async function GET() {
  const now = Date.now();

  if (cachedLiveStats && now - cachedLiveStats.fetchedAt < CACHE_TTL_MS) {
    return NextResponse.json({
      ...cachedLiveStats,
      source: 'cache',
    } satisfies GitHubStats);
  }

  if (lastAttemptFailedAt > 0 && now - lastAttemptFailedAt < RATE_LIMIT_COOLDOWN_MS) {
    return NextResponse.json(cachedLiveStats ?? GITHUB_FALLBACK_STATS);
  }

  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'silvio-ai-portfolio',
  };

  try {
    const [userRes, reposRes, commitsRes] = await Promise.all([
      fetch('https://api.github.com/users/viochris', { headers, next: { revalidate: 1800 } }),
      fetch('https://api.github.com/users/viochris/repos?per_page=100', { headers, next: { revalidate: 1800 } }),
      fetch('https://api.github.com/search/commits?q=author:viochris', {
        headers: {
          Accept: 'application/vnd.github.cloak-preview+json',
          'User-Agent': 'silvio-ai-portfolio',
        },
        next: { revalidate: 1800 },
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      lastAttemptFailedAt = now;
      return NextResponse.json(cachedLiveStats ?? GITHUB_FALLBACK_STATS);
    }

    const userData = (await userRes.json()) as { public_repos?: number; followers?: number };
    const reposData = (await reposRes.json()) as { stargazers_count?: number; language?: string }[];
    const commitsData = commitsRes.ok
      ? ((await commitsRes.json()) as { total_count?: number })
      : {};

    const totalStars = Array.isArray(reposData)
      ? reposData.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0)
      : GITHUB_FALLBACK_STATS.stars;

    const langCount: Record<string, number> = {};
    if (Array.isArray(reposData)) {
      reposData.forEach((repo) => {
        if (repo.language) {
          langCount[repo.language] = (langCount[repo.language] || 0) + 1;
        }
      });
    }
    const topLanguages =
      Object.entries(langCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Python';

    const nextStats: GitHubStats = {
      repos: userData.public_repos || GITHUB_FALLBACK_STATS.repos,
      stars: totalStars,
      followers: userData.followers ?? cachedLiveStats?.followers ?? 0,
      topLanguages,
      totalCommits: commitsData.total_count ?? cachedLiveStats?.totalCommits ?? 0,
      fetchedAt: now,
      source: 'live',
    };

    cachedLiveStats = nextStats;
    lastAttemptFailedAt = 0;

    return NextResponse.json(nextStats);
  } catch {
    lastAttemptFailedAt = now;
    return NextResponse.json(cachedLiveStats ?? GITHUB_FALLBACK_STATS);
  }
}
