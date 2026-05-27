
"use client"

import React from 'react';
import Image from 'next/image';
import { ExternalLink, ChevronRight, Brain, Sparkles, Info } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

const featuredProjects = [
  { 
    id: 1, 
    title: "InsightSQL (LangGraph Engine)", 
    impact: "State-of-the-Art",
    desc: "State-of-the-Art Reasoning. The evolution of SQL Agents using Graph Architecture with self-correction capabilities. Uses Cyclic Reasoning to query and validate errors.",
    tech: ["LANGGRAPH", "GEMINI 2.5 FLASH", "PYTHON", "SQL"],
    link: "https://github.com/viochris/InsightSQL-LangGraph-Engine-Web",
    problem: "Traditional SQL agents often fail on complex schemas or logic errors without clear transparency into their reasoning process.",
    solution: "Implemented Cyclic Reasoning to query, validate, and self-correct errors in real-time. The architecture provides full visibility into the agent's thought process.",
    image: "/insight_sql_langgraph.png"
  },
  { 
    id: 2, 
    title: "SpendSense (Financial AI)", 
    impact: "Utility Pro",
    desc: "Conversational finance app with OCR receipt scanning and natural language expense queries. Integrates Pandas Agent for complex financial reasoning.",
    tech: ["STREAMLIT", "LANGCHAIN", "GEMINI VISION", "PANDAS"],
    link: "https://github.com/viochris/Streamlit-SpendSense",
    problem: "Manual expense tracking is tedious and users often struggle to derive meaningful insights from their raw financial data.",
    solution: "Developed a vision-enabled assistant that extracts data from receipts and allows users to query their spending habits using natural language.",
    image: "/streamlit_spendsense.png"
  },
  { 
    id: 3, 
    title: "DocuTalk-AI — Smart RAG", 
    impact: "High Precision",
    desc: "An intelligent document assistant using ReAct Agents to decide between Document Retrieval or real-time Web Search for hyper-accurate answers.",
    tech: ["LANGCHAIN", "GEMINI 2.5 FLASH", "FAISS", "PYTHON"],
    link: "https://github.com/viochris/DocuTalk-AI",
    problem: "Standard RAG systems often suffer from hallucinations when answers aren't in the provided documents or are outdated.",
    solution: "Built a ReAct agent that autonomously decides whether to retrieve from internal documents or search the web, ensuring the most accurate response.",
    image: "/resume_scanner_api.png"
  }
];

export default function ProjectsPage() {
  return (
    <div className="pt-32 lg:pt-40 pb-24 px-6 md:px-12 lg:px-16 min-h-screen">
      <section id="projects" className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-6">
            <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase px-4">Portfolio</Badge>
            <h2 className="text-5xl lg:text-6xl font-headline font-black uppercase tracking-tighter text-foreground">
              Featured <span className="text-primary">Projects</span>
            </h2>
            <p className="text-muted-foreground text-lg lg:text-xl max-w-2xl font-medium">Production-grade AI solutions solving real-world challenges through data science and engineering.</p>
          </div>
          
          <div className="pb-2">
            <Button variant="link" className="font-headline font-bold uppercase tracking-widest gap-2 text-primary h-auto p-0 hover:no-underline hover:text-primary/80 transition-all" asChild>
              <Link href="/repository">
                Explore Repository <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {featuredProjects.map((p) => (
            <Card key={p.id} id={`project-${p.id}`} className="group overflow-hidden border-border bg-card/40 hover:bg-card/60 transition-all duration-500 hover:shadow-2xl hover:border-primary/20 rounded-[2rem] md:rounded-[2.5rem] flex flex-col h-full scroll-mt-32">
              {/* Image Container */}
              <div className="relative aspect-video w-full overflow-hidden shrink-0 bg-black/20">
                <Image 
                  src={p.image} 
                  alt={p.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105" 
                  priority
                />
                <div className="absolute top-4 right-4 z-20">
                  <Badge className="bg-primary text-white font-black uppercase tracking-widest text-[10px] px-3 py-1 shadow-2xl">
                    {p.impact}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 md:p-10">
                  <Button size="lg" className="rounded-full font-bold shadow-xl px-8 md:px-10 h-12 md:h-14 text-sm md:text-base" asChild>
                    <a href={p.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" /> View GitHub
                    </a>
                  </Button>
                </div>
              </div>

              {/* Card Body */}
              <CardHeader className="p-6 md:p-10 flex-1 flex flex-col">
                {/* Tech Tags */}
                <div className="flex flex-wrap items-start gap-x-2 gap-y-3 mb-6 min-h-[4rem]">
                  {p.tech.map(t => (
                    <Badge 
                      key={t} 
                      variant="secondary" 
                      className="text-[10px] md:text-[11px] uppercase font-bold tracking-tight bg-primary/10 text-primary border-primary/20 px-3 py-1"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
                
                {/* Title */}
                <div className="min-h-[9rem] flex items-start">
                  <CardTitle className="text-2xl md:text-3xl lg:text-4xl font-headline font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                    {p.title}
                  </CardTitle>
                </div>

                {/* Description */}
                <div className="min-h-[7rem]">
                  <CardDescription className="text-base md:text-lg text-muted-foreground font-medium leading-relaxed line-clamp-3">
                    {p.desc}
                  </CardDescription>
                </div>
              </CardHeader>

              {/* Card Footer */}
              <CardContent className="px-6 md:p-10 pb-6 md:pb-10 pt-0 mt-auto">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full rounded-xl md:rounded-2xl font-headline font-bold uppercase tracking-widest text-[10px] md:text-xs h-12 md:h-14 hover:bg-primary hover:text-primary-foreground transition-all">
                      Project Pitch & Methodology
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-[1.5rem] md:rounded-[2.5rem] border-border bg-card p-6 md:p-10">
                    <DialogHeader>
                      <DialogTitle className="text-2xl md:text-4xl font-headline font-bold mb-4 md:mb-8 text-foreground">{p.title}</DialogTitle>
                      <DialogDescription className="text-muted-foreground text-sm font-medium">Product pitch and technical overview.</DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                      <div className="space-y-6 md:space-y-10">
                        <div className="relative aspect-video w-full overflow-hidden rounded-xl md:rounded-[2rem] shadow-2xl border border-border">
                          <Image 
                            src={p.image} 
                            alt={p.title} 
                            fill
                            sizes="(max-width: 768px) 100vw, 400px"
                            className="object-cover object-top"
                          />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-primary text-white px-3 py-1 font-black uppercase text-xs">{p.impact}</Badge>
                          {p.tech.map(t => (
                            <Badge key={t} variant="secondary" className="bg-muted text-foreground uppercase text-[10px] font-bold px-3 py-1">
                              {t}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-8 md:space-y-10">
                        <div>
                          <h4 className="text-xs md:text-sm font-bold uppercase text-primary mb-3 md:mb-4 flex items-center gap-3 tracking-[0.2em]">
                            <Info className="w-4 h-4" /> Pitch
                          </h4>
                          <p className="text-foreground font-medium text-base md:text-lg leading-relaxed">{p.desc}</p>
                        </div>

                        <div>
                          <h4 className="text-xs md:text-sm font-bold uppercase text-primary mb-3 md:mb-4 flex items-center gap-3 tracking-[0.2em]">
                            <Brain className="w-4 h-4" /> The Challenge
                          </h4>
                          <p className="text-foreground font-medium text-base md:text-lg leading-relaxed">{p.problem}</p>
                        </div>
                        <div>
                          <h4 className="text-xs md:text-sm font-bold uppercase text-primary mb-3 md:mb-4 flex items-center gap-3 tracking-[0.2em]">
                            <Sparkles className="w-4 h-4" /> The Solution
                          </h4>
                          <p className="text-foreground font-medium text-base md:text-lg leading-relaxed">{p.solution}</p>
                        </div>
                        <Separator className="bg-border/50" />
                        <Button className="w-full rounded-xl md:rounded-[1.5rem] font-headline font-bold h-12 md:h-14 text-base md:text-lg" asChild>
                          <a href={p.link} target="_blank" rel="noopener noreferrer">Open Repository <ExternalLink className="ml-2 w-5 h-5" /></a>
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
