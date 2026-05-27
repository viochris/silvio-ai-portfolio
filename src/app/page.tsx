
"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronRight, Brain, Database, Sparkles, Terminal, Cpu, Layers, RefreshCw, Code2, ExternalLink, Zap, Workflow, Languages } from 'lucide-react';
import { TypewriterEffect } from '@/components/TypewriterEffect';
import { TechMarquee } from '@/components/TechMarquee';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";

const featuredProjects = [
  { 
    title: "InsightSQL — LangGraph Engine", 
    type: "GenAI / Graph Agent",
    impact: "State-of-the-Art",
    desc: "The evolution of SQL Agents using Graph Architecture. Uses Cyclic Reasoning to query, validate, and self-correct errors in real-time with full 'Glass Box' transparency.",
    tech: "LangGraph • Gemini 2.5 Flash",
    link: "https://github.com/viochris/InsightSQL-LangGraph-Engine-Web"
  },
  { 
    title: "DocuTalk-AI — Smart RAG", 
    type: "GenAI / Document Intelligence",
    impact: "High Precision",
    desc: "An intelligent document assistant using ReAct Agents to decide between Document Retrieval or real-time Web Search for hyper-accurate answers.",
    tech: "LangChain • FAISS • Gemini",
    link: "https://github.com/viochris/DocuTalk-AI"
  },
  { 
    title: "NovaCal AI — Stateful Assistant", 
    type: "GenAI / Automation",
    impact: "Stateful Design",
    desc: "Redefining conversational scheduling with an SQL-backed memory architecture to maintain deep context across multi-turn dialogues.",
    tech: "LangChain • SQL Memory • Gemini",
    link: "https://github.com/viochris/telegram-calendar-ai-bot"
  },
  { 
    title: "SpendSense — Financial AI", 
    type: "Data Science / Vision",
    impact: "Utility Pro",
    desc: "Conversational finance app with OCR receipt scanning and natural language expense queries for smart money management.",
    tech: "Streamlit • Vision • Gemini",
    link: "https://github.com/viochris/Streamlit-SpendSense"
  },
  { 
    title: "Resume Scanner API", 
    type: "Backend / NLP",
    impact: "Research Oriented",
    desc: "Dual-Engine ATS API using TF-IDF and SBERT embeddings for high-precision resume-job description matching.",
    tech: "FastAPI • SBERT • Docker",
    link: "https://github.com/viochris/resume-scanner-api"
  },
  { 
    title: "Insightify API — Sentiment", 
    type: "NLP / Analytics",
    impact: "Dual-Lingual",
    desc: "High-performance sentiment analytics API supporting both English and Indonesian using RoBERTa transformer models.",
    tech: "FastAPI • RoBERTa • Transformers",
    link: "https://github.com/viochris/Insightify-Sentiment-API"
  },
  { 
    title: "Daily Agenda Broadcaster", 
    type: "Automation / Workflow",
    impact: "Efficiency Pro",
    desc: "Automated workflow that fetches upcoming GCalendar events and dispatches structured daily briefings to Telegram.",
    tech: "Python • GCalendar • Telegram",
    link: "https://github.com/viochris/auto-daily-scheduler.git"
  },
  { 
    title: "NovaMail AI — Autoresponder", 
    type: "Automation / LLMOps",
    impact: "Autonomous Inbox",
    desc: "An intelligent inbox assistant that autonomously parses incoming emails and generates professional AI replies.",
    tech: "Gmail API • Gemini • Python",
    link: "https://github.com/viochris/NovaMail-AI-Autoresponder.git"
  },
  { 
    title: "Stuntify API — MLOps", 
    type: "Backend / MLOps",
    impact: "Production Ready",
    desc: "Robust inference system for real-time stunting risk prediction based on rigorous health analytics research.",
    tech: "FastAPI • Scikit-Learn • Docker",
    link: "https://github.com/viochris/Stuntify-API"
  },
  { 
    title: "InsightData — AI Analyst", 
    type: "GenAI / Analytics",
    impact: "Automation Pro",
    desc: "Automated Data Scientist that analyzes CSV/Excel files and auto-generates deep visualizations and insights.",
    tech: "Pandas Agent • Gemini • Python",
    link: "https://github.com/viochris/insight-data-ai-analyst"
  }
];

const infrastructurePulseData = [
  { 
    status: "LIVE", 
    title: "High-Performance Backend", 
    subtitle: "Asynchronous APIs & Microservices", 
    desc: "Architecting scalable, asynchronous server-side logic and robust API gateways to form the backbone of seamless AI integrations and data pipelines.",
    icon: <Cpu className="text-blue-400" />
  },
  { 
    status: "ACTIVE", 
    title: "Multi-Agent Orchestration", 
    subtitle: "Cognitive AI Architectures", 
    desc: "Engineering autonomous agentic workflows and multi-step reasoning systems using modern LLM frameworks to execute complex, context-aware problem-solving logic.",
    icon: <Sparkles className="text-yellow-400" />
  },
  { 
    status: "SYNCED", 
    title: "RAG & Vector Ecosystems", 
    subtitle: "High-Precision Knowledge Retrieval", 
    desc: "Designing robust semantic search pipelines and vector database integrations to ground language models with dynamic, real-time factual context.",
    icon: <Database className="text-green-400" />
  },
  { 
    status: "OPTIMIZED", 
    title: "Advanced Machine Learning", 
    subtitle: "Deep Learning & Explainable AI", 
    desc: "Building highly accurate predictive models leveraging both traditional algorithms (Scikit-Learn) and neural networks (TensorFlow/Keras), enhanced by transparent XAI techniques like SHAP and LIME.",
    icon: <Brain className="text-purple-400" />
  },
  { 
    status: "PROCESSING", 
    title: "Applied Natural Language Processing", 
    subtitle: "Context Extraction & Intelligence", 
    desc: "Designing comprehensive text processing pipelines to extract nuanced meaning, execute dynamic summarization, and analyze linguistic context from unstructured data.",
    icon: <Languages className="text-cyan-400" />
  },
  { 
    status: "DEPLOYED", 
    title: "Production & Automation", 
    subtitle: "CI/CD & Interactive Interfaces", 
    desc: "Deploying reliable AI solutions via automated pipelines (GitHub Actions) and REST APIs (FastAPI), delivering utility through interactive web apps (Streamlit) and autonomous Telegram bots.",
    icon: <Workflow className="text-orange-400" />
  }
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isAnim, setIsAnim] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="pt-12 lg:pt-16 min-h-screen">
      <section id="home" className="pb-20">
        
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:pt-12 lg:pb-20">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-0">
            
            <div className="w-full lg:w-1/2 flex justify-center items-center relative lg:pr-4 lg:pl-8">
              <div className="relative group shrink-0">
                <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full animate-pulse-glow" />
                <div className="relative z-10 w-56 h-56 md:w-64 md:h-64 lg:w-80 lg:h-80">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary animate-[spin_30s_linear_infinite]" />
                  <div 
                    className="absolute inset-4 rounded-full p-2 bg-black shadow-2xl overflow-hidden border border-primary/20 cursor-pointer active:scale-95 transition-all duration-300"
                    onClick={() => setIsAnim(!isAnim)}
                    title="Click to see my AI Avatar!"
                  >
                    <Image 
                      src={isAnim ? "/vio-image-animation.png" : "/vio-image.png"} 
                      alt="Silvio Christian, Joe" 
                      width={320}
                      height={320}
                      sizes="(max-width: 768px) 224px, (max-width: 1024px) 256px, 320px"
                      priority
                      className="w-full h-full object-cover rounded-full transition-opacity duration-500"
                    />
                  </div>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20">
                    <Badge className="bg-primary text-white px-8 py-2 shadow-2xl font-headline font-black text-[10px] md:text-xs tracking-[0.2em] uppercase border-none whitespace-nowrap rounded-full">
                      AI ENGINEER
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl mx-auto lg:mx-0 lg:pl-4 space-y-6">
              <div className="space-y-4 w-full">
                <div className="space-y-4">
                  <Badge variant="outline" className="text-primary font-headline uppercase tracking-[0.3em] py-1.5 border-primary/30 text-[10px] md:text-xs">
                    DATA SCIENTIST & AI ENGINEER
                  </Badge>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-black leading-tight tracking-tighter text-white">
                    Silvio Christian, <br />
                    <span className="text-primary">Joe</span>
                  </h1>
                </div>
                
                <div className="flex items-center justify-center lg:justify-start gap-2 text-xl md:text-2xl lg:text-3xl font-headline text-white/90 min-h-[40px] animate-fade-in whitespace-nowrap overflow-hidden" style={{ animationDelay: '0.2s' }}>
                  <span>I</span>
                  <TypewriterEffect />
                </div>
                
                <p className="text-base md:text-lg text-white/80 leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
                  I am an Informatics Engineering student working as a <strong>Data Scientist</strong> and <strong>AI Engineer</strong>. My technical focus involves analyzing <strong>Tabular & NLP data</strong>, as well as developing functional <strong>AI Agents</strong> for practical applications.
                </p>

                <p className="text-sm md:text-base text-white/90 font-black italic tracking-tight pt-2 text-center w-full">
                  Focusing on Data Science (Tabular & NLP) and autonomous AI Agent Engineering.
                </p>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 w-full">
                <Link href="/projects">
                  <Button size="lg" className="rounded-full px-10 font-headline uppercase font-bold tracking-widest h-14 w-full sm:w-auto shadow-lg shadow-primary/20">
                    VIEW PROJECTS <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="rounded-full px-10 font-headline uppercase font-bold tracking-widest h-14 border-white/20 text-white hover:bg-white/10 w-full sm:w-auto">
                    CONTACT ME
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full border-y border-white/10 bg-white/[0.02] py-12 mb-20 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-around items-center gap-12 md:gap-0">
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl md:text-5xl font-black text-primary mb-2">15+</div>
              <div className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">Projects Completed</div>
            </div>
            <div className="hidden md:block w-px h-16 bg-white/10" />
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl md:text-5xl font-black text-primary mb-2">20+</div>
              <div className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">Verified Certifications</div>
            </div>
            <div className="hidden md:block w-px h-16 bg-white/10" />
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl md:text-5xl font-black text-primary mb-2">7+</div>
              <div className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">GenAI Agents Deployed</div>
            </div>
          </div>
        </div>

        <div className="max-w-full mx-auto px-6 md:px-12 lg:px-16 overflow-hidden">
          <div className="mb-32 space-y-12">
             <div className="text-center space-y-4">
                <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase py-1 px-4">System Monitor</Badge>
                <h2 className="text-3xl md:text-5 font-headline font-black uppercase tracking-tighter text-white">
                  Infrastructure <span className="text-primary">Pulse</span>
                </h2>
             </div>
             
             {/* Infinite Marquee Carousel */}
             <div className="w-full relative">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  plugins={[
                    AutoScroll({
                      speed: 1,
                      stopOnInteraction: false,
                      stopOnMouseEnter: true,
                    }),
                  ]}
                  className="w-full"
                >
                  <CarouselContent className="-ml-4">
                    {infrastructurePulseData.map((m, i) => (
                      <CarouselItem key={i} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                        <div className="p-8 glass rounded-[2rem] border-white/10 flex flex-col justify-between h-full hover:bg-primary/5 transition-all group shadow-xl relative overflow-hidden">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />
                           <div className="flex justify-between items-start mb-6 relative z-10">
                              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform border border-white/5">{m.icon}</div>
                              <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded-full border border-white/5">
                                 <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]"></div>
                                 <span className="text-[9px] font-black text-white/70 uppercase tracking-widest">{m.status}</span>
                              </div>
                           </div>
                           <div className="relative z-10">
                              <h3 className="text-2xl font-headline font-black text-white mb-1 group-hover:text-primary transition-colors leading-tight">{m.title}</h3>
                              <div className="text-[10px] font-bold text-primary/60 uppercase tracking-widest mb-4">{m.subtitle}</div>
                              <p className="text-[11px] text-white/50 leading-relaxed font-medium">{m.desc}</p>
                           </div>
                        </div>
                      </CarouselItem>
                    ))}
                    {/* Duplicate for seamless looping if needed by embla, though loop: true handles it */}
                  </CarouselContent>
                </Carousel>
             </div>
          </div>

          <div className="space-y-16 mb-40">
            <div className="text-center space-y-4">
              <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase py-1 px-4">Expertise</Badge>
              <h2 className="text-3xl md:text-5 font-headline font-black uppercase tracking-tighter text-white">
                Core <span className="text-primary">Specialization</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 items-stretch auto-rows-fr">
              {[
                {
                  title: "Natural Language Processing",
                  desc: "Bridging human language and machine understanding through high-precision NLP pipelines and semantic intelligence.",
                  icon: <Brain className="w-8 h-8 text-primary" />,
                  label: "NLP SPECIALIST"
                },
                {
                  title: "Tabular Data Modeling",
                  desc: "Building robust predictive systems from structured data through rigorous feature engineering and cross-validation.",
                  icon: <Database className="w-8 h-8 text-primary" />,
                  label: "DATA SCIENCE"
                },
                {
                  title: "AI Agent Engineering",
                  desc: "Architecting cognitive systems and multi-agent frameworks using modern LLMs. Focused on complex reasoning, context-aware decision making, and RAG pipelines for autonomous problem-solving.",
                  icon: <Sparkles className="w-8 h-8 text-primary" />,
                  label: "REASONING AGENTS"
                },
                {
                  title: "Automation & Orchestration",
                  desc: "Building robust backend ecosystems and automated workflows. Connecting AI services, APIs, and data pipelines to seamlessly power real-world applications like intelligent bots and web interfaces.",
                  icon: <Workflow className="w-8 h-8 text-primary" />,
                  label: "ORCHESTRATION"
                }
              ].map((skill, idx) => (
                <div key={idx} className="p-10 glass rounded-[2.5rem] border-white/5 hover:border-primary/30 transition-all duration-500 group flex flex-col h-full">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    {skill.icon}
                  </div>
                  <div className="min-h-[1.5rem] mb-6">
                    <Badge className="bg-primary/10 text-primary border-none uppercase text-[10px] font-bold tracking-widest w-fit">{skill.label}</Badge>
                  </div>
                  <h3 className="text-xl md:text-2xl font-headline font-bold text-white mb-4 leading-tight min-h-[5.5rem] flex items-start">
                    {skill.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed font-medium flex-1 min-h-[6rem]">
                    {skill.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="w-full p-10 md:p-16 glass rounded-[3rem] border border-primary/20 relative overflow-hidden group hover:bg-primary/5 transition-all duration-700">
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full -mr-32 -mt-32 group-hover:bg-primary/20 transition-all" />
               <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                  <div className="w-20 h-20 md:w-28 md:h-28 rounded-[2rem] bg-white/5 flex items-center justify-center shrink-0 shadow-2xl group-hover:scale-110 transition-transform border border-white/10">
                     <Code2 className="w-10 h-10 md:w-14 md:h-14 text-primary" />
                  </div>
                  <div className="space-y-4 text-center md:text-left flex-1">
                     <div className="flex flex-col md:flex-row items-center gap-4">
                        <Badge className="bg-primary text-white font-black px-4 py-1 uppercase text-[10px] tracking-widest">Philosophy</Badge>
                        <h3 className="text-2xl md:text-4xl font-headline font-black text-white uppercase tracking-tighter">
                           Vibe <span className="text-primary">Coding</span>
                        </h3>
                     </div>
                     <p className="text-white/70 text-base md:text-xl font-medium leading-relaxed max-w-4xl">
                        Vibe Coding is the art of intent-driven development. I leverage this philosophy to build products outside my primary expertise—such as Computer Vision, Web, and Mobile development—while significantly accelerating repetitive workflows through a seamless synergy between human intuition and AI execution.
                     </p>
                  </div>
               </div>
            </div>
          </div>

          <div className="mb-40 space-y-16">
             <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div className="space-y-4">
                   <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase py-1 px-4">Portfolio Highlights</Badge>
                   <h2 className="text-3xl md:text-5 font-headline font-black uppercase tracking-tighter text-white">
                     Featured <span className="text-primary">Projects</span>
                   </h2>
                </div>
                <Link href="/projects">
                   <Button variant="link" className="text-primary font-headline font-bold uppercase tracking-widest p-0 h-auto group">
                      Explore Full Repo <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </Button>
                </Link>
             </div>
             
             <div className="w-full">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  plugins={[
                    AutoScroll({
                      speed: 1,
                      stopOnInteraction: false,
                      stopOnMouseEnter: true,
                    }),
                  ]}
                  className="w-full"
                >
                  <CarouselContent className="-ml-4">
                    {featuredProjects.map((p, i) => (
                      <CarouselItem key={i} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                        <a 
                          href={p.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="block h-full"
                        >
                          <div className="p-10 glass rounded-[2.5rem] border-white/10 flex flex-col justify-between h-full hover:border-primary/50 transition-all group relative">
                             <div className="flex flex-col flex-1">
                                <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-3 min-h-[1.5rem]">{p.type}</div>
                                
                                <div className="mb-4">
                                   <Badge className="bg-primary text-white font-black uppercase tracking-widest text-[9px] px-3 py-1 shadow-2xl border-none">
                                     {p.impact}
                                   </Badge>
                                </div>

                                <div className="min-h-[5.5rem] flex items-start">
                                  <h3 className="text-2xl font-headline font-bold text-white mb-4 group-hover:text-primary transition-colors leading-tight">{p.title}</h3>
                                </div>
                                <div className="min-h-[6.5rem] flex-1">
                                  <p className="text-sm text-white/60 leading-relaxed mb-8 line-clamp-3">{p.desc}</p>
                                </div>
                             </div>
                             <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{p.tech}</span>
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary transition-all duration-300">
                                   <ExternalLink className="w-4 h-4 text-white" />
                                </div>
                             </div>
                          </div>
                        </a>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
             </div>
          </div>

          <div className="mb-40 space-y-16">
            <div className="text-center space-y-4">
              <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase py-1 px-4">Philosophy</Badge>
              <h2 className="text-3xl md:text-5xl font-headline font-black uppercase tracking-tighter text-white">
                How <span className="text-primary">I Work</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { 
                  step: "01", 
                  title: "Research & Design", 
                  desc: "Deep analysis of problem statements and data exploration to find the most efficient mathematical approach.", 
                  icon: <Terminal className="w-5 h-5" /> 
                },
                { 
                  step: "02", 
                  title: "Architect & Build", 
                  desc: "Constructing modular pipelines and model architectures that are robust, testable, and optimized for latency.", 
                  icon: <Cpu className="w-5 h-5" /> 
                },
                { 
                  step: "03", 
                  title: "Deploy & Scale", 
                  desc: "Transitioning models into production environments via high-performance APIs and containerized microservices.", 
                  icon: <Layers className="w-5 h-5" /> 
                },
                { 
                  step: "04", 
                  title: "Optimization", 
                  desc: "Continuous monitoring and fine-tuning of models to ensure long-term reliability and peak performance.", 
                  icon: <RefreshCw className="w-5 h-5" /> 
                }
              ].map((w, i) => (
                <div key={i} className="p-10 bg-white/[0.03] rounded-[3rem] border border-white/5 hover:border-primary/30 transition-all group relative overflow-hidden h-full flex flex-col shadow-2xl">
                  <div className="absolute top-0 right-0 text-[10rem] font-black text-white/[0.03] group-hover:text-primary/[0.05] leading-none -mr-8 -mt-4 transition-colors select-none pointer-events-none">
                    {w.step}
                  </div>
                  
                  <div className="flex items-center gap-3 mb-10 relative z-10">
                    <div className="text-primary">{w.icon}</div>
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Step {w.step}</span>
                  </div>
                  
                  <h3 className="text-3xl font-headline font-black text-white mb-6 leading-tight relative z-10">{w.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed font-medium flex-1 relative z-10">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-20">
             <div className="w-full p-12 md:p-20 rounded-[3rem] bg-primary flex flex-col items-center text-center space-y-8 shadow-[0_0_50px_rgba(6,182,212,0.3)]">
                <h2 className="text-4xl md:text-6xl font-headline font-black text-white uppercase tracking-tighter max-w-3xl">
                  Ready to Build the <span className="text-black">Future?</span>
                </h2>
                <p className="text-white/90 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
                  Whether you need a custom LLM solution or a high-performance data pipeline, I'm here to help turn your data into intelligence.
                </p>
                <Link href="/contact">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-12 h-16 text-lg font-headline font-black uppercase tracking-widest shadow-2xl transition-all active:scale-95">
                    Start a Project
                  </Button>
                </Link>
             </div>
          </div>
        </div>
      </section>

      <TechMarquee />
    </div>
  );
}
