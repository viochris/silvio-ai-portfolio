"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronRight, Brain, Database, Sparkles, Terminal, Cpu, Layers, BarChart4, RefreshCw, Activity, Zap, Shield, Code2, ExternalLink } from 'lucide-react';
import { TypewriterEffect } from '@/components/TypewriterEffect';
import { TechMarquee } from '@/components/TechMarquee';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const statItems = [
  { value: "15+", label: "PROJECTS COMPLETED" },
  { value: "20+", label: "VERIFIED CERTIFICATIONS" },
  { value: "7+", label: "GENAI AGENTS DEPLOYED" }
];

const featuredProjects = [
  { 
    title: "InsightSQL (LangGraph)", 
    type: "GenAI Engine",
    desc: "Autonomous SQL agent with cyclic reasoning and self-correction.",
    tech: "LangGraph • Gemini"
  },
  { 
    title: "SpendSense", 
    type: "Data Science",
    desc: "Conversational finance app with OCR and Pandas reasoning.",
    tech: "LangChain • Vision"
  },
  { 
    title: "Resume Scanner API", 
    type: "NLP / Backend",
    desc: "Dual-engine ATS API using SBERT & TF-IDF semantic matching.",
    tech: "FastAPI • SBERT"
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
        
        {/* Main Hero Container */}
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:pt-12 lg:pb-20">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-0">
            
            {/* LEFT COLUMN: Avatar */}
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
                      alt="Silvio Christian Joe" 
                      width={320}
                      height={320}
                      priority
                      className="w-full h-full object-cover rounded-full transition-opacity duration-500"
                    />
                  </div>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20">
                    <Badge className="bg-primary text-white px-8 py-2 shadow-2xl font-headline font-black text-[10px] md:text-xs tracking-[0.2em] uppercase border-none whitespace-nowrap rounded-full">
                      AI Engineer
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Text */}
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl mx-auto lg:mx-0 lg:pl-4 space-y-6">
              <div className="space-y-4 w-full">
                <div className="space-y-4">
                  <Badge variant="outline" className="text-primary font-headline uppercase tracking-[0.3em] py-1.5 border-primary/30 text-[10px] md:text-xs">
                    Data Scientist & AI Engineer
                  </Badge>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-black leading-tight tracking-tighter text-white">
                    Silvio Christian <span className="text-primary">Joe</span>
                  </h1>
                </div>
                
                <div className="flex items-center justify-center lg:justify-start gap-2 text-xl md:text-2xl lg:text-3xl font-headline text-white/90 min-h-[40px] animate-fade-in whitespace-nowrap overflow-hidden" style={{ animationDelay: '0.2s' }}>
                  <span>I</span>
                  <TypewriterEffect />
                </div>
                
                <p className="text-base md:text-lg text-white/80 leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
                  I am an Informatics Engineering student working as a <strong>Data Scientist</strong> and <strong>AI Engineer</strong>. My technical focus involves analyzing <strong>Tabular & NLP data</strong>, as well as developing functional <strong>AI Agents</strong> for practical applications.
                </p>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 w-full">
                <Link href="/projects">
                  <Button size="lg" className="rounded-full px-10 font-headline uppercase font-bold tracking-widest h-14 w-full sm:w-auto shadow-lg shadow-primary/20">
                    View Projects <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="rounded-full px-10 font-headline uppercase font-bold tracking-widest h-14 border-white/20 text-white hover:bg-white/10 w-full sm:w-auto">
                    Contact Me
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          {/* Row 2: AI Infrastructure Monitor */}
          <div className="mb-32 space-y-12">
             <div className="text-center space-y-4">
                <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase py-1 px-4">AI Service Infrastructure</Badge>
                <h2 className="text-3xl md:text-5 font-headline font-black uppercase tracking-tighter text-white">
                  System <span className="text-primary">Integrity</span>
                </h2>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch auto-rows-fr">
                {[
                  { label: "Inference Latency", val: "Optimized", icon: <Zap className="text-yellow-400" />, desc: "High-speed response via edge-optimized models" },
                  { label: "Model Reliability", val: "High Stability", icon: <Shield className="text-green-400" />, desc: "Continuous uptime for deployed AI agents" },
                  { label: "Deployment Nodes", val: "Production", icon: <Activity className="text-blue-400" />, desc: "Currently active cloud-hosted AI workflows" },
                  { label: "Data Pipeline", val: "Automated", icon: <Code2 className="text-purple-400" />, desc: "ETL pipelines managed with stateful orchestration" }
                ].map((m, i) => (
                  <div key={i} className="p-8 glass rounded-[2rem] border-white/10 flex flex-col justify-between h-full hover:bg-primary/5 transition-all group">
                     <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">{m.icon}</div>
                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">LIVE</span>
                     </div>
                     <div>
                        <div className="text-3xl font-headline font-black text-white mb-2">{m.val}</div>
                        <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2">{m.label}</div>
                        <p className="text-[10px] text-white/50 leading-relaxed">{m.desc}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Row 3: Core Focus */}
          <div className="space-y-16 mb-40">
            <div className="text-center space-y-4">
              <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase py-1 px-4">Expertise</Badge>
              <h2 className="text-3xl md:text-5 font-headline font-black uppercase tracking-tighter text-white">
                Core <span className="text-primary">Focus</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 items-stretch auto-rows-fr">
              {[
                {
                  title: "Natural Language Processing",
                  desc: "Analyzing text data to extract meaningful insights, from sentiment analysis to building custom document-processing tools.",
                  icon: <Brain className="w-8 h-8 text-primary" />,
                  label: "NLP"
                },
                {
                  title: "Tabular Data Modeling",
                  desc: "Cleaning and engineering features from structured datasets to build reliable predictive models for real-world scenarios.",
                  icon: <Database className="w-8 h-8 text-primary" />,
                  label: "DATA"
                },
                {
                  title: "AI Agent Engineering",
                  desc: "Developing intelligent, task-oriented agents using LLM frameworks to automate workflows and solve complex reasoning tasks.",
                  icon: <Sparkles className="w-8 h-8 text-primary" />,
                  label: "GenAI"
                },
                {
                  title: "Predictive Analytics",
                  desc: "Applying machine learning techniques to discover patterns in data and generate actionable forecasts.",
                  icon: <BarChart4 className="w-8 h-8 text-primary" />,
                  label: "Analytic"
                }
              ].map((skill, idx) => (
                <div key={idx} className="p-10 glass rounded-[2.5rem] border-white/5 hover:border-primary/30 transition-all duration-500 group flex flex-col h-full">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    {skill.icon}
                  </div>
                  <Badge className="bg-primary/10 text-primary border-none mb-6 uppercase text-[10px] font-bold tracking-widest w-fit">{skill.label}</Badge>
                  <h3 className="text-xl md:text-2xl font-headline font-bold text-white mb-4 leading-tight min-h-[3.5rem] flex items-start">
                    {skill.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed font-medium flex-1">
                    {skill.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Row 4: Featured Projects Preview */}
          <div className="mb-40 space-y-16">
             <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div className="space-y-4">
                   <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase py-1 px-4">Portfolio Highlights</Badge>
                   <h2 className="text-3xl md:text-5 font-headline font-black uppercase tracking-tighter text-white">
                     Featured <span className="text-primary">Work</span>
                   </h2>
                </div>
                <Link href="/projects">
                   <Button variant="link" className="text-primary font-headline font-bold uppercase tracking-widest p-0 h-auto group">
                      Explore Full Repo <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </Button>
                </Link>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch auto-rows-fr">
                {featuredProjects.map((p, i) => (
                  <div key={i} className="p-10 glass rounded-[2.5rem] border-white/10 flex flex-col justify-between h-full hover:border-primary/50 transition-all group">
                     <div>
                        <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">{p.type}</div>
                        <h3 className="text-2xl font-headline font-bold text-white mb-4 group-hover:text-primary transition-colors">{p.title}</h3>
                        <p className="text-sm text-white/60 leading-relaxed mb-8">{p.desc}</p>
                     </div>
                     <div className="flex items-center justify-between pt-6 border-t border-white/5">
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{p.tech}</span>
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors">
                           <ExternalLink className="w-3.5 h-3.5 text-white" />
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Row 5: My Workflow */}
          <div className="mb-40 space-y-16">
            <div className="text-center space-y-4">
              <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase py-1 px-4">Philosophy</Badge>
              <h2 className="text-3xl md:text-5 font-headline font-black uppercase tracking-tighter text-white">
                How I <span className="text-primary">Work</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 items-stretch auto-rows-fr">
              {[
                {
                  title: "Research & Design",
                  desc: "Deep analysis of problem statements and data exploration to find the most efficient mathematical approach.",
                  icon: <Terminal className="w-6 h-6" />,
                  step: "01"
                },
                {
                  title: "Architect & Build",
                  desc: "Constructing modular pipelines and model architectures that are robust, testable, and optimized for latency.",
                  icon: <Cpu className="w-6 h-6" />,
                  step: "02"
                },
                {
                  title: "Deploy & Scale",
                  desc: "Transitioning models into production environments via high-performance APIs and containerized microservices.",
                  icon: <Layers className="w-6 h-6" />,
                  step: "03"
                },
                {
                  title: "Optimization",
                  desc: "Continuous monitoring and fine-tuning of models to ensure long-term reliability and peak performance.",
                  icon: <RefreshCw className="w-6 h-6" />,
                  step: "04"
                }
              ].map((item, idx) => (
                <div key={idx} className="relative p-12 bg-white/5 rounded-[3rem] border border-white/10 overflow-hidden group flex flex-col h-full">
                  <div className="absolute -top-4 -right-2 text-8xl md:text-9xl font-black text-slate-200/50 dark:text-slate-700/30 z-0 select-none pointer-events-none transition-transform group-hover:scale-110">
                    {item.step}
                  </div>
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="text-primary">{item.icon}</div>
                      <span className="text-primary font-mono text-sm font-bold tracking-widest uppercase">
                        STEP {item.step}
                      </span>
                    </div>
                    <h3 className="text-2xl font-headline font-bold text-white mb-4 leading-tight min-h-[3rem] flex items-start">
                      {item.title}
                    </h3>
                    <p className="text-white/60 font-medium leading-relaxed flex-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 6: CTA Section */}
          <div className="mb-20">
            <div className="relative flex flex-col items-center justify-center text-center p-8 md:p-12 lg:p-16 gap-8 md:gap-10 rounded-[3rem] bg-primary overflow-hidden shadow-2xl shadow-primary/30 w-full h-auto">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent pointer-events-none" />
              
              <div className="relative z-10 space-y-6 max-w-3xl">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-headline font-black uppercase tracking-tighter text-white">
                  Ready to Build the <span className="text-black">Future?</span>
                </h2>
                <p className="text-lg md:text-xl text-white/90 font-medium mx-auto">
                  Whether you need a custom LLM solution or a high-performance data pipeline, I'm here to help turn your data into intelligence.
                </p>
              </div>
              
              <div className="relative z-10 w-full flex justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-12 h-16 text-lg font-headline font-black uppercase tracking-widest shadow-xl transition-transform active:scale-95">
                    Start a Project
                  </Button>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      <TechMarquee />
    </div>
  );
}
