"use client"

import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, GraduationCap, BarChart3, Users, Download, Eye, BrainCircuit, Workflow, Brain, Database, Sparkles, Code2, ChevronLeft, ChevronRight, Rocket, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
        GPA: 3.95/4.00 (Cumulative GPA as of 5th Semester).<br />
        Focusing on AI Development, Data Engineering, and Computational Logic.
      </>
    )
  },
  {
    period: "Jul 2020 - May 2023",
    degree: "High School Diploma, Science",
    institution: "SMA Kristen YSKI",
    description: "Built foundational skills in logic and science while exploring early digital creative work."
  }
];

const technicalMilestones = [
  {
    year: "2023",
    title: "WEB & CODING FOUNDATIONS",
    shortSummary: "Started programming journey with a focus on frontend web development and UI design.",
    details: [
      "Began learning programming from scratch in Semester 1",
      "Explored frontend web development: HTML, CSS, JavaScript",
      "Developed strong interest in UI/UX design principles and visual aesthetics",
      "Focused on building clean, responsive, and visually appealing interfaces"
    ]
  },
  {
    year: "Early 2024",
    title: "DATA ANALYTICS ENTRY",
    shortSummary: "Dived into data analytics through SQL and Python data libraries.",
    details: [
      "Learned SQL for querying and manipulating relational databases",
      "Explored Python data stack: Pandas for data wrangling, NumPy for numerical computing",
      "Studied data cleaning, transformation, and exploratory data analysis (EDA) techniques",
      "Applied knowledge to small analytical exercises and datasets"
    ]
  },
  {
    year: "2024",
    title: "BI TOOLS & VISUALIZATION",
    shortSummary: "Explored major data analytics and business intelligence tools.",
    details: [
      "Practiced data visualization with Tableau and Looker Studio",
      "Used Microsoft Power BI for dashboard creation and reporting",
      "Leveraged Microsoft Excel for data analysis, pivot tables, and charting",
      "Built end-to-end analytical workflows from raw data to visual insight"
    ]
  },
  {
    year: "Mid 2024",
    title: "ML & DL EXPLORATION",
    shortSummary: "Explored machine learning and deep learning across multiple domains.",
    details: [
      "Studied and implemented Machine Learning (ML) and Deep Learning (DL) models",
      "Explored three major domains: Computer Vision, NLP, and Tabular Data",
      "Experimented with image and video processing tasks",
      "Built familiarity with model training pipelines and frameworks (TensorFlow / PyTorch)"
    ]
  },
  {
    year: "Late 2024 – Early 2025",
    title: "THEORETICAL DEEPDIVE",
    shortSummary: "Strengthened fundamentals through deep theoretical study of statistics and ML concepts.",
    details: [
      "Mastered the 'why' before the 'how' through pure theoretical study",
      "Studied statistical hypothesis testing: T-Test, Z-Test, ANOVA",
      "Learned evaluation metrics for Regression, Classification, Forecasting, and Clustering",
      "Explored time-series forecasting models: ARIMA, SARIMA, SARIMAX",
      "Learned to use Hugging Face pipelines for pre-trained model implementation"
    ]
  },
  {
    year: "2025 – Present",
    title: "PROJECT & AGENTIC ERA",
    shortSummary: "Building end-to-end ML, autonomous AI Agents, and mastering Vibe Coding.",
    details: [
      "Transitioned to active, project-based learning with an AI-first approach",
      "Building end-to-end ML/DL projects from raw data to production-ready deployment",
      "Architecting autonomous AI Agents and high-performance automation workflows",
      "Embracing the 'Vibe Coding' philosophy—engineering with intuition and rapid AI iteration"
    ]
  }
];

const orchestrationNodes = [
  { 
    title: "Input Processing", 
    icon: <BrainCircuit className="w-8 h-8 text-primary" />, 
    desc: "Unstructured data is parsed via NLP engines to extract intent and entities.",
    details: "Leveraging state-of-the-art transformer models (SBERT, RoBERTa) to convert raw text into high-dimensional embeddings. Semantic classification and NER structure input before the reasoning phase."
  },
  { 
    title: "Agentic Reasoning", 
    icon: <Workflow className="w-8 h-8 text-primary" />, 
    desc: "LangGraph manages stateful workflows and tool calling for autonomous execution.",
    details: "Utilizing cyclic graph architectures to allow agents to think step-by-step. ReAct patterns enable external tool calling, SQL validation, and iterative self-correction."
  },
  { 
    title: "Output Synthesis", 
    icon: <Rocket className="w-8 h-8 text-primary" />, 
    desc: "Final intelligence is served through high-performance FastAPI and Next.js interfaces.",
    details: "Synthesizing complex reasoning traces into user-friendly formats. The output layer ensuring data integrity, safety filters, and optimized latency via streaming."
  }
];

const interestData = [
  {
    title: "Natural Language Processing",
    icon: <Brain className="w-10 h-10 text-primary" />,
    desc: "Bridging human language and machine understanding.",
    details: "Focused on bridging the gap between human language and machine understanding through modern NLP pipelines tailored to specific needs. Specializes in sophisticated semantic matching techniques to achieve high-precision information retrieval.",
    projects: [
      { name: "Resume Scanner API", id: null, github: "https://github.com/viochris/resume-scanner-api" },
      { name: "Insightify API (NLP Sentiment)", id: null, github: "https://github.com/viochris/Insightify-Sentiment-API" },
      { name: "DocuTalk-AI (Smart RAG)", id: null, github: "https://github.com/viochris/DocuTalk-AI" }
    ]
  },
  {
    title: "Tabular Data Modeling",
    icon: <Database className="w-10 h-10 text-primary" />,
    desc: "Predictive power from structured foundations.",
    details: "Building robust predictive models across diverse domains through rigorous feature engineering and cross-validation. Ensures models are not only accurate but also interpretable and reliable for real-world deployment.",
    projects: [
      { name: "Stunting Analysis (Medical)", id: null, github: "https://github.com/viochris/Stunting-prediction-project" },
      { name: "Diabetes Prediction (Tuned)", id: null, github: "https://github.com/viochris/Diabetes-prediction-fine-tuned-project" },
      { name: "Coming Soon", id: null, github: "#" }
    ]
  },
  {
    title: "AI Agent Engineering",
    icon: <Sparkles className="w-10 h-10 text-primary" />,
    desc: "Building autonomous reasoning engines.",
    details: "Designing advanced reasoning systems and multi-agent frameworks using Google SDK, CrewAI, and LangChain. Enables systems to perform complex tasks, call external APIs, and self-correct logic autonomously.",
    projects: [
      { name: "InsightSQL (LangGraph)", id: null, github: "https://github.com/viochris/InsightSQL-LangGraph-Engine-Web" },
      { name: "SpendSense (Financial AI)", id: null, github: "https://github.com/viochris/Streamlit-SpendSense" },
      { name: "NovaCal AI (Telegram)", id: null, github: "https://github.com/viochris/telegram-calendar-ai-bot.git" }
    ]
  },
  {
    title: "Automation & Orchestration",
    icon: <Workflow className="w-10 h-10 text-primary" />,
    desc: "High-performance AI ecosystems.",
    details: "Focused on building high-performance AI ecosystems where services connect seamlessly. Architecting stateful agents for automated workflows, inbox management, and real-time data pipelines to maximize efficiency.",
    projects: [
      { name: "Daily Agenda Broadcaster", id: null, github: "https://github.com/viochris/auto-daily-scheduler.git" },
      { name: "NovaMail AI (Autoresponder)", id: null, github: "https://github.com/viochris/NovaMail-AI-Autoresponder.git" },
      { name: "Daily AI News Digest", id: null, github: "https://github.com/viochris/daily-ai-news-digest" }
    ]
  },
  {
    title: "Vibe Coding",
    icon: <Code2 className="w-10 h-10 text-primary" />,
    desc: "The AI-first digital experience.",
    details: "A philosophy where engineering meets intuition. Prioritizing clean, modular, and AI-first coding practices. This approach bridges AI expertise into web and mobile development, ensuring smooth and high-performing human-machine interaction.",
    projects: [
      { name: "Coming Soon", id: null, github: "#" },
      { name: "Coming Soon", id: null, github: "#" },
      { name: "Coming Soon", id: null, github: "#" }
    ]
  }
];

export default function AboutPage() {
  const cvRawLink = "/vio-cv.pdf";
  const [ghStats, setGhStats] = useState({ repos: 0, stars: 0, followers: 0, latestCommit: '' });
  const [loadingGh, setLoadingGh] = useState(true);

  const [openMilestoneIdx, setOpenMilestoneIdx] = useState<number | null>(null);
  const [openInterestIdx, setOpenInterestIdx] = useState<number | null>(null);
  const [openArchIdx, setOpenArchIdx] = useState<number | null>(null);

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const [userRes, reposRes, eventsRes] = await Promise.all([
          fetch('https://api.github.com/users/viochris'),
          fetch('https://api.github.com/users/viochris/repos?per_page=100'),
          fetch('https://api.github.com/users/viochris/events/public')
        ]);

        const userData = await userRes.json();
        const reposData = await reposRes.json();
        const eventsData = await eventsRes.json();

        const totalStars = reposData.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0);
        const pushEvent = eventsData.find((e: any) => e.type === 'PushEvent');
        const lastCommit = pushEvent?.payload?.commits?.[0]?.message || 'Active Development';

        setGhStats({
          repos: userData.public_repos || 0,
          stars: totalStars,
          followers: userData.followers || 0,
          latestCommit: lastCommit
        });
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
      } finally {
        setLoadingGh(false);
      }
    }
    fetchGitHubData();
  }, []);

  return (
    <div className="pt-32 lg:pt-40 pb-24 px-6 md:px-12 lg:px-16 min-h-screen">
      <section id="about" className="max-w-7xl mx-auto">
        {/* Section: Experience & Education */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 w-full items-start mb-32">
          {/* LEFT COLUMN: Text + Icons */}
          <div className="w-full lg:w-1/2 flex flex-col space-y-6">
            <div className="space-y-6">
              <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase px-4">The Architect</Badge>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black uppercase tracking-tighter text-foreground">
                About <span className="text-primary">Me</span>
              </h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed text-lg lg:text-xl font-medium">
              I am Silvio Christian, Joe (Vio), an Informatics Engineering student at UDINUS. My core focus is building intelligent systems that bridge data and intelligence—ranging from <strong>high-precision NLP pipelines</strong> and <strong>robust tabular models</strong> to <strong>autonomous AI agents</strong> and <strong>workflow orchestration</strong>.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg lg:text-xl font-medium">
              I don't just build models; I design reasoning systems to solve complex problems. While my primary specialization lies in AI and Data Engineering, I leverage the <strong>Vibe Coding</strong> philosophy to bridge web and mobile development—ensuring every solution is driven by high-performance intelligence.
            </p>

            {/* Availability Status Card */}
            <div className="p-6 rounded-2xl glass border-primary/20 bg-primary/5 flex items-center gap-4 mt-4 shadow-xl">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">Status</div>
                <div className="text-sm font-bold text-white uppercase tracking-widest">Open for Job, Freelance & Collaborators</div>
              </div>
            </div>

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
                  <h2 className="text-2xl font-black text-white tracking-widest uppercase">Academic Journey</h2>
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
                    <CarouselItem key={i} className="pl-4 basis-full md:basis-1/2 flex">
                      <div 
                        onClick={() => setOpenMilestoneIdx(i)}
                        className="p-10 glass rounded-[2.5rem] border-white/5 flex flex-col items-center text-center group hover:bg-primary/5 hover:border-primary/20 transition-all h-full cursor-pointer shadow-xl w-full"
                      >
                        <div className="text-3xl font-headline font-black text-primary/20 group-hover:text-primary transition-colors mb-4">{m.year}</div>
                        <h4 className="text-xl font-headline font-bold text-white mb-2 uppercase tracking-widest min-h-[3.5rem] flex items-center justify-center">
                          {m.title}
                        </h4>
                        <p className="text-sm text-white/50 leading-relaxed flex-1">{m.shortSummary}</p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-12 h-10 w-10 border-white/10 hover:bg-primary hover:text-white" />
                <CarouselNext className="hidden md:flex -right-12 h-10 w-10 border-white/10 hover:bg-primary hover:text-white" />
              </Carousel>
           </div>

           {/* Unified Technical Milestones Dialog */}
           <Dialog open={openMilestoneIdx !== null} onOpenChange={(open) => !open && setOpenMilestoneIdx(null)}>
             <DialogContent className="bg-card/95 backdrop-blur-xl border-border rounded-[2.5rem] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
               <DialogTitle className="sr-only">Technical Milestone Detail</DialogTitle>
               <DialogDescription className="sr-only">Details about the selected technical milestone.</DialogDescription>
               {openMilestoneIdx !== null && (
                 <>
                   <DialogHeader>
                     <div className="text-3xl font-headline font-black text-primary tracking-tighter uppercase mb-2">
                       {technicalMilestones[openMilestoneIdx].year}
                     </div>
                     <div className="text-xl font-headline font-bold text-foreground uppercase tracking-widest mb-6">
                       {technicalMilestones[openMilestoneIdx].title}
                     </div>
                   </DialogHeader>
                   
                   <div className="space-y-6">
                     <div className="p-8 bg-primary/5 rounded-[2rem] border border-primary/10">
                       <h6 className="text-primary font-bold uppercase tracking-[0.2em] text-xs mb-6 flex items-center gap-2">
                         <Info className="w-4 h-4" /> Detailed Breakdown
                       </h6>
                       <ul className="space-y-4">
                         {technicalMilestones[openMilestoneIdx].details.map((detail, idx) => (
                           <li key={idx} className="flex items-start gap-3 text-foreground/80 leading-relaxed text-sm font-medium">
                             <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                             {detail}
                           </li>
                         ))}
                       </ul>
                     </div>

                     <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="font-headline font-bold uppercase text-[10px] tracking-widest gap-2 hover:bg-primary/10"
                          onClick={() => setOpenMilestoneIdx(prev => prev! > 0 ? prev! - 1 : technicalMilestones.length - 1)}
                        >
                          <ChevronLeft className="w-4 h-4" /> Previous
                        </Button>
                        <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
                          {openMilestoneIdx + 1} / {technicalMilestones.length}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="font-headline font-bold uppercase text-[10px] tracking-widest gap-2 hover:bg-primary/10"
                          onClick={() => setOpenMilestoneIdx(prev => prev! < technicalMilestones.length - 1 ? prev! + 1 : 0)}
                        >
                          Next <ChevronRight className="w-4 h-4" />
                        </Button>
                     </div>
                   </div>
                 </>
               )}
             </DialogContent>
           </Dialog>
        </div>

        {/* Section: Professional Interests & Deep Dive */}
        <div id="interests" className="mb-32 scroll-mt-32">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase py-1 px-4">Expertise</Badge>
            <h2 className="text-3xl md:text-5xl font-headline font-black uppercase tracking-tighter text-white">
              Professional <span className="text-primary">Interests</span>
            </h2>
          </div>

          <div className="relative max-w-6xl mx-auto px-12">
            <Carousel 
              opts={{
                align: "start",
                loop: false,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {interestData.map((item, i) => (
                  <CarouselItem key={i} className="pl-4 basis-full md:basis-1/2 flex">
                    <div 
                      onClick={() => setOpenInterestIdx(i)}
                      className="p-10 glass rounded-[3rem] border border-white/5 hover:border-primary/50 transition-all group cursor-pointer flex flex-col items-center text-center shadow-xl hover:bg-primary/5 h-full w-full"
                    >
                      <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shrink-0">
                        {item.icon}
                      </div>
                      <h4 className="text-xl font-headline font-bold text-white mb-4 uppercase tracking-widest group-hover:text-primary transition-colors min-h-[3.5rem] flex items-center justify-center">
                        {item.title}
                      </h4>
                      <p className="text-sm text-white/50 leading-relaxed flex-1 min-h-[4rem]">
                        {item.desc}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-12 h-10 w-10 border-white/10 hover:bg-primary hover:text-white" />
              <CarouselNext className="hidden md:flex -right-12 h-10 w-10 border-white/10 hover:bg-primary hover:text-white" />
            </Carousel>
          </div>

          {/* Unified Professional Interests Dialog */}
          <Dialog open={openInterestIdx !== null} onOpenChange={(open) => !open && setOpenInterestIdx(null)}>
            <DialogContent className="bg-card/95 backdrop-blur-xl border-border rounded-[2.5rem] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogTitle className="sr-only">Expertise Detail</DialogTitle>
              <DialogDescription className="sr-only">Detailed methodology and projects for the selected expertise.</DialogDescription>
              {openInterestIdx !== null && (
                <>
                  <DialogHeader>
                    <div className="flex items-center gap-4 text-2xl md:text-3xl font-headline font-bold text-foreground mb-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        {interestData[openInterestIdx].icon}
                      </div>
                      {interestData[openInterestIdx].title}
                    </div>
                  </DialogHeader>
                  
                  <div className="space-y-8">
                    <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                      <h6 className="text-primary font-bold uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                        <BrainCircuit className="w-4 h-4" /> Methodology & Vision
                      </h6>
                      <p className="text-foreground leading-relaxed text-sm font-medium">
                        {interestData[openInterestIdx].details}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h6 className="text-foreground font-black uppercase tracking-[0.2em] text-xs px-2">Top Related Projects</h6>
                      <div className="grid gap-3">
                        {interestData[openInterestIdx].projects.map((proj, idx) => (
                          <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all group/proj">
                            <span className="text-sm font-bold text-white group-hover/proj:text-primary transition-colors mb-3 sm:mb-0">
                              {proj.name}
                            </span>
                            <div className="flex items-center gap-3">
                              {proj.github !== "#" && (
                                <a href={proj.github} target="_blank" rel="noopener noreferrer">
                                  <Button variant="ghost" size="sm" className="h-8 px-3 rounded-lg text-[10px] font-black uppercase tracking-widest bg-white/5 hover:bg-primary hover:text-white transition-all gap-1.5">
                                    <Github className="w-3 h-3" /> Repository
                                  </Button>
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="font-headline font-bold uppercase text-[10px] tracking-widest gap-2 hover:bg-primary/10"
                          onClick={() => setOpenInterestIdx(prev => prev! > 0 ? prev! - 1 : interestData.length - 1)}
                        >
                          <ChevronLeft className="w-4 h-4" /> Previous
                        </Button>
                        <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
                          {openInterestIdx + 1} / {interestData.length}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="font-headline font-bold uppercase text-[10px] tracking-widest gap-2 hover:bg-primary/10"
                          onClick={() => setOpenInterestIdx(prev => prev! < interestData.length - 1 ? prev! + 1 : 0)}
                        >
                          Next <ChevronRight className="w-4 h-4" />
                        </Button>
                     </div>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>

        {/* Section: Project Architecture */}
        <div className="p-10 md:p-16 lg:p-24 glass rounded-[4rem] border-primary/10 relative overflow-hidden mb-32">
           <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full -mr-48 -mt-48" />
           <div className="relative z-10 space-y-16">
              <div className="text-center space-y-4">
                 <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase py-1 px-4">System Logic</Badge>
                 <h3 className="text-3xl md:text-5 font-headline font-black uppercase tracking-tighter text-white">
                   AI Engine <span className="text-primary">Orchestration</span>
                 </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                 {orchestrationNodes.map((arch, i) => (
                   <div key={i} className="space-y-6 text-center cursor-pointer group" onClick={() => setOpenArchIdx(i)}>
                      <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 group-hover:border-primary/50 transition-all">
                         {arch.icon}
                      </div>
                      <h5 className="text-xl font-bold text-white uppercase tracking-widest group-hover:text-primary transition-colors min-h-[3rem] flex items-center justify-center">{arch.title}</h5>
                      <p className="text-white/50 text-sm leading-relaxed min-h-[4rem]">{arch.desc}</p>
                   </div>
                 ))}
              </div>
           </div>

           <Dialog open={openArchIdx !== null} onOpenChange={(open) => !open && setOpenArchIdx(null)}>
             <DialogContent className="bg-card/95 backdrop-blur-xl border-border rounded-[2.5rem] sm:max-w-xl">
               <DialogTitle className="sr-only">Orchestration Logic Detail</DialogTitle>
               <DialogDescription className="sr-only">Deep dive into the AI orchestration system logic.</DialogDescription>
               {openArchIdx !== null && (
                 <>
                   <DialogHeader>
                     <div className="flex items-center gap-4 text-2xl font-headline font-bold text-foreground mb-4">
                       {orchestrationNodes[openArchIdx].icon}
                       {orchestrationNodes[openArchIdx].title}
                     </div>
                   </DialogHeader>
                   <div className="space-y-6">
                     <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                       <h6 className="text-primary font-bold uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                         <Info className="w-4 h-4" /> Technical Documentation
                       </h6>
                       <p className="text-foreground leading-relaxed text-sm font-medium">
                         {orchestrationNodes[openArchIdx].details}
                       </p>
                     </div>

                     <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="font-headline font-bold uppercase text-[10px] tracking-widest gap-2 hover:bg-primary/10"
                          onClick={() => setOpenArchIdx(prev => prev! > 0 ? prev! - 1 : orchestrationNodes.length - 1)}
                        >
                          <ChevronLeft className="w-4 h-4" /> Previous
                        </Button>
                        <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
                          {openArchIdx + 1} / {orchestrationNodes.length}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="font-headline font-bold uppercase text-[10px] tracking-widest gap-2 hover:bg-primary/10"
                          onClick={() => setOpenArchIdx(prev => prev! < orchestrationNodes.length - 1 ? prev! + 1 : 0)}
                        >
                          Next <ChevronRight className="w-4 h-4" />
                        </Button>
                     </div>
                   </div>
                 </>
               )}
             </DialogContent>
           </Dialog>
        </div>

        {/* Section: GitHub Performance */}
        <div className="mb-32 space-y-16">
          <div className="w-full flex flex-col items-center justify-center text-center gap-4 mb-8">
            <div className="flex flex-col items-center justify-center gap-2 w-full">
              <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase px-4">Activity</Badge>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-2">
                <BarChart3 className="text-primary w-8 h-8 sm:w-10 sm:h-10" />
                <h2 className="text-3xl sm:text-4xl md:text-5 font-black text-white uppercase tracking-tight">GitHub Metrics</h2>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
            {[
              { label: "Public Repos", val: ghStats.repos, icon: <Github className="text-blue-400" /> },
              { label: "Total Stars", val: ghStats.stars, icon: <Sparkles className="text-yellow-400" /> },
              { label: "Followers", val: ghStats.followers, icon: <Users className="text-green-400" /> },
              { label: "Latest Update", val: ghStats.latestCommit, icon: <Code2 className="text-purple-400" />, isCommit: true }
            ].map((stat, i) => (
              <div key={i} className="p-6 glass rounded-[2rem] border-white/10 flex flex-col justify-center items-center text-center shadow-xl hover:bg-primary/5 transition-all">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4">{stat.icon}</div>
                <div className={cn("text-2xl font-headline font-black text-white mb-1", stat.isCommit && "text-xs line-clamp-1")}>
                  {loadingGh ? "..." : stat.val}
                </div>
                <div className="text-[10px] font-bold text-primary uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
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
            <h3 className="text-2xl md:text-3xl font-headline font-bold uppercase tracking-widest text-white">Collaborate</h3>
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
