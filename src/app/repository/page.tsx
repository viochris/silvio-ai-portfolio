"use client"

import React from 'react';
import { Github, Star, GitFork, ExternalLink, Code2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const repos = [
  {
    name: "ai-sentiment-roberta",
    stars: 24,
    forks: 8,
    lang: "Python",
    desc: "Production-grade sentiment analysis pipeline using RoBERTa models.",
    link: "https://github.com"
  },
  {
    name: "stuntify-prediction-api",
    stars: 15,
    forks: 4,
    lang: "FastAPI",
    desc: "ML model deployment for child stunting risk assessment.",
    link: "https://github.com"
  },
  {
    name: "multimodal-recipe-vision",
    stars: 32,
    forks: 12,
    lang: "Python",
    desc: "Ingredient identification system using Gemini Vision API.",
    link: "https://github.com"
  },
  {
    name: "langchain-girlfriend-core",
    stars: 45,
    forks: 18,
    lang: "Python",
    desc: "Emotional intelligence framework for conversational AI companions.",
    link: "https://github.com"
  },
  {
    name: "tabular-data-pipeline",
    stars: 12,
    forks: 3,
    lang: "SQL",
    desc: "Highly efficient ETL pipelines for processing tabular research data.",
    link: "https://github.com"
  },
  {
    name: "fastapi-ml-boilerplate",
    stars: 28,
    forks: 10,
    lang: "Python",
    desc: "Standardized boilerplate for deploying Scikit-Learn models.",
    link: "https://github.com"
  }
];

export default function RepositoryPage() {
  return (
    <div className="pt-32 lg:pt-40 pb-24 px-6 md:px-12 lg:px-16 min-h-screen">
      <section id="repository" className="max-w-7xl mx-auto">
        <div className="space-y-8 mb-20 text-center lg:text-left">
          <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase px-4">Github</Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black uppercase tracking-tighter text-white">
            Code <span className="text-primary">Repository</span>
          </h2>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl font-medium mx-auto lg:mx-0">
            A technical collection of my open-source contributions, research implementations, and production-ready AI tools.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {repos.map((repo, i) => (
            <Card key={i} className="bg-card/40 border-white/5 hover:border-primary/30 transition-all duration-500 rounded-[2rem] overflow-hidden group">
              <CardHeader className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <div className="flex gap-4 text-xs font-bold text-white/40">
                    <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5" /> {repo.stars}</span>
                    <span className="flex items-center gap-1.5"><GitFork className="w-3.5 h-3.5" /> {repo.forks}</span>
                  </div>
                </div>
                <CardTitle className="text-xl md:text-2xl font-headline font-bold text-white group-hover:text-primary transition-colors">
                  {repo.name}
                </CardTitle>
                <div className="mt-4">
                  <Badge variant="secondary" className="bg-white/5 text-[10px] uppercase tracking-tighter text-white/60">
                    {repo.lang}
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
          ))}
        </div>
      </section>
    </div>
  );
}
