"use client"

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Home,
  User,
  Briefcase,
  FolderGit2,
  Wrench,
  Award,
  Mail,
  Bot,
  Download,
  BookOpen,
  ExternalLink,
  Palette,
  CornerDownLeft,
  X,
  Terminal,
} from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useNavigation, type Vibe } from '@/context/NavigationContext';
import { cn } from '@/lib/utils';

interface CommandItem {
  id: string;
  group: 'Pages' | 'Quick Actions' | 'Featured Projects' | 'Articles & Theme';
  title: string;
  subtitle: string;
  keywords: string;
  icon: React.ReactNode;
  external?: boolean;
  onSelect: () => void;
}

export const CommandPalette: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { setActiveTab, setCredentialTab, setIsReturning, setVibe } = useNavigation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    const handleCustomOpen = () => setOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      window.setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [open]);

  const navigateTo = (href: string, tabName?: string) => {
    setOpen(false);
    setIsReturning(false);
    if (tabName) setActiveTab(tabName);
    router.push(href);
  };

  const openExternal = (url: string) => {
    setOpen(false);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const switchTheme = (vibe: Vibe) => {
    setVibe(vibe);
    setOpen(false);
  };

  const items: CommandItem[] = useMemo(
    () => [
      // Pages
      {
        id: 'nav-home',
        group: 'Pages',
        title: 'Home',
        subtitle: 'Overview, specializations, featured projects, and workflow',
        keywords: 'home main landing hero',
        icon: <Home className="w-4 h-4 text-primary" />,
        onSelect: () => navigateTo('/', 'Home'),
      },
      {
        id: 'nav-about',
        group: 'Pages',
        title: 'About Me & Latest Articles',
        subtitle: 'Education at UDINUS, milestones, GitHub stats, and Medium articles',
        keywords: 'about education udinus gpa github commits medium blog articles',
        icon: <User className="w-4 h-4 text-primary" />,
        onSelect: () => navigateTo('/about', 'About'),
      },
      {
        id: 'nav-projects',
        group: 'Pages',
        title: 'Featured Projects (Case Studies)',
        subtitle: 'In-depth architecture, problem, and solution breakdowns',
        keywords: 'projects case studies portfolio featured',
        icon: <Briefcase className="w-4 h-4 text-primary" />,
        onSelect: () => navigateTo('/projects', 'Projects'),
      },
      {
        id: 'nav-repository',
        group: 'Pages',
        title: 'Full Repository Catalog (65 Projects)',
        subtitle: 'Search all 65 GenAI, RAG, MLOps, Automation, ML, and Vibe Coding repos',
        keywords: 'repository github archive 65 projects all code',
        icon: <FolderGit2 className="w-4 h-4 text-primary" />,
        onSelect: () => navigateTo('/repository', 'Projects'),
      },
      {
        id: 'nav-skills',
        group: 'Pages',
        title: 'Skills & Tech Stack',
        subtitle: 'Competency radar map, proficiency bars, and tools',
        keywords: 'skills tech stack tools python langchain llamaindex fastapi',
        icon: <Wrench className="w-4 h-4 text-primary" />,
        onSelect: () => navigateTo('/skills', 'Skills'),
      },
      {
        id: 'nav-credentials',
        group: 'Pages',
        title: 'Verified Certifications & Badges (33)',
        subtitle: 'Filter credentials by Oracle, IBM, Coursera, Dicoding, and verification status',
        keywords: 'certifications badges credentials oracle ibm coursera dicoding',
        icon: <Award className="w-4 h-4 text-primary" />,
        onSelect: () => {
          setOpen(false);
          setCredentialTab('Certifications');
          setActiveTab('Credentials');
          router.push('/skills');
        },
      },
      {
        id: 'nav-contact',
        group: 'Pages',
        title: 'Contact & Direct Inquiry',
        subtitle: 'Email, WhatsApp, LinkedIn, and technical FAQ',
        keywords: 'contact email whatsapp phone hire collaboration',
        icon: <Mail className="w-4 h-4 text-primary" />,
        onSelect: () => navigateTo('/contact', 'Contact'),
      },

      // Quick Actions
      {
        id: 'act-ai',
        group: 'Quick Actions',
        title: 'Ask Silvio.AI Assistant',
        subtitle: 'Chat with the live RAG assistant about projects, skills, or availability',
        keywords: 'ask ai chatbot assistant rag question chat',
        icon: <Bot className="w-4 h-4 text-primary" />,
        onSelect: () => navigateTo('/contact#ai-assistant', 'Contact'),
      },
      {
        id: 'act-terminal',
        group: 'Quick Actions',
        title: 'Open Interactive CLI Terminal (Ctrl + .)',
        subtitle: 'Browse 65 repos, verify certs, switch themes, or ask AI via shell',
        keywords: 'cli terminal shell bash grep ls whoami console',
        icon: <Terminal className="w-4 h-4 text-primary" />,
        onSelect: () => {
          setOpen(false);
          window.setTimeout(() => window.dispatchEvent(new Event('open-terminal-modal')), 120);
        },
      },
      {
        id: 'act-role-fit',
        group: 'Quick Actions',
        title: 'Role Fit & Specialization Matcher',
        subtitle: 'Compare curated repos, core stack & certs by target engineering role',
        keywords: 'role fit matcher recruiter hr specialization ai engineer data scientist backend',
        icon: <Briefcase className="w-4 h-4 text-primary" />,
        onSelect: () => navigateTo('/skills#role-fit-matcher', 'Skills'),
      },
      {
        id: 'act-resume',
        group: 'Quick Actions',
        title: 'Download Resume (PDF)',
        subtitle: 'Download Silvio Christian, Joe Curriculum Vitae',
        keywords: 'resume cv download pdf curriculum vitae',
        icon: <Download className="w-4 h-4 text-primary" />,
        onSelect: () => {
          setOpen(false);
          window.location.assign('/api/resume?download=1');
        },
      },

      // Featured Projects
      {
        id: 'proj-insightsql',
        group: 'Featured Projects',
        title: 'InsightSQL (LangGraph Engine) - Live Demo',
        subtitle: 'Graph-based Text-to-SQL agent with cyclic reasoning & error self-correction',
        keywords: 'insightsql langgraph sql agent gemini streamlit',
        icon: <FolderGit2 className="w-4 h-4 text-primary" />,
        external: true,
        onSelect: () => openExternal('https://insightsql-langgraph-engine-web.streamlit.app/'),
      },
      {
        id: 'proj-hybrid-rag',
        group: 'Featured Projects',
        title: 'YouTube Hybrid RAG (LlamaIndex + ChromaDB + Neo4j)',
        subtitle: 'Fuses dense vector search and knowledge graph traversal via Reciprocal Rank Fusion',
        keywords: 'youtube hybrid rag llamaindex chromadb neo4j graph vector phoenix',
        icon: <FolderGit2 className="w-4 h-4 text-primary" />,
        external: true,
        onSelect: () => openExternal('https://github.com/viochris/youtube-hybrid-rag-llamaindex'),
      },
      {
        id: 'proj-autoreadme',
        group: 'Featured Projects',
        title: 'Auto README Generator (CrewAI) - Live Demo',
        subtitle: 'Multi-agent system that parses .py and .ipynb files into structured GitHub READMEs',
        keywords: 'auto readme generator crewai gemini streamlit multi-agent',
        icon: <FolderGit2 className="w-4 h-4 text-primary" />,
        external: true,
        onSelect: () => openExternal('https://crewai-auto-readme-generator.streamlit.app/'),
      },
      {
        id: 'proj-botanica',
        group: 'Featured Projects',
        title: 'Botanica AI (Plant Care Companion) - Live Demo',
        subtitle: 'Full-stack React + Express + Gemini Vision plant scanner, diagnostics & AI botanist',
        keywords: 'botanica ai plant scanner react typescript express gemini vision',
        icon: <FolderGit2 className="w-4 h-4 text-primary" />,
        external: true,
        onSelect: () => openExternal('https://botanica-ai-mu.vercel.app/'),
      },
      {
        id: 'proj-linknest',
        group: 'Featured Projects',
        title: 'LinkNest (Full-Stack Link-in-Bio) - Live Demo',
        subtitle: 'Supabase-backed link-in-bio platform with RLS, analytics, QR generator, and Gemini AI',
        keywords: 'linknest link in bio supabase react gemini analytics',
        icon: <FolderGit2 className="w-4 h-4 text-primary" />,
        external: true,
        onSelect: () => openExternal('https://linknest-link-in-bio.vercel.app/'),
      },
      {
        id: 'proj-spendsense',
        group: 'Featured Projects',
        title: 'SpendSense (Financial AI) - Live Demo',
        subtitle: 'Conversational finance tracker with Gemini Vision OCR receipt scanning',
        keywords: 'spendsense financial ai ocr receipt streamlit',
        icon: <FolderGit2 className="w-4 h-4 text-primary" />,
        external: true,
        onSelect: () => openExternal('https://app-spend-sense.streamlit.app/'),
      },
      {
        id: 'proj-resumescanner',
        group: 'Featured Projects',
        title: 'Resume Scanner API (FastAPI + SBERT) - API Docs',
        subtitle: 'Dual-engine ATS semantic and keyword matching microservice on Hugging Face',
        keywords: 'resume scanner api fastapi sbert tfidf ats swagger',
        icon: <FolderGit2 className="w-4 h-4 text-primary" />,
        external: true,
        onSelect: () => openExternal('https://silvio0-resume-scanner.hf.space/docs'),
      },

      // Articles & Theme
      {
        id: 'art-1',
        group: 'Articles & Theme',
        title: 'Medium: Before You Use AI, Understand This First',
        subtitle: 'Part 1 of Prompt Engineering Series: LLMs, tokens, context window, temperature & cutoffs',
        keywords: 'medium article blog before you use ai llm tokens context window hallucination',
        icon: <BookOpen className="w-4 h-4 text-primary" />,
        external: true,
        onSelect: () =>
          openExternal(
            'https://medium.com/@silviochristian/before-you-use-ai-understand-this-first-875525807755'
          ),
      },
      {
        id: 'art-2',
        group: 'Articles & Theme',
        title: 'Medium: Why Label Encoding is Ruining Your ML Models',
        subtitle: 'Nominal vs. ordinal data, One-Hot Encoding in Pandas & Scikit-Learn, and production traps',
        keywords: 'medium article blog label encoding one hot encoding feature engineering scikit-learn',
        icon: <BookOpen className="w-4 h-4 text-primary" />,
        external: true,
        onSelect: () =>
          openExternal(
            'https://medium.com/@silviochristian/why-label-encoding-is-ruining-your-ml-models-and-how-to-fix-it-d83eab34e7f3'
          ),
      },
      {
        id: 'theme-purple',
        group: 'Articles & Theme',
        title: 'Theme: Synth Purple (Default)',
        subtitle: 'Switch portfolio accent to Synth Purple',
        keywords: 'theme vibe color synth purple',
        icon: <Palette className="w-4 h-4 text-purple-400" />,
        onSelect: () => switchTheme('purple'),
      },
      {
        id: 'theme-blue',
        group: 'Articles & Theme',
        title: 'Theme: Neural Blue',
        subtitle: 'Switch portfolio accent to Neural Blue',
        keywords: 'theme vibe color neural blue',
        icon: <Palette className="w-4 h-4 text-blue-400" />,
        onSelect: () => switchTheme('blue'),
      },
      {
        id: 'theme-lime',
        group: 'Articles & Theme',
        title: 'Theme: Cyber Lime',
        subtitle: 'Switch portfolio accent to Cyber Lime',
        keywords: 'theme vibe color cyber lime green',
        icon: <Palette className="w-4 h-4 text-lime-400" />,
        onSelect: () => switchTheme('lime'),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q)
    );
  }, [items, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleListKeyDown = (e: React.KeyboardEvent) => {
    if (filteredItems.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      filteredItems[selectedIndex]?.onSelect();
    }
  };

  const groups: CommandItem['group'][] = [
    'Pages',
    'Quick Actions',
    'Featured Projects',
    'Articles & Theme',
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 gap-0 max-w-xl w-[94vw] bg-card/95 backdrop-blur-xl border-border rounded-2xl overflow-hidden shadow-2xl [&>button.absolute]:hidden">
        <DialogTitle className="sr-only">Quick Command &amp; Search Palette</DialogTitle>
        <DialogDescription className="sr-only">
          Search pages, projects, credentials, articles, and quick actions across Silvio.AI.
        </DialogDescription>

        {/* Search Input Header */}
        <div className="flex items-center gap-2.5 px-4 py-3.5 border-b border-border bg-background/60">
          <Search className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleListKeyDown}
            placeholder="Search pages, 65+ projects, credentials, or actions..."
            className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none min-w-0"
          />
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setOpen(false)}
              title="Close (Esc)"
              className="hidden sm:inline-flex items-center px-2 py-1 rounded-md bg-secondary hover:bg-white/10 text-[10px] font-code font-bold text-zinc-400 hover:text-white border border-border transition-colors"
            >
              ESC
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close search palette"
              className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Results List */}
        <div className="max-h-[62vh] overflow-y-auto p-2.5 space-y-4">
          {filteredItems.length > 0 ? (
            groups.map((grp) => {
              const groupItems = filteredItems.filter((i) => i.group === grp);
              if (groupItems.length === 0) return null;

              return (
                <div key={grp} className="space-y-1">
                  <div className="px-2.5 py-1 text-[10px] font-headline font-bold uppercase tracking-[0.2em] text-zinc-400">
                    {grp}
                  </div>
                  {groupItems.map((item) => {
                    const flatIdx = filteredItems.findIndex((f) => f.id === item.id);
                    const isSelected = flatIdx === selectedIndex;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onMouseEnter={() => setSelectedIndex(flatIdx)}
                        onClick={item.onSelect}
                        className={cn(
                          'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors',
                          isSelected
                            ? 'bg-primary/15 text-white border border-primary/35'
                            : 'hover:bg-white/5 text-zinc-300 border border-transparent'
                        )}
                      >
                        <div className="w-8 h-8 rounded-lg bg-background/80 border border-border/80 flex items-center justify-center shrink-0">
                          {item.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs sm:text-sm font-headline font-bold text-white truncate">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-zinc-400 truncate">{item.subtitle}</div>
                        </div>
                        {item.external ? (
                          <ExternalLink className="w-3.5 h-3.5 text-zinc-400 shrink-0" aria-hidden="true" />
                        ) : (
                          <CornerDownLeft
                            className={cn(
                              'w-3.5 h-3.5 shrink-0 transition-opacity',
                              isSelected ? 'text-primary opacity-100' : 'opacity-0'
                            )}
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-sm text-zinc-400">
              No matching pages or projects for &ldquo;{query}&rdquo;.
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2.5 border-t border-border bg-background/60 flex items-center justify-between text-[11px] text-zinc-400">
          <div className="flex items-center gap-3">
            <span>
              <strong className="text-zinc-200 font-code">↑↓</strong> Navigate
            </span>
            <span>
              <strong className="text-zinc-200 font-code">↵</strong> Open
            </span>
          </div>
          <span className="font-code text-[10px] uppercase tracking-wider text-primary">
            Ctrl + K
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
