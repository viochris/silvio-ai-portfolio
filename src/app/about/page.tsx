
"use client"

import React from 'react';
import { Github, Linkedin, Mail, GraduationCap, Target, Zap, ShieldCheck, BarChart3, Users, Download, Eye, Rocket, BrainCircuit, Workflow, Info, Brain, Database, Sparkles, Network, ExternalLink, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const educationData = [
  {
    period: "Aug 2023 - Sep 2027",
    degree: "Bachelor of Informatics Engineering",
    institution: "Universitas Dian Nuswantoro (UDINUS)",
    description: (
      <>
        GPA: 3.95/4.00 (Cumulative GPA in 5th Semester).<br />
        Activities: UKM Dian Nuswantoro Computer Club - DNCC.
      </>
    )
  },
  {
    period: "Jul 2020 - May 2023",
    degree: "High School Diploma, Science",
    institution: "SMA Kristen YSKI",
    description: "Activities: Photography, Entrepreneurship, and Scouting."
  }
];

const technicalMilestones = [
  { year: "2023", event: "Tabular Mastery", desc: "Built predictive models for medical diagnosis on Kaggle." },
  { year: "2024", event: "NLP Revolution", desc: "Developed ATS scoring engines and semantic search APIs." },
  { year: "2025", event: "Agentic Shift", desc: "Orchestrating autonomous agents with LangGraph & Genkit." },
  { year: "2026", event: "Scalable Autonomy", desc: "Deploying multi-agent swarms with robust monitoring and real-time observability." }
];

const orchestrationNodes = [
  { 
    title: "Input Processing", 
    icon: <BrainCircuit className="w-8 h-8 text-primary" />, 
    desc: "Unstructured data is parsed via NLP engines to extract intent and entities.",
    details: "Leveraging state-of-the-art transformer models (SBERT, RoBERTa) to convert raw text into high-dimensional embeddings. We perform semantic classification and named entity recognition (NER) to structure input before passing it to the reasoning layer."
  },
  { 
    title: "Agentic Reasoning", 
    icon: <Workflow className="w-8 h-8 text-primary" />, 
    desc: "LangGraph manages stateful workflows and tool calling for autonomous execution.",
    details: "Utilizing cyclic graph architectures to allow agents to 'think-step-by-step'. The system uses ReAct (Reasoning and Acting) patterns, enabling it to call external tools, validate its own SQL queries, and self-correct logic errors through iterative loops."
  },
  { 
    title: "Output Synthesis", 
    icon: <Rocket className="w-8 h-8 text-primary" />, 
    desc: "Final intelligence is served through high-performance FastAPI and Next.js interfaces.",
    details: "Synthesizing complex reasoning traces into user-friendly formats. The output layer ensures data integrity, applies safety filters, and optimizes latency via streaming responses and edge-cached delivery."
  }
];

const interestData = [
  {
    title: "Natural Language Processing",
    icon: <Brain className="w-10 h-10 text-primary" />,
    desc: "Semantic analysis and linguistic intelligence.",
    details: "My passion for NLP lies in bridging the gap between human language and machine understanding. I specialize in hybrid semantic matching, combining traditional TF-IDF with modern SBERT embeddings to achieve ultra-precise information retrieval. I focus on building tools like ATS optimizers, sentiment engines, and multi-lingual document parsers that can handle nuances in both English and Indonesian.",
    projects: [
      { name: "Resume Scanner API", id: 3, github: "https://github.com/viochris/resume-scanner-api" },
      { name: "Insightify API (NLP)", id: null, github: "https://github.com/viochris/Insightify-Sentiment-API" },
      { name: "DocuTalk-AI (Smart RAG)", id: null, github: "https://github.com/viochris/DocuTalk-AI" }
    ]
  },
  {
    title: "Tabular Data Modeling",
    icon: <Database className="w-10 h-10 text-primary" />,
    desc: "Predictive power from structured datasets.",
    details: "Data is the foundation of every AI system. I enjoy the rigorous process of feature engineering, handling data imbalance using SMOTE/SMOTENC, and building robust classifiers. My background includes replicating academic research for medical diagnosis and health analysis, ensuring that models are not just accurate, but also interpretable and leak-free.",
    projects: [
      { name: "InsightData (AI Analyst)", id: 4, github: "https://github.com/viochris/insight-data-ai-analyst" },
      { name: "Stunting Analysis", id: null, github: "https://github.com/viochris/Stunting-prediction-project" },
      { name: "Diabetes Prediction", id: null, github: "https://github.com/viochris/Diabetes-prediction-fine-tuned-project" }
    ]
  },
  {
    title: "AI Agent Engineering",
    icon: <Sparkles className="w-10 h-10 text-primary" />,
    desc: "Building autonomous reasoning engines.",
    details: "Agentic AI is the future of productivity. I am deeply interested in building 'reasoning agents' that don't just generate text, but actively problem-solve. By utilizing LangGraph and ReAct architectures, I create systems that can query databases, call external APIs, and self-correct their own logic errors. This interest drives me to build production-ready agents like InsightSQL and financial OCR assistants.",
    projects: [
      { name: "InsightSQL (LangGraph)", id: 1, github: "https://github.com/viochris/InsightSQL-LangGraph-Engine-Web" },
      { name: "SpendSense (Financial AI)", id: 2, github: "https://github.com/viochris/Streamlit-SpendSense" },
      { name: "NovaCal AI (Telegram)", id: null, github: "https://github.com/viochris/telegram-calendar-ai-bot.git" }
    ]
  }
];

export default function AboutPage() {
  const cvRawLink = "/vio-cv.pdf";

  return (
    <div className="pt-32 lg:pt-40 pb-24 px-6 md:px-12 lg:px-16 min-h-screen">
      <section id="about" className="max-w-7xl mx-auto">
        {/* Section: Experience & Education */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 w-full items-start mb-32">
          {/* LEFT COLUMN: Text + Icons */}
          <div className="w-full lg:w-1/2 flex flex-col space-y-6">
            <div className="space-y-6">
              <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase px-4">The Journey</Badge>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black uppercase tracking-tighter text-foreground">
                About <span className="text-primary">Experience</span>
              </h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed text-lg lg:text-xl font-medium">
              My journey as a <strong>Data Scientist and AI Engineer</strong> is driven by a passion for transforming raw data into intelligent systems. On the data science front, I specialize in analyzing <strong>Tabular Data</strong> to build robust predictive models and applying <strong>Natural Language Processing (NLP)</strong> to extract meaning from unstructured text.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg lg:text-xl font-medium">
              Beyond traditional modeling, my work as an AI Engineer focuses on developing <strong>autonomous AI Agents</strong>. I build practical, task-oriented systems using modern LLM frameworks—implementing RAG pipelines, engineering conversational bots, and creating ReAct agents that can independently reason and execute complex workflows.
            </p>

            <div className="flex gap-4 sm:gap-6 pt-4">
              <Button variant="outline" size="icon" className="w-14 h-14 rounded-2xl text-primary hover:bg-primary/10 border-primary/20 transition-all" asChild>
                <a href="https://github.com/viochris" target="_blank" rel="noopener noreferrer">
                  <Github className="w-6 h-6" />
                </a>
              </Button>
              <Button variant="outline" size="icon" className="w-14 h-14 rounded-2xl text-primary hover:bg-primary/10 border-primary/20 transition-all" asChild>
                <a href="https://www.linkedin.com/in/silvio-christian-joe" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-6 h-6" />
                </a>
              </Button>
              <Button variant="outline" size="icon" className="w-14 h-14 rounded-2xl text-primary hover:bg-primary/10 border-primary/20 transition-all" asChild>
                <a href="mailto:viochristian12@gmail.com">
                  <Mail className="w-6 h-6" />
                </a>
              </Button>
            </div>
          </div>

          {/* RIGHT COLUMN: Education Roadmap */}
          <div className="w-full lg:w-1/2">
            <div className="p-8 md:p-10 lg:p-12 glass rounded-[2.5rem] border-primary/10 shadow-2xl">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <GraduationCap className="text-primary" size={28} />
                  <h2 className="text-2xl font-black text-white tracking-widest uppercase">Education Roadmap</h2>
                </div>

                <div className="relative border-l-2 border-slate-800 dark:border-slate-700 ml-3 md:ml-4">
                  {educationData.map((edu, index) => (
                    <div key={index} className="mb-10 ml-8 relative group">
                      <span className="absolute flex items-center justify-center w-4 h-4 bg-primary rounded-full -left-[35px] top-1 ring-4 ring-slate-50 dark:ring-slate-900 group-hover:scale-125 transition-transform duration-300"></span>
                      <div className="flex flex-col">
                        <span className="text-primary font-bold text-sm mb-1 tracking-wider">{edu.period}</span>
                        <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-1">{edu.degree}</h3>
                        <h4 className="text-base md:text-lg text-slate-600 dark:text-slate-300 font-medium mb-3">{edu.institution}</h4>
                        <div className="text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-3xl">
                          {edu.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Technical Evolution */}
        <div className="mb-32 space-y-16">
           <div className="text-center space-y-4">
              <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase py-1 px-4">Evolution</Badge>
              <h2 className="text-3xl md:text-5 font-headline font-black uppercase tracking-tighter text-white">
                Technical <span className="text-primary">Milestones</span>
              </h2>
           </div>
           
           <div className="relative max-w-5xl mx-auto px-12">
              <Carousel 
                opts={{
                  align: "start",
                  loop: false,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {technicalMilestones.map((m, i) => (
                    <CarouselItem key={i} className="pl-4 basis-full md:basis-1/2">
                      <div className="p-10 glass rounded-[2.5rem] border-white/5 flex flex-col items-center text-center group hover:bg-primary/5 transition-all h-full">
                        <div className="text-3xl font-headline font-black text-primary/20 group-hover:text-primary transition-colors mb-4">{m.year}</div>
                        <h4 className="text-xl font-headline font-bold text-white mb-2 uppercase tracking-widest">{m.event}</h4>
                        <p className="text-sm text-white/50 leading-relaxed">{m.desc}</p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-12 h-10 w-10 border-white/10 hover:bg-primary hover:text-white" />
                <CarouselNext className="hidden md:flex -right-12 h-10 w-10 border-white/10 hover:bg-primary hover:text-white" />
              </Carousel>
           </div>
        </div>

        {/* Section: Professional Interests & Deep Dive */}
        <div id="interests" className="mb-32 scroll-mt-32">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase py-1 px-4">Passions</Badge>
            <h2 className="text-3xl md:text-5xl font-headline font-black uppercase tracking-tighter text-white">
              Professional <span className="text-primary">Interests</span>
            </h2>
            <p className="text-white/40 text-xs font-bold tracking-widest uppercase mt-2">Click cards to explore methodology and related work</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {interestData.map((item, i) => (
              <Dialog key={i}>
                <DialogTrigger asChild>
                  <div className="p-10 glass rounded-[3rem] border border-white/5 hover:border-primary/50 transition-all group cursor-pointer flex flex-col items-center text-center shadow-xl hover:bg-primary/5">
                    <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <h4 className="text-xl font-headline font-bold text-white mb-4 uppercase tracking-widest group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-white/50 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </DialogTrigger>
                <DialogContent className="bg-card/95 backdrop-blur-xl border-border rounded-[2.5rem] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-4 text-2xl md:text-3xl font-headline font-bold text-foreground mb-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        {item.icon}
                      </div>
                      {item.title}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-8">
                    {/* Methodology Section */}
                    <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                      <h6 className="text-primary font-bold uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                        <BrainCircuit className="w-4 h-4" /> Methodology & Vision
                      </h6>
                      <p className="text-foreground leading-relaxed text-sm font-medium">
                        {item.details}
                      </p>
                    </div>

                    {/* Top 3 Projects Section */}
                    <div className="space-y-4">
                      <h6 className="text-foreground font-black uppercase tracking-[0.2em] text-xs px-2">Top Related Projects</h6>
                      <div className="grid gap-3">
                        {item.projects.map((proj, idx) => (
                          <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all group/proj">
                            <span className="text-sm font-bold text-white group-hover/proj:text-primary transition-colors mb-3 sm:mb-0">
                              {proj.name}
                            </span>
                            <div className="flex items-center gap-3">
                              {proj.id && (
                                <Link href={`/projects#project-${proj.id}`}>
                                  <Button variant="ghost" size="sm" className="h-8 px-3 rounded-lg text-[10px] font-black uppercase tracking-widest bg-white/5 hover:bg-primary hover:text-white transition-all gap-1.5">
                                    <Eye className="w-3 h-3" /> Project Details
                                  </Button>
                                </Link>
                              )}
                              <a href={proj.github} target="_blank" rel="noopener noreferrer">
                                <Button variant="ghost" size="sm" className="h-8 px-3 rounded-lg text-[10px] font-black uppercase tracking-widest bg-white/5 hover:bg-primary hover:text-white transition-all gap-1.5">
                                  <Github className="w-3 h-3" /> Repository
                                </Button>
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>

        {/* Section: Project Architecture */}
        <div className="p-10 md:p-16 lg:p-24 glass rounded-[4rem] border-primary/10 relative overflow-hidden mb-32">
           <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full -mr-48 -mt-48" />
           <div className="relative z-10 space-y-16">
              <div className="text-center space-y-4">
                 <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase py-1 px-4">System Logic</Badge>
                 <h3 className="text-3xl md:text-5xl font-headline font-black uppercase tracking-tighter text-white">
                   AI Engine <span className="text-primary">Orchestration</span>
                 </h3>
                 <p className="text-white/40 text-xs font-bold tracking-widest uppercase mt-2">Click elements for technical deep-dive</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                 {orchestrationNodes.map((arch, i) => (
                   <Dialog key={i}>
                     <DialogTrigger asChild>
                       <div className="space-y-6 text-center cursor-pointer group">
                          <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 group-hover:border-primary/50 transition-all">
                             {arch.icon}
                          </div>
                          <h5 className="text-xl font-bold text-white uppercase tracking-widest group-hover:text-primary transition-colors">{arch.title}</h5>
                          <p className="text-white/50 text-sm leading-relaxed">{arch.desc}</p>
                       </div>
                     </DialogTrigger>
                     <DialogContent className="bg-card/95 backdrop-blur-xl border-border rounded-[2.5rem] sm:max-w-xl">
                       <DialogHeader>
                         <DialogTitle className="flex items-center gap-4 text-2xl font-headline font-bold text-foreground mb-4">
                           {arch.icon}
                           {arch.title}
                         </DialogTitle>
                       </DialogHeader>
                       <div className="space-y-6">
                         <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                           <h6 className="text-primary font-bold uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                             <Info className="w-4 h-4" /> Technical Documentation
                           </h6>
                           <p className="text-foreground leading-relaxed text-sm font-medium">
                             {arch.details}
                           </p>
                         </div>
                       </div>
                     </DialogContent>
                   </Dialog>
                 ))}
              </div>
           </div>
        </div>

        {/* Section: GitHub Performance */}
        <div className="mb-32 space-y-16">
          <div className="w-full flex flex-col items-center justify-center text-center gap-4 mb-8">
            <div className="flex flex-col items-center justify-center gap-2 w-full">
              <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase px-4">Activity</Badge>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-2">
                <BarChart3 className="text-primary w-8 h-8 sm:w-10 sm:h-10" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">GitHub Performance</h2>
              </div>
            </div>
          </div>
          
          <div className="w-full px-4 sm:px-0 flex flex-col gap-6 max-w-full overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 p-6 rounded-3xl bg-[#0d1117] border border-slate-800 w-full shadow-2xl">
              <img 
                src="https://github-readme-streak-stats.herokuapp.com/?user=viochris&theme=radical&hide_border=true" 
                alt="GitHub Streak" 
                className="w-full h-auto max-w-lg object-contain"
              />
            </div>
          </div>
        </div>

        {/* Section: Connect & Resume */}
        <div className="text-center space-y-12">
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-headline font-bold uppercase tracking-widest text-white">Connect & Resume</h3>
            <Separator className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </div>
          
          <div className="w-full max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-8">
            <a 
              href={cvRawLink} 
              download="vio-cv.pdf" 
              className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-bold text-white transition-all shadow-md hover:shadow-xl transform hover:-translate-y-1 bg-primary"
            >
              <Download className="w-5 h-5" /> DOWNLOAD CV
            </a>

            <Dialog>
              <DialogTrigger asChild>
                <button 
                  className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-bold text-white transition-all shadow-md hover:shadow-xl transform hover:-translate-y-1 border border-primary/50"
                >
                  <Eye className="w-5 h-5" /> VIEW CV
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-4xl w-[95vw] h-[90vh] bg-card/95 backdrop-blur-xl border-border rounded-[2rem] flex flex-col">
                <DialogHeader className="pb-4 border-b border-border">
                  <DialogTitle className="text-2xl font-headline font-bold text-foreground">Curriculum Vitae Preview</DialogTitle>
                </DialogHeader>
                <div className="flex-1 w-full mt-4 overflow-hidden rounded-xl border border-border bg-black/20">
                  <iframe 
                    src={`${cvRawLink}#view=FitH&toolbar=0`} 
                    className="w-full h-full border-none"
                    title="CV Preview"
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>
    </div>
  );
}
