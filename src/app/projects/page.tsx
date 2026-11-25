"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ExternalLink,
  ChevronRight,
  Brain,
  Sparkles,
  Info,
  Workflow,
  AlertTriangle,
  Database,
  GitBranch,
  Layers,
  Activity,
  DollarSign,
  Cpu,
  Github,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { ParallaxLayer, ParallaxImageFrame } from '@/components/Parallax';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { registeredCopyright } from '@/lib/credentials-data';
import Link from 'next/link';

const featuredProjects = [
  {
    id: 1,
    title: "InsightSQL (LangGraph Engine)",
    impact: "State-of-the-Art",
    desc: "AI SQL analyst powered by Gemini 2.5 Flash and LangGraph cyclic reasoning that validates SQLite schemas, executes read-only queries, automatically repairs failed SQL through self-correcting graph loops, and surfaces transparent glass-box traces.",
    tech: ["LANGGRAPH", "GEMINI 2.5 FLASH", "PYTHON", "SQL"],
    link: "https://github.com/viochris/InsightSQL-LangGraph-Engine-Web",
    demo: "https://insightsql-langgraph-engine-web.streamlit.app/",
    demoLabel: "Live Demo",
    problem: "Traditional SQL agents often fail on complex schemas or syntax errors without clear visibility into their reasoning steps.",
    solution: "Implemented cyclic graph reasoning to query, validate, and self-correct errors in real time with transparent execution traces.",
    pipeline: [
      "Natural Language Query",
      "Schema Inspection Node",
      "SQL Generation (Gemini 2.5 Flash)",
      "Execution & Cyclic Error Recovery",
      "Synthesized Answer & Trace",
    ],
    limitations:
      "Operates on in-memory or session-scoped SQLite/relational tables rather than enterprise data warehouses with strict row-level RBAC. Multi-turn cyclic retries can increase latency and token usage when schemas contain ambiguous column names.",
    image: "/insight_sql_langgraph.png",
  },
  {
    id: 2,
    title: "SpendSense (Financial AI)",
    impact: "Utility Pro",
    desc: "Conversational personal finance app combining Google Gemini Vision OCR receipt scanning with a LangChain Pandas DataFrame Agent, allowing users to review extracted expenses, explore Plotly KPI trends, and query spending in plain language.",
    tech: ["STREAMLIT", "LANGCHAIN", "GEMINI VISION", "PANDAS"],
    link: "https://github.com/viochris/Streamlit-SpendSense",
    demo: "https://app-spend-sense.streamlit.app/",
    demoLabel: "Live Demo",
    problem: "Manual expense logging is tedious and leaves users without quick visibility into spending habits.",
    solution: "Combined Gemini Vision for receipt extraction with LangChain for natural-language financial data queries.",
    pipeline: [
      "Receipt Image Upload",
      "Gemini Vision Multimodal OCR",
      "Structured JSON Expense Parsing",
      "In-Memory Pandas Ledger",
      "LangChain Conversational Querying",
    ],
    limitations:
      "Receipt extraction accuracy depends on image clarity and lighting; crumpled or handwritten thermal receipts may require manual edits. Expense data is scoped to the active Streamlit session rather than a persistent cloud database.",
    image: "/streamlit_spendsense.png",
  },
  {
    id: 3,
    title: "Resume Scanner API",
    impact: "Research Oriented",
    desc: "Stateless, Dockerized FastAPI ATS optimization microservice pairing Scikit-Learn TF-IDF strict keyword checks with multilingual SBERT semantic similarity, complete with PyPDF2 page diagnostics and top-5 critical skill gap alerts.",
    tech: ["FASTAPI", "SBERT", "TF-IDF", "NLP"],
    link: "https://github.com/viochris/resume-scanner-api",
    demo: "https://silvio0-resume-scanner.hf.space/docs",
    demoLabel: "API Docs",
    problem: "Keyword-only ATS scanners miss qualified candidates when resumes use different phrasing for equivalent skills.",
    solution: "Built a dual-engine FastAPI service offering Strict Mode (TF-IDF) and Flexible Mode (SBERT) scoring.",
    pipeline: [
      "PDF/Text Resume & Job Description",
      "Text Cleaning & Token Normalization",
      "Dual Engine: TF-IDF + SBERT Embeddings",
      "Cosine Similarity & Weighted Scoring",
      "Stateless JSON REST Response",
    ],
    limitations:
      "Evaluates textual similarity and keyword coverage from extracted PDF text; complex multi-column or image-heavy PDF layouts can degrade text extraction. Does not verify factual work history or credential authenticity.",
    image: "/resume_scanner_api.png",
  },
  {
    id: 4,
    title: "InsightData (AI Analyst)",
    impact: "Automation Pro",
    desc: "ReAct-powered Pandas AI data analyst using Gemini 2.5 Flash to inspect uploaded CSV/Excel files or Google Sheets URLs, automatically clean empty rows and duplicates, run correlation checks, and export downloadable Matplotlib charts.",
    tech: ["PANDAS AGENT", "GEMINI 2.5 FLASH", "PYTHON", "MATPLOTLIB"],
    link: "https://github.com/viochris/insight-data-ai-analyst",
    demo: "https://insight-data-ai-analyst.streamlit.app/",
    demoLabel: "Live Demo",
    problem: "Exploratory data cleaning and summary statistics consume significant time for non-technical stakeholders.",
    solution: "Built a ReAct agent that writes and executes Python scripts for automated cleaning, summary analysis, and visualization.",
    pipeline: [
      "CSV / Excel Dataset Upload",
      "DataFrame Schema & Missing-Value Profiling",
      "ReAct Pandas Agent Code Generation",
      "Sandboxed Python / Matplotlib Execution",
      "Automated Insights & Chart Rendering",
    ],
    limitations:
      "Designed for small-to-medium tabular datasets that fit comfortably in container RAM. Because the agent dynamically generates Python/Pandas code via LLM reasoning, highly irregular or uncleaned multi-header spreadsheets may require prompt refinement.",
    image: "/insight_data.png",
  },
  {
    id: 5,
    title: "Auto-README Generator (CrewAI)",
    impact: "Multi-Agent Pro",
    desc: "Autonomous two-agent CrewAI documentation pipeline pairing a Lead Code Analyzer and Senior Technical Writer to parse raw Python scripts (.py) and Jupyter Notebooks (.ipynb) into structured, production-ready GitHub README files.",
    tech: ["CREWAI", "GEMINI", "STREAMLIT", "NBFORMAT"],
    link: "https://github.com/viochris/auto-readme-generator",
    demo: "https://crewai-auto-readme-generator.streamlit.app/",
    demoLabel: "Live Demo",
    problem: "Writing thorough technical documentation across multi-file Python and Jupyter Notebook repositories is time-consuming and often neglected.",
    solution: "Orchestrated a 2-node autonomous CrewAI pipeline (Code Analyzer and Technical Writer) that parses raw .py and .ipynb AST/cells to generate complete Markdown documentation.",
    pipeline: [
      "Source Upload (.py & .ipynb Parser)",
      "CrewAI Node 1: Lead Code Analyzer",
      "CrewAI Node 2: Senior Technical Writer",
      "Context Synthesis & Mermaid Diagramming",
      "Markdown Export & Session Persistence",
    ],
    limitations:
      "Currently supports .py and .ipynb files only and relies on heuristic LLM text interpretation rather than deterministic AST compiler verification. Because the Technical Writer agent is prompted for polished documentation, it can occasionally over-embellish project phrasing or extrapolate metrics if user context is brief, so human review is recommended before publishing.",
    image: "/auto_readme_generator.png",
  },
  {
    id: 6,
    title: "Botanica AI (Plant Care Companion)",
    impact: "Full-Stack AI",
    desc: "Full-stack React 19, TypeScript, and Express web app powered by cascaded Google Gemini Vision models that identifies plant species, diagnoses leaf health from photos, tracks watering schedules, and hosts an AI horticulturist chat.",
    tech: ["REACT 19", "TYPESCRIPT", "EXPRESS", "GEMINI VISION"],
    link: "https://github.com/viochris/botanica-ai",
    demo: "https://botanica-ai-mu.vercel.app/",
    demoLabel: "Live Demo",
    problem: "Plant owners struggle to identify species accurately, diagnose leaf diseases early, and keep consistent watering and toxicity care schedules.",
    solution: "Built a full-stack React 19 and Express application integrating Google Gemini Vision for photo species identification, leaf health diagnostics, and interactive botanical consultation.",
    pipeline: [
      "Client Photo Capture & 1024px Compression",
      "Express Proxy (Rate Limit & Validation)",
      "Cascaded Gemini Vision Router + JSON Schema",
      "8-Point Care Matrix & Leaf Health Diagnosis",
      "LocalStorage Garden Tracker & Dr. Flora Chat",
    ],
    limitations:
      "Species identification and toxicity flags are AI-generated estimates rather than certified veterinary/ASPCA database lookups. Garden state is persisted in browser localStorage (~5 MB cap) without cloud account synchronization, and rate limiting is in-memory per serverless instance.",
    image: "/botanica_ai.png",
  },
];

const ragArchitectures = [
  {
    id: "vector",
    name: "Vector RAG",
    subtitle: "Semantic Embedding Retrieval (ChromaDB Cloud)",
    badge: "Lowest Cost & Latency",
    repoName: "youtube-vector-rag-llamaindex",
    repoUrl: "https://github.com/viochris/youtube-vector-rag-llamaindex",
    storage: "ChromaDB Cloud (gemini-embedding-2)",
    retrievalMechanism: "Cosine similarity search (similarity_top_k=5) reranked down to top_n=3 via local Cross-Encoder (ms-marco-MiniLM-L-2-v2).",
    llmCallsPerTurn: "1 LLM call per question (final answer synthesis only; zero extra indexing or query expansion LLM calls).",
    pipelineSteps: [
      "YouTube Transcript Extraction",
      "SentenceSplitter (2048 chunk / 200 overlap)",
      "Gemini Embedding-2 Vectorization",
      "ChromaDB Cloud Top-5 Retrieval",
      "Cross-Encoder Rerank (Top-3) + Gemini 2.5 Flash",
    ],
    metrics: [
      { question: "Q1: Simple Overview", promptTokens: "5,467", completionTokens: "391", totalTokens: "5,858", cost: "$0.002618" },
      { question: "Q2: Analytical Relations", promptTokens: "5,645", completionTokens: "1,673", totalTokens: "7,318", cost: "$0.005876" },
      { question: "Q3: Multi-Hop Conclusion", promptTokens: "6,897", completionTokens: "1,857", totalTokens: "8,754", cost: "$0.005338" },
    ],
    avgTokens: "7,310 tokens/query",
    totalBenchCost: "$0.013832",
    strengths: "Fastest setup, zero LLM extraction cost during indexing, and most predictable token footprint for tight free-tier API quotas.",
    tradeoffs: "Matches passages purely by embedding proximity; lacks explicit multi-hop entity relationship traversal across distant transcript segments.",
  },
  {
    id: "graph",
    name: "Graph RAG",
    subtitle: "Knowledge Graph Triplet Retrieval (Neo4j)",
    badge: "Relational Context",
    repoName: "youtube-graph-rag-llamaindex",
    repoUrl: "https://github.com/viochris/youtube-graph-rag-llamaindex",
    storage: "Neo4j Property Graph + APOC + Entity Vector Index",
    retrievalMechanism: "LLM extracts up to 15 (subject, relation, object) triplets per chunk via SimpleLLMPathExtractor. Retrieval combines keyword expansion + graph node embeddings (include_text=True) + Cross-Encoder reranking.",
    llmCallsPerTurn: "~2+ LLM calls per question (keyword/synonym extraction for graph traversal + final answer generation, plus upfront LLM triplet extraction during indexing).",
    pipelineSteps: [
      "YouTube Transcript & 2048-Token Chunks",
      "SimpleLLMPathExtractor (15 Triplets/Chunk)",
      "Neo4j Property Graph + Node Embeddings",
      "Dual Graph Lookup (Keywords + Vector Nodes)",
      "Cross-Encoder Rerank (Top-3) + Gemini 2.5 Flash",
    ],
    metrics: [
      { question: "Q1: Simple Overview", promptTokens: "3,527", completionTokens: "1,432", totalTokens: "4,959", cost: "$0.004638" },
      { question: "Q2: Analytical Relations", promptTokens: "4,344", completionTokens: "3,645", totalTokens: "7,989", cost: "$0.010416" },
      { question: "Q3: Multi-Hop Conclusion", promptTokens: "7,183", completionTokens: "2,653", totalTokens: "9,836", cost: "$0.008787" },
    ],
    avgTokens: "7,595 tokens/query",
    totalBenchCost: "$0.023841",
    strengths: "Captures explicit subject-relation-object links across concepts and uses fewer prompt tokens on simple queries (3,527 vs. 5,467) due to compact triplet context.",
    tradeoffs: "Requires upfront LLM calls to build the Neo4j graph and produces ~1.7x to 3.6x longer completion token outputs than Vector RAG, raising per-turn cost.",
  },
  {
    id: "hybrid",
    name: "Hybrid RAG",
    subtitle: "Reciprocal Rank Fusion (ChromaDB + Neo4j)",
    badge: "Maximum Context Depth",
    repoName: "youtube-hybrid-rag-llamaindex",
    repoUrl: "https://github.com/viochris/youtube-hybrid-rag-llamaindex",
    storage: "ChromaDB Cloud + Neo4j Property Graph + PostgreSQL Memory",
    retrievalMechanism: "QueryFusionRetriever generates 2 extra query variants (3 queries total), runs 6 parallel searches across ChromaDB and Neo4j, merges via Reciprocal Rank Fusion (RRF), and reranks top 5 down to top 3.",
    llmCallsPerTurn: "~5 LLM calls per question (1 call for query variant generation, 3 calls for graph keyword expansion, 1 call for final answer synthesis).",
    pipelineSteps: [
      "User Query + LLM Query Expansion (3 Variants)",
      "6 Parallel Searches (ChromaDB + Neo4j Graph)",
      "Reciprocal Rank Fusion (RRF Score 1/(rank+60))",
      "Cross-Encoder Reranker (Top-5 to Top-3)",
      "PostgreSQL AsyncPG Memory + Gemini Synthesis",
    ],
    metrics: [
      { question: "Q1: Simple Overview", promptTokens: "5,370", completionTokens: "3,838", totalTokens: "9,208", cost: "$0.010026" },
      { question: "Q2: Analytical Relations", promptTokens: "6,102", completionTokens: "4,306", totalTokens: "10,408", cost: "$0.010901" },
      { question: "Q3: Multi-Hop Conclusion", promptTokens: "8,084", completionTokens: "4,787", totalTokens: "12,871", cost: "$0.012668" },
    ],
    avgTokens: "10,829 tokens/query",
    totalBenchCost: "$0.033595",
    strengths: "Most resilient to phrasing mismatches by fusing multi-query semantic chunks with structured graph triplets before cross-encoder reranking.",
    tradeoffs: "Costs ~2.4x more than Vector RAG overall because query fusion pulls richer context and prompts the LLM to synthesize significantly longer completions (3,838 to 4,787 tokens).",
  },
];

export default function ProjectsPage() {
  const [selectedRagId, setSelectedRagId] = useState<string>("hybrid");
  const activeRag = ragArchitectures.find((r) => r.id === selectedRagId) || ragArchitectures[2];

  const totalPromptTokens = activeRag.metrics.reduce(
    (sum, m) => sum + parseInt(m.promptTokens.replace(/,/g, ''), 10),
    0
  );
  const totalCompletionTokens = activeRag.metrics.reduce(
    (sum, m) => sum + parseInt(m.completionTokens.replace(/,/g, ''), 10),
    0
  );
  const totalAllTokens = activeRag.metrics.reduce(
    (sum, m) => sum + parseInt(m.totalTokens.replace(/,/g, ''), 10),
    0
  );
  const totalCostNum = activeRag.metrics.reduce(
    (sum, m) => sum + parseFloat(m.cost.replace('$', '')),
    0
  );
  const queryCount = activeRag.metrics.length || 3;

  return (
    <div className="pt-28 lg:pt-36 pb-20 px-4 sm:px-6 lg:px-12 min-h-screen">
      <section id="projects" className="max-w-7xl mx-auto space-y-24">
        <div>
          <ParallaxLayer offsetY={-16} mobileOffsetY={8}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div className="space-y-4">
                <Badge variant="outline" className="text-primary tracking-[0.22em] uppercase px-3.5 border-primary/30 text-[11px]">
                  Portfolio
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-black uppercase tracking-tight text-foreground">
                  Featured <span className="text-primary">Projects</span>
                </h1>
                <p className="text-zinc-300 text-base sm:text-lg max-w-2xl">
                  Production-ready AI solutions solving practical problems through data science and systems engineering.
                </p>
              </div>

              <Button
                variant="link"
                className="font-headline font-bold uppercase tracking-wider gap-1.5 text-primary h-auto p-0 w-fit"
                asChild
              >
                <Link href="/repository">
                  Explore Repository <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </ParallaxLayer>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch md:auto-rows-fr">
            {featuredProjects.map((p, index) => (
              <article key={p.id} className="flex flex-col h-full group">
                <div className="bg-card border border-border/80 rounded-2xl p-6 flex flex-col h-full hover:border-primary/40 transition-colors">
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black/40 mb-6 border border-border/60">
                    <ParallaxImageFrame offsetY={26} baseScale={1.12} className="w-full h-full">
                      <Image
                        src={p.image}
                        alt={`${p.title} interface preview`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                        priority={index < 2}
                      />
                    </ParallaxImageFrame>
                    <div className="absolute top-3 right-3 z-10">
                      <Badge className="bg-primary text-primary-foreground font-bold uppercase tracking-wider text-[10px] px-2.5 py-0.5 border-none">
                        {p.impact}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.tech.map((t) => (
                      <Badge
                        key={t}
                        variant="outline"
                        className="text-[10px] uppercase font-bold tracking-wider border-primary/30 text-primary bg-primary/5 px-2.5 py-0.5 rounded-lg"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex-1 space-y-2.5">
                    <h2 className="text-2xl font-headline font-bold text-white tracking-tight leading-snug group-hover:text-primary transition-colors md:min-h-[4rem]">
                      {p.title}
                    </h2>
                    <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border/60">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full h-12 rounded-xl border-border hover:bg-white/5 hover:border-primary/50 text-white font-headline font-bold uppercase tracking-wider text-xs transition-colors"
                        >
                          Case Study Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border-border bg-card p-6 md:p-8">
                        <DialogHeader>
                          <DialogTitle className="text-2xl md:text-3xl font-headline font-bold text-foreground">
                            {p.title}
                          </DialogTitle>
                          <DialogDescription className="text-zinc-400 text-sm">
                            Architecture overview, problem statement, system pipeline, and transparent engineering trade-offs.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                          <div className="space-y-5">
                            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border">
                              <Image
                                src={p.image}
                                alt={`${p.title} full preview`}
                                fill
                                sizes="(max-width: 768px) 100vw, 400px"
                                className="object-cover object-top"
                              />
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <Badge className="bg-primary text-primary-foreground px-3 py-1 font-bold uppercase text-xs border-none">
                                {p.impact}
                              </Badge>
                              {p.tech.map((t) => (
                                <Badge
                                  key={t}
                                  variant="secondary"
                                  className="bg-secondary text-zinc-200 uppercase text-[10px] font-bold px-2.5 py-1 border-none"
                                >
                                  {t}
                                </Badge>
                              ))}
                            </div>

                            {/* System Architecture Pipeline */}
                            <div className="p-4 rounded-xl bg-background/70 border border-border/80 space-y-3">
                              <h3 className="text-xs font-bold uppercase text-primary flex items-center gap-2 tracking-wider">
                                <Workflow className="w-4 h-4" aria-hidden="true" /> System Architecture Pipeline
                              </h3>
                              <ol className="space-y-2">
                                {p.pipeline.map((step, idx) => (
                                  <li key={step} className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-200">
                                    <span className="w-5 h-5 rounded-md bg-primary/15 border border-primary/30 text-primary font-code font-bold text-[11px] flex items-center justify-center shrink-0">
                                      {idx + 1}
                                    </span>
                                    <span className="font-medium leading-snug">{step}</span>
                                  </li>
                                ))}
                              </ol>
                            </div>
                          </div>

                          <div className="space-y-5 flex flex-col justify-between">
                            <div className="space-y-5">
                              <div>
                                <h3 className="text-xs font-bold uppercase text-primary mb-1.5 flex items-center gap-2 tracking-wider">
                                  <Info className="w-4 h-4" aria-hidden="true" /> Overview
                                </h3>
                                <p className="text-zinc-200 text-sm leading-relaxed">{p.desc}</p>
                              </div>

                              <div>
                                <h3 className="text-xs font-bold uppercase text-primary mb-1.5 flex items-center gap-2 tracking-wider">
                                  <Brain className="w-4 h-4" aria-hidden="true" /> The Problem
                                </h3>
                                <p className="text-zinc-300 text-sm leading-relaxed">{p.problem}</p>
                              </div>

                              <div>
                                <h3 className="text-xs font-bold uppercase text-primary mb-1.5 flex items-center gap-2 tracking-wider">
                                  <Sparkles className="w-4 h-4" aria-hidden="true" /> The Solution
                                </h3>
                                <p className="text-zinc-300 text-sm leading-relaxed">{p.solution}</p>
                              </div>

                              {/* Known Limitations & Engineering Trade-offs */}
                              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/25 space-y-1.5">
                                <h3 className="text-xs font-bold uppercase text-amber-300 flex items-center gap-2 tracking-wider">
                                  <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden="true" /> Known Limitations &amp; Trade-offs
                                </h3>
                                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                                  {p.limitations}
                                </p>
                              </div>
                            </div>

                            <div className="space-y-4 pt-2">
                              <Separator className="bg-border" />
                              <div className="flex flex-col sm:flex-row gap-3">
                                <Button className="flex-1 rounded-xl font-headline font-bold h-12 text-xs sm:text-sm uppercase tracking-wider" asChild>
                                  <a href={p.link} target="_blank" rel="noopener noreferrer">
                                    Visit Repository <ExternalLink className="ml-2 w-4 h-4" aria-hidden="true" />
                                  </a>
                                </Button>
                                {p.demo && (
                                  <Button
                                    variant="outline"
                                    className="flex-1 rounded-xl border-primary/40 bg-primary/10 hover:bg-primary/20 text-primary font-headline font-bold h-12 text-xs sm:text-sm uppercase tracking-wider"
                                    asChild
                                  >
                                    <a href={p.demo} target="_blank" rel="noopener noreferrer">
                                      {p.demoLabel || "Live Demo"} <ExternalLink className="ml-2 w-4 h-4" aria-hidden="true" />
                                    </a>
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Registered Intellectual Property Spotlight */}
        <section id="intellectual-property" aria-labelledby="ip-spotlight-heading" className="scroll-mt-28">
          <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-card border border-primary/35 shadow-xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Badge variant="outline" className="text-primary tracking-[0.2em] uppercase px-3 py-1 border-primary/35 bg-primary/10 text-[11px] font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
                    {registeredCopyright.issuer}
                  </Badge>
                  <Badge className="bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold uppercase tracking-wider text-[11px] px-3 py-1">
                    Reg. No. {registeredCopyright.regNumber} · {registeredCopyright.publishedDate}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <h2 id="ip-spotlight-heading" className="text-2xl sm:text-3xl lg:text-4xl font-headline font-black uppercase tracking-tight text-white">
                    {registeredCopyright.title}
                  </h2>
                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                    {registeredCopyright.summary}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {registeredCopyright.tech.map((t) => (
                    <Badge
                      key={t}
                      variant="outline"
                      className="text-[11px] uppercase font-bold tracking-wider border-primary/30 text-primary bg-primary/5 px-2.5 py-1 rounded-lg"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-background/70 border border-border/80 space-y-4">
                <div className="flex items-center gap-2 text-xs font-headline font-bold uppercase tracking-wider text-primary">
                  <Award className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Verification &amp; Field Evidence</span>
                </div>

                <dl className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-card border border-border/60">
                    <dt className="text-zinc-400 uppercase tracking-wider font-bold text-[10px]">Registration No.</dt>
                    <dd className="text-white font-mono font-bold text-sm mt-0.5">{registeredCopyright.regNumber}</dd>
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border/60">
                    <dt className="text-zinc-400 uppercase tracking-wider font-bold text-[10px]">First Published</dt>
                    <dd className="text-white font-semibold text-sm mt-0.5">{registeredCopyright.publishedDate}</dd>
                  </div>
                  <div className="col-span-2 p-3 rounded-xl bg-card border border-border/60">
                    <dt className="text-zinc-400 uppercase tracking-wider font-bold text-[10px]">Community Validation</dt>
                    <dd className="text-zinc-200 font-medium mt-0.5">{registeredCopyright.fieldValidation}</dd>
                  </div>
                </dl>

                <div className="flex flex-col gap-2.5 pt-1">
                  <Button
                    className="w-full h-11 rounded-xl font-headline font-bold uppercase tracking-wider text-xs gap-2"
                    asChild
                  >
                    <a href={registeredCopyright.certificateUrl} target="_blank" rel="noopener noreferrer">
                      <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>View Copyright Certificate</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-auto shrink-0" aria-hidden="true" />
                    </a>
                  </Button>
                  <div className="grid grid-cols-2 gap-2.5">
                    <Button
                      variant="outline"
                      className="h-10 rounded-xl border-border hover:bg-white/5 text-white font-headline font-bold uppercase tracking-wider text-[11px] gap-1.5"
                      asChild
                    >
                      <a href={registeredCopyright.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>Stuntify-API</span>
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-10 rounded-xl border-primary/35 bg-primary/10 hover:bg-primary/20 text-primary font-headline font-bold uppercase tracking-wider text-[11px] gap-1.5"
                      asChild
                    >
                      <a href={registeredCopyright.apiUrl} target="_blank" rel="noopener noreferrer">
                        <span>Live API Docs</span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive RAG Architecture & Cost Benchmark Lab */}
        <div id="rag-benchmark" className="scroll-mt-28 space-y-8 pt-4">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3">
              <Badge variant="outline" className="text-primary tracking-[0.22em] uppercase px-3.5 py-1 border-primary/30 text-[11px]">
                Empirical LLMOps Study
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-black uppercase tracking-tight text-white">
                RAG Architecture <span className="text-primary">Benchmark</span>
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base max-w-3xl leading-relaxed">
                Apples-to-apples token consumption and inference cost comparison across Vector, Graph, and Hybrid RAG over the same YouTube transcript and 3-tier question set, instrumented with LlamaIndex, LiteLLM, and Arize Phoenix (OpenTelemetry).
              </p>
            </div>

            <Button
              variant="outline"
              className="rounded-xl border-primary/40 bg-primary/10 hover:bg-primary/20 text-primary font-headline font-bold uppercase tracking-wider text-xs h-11 px-5 w-fit shrink-0"
              asChild
            >
              <a
                href="https://github.com/viochris/rag-token-benchmark-vector-graph-hybrid"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4 mr-2" aria-hidden="true" />
                Benchmark Repository
                <ExternalLink className="w-3.5 h-3.5 ml-2" aria-hidden="true" />
              </a>
            </Button>
          </div>

          {/* Architecture Selector Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" role="tablist" aria-label="RAG Architecture Comparison">
            {ragArchitectures.map((arch) => {
              const isSelected = arch.id === activeRag.id;
              return (
                <button
                  key={arch.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedRagId(arch.id)}
                  className={`text-left p-5 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                    isSelected
                      ? "bg-primary/12 border-primary shadow-md ring-1 ring-primary/40"
                      : "bg-card border-border/80 hover:border-primary/40 hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 font-headline font-black text-lg uppercase tracking-wide text-white">
                      {arch.id === "vector" && <Database className="w-4 h-4 text-primary" aria-hidden="true" />}
                      {arch.id === "graph" && <GitBranch className="w-4 h-4 text-primary" aria-hidden="true" />}
                      {arch.id === "hybrid" && <Layers className="w-4 h-4 text-primary" aria-hidden="true" />}
                      {arch.name}
                    </span>
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 ${
                        isSelected ? "border-primary text-primary bg-primary/15" : "border-border text-zinc-400"
                      }`}
                    >
                      {arch.badge}
                    </Badge>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{arch.subtitle}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-border/60 text-xs font-code">
                    <span className="text-zinc-400">3-Query Total:</span>
                    <span className="font-bold text-primary">{arch.totalBenchCost} ({arch.avgTokens})</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Architecture Deep-Dive Card */}
          <div className="p-6 sm:p-8 bg-card rounded-2xl border border-border/80 space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-border/80">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-2xl sm:text-3xl font-headline font-black uppercase text-white tracking-tight">
                    {activeRag.name}
                  </h3>
                  <Badge className="bg-primary text-primary-foreground font-bold uppercase text-[10px] tracking-wider border-none">
                    Model: gemini-2.5-flash
                  </Badge>
                  <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-wider border-primary/30 text-primary">
                    Reranker: ms-marco-MiniLM-L-2-v2
                  </Badge>
                </div>
                <p className="text-sm text-zinc-300">{activeRag.retrievalMechanism}</p>
              </div>

              <Button
                variant="outline"
                className="rounded-xl border-border hover:border-primary/50 hover:bg-white/5 text-white font-headline font-bold uppercase tracking-wider text-xs h-11 px-4 w-fit shrink-0"
                asChild
              >
                <a href={activeRag.repoUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2 text-primary" aria-hidden="true" />
                  {activeRag.repoName}
                  <ExternalLink className="w-3.5 h-3.5 ml-2 opacity-70" aria-hidden="true" />
                </a>
              </Button>
            </div>

            {/* Pipeline Flow Steps */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                <Workflow className="w-4 h-4" aria-hidden="true" /> End-to-End Retrieval &amp; Synthesis Flow
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {activeRag.pipelineSteps.map((step, i) => (
                  <div
                    key={step}
                    className="p-3.5 rounded-xl bg-background/70 border border-border/80 flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-md bg-primary/15 text-primary font-code font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                      0{i + 1}
                    </span>
                    <span className="text-xs font-semibold text-zinc-200 leading-snug">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantitative Benchmark Table + Engineering Notes */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-7 p-5 rounded-xl bg-background/70 border border-border/80 flex flex-col justify-between space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                    <Activity className="w-4 h-4" aria-hidden="true" /> Per-Turn Token &amp; Cost Telemetry
                  </div>
                  <span className="text-[11px] font-code text-zinc-400">TokenCountingHandler + LiteLLM</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-border text-zinc-400 font-headline uppercase text-[11px] tracking-wider">
                        <th className="py-2.5 pr-3">Complexity Tier</th>
                        <th className="py-2.5 px-2 text-right">Prompt</th>
                        <th className="py-2.5 px-2 text-right">Completion</th>
                        <th className="py-2.5 px-2 text-right">Total</th>
                        <th className="py-2.5 pl-2 text-right text-primary">Est. Cost</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50 font-code">
                      {activeRag.metrics.map((m) => (
                        <tr key={m.question} className="text-zinc-200">
                          <td className="py-3 pr-3 font-sans font-semibold text-white">{m.question}</td>
                          <td className="py-3 px-2 text-right tabular-nums text-zinc-300">{m.promptTokens}</td>
                          <td className="py-3 px-2 text-right tabular-nums text-zinc-300">{m.completionTokens}</td>
                          <td className="py-3 px-2 text-right tabular-nums font-bold text-white">{m.totalTokens}</td>
                          <td className="py-3 pl-2 text-right tabular-nums font-bold text-primary">{m.cost}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="border-t-2 border-border font-code">
                      <tr className="bg-white/[0.03] text-white">
                        <td className="py-3 pr-3 font-sans font-bold uppercase text-xs tracking-wider text-zinc-200">
                          Total (3 Queries)
                        </td>
                        <td className="py-3 px-2 text-right tabular-nums font-semibold">
                          {totalPromptTokens.toLocaleString('en-US')}
                        </td>
                        <td className="py-3 px-2 text-right tabular-nums font-semibold">
                          {totalCompletionTokens.toLocaleString('en-US')}
                        </td>
                        <td className="py-3 px-2 text-right tabular-nums font-bold">
                          {totalAllTokens.toLocaleString('en-US')}
                        </td>
                        <td className="py-3 pl-2 text-right tabular-nums font-black text-primary">
                          ${totalCostNum.toFixed(6)}
                        </td>
                      </tr>
                      <tr className="border-t border-border/50 text-zinc-300">
                        <td className="py-2.5 pr-3 font-sans font-medium text-xs text-zinc-400">
                          Average / 1 Query
                        </td>
                        <td className="py-2.5 px-2 text-right tabular-nums text-xs text-zinc-400">
                          {Math.round(totalPromptTokens / queryCount).toLocaleString('en-US')}
                        </td>
                        <td className="py-2.5 px-2 text-right tabular-nums text-xs text-zinc-400">
                          {Math.round(totalCompletionTokens / queryCount).toLocaleString('en-US')}
                        </td>
                        <td className="py-2.5 px-2 text-right tabular-nums text-xs font-semibold text-zinc-300">
                          {Math.round(totalAllTokens / queryCount).toLocaleString('en-US')}
                        </td>
                        <td className="py-2.5 pl-2 text-right tabular-nums text-xs font-bold text-primary/90">
                          ${(totalCostNum / queryCount).toFixed(6)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className="text-[11px] text-zinc-400 leading-relaxed pt-2 border-t border-border/60">
                  Measured on identical YouTube transcript source (OpenAI CLIP zero-shot localization) with model fallback disabled to isolate architectural token overhead.
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                <div className="p-4 rounded-xl bg-background/70 border border-border/80 space-y-1.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                    <Cpu className="w-4 h-4" aria-hidden="true" /> Storage &amp; Call Profile
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-200 font-semibold">{activeRag.storage}</p>
                  <p className="text-xs text-zinc-400 leading-relaxed">{activeRag.llmCallsPerTurn}</p>
                </div>

                <div className="p-4 rounded-xl bg-primary/5 border border-primary/25 space-y-1.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                    <Sparkles className="w-4 h-4" aria-hidden="true" /> Architectural Strengths
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">{activeRag.strengths}</p>
                </div>

                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/25 space-y-1.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" aria-hidden="true" /> Cost &amp; Engineering Trade-offs
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{activeRag.tradeoffs}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
