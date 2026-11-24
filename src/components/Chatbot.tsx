"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Globe, Sparkles, ChevronUp, ChevronDown, X, Maximize2 } from 'lucide-react';
import { chatWithAIAssistant } from '@/ai/flows/chat-with-ai-assistant';
import { cn } from '@/lib/utils';

interface ChatbotProps {
  compact?: boolean;
  onClose?: () => void;
  onOpenFullPage?: () => void;
  isOpen?: boolean;
  className?: string;
}

type MessageUI = {
  role: 'user' | 'assistant';
  content: string;
};

const SUGGESTED_PROMPTS: Record<'English' | 'Indonesian', { label: string; prompt: string }[]> = {
  English: [
    {
      label: "Flagship RAG & Agent projects?",
      prompt: "What are Silvio's flagship RAG, LlamaIndex, and LangGraph AI Agent projects?",
    },
    {
      label: "Tech stack & certifications?",
      prompt: "Summarize Silvio's core tech stack and his Oracle, IBM, and Coursera certifications.",
    },
    {
      label: "Tabular ML & FastAPI work?",
      prompt: "How does Silvio handle tabular machine learning, data leakage prevention, and FastAPI deployment?",
    },
    {
      label: "Availability for roles?",
      prompt: "Is Silvio available for internships, freelance projects, or full-time Data Science & AI Engineer roles?",
    },
  ],
  Indonesian: [
    {
      label: "Project RAG & AI Agent unggulan?",
      prompt: "Apa saja project RAG, LlamaIndex, dan AI Agent unggulan milik Silvio?",
    },
    {
      label: "Tech stack & sertifikasi?",
      prompt: "Ringkas tech stack utama serta sertifikasi Oracle, IBM, dan Coursera milik Silvio.",
    },
    {
      label: "Pengalaman ML & FastAPI?",
      prompt: "Bagaimana pengalaman Silvio dalam tabular machine learning dan deployment FastAPI?",
    },
    {
      label: "Ketersediaan kerja / magang?",
      prompt: "Apakah Silvio tersedia untuk magang, proyek freelance, atau posisi full-time?",
    },
  ],
};

function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderInlineMarkdown(escapedLine: string): string {
  // Extract inline code spans first so asterisks inside code aren't formatted
  const codeTokens: string[] = [];
  let text = escapedLine.replace(/`([^`]+)`/g, (_m, code) => {
    const idx = codeTokens.length;
    codeTokens.push(
      `<code class="px-1.5 py-0.5 rounded bg-background/90 border border-border/80 text-primary font-code text-[12px]">${code}</code>`
    );
    return `\u0000CODE${idx}\u0000`;
  });

  // Safe external Markdown links [label](https://...)
  text = text.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary underline underline-offset-2 hover:text-primary/80 break-all">$1</a>'
  );

  // Bold (**text** or __text__)
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
  text = text.replace(/__(.+?)__/g, '<strong class="text-white font-semibold">$1</strong>');

  // Italic (*text* only when bounded cleanly without whitespace next to markers)
  text = text.replace(/(^|[\s(])\*([^*\n]+?)\*(?=$|[\s.,;:!?)]|<)/g, '$1<em>$2</em>');

  // Restore code tokens
  text = text.replace(/\u0000CODE(\d+)\u0000/g, (_m, idx) => codeTokens[Number(idx)] ?? '');
  return text;
}

const renderMarkdown = (text?: string) => {
  if (!text) return '';

  const lines = text.replace(/\r\n/g, '\n').split('\n');
  const htmlBlocks: string[] = [];
  let inCodeBlock = false;
  let codeLines: string[] = [];

  for (const rawLine of lines) {
    const trimmed = rawLine.trim();

    // Fenced code block toggle ```
    if (trimmed.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeLines = [];
      } else {
        inCodeBlock = false;
        htmlBlocks.push(
          `<pre class="my-2 p-3 rounded-xl bg-background/90 border border-border/80 font-code text-xs text-zinc-200 overflow-x-auto leading-relaxed"><code>${escapeHtml(
            codeLines.join('\n')
          )}</code></pre>`
        );
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(rawLine);
      continue;
    }

    if (!trimmed) {
      htmlBlocks.push('<div class="h-1.5"></div>');
      continue;
    }

    if (/^[-*_]{3,}$/.test(trimmed)) {
      htmlBlocks.push('<hr class="my-2.5 border-border/60" />');
      continue;
    }

    const headingMatch = trimmed.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const content = renderInlineMarkdown(escapeHtml(headingMatch[2]));
      const cls =
        level === 1
          ? 'text-base font-headline font-bold text-white mt-2 mb-1'
          : level === 2
          ? 'text-sm font-headline font-bold text-primary mt-2 mb-1'
          : 'text-xs font-headline font-bold uppercase tracking-wider text-primary mt-2 mb-0.5';
      htmlBlocks.push(`<div class="${cls}">${content}</div>`);
      continue;
    }

    const bulletMatch = rawLine.match(/^\s*[-*•]\s+(.+)$/);
    if (bulletMatch) {
      const indent = rawLine.match(/^\s*/)?.[0].length ?? 0;
      const padClass = indent >= 2 ? 'pl-4' : '';
      const content = renderInlineMarkdown(escapeHtml(bulletMatch[1]));
      htmlBlocks.push(
        `<div class="flex items-start gap-2 my-1 ${padClass}"><span class="text-primary font-bold leading-relaxed shrink-0">&bull;</span><span class="flex-1 min-w-0">${content}</span></div>`
      );
      continue;
    }

    const numMatch = rawLine.match(/^\s*(\d+)\.\s+(.+)$/);
    if (numMatch) {
      const content = renderInlineMarkdown(escapeHtml(numMatch[2]));
      htmlBlocks.push(
        `<div class="flex items-start gap-2 my-1"><span class="text-primary font-code font-bold text-xs mt-0.5 shrink-0">${numMatch[1]}.</span><span class="flex-1 min-w-0">${content}</span></div>`
      );
      continue;
    }

    htmlBlocks.push(`<p class="my-0.5">${renderInlineMarkdown(escapeHtml(rawLine))}</p>`);
  }

  // Handle unclosed fenced block gracefully
  if (inCodeBlock && codeLines.length > 0) {
    htmlBlocks.push(
      `<pre class="my-2 p-3 rounded-xl bg-background/90 border border-border/80 font-code text-xs text-zinc-200 overflow-x-auto"><code>${escapeHtml(
        codeLines.join('\n')
      )}</code></pre>`
    );
  }

  return htmlBlocks.join('');
};

export const Chatbot: React.FC<ChatbotProps> = ({
  compact = false,
  onClose,
  onOpenFullPage,
  isOpen = true,
  className,
}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<MessageUI[]>([
    {
      role: 'assistant',
      content:
        "Hello! I'm Silvio's AI assistant. Ask me about his projects, skills, or experience, or pick a quick question below.",
    },
  ]);
  const [apiHistory, setApiHistory] = useState<[string, string][]>([]);
  const [language, setLanguage] = useState<'English' | 'Indonesian'>('English');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [engineStatus, setEngineStatus] = useState<'checking' | 'active' | 'sleeping'>('checking');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!compact) return undefined;
    if (isOpen) {
      const timer = window.setTimeout(() => inputRef.current?.focus(), 80);
      return () => window.clearTimeout(timer);
    }
    setShowSuggestions(false);
    return undefined;
  }, [compact, isOpen]);

  useEffect(() => {
    let active = true;
    const checkStatus = async () => {
      try {
        await fetch('https://silvio0-silvio-portfolio-api.hf.space/', {
          method: 'GET',
          mode: 'no-cors',
        });
        if (active) setEngineStatus('active');
      } catch {
        if (active) setEngineStatus('sleeping');
      }
    };

    checkStatus();
    const interval = window.setInterval(checkStatus, 30000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const sendPrompt = async (promptText: string) => {
    const userText = promptText.trim();
    if (!userText || isLoading) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userText }]);
    setIsLoading(true);

    try {
      const res = await chatWithAIAssistant({
        text: userText,
        language,
        history: apiHistory,
      });

      const botAnswer = res?.answer || 'I received an empty response. Please try again.';
      setMessages((prev) => [...prev, { role: 'assistant', content: botAnswer }]);
      setApiHistory((prev) => [...prev, [userText, botAnswer]]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'My AI server is currently waking up or unreachable. Please try again shortly.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    await sendPrompt(input);
  };

  const activeSuggestions = SUGGESTED_PROMPTS[language];

  return (
    <div
      id={compact ? 'floating-ai-assistant' : 'ai-assistant'}
      className={cn(
        'scroll-mt-28 flex flex-col w-full border border-border/80 rounded-2xl overflow-hidden bg-card relative',
        compact ? 'h-full' : 'h-[600px] lg:h-full',
        className
      )}
    >
      {/* Header */}
      <div
        className={cn(
          'shrink-0 border-b border-border bg-secondary/30 flex items-center justify-between gap-2.5',
          compact ? 'p-4 sm:p-5' : 'p-6 sm:p-8 pb-5 sm:pb-6'
        )}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={cn(
              'bg-primary/15 rounded-xl flex items-center justify-center shrink-0',
              compact ? 'w-9 h-9' : 'w-10 h-10'
            )}
          >
            <Bot className="w-5 h-5 text-primary" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h2
              className={cn(
                'font-headline font-bold uppercase tracking-wider text-foreground truncate',
                compact ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
              )}
            >
              Silvio.AI Assistant
            </h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span
                aria-hidden="true"
                className={cn(
                  'w-2 h-2 rounded-full',
                  engineStatus === 'active'
                    ? 'bg-green-500'
                    : engineStatus === 'checking'
                    ? 'bg-amber-400'
                    : 'bg-red-500'
                )}
              />
              <span
                className={cn(
                  'text-[10px] font-bold tracking-wider uppercase',
                  engineStatus === 'active'
                    ? 'text-green-400'
                    : engineStatus === 'checking'
                    ? 'text-amber-300'
                    : 'text-red-400'
                )}
              >
                {engineStatus === 'active'
                  ? 'AI Service Online'
                  : engineStatus === 'checking'
                  ? 'Checking Service...'
                  : 'Service Standby'}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setLanguage((prev) => (prev === 'English' ? 'Indonesian' : 'English'))}
            aria-label={`Switch assistant reply language (currently ${language})`}
            title="Switch assistant reply language"
            className={cn(
              'flex items-center gap-1.5 rounded-xl text-[11px] font-bold border border-border hover:bg-accent transition-colors bg-background text-foreground shrink-0',
              compact ? 'px-2.5 h-9' : 'px-3 py-2 min-h-[40px]'
            )}
          >
            <Globe className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
            <span>{language === 'English' ? 'EN' : 'ID'}</span>
          </button>
          {onOpenFullPage && (
            <button
              type="button"
              onClick={onOpenFullPage}
              aria-label="Open full view on Contact page"
              title="Open full view on Contact page"
              className="w-9 h-9 rounded-xl border border-border hover:bg-accent transition-colors bg-background text-zinc-300 hover:text-white flex items-center justify-center shrink-0"
            >
              <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          )}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Silvio.AI Assistant"
              title="Close (Esc)"
              className="w-9 h-9 rounded-xl border border-border hover:bg-accent transition-colors bg-background text-zinc-300 hover:text-white flex items-center justify-center shrink-0"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div
        ref={scrollRef}
        aria-live="polite"
        className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 space-y-4"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={cn(
              'flex items-end gap-2.5',
              m.role === 'user' ? 'flex-row-reverse' : 'flex-row'
            )}
          >
            <div
              aria-hidden="true"
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-border',
                m.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground'
              )}
            >
              {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            <div
              className={cn(
                'max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed break-words',
                m.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-sm'
                  : 'bg-secondary/80 text-foreground border border-border rounded-bl-sm'
              )}
            >
              {m.role === 'assistant' ? (
                <div dangerouslySetInnerHTML={{ __html: renderMarkdown(m.content) }} />
              ) : (
                <div>{m.content}</div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-end gap-2.5">
            <div
              className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0 border border-border"
              aria-hidden="true"
            >
              <Bot className="w-4 h-4 text-zinc-400" />
            </div>
            <div className="bg-secondary/60 text-zinc-300 rounded-2xl rounded-bl-sm px-4 py-3 text-sm flex items-center gap-2.5 border border-border">
              <Loader2 className="w-4 h-4 animate-spin text-primary" aria-hidden="true" />
              <span>Generating response...</span>
            </div>
          </div>
        )}
      </div>

      {/* Collapsible Suggested Question Chips (1-Click Starters) */}
      <div className="shrink-0 border-t border-border/60 bg-secondary/15">
        <button
          type="button"
          onClick={() => setShowSuggestions((prev) => !prev)}
          aria-expanded={showSuggestions}
          aria-controls={compact ? 'floating-suggested-questions-panel' : 'suggested-questions-panel'}
          className="w-full flex items-center justify-between px-3.5 sm:px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-zinc-300 hover:text-white hover:bg-white/[0.03] transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
            <span>{language === 'English' ? 'Suggested Questions' : 'Pertanyaan Cepat'}</span>
          </span>
          <span className="flex items-center gap-1 text-primary">
            <span>
              {showSuggestions
                ? language === 'English'
                  ? 'Hide'
                  : 'Tutup'
                : language === 'English'
                ? 'Show'
                : 'Buka'}
            </span>
            {showSuggestions ? (
              <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
            )}
          </span>
        </button>

        <div
          id={compact ? 'floating-suggested-questions-panel' : 'suggested-questions-panel'}
          className={cn(
            'overflow-hidden transition-all duration-200 ease-in-out',
            showSuggestions ? 'max-h-56 opacity-100 px-3.5 sm:px-4 pb-3 pt-1' : 'max-h-0 opacity-0 px-3.5 sm:px-4 pb-0 pt-0'
          )}
        >
          <div className="flex flex-wrap gap-1.5">
            {activeSuggestions.map((item) => (
              <button
                key={item.label}
                type="button"
                disabled={isLoading}
                onClick={() => sendPrompt(item.prompt)}
                className="text-[11px] font-semibold text-zinc-200 hover:text-white bg-background/80 hover:bg-primary/15 border border-border hover:border-primary/40 rounded-lg px-2.5 py-1.5 transition-colors disabled:opacity-50 text-left"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="shrink-0 p-3 sm:p-4 border-t border-border bg-secondary/20">
        <div className="flex gap-2.5">
          <label htmlFor={compact ? 'floating-chatbot-input' : 'chatbot-input'} className="sr-only">
            Ask Silvio&apos;s AI assistant
          </label>
          <input
            ref={inputRef}
            id={compact ? 'floating-chatbot-input' : 'chatbot-input'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              language === 'English'
                ? 'Ask about projects, skills, or availability...'
                : 'Tanyakan tentang project, skill, atau ketersediaan...'
            }
            className="flex-1 bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-zinc-500 min-h-[44px]"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            aria-label="Send message"
            className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground w-11 h-11 rounded-xl transition-colors flex items-center justify-center shrink-0"
          >
            <Send className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </form>
    </div>
  );
};
