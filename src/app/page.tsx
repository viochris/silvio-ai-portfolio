
"use client"

import React from 'react';
import { Download } from 'lucide-react';
import { TypewriterEffect } from '@/components/TypewriterEffect';
import { TechMarquee } from '@/components/TechMarquee';
import { CodeWindow } from '@/components/CodeWindow';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="pt-32">
      <section id="home" className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8 order-1">
              <div className="space-y-2">
                <Badge variant="outline" className="text-primary font-headline uppercase tracking-[0.3em] py-1 border-primary/30">
                  Data Scientist & AI Engineer
                </Badge>
                <div className="flex flex-col md:flex-row md:items-center gap-8">
                  <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-headline font-black leading-tight tracking-tighter">
                      Silvio Christian <span className="text-primary">Joe</span>
                    </h1>
                    <div className="text-2xl md:text-3xl font-headline text-muted-foreground flex items-center gap-3">
                      <span>I </span>
                      <TypewriterEffect />
                    </div>
                    <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                      Specializing in NLP and Tabular Data processing, I build and deploy production-grade AI systems that bridge the gap between complex research and scalable user applications.
                    </p>
                  </div>
                  
                  <div className="relative group shrink-0">
                    <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full animate-pulse-glow" />
                    <div className="relative z-10 w-48 h-48 md:w-56 md:h-56">
                      <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary animate-[spin_20s_linear_infinite]" />
                      <div className="absolute inset-3 rounded-full border border-primary/20" />
                      <div className="absolute inset-[8px] rounded-full p-1.5 bg-background shadow-2xl">
                        <img 
                          src="/vio-image.png" 
                          alt="Silvio Christian Joe" 
                          className="w-full h-full object-cover rounded-full border-4 border-primary/10"
                        />
                      </div>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20">
                        <Badge className="bg-primary text-white border-none px-4 py-1 shadow-xl font-headline font-bold text-[10px] tracking-widest uppercase whitespace-nowrap">
                          AI Engineer
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="rounded-full px-8 font-headline uppercase font-bold tracking-widest" asChild>
                  <Link href="/projects">View Projects</Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8 font-headline uppercase font-bold tracking-widest" asChild>
                  <Link href="/contact">Chat with AI</Link>
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
                <div>
                  <div className="text-3xl font-headline font-black text-primary">15+</div>
                  <div className="text-xs uppercase font-bold opacity-60 tracking-widest">Projects</div>
                </div>
                <div>
                  <div className="text-3xl font-headline font-black text-primary">4+</div>
                  <div className="text-xs uppercase font-bold opacity-60 tracking-widest">Awards</div>
                </div>
                <div>
                  <div className="text-3xl font-headline font-black text-primary">99%</div>
                  <div className="text-xs uppercase font-bold opacity-60 tracking-widest">Precision</div>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full order-2">
              <CodeWindow />
            </div>
          </div>
        </div>
      </section>

      <TechMarquee />
    </div>
  );
}
