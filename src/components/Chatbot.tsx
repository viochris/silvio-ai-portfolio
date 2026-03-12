"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Globe, MessageSquare } from 'lucide-react';
import { chatWithAIAssistant } from '@/ai/flows/chat-with-ai-assistant';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const parseMarkdown = (text: string) => {
  let html = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>')
    .replace(/^- (.*)/gm, '<li>$1</li>');
  
  if (html.includes('<li>')) {
    html = `<ul className="list-disc pl-4 space-y-1">${html}</ul>`;
  }
  return html;
};

export const Chatbot: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm Silvio's AI assistant. How can I help you today? I can answer questions about Silvio's projects, skills, and background." }
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
    <div className="flex flex-col h-[650px] w-full max-w-xl mx-auto border border-border/50 rounded-[2rem] overflow-hidden bg-card/80 backdrop-blur-xl shadow-2xl relative">
      <div className="absolute inset-0 bg-primary/[0.02] pointer-events-none" />
      
      {/* Header */}
      <div className="p-6 border-b border-border bg-muted/40 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Bot className="w-7 h-7 text-primary" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-card rounded-full animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-headline font-black uppercase tracking-widest text-foreground">Silvio.AI Assistant</h3>
            <p className="text-[10px] font-bold text-muted-foreground flex items-center gap-1.5 uppercase tracking-tighter">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> NEURAL ENGINE ACTIVE
            </p>
          </div>
        </div>
        <button 
          onClick={() => setLanguage(prev => prev === 'English' ? 'Indonesian' : 'English')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black border border-border hover:bg-accent transition-all bg-card shadow-sm text-foreground"
        >
          <Globe className="w-3.5 h-3.5 text-primary" />
          {language === 'English' ? 'ENGLISH' : 'INDONESIA'}
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-primary/10 relative z-10">
        {messages.map((m, i) => (
          <div key={i} className={cn("flex items-end gap-3", m.role === 'user' ? 'flex-row-reverse' : 'flex-row')}>
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-border shadow-sm",
              m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
            )}>
              {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            <div className={cn(
              "max-w-[75%] rounded-[1.5rem] p-4 text-sm shadow-sm leading-relaxed",
              m.role === 'user' 
                ? 'bg-primary text-primary-foreground rounded-br-none' 
                : 'bg-muted/80 text-foreground border border-border/50 rounded-bl-none'
            )}>
              <div 
                dangerouslySetInnerHTML={{ __html: m.role === 'assistant' ? parseMarkdown(m.content) : m.content }} 
              />
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-end gap-3">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 border border-border">
              <Bot className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="bg-muted/50 text-muted-foreground max-w-[75%] rounded-[1.5rem] rounded-bl-none p-4 text-sm flex items-center gap-3 italic border border-border/30">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processing neural response...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-6 border-t border-border bg-muted/20 relative z-10">
        <div className="flex gap-3">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about Silvio..."
            className="flex-1 bg-background border border-border rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all text-foreground placeholder:text-muted-foreground/50 shadow-inner"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground p-4 rounded-2xl transition-all shadow-xl active:scale-95 flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};