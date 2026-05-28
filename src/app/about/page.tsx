
"use client"

import React, { useState, useEffect, useMemo } from 'react';
import { Github, Linkedin, Mail, GraduationCap, BarChart3, Users, Download, Eye, BrainCircuit, Workflow, Brain, Database, Sparkles, Code2, ChevronLeft, ChevronRight, Info, Layout, Search, BookOpen, Phone, GitCommit, Languages, Globe, Rocket } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, LabelList } from "recharts";

const rawCommitData = [
  { hour: 0, commits: 80 }, { hour: 1, commits: 65 }, { hour: 2, commits: 30 }, { hour: 3, commits: 5 },
  { hour: 4, commits: 10 }, { hour: 5, commits: 40 }, { hour: 6, commits: 95 }, { hour: 7, commits: 88 },
  { hour: 8, commits: 85 }, { hour: 9, commits: 45 }, { hour: 10, commits: 35 }, { hour: 11, commits: 10 },
  { hour: 12, commits: 30 }, { hour: 13, commits: 20 }, { hour: 14, commits: 2 }, { hour: 15, commits: 0 },
  { hour: 16, commits: 0 }, { hour: 17, commits: 0 }, { hour: 18, commits: 0 }, { hour: 19, commits: 2 },
  { hour: 20, commits: 0 }, { hour: 21, commits: 0 }, { hour: 22, commits: 1 }, { hour: 23, commits: 18 }
];

const timezones = [
  { label: "UTC (Coordinated Universal Time)", value: "0", display: "UTC +0:00" },
  { label: "Jakarta (WIB - Western Indonesia Time)", value: "7", display: "GMT +7:00" },
  { label: "Tokyo (JST - Japan Standard Time)", value: "9", display: "GMT +9:00" },
  { label: "London (GMT - Greenwich Mean Time)", value: "0", display: "GMT +0:00" },
  { label: "New York (EST - Eastern Standard Time)", value: "-5", display: "GMT -5:00" },
  { label: "San Francisco (PST - Pacific Standard Time)", value: "-8", display: "GMT -8:00" },
  { label: "Austin / Chicago (CST - Central Standard Time)", value: "-6", display: "GMT -6:00" },
  { label: "Berlin / Amsterdam (CET - Central European Time)", value: "1", display: "GMT +1:00" },
  { label: "Dubai (GST - Gulf Standard Time)", value: "4", display: "GMT +4:00" },
  { label: "Beijing / Shanghai (CST - China Standard Time)", value: "8", display: "GMT +8:00" },
  { label: "Singapore (SGT - Singapore Standard Time)", value: "8", display: "GMT +8:00" },
  { label: "Sydney (AEST - Australian Eastern Standard Time)", value: "10", display: "GMT +10:00" },
];

const educationData = [
  {
    period: "Aug 2023 - Sep 2027",
    degree: "Bachelor of Informatics Engineering",
    institution: "Universitas Dian Nuswantoro (UDINUS)",
    description: (
      <>
        IPK: 3.95/4.00 (Cumulative GPA in 5th Semester).<br />
        Activities: UKM Dian Nuswantoro Computer Club - DNCC.<br />
        Focusing on AI Development, Data Engineering, and Computational Logic.
      </>
    )
  },
  {
    period: "Jul 2020 - May 2023",
    degree: "High School Diploma, Science",
    institution: "SMA Kristen YSKI",
    description: "Activities: Photography, Entrepreneurship, and Scout."
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
    shortSummary: "Dived into data analytics through SQL and Python data libraries like Pandas and NumPy.",
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
    shortSummary: "Explored major data analytics and business intelligence tools for visual storytelling.",
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
    shortSummary: "Explored machine learning and deep learning across computer vision and NLP domains.",
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
    shortSummary: "Building end-to-end ML, autonomous AI Agents, and mastering Vibe Coding philosophy.",
    details: [
      "Transitioned to active, project-based learning with an AI-first approach",
      "Building end-to-end ML/DL projects from raw data to production-ready deployment",
      "Architecting autonomous AI Agents and high-performance automation workflows",
      "Embracing the 'Vibe Coding' philosophy—engineering with intuition and rapid AI iteration"
    ]
  }
];

const interestData = [
  {
    title: "Natural Language Processing",
    icon: <Brain className="w-10 h-10 text-primary" />,
    desc: "Bridging human language and machine understanding through high-precision NLP pipelines.",
    details: "Focused on engineering high-precision Natural Language Processing pipelines that bridge human intent and machine comprehension. Specializing in transforming unstructured text into structured, actionable intelligence across multilingual contexts and diverse semantic architectures.",
    projects: [
      { name: "Resume Scanner API", id: null, github: "https://github.com/viochris/resume-scanner-api" },
      { name: "Insightify API (NLP Sentiment)", id: null, github: "https://github.com/viochris/Insightify-Sentiment-API" },
      { name: "DocuTalk-AI (Smart RAG)", id: null, github: "https://github.com/viochris/DocuTalk-AI" }
    ]
  },
  {
    title: "Tabular Data Modeling",
    icon: <Database className="w-10 h-10 text-primary" />,
    desc: "Predictive power from structured foundations using rigorous cross-validation and feature engineering.",
    details: "Building robust, highly accurate predictive models from complex structured data across any domain. Ensuring that every model is not only performant but also fully interpretable and reliable through rigorous feature engineering and Explainable AI (XAI) methodologies.",
    projects: [
      { name: "Stunting Analysis (Medical)", id: null, github: "https://github.com/viochris/Stunting-prediction-project" },
      { name: "Diabetes Prediction (Tuned)", id: null, github: "https://github.com/viochris/Diabetes-prediction-fine-tuned-project" },
      { name: "Coming Soon", id: null, github: "#" }
    ]
  },
  {
    title: "AI Agent Engineering",
    icon: <Sparkles className="w-10 h-10 text-primary" />,
    desc: "Designing advanced reasoning systems and multi-agent frameworks for autonomous problem solving.",
    details: "Architecting advanced, goal-oriented reasoning systems and multi-agent ecosystems. Leveraging modern LLM frameworks to build autonomous agents capable of complex logic execution, dynamic tool calling, and resilient self-correction without human intervention.",
    projects: [
      { name: "InsightSQL (LangGraph)", id: null, github: "https://github.com/viochris/InsightSQL-LangGraph-Engine-Web" },
      { name: "SpendSense (Financial AI)", id: null, github: "https://github.com/viochris/Streamlit-SpendSense" },
      { name: "NovaCal AI (Telegram)", id: null, github: "https://github.com/viochris/telegram-calendar-ai-bot.git" }
    ]
  },
  {
    title: "Automation & Orchestration",
    icon: <Workflow className="w-10 h-10 text-primary" />,
    desc: "Building high-performance AI ecosystems where services connect seamlessly via intelligent bots.",
    details: "Constructing the robust backbone of intelligent systems. Architecting stateful, high-performance backends and automated data pipelines that seamlessly connect discrete AI models to real-world applications, APIs, and ubiquitous communication platforms.",
    projects: [
      { name: "Daily Agenda Broadcaster", id: null, github: "https://github.com/viochris/auto-daily-scheduler.git" },
      { name: "NovaMail AI (Autoresponder)", id: null, github: "https://github.com/viochris/NovaMail-AI-Autoresponder.git" },
      { name: "Daily AI News Digest", id: null, github: "https://github.com/viochris/daily-ai-news-digest" }
    ]
  },
  {
    title: "Vibe Coding",
    icon: <Code2 className="w-10 h-10 text-primary" />,
    desc: "The AI-first digital experience, creating a synergy between human intuition and AI execution.",
    details: "A rapid-development methodology leveraging AI assistance for quick prototyping. While my core expertise is in Data and AI, understanding fundamental programming concepts allows me to steer coding agents effectively. This enables me to rapidly generate basic user interfaces and Proof of Concepts (PoCs) when an immediate, functional prototype is needed to demonstrate backend AI capabilities.",
    projects: [
      { name: "Coming Soon", id: null, github: "#" },
      { name: "Coming Soon", id: null, github: "#" },
      { name: "Coming Soon", id: null, github: "#" }
    ]
  },
  {
    title: "Custom Data Sourcing & Pipelines",
    icon: <Globe className="w-10 h-10 text-primary" />,
    desc: "Aggregating data through third-party APIs and automated web scraping architectures.",
    details: "Overcoming data limitations by building custom extraction pipelines. Focused on aggregating data through third-party APIs and automated web scraping architectures. Skilled in designing focused ETL and ELT workflows to clean, structure, and load raw information into high-quality custom datasets for predictive modeling.",
    projects: [
      { name: "Coming Soon", id: null, github: "#" },
      { name: "Coming Soon", id: null, github: "#" },
      { name: "Coming Soon", id: null, github: "#" }
    ]
  },
  {
    title: "Deployment & Interfaces",
    icon: <Rocket className="w-10 h-10 text-primary" />,
    desc: "Bridging backend models and end-user accessibility through high-performance APIs and interfaces.",
    details: "Bridging the gap between intelligent backend models and end-user accessibility. Specializing in deploying high-performance REST APIs (FastAPI) and rapidly prototyping interactive interfaces—ranging from web applications (Streamlit) to autonomous messaging bots (Telegram)—ensuring AI solutions deliver immediate real-world utility.",
    projects: [
      { name: "Coming Soon", id: null, github: "#" },
      { name: "Coming Soon", id: null, github: "#" },
      { name: "Coming Soon", id: null, github: "#" }
    ]
  }
];

export default function AboutPage() {
  const cvRawLink = "/vio-cv.pdf";
  const [ghStats, setGhStats] = useState({ 
    repos: 0, 
    stars: 0, 
    followers: 0, 
    topLanguages: '...', 
    totalCommits: 0 
  });
  const [loadingGh, setLoadingGh] = useState(true);
  const [offset, setOffset] = useState(0);

  const [openMilestoneIdx, setOpenMilestoneIdx] = useState<number | null>(null);
  const [openInterestIdx, setOpenInterestIdx] = useState<number | null>(null);

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const [userRes, reposRes, commitsRes] = await Promise.all([
          fetch('https://api.github.com/users/viochris'),
          fetch('https://api.github.com/users/viochris/repos?per_page=100'),
          fetch('https://api.github.com/search/commits?q=author:viochris', {
            headers: { 'Accept': 'application/vnd.github.cloak-preview' }
          })
        ]);

        const userData = await userRes.json();
        const reposData = await reposRes.json();
        const searchCommitsData = await commitsRes.json();

        const totalStars = reposData.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0);
        
        const langCount: Record<string, number> = {};
        reposData.forEach((repo: any) => {
          if (repo.language) {
            langCount[repo.language] = (langCount[repo.language] || 0) + 1;
          }
        });
        const sortedLangs = Object.entries(langCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 1) // Only take top 1
          .map(l => l[0])
          .join(', ');

        setGhStats({
          repos: userData.public_repos || 0,
          stars: totalStars,
          followers: userData.followers || 0,
          topLanguages: sortedLangs || 'None',
          totalCommits: searchCommitsData.total_count || 0
        });
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
      } finally {
        setLoadingGh(false);
      }
    }
    fetchGitHubData();
  }, []);

  const shiftedCommitData = useMemo(() => {
    return rawCommitData.map(d => {
      const shiftedHour = (d.hour + offset + 24) % 24;
      return { 
        hour: shiftedHour.toString(), 
        commits: d.commits,
        originalHour: d.hour 
      };
    }).sort((a, b) => parseInt(a.hour) - parseInt(b.hour));
  }, [offset]);

  const currentTimezoneLabel = useMemo(() => {
    const tz = timezones.find(t => parseInt(t.value) === offset);
    return tz ? tz.display : "UTC +0:00";
  }, [offset]);

  return (
    <div className="pt-32 lg:pt-40 pb-24 px-6 md:px-12 lg:px-16 min-h-screen">
      <section id="about" className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 w-full items-start mb-32">
          <div className="w-full lg:w-1/2 flex flex-col space-y-6">
            <div className="space-y-6">
              <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase px-4">The Architect</Badge>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black uppercase tracking-tighter text-foreground">
                About <span className="text-primary">Me</span>
              </h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed text-lg lg:text-xl font-medium">
              I am Silvio Christian Joe, an Informatics Engineering student at UDINUS with a core focus as a Data Scientist and AI Engineer. My passion lies in transforming raw data into intelligent systems that seamlessly bridge data engineering and artificial intelligence.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg lg:text-xl font-medium">
              On the data science front, I specialize in analyzing Tabular Data to build robust predictive models and designing high-precision Natural Language Processing (NLP) pipelines to extract actionable meaning from unstructured text. However, I don't just build traditional models—I design reasoning systems to solve complex problems. As an AI Engineer, my work revolves around developing autonomous AI Agents. I build practical, task-oriented systems using modern LLM frameworks, implementing RAG pipelines, engineering conversational bots, and creating ReAct agents that can independently reason and orchestrate complex workflows.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg lg:text-xl font-medium">
              I firmly believe that AI should be practical and accessible. By leveraging the Vibe Coding philosophy, I bridge core AI development with web and mobile platforms—ensuring every solution is driven by high-performance intelligence. From analyzing datasets on Kaggle to deploying functional AI assistants on Telegram and web interfaces, my ultimate goal is to deliver real-world utility through reliable and intelligent execution.
            </p>

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

        <div className="mb-32 space-y-16">
           <div className="text-center space-y-4">
              <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase py-1 px-4">Evolution</Badge>
              <h2 className="text-3xl md:text-5 font-headline font-black uppercase tracking-tighter text-white">
                Technical <span className="text-primary">Milestones</span>
              </h2>
           </div>
           
           <div className="relative relative max-w-5xl mx-auto px-12">
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
                        <h4 className="text-xl font-headline font-bold text-white mb-2 uppercase tracking-widest min-h-[5rem] flex items-center justify-center">
                          {m.title}
                        </h4>
                        <p className="text-sm text-white/50 leading-relaxed flex-1 min-h-[6rem] flex items-center justify-center">
                          {m.shortSummary}
                        </p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-12 h-10 w-10 border-white/10 hover:bg-primary hover:text-white" />
                <CarouselNext className="hidden md:flex -right-12 h-10 w-10 border-white/10 hover:bg-primary hover:text-white" />
              </Carousel>
           </div>

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
                      <h4 className="text-xl font-headline font-bold text-white mb-4 uppercase tracking-widest group-hover:text-primary transition-colors min-h-[5.5rem] flex items-center justify-center">
                        {item.title}
                      </h4>
                      <p className="text-sm text-white/50 leading-relaxed flex-1 min-h-[7rem] flex items-center justify-center">
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

        {/* GitHub Metrics Hub */}
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
          
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Row 1: 3 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Public Repos", val: ghStats.repos, icon: <Github className="text-blue-400" /> },
                { label: "Total Stars", val: ghStats.stars, icon: <Sparkles className="text-yellow-400" /> },
                { label: "Followers", val: ghStats.followers, icon: <Users className="text-green-400" /> }
              ].map((stat, i) => (
                <div key={i} className="p-8 glass rounded-[2.5rem] border-white/10 flex flex-col justify-center items-center text-center shadow-xl hover:bg-primary/5 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 shadow-inner">{stat.icon}</div>
                  <div className="text-3xl font-headline font-black text-white mb-2">
                    {loadingGh ? "..." : stat.val}
                  </div>
                  <div className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Row 2: 2 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "TOP 1 LANGUAGE", val: ghStats.topLanguages, icon: <Languages className="text-cyan-400" /> },
                { label: "Total Commits (All-Time)", val: ghStats.totalCommits, icon: <GitCommit className="text-purple-400" /> }
              ].map((stat, i) => (
                <div key={i} className="p-8 glass rounded-[2.5rem] border-white/10 flex flex-col justify-center items-center text-center shadow-xl hover:bg-primary/5 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 shadow-inner">{stat.icon}</div>
                  <div className="text-2xl font-headline font-black text-white mb-2 tracking-tight">
                    {loadingGh ? "..." : stat.val}
                  </div>
                  <div className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bar Chart Section */}
        <div className="mb-32 p-10 md:p-16 glass rounded-[3rem] border-white/10 shadow-2xl relative">
          <div className="relative z-10">
            {/* Timezone Selector - Top Right Above Title */}
            <div className="flex justify-end mb-10">
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl w-full md:w-fit">
                <Globe className="w-5 h-5 text-primary shrink-0" />
                <Select value={offset.toString()} onValueChange={(v) => setOffset(parseInt(v))}>
                  <SelectTrigger className="w-[280px] bg-transparent border-none text-white font-bold uppercase tracking-widest text-[10px] focus:ring-0 h-10 px-0 hover:bg-transparent shadow-none">
                    <SelectValue placeholder="Select Timezone" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border max-h-[300px]">
                    {timezones.map(tz => (
                      <SelectItem key={tz.label} value={tz.value} className="text-white font-bold uppercase tracking-widest text-[10px] cursor-pointer">
                        {tz.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col items-start mb-12">
              <h3 className="text-5xl md:text-7xl font-headline font-black text-primary uppercase tracking-tighter leading-[0.85] mb-2">
                Commits
              </h3>
              <span className="text-lg md:text-2xl font-headline font-bold text-primary/70 uppercase tracking-tighter leading-none">
                ({currentTimezoneLabel})
              </span>
            </div>

            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={shiftedCommitData} margin={{ top: 30 }}>
                  <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px'}}
                    labelFormatter={(label) => `Hour: ${label}:00`}
                  />
                  <Bar dataKey="commits" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]}>
                    <LabelList 
                      dataKey="commits" 
                      position="top" 
                      style={{ fill: 'hsl(var(--primary))', fontSize: '12px', fontWeight: 'bold' }} 
                      offset={10} 
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="text-right text-primary font-headline font-bold text-xl mt-2">per day hour</div>
            </div>
          </div>
        </div>

        {/* GitHub Contribution Grid Section */}
        <div className="mb-32 space-y-8">
          <div className="p-8 md:p-12 glass rounded-[3rem] border border-white/10 shadow-2xl bg-[#0d1117]/80 backdrop-blur-xl flex flex-col gap-8">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><Github size={14} className="text-primary" /> GitHub Activity Grid</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-[#0d1117] border border-white/5 rounded-sm"></div>
                  <div className="w-3 h-3 bg-[#0e4429] rounded-sm"></div>
                  <div className="w-3 h-3 bg-[#006d32] rounded-sm"></div>
                  <div className="w-3 h-3 bg-[#26a641] rounded-sm"></div>
                  <div className="w-3 h-3 bg-[#39d353] rounded-sm"></div>
                </div>
                <span>More</span>
              </div>
            </div>

            <div className="w-full flex flex-col gap-2 overflow-x-auto scrollbar-hide">
              {/* Month Labels */}
              <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-widest px-12 min-w-[700px]">
                <span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span>
              </div>
              
              <div className="flex gap-4 min-w-[700px]">
                {/* Day Labels */}
                <div className="flex flex-col justify-between text-[10px] text-slate-500 font-bold uppercase py-4 shrink-0">
                  <span>Mon</span><span>Wed</span><span>Fri</span>
                </div>
                
                {/* The Real Grid Image */}
                <div className="flex-1">
                  <img 
                    src="https://ghchart.rshah.org/22c55e/viochris" 
                    alt="GitHub Contributions Grid" 
                    className="w-full h-auto object-contain invert dark:invert-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-32 p-10 md:p-16 glass rounded-[3rem] border-primary/20 bg-primary/5 shadow-2xl relative overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase py-1 px-4">Personal Interests</Badge>
              <h2 className="text-4xl md:text-5xl font-headline font-black uppercase tracking-tighter text-white">
                Beyond The <span className="text-primary">Code</span>
              </h2>
              <div className="space-y-6 text-muted-foreground text-lg font-medium leading-relaxed font-body">
                <p>
                  Outside of my regular coursework, I spend my time exploring the practical side of AI. I'm a strong believer in learning by building. Rather than just reading about new frameworks, I prefer testing them hands-on—whether that means deploying a new agentic workflow to Hugging Face or analyzing datasets on Kaggle.
                </p>
                <p>
                  I also enjoy sharing these insights by occasionally creating simple, bite-sized educational content for the data science community.
                </p>
                <p>
                  Ultimately, I want to take complex AI tools and turn them into intuitive, everyday applications that people can actually use without needing a manual.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: "Builder", sub: "PERSONAL PROJECTS", icon: <Layout className="w-6 h-6 text-primary" /> },
                { label: "Explorer", sub: "HUGGING FACE & KAGGLE", icon: <Search className="w-6 h-6 text-primary" /> },
                { label: "Creator", sub: "DATA EDU CONTENT", icon: <Sparkles className="w-6 h-6 text-primary" /> },
                { label: "Learner", sub: "NEW AI FRAMEWORKS", icon: <BookOpen className="w-6 h-6 text-primary" /> }
              ].map((item, i) => (
                <div key={i} className="p-8 glass rounded-[2rem] border-white/10 flex flex-col items-center justify-center text-center group hover:bg-primary/10 transition-all shadow-xl">
                  <div className="mb-4">{item.icon}</div>
                  <div className="text-lg font-headline font-black text-primary uppercase mb-1">{item.label}</div>
                  <div className="text-[10px] font-bold text-white/40 tracking-widest">{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center space-y-12">
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-headline font-bold uppercase tracking-widest text-white">Collaborate</h3>
            <Separator className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </div>
          
          <div className="w-full max-w-4xl mx-auto space-y-6 mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <a 
                href={cvRawLink} 
                download="vio-cv.pdf" 
                className="w-full flex items-center justify-center gap-3 py-5 px-6 rounded-2xl font-black text-white transition-all shadow-xl transform hover:-translate-y-1 bg-primary hover:bg-primary/90 uppercase tracking-widest text-xs"
              >
                <Download className="w-5 h-5" /> DOWNLOAD CV
              </a>

              <Dialog>
                <DialogTrigger asChild>
                  <button 
                    className="w-full flex items-center justify-center gap-3 py-5 px-6 rounded-2xl font-black text-white transition-all shadow-xl transform hover:-translate-y-1 bg-blue-600 hover:bg-blue-700 uppercase tracking-widest text-xs"
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

              <a 
                href="mailto:viochristian12@gmail.com"
                className="w-full flex items-center justify-center gap-3 py-5 px-6 rounded-2xl font-black text-white transition-all shadow-xl transform hover:-translate-y-1 bg-[#d44638] hover:bg-[#b03a2e] uppercase tracking-widest text-xs"
              >
                <Mail className="w-5 h-5" /> GMAIL CONTACT
              </a>

              <a 
                href="https://www.linkedin.com/in/silvio-christian-joe" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 py-5 px-6 rounded-2xl font-black text-white transition-all shadow-xl transform hover:-translate-y-1 bg-[#0077b5] hover:bg-[#005a8a] uppercase tracking-widest text-xs"
              >
                <Linkedin className="w-5 h-5" /> LINKEDIN PROFILE
              </a>
            </div>

            <a 
              href="https://wa.me/62895342637871" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 py-5 px-6 rounded-2xl font-black text-white transition-all shadow-xl transform hover:-translate-y-1 bg-[#25D366] hover:bg-[#128C7E] uppercase tracking-widest text-xs"
            >
              <Phone className="w-5 h-5" /> WHATSAPP CONTACT
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

