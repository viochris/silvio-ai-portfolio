"use client"

import React, { useEffect, useState } from 'react';
import {
  Languages,
  Brain,
  Code,
  Database,
  Cloud,
  Award,
  Sparkles,
  Wrench,
  GraduationCap,
  ChevronRight,
  Rocket,
  Zap,
  Briefcase,
  ExternalLink,
  Github,
  CheckCircle2,
  Workflow,
} from 'lucide-react';
import { RadarChart } from '@/components/RadarChart';
import { ParallaxLayer } from '@/components/Parallax';
import { TechIcon } from '@/components/TechIcon';
import { IssuerLogo } from '@/components/IssuerLogo';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { professionalCertifications, courseBadges } from '@/lib/credentials-data';
import { AllCredentialsPage } from '@/components/AllCredentialsPage';
import { useNavigation } from '@/context/NavigationContext';

const roleProfiles = [
  {
    id: "ai-engineer",
    role: "AI & LLM Engineer",
    tagline: "Stateful Agent Orchestration, Multi-Agent Workflows & LLMOps",
    fitSummary:
      "Designs and deploys autonomous AI agents using LangGraph, CrewAI, and LangChain with cyclic self-correction, structured JSON outputs, cascaded model fallback, and OpenTelemetry tracing via Arize Phoenix and LiteLLM.",
    coreStack: [
      "Python",
      "Google Gemini",
      "LangGraph",
      "CrewAI",
      "LangChain",
      "LlamaIndex",
      "LiteLLM",
      "Phoenix Arize",
      "Groq",
      "FastAPI",
      "React",
      "TypeScript",
      "Express",
      "Streamlit",
    ],
    projects: [
      {
        name: "InsightSQL (LangGraph Engine)",
        desc: "Cyclic SQL reasoning agent with real-time schema inspection and error self-correction.",
        github: "https://github.com/viochris/InsightSQL-LangGraph-Engine-Web",
        demo: "https://insightsql-langgraph-engine-web.streamlit.app/",
      },
      {
        name: "Auto-README Generator (CrewAI)",
        desc: "2-node autonomous CrewAI pipeline parsing .py and .ipynb files into technical documentation.",
        github: "https://github.com/viochris/auto-readme-generator",
        demo: "https://crewai-auto-readme-generator.streamlit.app/",
      },
      {
        name: "Botanica AI (Plant Care Companion)",
        desc: "Full-stack React 19 + Express multimodal Gemini Vision app with 3-tier model fallback.",
        github: "https://github.com/viochris/botanica-ai",
        demo: "https://botanica-ai-mu.vercel.app/",
      },
      {
        name: "SpendSense (Financial AI)",
        desc: "Multimodal receipt OCR and conversational Pandas financial ledger.",
        github: "https://github.com/viochris/Streamlit-SpendSense",
        demo: "https://app-spend-sense.streamlit.app/",
      },
    ],
    credentials: [
      {
        title: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
        issuer: "Oracle",
        link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=40E9CE3B4043AABCE1D5A50A49B186938C1CA875CE938837F73EAA2D40B3FE4F",
      },
      {
        title: "Generative AI: Prompt Engineering Basics",
        issuer: "IBM",
        link: "https://www.coursera.org/account/accomplishments/verify/KK8QSSBWX0BO",
      },
      {
        title: "Code Generation and Optimization Using IBM Granite",
        issuer: "IBM",
        link: "https://www.credly.com/badges/85551651-e483-41e7-8395-f0b63f41f5c4/linked_in_profile",
      },
    ],
  },
  {
    id: "nlp-rag",
    role: "NLP & RAG Specialist",
    tagline: "Vector, Graph & Hybrid Retrieval with Cross-Encoder Reranking",
    fitSummary:
      "Builds grounded Retrieval-Augmented Generation and semantic NLP systems across ChromaDB, Neo4j Property Graphs, FAISS, and Pinecone, benchmarked for token efficiency and reranked with Hugging Face Cross-Encoders and SBERT.",
    coreStack: [
      "Python",
      "LlamaIndex",
      "ChromaDB",
      "Neo4j",
      "FAISS",
      "Pinecone",
      "Hugging Face",
      "LangChain",
      "PostgreSQL",
      "SQLAlchemy",
      "LiteLLM",
      "Phoenix Arize",
      "Trafilatura",
      "FastAPI",
    ],
    projects: [
      {
        name: "YouTube Hybrid RAG (ChromaDB + Neo4j)",
        desc: "Reciprocal Rank Fusion over vector embeddings and LLM-extracted Neo4j knowledge graph triplets.",
        github: "https://github.com/viochris/youtube-hybrid-rag-llamaindex",
      },
      {
        name: "RAG Token & Cost Benchmark Lab",
        desc: "Empirical token and USD cost comparison across Vector, Graph, and Hybrid RAG architectures.",
        github: "https://github.com/viochris/rag-token-benchmark-vector-graph-hybrid",
      },
      {
        name: "Resume Scanner API (SBERT + TF-IDF)",
        desc: "Dual-engine FastAPI service combining strict TF-IDF keyword matching with SBERT semantic similarity.",
        github: "https://github.com/viochris/resume-scanner-api",
        demo: "https://silvio0-resume-scanner.hf.space/docs",
      },
      {
        name: "Rule-Grounded RAG Bot",
        desc: "Citation-enforced document Q&A pipeline designed to minimize ungrounded hallucinations.",
        github: "https://github.com/viochris/Rule-Grounded-RAG-Bot",
      },
    ],
    credentials: [
      {
        title: "Oracle AI Vector Search Certified Professional",
        issuer: "Oracle",
        link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=4813172AB028B1405B6E5A45DB8E4BE52AD4CE92F78A90BAE7FDFD4F43D6C909",
      },
      {
        title: "Data Classification and Summarization Using IBM Granite",
        issuer: "IBM",
        link: "https://www.credly.com/badges/1cbf6431-f4e9-4ab6-8af5-fb42dcbcd43f/linked_in_profile",
      },
      {
        title: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
        issuer: "Oracle",
        link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=40E9CE3B4043AABCE1D5A50A49B186938C1CA875CE938837F73EAA2D40B3FE4F",
      },
    ],
  },
  {
    id: "data-scientist",
    role: "Data Scientist (Tabular & ML)",
    tagline: "Feature Engineering, Predictive Modeling & Automated EDA",
    fitSummary:
      "Executes end-to-end machine learning pipelines from statistical hypothesis testing and stateful Scikit-Learn feature encoding to supervised classification, regression, clustering, and interactive BI dashboards.",
    coreStack: [
      "Python",
      "SQL",
      "Pandas",
      "NumPy",
      "Scikit-Learn",
      "XGBoost",
      "CatBoost",
      "LightGBM",
      "Optuna",
      "LIME & SHAP",
      "TensorFlow",
      "Keras",
      "Tableau",
      "Gradio",
    ],
    projects: [
      {
        name: "InsightData (AI Data Scientist Agent)",
        desc: "ReAct Pandas agent that profiles CSV/Excel datasets, cleans missing values, and plots charts.",
        github: "https://github.com/viochris/insight-data-ai-analyst",
        demo: "https://insight-data-ai-analyst.streamlit.app/",
      },
      {
        name: "Credit Card Fraud Detection",
        desc: "Imbalanced classification pipeline evaluating precision-recall trade-offs on financial transactions.",
        github: "https://github.com/viochris/credit-card-fraud-detection",
      },
      {
        name: "Data Science Salary Predictor",
        desc: "End-to-end regression model and interactive salary estimation web app.",
        github: "https://github.com/viochris/ds-salary-predictor",
        demo: "https://ds-salary-predictor.streamlit.app/",
      },
      {
        name: "E-Commerce Analytics Dashboard",
        desc: "Executive Tableau and Python customer behavior and revenue performance analytics.",
        github: "https://github.com/viochris/ecommerce-analytics-dashboard",
      },
    ],
    credentials: [
      {
        title: "Oracle Cloud Infrastructure 2025 Certified Data Science Professional",
        issuer: "Oracle",
        link: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=50CEB7D6BF8197A8FA3F0E350EAC9B23927763A843112293AE7418E973E631F1",
      },
      {
        title: "IBM Machine Learning Specialization (6-Course Credential)",
        issuer: "IBM",
        link: "https://www.coursera.org/account/accomplishments/specialization/DK8C6XS82OR3",
      },
      {
        title: "Statistics for Data Science with Python",
        issuer: "IBM",
        link: "https://www.coursera.org/account/accomplishments/verify/WQD6NXX2GWIX",
      },
    ],
  },
  {
    id: "backend-automation",
    role: "Backend & Automation Engineer",
    tagline: "FastAPI Microservices, ETL Pipelines & Telegram Bot Systems",
    fitSummary:
      "Packages AI and data workflows into stateless REST APIs, scheduled Prefect ETL pipelines, containerized Docker services, and real-time Telegram bots with rate limiting and input validation.",
    coreStack: [
      "Python",
      "SQL",
      "FastAPI",
      "Flask",
      "Express",
      "PostgreSQL",
      "Supabase",
      "MySQL",
      "SQLite",
      "SQLAlchemy",
      "Prefect",
      "Docker",
      "Telegram Bot API",
      "Google Apps Script",
    ],
    projects: [
      {
        name: "Resume Scanner FastAPI Service",
        desc: "Production-deployed FastAPI microservice on Hugging Face Spaces with Swagger OpenAPI docs.",
        github: "https://github.com/viochris/resume-scanner-api",
        demo: "https://silvio0-resume-scanner.hf.space/docs",
      },
      {
        name: "Toxicity Shield API",
        desc: "Real-time content moderation REST API for detecting toxic and abusive user comments.",
        github: "https://github.com/viochris/toxicity-shield-api",
        demo: "https://silvio0-toxicity-shield-api.hf.space/docs",
      },
      {
        name: "Automated Crypto ETL Pipeline",
        desc: "Scheduled data extraction, transformation, and database loading workflow orchestrated with Prefect.",
        github: "https://github.com/viochris/crypto-etl-pipeline",
      },
      {
        name: "AI Financial Tracker Telegram Bot",
        desc: "Conversational Telegram bot logging daily expenses and querying financial summaries.",
        github: "https://github.com/viochris/ai-financial-tracker-bot",
      },
    ],
    credentials: [
      {
        title: "Structured Query Language (SQL) Fundamentals",
        issuer: "Dicoding",
        link: "https://www.dicoding.com/certificates/2VX35VJQJPYQ",
      },
      {
        title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
        issuer: "Oracle",
        link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=2B33EA8062DFC9C8C1FE58518F6E32D13E126A9A8F2482ADFACAA2B47FB491AA",
      },
      {
        title: "Practical AI for Productivity",
        issuer: "Dicoding",
        link: "https://www.dicoding.com/certificates/4EXGVW86DXRL",
      },
    ],
  },
];

const skills = [
  { name: "GenAI", value: 95 },
  { name: "NLP", value: 88 },
  { name: "Automation", value: 85 },
  { name: "Data", value: 85 },
  { name: "ML", value: 82 },
  { name: "Vibe Coding", value: 82 },
  { name: "Deployment", value: 78 },
  { name: "Backend", value: 75 },
  { name: "Cloud", value: 50 },
];

const techStacks = [
  {
    category: "Languages",
    items: ["Python", "SQL", "TypeScript"],
  },
  {
    category: "Data Science, ML & XAI",
    items: [
      "Pandas",
      "NumPy",
      "Scikit-Learn",
      "XGBoost",
      "CatBoost",
      "LightGBM",
      "TensorFlow",
      "Keras",
      "Optuna",
      "LIME & SHAP",
    ],
  },
  {
    category: "NLP, GenAI & LLMOps",
    items: [
      "Google Gemini",
      "Groq",
      "Hugging Face",
      "LangChain",
      "LangGraph",
      "LlamaIndex",
      "CrewAI",
      "LiteLLM",
      "Phoenix Arize",
      "FAISS",
      "Pinecone",
      "ChromaDB",
      "OpenCV",
    ],
  },
  {
    category: "Web Frameworks, UI & Full-Stack",
    items: [
      "FastAPI",
      "Flask",
      "Streamlit",
      "Gradio",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Express",
    ],
  },
  {
    category: "Databases & ORM",
    items: ["PostgreSQL", "Neo4j", "MySQL", "SQLite", "Supabase", "SQLAlchemy"],
  },
  {
    category: "Automation, Bots & DevOps",
    items: [
      "Telegram Bot API",
      "Prefect",
      "Docker",
      "Trafilatura",
      "Google Apps Script",
    ],
  },
  {
    category: "Analytics & Visualization",
    items: ["Tableau", "Power BI", "Looker Studio", "Microsoft Excel", "Matplotlib", "Seaborn"],
  },
  {
    category: "Environment & Tooling",
    items: ["Google Colab", "Kaggle", "Jupyter", "Git", "VS Code", "Google Antigravity", "Firebase Studio"],
  },
];

const nextRadar = [
  "DSPy",
  "Langfuse",
  "FastMCP",
  "Google ADK",
  "PyTorch",
  "BeautifulSoup (BS4)",
  "Scrapy",
  "Selenium",
  "Playwright",
];

function getSkillIcon(name: string) {
  const cls = "w-5 h-5 text-primary shrink-0";
  switch (name) {
    case 'NLP':
      return <Languages className={cls} aria-hidden="true" />;
    case 'GenAI':
      return <Sparkles className={cls} aria-hidden="true" />;
    case 'Vibe Coding':
      return <Zap className={cls} aria-hidden="true" />;
    case 'Automation':
      return <Workflow className={cls} aria-hidden="true" />;
    case 'Deployment':
      return <Rocket className={cls} aria-hidden="true" />;
    case 'Backend':
      return <Code className={cls} aria-hidden="true" />;
    case 'Data':
      return <Database className={cls} aria-hidden="true" />;
    case 'ML':
      return <Brain className={cls} aria-hidden="true" />;
    case 'Cloud':
      return <Cloud className={cls} aria-hidden="true" />;
    default:
      return null;
  }
}

export default function SkillsPage() {
  const {
    activeTab,
    setActiveTab,
    credentialTab,
    setCredentialTab,
    isReturning,
    setIsReturning,
  } = useNavigation();
  const [selectedRoleId, setSelectedRoleId] = useState<string>("ai-engineer");
  const activeRole = roleProfiles.find((r) => r.id === selectedRoleId) || roleProfiles[0];

  useEffect(() => {
    if (isReturning) {
      const timer = window.setTimeout(() => {
        const targetId = credentialTab === 'Certifications' ? 'certifications-section' : 'badges-section';
        const element = document.getElementById(targetId);
        if (element) {
          const yOffset = -100;
          const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
        setIsReturning(false);
      }, 100);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [isReturning, credentialTab, setIsReturning]);

  if (activeTab === 'Credentials') {
    return (
      <AllCredentialsPage
        setActiveTab={setActiveTab}
        credentialTab={credentialTab}
        setCredentialTab={setCredentialTab}
        setIsReturning={setIsReturning}
      />
    );
  }

  const diverseCertifications = [
    professionalCertifications[0],
    professionalCertifications[4],
    professionalCertifications[16],
    professionalCertifications[1],
  ];

  return (
    <div className="pt-28 lg:pt-36 pb-20 px-4 sm:px-6 lg:px-12 min-h-screen">
      <section id="skills" className="max-w-7xl mx-auto space-y-24">
        {/* Header */}
        <div className="text-center space-y-4">
          <Badge variant="outline" className="text-primary tracking-[0.22em] uppercase px-3.5 border-primary/30 text-[11px]">
            Technical Overview
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-black uppercase tracking-tight text-white">
            Skills &amp; <span className="text-primary">Tech Stack</span>
          </h1>
          <p className="text-zinc-300 max-w-2xl mx-auto text-base sm:text-lg">
            A structured breakdown of my proficiency across Artificial Intelligence, NLP, and Data Engineering.
          </p>
        </div>

        {/* Radar & Proficiency Bars */}
        <ParallaxLayer offsetY={-12} mobileOffsetY={6}>
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* Left Card: Competency Radar Map */}
            <div className="p-6 sm:p-8 bg-card rounded-2xl relative border border-border/80 flex flex-col justify-between w-full h-full">
              <div className="mb-5">
                <div className="text-[11px] font-bold text-primary uppercase tracking-[0.2em] mb-1">
                  Radar Visualization
                </div>
                <h2 className="text-xl sm:text-2xl font-headline font-bold text-white uppercase tracking-wide">
                  Core Competency Map
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  Visual balance across my core AI, data science, automation, and deployment domains.
                </p>
              </div>

              <div className="p-4 sm:p-6 rounded-xl bg-background/60 border border-border/80 flex-1 flex items-center justify-center w-full">
                <RadarChart skills={skills} />
              </div>
            </div>

            {/* Right Card: Domain Proficiency Breakdown */}
            <div className="p-6 sm:p-8 bg-card rounded-2xl relative border border-border/80 flex flex-col justify-between w-full h-full">
              <div className="mb-5">
                <div className="text-[11px] font-bold text-primary uppercase tracking-[0.2em] mb-1">
                  Proficiency Metrics
                </div>
                <h2 className="text-xl sm:text-2xl font-headline font-bold text-white uppercase tracking-wide">
                  Domain Proficiency Breakdown
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  Relative depth of hands-on implementation across each specialization.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-xl bg-background/60 border border-border/80 flex-1 flex flex-col justify-between gap-4 w-full">
                {skills.map((s) => (
                  <div key={s.name} className="space-y-2">
                    <div className="flex justify-between items-center font-headline font-bold text-sm uppercase tracking-wider text-white">
                      <span className="flex items-center gap-3">
                        {getSkillIcon(s.name)}
                        <span>{s.name}</span>
                      </span>
                      <span className="text-primary tabular-nums">{s.value}%</span>
                    </div>
                    <Progress
                      value={s.value}
                      aria-label={`${s.name} proficiency ${s.value}%`}
                      className="h-3 bg-secondary border border-border/80"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ParallaxLayer>

        {/* Interactive Role Fit & Specialization Matcher */}
        <div id="role-fit-matcher" className="scroll-mt-28 space-y-8">
          <div className="text-center space-y-3">
            <Badge variant="outline" className="text-primary tracking-[0.2em] uppercase px-3.5 py-1 text-[11px] border-primary/30">
              For Recruiters &amp; Hiring Teams
            </Badge>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
              <Briefcase className="w-7 h-7 text-primary shrink-0" aria-hidden="true" />
              <h2 className="text-2xl md:text-3xl font-headline font-bold uppercase tracking-wider text-white">
                Role Fit &amp; Specialization Matcher
              </h2>
            </div>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
              Select a target engineering role to inspect my most relevant production repositories, primary tools, and verified credentials for that track.
            </p>
          </div>

          {/* Role Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5" role="tablist" aria-label="Target Engineering Roles">
            {roleProfiles.map((profile) => {
              const isSelected = profile.id === activeRole.id;
              return (
                <button
                  key={profile.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedRoleId(profile.id)}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 ${
                    isSelected
                      ? "bg-primary/15 border-primary shadow-md ring-1 ring-primary/40"
                      : "bg-card border-border/80 hover:border-primary/40 hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-headline font-bold uppercase tracking-wide text-sm text-white">
                      {profile.role}
                    </span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />}
                  </div>
                  <p className="text-xs text-zinc-400 leading-snug line-clamp-2">{profile.tagline}</p>
                </button>
              );
            })}
          </div>

          {/* Active Role Details Card */}
          <div className="p-6 sm:p-8 bg-card rounded-2xl border border-border/80 space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-border/80">
              <div className="space-y-2 max-w-3xl">
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                  Target Role Alignment
                </div>
                <h3 className="text-2xl sm:text-3xl font-headline font-black uppercase text-white tracking-tight">
                  {activeRole.role}
                </h3>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  {activeRole.fitSummary}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 lg:max-w-lg lg:justify-end">
                {activeRole.coreStack.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-zinc-100"
                  >
                    <TechIcon name={item} className="w-3.5 h-3.5 shrink-0" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Top 4 Matching Projects */}
              <div className="lg:col-span-7 space-y-4">
                <h4 className="text-xs font-headline font-bold uppercase tracking-wider text-primary">
                  Top 4 Proof-of-Work Repositories
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeRole.projects.map((proj) => (
                    <div
                      key={proj.name}
                      className="p-4 rounded-xl bg-background/70 border border-border/80 hover:border-primary/40 transition-colors flex flex-col justify-between gap-3 h-full"
                    >
                      <div className="space-y-1.5">
                        <div className="text-sm font-headline font-bold text-white leading-snug">
                          {proj.name}
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          {proj.desc}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 pt-2 border-t border-border/60">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-2.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border-border hover:bg-white/5 flex-1"
                          asChild
                        >
                          <a href={proj.github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-3.5 h-3.5 mr-1" aria-hidden="true" /> Source
                          </a>
                        </Button>
                        {proj.demo && (
                          <Button
                            size="sm"
                            className="h-8 px-2.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-primary/15 hover:bg-primary/25 text-primary border border-primary/30 flex-1"
                            asChild
                          >
                            <a href={proj.demo} target="_blank" rel="noopener noreferrer">
                              Demo <ExternalLink className="w-3 h-3 ml-1" aria-hidden="true" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Relevant Verified Certifications */}
              <div className="lg:col-span-5 space-y-4">
                <h4 className="text-xs font-headline font-bold uppercase tracking-wider text-primary">
                  Relevant Verified Certifications
                </h4>
                <div className="space-y-3">
                  {activeRole.credentials.map((cred) => (
                    <a
                      key={cred.title}
                      href={cred.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-xl bg-background/70 border border-border/80 hover:border-primary/40 transition-colors flex items-center gap-3.5 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center shrink-0">
                        <IssuerLogo issuer={cred.issuer} className="w-6 h-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs sm:text-sm font-headline font-bold text-white group-hover:text-primary transition-colors leading-snug">
                          {cred.title}
                        </div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mt-0.5">
                          Issued by {cred.issuer}
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-primary shrink-0" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack Grid */}
        <div className="space-y-10">
          <ParallaxLayer offsetY={-14} mobileOffsetY={6}>
            <div className="text-center space-y-3">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                <Wrench className="w-7 h-7 text-primary shrink-0" aria-hidden="true" />
                <h2 className="text-2xl md:text-3xl font-headline font-bold uppercase tracking-wider text-white">
                  Tech Stack &amp; Tools
                </h2>
              </div>
              <p className="text-zinc-400 text-sm sm:text-base">
                The core ecosystem I use to build, evaluate, and ship intelligent systems.
              </p>
            </div>
          </ParallaxLayer>

          <ParallaxLayer offsetY={14} mobileOffsetY={6}>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
              {techStacks.map((stack) => (
                <div
                  key={stack.category}
                  className="p-6 bg-card rounded-2xl border border-border/80 hover:border-primary/40 transition-colors flex flex-col h-full"
                >
                  <h3 className="text-xs font-headline font-bold uppercase tracking-wider text-primary mb-4">
                    {stack.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {stack.items.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/80 px-3 py-1.5 text-xs font-semibold text-zinc-200 hover:border-primary/40 hover:text-white transition-colors"
                      >
                        <TechIcon name={item} className="w-4 h-4 shrink-0" />
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ParallaxLayer>
        </div>

        {/* Next on Radar */}
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <Badge variant="outline" className="text-primary tracking-[0.2em] uppercase px-3.5 py-1 text-[11px] border-primary/30">
              Currently Exploring
            </Badge>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
              <Rocket className="text-primary w-7 h-7 shrink-0" aria-hidden="true" />
              <h2 className="text-2xl md:text-3xl font-headline font-bold uppercase tracking-wider text-white">
                Exploring &amp; Next on My Radar
              </h2>
            </div>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
              Tools and frameworks I am currently learning and integrating into upcoming data science and AI agent projects.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 w-full p-6 sm:p-8 rounded-2xl bg-card border border-border/80">
            {nextRadar.map((tool) => (
              <span
                key={tool}
                className="inline-flex items-center gap-2.5 rounded-xl border border-primary/25 bg-primary/5 px-4 py-2 text-xs sm:text-sm font-semibold text-zinc-100 hover:border-primary/50 transition-colors"
              >
                <TechIcon name={tool} className="w-4 h-4 shrink-0" />
                <span>{tool}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div id="certifications-section" className="space-y-8">
          <div className="text-center space-y-2">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
              <Award className="w-7 h-7 text-primary shrink-0" aria-hidden="true" />
              <h2 className="text-2xl md:text-3xl font-headline font-bold uppercase tracking-wider text-white">
                Professional Certifications
              </h2>
            </div>
            <p className="text-zinc-400 text-sm sm:text-base">
              Verified industry credentials from Oracle, IBM, and Dicoding.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {diverseCertifications.map((c) => (
              <div
                key={c.id}
                className="p-6 bg-card rounded-2xl border border-border/80 flex items-center gap-5 hover:border-primary/40 transition-colors h-full"
              >
                <div className="relative w-14 h-14 rounded-xl bg-background border border-border/80 flex items-center justify-center shrink-0">
                  <IssuerLogo issuer={c.issuer} className="w-8 h-8" />
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center ring-2 ring-card shadow-sm"
                  >
                    <Award className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-base sm:text-lg font-headline font-bold text-white leading-snug">
                    {c.title}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-flex items-center rounded-md border border-primary/25 bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold uppercase text-primary tracking-wider">
                      {c.issuer}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={() => {
                setCredentialTab('Certifications');
                setActiveTab('Credentials');
              }}
              className="text-primary hover:text-primary/80 font-headline font-bold uppercase tracking-wider text-xs flex items-center gap-1.5 py-2.5 px-4 rounded-xl hover:bg-primary/10 transition-colors"
            >
              Explore All Certifications ({professionalCertifications.length}){' '}
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Course Badges */}
        <div id="badges-section" className="space-y-8">
          <div className="text-center space-y-2">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
              <GraduationCap className="w-7 h-7 text-primary shrink-0" aria-hidden="true" />
              <h2 className="text-2xl md:text-3xl font-headline font-bold uppercase tracking-wider text-white">
                Course Badges &amp; Specializations
              </h2>
            </div>
            <p className="text-zinc-400 text-sm sm:text-base">
              Specialized coursework badges earned through Coursera and IBM.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {courseBadges.slice(0, 4).map((b) => (
              <div
                key={b.id}
                className="p-6 bg-card rounded-2xl border border-border/80 flex items-center gap-5 hover:border-primary/40 transition-colors h-full"
              >
                <div className="relative w-14 h-14 rounded-xl bg-background border border-border/80 flex items-center justify-center shrink-0">
                  <IssuerLogo issuer={b.issuer} className="w-8 h-8" />
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center ring-2 ring-card shadow-sm"
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-base sm:text-lg font-headline font-bold text-white leading-snug">
                    {b.title}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-flex items-center rounded-md border border-primary/25 bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold uppercase text-primary tracking-wider">
                      {b.issuer}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={() => {
                setCredentialTab('Badges');
                setActiveTab('Credentials');
              }}
              className="text-primary hover:text-primary/80 font-headline font-bold uppercase tracking-wider text-xs flex items-center gap-1.5 py-2.5 px-4 rounded-xl hover:bg-primary/10 transition-colors"
            >
              Explore All Badges ({courseBadges.length}){' '}
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
