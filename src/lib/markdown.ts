export type MarkdownVariant = 'chat' | 'terminal';

export function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderInlineMarkdown(escapedLine: string, variant: MarkdownVariant): string {
  const codeTokens: string[] = [];
  let text = escapedLine.replace(/`([^`]+)`/g, (_m, code) => {
    const idx = codeTokens.length;
    const sizeCls = variant === 'terminal' ? 'text-[11px]' : 'text-[12px]';
    codeTokens.push(
      `<code class="px-1.5 py-0.5 rounded bg-background/90 border border-border/80 text-primary font-code ${sizeCls}">${code}</code>`
    );
    return `\u0000CODE${idx}\u0000`;
  });

  const linkTokens: string[] = [];
  text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (_m, label, url) => {
    const idx = linkTokens.length;
    linkTokens.push(
      `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-primary underline underline-offset-2 hover:text-primary/80 break-all">${label}</a>`
    );
    return `\u0000LINK${idx}\u0000`;
  });

  // Auto-link bare https:// URLs outside explicit Markdown links or inline code
  text = text.replace(/(https?:\/\/[^\s<]+)/g, (rawUrl) => {
    const cleanUrl = rawUrl.replace(/[.,;:!?)]+$/, '');
    const trailing = rawUrl.slice(cleanUrl.length);
    const idx = linkTokens.length;
    linkTokens.push(
      `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" class="text-primary underline underline-offset-2 hover:text-primary/80 break-all">${cleanUrl}</a>`
    );
    return `\u0000LINK${idx}\u0000${trailing}`;
  });

  // Bold + Italic (***text***)
  text = text.replace(/\*\*\*(.+?)\*\*\*/g, '<strong class="text-white font-semibold"><em>$1</em></strong>');

  // Bold (**text** or __text__)
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
  text = text.replace(/__(.+?)__/g, '<strong class="text-white font-semibold">$1</strong>');

  // Italic (*text* when cleanly bounded)
  text = text.replace(/(^|[\s(])\*([^*\n]+?)\*(?=$|[\s.,;:!?)]|<)/g, '$1<em class="italic">$2</em>');

  text = text.replace(/\u0000LINK(\d+)\u0000/g, (_m, idx) => linkTokens[Number(idx)] ?? '');
  text = text.replace(/\u0000CODE(\d+)\u0000/g, (_m, idx) => codeTokens[Number(idx)] ?? '');
  return text;
}

export function renderMarkdown(text?: string, variant: MarkdownVariant = 'chat'): string {
  if (!text) return '';

  const lines = text.replace(/\r\n/g, '\n').split('\n');
  const htmlBlocks: string[] = [];
  let inCodeBlock = false;
  let codeLines: string[] = [];

  for (const rawLine of lines) {
    const trimmed = rawLine.trim();

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
      const content = renderInlineMarkdown(escapeHtml(headingMatch[2]), variant);
      const cls =
        variant === 'terminal'
          ? level === 1
            ? 'text-sm font-bold text-white mt-2 mb-1'
            : 'text-xs font-bold uppercase tracking-wider text-primary mt-2 mb-0.5'
          : level === 1
          ? 'text-base font-headline font-bold text-white mt-2 mb-1'
          : level === 2
          ? 'text-sm font-headline font-bold text-primary mt-2 mb-1'
          : 'text-xs font-headline font-bold uppercase tracking-wider text-primary mt-2 mb-0.5';
      htmlBlocks.push(`<div class="${cls}">${content}</div>`);
      continue;
    }

    const bulletMatch = rawLine.match(/^\s*(?:[-*+]|•)\s+(.+)$/);
    if (bulletMatch) {
      const indent = rawLine.match(/^\s*/)?.[0].length ?? 0;
      const padClass = indent >= 2 ? 'pl-4' : '';
      const content = renderInlineMarkdown(escapeHtml(bulletMatch[1]), variant);
      htmlBlocks.push(
        `<div class="flex items-start gap-2 my-1 ${padClass}"><span class="text-primary font-bold leading-relaxed shrink-0">&bull;</span><span class="flex-1 min-w-0">${content}</span></div>`
      );
      continue;
    }

    const numMatch = rawLine.match(/^\s*(\d+)\.\s+(.+)$/);
    if (numMatch) {
      const content = renderInlineMarkdown(escapeHtml(numMatch[2]), variant);
      htmlBlocks.push(
        `<div class="flex items-start gap-2 my-1"><span class="text-primary font-code font-bold text-xs mt-0.5 shrink-0">${numMatch[1]}.</span><span class="flex-1 min-w-0">${content}</span></div>`
      );
      continue;
    }

    htmlBlocks.push(`<p class="my-0.5">${renderInlineMarkdown(escapeHtml(rawLine), variant)}</p>`);
  }

  if (inCodeBlock && codeLines.length > 0) {
    htmlBlocks.push(
      `<pre class="my-2 p-3 rounded-xl bg-background/90 border border-border/80 font-code text-xs text-zinc-200 overflow-x-auto"><code>${escapeHtml(
        codeLines.join('\n')
      )}</code></pre>`
    );
  }

  return htmlBlocks.join('');
}
