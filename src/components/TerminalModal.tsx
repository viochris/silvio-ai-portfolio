"use client"

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Terminal as TerminalIcon, X, ExternalLink, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useNavigation, type Vibe } from '@/context/NavigationContext';
import { repos, categories } from '@/lib/repos-data';
import { professionalCertifications } from '@/lib/credentials-data';
import { chatWithAIAssistant } from '@/ai/flows/chat-with-ai-assistant';

interface TerminalLine {
  id: number;
  type: 'command' | 'output' | 'error' | 'highlight';
  text?: string;
  links?: { label: string; url: string }[];
}

const VALID_THEMES: Vibe[] = ['purple', 'blue', 'lime', 'red', 'amber', 'rose'];

const QUICK_COMMANDS = [
  'help',
  'whoami',
  'stats',
  'ls genai',
  'grep llamaindex',
  'certs',
  'theme blue',
  'ask Who is Silvio?',
];

export const TerminalModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [isAiRunning, setIsAiRunning] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: 1,
      type: 'highlight',
      text: 'SILVIO.AI Interactive Shell v2.0 — Connected to 65 repositories & AI Assistant',
    },
    {
      id: 2,
      type: 'output',
      text: 'Type "help" or click a quick command below to inspect projects, certs, or query AI.',
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextIdRef = useRef<number>(10);
  const router = useRouter();
  const { setVibe, setActiveTab } = useNavigation();

  const appendLines = (newEntries: Omit<TerminalLine, 'id'>[]) => {
    setLines((prev) => [
      ...prev,
      ...newEntries.map((entry) => {
        nextIdRef.current += 1;
        return { ...entry, id: nextIdRef.current };
      }),
    ]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey && e.key === '.') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    const handleOpenEvent = () => setOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-terminal-modal', handleOpenEvent);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-terminal-modal', handleOpenEvent);
    };
  }, []);

  useEffect(() => {
    if (open) {
      window.setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, isAiRunning]);

  const executeCommand = async (rawCommand: string) => {
    const trimmed = rawCommand.trim();
    if (!trimmed) return;

    appendLines([{ type: 'command', text: trimmed }]);
    setCmdHistory((prev) => [trimmed, ...prev.slice(0, 29)]);
    setHistoryIdx(-1);
    setInput('');

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const rawArgs = parts.slice(1);
    const argStr = rawArgs.join(' ').trim();

    const parseQueryAndLimit = (tokens: string[], defaultLimit = 8) => {
      let limit = defaultLimit;
      const filtered: string[] = [];

      for (let i = 0; i < tokens.length; i++) {
        const tok = tokens[i];
        const lower = tok.toLowerCase();

        if (lower === '--all' || lower === '-a') {
          limit = Infinity;
          continue;
        }
        if ((lower === '--limit' || lower === '-n' || lower === '--top') && tokens[i + 1]) {
          const parsed = parseInt(tokens[i + 1], 10);
          if (!Number.isNaN(parsed) && parsed > 0) {
            limit = parsed;
            i++;
            continue;
          }
        }
        // Trailing integer (e.g. "grep llm 5" or "ls genai 12")
        if (i === tokens.length - 1 && /^\d+$/.test(tok)) {
          const parsed = parseInt(tok, 10);
          if (parsed > 0) {
            limit = parsed;
            continue;
          }
        }
        filtered.push(tok);
      }

      return {
        cleanArg: filtered.join(' ').trim(),
        limit,
      };
    };

    if (cmd === 'clear') {
      setLines([]);
      return;
    }

    if (cmd === 'exit' || cmd === 'quit') {
      setOpen(false);
      return;
    }

    if (cmd === 'help') {
      appendLines([
        {
          type: 'output',
          text: [
            'Available Commands:',
            '  whoami                   Show Silvio bio, UDINUS GPA, and availability',
            '  stats                    Show catalog counts across repos & credentials',
            '  ls [cat] [N | --all]     List repos (e.g. ls genai 5, ls --all)',
            '  grep <kw> [N | --all]    Search 65 repos (e.g. grep llm 5, grep llm --all)',
            '  certs [N | --all]        List Oracle, IBM & Dicoding credentials',
            '  theme <name>             Switch theme: purple | blue | lime | red | amber | rose',
            '  open <route>             Navigate to: home | about | projects | repository | skills | contact',
            '  ask <question>           Query Silvio.AI Assistant directly inside the terminal',
            '  clear / exit             Clear output or close terminal',
          ].join('\n'),
        },
      ]);
      return;
    }

    if (cmd === 'whoami') {
      appendLines([
        {
          type: 'highlight',
          text: 'Silvio Christian, Joe (Vio / viochris) - Data Scientist & AI Engineer',
        },
        {
          type: 'output',
          text: [
            'Education : B.Sc. Informatics Engineering, UDINUS (Currently in 7th Semester)',
            'GPA       : 3.96 / 4.00 (through 6th Semester)',
            'Focus     : Tabular ML, NLP, Vector/Graph/Hybrid RAG, LangGraph & CrewAI Agents, FastAPI MLOps',
            'Location  : Semarang, Central Java, Indonesia (Open to Remote, Hybrid, On-Site)',
            'Contact   : viochristian12@gmail.com | github.com/viochris',
          ].join('\n'),
        },
      ]);
      return;
    }

    if (cmd === 'stats') {
      const counts = categories
        .filter((c) => c !== 'All')
        .map((c) => `${c}: ${repos.filter((r) => r.type === c).length}`)
        .join(' | ');
      appendLines([
        {
          type: 'output',
          text: [
            `Total Repositories : ${repos.length} cataloged projects`,
            `Breakdown          : ${counts}`,
            `Certifications     : ${professionalCertifications.length} professional credentials (Oracle, IBM, Dicoding)`,
            `Live Demos/APIs    : ${repos.filter((r) => Boolean(r.demo)).length} deployed web apps & Swagger APIs`,
          ].join('\n'),
        },
      ]);
      return;
    }

    if (cmd === 'ls') {
      const { cleanArg, limit } = parseQueryAndLimit(rawArgs, 8);
      const catArg = cleanArg.toLowerCase();
      const matched = catArg
        ? repos.filter((r) => r.type.toLowerCase() === catArg)
        : repos;

      if (matched.length === 0) {
        appendLines([
          {
            type: 'error',
            text: `No category "${cleanArg}". Try: genai, backend, automation, "data science", analytics, "vibe coding", fun.`,
          },
        ]);
        return;
      }

      const shown = Number.isFinite(limit) ? matched.slice(0, limit) : matched;
      const moreHint =
        shown.length < matched.length
          ? ` (showing ${shown.length} of ${matched.length} — run "ls ${cleanArg ? cleanArg + ' ' : ''}--all" for all)`
          : ` (all ${matched.length} shown)`;

      appendLines([
        {
          type: 'highlight',
          text: catArg
            ? `[${matched[0].type}]${moreHint}:`
            : `Catalog Entries${moreHint}:`,
        },
        ...shown.map((r) => ({
          type: 'output' as const,
          text: `• ${r.name} [${r.tech}]`,
          links: [
            { label: 'Source', url: r.link },
            ...(r.demo ? [{ label: r.demoLabel || 'Demo', url: r.demo }] : []),
          ],
        })),
      ]);
      return;
    }

    if (cmd === 'grep') {
      const { cleanArg, limit } = parseQueryAndLimit(rawArgs, 8);
      if (!cleanArg) {
        appendLines([
          {
            type: 'error',
            text: 'Usage: grep <keyword> [N | --all] (e.g. "grep llm 5" or "grep llm --all")',
          },
        ]);
        return;
      }
      const q = cleanArg.toLowerCase();
      const hits = repos.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.tech.toLowerCase().includes(q) ||
          r.desc.toLowerCase().includes(q) ||
          r.type.toLowerCase().includes(q)
      );

      if (hits.length === 0) {
        appendLines([{ type: 'error', text: `No repositories matched "${cleanArg}".` }]);
        return;
      }

      const shown = Number.isFinite(limit) ? hits.slice(0, limit) : hits;
      const countSummary =
        shown.length < hits.length
          ? ` (top ${shown.length} of ${hits.length} shown — run "grep ${cleanArg} --all" for all)`
          : ` (all ${hits.length} shown)`;

      appendLines([
        {
          type: 'highlight',
          text: `Found ${hits.length} match(es) for "${cleanArg}"${countSummary}:`,
        },
        ...shown.map((r) => ({
          type: 'output' as const,
          text: `• ${r.name} (${r.type}) - ${r.tech}`,
          links: [
            { label: 'GitHub', url: r.link },
            ...(r.demo ? [{ label: r.demoLabel || 'Demo', url: r.demo }] : []),
          ],
        })),
      ]);
      return;
    }

    if (cmd === 'certs') {
      const { limit } = parseQueryAndLimit(rawArgs, 6);
      const topCerts = Number.isFinite(limit)
        ? professionalCertifications.slice(0, limit)
        : professionalCertifications;
      const moreHint =
        topCerts.length < professionalCertifications.length
          ? ` (showing ${topCerts.length} of ${professionalCertifications.length} — run "certs --all" for all)`
          : ` (all ${professionalCertifications.length} shown)`;
      appendLines([
        {
          type: 'highlight',
          text: `Flagship Verified Credentials${moreHint}:`,
        },
        ...topCerts.map((c) => ({
          type: 'output' as const,
          text: `• [${c.issuer}] ${c.title}`,
          links: c.verifyLink ? [{ label: 'Verify', url: c.verifyLink }] : undefined,
        })),
      ]);
      return;
    }

    if (cmd === 'theme') {
      const chosen = argStr.toLowerCase() as Vibe;
      if (!VALID_THEMES.includes(chosen)) {
        appendLines([
          {
            type: 'error',
            text: `Invalid theme "${argStr}". Choose one of: ${VALID_THEMES.join(', ')}`,
          },
        ]);
        return;
      }
      setVibe(chosen);
      appendLines([{ type: 'highlight', text: `Theme switched to "${chosen}".` }]);
      return;
    }

    if (cmd === 'open') {
      const routeMap: Record<string, { href: string; tab: string }> = {
        home: { href: '/', tab: 'Home' },
        about: { href: '/about', tab: 'About' },
        projects: { href: '/projects', tab: 'Projects' },
        repository: { href: '/repository', tab: 'Projects' },
        skills: { href: '/skills', tab: 'Skills' },
        contact: { href: '/contact', tab: 'Contact' },
      };
      const target = routeMap[argStr.toLowerCase()];
      if (!target) {
        appendLines([
          {
            type: 'error',
            text: `Unknown route "${argStr}". Try: home, about, projects, repository, skills, contact.`,
          },
        ]);
        return;
      }
      setActiveTab(target.tab);
      setOpen(false);
      router.push(target.href);
      return;
    }

    if (cmd === 'ask') {
      if (!argStr) {
        appendLines([{ type: 'error', text: 'Usage: ask <your question about Silvio>' }]);
        return;
      }
      setIsAiRunning(true);
      try {
        const res = await chatWithAIAssistant({
          text: argStr,
          language: 'English',
          history: [],
        });
        appendLines([
          {
            type: 'highlight',
            text: `Silvio.AI> ${res?.answer || 'No response received.'}`,
          },
        ]);
      } catch {
        appendLines([
          {
            type: 'error',
            text: 'Silvio.AI backend is waking up right now. Please try again in a few seconds or use /contact#ai-assistant.',
          },
        ]);
      } finally {
        setIsAiRunning(false);
      }
      return;
    }

    appendLines([
      {
        type: 'error',
        text: `Command not found: "${cmd}". Type "help" to see supported commands.`,
      },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isAiRunning) return;
    await executeCommand(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(nextIdx);
      setInput(cmdHistory[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx <= 0) {
        setHistoryIdx(-1);
        setInput('');
      } else {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInput(cmdHistory[nextIdx]);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 gap-0 max-w-3xl w-[95vw] bg-[#090B12]/95 backdrop-blur-xl border-primary/35 rounded-2xl overflow-hidden shadow-2xl [&>button.absolute]:hidden">
        <DialogTitle className="sr-only">Silvio.AI Interactive CLI Terminal</DialogTitle>
        <DialogDescription className="sr-only">
          Run interactive commands to inspect repositories, certifications, switch themes, or ask Silvio.AI questions.
        </DialogDescription>

        {/* Terminal Top Window Chrome */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/40">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex items-center gap-1.5 mr-1" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <TerminalIcon className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
            <span className="font-code text-xs font-bold text-zinc-200 truncate">
              silvio@portfolio:~$ — bash (65 repos indexed)
            </span>
          </div>

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
              aria-label="Close terminal"
              className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Quick Command Chips */}
        <div className="px-4 py-2 border-b border-border/70 bg-background/50 flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-code uppercase tracking-wider text-zinc-500 mr-1">
            Quick run:
          </span>
          {QUICK_COMMANDS.map((cmd) => (
            <button
              key={cmd}
              type="button"
              disabled={isAiRunning}
              onClick={() => executeCommand(cmd)}
              className="px-2 py-1 rounded-md bg-card hover:bg-primary/15 border border-border hover:border-primary/40 font-code text-[11px] text-zinc-300 hover:text-primary transition-colors"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Output Log Area */}
        <div
          ref={scrollRef}
          onClick={() => inputRef.current?.focus()}
          className="h-[360px] sm:h-[400px] overflow-y-auto p-4 sm:p-5 font-code text-xs sm:text-[13px] leading-relaxed space-y-2.5 cursor-text"
        >
          {lines.map((line) => (
            <div key={line.id} className="space-y-1">
              {line.type === 'command' && (
                <div className="flex items-center gap-2 text-white">
                  <span className="text-primary font-bold shrink-0">silvio@ai:~$</span>
                  <span>{line.text}</span>
                </div>
              )}
              {line.type === 'highlight' && (
                <div className="text-primary font-semibold whitespace-pre-wrap break-words">
                  {line.text}
                </div>
              )}
              {line.type === 'error' && (
                <div className="text-rose-400 whitespace-pre-wrap break-words">
                  {line.text}
                </div>
              )}
              {line.type === 'output' && (
                <div className="text-zinc-300 whitespace-pre-wrap break-words">
                  {line.text}
                  {line.links && line.links.length > 0 && (
                    <span className="inline-flex flex-wrap items-center gap-2 ml-2">
                      {line.links.map((lnk) => (
                        <a
                          key={lnk.url}
                          href={lnk.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-primary/15 border border-primary/30 text-primary hover:underline text-[11px]"
                        >
                          {lnk.label}
                          <ExternalLink className="w-2.5 h-2.5" aria-hidden="true" />
                        </a>
                      ))}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}

          {isAiRunning && (
            <div className="flex items-center gap-2 text-primary font-code text-xs">
              <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
              <span>Querying Silvio.AI RAG backend...</span>
            </div>
          )}
        </div>

        {/* Prompt Input Bar */}
        <form
          onSubmit={handleSubmit}
          className="px-4 py-3 border-t border-border bg-background/80 flex items-center gap-2.5 font-code text-xs sm:text-sm"
        >
          <span className="text-primary font-bold shrink-0">silvio@ai:~$</span>
          <label htmlFor="cli-terminal-input" className="sr-only">
            Terminal command input
          </label>
          <input
            id="cli-terminal-input"
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isAiRunning}
            placeholder='Enter command (e.g. "help", "grep rag", "ask What is your GPA?")'
            className="flex-1 bg-transparent text-white placeholder:text-zinc-500 focus:outline-none min-w-0"
          />
          <button
            type="submit"
            disabled={!input.trim() || isAiRunning}
            className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-bold text-[11px] uppercase tracking-wider disabled:opacity-40 shrink-0"
          >
            Run
          </button>
        </form>

        {/* Footer Hint */}
        <div className="px-4 py-2 border-t border-border/70 bg-background/60 flex items-center justify-between text-[11px] text-zinc-400">
          <div className="flex items-center gap-3">
            <span>
              <strong className="text-zinc-200 font-code">↑↓</strong> History
            </span>
            <span>
              <strong className="text-zinc-200 font-code">↵</strong> Run
            </span>
            <span>
              <strong className="text-zinc-200 font-code">ESC</strong> Close
            </span>
          </div>
          <span className="font-code text-[10px] uppercase tracking-wider text-primary">
            Ctrl + .
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
