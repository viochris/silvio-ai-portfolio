
"use client"

import React, { useState, useMemo } from 'react';
import { Github, ExternalLink, Code2, Search, Filter, ChevronDown } from 'lucide-react';
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

type Category = "All" | "GenAI" | "Backend" | "Automation" | "Data Science" | "Analytics" | "Fun";

const repos = [
  // GenAI & Interactive
  { name: "InsightSQL (LangGraph Engine)", type: "GenAI", tech: "LangGraph, Gemini", desc: "SQL Agents using Graph Architecture with Cyclic Reasoning and error self-correction.", link: "https://github.com/viochris/InsightSQL-LangGraph-Engine-Web" },
  { name: "InsightData (AI Analyst)", type: "GenAI", tech: "Pandas Agent, Gemini", desc: "Automated Data Scientist that analyzes CSVs/Excel and auto-generates visualizations.", link: "https://github.com/viochris/insight-data-ai-analyst" },
  { name: "InsightSQL (ReAct Engine)", type: "GenAI", tech: "LangChain, Gemini", desc: "Advanced DBA using ReAct Architecture for transparent and self-correcting data reasoning.", link: "https://github.com/viochris/InsightSQL-ReAct-Engine" },
  { name: "InsightSQL (Simple)", type: "GenAI", tech: "LangChain, SQL Agent", desc: "Streamlined Text-to-SQL assistant using standard SQL agent mapping.", link: "https://github.com/viochris/InsightSQL-Simple" },
  { name: "Chat with Vio (Portfolio AI)", type: "GenAI", tech: "Streamlit, LangChain", desc: "Personalized RAG assistant that chats with professional profile data.", link: "https://github.com/viochris/personal-ai-assistant" },
  { name: "DocuTalk-AI (Smart RAG)", type: "GenAI", tech: "LangChain, FAISS", desc: "Intelligent document assistant using ReAct Agents to decide between docs or web search.", link: "https://github.com/viochris/DocuTalk-AI" },
  { name: "DocuFlow-AI (Fast RAG)", type: "GenAI", tech: "LangChain, FAISS", desc: "High-performance RAG using ConversationalRetrievalChain for instant analysis.", link: "https://github.com/viochris/DocuFlow-AI" },
  { name: "DocuChat AI (Long Context)", type: "GenAI", tech: "Gemini 2.5 Flash", desc: "Analyzing entire PDFs without chunking using massive context windows.", link: "https://github.com/viochris/Gemini-Long-Context-Chat" },
  { name: "AI Recipe Generator", type: "GenAI", tech: "LangChain, Vision", desc: "Cooking assistant detecting ingredients from photos to generate recipes.", link: "https://github.com/viochris/ai-recipe-generator" },
  
  // Backend & MLOps
  { name: "Resume Scanner API", type: "Backend", tech: "FastAPI, SBERT", desc: "Dual-Engine ATS API using TF-IDF and SBERT for resume-job description matching.", link: "https://github.com/viochris/resume-scanner-api" },
  { name: "Portfolio API (Backend)", type: "Backend", tech: "FastAPI, Docker", desc: "Headless RAG engine serving portfolio data with structured JSON responses.", link: "https://github.com/viochris/silvio-portfolio-api" },
  { name: "Stuntify API (MLOps)", type: "Backend", tech: "FastAPI, Scikit-Learn", desc: "Robust inference system for real-time stunting risk prediction.", link: "https://github.com/viochris/Stuntify-API" },
  { name: "Insightify API (NLP)", type: "Backend", tech: "FastAPI, RoBERTa", desc: "Dual-lingual sentiment analytics for English & Indonesian text.", link: "https://github.com/viochris/Insightify-Sentiment-API" },
  { name: "Stunting Prediction API (Flask)", type: "Backend", tech: "Flask, Python", desc: "RESTful API for real-time stunting prediction inference.", link: "https://github.com/viochris/API-Stuntify" },

  // Automation & Orchestration (LENGKAP)
  { name: "NovaCal AI (Stateful Telegram)", type: "Automation", tech: "LangChain, SQL", desc: "Advanced Telegram bot with SQL-backed conversational memory for multi-turn calendar management.", link: "https://github.com/viochris/telegram-calendar-ai-bot.git" },
  { name: "NovaCal AI (Ephemeral Telegram)", type: "Automation", tech: "LangChain, RAM", desc: "Slot-filling calendar assistant using RAM-based memory to save tokens and prevent hallucinations.", link: "https://github.com/viochris/NovaCal-Ephemeral-AI.git" },
  { name: "NovaCal AI (Stateless Telegram)", type: "Automation", tech: "LangChain, PTB", desc: "Fast, stateless Telegram bot for quick single-turn calendar tasks with maximum token efficiency.", link: "https://github.com/viochris/NovaCal-AI-Telegram.git" },
  { name: "NovaCal AI (Streamlit Edition)", type: "Automation", tech: "Streamlit, LangChain", desc: "Web-based visual interface for intelligent calendar management with dynamic UI and session buffer memory.", link: "https://github.com/viochris/NovaCal-AI-Streamlit.git" },
  { name: "NovaTasks AI (Ephemeral Telegram)", type: "Automation", tech: "LangChain, RAM", desc: "Conversational Telegram bot for Google Tasks management using ephemeral RAM-based memory.", link: "https://github.com/viochris/NovaTasks-AI-Telegram.git" },
  { name: "NovaMail AI (Gmail Autoresponder)", type: "Automation", tech: "Gmail API, Gemini", desc: "Autonomous inbox assistant that reads emails and sends professional AI-generated replies.", link: "https://github.com/viochris/NovaMail-AI-Autoresponder.git" },
  { name: "Daily Agenda Broadcaster", type: "Automation", tech: "Python, GCalendar", desc: "Automated workflow that fetches upcoming events and dispatches clean briefings to Telegram.", link: "https://github.com/viochris/auto-daily-scheduler.git" },
  { name: "AI Vision Generator", type: "Automation", tech: "PTB, Hugging Face", desc: "Text-to-Image Telegram bot using SDXL to render high-quality images from user prompts.", link: "https://github.com/viochris/telegram-image-generator.git" },
  { name: "Conversational AI Interface", type: "Automation", tech: "PTB, Gemini", desc: "Interactive bridge between Telegram and Google Gemini model for intelligent chat responses.", link: "https://github.com/viochris/qna-telegram-bot-ptb.git" },
  { name: "Daily AI News Digest", type: "Automation", tech: "Prefect, Gemini", desc: "Autonomous pipeline that scrapes real-time news and delivers daily digests to Telegram.", link: "https://github.com/viochris/daily-ai-news-digest" },
  { name: "Automated Image Pipeline", type: "Automation", tech: "Prefect, HF", desc: "ETL pipeline that generates AI art from GSheets prompts and publishes to Telegram.", link: "https://github.com/viochris/automated-image-pipeline" },
  { name: "Daily Prompt Generator", type: "Automation", tech: "Prefect, Gemini", desc: "Producer bot that crafts daily prompts and logs them to GSheets for the image pipeline.", link: "https://github.com/viochris/daily-prompt-generator-bot" },
  { name: "Batch Prompt Generator", type: "Automation", tech: "Prefect, Gemini", desc: "Bulk producer bot crafting 3 prompts per run for fast queue filling in GSheets.", link: "https://github.com/viochris/daily-batch-prompt-bot" },
  { name: "Daily Quote Automator", type: "Automation", tech: "Prefect, Gemini", desc: "Simple HTTP bot that synthesizes daily developer motivation via direct requests.", link: "https://github.com/viochris/trial-simple-quote-bot" },
  { name: "Daily Quote Bot (PTB)", type: "Automation", tech: "Prefect, PTB", desc: "Official library implementation for the Daily Quote bot using python-telegram-bot.", link: "https://github.com/viochris/daily-quote-bot-ptb" },
  
  // Data Science (LENGKAP)
  { name: "SpendSense (Financial AI)", type: "Data Science", tech: "Streamlit, Vision", desc: "Conversational finance app with OCR receipt scanning and natural language expense queries.", link: "https://github.com/viochris/Streamlit-SpendSense" },
  { name: "Streamlit Resume Scanner", type: "Data Science", tech: "SBERT, NLP", desc: "Dual-Engine CV analyzer for ATS logic and semantic fit calculation with Streamlit UI.", link: "https://github.com/viochris/streamlit-resume-scanner" },
  { name: "Diabetes Prediction (Robust)", type: "Data Science", tech: "Scikit-Learn, SMOTE", desc: "ML model with proper pre-processing after split to avoid data leakage and handle imbalance.", link: "https://github.com/viochris/Diabetes-prediction-fine-tuned-project" },
  { name: "Stunting Analysis", type: "Data Science", tech: "SMOTENC, Viz", desc: "Handling categorical imbalance and visualizing decision paths for model interpretability.", link: "https://github.com/viochris/Stunting-prediction-project" },
  { name: "Review Sentiment Analyzer", type: "Data Science", tech: "Transformers", desc: "NLP model classifying text sentiment using Hugging Face pre-trained transformers.", link: "https://github.com/viochris/Simple-Sentiment-Analysis" },
  { name: "Diabetes Paper Replication", type: "Data Science", tech: "Python, Pandas", desc: "Academic study replicating research methodology for comparative analysis and validation.", link: "https://github.com/viochris/Diabetes-prediction-project" },
  
  // Analytics
  { name: "Supermarket Sales Dashboard", type: "Analytics", tech: "Tableau Public", desc: "Operations dashboard monitoring COGS and customer ratings in retail.", link: "https://public.tableau.com/views/SupermarketSalesDashboard_17081427139270/Dashboard1" },
  { name: "Bike Sales Executive", type: "Analytics", tech: "Tableau Public", desc: "Executive view of revenue and sales performance by US states.", link: "https://public.tableau.com/views/BikeSalesDashboard_17081369078430/Dashboard1" },
  
  // Fun
  { name: "Conversational Persona", type: "Fun", tech: "Streamlit, Gemini", desc: "Roleplay chatbot with persistent memory and dynamic adaptation.", link: "https://github.com/viochris/Simple-AI-Girlfriend" },
  { name: "Real-time Chat Socket", type: "Fun", tech: "Python Socket", desc: "Casual project exploring networking and socket programming principles.", link: "https://github.com/viochris/chat-group.git" }
];

const categories: Category[] = ["All", "GenAI", "Backend", "Automation", "Data Science", "Analytics", "Fun"];

export default function RepositoryPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredRepos = useMemo(() => {
    return repos.filter(repo => {
      const matchesSearch = repo.name.toLowerCase().includes(search.toLowerCase()) || 
                            repo.desc.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === "All" || repo.type === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <div className="pt-32 lg:pt-40 pb-24 px-6 md:px-12 lg:px-16 min-h-screen">
      <section id="repository" className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="space-y-8 mb-16 text-center lg:text-left">
          <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase px-4">Github</Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black uppercase tracking-tighter text-white">
            Explore <span className="text-primary">Repository</span>
          </h2>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl font-medium mx-auto lg:mx-0">
            A comprehensive list of my AI projects, ranging from robust predictive modeling to autonomous agents and MLOps.
          </p>
        </div>

        {/* Search & Filter Controls - Horizontal Layout */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16 bg-white/5 p-4 rounded-3xl border border-white/10 shadow-xl items-stretch">
          <div className="relative flex-1">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <Input 
              placeholder="Search projects..." 
              className="pl-14 h-14 bg-black/40 border-white/10 rounded-2xl focus:ring-primary text-white placeholder:text-white/30"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-14 px-6 rounded-2xl border-white/10 bg-black/40 hover:bg-white/5 text-white font-headline font-bold uppercase tracking-widest text-[10px] flex gap-3 shadow-lg min-w-[160px]">
                <Filter className="w-4 h-4 text-primary" />
                <span>{activeCategory}</span>
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
        </div>

        {/* Results Info */}
        <div className="mb-8 text-sm text-white/40 font-bold uppercase tracking-widest px-2">
          Showing {filteredRepos.length} Projects
        </div>

        {/* Repository Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRepos.length > 0 ? (
            filteredRepos.map((repo, i) => (
              <Card key={i} className="bg-card/40 border-white/5 hover:border-primary/30 transition-all duration-500 rounded-[2rem] overflow-hidden group min-w-0 flex flex-col h-full shadow-2xl">
                <CardHeader className="p-8 flex-1">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Code2 className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary" className="bg-white/5 text-[10px] uppercase tracking-tighter text-white/40">
                      {repo.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl md:text-2xl font-headline font-bold text-white group-hover:text-primary transition-colors break-words">
                    {repo.name}
                  </CardTitle>
                  <div className="mt-4">
                    <Badge className="bg-primary/10 text-primary text-[10px] font-bold border-none">
                      {repo.tech}
                    </Badge>
                  </div>
                  <CardDescription className="mt-6 text-sm text-white/50 leading-relaxed font-medium">
                    {repo.desc}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
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
              <Button variant="link" onClick={() => { setSearch(""); setActiveCategory("All"); }} className="text-primary font-bold uppercase tracking-widest text-xs">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
