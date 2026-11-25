"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import {
  ChevronRight,
  Brain,
  Database,
  Sparkles,
  Terminal,
  Cpu,
  Layers,
  RefreshCw,
  Code2,
  ExternalLink,
  Workflow,
  Languages,
  ShieldCheck,
} from 'lucide-react';
import { TypewriterEffect } from '@/components/TypewriterEffect';
import { TechMarquee } from '@/components/TechMarquee';
import { ParallaxLayer } from '@/components/Parallax';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { registeredCopyright } from '@/lib/credentials-data';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";

const featuredProjects = [
  {
    title: "InsightSQL: LangGraph Engine",
    type: "GenAI / Graph Agent",
    impact: "State-of-the-Art",
    desc: "Graph-based SQL agent powered by Gemini 2.5 Flash and LangGraph cyclic reasoning that validates SQLite schemas, runs read-only queries, self-corrects failed SQL loops, and exposes live traces with EN/ID support.",
    tech: "LangGraph • Gemini 2.5 Flash",
    link: "https://github.com/viochris/InsightSQL-LangGraph-Engine-Web",
  },
  {
    title: "DocuTalk-AI: Smart RAG",
    type: "GenAI / Smart RAG",
    impact: "High Precision",
    desc: "Agentic RAG assistant combining Gemini 2.5 Flash, incremental FAISS indexing over uploaded PDF/CSV/TXT/MD files, ConversationSummaryMemory, and a ReAct priority router with DuckDuckGo web search fallback.",
    tech: "LangChain • FAISS • Gemini",
    link: "https://github.com/viochris/DocuTalk-AI",
  },
  {
    title: "NovaCal AI: Stateful Assistant",
    type: "GenAI / Automation",
    impact: "Stateful Design",
    desc: "Single-user-locked Telegram scheduling assistant powered by Gemini 2.5 Flash and LangChain Tool-Calling agents with SQL-backed conversational memory (MySQL/SQLite), CRUD calendar tools, and intrusion alerts.",
    tech: "LangChain • SQL Memory • Gemini",
    link: "https://github.com/viochris/telegram-calendar-ai-bot",
  },
  {
    title: "SpendSense: Financial AI",
    type: "Data Science / Vision",
    impact: "Utility Pro",
    desc: "Streamlit personal finance platform powered by Gemini 2.5 Flash and a LangChain Pandas DataFrame Agent with OCR receipt scanning, natural-language spending Q&A, Plotly KPI dashboards, and Google Sheets auto-backup.",
    tech: "Streamlit • Vision • Gemini",
    link: "https://github.com/viochris/Streamlit-SpendSense",
  },
  {
    title: "Resume Scanner API",
    type: "Backend / NLP",
    impact: "Research Oriented",
    desc: "Stateless, Dockerized FastAPI ATS optimizer pairing Scikit-Learn TF-IDF strict keyword checks with multilingual SBERT semantic similarity, PyPDF2 length diagnostics, and top-5 critical skill gap alerts.",
    tech: "FastAPI • SBERT • Docker",
    link: "https://github.com/viochris/resume-scanner-api",
  },
  {
    title: "Insightify API: Sentiment",
    type: "NLP / Analytics",
    impact: "Dual-Lingual",
    desc: "Asynchronous FastAPI sentiment and N-Gram microservice routing English and Indonesian text to specialized RoBERTa Transformers, supporting real-time inference as well as CSV/Excel batch analytics and complexity stats.",
    tech: "FastAPI • RoBERTa • Transformers",
    link: "https://github.com/viochris/Insightify-Sentiment-API",
  },
  {
    title: "Daily Agenda Broadcaster",
    type: "Automation / Workflow",
    impact: "Efficiency Pro",
    desc: "Prefect-orchestrated daily schedule workflow with 3x retry policies that pulls primary Google Calendar events alongside Indonesian public holidays via OAuth2, formats schedules (UTC+7), and delivers async Telegram briefings.",
    tech: "Python • GCalendar • Telegram",
    link: "https://github.com/viochris/auto-daily-scheduler.git",
  },
  {
    title: "NovaMail AI: Autoresponder",
    type: "Automation / LLMOps",
    impact: "Autonomous Inbox",
    desc: "Automated Gmail inbox assistant powered by Gemini 2.5 Flash and Gmail API that polls unread threads, sends RFC 2822-compliant MIME replies preserving original Message-ID and References headers, and notifies Telegram.",
    tech: "Gmail API • Gemini • Python",
    link: "https://github.com/viochris/NovaMail-AI-Autoresponder.git",
  },
  {
    title: "Stuntify API: MLOps",
    type: "Backend / MLOps",
    impact: "Production Ready",
    ipBadge: `Copyright #${registeredCopyright.regNumber}`,
    certificateUrl: registeredCopyright.certificateUrl,
    desc: "Asynchronous FastAPI and Pydantic inference microservice orchestrating four synchronized Scikit-Learn artifacts—gender encoder, scaler, classifier, and target decoder—for real-time toddler stunting risk assessment.",
    tech: "FastAPI • Scikit-Learn • Docker",
    link: "https://github.com/viochris/Stuntify-API",
  },
  {
    title: "InsightData: AI Analyst",
    type: "GenAI / Analytics",
    impact: "Automation Pro",
    desc: "ReAct-based Pandas AI data analyst using Gemini 2.5 Flash to inspect local CSV/Excel files or Google Sheets URLs, auto-clean empty records, run statistical correlations, and render downloadable Matplotlib/Seaborn charts.",
    tech: "Pandas Agent • Gemini • Python",
    link: "https://github.com/viochris/insight-data-ai-analyst",
  },
];

const infrastructurePulseData = [
  {
    status: "Backend APIs",
    title: "High-Performance Backend",
    subtitle: "ASYNCHRONOUS APIS & MICROSERVICES",
    desc: "Architecting scalable, asynchronous server-side logic and clean API gateways that power AI integrations and data pipelines.",
    icon: <Cpu className="w-5 h-5 text-primary" aria-hidden="true" />,
  },
  {
    status: "AI Agents",
    title: "Multi-Agent Orchestration",
    subtitle: "AUTONOMOUS AGENT WORKFLOWS",
    desc: "Engineering autonomous agent workflows and multi-step reasoning loops using modern LLM frameworks for tool-assisted problem solving.",
    icon: <Sparkles className="w-5 h-5 text-primary" aria-hidden="true" />,
  },
  {
    status: "RAG Systems",
    title: "RAG & Vector Ecosystems",
    subtitle: "HIGH-PRECISION KNOWLEDGE RETRIEVAL",
    desc: "Designing semantic search pipelines and vector database integrations to ground language models with dynamic factual context.",
    icon: <Database className="w-5 h-5 text-primary" aria-hidden="true" />,
  },
  {
    status: "Machine Learning",
    title: "Applied Machine Learning",
    subtitle: "DEEP LEARNING & EXPLAINABLE AI",
    desc: "Building predictive models with Scikit-Learn and TensorFlow/Keras, supported by XAI diagnostics such as SHAP and LIME.",
    icon: <Brain className="w-5 h-5 text-primary" aria-hidden="true" />,
  },
  {
    status: "Text & NLP",
    title: "Natural Language Processing",
    subtitle: "CONTEXT EXTRACTION & INTELLIGENCE",
    desc: "Designing text processing pipelines for entity extraction, summarization, and multilingual sentiment analysis from raw text.",
    icon: <Languages className="w-5 h-5 text-primary" aria-hidden="true" />,
  },
  {
    status: "Deployment",
    title: "Production & Automation",
    subtitle: "CI/CD & INTERACTIVE INTERFACES",
    desc: "Shipping reliable AI services via GitHub Actions and FastAPI, delivered through Streamlit apps and automated Telegram bots.",
    icon: <Workflow className="w-5 h-5 text-primary" aria-hidden="true" />,
  },
];

const specializations = [
  {
    title: "Natural Language Processing",
    desc: "High-precision NLP pipelines for context extraction, summarization, and bilingual sentiment analysis that turn unstructured text into structured intelligence.",
    icon: <Brain className="w-7 h-7 text-primary" aria-hidden="true" />,
    label: "NLP Specialist",
  },
  {
    title: "Tabular Data Modeling",
    desc: "Predictive modeling on complex structured datasets using feature engineering, strict validation splits, and Explainable AI (XAI) techniques.",
    icon: <Database className="w-7 h-7 text-primary" aria-hidden="true" />,
    label: "Data Science",
  },
  {
    title: "AI Agent Engineering",
    desc: "Stateful multi-step reasoning systems and RAG pipelines with tool calling and cyclic self-correction for autonomous execution.",
    icon: <Sparkles className="w-7 h-7 text-primary" aria-hidden="true" />,
    label: "Reasoning Agents",
  },
  {
    title: "Automation & Orchestration",
    desc: "Resilient backends and scheduled data workflows connecting LLMs, external APIs, and messaging bots into reliable end-to-end tools.",
    icon: <Workflow className="w-7 h-7 text-primary" aria-hidden="true" />,
    label: "Orchestration",
  },
];

const workSteps = [
  {
    step: "01",
    title: "Research & Design",
    subtitle: "Problem Framing & Data Audit",
    desc: "Before writing model or agent code, I start by understanding the problem constraints and inspecting the raw data. Checking distributions, missing values, and edge cases early helps determine whether a simple statistical baseline or an LLM workflow is the right fit.",
    points: [
      "Exploratory data analysis (EDA) and schema checks",
      "Strict train-test splitting to prevent data leakage",
      "Choosing a simple baseline before adding complexity",
    ],
    icon: <Terminal className="w-5 h-5 text-primary" aria-hidden="true" />,
  },
  {
    step: "02",
    title: "Architect & Build",
    subtitle: "Pipeline & Agent Implementation",
    desc: "I build the core pipeline in modular steps so each component can be verified independently. For tabular ML, this means reproducible feature engineering and cross-validation; for GenAI systems, it means grounded retrieval, structured outputs, and error handling.",
    points: [
      "Feature engineering, imbalance handling, and model tuning",
      "RAG indexing, reranking, and tool-calling workflows",
      "Model interpretability checks (LIME) and execution tracing",
    ],
    icon: <Cpu className="w-5 h-5 text-primary" aria-hidden="true" />,
  },
  {
    step: "03",
    title: "Deploy & Integrate",
    subtitle: "APIs, Containers & Usable Interfaces",
    desc: "A model becomes genuinely useful when people can interact with it directly. I package trained models and agent workflows behind clean REST endpoints or straightforward web and messaging interfaces so anyone can test them without setup friction.",
    points: [
      "FastAPI and Flask endpoints with input validation",
      "Docker containerization for reproducible deployment",
      "Interactive UIs via Streamlit, Gradio, React, or Telegram bots",
    ],
    icon: <Layers className="w-5 h-5 text-primary" aria-hidden="true" />,
  },
  {
    step: "04",
    title: "Evaluate & Refine",
    subtitle: "Testing, Cost Tracking & Iteration",
    desc: "After deployment, I test how the system handles edge-case inputs, review response latency and token cost, and tighten the weak spots. Documenting both the results and known limitations keeps every project transparent and easy to maintain.",
    points: [
      "Tracking token consumption, latency, and fallback behavior",
      "Reviewing error cases to refine prompts or thresholds",
      "Writing clear documentation and reproducible notebooks",
    ],
    icon: <RefreshCw className="w-5 h-5 text-primary" aria-hidden="true" />,
  },
];

export default function Home() {
  const [isAnim, setIsAnim] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const prefersReduced = useReducedMotion();

  // Hero scroll parallax temporarily commented out for performance comparison:
  // const { scrollY } = useScroll();
  // const smoothScrollY = useSpring(scrollY, {
  //   stiffness: 85,
  //   damping: 24,
  //   mass: 0.4,
  //   restDelta: 0.001,
  // });
  // const heroGlowY = useTransform(smoothScrollY, [0, 560], [0, 90]);
  // const heroGlowScale = useTransform(smoothScrollY, [0, 560], [1, 1.2]);
  // const heroRingY = useTransform(smoothScrollY, [0, 560], [0, 36]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const disableMotion = reducedMotion || Boolean(prefersReduced);

  const carouselPlugins = disableMotion
    ? []
    : [
        AutoScroll({
          speed: 0.9,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
        }),
      ];

  return (
    <div className="pt-20 sm:pt-24">
      {/* Hero Section */}
      <section id="home" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-10 pb-16 lg:pt-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-12">
          <div className="lg:col-span-5 lg:order-2 flex justify-center">
            <div className="relative group">
              <div
                aria-hidden="true"
                style={{
                  background: 'radial-gradient(circle, hsl(var(--primary) / 0.32) 0%, transparent 70%)',
                }}
                className="absolute -inset-10 rounded-full pointer-events-none"
              />
              <div className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 xl:w-[25rem] xl:h-[25rem]">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full border-2 border-dashed border-primary/70 animate-[spin_36s_linear_infinite] pointer-events-none"
                />
                <button
                  type="button"
                  onClick={() => setIsAnim((prev) => !prev)}
                  aria-label={isAnim ? "Switch to portrait photo" : "Switch to AI avatar illustration"}
                  title="Click to toggle portrait and AI avatar"
                  className="absolute inset-3.5 rounded-full p-1.5 bg-background shadow-2xl overflow-hidden border border-primary/30 active:scale-95 transition-transform duration-200 focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <Image
                    src={isAnim ? "/vio-image-animation.jpg" : "/vio-image.png"}
                    alt="Silvio Christian, Joe portrait"
                    width={400}
                    height={400}
                    sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 400px"
                    priority
                    fetchPriority="high"
                    className="w-full h-full object-cover rounded-full"
                  />
                </button>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20">
                  <Badge className="bg-primary text-primary-foreground px-5 py-1.5 shadow-lg font-headline font-bold text-[11px] tracking-[0.18em] uppercase border-none whitespace-nowrap rounded-full">
                    AI Engineer
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5">
            <Badge
              variant="outline"
              className="bg-card/95 text-primary font-headline font-bold uppercase tracking-[0.22em] py-1.5 px-4 border-primary/45 shadow-md shadow-primary/10 text-[11px]"
            >
              Data Scientist &amp; AI Engineer
            </Badge>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-black leading-[1.08] tracking-tight text-white">
              Silvio Christian, <span className="text-primary">Joe</span>
            </h1>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-lg sm:text-2xl lg:text-[26px] font-headline text-zinc-200 min-h-[36px]">
              <span>I</span>
              <TypewriterEffect />
            </div>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl">
              Informatics Engineering undergraduate building production{' '}
              <strong className="text-white font-semibold">Machine Learning</strong>,{' '}
              <strong className="text-white font-semibold">NLP</strong>, and{' '}
              <strong className="text-white font-semibold">autonomous AI Agent</strong> systems
              that turn raw data into usable products.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3.5 pt-2 w-full">
              <Button
                size="lg"
                className="rounded-full px-8 font-headline uppercase font-bold tracking-wider h-12 shadow-lg shadow-primary/20"
                asChild
              >
                <Link href="/projects">
                  View Projects <ChevronRight className="ml-1.5 w-4 h-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 font-headline uppercase font-bold tracking-wider h-12 border-border text-foreground hover:bg-white/5"
                asChild
              >
                <Link href="/contact">Contact Me</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics Strip */}
      <section aria-label="Portfolio highlights" className="w-full border-y border-border/70 bg-card/50 py-10 mb-20">
        <ParallaxLayer offsetY={-12} mobileOffsetY={6}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="text-3xl sm:text-4xl font-headline font-black text-primary mb-1">65+</div>
              <div className="text-xs font-semibold text-zinc-400 uppercase tracking-[0.2em]">Projects Shipped</div>
            </div>
            <div className="flex flex-col items-center sm:border-x sm:border-border/60">
              <div className="text-3xl sm:text-4xl font-headline font-black text-primary mb-1">29+</div>
              <div className="text-xs font-semibold text-zinc-400 uppercase tracking-[0.2em]">Verified Certifications</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl sm:text-4xl font-headline font-black text-primary mb-1">7+</div>
              <div className="text-xs font-semibold text-zinc-400 uppercase tracking-[0.2em]">GenAI Agents Deployed</div>
            </div>
          </div>
        </ParallaxLayer>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-24 pb-20">
        {/* Technical Domains */}
        <section aria-labelledby="pulse-heading" className="space-y-10">
          <ParallaxLayer offsetY={-16} mobileOffsetY={8}>
            <div className="text-center space-y-3">
              <Badge variant="outline" className="text-primary tracking-[0.22em] uppercase py-1 px-3.5 border-primary/30 text-[11px]">
                What I Build
              </Badge>
              <h2 id="pulse-heading" className="text-3xl md:text-5xl font-headline font-black uppercase tracking-tight text-white">
                Technical <span className="text-primary">Domains</span>
              </h2>
            </div>
          </ParallaxLayer>

          <ParallaxLayer offsetY={16} mobileOffsetY={8}>
            <Carousel
              opts={{ align: "start", loop: true }}
              plugins={carouselPlugins}
              className="w-full"
            >
              <CarouselContent className="-ml-4 items-stretch">
                {infrastructurePulseData.map((m, i) => (
                  <CarouselItem key={i} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 flex flex-col">
                    <div className="p-6 bg-card border border-border/80 rounded-2xl flex flex-col flex-1 w-full hover:border-primary/40 transition-colors">
                      <div>
                        <div className="flex justify-between items-center mb-5">
                          <div className="w-11 h-11 rounded-xl bg-white/[0.04] flex items-center justify-center border border-border/70 shrink-0">
                            {m.icon}
                          </div>
                          <div className="flex items-center gap-1.5 bg-background/80 px-2.5 py-1 rounded-full border border-border/80 shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" aria-hidden="true" />
                            <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-wider whitespace-nowrap">{m.status}</span>
                          </div>
                        </div>
                        <h3 className="text-lg font-headline font-bold text-white leading-snug mb-1.5 sm:min-h-[3.1rem]">
                          {m.title}
                        </h3>
                        <div className="text-[10px] font-bold text-primary/80 uppercase tracking-wider mb-3 sm:min-h-[2rem]">
                          {m.subtitle}
                        </div>
                      </div>
                      <p className="text-sm text-zinc-400 leading-relaxed flex-1">{m.desc}</p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </ParallaxLayer>
        </section>

        {/* Core Specializations */}
        <section aria-labelledby="specialization-heading" className="space-y-10">
          <ParallaxLayer offsetY={-16} mobileOffsetY={8}>
            <div className="text-center space-y-3">
              <Badge variant="outline" className="text-primary tracking-[0.22em] uppercase py-1 px-3.5 border-primary/30 text-[11px]">
                Expertise
              </Badge>
              <h2 id="specialization-heading" className="text-3xl md:text-5xl font-headline font-black uppercase tracking-tight text-white">
                Core <span className="text-primary">Specializations</span>
              </h2>
            </div>
          </ParallaxLayer>

          <ParallaxLayer offsetY={16} mobileOffsetY={8}>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch sm:auto-rows-fr">
              {specializations.map((skill) => (
                <div
                  key={skill.title}
                  className="p-7 bg-card border border-border/80 hover:border-primary/40 rounded-2xl transition-colors flex flex-col h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 shrink-0">
                    {skill.icon}
                  </div>
                  <Badge className="bg-primary/10 text-primary border-none uppercase text-[10px] font-bold tracking-wider w-fit mb-3">
                    {skill.label}
                  </Badge>
                  <h3 className="text-xl font-headline font-bold text-white mb-3 leading-snug sm:min-h-[3.5rem]">
                    {skill.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed flex-1">
                    {skill.desc}
                  </p>
                </div>
              ))}
            </div>
          </ParallaxLayer>

          {/* Vibe Coding Philosophy Callout */}
          <ParallaxLayer offsetY={-16} mobileOffsetY={8} scaleRange={[0.97, 1.01]}>
            <div className="w-full p-7 sm:p-10 bg-card border border-primary/25 rounded-2xl flex flex-col md:flex-row items-center gap-6 md:gap-8">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                <Code2 className="w-8 h-8 md:w-10 md:h-10 text-primary" aria-hidden="true" />
              </div>
              <div className="space-y-2.5 text-center md:text-left flex-1">
                <div className="flex flex-col md:flex-row items-center gap-3">
                  <Badge className="bg-primary text-primary-foreground font-bold px-3 py-0.5 uppercase text-[10px] tracking-wider">
                    Development Approach
                  </Badge>
                  <h3 className="text-2xl md:text-3xl font-headline font-black text-white uppercase tracking-tight">
                    Vibe <span className="text-primary">Coding</span>
                  </h3>
                </div>
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-4xl">
                  Intent-driven engineering that pairs core systems thinking with AI coding tools. This workflow lets me ship complete prototypes across web, mobile, and computer vision without sacrificing architectural clarity.
                </p>
              </div>
            </div>
          </ParallaxLayer>
        </section>

        {/* Featured Projects */}
        <section aria-labelledby="featured-heading" className="space-y-10">
          <ParallaxLayer offsetY={-16} mobileOffsetY={8}>
            <div className="flex flex-col items-center text-center space-y-3">
              <Badge variant="outline" className="text-primary tracking-[0.22em] uppercase py-1 px-3.5 border-primary/30 text-[11px]">
                Portfolio Highlights
              </Badge>
              <h2 id="featured-heading" className="text-3xl md:text-5xl font-headline font-black uppercase tracking-tight text-white">
                Featured <span className="text-primary">Projects</span>
              </h2>
            </div>
          </ParallaxLayer>

          <ParallaxLayer offsetY={16} mobileOffsetY={8}>
            <Carousel
              opts={{ align: "start", loop: true }}
              plugins={carouselPlugins}
              className="w-full"
            >
              <CarouselContent className="-ml-4 items-stretch">
                {featuredProjects.map((p, i) => (
                  <CarouselItem key={i} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3 flex flex-col">
                    <div className="p-7 bg-card border border-border/80 rounded-2xl flex flex-col flex-1 w-full hover:border-primary/50 transition-colors group">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-4 min-h-[24px]">
                          <span className="text-[11px] font-bold text-primary uppercase tracking-wider truncate">
                            {p.type}
                          </span>
                          <Badge className="bg-primary/15 text-primary font-bold uppercase tracking-wider text-[10px] px-2.5 py-0.5 border-none whitespace-nowrap shrink-0">
                            {p.impact}
                          </Badge>
                        </div>
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <h3 className="text-xl font-headline font-bold text-white mb-2.5 group-hover:text-primary transition-colors leading-snug sm:min-h-[3.5rem]">
                            {p.title}
                          </h3>
                        </a>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                          {p.desc}
                        </p>
                      </div>
                      <div className="mt-auto pt-5">
                        {"ipBadge" in p && p.ipBadge && (
                          <div className="mb-3">
                            <a
                              href={p.certificateUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25 font-bold uppercase tracking-wider text-[10px] px-2.5 py-1 transition-colors"
                            >
                              <ShieldCheck className="w-3 h-3 shrink-0" aria-hidden="true" />
                              <span>{p.ipBadge}</span>
                            </a>
                          </div>
                        )}
                        <div className="flex items-center justify-between gap-2 pt-4 border-t border-border/60">
                          <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider truncate">
                            {p.tech}
                          </span>
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open ${p.title} on GitHub`}
                            className="w-9 h-9 rounded-full bg-white/[0.04] flex items-center justify-center shrink-0 hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </ParallaxLayer>

          <div className="flex justify-center pt-2">
            <Button
              variant="outline"
              className="rounded-full px-7 h-11 border-primary/40 bg-card/90 hover:bg-primary hover:text-primary-foreground text-primary font-headline font-bold uppercase tracking-wider text-xs group transition-colors"
              asChild
            >
              <Link href="/repository">
                Explore All Projects{' '}
                <ChevronRight className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </section>

        {/* How I Work (Equal Cards + Independent Inner Watermark Parallax) */}
        <section aria-labelledby="workflow-heading" className="space-y-10">
          <ParallaxLayer offsetY={-16} mobileOffsetY={8}>
            <div className="text-center space-y-3">
              <Badge variant="outline" className="text-primary tracking-[0.22em] uppercase py-1 px-3.5 border-primary/30 text-[11px]">
                Methodology
              </Badge>
              <h2 id="workflow-heading" className="text-3xl md:text-5xl font-headline font-black uppercase tracking-tight text-white">
                How <span className="text-primary">I Work</span>
              </h2>
            </div>
          </ParallaxLayer>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {workSteps.map((w) => (
              <div
                key={w.step}
                className="p-8 sm:p-10 lg:p-12 bg-card rounded-3xl border border-border/80 hover:border-primary/40 transition-all duration-500 group relative overflow-hidden flex flex-col h-full min-h-[360px] lg:min-h-[400px]"
              >
                <div
                  aria-hidden="true"
                  className="absolute top-0 right-0 -mr-6 -mt-4 select-none pointer-events-none"
                >
                  <ParallaxLayer offsetY={48} mobileOffsetY={24}>
                    <span className="text-[8rem] sm:text-[10rem] font-headline font-black leading-none text-white/[0.07] group-hover:text-primary/[0.16] transition-colors duration-500">
                      {w.step}
                    </span>
                  </ParallaxLayer>
                </div>
                <div className="flex justify-between items-center mb-8 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    {w.icon}
                  </div>
                  <span className="text-xs font-bold text-primary uppercase tracking-[0.25em]">
                    Step {w.step}
                  </span>
                </div>
                <div className="mb-4 relative z-10">
                  <h3 className="text-2xl md:text-3xl font-headline font-black text-white mb-1.5 leading-tight">
                    {w.title}
                  </h3>
                  <div className="text-xs font-bold uppercase tracking-wider text-primary/85">
                    {w.subtitle}
                  </div>
                </div>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6 relative z-10">
                  {w.desc}
                </p>
                <ul className="mt-auto pt-5 border-t border-border/60 space-y-2.5 relative z-10">
                  {w.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" aria-hidden="true" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section aria-label="Contact call to action">
          <ParallaxLayer offsetY={-20} mobileOffsetY={10} scaleRange={[0.97, 1.01]}>
            <div className="w-full p-12 md:p-20 rounded-[2.5rem] md:rounded-[3rem] bg-primary flex flex-col items-center text-center space-y-8 shadow-[0_0_50px_hsl(var(--primary)/0.3)]">
              <h2 className="text-4xl md:text-6xl font-headline font-black text-white uppercase tracking-tighter max-w-3xl leading-[1.08]">
                Interested in Working <span className="text-black">Together?</span>
              </h2>
              <p className="text-white/90 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
                Whether you need a custom LLM agent or a reproducible data pipeline, let&apos;s turn your data into reliable software.
              </p>
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 rounded-full px-12 h-16 text-lg font-headline font-black uppercase tracking-widest shadow-2xl transition-all active:scale-95"
                asChild
              >
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </ParallaxLayer>
        </section>
      </div>

      <TechMarquee />
    </div>
  );
}
