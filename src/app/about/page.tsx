"use client"

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { ParallaxLayer } from '@/components/Parallax';
import {
  Github,
  Linkedin,
  Mail,
  GraduationCap,
  BarChart3,
  Users,
  Download,
  Eye,
  BrainCircuit,
  Workflow,
  Brain,
  Database,
  Sparkles,
  Code2,
  ChevronLeft,
  ChevronRight,
  Info,
  Layout,
  Search,
  BookOpen,
  Phone,
  GitCommit,
  Languages,
  Globe,
  Rocket,
  Copy,
  Check,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResumePreviewFrame } from '@/components/ResumePreviewFrame';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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
} from "@/components/ui/select";
import { GITHUB_FALLBACK_STATS, fetchCachedGitHubStats, readCachedGitHubStats, type GitHubStats } from '@/lib/github-stats';

const CommitActivityChart = dynamic(() => import('@/components/CommitActivityChart'), {
  ssr: false,
  loading: () => (
    <div className="h-[340px] sm:h-[380px] w-full rounded-xl bg-secondary/40 animate-pulse flex items-center justify-center text-xs font-semibold uppercase tracking-wider text-zinc-400">
      Loading commit activity chart...
    </div>
  ),
});

const rawCommitData = [
  { hour: 0, commits: 80 }, { hour: 1, commits: 65 }, { hour: 2, commits: 30 }, { hour: 3, commits: 5 },
  { hour: 4, commits: 10 }, { hour: 5, commits: 40 }, { hour: 6, commits: 95 }, { hour: 7, commits: 88 },
  { hour: 8, commits: 85 }, { hour: 9, commits: 45 }, { hour: 10, commits: 35 }, { hour: 11, commits: 10 },
  { hour: 12, commits: 30 }, { hour: 13, commits: 20 }, { hour: 14, commits: 2 }, { hour: 15, commits: 0 },
  { hour: 16, commits: 0 }, { hour: 17, commits: 0 }, { hour: 18, commits: 0 }, { hour: 19, commits: 2 },
  { hour: 20, commits: 0 }, { hour: 21, commits: 0 }, { hour: 22, commits: 1 }, { hour: 23, commits: 18 },
];

const timezones = [
  { label: "UTC (Coordinated Universal Time)", short: "UTC", value: "0", display: "UTC +0:00" },
  { label: "Jakarta (WIB - Western Indonesia Time)", short: "Jakarta", value: "7", display: "GMT +7:00" },
  { label: "Tokyo (JST - Japan Standard Time)", short: "Tokyo", value: "9", display: "GMT +9:00" },
  { label: "London (GMT - Greenwich Mean Time)", short: "London", value: "0", display: "GMT +0:00" },
  { label: "New York (EST - Eastern Standard Time)", short: "New York", value: "-5", display: "GMT -5:00" },
  { label: "San Francisco (PST - Pacific Standard Time)", short: "San Francisco", value: "-8", display: "GMT -8:00" },
  { label: "Austin / Chicago (CST - Central Standard Time)", short: "Austin/Chicago", value: "-6", display: "GMT -6:00" },
  { label: "Berlin / Amsterdam (CET - Central European Time)", short: "Berlin", value: "1", display: "GMT +1:00" },
  { label: "Dubai (GST - Gulf Standard Time)", short: "Dubai", value: "4", display: "GMT +4:00" },
  { label: "Beijing / Shanghai (CST - China Standard Time)", short: "Beijing", value: "8", display: "GMT +8:00" },
  { label: "Singapore (SGT - Singapore Standard Time)", short: "Singapore", value: "8", display: "GMT +8:00" },
  { label: "Sydney (AEST - Australian Eastern Standard Time)", short: "Sydney", value: "10", display: "GMT +10:00" },
];

const educationData = [
  {
    period: "Aug 2023 - Sep 2027",
    degree: "Bachelor of Informatics Engineering",
    institution: "Universitas Dian Nuswantoro (UDINUS)",
    description: (
      <>
        Status: Currently in 7th Semester.<br />
        GPA: 3.96/4.00 (Cumulative GPA through 6th Semester).<br />
        Activities: Dian Nuswantoro Computer Club (DNCC).<br />
        Focus: AI Engineering, Data Science, and Computational Logic.
      </>
    ),
  },
  {
    period: "Jul 2020 - May 2023",
    degree: "High School Diploma, Science Track",
    institution: "SMA Kristen YSKI",
    description: "Activities: Photography, Entrepreneurship, and Scouting.",
  },
];

const technicalMilestones = [
  {
    year: "2023",
    title: "Web & Coding Foundations",
    shortSummary:
      "Started computer science from scratch in Semester 1, mastering programming logic alongside responsive HTML, CSS, JavaScript, and UI/UX visual hierarchy before branching into data engineering.",
    details: [
      "Began learning programming fundamentals and algorithmic logic from scratch in Semester 1",
      "Explored frontend web development with semantic HTML, CSS, and JavaScript",
      "Studied UI/UX layout principles, spacing, and visual hierarchy",
      "Built responsive multi-device web layouts as an engineering baseline",
    ],
  },
  {
    year: "Early 2024",
    title: "Data Analytics Entry",
    shortSummary:
      "Transitioned into data analytics through relational SQL querying and Python wrangling with Pandas and NumPy, focusing on data cleaning, missing-value handling, and exploratory data analysis (EDA).",
    details: [
      "Learned SQL for querying, joining, aggregating, and shaping relational databases",
      "Practiced Python data wrangling with Pandas and NumPy on tabular datasets",
      "Studied data cleaning, outlier inspection, transformation, and exploratory data analysis (EDA)",
      "Completed structured analytical exercises across retail and operational datasets",
    ],
  },
  {
    year: "2024",
    title: "BI Tools & Visualization",
    shortSummary:
      "Designed executive business intelligence dashboards across Tableau Public, Microsoft Power BI, Looker Studio, and Excel—turning raw operational CSV datasets into decision-ready KPI visuals.",
    details: [
      "Designed interactive executive dashboards in Tableau Public and Looker Studio",
      "Built multi-dimensional business reporting views with Microsoft Power BI",
      "Used Microsoft Excel pivot tables and charts for rapid exploratory slicing",
      "Delivered end-to-end workflows from raw CSV data to stakeholder-ready KPI visuals",
    ],
  },
  {
    year: "Mid 2024",
    title: "ML & Deep Learning",
    shortSummary:
      "Trained and benchmarked classical ML models and deep neural networks across tabular data, computer vision, and NLP using Scikit-Learn, PyTorch, and TensorFlow with leak-free validation.",
    details: [
      "Trained and evaluated classical ML ensembles and neural networks",
      "Worked across Tabular Data, Computer Vision, and NLP tasks",
      "Built reproducible preprocessing, SMOTE resampling, and model evaluation pipelines",
      "Gained hands-on experience with Scikit-Learn, TensorFlow/Keras, and PyTorch",
    ],
  },
  {
    year: "Late 2024 - Early 2025",
    title: "Theoretical Deep Dive",
    shortSummary:
      "Strengthened mathematical and statistical foundations before implementation—covering T-Test, Z-Test, ANOVA, regression/classification metrics, ARIMA/SARIMAX forecasting, and Hugging Face pipelines.",
    details: [
      "Focused on mathematical and statistical reasoning before code implementation",
      "Studied statistical hypothesis tests including T-Test, Z-Test, and ANOVA",
      "Mastered evaluation metrics across Regression, Classification, Forecasting, and Clustering",
      "Explored time-series models (ARIMA, SARIMA, SARIMAX) and Hugging Face transformer pipelines",
    ],
  },
  {
    year: "2025 - Present",
    title: "Project & Agentic Era",
    shortSummary:
      "Shipping production FastAPI/Docker ML services, stateful LangGraph/LlamaIndex RAG & agent systems, full-stack React 19/Next.js apps, and copyright-registered health software (StuntiFy No. 001072491).",
    details: [
      "Shifted to end-to-end production delivery spanning ML APIs, Vector/Graph RAG (ChromaDB & Neo4j), and LLMOps observability (Arize Phoenix)",
      "Co-created StuntiFy (Registered Copyright No. 001072491, Dec 2025) and validated its toddler stunting detection model using field data collected while volunteering at a local community health post",
      "Engineered stateful AI Agents (LangGraph, CrewAI, LangChain) and Prefect-orchestrated Telegram/Gmail/Google Workspace automations",
      "Completed IBM AI Engineering Specialization alongside Oracle AI Vector Search, Generative AI, and Data Science certifications",
    ],
  },
];

const interestData = [
  {
    title: "Natural Language Processing",
    icon: <Brain className="w-8 h-8 text-primary" aria-hidden="true" />,
    desc: "Engineering high-precision bilingual NLP pipelines (English and Indonesian) spanning TF-IDF + SBERT semantic similarity matching, RoBERTa sentiment analytics, and N-Gram keyword extraction.",
    details:
      "Focused on building production-ready language processing systems for ATS resume scoring, context-grounded document RAG with FAISS/ChromaDB, cross-encoder reranking, and bilingual RoBERTa sentiment microservices deployed via FastAPI and Docker.",
    projects: [
      { name: "Resume Scanner API", github: "https://github.com/viochris/resume-scanner-api" },
      { name: "Insightify API (NLP Sentiment)", github: "https://github.com/viochris/Insightify-Sentiment-API" },
      { name: "DocuTalk-AI (Smart RAG)", github: "https://github.com/viochris/DocuTalk-AI" },
    ],
  },
  {
    title: "Tabular Data Modeling",
    icon: <Database className="w-8 h-8 text-primary" aria-hidden="true" />,
    desc: "Designing leakage-free predictive pipelines for structured clinical and financial datasets using SMOTE/SMOTE-NC resampling, Optuna tuning, and Explainable AI (XAI) diagnostics with LIME and SHAP.",
    details:
      "Specializing in rigorous train-test isolation where scalers and oversamplers fit strictly on training folds to prevent data leakage, benchmarking CatBoost, XGBoost, LightGBM, and AdaBoost while explaining individual predictions via LIME feature contributions.",
    projects: [
      { name: "Stunting Analysis (Medical)", github: "https://github.com/viochris/Stunting-prediction-project" },
      { name: "Diabetes Prediction (Tuned)", github: "https://github.com/viochris/Diabetes-prediction-fine-tuned-project" },
    ],
  },
  {
    title: "AI Agent Engineering",
    icon: <Sparkles className="w-8 h-8 text-primary" aria-hidden="true" />,
    desc: "Architecting stateful multi-step LLM systems with LangGraph cyclic validation, ReAct reasoning, and LangChain tool-calling agents—complete with SQL/ephemeral memory and automatic error recovery.",
    details:
      "Building reliable goal-oriented AI agents rather than fragile prompt wrappers: enforcing schema validation, SQL/Python sandboxed execution loops, transparent glass-box Thought-Action-Observation traces, and hybrid vector + knowledge-graph retrieval with Neo4j.",
    projects: [
      { name: "InsightSQL (LangGraph)", github: "https://github.com/viochris/InsightSQL-LangGraph-Engine-Web" },
      { name: "SpendSense (Financial AI)", github: "https://github.com/viochris/Streamlit-SpendSense" },
      { name: "NovaCal AI (Telegram)", github: "https://github.com/viochris/telegram-calendar-ai-bot.git" },
    ],
  },
  {
    title: "Automation & Orchestration",
    icon: <Workflow className="w-8 h-8 text-primary" aria-hidden="true" />,
    desc: "Connecting language models, external workspace APIs, and scheduled Prefect ETL pipelines with retry policies to power hands-free Telegram bots, calendar agents, and inbox autoresponders.",
    details:
      "Designing resilient event-driven and scheduled automations orchestrated with Prefect retries, linking Gemini models directly to Gmail (RFC 2822 threading), Google Calendar, Google Sheets, DuckDuckGo search, and asynchronous python-telegram-bot services.",
    projects: [
      { name: "Daily Agenda Broadcaster", github: "https://github.com/viochris/auto-daily-scheduler.git" },
      { name: "NovaMail AI (Autoresponder)", github: "https://github.com/viochris/NovaMail-AI-Autoresponder.git" },
      { name: "Daily AI News Digest", github: "https://github.com/viochris/daily-ai-news-digest" },
    ],
  },
  {
    title: "Vibe Coding",
    icon: <Code2 className="w-8 h-8 text-primary" aria-hidden="true" />,
    desc: "Pairing systems engineering architecture with AI-assisted full-stack velocity to ship responsive React 19, Next.js, TypeScript, and Express web apps atop containerized Python AI backends.",
    details:
      "Accelerating end-to-end delivery from architecture diagram to deployed interactive UI without sacrificing type safety, accessibility, or API boundaries—building production Next.js portfolios, multimodal Gemini Vision apps, and Supabase dashboards.",
    projects: [
      { name: "Silvio.AI Portfolio", github: "https://github.com/viochris/silvio-ai-portfolio" },
      { name: "Botanica AI", github: "https://github.com/viochris/botanica-ai" },
    ],
  },
  {
    title: "Custom Data Sourcing & Pipelines",
    icon: <Globe className="w-8 h-8 text-primary" aria-hidden="true" />,
    desc: "Building clean automated extraction and transformation workflows across live web scrapers, PDF/Excel parsers, and third-party APIs to curate structured, model-ready datasets and vector stores.",
    details:
      "Engineering repeatable ETL pipelines with TrafilaturaWebReader, PyPDF2, nbformat, yt-dlp, OpenCV, and Google Sheets gspread batch syncs to clean raw multi-format documents, web articles, and video transcripts before chunking or ML training.",
    projects: [
      { name: "Daily AI News Digest", github: "https://github.com/viochris/daily-ai-news-digest" },
      { name: "Website Reader RAG Chatbot", github: "https://github.com/viochris/website-reader-rag-chatbot" },
    ],
  },
  {
    title: "Deployment & Interfaces",
    icon: <Rocket className="w-8 h-8 text-primary" aria-hidden="true" />,
    desc: "Delivering production machine learning intelligence to end users through containerized FastAPI/Flask microservices, Hugging Face Spaces, Streamlit/Gradio apps, and Next.js interfaces.",
    details:
      "Bridging research notebooks and real-world accessibility by packaging encoders, scalers, and ML/NLP models into Dockerized REST APIs with CORS, schema validation, lazy model loading, and interactive dashboards deployed on Vercel and Streamlit Cloud.",
    projects: [
      { name: "Resume Scanner API", github: "https://github.com/viochris/resume-scanner-api" },
      { name: "SpendSense (Financial AI)", github: "https://github.com/viochris/Streamlit-SpendSense" },
      { name: "NovaCal AI (Stateful Telegram)", github: "https://github.com/viochris/telegram-calendar-ai-bot.git" },
    ],
  },
];

export default function AboutPage() {
  const cvRawLink = "/Silvio-Christian-Joe-resume.pdf";
  const cvDownloadLink = "/api/resume?download=1";
  const [ghStats, setGhStats] = useState<GitHubStats>(GITHUB_FALLBACK_STATS);
  const [loadingGh, setLoadingGh] = useState(true);
  const [offset, setOffset] = useState(7);

  const [openMilestoneIdx, setOpenMilestoneIdx] = useState<number | null>(null);
  const [openInterestIdx, setOpenInterestIdx] = useState<number | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const candidateSummaryText = `CANDIDATE SUMMARY: SILVIO CHRISTIAN, JOE
Role Focus: Data Scientist, AI & LLM Engineer, NLP & RAG Specialist
Location: Semarang, Central Java, Indonesia (Open to Remote, Hybrid & On-Site)
Education: B.Sc. in Informatics Engineering, Dian Nuswantoro University (UDINUS) (2023 - 2027, Currently in 7th Semester)
Cumulative GPA: 3.96 / 4.00 (through 6th Semester)

CORE TECHNICAL STACK:
- GenAI, Agents & LLMOps: LangGraph, CrewAI, LlamaIndex, LangChain, Google Gemini, Groq, LiteLLM, Arize Phoenix (OpenTelemetry)
- Vector & Graph Databases: ChromaDB Cloud, Neo4j Property Graph, FAISS, Pinecone, MySQL
- Machine Learning & NLP: Python, SQL, Pandas, NumPy, Scikit-Learn, TensorFlow, Hugging Face (SBERT, Cross-Encoder Rerankers)
- Backend, UI & Automation: FastAPI, Flask, Streamlit, React 19 / TypeScript, Prefect, Docker, Telegram Bot API
- BI & Analytics: Tableau, Power BI, Looker Studio, Matplotlib, Seaborn

KEY PROOF-OF-WORK (65+ PUBLIC REPOSITORIES):
1. InsightSQL (LangGraph Engine): Cyclic SQL reasoning agent with real-time schema inspection & error self-correction (https://github.com/viochris/InsightSQL-LangGraph-Engine-Web)
2. YouTube Hybrid RAG & Cost Benchmark: Empirical token/USD comparison across Vector (ChromaDB), Graph (Neo4j), and Hybrid RRF RAG (https://github.com/viochris/rag-token-benchmark-vector-graph-hybrid)
3. Auto-README Generator (CrewAI): Multi-agent documentation pipeline parsing .py and .ipynb repositories (https://github.com/viochris/auto-readme-generator)
4. Botanica AI: Full-stack React 19 + Express multimodal Gemini Vision application with 3-tier model fallback (https://github.com/viochris/botanica-ai)
5. Resume Scanner API: Dual-engine FastAPI microservice combining TF-IDF and SBERT semantic similarity (https://github.com/viochris/resume-scanner-api)

VERIFIED CERTIFICATIONS & INTELLECTUAL PROPERTY:
- Registered Copyright (No. 001072491, Dec 2025): Co-creator of StuntiFy toddler stunting detection application (community health post field-validated)
- Oracle AI Vector Search Certified Professional
- Oracle Cloud Infrastructure 2025 Certified Generative AI Professional
- Oracle Cloud Infrastructure 2025 Certified Data Science Professional
- IBM AI Engineering Specialization (Specialization & V3 Credly Credential)
- IBM Machine Learning Specialization (6-Course Credential)

LINKS & CONTACT:
- Portfolio: https://silvio-ai-portfolio.vercel.app
- GitHub: https://github.com/viochris
- LinkedIn: https://www.linkedin.com/in/silvio-christian-joe
- Medium: https://medium.com/@silviochristian
- Email: viochristian12@gmail.com | WhatsApp: +62 895-3426-37871`;

  const handleCopyCandidateSummary = async () => {
    try {
      await navigator.clipboard.writeText(candidateSummaryText);
      setCopiedSummary(true);
      window.setTimeout(() => setCopiedSummary(false), 3000);
    } catch {
      // Fallback if clipboard permission is restricted
    }
  };

  useEffect(() => {
    let active = true;
    const cached = readCachedGitHubStats();
    if (cached) {
      setGhStats(cached);
      setLoadingGh(false);
    }

    fetchCachedGitHubStats().then((stats) => {
      if (active) {
        setGhStats(stats);
        setLoadingGh(false);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  const shiftedCommitData = useMemo(() => {
    return rawCommitData
      .map((d) => {
        const shiftedHour = (d.hour + offset + 24) % 24;
        return {
          hour: shiftedHour.toString(),
          commits: d.commits,
          originalHour: d.hour,
        };
      })
      .sort((a, b) => parseInt(a.hour, 10) - parseInt(b.hour, 10));
  }, [offset]);

  const currentTimezoneLabel = useMemo(() => {
    const tz = timezones.find((t) => parseInt(t.value, 10) === offset);
    return tz ? tz.display : "UTC +0:00";
  }, [offset]);

  const currentTimezoneShort = useMemo(() => {
    const tz = timezones.find((t) => parseInt(t.value, 10) === offset);
    return tz ? tz.short : "UTC";
  }, [offset]);

  return (
    <div className="pt-28 lg:pt-36 pb-20 px-4 sm:px-6 lg:px-12 min-h-screen">
      <section id="about" className="max-w-7xl mx-auto space-y-24">
        {/* Intro + Education Sticky */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 w-full items-start">
          <div className="w-full lg:w-1/2 flex flex-col space-y-6">
            <div className="space-y-4">
              <Badge variant="outline" className="text-primary tracking-[0.22em] uppercase px-3.5 border-primary/30 text-[11px]">
                The Architect
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-black uppercase tracking-tight text-foreground">
                About <span className="text-primary">Me</span>
              </h1>
            </div>

            <div className="space-y-5 text-zinc-300 leading-relaxed text-base sm:text-lg">
              <p>
                I am Silvio Christian, Joe, an Informatics Engineering student at Dian Nuswantoro University (UDINUS) focused on Data Science and AI Engineering. My work centers on turning raw data into reliable systems, starting from custom ETL pipelines when off-the-shelf datasets fall short, through predictive Tabular Modeling and Natural Language Processing (NLP).
              </p>
              <p>
                Beyond traditional predictive models, I design stateful reasoning systems and autonomous AI Agents. From grounded Retrieval-Augmented Generation (RAG) workflows to ReAct and LangGraph agents that invoke tools and self-correct, I build the orchestration backends that keep intelligent components dependable.
              </p>
              <p>
                To deliver real-world utility, I deploy models behind FastAPI services, interactive Streamlit dashboards, and Telegram bots. When rapid web or mobile interfaces are needed, I use Vibe Coding alongside core software engineering practices to ship end-to-end applications cleanly.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-primary/25 bg-primary/5 flex items-center gap-4">
              <span className="relative flex h-3 w-3 shrink-0" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <div className="flex-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-primary mb-0.5">
                  Availability
                </div>
                <div className="text-sm font-bold text-white uppercase tracking-wide">
                  Open for Roles, Freelance &amp; Collaborations
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" size="icon" className="w-12 h-12 rounded-xl text-primary hover:bg-primary/10 border-primary/25" asChild>
                <a href="https://github.com/viochris" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
                  <Github className="w-5 h-5" aria-hidden="true" />
                </a>
              </Button>
              <Button variant="outline" size="icon" className="w-12 h-12 rounded-xl text-primary hover:bg-primary/10 border-primary/25" asChild>
                <a href="https://www.linkedin.com/in/silvio-christian-joe" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
                  <Linkedin className="w-5 h-5" aria-hidden="true" />
                </a>
              </Button>
              <Button variant="outline" size="icon" className="w-12 h-12 rounded-xl text-primary hover:bg-primary/10 border-primary/25" asChild>
                <a href="mailto:viochristian12@gmail.com" aria-label="Send email">
                  <Mail className="w-5 h-5" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>

          <div className="w-full lg:w-1/2 lg:sticky lg:top-28">
            <div className="p-6 sm:p-8 lg:p-10 bg-card rounded-2xl border border-border/80">
              <div className="flex items-center gap-3 mb-7">
                <GraduationCap className="text-primary w-6 h-6 shrink-0" aria-hidden="true" />
                <h2 className="text-xl font-headline font-bold text-white tracking-wider uppercase">
                  Education Roadmap
                </h2>
              </div>

              <div className="relative border-l-2 border-border ml-3">
                {educationData.map((edu, index) => (
                  <div key={index} className="mb-8 last:mb-0 ml-7 relative">
                    <span
                      aria-hidden="true"
                      className="absolute flex items-center justify-center w-3.5 h-3.5 bg-primary rounded-full -left-[35px] top-1.5 ring-4 ring-card"
                    />
                    <div className="flex flex-col">
                      <span className="text-primary font-bold text-xs uppercase tracking-wider mb-1">
                        {edu.period}
                      </span>
                      <h3 className="text-lg sm:text-xl font-headline font-bold text-white mb-0.5">
                        {edu.degree}
                      </h3>
                      <div className="text-sm sm:text-base text-zinc-300 font-medium mb-2">
                        {edu.institution}
                      </div>
                      <div className="text-sm text-zinc-400 leading-relaxed">
                        {edu.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Technical Milestones */}
        <div className="space-y-10">
          <div className="text-center space-y-3">
            <Badge variant="outline" className="text-primary tracking-[0.22em] uppercase py-1 px-3.5 border-primary/30 text-[11px]">
              Evolution
            </Badge>
            <h2 className="text-3xl md:text-5xl font-headline font-black uppercase tracking-tight text-white">
              Technical <span className="text-primary">Milestones</span>
            </h2>
          </div>

          <div className="relative w-full">
            <Carousel opts={{ align: "start", loop: false }} className="w-full">
              <CarouselContent className="-ml-4 items-stretch">
                {technicalMilestones.map((m, i) => (
                  <CarouselItem key={m.title} className="pl-4 basis-full md:basis-1/2 flex flex-col">
                    <button
                      type="button"
                      onClick={() => setOpenMilestoneIdx(i)}
                      className="p-7 bg-card rounded-2xl border border-border/80 flex flex-col items-center text-center group hover:border-primary/40 transition-colors flex-1 w-full"
                    >
                      <div className="text-2xl font-headline font-black text-primary/40 group-hover:text-primary transition-colors mb-3">
                        {m.year}
                      </div>
                      <h3 className="text-lg font-headline font-bold text-white mb-2 uppercase tracking-wider sm:min-h-[3.25rem] flex items-center justify-center">
                        {m.title}
                      </h3>
                      <p className="text-sm text-zinc-400 leading-relaxed flex-1">
                        {m.shortSummary}
                      </p>
                      <span className="mt-auto pt-4 text-[11px] font-bold uppercase tracking-wider text-primary">
                        View Details
                      </span>
                    </button>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex left-3 h-10 w-10 bg-card/90 border-border hover:bg-primary hover:text-primary-foreground" />
              <CarouselNext className="hidden sm:flex right-3 h-10 w-10 bg-card/90 border-border hover:bg-primary hover:text-primary-foreground" />
            </Carousel>
          </div>

          <Dialog open={openMilestoneIdx !== null} onOpenChange={(open) => !open && setOpenMilestoneIdx(null)}>
            <DialogContent className="bg-card/95 backdrop-blur-xl border-border rounded-2xl sm:max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogTitle className="sr-only">Technical Milestone Detail</DialogTitle>
              <DialogDescription className="sr-only">Details about the selected technical milestone.</DialogDescription>
              {openMilestoneIdx !== null && (
                <>
                  <DialogHeader>
                    <div className="text-2xl font-headline font-black text-primary uppercase">
                      {technicalMilestones[openMilestoneIdx].year}
                    </div>
                    <div className="text-xl font-headline font-bold text-foreground uppercase tracking-wider">
                      {technicalMilestones[openMilestoneIdx].title}
                    </div>
                  </DialogHeader>

                  <div className="space-y-5 mt-2">
                    <div className="p-6 bg-primary/5 rounded-xl border border-primary/15">
                      <h4 className="text-primary font-bold uppercase tracking-wider text-xs mb-4 flex items-center gap-2">
                        <Info className="w-4 h-4" aria-hidden="true" /> Detailed Breakdown
                      </h4>
                      <ul className="space-y-3">
                        {technicalMilestones[openMilestoneIdx].details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-zinc-200 leading-relaxed text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" aria-hidden="true" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="font-headline font-bold uppercase text-xs tracking-wider gap-1.5 hover:bg-primary/10"
                        onClick={() =>
                          setOpenMilestoneIdx((prev) => (prev! > 0 ? prev! - 1 : technicalMilestones.length - 1))
                        }
                      >
                        <ChevronLeft className="w-4 h-4" aria-hidden="true" /> Previous
                      </Button>
                      <div className="text-xs font-bold text-zinc-400">
                        {openMilestoneIdx + 1} / {technicalMilestones.length}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="font-headline font-bold uppercase text-xs tracking-wider gap-1.5 hover:bg-primary/10"
                        onClick={() =>
                          setOpenMilestoneIdx((prev) => (prev! < technicalMilestones.length - 1 ? prev! + 1 : 0))
                        }
                      >
                        Next <ChevronRight className="w-4 h-4" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>

        {/* Professional Interests */}
        <div id="interests" className="scroll-mt-28 space-y-10">
          <div className="text-center space-y-3">
            <Badge variant="outline" className="text-primary tracking-[0.22em] uppercase py-1 px-3.5 border-primary/30 text-[11px]">
              Focus Areas
            </Badge>
            <h2 className="text-3xl md:text-5xl font-headline font-black uppercase tracking-tight text-white">
              Professional <span className="text-primary">Interests</span>
            </h2>
          </div>

          <div className="relative w-full">
            <Carousel opts={{ align: "start", loop: false }} className="w-full">
              <CarouselContent className="-ml-4 items-stretch">
                {interestData.map((item, i) => (
                  <CarouselItem key={item.title} className="pl-4 basis-full md:basis-1/2 flex flex-col">
                    <button
                      type="button"
                      onClick={() => setOpenInterestIdx(i)}
                      className="p-7 bg-card rounded-2xl border border-border/80 hover:border-primary/40 transition-colors group flex flex-col items-center text-center flex-1 w-full"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 shrink-0">
                        {item.icon}
                      </div>
                      <h3 className="text-lg font-headline font-bold text-white mb-2 uppercase tracking-wider group-hover:text-primary transition-colors sm:min-h-[3.25rem] flex items-center justify-center">
                        {item.title}
                      </h3>
                      <p className="text-sm text-zinc-400 leading-relaxed flex-1">
                        {item.desc}
                      </p>
                      <span className="mt-auto pt-4 text-[11px] font-bold uppercase tracking-wider text-primary">
                        Inspect Projects
                      </span>
                    </button>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex left-3 h-10 w-10 bg-card/90 border-border hover:bg-primary hover:text-primary-foreground" />
              <CarouselNext className="hidden sm:flex right-3 h-10 w-10 bg-card/90 border-border hover:bg-primary hover:text-primary-foreground" />
            </Carousel>
          </div>

          <Dialog open={openInterestIdx !== null} onOpenChange={(open) => !open && setOpenInterestIdx(null)}>
            <DialogContent className="bg-card/95 backdrop-blur-xl border-border rounded-2xl sm:max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogTitle className="sr-only">Expertise Detail</DialogTitle>
              <DialogDescription className="sr-only">
                Detailed methodology and related projects for the selected focus area.
              </DialogDescription>
              {openInterestIdx !== null && (
                <>
                  <DialogHeader>
                    <div className="flex items-center gap-3.5 text-xl md:text-2xl font-headline font-bold text-foreground">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        {interestData[openInterestIdx].icon}
                      </div>
                      <span>{interestData[openInterestIdx].title}</span>
                    </div>
                  </DialogHeader>

                  <div className="space-y-6 mt-2">
                    <div className="p-5 bg-primary/5 rounded-xl border border-primary/15">
                      <h4 className="text-primary font-bold uppercase tracking-wider text-xs mb-2.5 flex items-center gap-2">
                        <BrainCircuit className="w-4 h-4" aria-hidden="true" /> Methodology &amp; Vision
                      </h4>
                      <p className="text-zinc-200 leading-relaxed text-sm">
                        {interestData[openInterestIdx].details}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-foreground font-bold uppercase tracking-wider text-xs">
                        Related Repositories
                      </h4>
                      <div className="grid gap-2.5">
                        {interestData[openInterestIdx].projects.map((proj) => (
                          <div
                            key={proj.name}
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-xl bg-background/70 border border-border hover:border-primary/30 transition-colors"
                          >
                            <span className="text-sm font-semibold text-white">{proj.name}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-9 px-3 rounded-lg text-xs font-bold uppercase tracking-wider bg-white/5 hover:bg-primary hover:text-primary-foreground w-fit gap-1.5"
                              asChild
                            >
                              <a href={proj.github} target="_blank" rel="noopener noreferrer">
                                <Github className="w-3.5 h-3.5" aria-hidden="true" /> Repository
                              </a>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="font-headline font-bold uppercase text-xs tracking-wider gap-1.5 hover:bg-primary/10"
                        onClick={() =>
                          setOpenInterestIdx((prev) => (prev! > 0 ? prev! - 1 : interestData.length - 1))
                        }
                      >
                        <ChevronLeft className="w-4 h-4" aria-hidden="true" /> Previous
                      </Button>
                      <div className="text-xs font-bold text-zinc-400">
                        {openInterestIdx + 1} / {interestData.length}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="font-headline font-bold uppercase text-xs tracking-wider gap-1.5 hover:bg-primary/10"
                        onClick={() =>
                          setOpenInterestIdx((prev) => (prev! < interestData.length - 1 ? prev! + 1 : 0))
                        }
                      >
                        Next <ChevronRight className="w-4 h-4" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>

        {/* GitHub Metrics */}
        <div className="space-y-10">
          <div className="flex flex-col items-center text-center gap-3">
            <Badge variant="outline" className="text-primary tracking-[0.22em] uppercase px-3.5 border-primary/30 text-[11px]">
              Activity
            </Badge>
            <div className="flex items-center justify-center gap-3">
              <BarChart3 className="text-primary w-8 h-8" aria-hidden="true" />
              <h2 className="text-3xl md:text-5xl font-headline font-black text-white uppercase tracking-tight">
                GitHub Metrics
              </h2>
            </div>
          </div>

          <div className="w-full space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { label: "Public Repos", val: ghStats.repos, icon: <Github className="w-5 h-5 text-primary" aria-hidden="true" /> },
                { label: "Total Stars", val: ghStats.stars, icon: <Sparkles className="w-5 h-5 text-primary" aria-hidden="true" /> },
                { label: "Followers", val: ghStats.followers > 0 || ghStats.source !== 'fallback' ? ghStats.followers : "--", icon: <Users className="w-5 h-5 text-primary" aria-hidden="true" /> },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-6 bg-card rounded-2xl border border-border/80 flex flex-col items-center text-center"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-headline font-black text-white mb-1 tabular-nums">
                    {loadingGh ? "..." : stat.val}
                  </div>
                  <div className="text-xs font-bold text-primary uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { label: "Top Language", val: ghStats.topLanguages, icon: <Languages className="w-5 h-5 text-primary" aria-hidden="true" /> },
                { label: "Total Commits (All-Time)", val: ghStats.totalCommits > 0 || ghStats.source !== 'fallback' ? ghStats.totalCommits : "--", icon: <GitCommit className="w-5 h-5 text-primary" aria-hidden="true" /> },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-6 bg-card rounded-2xl border border-border/80 flex flex-col items-center text-center"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-headline font-black text-white mb-1 tracking-tight tabular-nums">
                    {loadingGh ? "..." : stat.val}
                  </div>
                  <div className="text-xs font-bold text-primary uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Commit Activity Bar Chart (Lazy Loaded) */}
        <ParallaxLayer offsetY={-20} mobileOffsetY={8} scaleRange={[0.97, 1.01]}>
          <div className="p-6 sm:p-10 bg-card rounded-2xl border border-border/80 flex flex-col">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full mb-6 gap-4">
            <div>
              <h3 className="text-3xl sm:text-5xl font-headline font-black text-primary uppercase tracking-tight leading-none">
                Commits
              </h3>
              <span className="block text-sm sm:text-lg font-headline font-bold text-zinc-300 uppercase tracking-wide mt-1.5">
                {currentTimezoneLabel}
              </span>
            </div>

            <div className="flex items-center gap-2 bg-background border border-border px-3 py-1.5 rounded-xl w-fit shrink-0">
              <Globe className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
              <Select value={offset.toString()} onValueChange={(v) => setOffset(parseInt(v, 10))}>
                <SelectTrigger
                  aria-label="Select chart timezone"
                  className="w-[130px] bg-transparent border-none text-white font-bold uppercase tracking-wider text-xs focus:ring-0 h-8 px-1 shadow-none"
                >
                  <span>{currentTimezoneShort}</span>
                </SelectTrigger>
                <SelectContent className="bg-card border-border max-h-[300px]">
                  {timezones.map((tz) => (
                    <SelectItem
                      key={tz.label}
                      value={tz.value}
                      className="text-white font-semibold text-xs cursor-pointer"
                    >
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-8 max-w-3xl">
            Snapshot of my daily coding rhythm across model training, agent debugging, and backend work, normalized from my local Asia/Jakarta (UTC+7) schedule.
          </p>

          <CommitActivityChart data={shiftedCommitData} />
        </div>
        </ParallaxLayer>

        {/* GitHub Contribution Grid */}
        <div className="p-6 sm:p-8 bg-card rounded-2xl border border-border/80 flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-zinc-300 text-xs font-bold uppercase tracking-wider">
              <Github size={15} className="text-primary" aria-hidden="true" />
              <span>GitHub Contribution Graph</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
              <span>Less</span>
              <div className="flex gap-1" aria-hidden="true">
                <div className="w-3 h-3 bg-secondary border border-border rounded-sm" />
                <div className="w-3 h-3 bg-[#0e4429] rounded-sm" />
                <div className="w-3 h-3 bg-[#006d32] rounded-sm" />
                <div className="w-3 h-3 bg-[#26a641] rounded-sm" />
                <div className="w-3 h-3 bg-[#39d353] rounded-sm" />
              </div>
              <span>More</span>
            </div>
          </div>

          <div className="w-full overflow-x-auto [color-scheme:dark] rounded-lg">
            <div className="min-w-[540px] md:min-w-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://ghchart.rshah.org/22c55e/viochris"
                alt="GitHub annual contribution activity chart for viochris"
                loading="lazy"
                className="w-full h-auto object-contain rounded-lg bg-black/30 p-3"
              />
            </div>
          </div>
        </div>

        {/* Technical Writing & Medium Articles */}
        <div id="writing" className="scroll-mt-28 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-3 text-center md:text-left">
              <Badge variant="outline" className="text-primary tracking-[0.22em] uppercase py-1 px-3.5 border-primary/30 text-[11px]">
                Technical Writing
              </Badge>
              <h2 className="text-3xl md:text-5xl font-headline font-black uppercase tracking-tight text-white">
                Latest <span className="text-primary">Articles</span>
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base max-w-2xl">
                Practical breakdowns on Large Language Model internals, Prompt Engineering foundations, and production Machine Learning feature engineering published on Medium.
              </p>
            </div>
            <Button
              variant="outline"
              className="rounded-xl border-border hover:border-primary/50 hover:bg-white/5 text-white font-headline font-bold uppercase tracking-wider text-xs h-11 px-5 w-fit mx-auto md:mx-0 shrink-0"
              asChild
            >
              <a href="https://medium.com/@silviochristian" target="_blank" rel="noopener noreferrer">
                <BookOpen className="w-4 h-4 mr-2 text-primary" aria-hidden="true" />
                View Medium Profile
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {[
              {
                title: "Before You Use AI, Understand This First",
                subtitle: "Part 1: Prompt Engineering Series & AI Literacy Guide",
                category: "AI Literacy & LLMs",
                tags: ["Artificial Intelligence", "Technology", "Machine Learning", "Programming", "Data Science"],
                summary:
                  "The concepts that most people skip, and why they should not. Before learning prompt engineering techniques, this guide cuts through the hype to explain how Large Language Models (ChatGPT, Gemini, Claude) actually process text, manage memory, and generate responses under the hood.",
                takeaways: [
                  {
                    heading: "LLMs Predict, They Do Not Think",
                    detail: "Models calculate the most probable next word repeatedly from billions of frozen training parameters rather than reasoning or learning live from your chat.",
                  },
                  {
                    heading: "Tokens: The Currency of AI",
                    detail: "Text is split into subword units (~3-4 chars, e.g. \"cat\" = 1 token, \"unbelievable\" = 3 tokens: un / believ / able). Covers both Input tokens (prompt, history, system instructions) and Output tokens (including internal thinking/reasoning steps).",
                  },
                  {
                    heading: "Context Window & Hallucinations",
                    detail: "AI working memory is finite; information outside the window is forgotten. When facing knowledge gaps, LLMs predict plausible-sounding false answers instead of saying \"I don't know.\"",
                  },
                  {
                    heading: "Temperature & Knowledge Cutoff",
                    detail: "Low temperature (near 0) enforces consistency for code and factual Q&A, while high temperature (near 1) boosts creativity (0.3-0.7 middle ground, testable in Google AI Studio). Events past the training cutoff require RAG / web search or prompt context.",
                  },
                ],
                link: "https://medium.com/@silviochristian/before-you-use-ai-understand-this-first-875525807755",
              },
              {
                title: "Why Label Encoding is Ruining Your ML Models (And How to Fix It)",
                subtitle: "Categorical Feature Engineering from Pandas to Scikit-Learn",
                category: "Feature Engineering & ML",
                tags: ["Machine Learning", "Feature Engineering", "Artificial Intelligence", "Python", "Data Science"],
                summary:
                  "Machine learning algorithms like Linear Regression (Y = mX + c) and Neural Networks cannot multiply raw text strings like \"Paris\", \"Tokyo\", or \"New York\". This article explains how to design a numerical translation layer without injecting fatal mathematical bias into production models.",
                takeaways: [
                  {
                    heading: "The Architectural Trap of Label Encoding",
                    detail: "Assigning sequential integers (Paris = 1, Tokyo = 2, New York = 3) to equal Nominal categories forces a fake ordinal hierarchy (New York > Tokyo > Paris), tricking the loss function into assuming 3x scalar magnitude.",
                  },
                  {
                    heading: "Binary Matrices via One-Hot Encoding (OHE)",
                    detail: "Splits N unique categories into N orthogonal binary (1/0 or True/False) vector dimensions (Is_Paris, Is_Tokyo, Is_New_York) so every category has equidistant mathematical weight.",
                  },
                  {
                    heading: "Pandas get_dummies() vs. Scikit-Learn OneHotEncoder",
                    detail: "pd.get_dummies() works for Jupyter EDA but lacks state memory and breaks on single-row FastAPI inference requests. Production pipelines require stateful Scikit-Learn OneHotEncoder(sparse_output=False) and get_feature_names_out().",
                  },
                  {
                    heading: "Curse of Dimensionality & Dummy Variable Trap",
                    detail: "Addresses 500+ high-cardinality sparse columns (solved via Target Encoding or Deep Learning Embeddings) and eliminates multicollinearity between redundant columns using drop_first=True or OneHotEncoder(drop='first').",
                  },
                ],
                link: "https://medium.com/@silviochristian/why-label-encoding-is-ruining-your-ml-models-and-how-to-fix-it-d83eab34e7f3",
              },
            ].map((post) => (
              <article
                key={post.title}
                className="p-7 sm:p-8 bg-card rounded-2xl border border-border/80 hover:border-primary/40 transition-colors flex flex-col h-full group"
              >
                {/* Row 1: Category & Source Pill */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <Badge className="bg-primary/15 text-primary border-none text-[10px] font-bold uppercase tracking-wider px-2.5 py-1">
                    {post.category}
                  </Badge>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    Medium Article
                  </span>
                </div>

                {/* Row 2: Fixed-Height Title & Subtitle Zone for Horizontal Alignment */}
                <div className="lg:min-h-[5.25rem] flex flex-col justify-between mb-4">
                  <h3 className="text-xl sm:text-2xl font-headline font-bold text-white group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <div className="text-xs font-bold uppercase tracking-wider text-primary/85 mt-1.5">
                    {post.subtitle}
                  </div>
                </div>

                {/* Row 3: Official Medium Tags */}
                <div className="flex flex-wrap items-center gap-1.5 lg:min-h-[2rem] mb-4">
                  {post.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="bg-background/60 border-border text-zinc-300 text-[10px] font-semibold px-2.5 py-0.5"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Row 4: Fixed-Height Overview Paragraph */}
                <p className="text-sm text-zinc-300 leading-relaxed lg:min-h-[5.25rem] mb-5">
                  {post.summary}
                </p>

                {/* Row 5: Equal-Height Structured Section Breakdown Box */}
                <div className="p-5 rounded-xl bg-background/70 border border-border/80 flex-1 flex flex-col justify-between space-y-3.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-primary border-b border-border/60 pb-2.5">
                    Key Concepts Covered in the Article
                  </div>
                  <ul className="space-y-3 flex-1 flex flex-col justify-between">
                    {post.takeaways.map((item, idx) => (
                      <li key={item.heading} className="flex items-start gap-3 text-xs sm:text-sm leading-relaxed">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-primary/15 text-primary font-code font-bold text-[11px] shrink-0 mt-0.5">
                          0{idx + 1}
                        </span>
                        <div className="text-zinc-300">
                          <strong className="text-white font-semibold">{item.heading}:</strong>{' '}
                          <span>{item.detail}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Row 6: Footer Button */}
                <div className="pt-6 mt-6 border-t border-border/60">
                  <Button
                    variant="outline"
                    className="w-full h-12 rounded-xl border-border hover:bg-primary hover:text-primary-foreground hover:border-primary text-white font-headline font-bold uppercase tracking-wider text-xs transition-colors"
                    asChild
                  >
                    <a href={post.link} target="_blank" rel="noopener noreferrer">
                      <BookOpen className="w-4 h-4 mr-2" aria-hidden="true" />
                      Read Full Article on Medium
                    </a>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Beyond The Code */}
        <div className="p-8 sm:p-12 bg-card rounded-2xl border border-primary/25">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <Badge variant="outline" className="text-primary tracking-[0.22em] uppercase py-1 px-3.5 border-primary/30 text-[11px]">
                Personal Interests
              </Badge>
              <h2 className="text-3xl md:text-4xl font-headline font-black uppercase tracking-tight text-white">
                Beyond The <span className="text-primary">Code</span>
              </h2>
              <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Outside coursework, I spend most of my time building practical AI prototypes. Rather than only reading release notes, I test new frameworks hands-on by deploying agent workflows to Hugging Face or experimenting with tabular datasets on Kaggle.
                </p>
                <p>
                  I also create bite-sized educational content to share practical data science and AI engineering lessons with the developer community.
                </p>
                <p>
                  My goal is consistent: take complex AI tooling and package it into intuitive applications anyone can use without reading a manual.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 items-stretch">
              {[
                { label: "Builder", sub: "Personal Projects", icon: <Layout className="w-5 h-5 text-primary" aria-hidden="true" /> },
                { label: "Explorer", sub: "Hugging Face & Kaggle", icon: <Search className="w-5 h-5 text-primary" aria-hidden="true" /> },
                { label: "Creator", sub: "Data Edu Content", icon: <Sparkles className="w-5 h-5 text-primary" aria-hidden="true" /> },
                { label: "Learner", sub: "New AI Frameworks", icon: <BookOpen className="w-5 h-5 text-primary" aria-hidden="true" /> },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-6 bg-background/70 rounded-xl border border-border flex flex-col items-center justify-center text-center h-full"
                >
                  <div className="mb-3">{item.icon}</div>
                  <div className="text-base font-headline font-bold text-white uppercase mb-0.5">{item.label}</div>
                  <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Collaborate Actions */}
        <div className="text-center space-y-8">
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-headline font-bold uppercase tracking-wider text-white">
              Collaborate
            </h2>
            <Separator className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="w-full space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={cvDownloadLink}
                download="Silvio-Christian-Joe-resume.pdf"
                className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-headline font-bold text-primary-foreground transition-colors bg-primary hover:bg-primary/90 uppercase tracking-wider text-xs min-h-[48px]"
              >
                <Download className="w-4 h-4" aria-hidden="true" /> Download Resume
              </a>

              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-headline font-bold text-white transition-colors bg-card border border-border hover:border-primary/50 hover:bg-white/5 uppercase tracking-wider text-xs min-h-[48px]"
                  >
                    <Eye className="w-4 h-4 text-primary" aria-hidden="true" /> Preview Resume
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-4xl w-[95vw] h-[90vh] bg-card/95 backdrop-blur-xl border-border rounded-2xl flex flex-col">
                  <DialogHeader className="pb-4 border-b border-border pr-10">
                    <DialogTitle className="text-2xl font-headline font-bold text-foreground">
                      Curriculum Vitae Preview
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                      Preview of Silvio Christian, Joe&apos;s resume
                    </DialogDescription>
                  </DialogHeader>
                  <ResumePreviewFrame downloadHref={cvDownloadLink} rawPdfHref={cvRawLink} />
                </DialogContent>
              </Dialog>

              <a
                href="mailto:viochristian12@gmail.com"
                className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-headline font-bold text-white transition-colors bg-card border border-border hover:border-primary/50 hover:bg-white/5 uppercase tracking-wider text-xs min-h-[48px]"
              >
                <Mail className="w-4 h-4 text-primary" aria-hidden="true" /> Email Directly
              </a>

              <a
                href="https://www.linkedin.com/in/silvio-christian-joe"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-headline font-bold text-white transition-colors bg-card border border-border hover:border-primary/50 hover:bg-white/5 uppercase tracking-wider text-xs min-h-[48px]"
              >
                <Linkedin className="w-4 h-4 text-primary" aria-hidden="true" /> LinkedIn Profile
              </a>
            </div>

            <a
              href="https://wa.me/62895342637871"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-headline font-bold text-white transition-colors bg-card border border-border hover:border-primary/50 hover:bg-white/5 uppercase tracking-wider text-xs min-h-[48px]"
            >
              <Phone className="w-4 h-4 text-primary" aria-hidden="true" /> WhatsApp Message
            </a>

            {/* Quick Candidate Summary for Recruiters & HR Tools */}
            <div className="mt-6 p-6 sm:p-7 rounded-2xl bg-card border border-primary/30 text-left space-y-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                    <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>For Recruiters, Hiring Managers &amp; AI Assistants</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-headline font-bold uppercase tracking-wide text-white">
                    1-Click Candidate Executive Summary
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-3xl">
                    <strong>What is this for?</strong> If you are a recruiter or hiring manager evaluating my profile, click the button to copy a structured plain-text summary of my education (3.96 GPA), core AI/ML stack, top repositories, Oracle/IBM certifications, and direct contact links, ready to paste directly into hiring team notes, Slack/WhatsApp, or internal HR/ATS AI tools.
                  </p>
                </div>

                <Button
                  type="button"
                  onClick={handleCopyCandidateSummary}
                  className="h-12 px-6 rounded-xl font-headline font-bold uppercase tracking-wider text-xs shrink-0 gap-2"
                >
                  {copiedSummary ? (
                    <>
                      <Check className="w-4 h-4" aria-hidden="true" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" aria-hidden="true" />
                      <span>Copy Candidate Summary</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
