"use client"

import React, { useState, useEffect } from 'react';
import { Terminal, ChevronRight } from 'lucide-react';
import { TypewriterEffect } from '@/components/TypewriterEffect';
import { TechMarquee } from '@/components/TechMarquee';
import { CodeWindow } from '@/components/CodeWindow';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="pt-32 min-h-screen">
      <section id="home" className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left Content: Text and Profile First */}
            <div className="flex-1 space-y-8 order-1">
              <div className="flex flex-col md:flex-row md:items-center gap-10">
                {/* Profile Image */}
                <div className="relative group shrink-0">
                  <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full animate-pulse-glow" />
                  <div className="relative z-10 w-48 h-48 md:w-64 md:h-64">
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary animate-[spin_25s_linear_infinite]" />
                    <div className="absolute inset-4 rounded-full p-2 bg-background shadow-2xl overflow-hidden border border-primary/10">
                      <img 
                        src="/vio-image.png" 
                        alt="Silvio Christian Joe" 
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    {/* AI ENGINEER Badge Tag */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20">
                      <Badge className="bg-primary text-primary-foreground px-6 py-1.5 shadow-2xl font-headline font-black text-[10px] tracking-[0.2em] uppercase border-none whitespace-nowrap">
                        AI Engineer
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Main Text Content */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-primary font-headline uppercase tracking-[0.3em] py-1 border-primary/30">
                      Data Scientist & AI Engineer
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-headline font-black leading-tight tracking-tighter text-foreground">
                      Silvio Christian <span className="text-primary">Joe</span>
                    </h1>
                  </div>
                  
                  <div className="text-xl md:text-2xl font-headline text-foreground flex items-center gap-3">
                    <span>I </span>
                    <TypewriterEffect />
                  </div>
                  
                  <p className="text-lg text-muted-foreground max-w-xl leading-relaxed font-bold">
                    Specializing in NLP and Tabular Data processing, I build and deploy production-grade AI systems that bridge the gap between complex research and scalable user applications.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="rounded-full px-10 font-headline uppercase font-bold tracking-widest h-14" asChild>
                  <Link href="/projects">
                    View Projects <ChevronRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-10 font-headline uppercase font-bold tracking-widest h-14" asChild>
                  <Link href="/contact">Contact Me</Link>
                </Button>
              </div>

              {/* Stats Block */}
              <div className="grid grid-cols-3 gap-8 pt-10 border-t border-border/50">
                <div>
                  <div className="text-4xl font-headline font-black text-primary">15+</div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-1">Projects</div>
                </div>
                <div>
                  <div className="text-4xl font-headline font-black text-primary">4+</div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-1">Awards</div>
                </div>
                <div>
                  <div className="text-4xl font-headline font-black text-primary">99%</div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-1">Precision</div>
                </div>
              </div>
            </div>

            {/* Right Content: Code Window Second */}
            <div className="flex-1 w-full order-2">
              <div className="relative">
                <div className="absolute -inset-10 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
                <CodeWindow />
              </div>
            </div>
          </div>
        </div>
      </section>

      <TechMarquee />
    </div>
  );
}