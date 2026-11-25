"use client"

import React, { useState, useMemo, useEffect } from 'react';
import {
  Github,
  ExternalLink,
  Code2,
  Search,
  ChevronDown,
  ArrowLeft,
  Star,
  GitBranch,
  Scale,
  Check,
  X,
  Rocket,
  ShieldCheck,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from 'next/link';
import { useNavigation } from '@/context/NavigationContext';
import { repos, categories, impacts, type Category, type Impact } from '@/lib/repos-data';
import { GITHUB_FALLBACK_STATS, fetchCachedGitHubStats, readCachedGitHubStats } from '@/lib/github-stats';

function getRepoTags(tech: string): string[] {
  return tech
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}

export default function RepositoryPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [activeImpact, setActiveImpact] = useState<Impact>("All");
  const [liveDemoOnly, setLiveDemoOnly] = useState(false);
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const [compareNames, setCompareNames] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const { setActiveTab } = useNavigation();
  const [ghStats, setGhStats] = useState({
    repos: GITHUB_FALLBACK_STATS.repos,
    stars: GITHUB_FALLBACK_STATS.stars,
  });

  useEffect(() => {
    let active = true;
    const cached = readCachedGitHubStats();
    if (cached) {
      setGhStats({ repos: cached.repos, stars: cached.stars });
    }
    fetchCachedGitHubStats().then((stats) => {
      if (active) {
        setGhStats({ repos: stats.repos, stars: stats.stars });
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: repos.length };
    categories.forEach((cat) => {
      if (cat !== "All") {
        counts[cat] = repos.filter((r) => r.type === cat).length;
      }
    });
    return counts;
  }, []);

  const liveDemoCount = useMemo(() => repos.filter((r) => Boolean(r.demo)).length, []);

  const filteredRepos = useMemo(() => {
    return repos.filter((repo) => {
      const q = search.toLowerCase();
      const matchesSearch =
        repo.name.toLowerCase().includes(q) ||
        repo.desc.toLowerCase().includes(q) ||
        repo.tech.toLowerCase().includes(q);
      const matchesCategory = activeCategory === "All" || repo.type === activeCategory;
      const matchesImpact = activeImpact === "All" || repo.impact === activeImpact;
      const matchesLiveDemo = !liveDemoOnly || Boolean(repo.demo);
      const matchesTech =
        !activeTech ||
        getRepoTags(repo.tech).some((t) => t.toLowerCase() === activeTech.toLowerCase());
      return matchesSearch && matchesCategory && matchesImpact && matchesLiveDemo && matchesTech;
    });
  }, [search, activeCategory, activeImpact, liveDemoOnly, activeTech]);

  const resetAllFilters = () => {
    setSearch("");
    setActiveCategory("All");
    setActiveImpact("All");
    setLiveDemoOnly(false);
    setActiveTech(null);
  };

  const compareRepos = useMemo(
    () => compareNames.map((n) => repos.find((r) => r.name === n)).filter((r): r is (typeof repos)[number] => Boolean(r)),
    [compareNames]
  );

  const toggleCompare = (repoName: string) => {
    setCompareNames((prev) => {
      if (prev.includes(repoName)) {
        return prev.filter((name) => name !== repoName);
      }
      if (prev.length >= 3) return prev;
      return [...prev, repoName];
    });
  };

  return (
    <div className="pt-28 lg:pt-36 pb-24 px-4 sm:px-6 lg:px-12 min-h-screen">
      <section id="repository" className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link
            href="/projects"
            onClick={() => setActiveTab('Projects')}
            className="inline-flex items-center gap-2 text-primary font-headline font-bold uppercase tracking-wider text-xs hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to Projects
          </Link>
        </div>

        <div className="space-y-6 mb-12 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-4">
              <Badge variant="outline" className="text-primary tracking-[0.22em] uppercase px-3.5 border-primary/30 text-[11px]">
                GitHub Archive
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-black uppercase tracking-tight text-white">
                Explore <span className="text-primary">Repository</span>
              </h1>
              <p className="text-zinc-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0">
                Complete catalog of AI projects spanning predictive modeling, NLP APIs, and autonomous workflows.
              </p>
            </div>

            <div className="flex gap-4 justify-center lg:justify-end">
              <div className="px-5 py-3.5 bg-card rounded-2xl border border-border/80 flex flex-col items-center min-w-[110px]">
                <div className="flex items-center gap-2 text-primary mb-0.5">
                  <GitBranch size={16} aria-hidden="true" />
                  <span className="text-lg font-headline font-black text-white tabular-nums">
                    {ghStats.repos}
                  </span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Public Repos
                </div>
              </div>
              <div className="px-5 py-3.5 bg-card rounded-2xl border border-border/80 flex flex-col items-center min-w-[110px]">
                <div className="flex items-center gap-2 text-primary mb-0.5">
                  <Star size={16} aria-hidden="true" />
                  <span className="text-lg font-headline font-black text-white tabular-nums">
                    {ghStats.stars}
                  </span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  GitHub Stars
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col gap-3.5 mb-8 bg-card p-4 rounded-2xl border border-border/80">
          <div className="flex flex-col md:flex-row gap-3 items-stretch">
            <div className="relative flex-1 min-w-0">
              <label htmlFor="repo-search" className="sr-only">
                Search repositories
              </label>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" aria-hidden="true" />
              <Input
                id="repo-search"
                placeholder="Search projects or tech stack..."
                className="pl-11 h-12 w-full bg-background border-border rounded-xl focus-visible:ring-primary text-white placeholder:text-zinc-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 min-h-[48px] px-5 rounded-xl border-border bg-background hover:bg-white/5 text-white font-headline font-bold uppercase tracking-wider text-[11px] flex items-center gap-2.5 w-full md:w-auto md:min-w-[235px] shrink-0"
                >
                  <Star className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                  <span className="truncate">Impact: {activeImpact}</span>
                  <ChevronDown className="w-4 h-4 opacity-60 ml-auto shrink-0" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-60 bg-card border-border rounded-xl p-1 z-50">
                {impacts.map((imp) => (
                  <DropdownMenuItem
                    key={imp}
                    onClick={() => setActiveImpact(imp)}
                    className={`cursor-pointer font-headline font-bold uppercase tracking-wider text-[11px] px-3.5 py-2.5 rounded-lg transition-colors ${
                      activeImpact === imp ? 'bg-primary text-primary-foreground' : 'hover:bg-white/5 text-zinc-300'
                    }`}
                  >
                    {imp}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* 1-Click Category Quick-Filter Pills + Live Demo Only */}
          <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-border/60" role="group" aria-label="Category filters">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              const count = categoryCounts[cat] ?? 0;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={isActive}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-headline font-bold uppercase tracking-wider text-[11px] transition-all border ${
                    isActive
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-background/80 text-zinc-300 border-border hover:border-primary/40 hover:text-white"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-md text-[10px] font-code tabular-nums leading-none ${
                      isActive
                        ? "bg-black/25 text-primary-foreground"
                        : "bg-primary/15 text-primary"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setLiveDemoOnly((prev) => !prev)}
              aria-pressed={liveDemoOnly}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-headline font-bold uppercase tracking-wider text-[11px] transition-all border xl:ml-auto ${
                liveDemoOnly
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm"
                  : "bg-background/80 text-zinc-300 border-border hover:border-emerald-500/40 hover:text-white"
              }`}
            >
              <Rocket className={`w-3.5 h-3.5 ${liveDemoOnly ? "text-emerald-300" : "text-primary"}`} aria-hidden="true" />
              <span>Live Demo Only</span>
              <span
                className={`px-1.5 py-0.5 rounded-md text-[10px] font-code tabular-nums leading-none ${
                  liveDemoOnly ? "bg-emerald-500/25 text-emerald-200" : "bg-primary/15 text-primary"
                }`}
              >
                {liveDemoCount}
              </span>
            </button>
          </div>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="text-xs text-zinc-400 font-bold uppercase tracking-widest">
              Showing {filteredRepos.length} {filteredRepos.length === 1 ? 'Project' : 'Projects'}
            </div>
            {activeTech && (
              <button
                type="button"
                onClick={() => setActiveTech(null)}
                aria-label={`Clear tech filter ${activeTech}`}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/15 text-primary border border-primary/40 text-[11px] font-bold hover:bg-primary/25 transition-colors"
              >
                <span>Tech: {activeTech}</span>
                <X className="w-3 h-3" aria-hidden="true" />
              </button>
            )}
          </div>
          <div className="text-xs text-zinc-400 flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
            <span>Click any tech tag to filter, or use <strong className="text-zinc-200">+ Compare</strong></span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch sm:auto-rows-fr">
          {filteredRepos.length > 0 ? (
            filteredRepos.map((repo) => {
              const isCompared = compareNames.includes(repo.name);
              const compareFull = compareNames.length >= 3;

              return (
                <Card
                  key={repo.name}
                  className={`bg-card transition-colors rounded-2xl overflow-hidden group min-w-0 flex flex-col h-full ${
                    isCompared
                      ? 'border-primary/80 ring-1 ring-primary/40'
                      : 'border-border/80 hover:border-primary/40'
                  }`}
                >
                  <CardHeader className="p-6 flex-1 flex flex-col space-y-3">
                    <div className="flex justify-between items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Code2 className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div className="flex items-center gap-1.5 min-w-0">
                        <button
                          type="button"
                          onClick={() => toggleCompare(repo.name)}
                          disabled={!isCompared && compareFull}
                          aria-pressed={isCompared}
                          title={
                            isCompared
                              ? 'Remove from comparison'
                              : compareFull
                              ? 'Maximum 3 projects selected'
                              : 'Select for side-by-side comparison'
                          }
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-headline font-bold uppercase tracking-wider border transition-colors shrink-0 ${
                            isCompared
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-background/70 text-zinc-400 border-border hover:border-primary/45 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed'
                          }`}
                        >
                          {isCompared ? <Check className="w-3 h-3" aria-hidden="true" /> : <Scale className="w-3 h-3" aria-hidden="true" />}
                          <span>{isCompared ? 'Added' : 'Compare'}</span>
                        </button>
                        <Badge variant="secondary" className="bg-secondary text-[10px] uppercase tracking-wider text-zinc-300 shrink-0">
                          {repo.type}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 min-h-[26px]">
                      <Badge className="bg-primary/15 text-primary border-none text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md whitespace-nowrap">
                        {repo.impact}
                      </Badge>
                      {repo.proof && (
                        <a
                          href={repo.proof.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 transition-colors whitespace-nowrap"
                        >
                          <ShieldCheck className="w-3 h-3 shrink-0" aria-hidden="true" />
                          <span>{repo.proof.label}</span>
                        </a>
                      )}
                    </div>

                    <CardTitle className="text-xl font-headline font-bold text-white group-hover:text-primary transition-colors break-words leading-snug pt-1 sm:min-h-[3.75rem]">
                      {repo.name}
                    </CardTitle>

                    <div className="flex flex-wrap gap-1.5 content-start sm:min-h-[3.5rem]" aria-label="Tech stack tags">
                      {getRepoTags(repo.tech).map((tag) => {
                        const isSelectedTag = activeTech?.toLowerCase() === tag.toLowerCase();
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() =>
                              setActiveTech((prev) =>
                                prev?.toLowerCase() === tag.toLowerCase() ? null : tag
                              )
                            }
                            aria-pressed={isSelectedTag}
                            title={
                              isSelectedTag
                                ? `Clear filter "${tag}"`
                                : `Filter repositories by ${tag}`
                            }
                            className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-[11px] font-semibold border transition-colors ${
                              isSelectedTag
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-background/60 border-border text-zinc-300 hover:border-primary/50 hover:text-white'
                            }`}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>

                    <CardDescription className="text-sm text-zinc-400 leading-relaxed pt-1">
                      {repo.desc}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 mt-auto">
                    <div className="flex items-center gap-2.5">
                      <Button
                        variant="outline"
                        className="flex-1 min-w-0 rounded-xl border-border hover:bg-white/5 text-xs font-bold uppercase tracking-wider h-11 px-3.5 transition-colors"
                        asChild
                      >
                        <a href={repo.link} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-1.5 shrink-0" aria-hidden="true" />
                          <span className="truncate">{repo.type === "Analytics" ? "Tableau" : "Source"}</span>
                          <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-60 shrink-0" aria-hidden="true" />
                        </a>
                      </Button>
                      {repo.demo && (
                        <Button
                          className="flex-1 min-w-0 rounded-xl bg-primary/15 hover:bg-primary/25 text-primary border border-primary/30 text-xs font-bold uppercase tracking-wider h-11 px-3.5 transition-colors"
                          asChild
                        >
                          <a href={repo.demo} target="_blank" rel="noopener noreferrer">
                            <span className="truncate">{repo.demoLabel || "Live Demo"}</span>
                            <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-80 shrink-0" aria-hidden="true" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <div className="col-span-full py-24 text-center space-y-4">
              <div className="text-zinc-600 font-headline font-black text-5xl">No Matches</div>
              <p className="text-zinc-400 font-medium">No projects matched your current search or filters.</p>
              <Button
                type="button"
                variant="outline"
                onClick={resetAllFilters}
                className="text-primary border-primary/30 font-bold uppercase tracking-wider text-xs h-11 px-6 rounded-xl"
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Sleek Bottom Floating Compare Bar */}
      {compareRepos.length > 0 && (
        <div
          role="region"
          aria-label="Project comparison tray"
          className="fixed bottom-5 left-4 right-20 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-40 sm:max-w-2xl sm:w-auto bg-card/95 backdrop-blur-xl border border-primary/50 rounded-2xl shadow-2xl shadow-black/70 px-4 py-3 flex flex-wrap items-center justify-center gap-3"
        >
          <div className="flex items-center gap-2 text-xs font-headline font-bold uppercase tracking-wider text-white">
            <Scale className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
            <span className="tabular-nums">{compareRepos.length}/3 Selected</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5">
            {compareRepos.map((item) => (
              <span
                key={item.name}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-background/80 border border-border text-[11px] font-medium text-zinc-200 max-w-[140px]"
              >
                <span className="truncate">{item.name}</span>
                <button
                  type="button"
                  onClick={() => toggleCompare(item.name)}
                  aria-label={`Remove ${item.name} from comparison`}
                  className="text-zinc-400 hover:text-white shrink-0"
                >
                  <X className="w-3 h-3" aria-hidden="true" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              size="sm"
              disabled={compareRepos.length < 2}
              onClick={() => setCompareOpen(true)}
              className="h-9 px-4 rounded-xl font-headline font-bold uppercase tracking-wider text-[11px]"
            >
              {compareRepos.length < 2 ? 'Pick 1 More' : 'Compare Side-by-Side'}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setCompareNames([])}
              className="h-9 px-3 rounded-xl text-[11px] font-bold uppercase tracking-wider text-zinc-400 hover:text-white"
            >
              Clear
            </Button>
          </div>
        </div>
      )}

      {/* Side-by-Side Comparison Modal */}
      <Dialog open={compareOpen} onOpenChange={setCompareOpen}>
        <DialogContent className="max-w-6xl w-[95vw] max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-xl border-border rounded-2xl p-6 md:p-8">
          <DialogHeader className="pr-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
              <Scale className="w-4 h-4" aria-hidden="true" />
              <span>Side-by-Side Comparator</span>
            </div>
            <DialogTitle className="text-2xl sm:text-3xl font-headline font-bold text-white">
              Project Comparison ({compareRepos.length})
            </DialogTitle>
            <DialogDescription className="text-zinc-400 text-sm">
              Architectural, stack, and deployment comparison across selected repositories.
            </DialogDescription>
          </DialogHeader>

          <div
            className={
              compareRepos.length === 3
                ? 'grid grid-cols-1 gap-5 mt-5 lg:grid-cols-3 lg:grid-rows-[auto_auto_auto_auto_1fr_auto] lg:gap-y-4 lg:gap-x-5'
                : 'grid grid-cols-1 gap-5 mt-5 md:grid-cols-2 md:grid-rows-[auto_auto_auto_auto_1fr_auto] md:gap-y-4 md:gap-x-5'
            }
          >
            {compareRepos.map((repo) => (
              <div
                key={repo.name}
                className={
                  compareRepos.length === 3
                    ? 'p-5 rounded-2xl bg-background/80 border border-border/80 flex flex-col gap-4 lg:grid lg:row-span-6 lg:[grid-template-rows:subgrid]'
                    : 'p-5 rounded-2xl bg-background/80 border border-border/80 flex flex-col gap-4 md:grid md:row-span-6 md:[grid-template-rows:subgrid]'
                }
              >
                {/* Row 1: Category & Impact Badges + Remove */}
                <div className="flex items-start justify-between gap-2 min-w-0">
                  <div className="flex flex-wrap gap-1.5 min-w-0">
                    <Badge
                      variant="secondary"
                      className="bg-secondary text-[10px] px-2 py-0.5 uppercase tracking-wider text-zinc-200 whitespace-nowrap"
                    >
                      {repo.type}
                    </Badge>
                    <Badge className="bg-primary/15 text-primary border-none text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider whitespace-nowrap">
                      {repo.impact}
                    </Badge>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const remaining = compareNames.filter((n) => n !== repo.name);
                      setCompareNames(remaining);
                      if (remaining.length < 2) setCompareOpen(false);
                    }}
                    aria-label={`Remove ${repo.name} from comparison`}
                    className="text-zinc-400 hover:text-white p-1 rounded-md hover:bg-white/10 shrink-0 -mt-0.5"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>

                {/* Row 2: Project Title */}
                <h3 className="text-lg font-headline font-bold text-white leading-snug break-words">
                  {repo.name}
                </h3>

                {/* Row 3: Core Tech Stack */}
                <div className="space-y-1.5 min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Core Tech Stack
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {repo.tech.split(',').map((t) => (
                      <span
                        key={t.trim()}
                        className="px-2 py-0.5 rounded-md bg-card border border-border text-[11px] font-semibold text-zinc-200"
                      >
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Row 4: Deployment / Interface */}
                <div className="space-y-1 min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Deployment / Interface
                  </div>
                  <div className="text-xs font-semibold text-primary">
                    {repo.demo
                      ? `${repo.demoLabel || 'Live Demo'} Deployed`
                      : repo.type === 'Analytics'
                      ? 'Tableau Public Workbook'
                      : 'CLI / Python Script / API'}
                  </div>
                </div>

                {/* Row 5: Architecture Summary */}
                <div className="space-y-1 min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Architecture Summary
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {repo.desc}
                  </p>
                </div>

                {/* Row 6: Actions Footer */}
                <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-border/60 mt-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 min-w-0 h-10 rounded-xl text-xs font-bold uppercase tracking-wider border-border"
                    asChild
                  >
                    <a href={repo.link} target="_blank" rel="noopener noreferrer">
                      <Github className="w-3.5 h-3.5 mr-1.5 shrink-0" aria-hidden="true" />
                      <span className="truncate">{repo.type === 'Analytics' ? 'Tableau' : 'Source'}</span>
                    </a>
                  </Button>
                  {repo.demo && (
                    <Button
                      size="sm"
                      className="flex-1 min-w-0 h-10 rounded-xl text-xs font-bold uppercase tracking-wider bg-primary/15 hover:bg-primary/25 text-primary border border-primary/30"
                      asChild
                    >
                      <a href={repo.demo} target="_blank" rel="noopener noreferrer">
                        <span className="truncate">{repo.demoLabel || 'Live Demo'}</span>
                        <ExternalLink className="w-3.5 h-3.5 ml-1 shrink-0" aria-hidden="true" />
                      </a>
                    </Button>
                  )}
                  {repo.proof && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full h-9 rounded-xl text-[11px] font-bold uppercase tracking-wider bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                      asChild
                    >
                      <a href={repo.proof.url} target="_blank" rel="noopener noreferrer">
                        <ShieldCheck className="w-3.5 h-3.5 mr-1.5 shrink-0" aria-hidden="true" />
                        <span className="truncate">{repo.proof.label}</span>
                        <ExternalLink className="w-3 h-3 ml-1 shrink-0" aria-hidden="true" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
