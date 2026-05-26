
"use client"

import React, { useState, useMemo, useEffect } from 'react';
import { Github, ExternalLink, Code2, Search, Filter, ChevronDown, ArrowLeft, Star, GitBranch, Users, MessageSquare } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from 'next/link';
import { useNavigation } from '@/context/NavigationContext';
import { cn } from '@/lib/utils';

type Category = "All" | "GenAI" | "Backend" | "Automation" | "Data Science" | "Analytics" | "Fun";
type Impact = "All" | "Production Ready" | "High Impact" | "Research Oriented" | "Automation Pro";

const repos = [
  // GenAI & Interactive
  { name: "InsightSQL (LangGraph Engine)", type: "GenAI", impact: "Production Ready", tech: "LangGraph, Gemini", desc: "SQL Agents using Graph Architecture with Cyclic Reasoning and error self-correction.", link: "https://github.com/viochris/InsightSQL-LangGraph-Engine-Web" },
  { name: "InsightData (AI Analyst)", type: "GenAI", impact: "Automation Pro", tech: "Pandas Agent, Gemini", desc: "Automated Data Scientist that analyzes CSVs/Excel and auto-generates visualizations.", link: "https://github.com/viochris/insight-data-ai-analyst" },
  { name: "InsightSQL (ReAct Engine)", type: "GenAI", impact: "Production Ready", tech: "LangChain, Gemini", desc: "Advanced DBA using ReAct Architecture for transparent and self-correcting data reasoning.", link: "https://github.com/viochris/InsightSQL-ReAct-Engine" },
  { name: "InsightSQL (Simple)", type: "GenAI", impact: "High Impact", tech: "LangChain, SQL Agent", desc: "Streamlined Text-to-SQL assistant using standard SQL agent mapping.", link: "https://github.com/viochris/InsightSQL-Simple" },
  { name: "Chat with Vio (Portfolio AI)", type: "GenAI", impact: "High Impact", tech: "Streamlit, LangChain", desc: "Personalized RAG assistant that chats with professional profile data.", link: "https://github.com/viochris/personal-ai-assistant" },
  { name: "DocuTalk-AI (Smart RAG)", type: "GenAI", impact: "Research Oriented", tech: "LangChain, FAISS", desc: "Intelligent document assistant using ReAct Agents to decide between docs or web search.", link: "https://github.com/viochris/DocuTalk-AI" },
  { name: "DocuFlow-AI (Fast RAG)", type: "GenAI", impact: "High Impact", tech: "LangChain, FAISS", desc: "High-performance RAG using ConversationalRetrievalChain for instant analysis.", link: "https://github.com/viochris/DocuFlow-AI" },
  { name: "DocuChat AI (Long Context)", type: "GenAI", impact: "Research Oriented", tech: "Gemini 2.5 Flash", desc: "Analyzing entire PDFs without chunking using massive context windows.", link: "https://github.com/viochris/Gemini-Long-Context-Chat" },
  { name: "AI Recipe Generator", type: "GenAI", impact: "High Impact", tech: "LangChain, Vision", desc: "Cooking assistant detecting ingredients from photos to generate recipes.", link: "https://github.com/viochris/ai-recipe-generator" },
  
  // Backend & MLOps
  { name: "Resume Scanner API", type: "Backend", impact: "Research Oriented", tech: "FastAPI, SBERT", desc: "Dual-Engine ATS API using TF-IDF and SBERT for resume-job description matching.", link: "https://github.com/viochris/resume-scanner-api" },
  { name: "Portfolio API (Backend)", type: "Backend", impact: "Production Ready", tech: "FastAPI, Docker", desc: "Headless RAG engine serving portfolio data with structured JSON responses.", link: "https://github.com/viochris/silvio-portfolio-api" },
  { name: "Stuntify API (MLOps)", type: "Backend", impact: "Production Ready", tech: "FastAPI, Scikit-Learn", desc: "Robust inference system for real-time stunting risk prediction.", link: "https://github.com/viochris/Stuntify-API" },
  { name: "Insightify API (NLP)", type: "Backend", impact: "High Impact", tech: "FastAPI, RoBERTa", desc: "Dual-lingual sentiment analytics for English & Indonesian text.", link: "https://github.com/viochris/Insightify-Sentiment-API" },
  { name: "Stunting Prediction API (Flask)", type: "Backend", impact: "Research Oriented", tech: "Flask, Python", desc: "RESTful API for real-time stunting prediction inference.", link: "https://github.com/viochris/API-Stuntify" },

  // Automation & Orchestration
  { name: "NovaCal AI (Stateful Telegram)", type: "Automation", impact: "Automation Pro", tech: "LangChain, SQL", desc: "Advanced Telegram bot with SQL-backed conversational memory for multi-turn calendar management.", link: "https://github.com/viochris/telegram-calendar-ai-bot.git" },
  { name: "NovaCal AI (Ephemeral Telegram)", type: "Automation", impact: "High Impact", tech: "LangChain, RAM", desc: "Slot-filling calendar assistant using RAM-based memory to save tokens and prevent hallucinations.", link: "https://github.com/viochris/NovaCal-Ephemeral-AI.git" },
  { name: "NovaCal AI (Stateless Telegram)", type: "Automation", impact: "High Impact", tech: "LangChain, PTB", desc: "Fast, stateless Telegram bot for quick single-turn calendar tasks with maximum token efficiency.", link: "https://github.com/viochris/NovaCal-AI-Telegram.git" },
  { name: "NovaCal AI (Streamlit Edition)", type: "Automation", impact: "High Impact", tech: "Streamlit, LangChain", desc: "Web-based visual interface for intelligent calendar management with dynamic UI and session buffer memory.", link: "https://github.com/viochris/NovaCal-AI-Streamlit.git" },
  { name: "NovaTasks AI (Ephemeral Telegram)", type: "Automation", impact: "Automation Pro", tech: "LangChain, RAM", desc: "Conversational Telegram bot for Google Tasks management using ephemeral RAM-based memory.", link: "https://github.com/viochris/NovaTasks-AI-Telegram.git" },
  { name: "NovaMail AI (Gmail Autoresponder)", type: "Automation", impact: "Automation Pro", tech: "Gmail API, Gemini", desc: "Autonomous inbox assistant that reads emails and sends professional AI-generated replies.", link: "https://github.com/viochris/NovaMail-AI-Autoresponder.git" },
  { name: "Daily Agenda Broadcaster", type: "Automation", impact: "High Impact", tech: "Python, GCalendar", desc: "Automated workflow that fetches upcoming events and dispatches clean briefings to Telegram.", link: "https://github.com/viochris/auto-daily-scheduler.git" },
  { name: "AI Vision Generator", type: "Automation", impact: "High Impact", tech: "PTB, Hugging Face", desc: "Text-to-Image Telegram bot using SDXL to render high-quality images from user prompts.", link: "https://github.com/viochris/telegram-image-generator.git" },
  { name: "Conversational AI Interface", type: "Automation", impact: "High Impact", tech: "PTB, Gemini", desc: "Interactive bridge between Telegram and Google Gemini model for intelligent chat responses.", link: "https://github.com/viochris/qna-telegram-bot-ptb.git" },
  { name: "Daily AI News Digest", type: "Automation", impact: "Automation Pro", tech: "Prefect, Gemini", desc: "Autonomous pipeline that scrapes real-time news and delivers daily digests to Telegram.", link: "https://github.com/viochris/daily-ai-news-digest" },
  { name: "Automated Image Pipeline", type: "Automation", impact: "Automation Pro", tech: "Prefect, HF", desc: "ETL pipeline that generates AI art from GSheets prompts and publishes to Telegram.", link: "https://github.com/viochris/automated-image-pipeline" },
  { name: "Daily Prompt Generator", type: "Automation", impact: "Automation Pro", tech: "Prefect, Gemini", desc: "Producer bot that crafts daily prompts and logs them to GSheets for the image pipeline.", link: "https://github.com/viochris/daily-prompt-generator-bot" },
  { name: "Batch Prompt Generator", type: "Automation", impact: "Automation Pro", tech: "Prefect, Gemini", desc: "Bulk producer bot crafting 3 prompts per run for fast queue filling in GSheets.", link: "https://github.com/viochris/daily-batch-prompt-bot" },
  { name: "Daily Quote Automator", type: "Automation", impact: "High Impact", tech: "Prefect, Gemini", desc: "Simple HTTP bot that synthesizes daily developer motivation via direct requests.", link: "https://github.com/viochris/trial-simple-quote-bot" },
  { name: "Daily Quote Bot (PTB)", type: "Automation", impact: "High Impact", tech: "Prefect, PTB", desc: "Official library implementation for the Daily Quote bot using python-telegram-bot.", link: "https://github.com/viochris/daily-quote-bot-ptb" },
  
  // Data Science
  { name: "SpendSense (Financial AI)", type: "Data Science", impact: "High Impact", tech: "Streamlit, Vision", desc: "Conversational finance app with OCR receipt scanning and natural language expense queries.", link: "https://github.com/viochris/Streamlit-SpendSense" },
  { name: "Streamlit Resume Scanner", type: "Data Science", impact: "High Impact", tech: "SBERT, NLP", desc: "Dual-Engine CV analyzer for ATS logic and semantic fit calculation with Streamlit UI.", link: "https://github.com/viochris/streamlit-resume-scanner" },
  { name: "Diabetes Prediction (Robust)", type: "Data Science", impact: "Research Oriented", tech: "Scikit-Learn, SMOTE", desc: "ML model with proper pre-processing after split to avoid data leakage and handle imbalance.", link: "https://github.com/viochris/Diabetes-prediction-fine-tuned-project" },
  { name: "Stunting Analysis", type: "Data Science", impact: "Research Oriented", tech: "SMOTENC, Viz", desc: "Handling categorical imbalance and visualizing decision paths for model interpretability.", link: "https://github.com/viochris/Stunting-prediction-project" },
  { name: "Review Sentiment Analyzer", type: "Data Science", impact: "High Impact", tech: "Transformers", desc: "NLP model classifying text sentiment using Hugging Face pre-trained transformers.", link: "https://github.com/viochris/Simple-Sentiment-Analysis" },
  { name: "Diabetes Paper Replication", type: "Data Science", impact: "Research Oriented", tech: "Python, Pandas", desc: "Academic study replicating research methodology for comparative analysis and validation.", link: "https://github.com/viochris/Diabetes-prediction-project" },
  
  // Analytics
  { name: "Supermarket Sales Dashboard", type: "Analytics", impact: "High Impact", tech: "Tableau Public", desc: "Operations dashboard monitoring COGS and customer ratings in retail.", link: "https://public.tableau.com/views/SupermarketSalesDashboard_17081427139270/Dashboard1" },
  { name: "Bike Sales Executive", type: "Analytics", impact: "High Impact", tech: "Tableau Public", desc: "Executive view of revenue and sales performance by US states.", link: "https://public.tableau.com/views/BikeSalesDashboard_17081369078430/Dashboard1" },
  
  // Fun
  { name: "Conversational Persona", type: "Fun", impact: "High Impact", tech: "Streamlit, Gemini", desc: "Roleplay chatbot with persistent memory and dynamic adaptation.", link: "https://github.com/viochris/Simple-AI-Girlfriend" },
  { name: "Real-time Chat Socket", type: "Fun", impact: "Research Oriented", tech: "Python Socket", desc: "Casual project exploring networking and socket programming principles.", link: "https://github.com/viochris/chat-group.git" }
];

const categories: Category[] = ["All", "GenAI", "Backend", "Automation", "Data Science", "Analytics", "Fun"];
const impacts: Impact[] = ["All", "Production Ready", "High Impact", "Research Oriented", "Automation Pro"];

export default function RepositoryPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [activeImpact, setActiveImpact] = useState<Impact>("All");
  const { setActiveTab } = useNavigation();
  const [ghStats, setGhStats] = useState({ repos: 0, stars: 0 });
  const [loadingGh, setLoadingGh] = useState(true);

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch('https://api.github.com/users/viochris'),
          fetch('https://api.github.com/users/viochris/repos?per_page=100')
        ]);

        const userData = await userRes.json();
        const reposData = await reposRes.json();

        const totalStars = reposData.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0);

        setGhStats({
          repos: userData.public_repos || 0,
          stars: totalStars
        });
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
      } finally {
        setLoadingGh(false);
      }
    }
    fetchGitHubData();
  }, []);

  const filteredRepos = useMemo(() => {
    return repos.filter(repo => {
      const matchesSearch = repo.name.toLowerCase().includes(search.toLowerCase()) || 
                            repo.desc.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === "All" || repo.type === activeCategory;
      const matchesImpact = activeImpact === "All" || repo.impact === activeImpact;
      return matchesSearch && matchesCategory && matchesImpact;
    });
  }, [search, activeCategory, activeImpact]);

  return (
    <div className="pt-32 lg:pt-40 pb-24 px-6 md:px-12 lg:px-16 min-h-screen">
      <section id="repository" className="max-w-7xl mx-auto">
        <div className="mb-12">
          <Link 
            href="/projects" 
            onClick={() => setActiveTab('Projects')}
            className="flex items-center gap-2 text-primary font-headline font-bold uppercase tracking-widest text-xs hover:gap-4 transition-all w-fit"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </Link>
        </div>

        <div className="space-y-8 mb-16 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-6">
              <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase px-4">Github</Badge>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black uppercase tracking-tighter text-white">
                Explore <span className="text-primary">Repository</span>
              </h2>
              <p className="text-white/70 text-lg md:text-xl max-w-2xl font-medium mx-auto lg:mx-0">
                A complete list of my AI projects, ranging from robust predictive modeling to autonomous agents and MLOps.
              </p>
            </div>

            {/* Live Insights Bar */}
            <div className="flex gap-4 sm:gap-6 justify-center lg:justify-end">
              <div className="px-6 py-4 glass rounded-2xl border-white/10 flex flex-col items-center">
                <div className="flex items-center gap-2 text-primary mb-1">
                  <GitBranch size={16} />
                  <span className="text-lg font-black text-white">{loadingGh ? "..." : ghStats.repos}</span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">Total Repos</div>
              </div>
              <div className="px-6 py-4 glass rounded-2xl border-white/10 flex flex-col items-center">
                <div className="flex items-center gap-2 text-primary mb-1">
                  <Star size={16} />
                  <span className="text-lg font-black text-white">{loadingGh ? "..." : ghStats.stars}</span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">GitHub Stars</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-4 mb-16 bg-white/5 p-4 rounded-3xl border border-white/10 shadow-xl items-stretch">
          <div className="relative flex-1">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <Input 
              placeholder="Search projects..." 
              className="pl-14 h-14 bg-black/40 border-white/10 rounded-2xl focus:ring-primary text-white placeholder:text-white/30"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-14 px-6 rounded-2xl border-white/10 bg-black/40 hover:bg-white/5 text-white font-headline font-bold uppercase tracking-widest text-[10px] flex gap-3 shadow-lg min-w-[160px] flex-1">
                  <Filter className="w-4 h-4 text-primary" />
                  <span>Category: {activeCategory}</span>
                  <ChevronDown className="w-4 h-4 opacity-50 ml-auto" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-card border-border rounded-xl p-1 z-[100]">
                {categories.map((cat) => (
                  <DropdownMenuItem 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`cursor-pointer font-headline font-bold uppercase tracking-widest text-[10px] px-4 py-3 rounded-lg transition-colors ${
                      activeCategory === cat ? 'bg-primary text-white' : 'hover:bg-white/5 text-white/70'
                    }`}
                  >
                    {cat}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-14 px-6 rounded-2xl border-white/10 bg-black/40 hover:bg-white/5 text-white font-headline font-bold uppercase tracking-widest text-[10px] flex gap-3 shadow-lg min-w-[160px] flex-1">
                  <Star className="w-4 h-4 text-primary" />
                  <span>Impact: {activeImpact}</span>
                  <ChevronDown className="w-4 h-4 opacity-50 ml-auto" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 bg-card border-border rounded-xl p-1 z-[100]">
                {impacts.map((imp) => (
                  <DropdownMenuItem 
                    key={imp}
                    onClick={() => setActiveImpact(imp)}
                    className={`cursor-pointer font-headline font-bold uppercase tracking-widest text-[10px] px-4 py-3 rounded-lg transition-colors ${
                      activeImpact === imp ? 'bg-primary text-white' : 'hover:bg-white/5 text-white/70'
                    }`}
                  >
                    {imp}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="mb-8 text-sm text-white/40 font-bold uppercase tracking-widest px-2">
          Showing {filteredRepos.length} Projects
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRepos.length > 0 ? (
            filteredRepos.map((repo, i) => (
              <Card key={i} className="bg-card/40 border-white/5 hover:border-primary/30 transition-all duration-500 rounded-[2rem] overflow-hidden group min-w-0 flex flex-col h-full shadow-2xl relative">
                <CardHeader className="p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Code2 className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary" className="bg-white/5 text-[10px] uppercase tracking-tighter text-white/40">
                      {repo.type}
                    </Badge>
                  </div>
                  
                  {/* Impact Badge */}
                  <div className="mb-4">
                     <Badge className="bg-primary/20 text-primary border-primary/30 text-[9px] font-black uppercase tracking-[0.1em] px-2 py-0.5 rounded-lg">
                        {repo.impact}
                     </Badge>
                  </div>

                  {/* Title Wrapper */}
                  <div className="min-h-[5rem] flex items-start mb-4">
                    <CardTitle className="text-xl md:text-2xl font-headline font-bold text-white group-hover:text-primary transition-colors break-words leading-tight">
                      {repo.name}
                    </CardTitle>
                  </div>

                  {/* Skill Tag Wrapper */}
                  <div className="min-h-[2.5rem] flex items-center mb-6">
                    <Badge className="bg-white/5 text-white/60 text-[10px] font-bold border-none px-3 py-1">
                      {repo.tech}
                    </Badge>
                  </div>

                  {/* Description Wrapper */}
                  <div className="min-h-[5rem]">
                    <CardDescription className="text-sm text-white/50 leading-relaxed font-medium line-clamp-3">
                      {repo.desc}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-8 pt-0 mt-auto">
                  <Button variant="outline" className="w-full rounded-xl border-white/10 hover:bg-white/5 text-xs font-bold uppercase tracking-widest h-12 transition-all" asChild>
                    <a href={repo.link} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" /> View Source <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-50" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full py-32 text-center space-y-4">
              <div className="text-white/20 font-headline font-black text-6xl">404</div>
              <p className="text-white/50 font-medium">No projects found matching your criteria.</p>
              <Button variant="link" onClick={() => { setSearch(""); setActiveCategory("All"); setActiveImpact("All"); }} className="text-primary font-bold uppercase tracking-widest text-xs">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
