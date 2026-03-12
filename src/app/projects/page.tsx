
"use client"

import React from 'react';
import { ExternalLink, ChevronRight, Brain, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

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
    <div className="pt-32 pb-24 px-4">
      <section id="projects" className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-2">
            <h2 className="text-4xl font-headline font-black uppercase tracking-tighter">
              Featured <span className="text-primary">Projects</span>
            </h2>
            <p className="text-muted-foreground text-lg">Deployments that solve specific user problems.</p>
          </div>
          <Button variant="link" className="font-headline font-bold uppercase tracking-widest gap-2">
            Browse Github <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((p) => (
            <Card key={p.id} className="group overflow-hidden border-border bg-card/50 hover:bg-card transition-all duration-300 hover:shadow-2xl">
              <div className="relative h-64 overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="flex gap-4">
                    <Button size="sm" variant="secondary" className="font-bold text-xs" asChild>
                      <a href={p.link} target="_blank" rel="noopener noreferrer"><ExternalLink className="w-3 h-3 mr-2" /> Live Demo</a>
                    </Button>
                  </div>
                </div>
              </div>
              <CardHeader>
                <div className="flex gap-2 mb-3">
                  {p.tech.slice(0, 3).map(t => (
                    <Badge key={t} variant="secondary" className="text-[10px] uppercase font-bold tracking-tighter">{t}</Badge>
                  ))}
                </div>
                <CardTitle className="text-2xl font-headline font-bold group-hover:text-primary transition-colors">{p.title}</CardTitle>
                <CardDescription className="text-sm line-clamp-2">{p.desc}</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="font-headline font-bold uppercase tracking-widest text-xs">
                      Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-3xl font-headline font-bold mb-4">{p.title}</DialogTitle>
                    </DialogHeader>
                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-6">
                        <img src={p.image} alt={p.title} className="w-full rounded-xl shadow-lg" />
                        <div className="flex flex-wrap gap-2">
                          {p.tech.map(t => <Badge key={t} variant="secondary">{t}</Badge>)}
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-sm font-bold uppercase text-primary mb-2 flex items-center gap-2">
                            <Brain className="w-4 h-4" /> The Problem
                          </h4>
                          <p className="text-muted-foreground">{p.problem}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold uppercase text-primary mb-2 flex items-center gap-2">
                            <Sparkles className="w-4 h-4" /> The Solution
                          </h4>
                          <p className="text-muted-foreground">{p.solution}</p>
                        </div>
                        <Separator />
                        <Button className="w-full font-headline font-bold" asChild>
                          <a href={p.link} target="_blank" rel="noopener noreferrer">Visit Repository <ExternalLink className="ml-2 w-4 h-4" /></a>
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
