"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Globe, MessageSquare } from 'lucide-react';
import { chatWithAIAssistant } from '@/ai/flows/chat-with-ai-assistant';
import { cn } from '@/lib/utils';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

// Safe Markdown Parser (Custom)
const parseMarkdown = (text: string) => {
  let html = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>')
    .replace(/^- (.*)/gm, '<li>$1</li>');
  
  if (html.includes('<li>')) {
    html = `<ul className="list-disc pl-4">${html}</ul>`;
  }
  return html;
};

export const Chatbot: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm Silvio's AI assistant. How can I help you today?" }
  ]);
  const [language, setLanguage] = useState<'English' | 'Indonesian'>('English');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Build history for RAG payload: [[question, answer], ...]
      const history: [string, string][] = [];
      for (let i = 0; i < messages.length - 1; i += 2) {
        if (messages[i].role === 'user' && messages[i+1]?.role === 'assistant') {
          history.push([messages[i].content, messages[i+1].content]);
        }
      }

      const res = await chatWithAIAssistant({
        text: userMessage,
        language,
        history
      });

      setMessages(prev => [...prev, { role: 'assistant', content: res.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-xl mx-auto border border-border rounded-2xl overflow-hidden bg-card shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-border bg-muted/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bot className="w-8 h-8 text-primary" />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-card rounded-full animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-headline font-bold uppercase tracking-wider">Silvio.AI Assistant</h3>
            <p className="text-[10px] opacity-60 flex items-center gap-1">
              <MessageSquare className="w-2 h-2" /> ONLINE & READY
            </p>
          </div>
        </div>
        <button 
          onClick={() => setLanguage(prev => prev === 'English' ? 'Indonesian' : 'English')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border border-border hover:bg-accent transition-colors"
        >
          <Globe className="w-3 h-3" />
          {language === 'English' ? 'EN' : 'ID'}
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-primary/10">
        {messages.map((m, i) => (
          <div key={i} className={cn("flex", m.role === 'user' ? 'justify-end' : 'justify-start')}>
            <div className={cn(
              "max-w-[85%] rounded-2xl p-4 text-sm flex gap-3",
              m.role === 'user' ? 'bg-primary text-white' : 'bg-muted text-foreground'
            )}>
              {m.role === 'assistant' && <Bot className="w-5 h-5 shrink-0 opacity-50" />}
              <div 
                dangerouslySetInnerHTML={{ __html: m.role === 'assistant' ? parseMarkdown(m.content) : m.content }} 
                className="leading-relaxed"
              />
              {m.role === 'user' && <User className="w-5 h-5 shrink-0 opacity-50" />}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted text-foreground max-w-[85%] rounded-2xl p-4 text-sm flex gap-3 italic">
              <Loader2 className="w-5 h-5 animate-spin opacity-50" />
              <span>Thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 border-t border-border bg-muted/30">
        <div className="flex gap-2">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me about Silvio's projects..."
            className="flex-1 bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-white p-2.5 rounded-xl transition-all shadow-md active:scale-95"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};
