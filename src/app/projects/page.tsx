
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
    title: "Resume Scanner API", 
    impact: "Research Oriented",
    desc: "A high-performance stateless API for ATS optimization using hybrid TF-IDF and SBERT semantic analysis. Features dual-engine precise matching.",
    tech: ["FASTAPI", "SBERT", "TF-IDF", "NLP"],
    link: "https://github.com/viochris/resume-scanner-api",
    problem: "Candidates often struggle to optimize their resumes for automated Applicant Tracking Systems (ATS) without clear feedback.",
    solution: "Developed a dual-engine API that compares resumes against job descriptions using both statistical (TF-IDF) and semantic (SBERT) embeddings.",
    image: "/resume_scanner_api.png"
  },
  { 
    id: 4, 
    title: "InsightData (AI Analyst)", 
    impact: "Automation Pro",
    desc: "An automated Data Scientist agent that analyzes CSVs, Excel, and Sheets with auto-visualization. Autonomously writes and executes Python code.",
    tech: ["PANDAS AGENT", "GEMINI 2.5 FLASH", "PYTHON", "MATPLOTLIB"],
    link: "https://github.com/viochris/insight-data-ai-analyst",
    problem: "Data analysis often requires manual effort to write code, clean data, and generate meaningful visualizations.",
    solution: "Built an end-to-end AI Analyst leveraging LLMs to autonomously perform EDA, statistical calculations, and generate visual insights from any structured dataset.",
    image: "/insight_data.png"
  }
];

export default function ProjectsPage() {
  return (
    <div className="pt-32 lg:pt-40 pb-24 px-6 md:px-12 lg:px-16 min-h-screen">
      <section id="projects" className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-x-12 lg:gap-y-20">
          {featuredProjects.map((p) => (
            <div key={p.id} className="flex flex-col h-full group">
              {/* Project Card Container */}
              <div className="bg-card/40 border border-white/5 rounded-[2.5rem] p-6 md:p-8 flex flex-col h-full hover:border-primary/30 transition-all duration-500 hover:shadow-2xl">
                
                {/* Image Section */}
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black/40 mb-8">
                  <Image 
                    src={p.image} 
                    alt={p.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105" 
                    priority
                    data-ai-hint="software project screenshot"
                  />
                  <div className="absolute top-4 right-4 z-20">
                    <Badge className="bg-primary text-white font-black uppercase tracking-widest text-[9px] px-2 py-0.5 shadow-2xl border-none">
                      {p.impact}
                    </Badge>
                  </div>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tech.map(t => (
                    <Badge 
                      key={t} 
                      variant="outline" 
                      className="text-[10px] uppercase font-bold tracking-widest border-primary/40 text-primary bg-primary/5 px-3 py-1 rounded-full"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>

                {/* Content Section */}
                <div className="flex-1 flex flex-col space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-white/60 text-sm md:text-base font-medium leading-relaxed line-clamp-3">
                    {p.desc}
                  </p>
                </div>

                {/* Button Section */}
                <div className="mt-10">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full h-14 rounded-full border-white/10 hover:bg-white/5 hover:border-primary/50 text-white font-black uppercase tracking-[0.2em] text-[10px] md:text-xs transition-all shadow-lg"
                      >
                        Case Study Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] md:rounded-[2.5rem] border-border bg-card p-6 md:p-10">
                      <DialogHeader>
                        <DialogTitle className="text-2xl md:text-4xl font-headline font-bold mb-4 md:mb-8 text-foreground">{p.title}</DialogTitle>
                        <DialogDescription className="text-muted-foreground text-sm font-medium">Product pitch and technical overview.</DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                        <div className="space-y-6 md:space-y-10">
                          <div className="relative aspect-video w-full overflow-hidden rounded-[1.5rem] shadow-2xl border border-border">
                            <Image 
                              src={p.image} 
                              alt={p.title} 
                              fill
                              sizes="(max-width: 768px) 100vw, 400px"
                              className="object-cover object-top"
                            />
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Badge className="bg-primary text-white px-3 py-1 font-black uppercase text-xs border-none">{p.impact}</Badge>
                            {p.tech.map(t => (
                              <Badge key={t} variant="secondary" className="bg-muted text-foreground uppercase text-[10px] font-bold px-3 py-1 border-none">
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
                          <Button className="w-full rounded-2xl font-headline font-bold h-14 text-base md:text-lg" asChild>
                            <a href={p.link} target="_blank" rel="noopener noreferrer">Open Repository <ExternalLink className="ml-2 w-5 h-5" /></a>
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
