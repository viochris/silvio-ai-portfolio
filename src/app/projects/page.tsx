
"use client"

import React from 'react';
import { ExternalLink, ChevronRight, Brain, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

const featuredProjects = [
  { 
    id: 1, 
    title: "InsightSQL (LangGraph Engine)", 
    desc: "State-of-the-Art Reasoning. The evolution of SQL Agents using Graph Architecture with self-correction capabilities.",
    tech: ["LangGraph", "Gemini 2.5 Flash", "Python", "SQL"],
    link: "https://github.com/viochris/InsightSQL-LangGraph-Engine-Web",
    problem: "Traditional SQL agents often fail on complex schemas or logic errors without clear transparency.",
    solution: "Implemented Cyclic Reasoning to query, validate, and self-correct errors in real-time with full 'Glass Box' transparency.",
    image: "https://picsum.photos/seed/insight-sql/600/400"
  },
  { 
    id: 2, 
    title: "NovaCal AI (Stateful Telegram)", 
    desc: "Advanced Telegram bot featuring an SQL-backed conversational memory for intelligent Google Calendar management.",
    tech: ["LangChain", "SQL", "Gemini Flash", "Google Calendar API"],
    link: "https://github.com/viochris/telegram-calendar-ai-bot.git",
    problem: "Most chat bots lack persistent memory, making multi-turn scheduling conversations impossible.",
    solution: "Created an SQL-backed memory architecture enabling natural dialogue for CRUD operations on calendar events.",
    image: "https://picsum.photos/seed/novacal/600/400"
  },
  { 
    id: 3, 
    title: "Resume Scanner API", 
    desc: "A high-performance stateless API for ATS optimization using hybrid TF-IDF and SBERT semantic analysis.",
    tech: ["FastAPI", "SBERT", "TF-IDF", "NLP"],
    link: "https://github.com/viochris/resume-scanner-api",
    problem: "Traditional keyword-based ATS tools miss qualified candidates due to lack of semantic understanding.",
    solution: "Developed a dual-engine API offering Strict Mode (TF-IDF) and Flexible Mode (SBERT) for precise job-resume matching.",
    image: "https://picsum.photos/seed/resume-api/600/400"
  },
  { 
    id: 4, 
    title: "InsightData (AI Analyst)", 
    desc: "An automated Data Scientist agent that analyzes CSVs, Excel, and Sheets with auto-visualization.",
    tech: ["Pandas Agent", "Gemini 2.5 Flash", "Python", "Matplotlib"],
    link: "https://github.com/viochris/insight-data-ai-analyst",
    problem: "Manual data cleaning and basic statistical analysis are time-consuming for non-technical users.",
    solution: "Built a ReAct agent that autonomously writes and executes Python code for cleaning, analysis, and instant visualization.",
    image: "https://picsum.photos/seed/ai-analyst/600/400"
  }
];

export default function ProjectsPage() {
  return (
    <div className="pt-32 lg:pt-40 pb-24 px-6 md:px-12 lg:px-16 min-h-screen">
      <section id="projects" className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="space-y-6 mb-12">
          <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase px-4">Portfolio</Badge>
          <h2 className="text-5xl lg:text-6xl font-headline font-black uppercase tracking-tighter text-foreground">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg lg:text-xl max-w-2xl font-medium">Production-grade AI solutions solving real-world challenges through data science and engineering.</p>
        </div>

        {/* Explore Repository Link - Repositioned closer to the projects grid */}
        <div className="flex justify-end mb-8 pr-4">
          <Button variant="link" className="font-headline font-bold uppercase tracking-widest gap-2 text-primary h-auto p-0 hover:no-underline hover:text-primary/80 transition-all" asChild>
            <Link href="/repository">
              Explore Repository <ChevronRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {featuredProjects.map((p) => (
            <Card key={p.id} className="group overflow-hidden border-border bg-card/40 hover:bg-card/60 transition-all duration-500 hover:shadow-2xl hover:border-primary/20 rounded-[2.5rem] flex flex-col h-full">
              {/* Image Container */}
              <div className="relative h-72 lg:h-80 overflow-hidden shrink-0">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10">
                  <Button size="lg" className="rounded-full font-bold shadow-xl px-10" asChild>
                    <a href={p.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                    </a>
                  </Button>
                </div>
              </div>

              {/* Card Body */}
              <CardHeader className="p-10 flex-1 flex flex-col">
                {/* Horizontal Tech Tags - Limited to 3 to prevent overlap/wrap, with +N counter */}
                <div className="flex items-center gap-2 mb-6 flex-wrap lg:flex-nowrap overflow-hidden">
                  {p.tech.slice(0, 3).map(t => (
                    <Badge key={t} variant="secondary" className="text-[10px] uppercase font-bold tracking-tighter bg-primary/5 text-primary border-primary/10 px-3 py-1 whitespace-nowrap shrink-0">
                      {t}
                    </Badge>
                  ))}
                  {p.tech.length > 3 && (
                    <span className="text-[10px] font-bold text-muted-foreground whitespace-nowrap shrink-0">+{p.tech.length - 3} more</span>
                  )}
                </div>
                
                {/* Title with fixed minimum height for alignment */}
                <div className="min-h-[4rem] lg:min-h-[5rem]">
                  <CardTitle className="text-3xl lg:text-4xl font-headline font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                    {p.title}
                  </CardTitle>
                </div>

                {/* Description with fixed clamp height */}
                <CardDescription className="text-lg text-muted-foreground mt-4 font-medium leading-relaxed line-clamp-2 h-14">
                  {p.desc}
                </CardDescription>
              </CardHeader>

              {/* Card Footer / Action */}
              <CardContent className="px-10 pb-10 pt-0 mt-auto">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full rounded-2xl font-headline font-bold uppercase tracking-widest text-xs h-14 hover:bg-primary hover:text-primary-foreground transition-all">
                      Case Study Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] border-border bg-card p-10">
                    <DialogHeader>
                      <DialogTitle className="text-4xl font-headline font-bold mb-8 text-foreground">{p.title}</DialogTitle>
                    </DialogHeader>
                    <div className="grid md:grid-cols-2 gap-16">
                      <div className="space-y-10">
                        <img src={p.image} alt={p.title} className="w-full rounded-[2rem] shadow-2xl border border-border" />
                        <div className="flex flex-wrap gap-2">
                          {p.tech.map(t => <Badge key={t} variant="secondary" className="bg-muted text-foreground uppercase text-[10px] font-bold px-3 py-1">{t}</Badge>)}
                        </div>
                      </div>
                      <div className="space-y-10">
                        <div>
                          <h4 className="text-sm font-bold uppercase text-primary mb-4 flex items-center gap-3 tracking-[0.2em]">
                            <Brain className="w-4 h-4" /> The Problem
                          </h4>
                          <p className="text-foreground font-medium text-lg leading-relaxed">{p.problem}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold uppercase text-primary mb-4 flex items-center gap-3 tracking-[0.2em]">
                            <Sparkles className="w-4 h-4" /> The Solution
                          </h4>
                          <p className="text-foreground font-medium text-lg leading-relaxed">{p.solution}</p>
                        </div>
                        <Separator className="bg-border/50" />
                        <Button className="w-full rounded-[1.5rem] font-headline font-bold h-14 text-lg" asChild>
                          <a href={p.link} target="_blank" rel="noopener noreferrer">Visit Repository <ExternalLink className="ml-2 w-5 h-5" /></a>
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
