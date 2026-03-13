"use client"

import React from 'react';
import { ExternalLink, ChevronRight, Brain, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

const projects = [
  { 
    id: 1, 
    title: "Conversational AI Companion", 
    desc: "A personalized AI girlfriend built using LangChain and OpenAI for emotional support and conversation.",
    tech: ["LangChain", "OpenAI", "Python", "Streamlit"],
    link: "https://simple-ai-girlfriend-95ej5tnshixobcpdgwx2pn.streamlit.app/",
    problem: "Loneliness and lack of accessible conversational partners for emotional practice.",
    solution: "A fine-tuned LLM with memory capabilities and a friendly persona to provide empathetic interaction.",
    image: "https://picsum.photos/seed/ai-gf/600/400"
  },
  { 
    id: 2, 
    title: "Stuntify API & Prediction", 
    desc: "Health monitoring API predicting child stunting risks using environmental and nutritional data.",
    tech: ["FastAPI", "Scikit-Learn", "Docker", "Pandas"],
    link: "#",
    problem: "Difficult early detection of growth stunting in children without expert consultation.",
    solution: "A random forest classification model deployed via FastAPI to provide instant risk assessments based on key metrics.",
    image: "https://picsum.photos/seed/health/600/400"
  },
  { 
    id: 3, 
    title: "Review Sentiment Analyzer API", 
    desc: "Production-ready sentiment analysis for marketplace reviews using RoBERTa.",
    tech: ["RoBERTa", "HuggingFace", "PyTorch", "Docker"],
    link: "https://silvio0-simple-sentiment-analyst.hf.space/docs",
    problem: "Manual analysis of thousands of customer reviews is inefficient for businesses.",
    solution: "An automated sentiment extraction tool using state-of-the-art NLP models to categorize feedback with high precision.",
    image: "https://picsum.photos/seed/sentiment/600/400"
  },
  { 
    id: 4, 
    title: "Chef AI: Culinary Assistant", 
    desc: "Vision-based recipe generator that identifies ingredients from photos.",
    tech: ["Gemini Vision", "Streamlit", "Python", "Pillow"],
    link: "https://ai-recipe-generator-6fajjxbnjpb2dcnqjvvvvy.streamlit.app/",
    problem: "Indecisiveness when looking at a fridge full of disparate ingredients.",
    solution: "A multimodal AI system that takes an image input, identifies items, and generates personalized recipes using Google's Gemini.",
    image: "https://picsum.photos/seed/chef/600/400"
  }
];

export default function ProjectsPage() {
  return (
    <div className="pt-32 lg:pt-40 pb-24 px-6 md:px-12 lg:px-16 min-h-screen">
      <section id="projects" className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <div className="space-y-6">
            <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase px-4">Portfolio</Badge>
            <h2 className="text-5xl lg:text-6xl font-headline font-black uppercase tracking-tighter text-foreground">
              Featured <span className="text-primary">Projects</span>
            </h2>
            <p className="text-muted-foreground text-lg lg:text-xl max-w-2xl font-medium">Production-grade AI solutions solving real-world challenges through data science and engineering.</p>
          </div>
          <Button variant="link" className="font-headline font-bold uppercase tracking-widest gap-2 text-primary h-auto p-0 hover:no-underline hover:text-primary/80 transition-all" asChild>
            <Link href="/repository">
              Explore Repository <ChevronRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {projects.map((p) => (
            <Card key={p.id} className="group overflow-hidden border-border bg-card/40 hover:bg-card/60 transition-all duration-500 hover:shadow-2xl hover:border-primary/20 rounded-[2.5rem]">
              <div className="relative h-80 overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10">
                  <Button size="lg" className="rounded-full font-bold shadow-xl px-10" asChild>
                    <a href={p.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                    </a>
                  </Button>
                </div>
              </div>
              <CardHeader className="p-10">
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tech.slice(0, 3).map(t => (
                    <Badge key={t} variant="secondary" className="text-[10px] uppercase font-bold tracking-tighter bg-primary/5 text-primary border-primary/10 px-3 py-1">{t}</Badge>
                  ))}
                </div>
                <CardTitle className="text-3xl lg:text-4xl font-headline font-bold text-foreground group-hover:text-primary transition-colors">{p.title}</CardTitle>
                <CardDescription className="text-lg text-muted-foreground mt-4 line-clamp-2 font-medium leading-relaxed">{p.desc}</CardDescription>
              </CardHeader>
              <CardContent className="px-10 pb-10 pt-0">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full rounded-2xl font-headline font-bold uppercase tracking-widest text-xs h-14 hover:bg-primary hover:text-primary-foreground transition-all">
                      Case Study Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] border-border bg-card p-10">
                    <DialogHeader>
                      <DialogTitle className="text-4xl font-headline font-bold mb-8 text-foreground">{p.title}</DialogTitle>
                    </DialogHeader>
                    <div className="grid md:grid-cols-2 gap-16">
                      <div className="space-y-10">
                        <img src={p.image} alt={p.title} className="w-full rounded-[2rem] shadow-2xl border border-border" />
                        <div className="flex flex-wrap gap-2">
                          {p.tech.map(t => <Badge key={t} variant="secondary" className="bg-muted text-foreground uppercase text-[10px] font-bold px-3 py-1">{t}</Badge>)}
                        </div>
                      </div>
                      <div className="space-y-10">
                        <div>
                          <h4 className="text-sm font-bold uppercase text-primary mb-4 flex items-center gap-3 tracking-[0.2em]">
                            <Brain className="w-4 h-4" /> The Problem
                          </h4>
                          <p className="text-foreground font-medium text-lg leading-relaxed">{p.problem}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold uppercase text-primary mb-4 flex items-center gap-3 tracking-[0.2em]">
                            <Sparkles className="w-4 h-4" /> The Solution
                          </h4>
                          <p className="text-foreground font-medium text-lg leading-relaxed">{p.solution}</p>
                        </div>
                        <Separator className="bg-border/50" />
                        <Button className="w-full rounded-[1.5rem] font-headline font-bold h-14 text-lg" asChild>
                          <a href={p.link} target="_blank" rel="noopener noreferrer">Visit Deployment <ExternalLink className="ml-2 w-5 h-5" /></a>
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
