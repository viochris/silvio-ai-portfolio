
"use client"

import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
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
    <div className="pt-24 lg:pt-32 min-h-screen">
      <section id="home" className="pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          
          {/* Row 1: Hero Content (Profile, Name, Description, Buttons) */}
          <div className="w-full space-y-12 flex flex-col items-center text-center">
            
            {/* Profile & Main Text Container */}
            <div className="flex flex-col items-center gap-8 lg:gap-10 max-w-4xl">
              
              {/* Profile Image */}
              <div className="relative group shrink-0">
                <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full animate-pulse-glow" />
                <div className="relative z-10 w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary animate-[spin_25s_linear_infinite]" />
                  <div className="absolute inset-4 rounded-full p-2 bg-black shadow-2xl overflow-hidden border border-primary/10">
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

              {/* Text Content */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <Badge variant="outline" className="text-primary font-headline uppercase tracking-[0.3em] py-1 border-primary/30">
                      Data Scientist & AI Engineer
                    </Badge>
                  </div>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-black leading-tight tracking-tighter text-white">
                    Silvio Christian <span className="text-primary">Joe</span>
                  </h1>
                </div>
                
                <div className="text-lg md:text-xl lg:text-2xl font-headline text-white flex items-center justify-center gap-3 min-h-[40px]">
                  <span className="hidden sm:inline">I </span>
                  <TypewriterEffect />
                </div>
                
                <p className="text-base md:text-lg text-white/80 leading-relaxed font-medium max-w-2xl mx-auto">
                  Specializing in NLP and Tabular Data processing, I build and deploy production-grade AI systems that bridge the gap between complex research and scalable user applications.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 w-full">
              <Button size="lg" className="rounded-full px-8 lg:px-10 font-headline uppercase font-bold tracking-widest h-14 w-full sm:w-auto" asChild>
                <Link href="/projects">
                  View Projects <ChevronRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 lg:px-10 font-headline uppercase font-bold tracking-widest h-14 border-white/20 text-white hover:bg-white/10 w-full sm:w-auto" asChild>
                <Link href="/contact">Contact Me</Link>
              </Button>
            </div>

            {/* Stats Block */}
            <div className="grid grid-cols-3 gap-8 md:gap-16 py-10 border-t border-b border-white/10 w-full max-w-3xl">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-headline font-black text-primary">15+</div>
                <div className="text-[9px] md:text-[10px] uppercase font-bold text-white/50 tracking-widest mt-1">Projects</div>
              </div>
              <div className="text-center border-x border-white/10">
                <div className="text-3xl md:text-4xl font-headline font-black text-primary">4+</div>
                <div className="text-[9px] md:text-[10px] uppercase font-bold text-white/50 tracking-widest mt-1">Awards</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-headline font-black text-primary">99%</div>
                <div className="text-[9px] md:text-[10px] uppercase font-bold text-white/50 tracking-widest mt-1">Precision</div>
              </div>
            </div>
          </div>

          {/* Row 2: Code Section (Placed Below) */}
          <div className="w-full max-w-4xl mt-16 lg:mt-24">
            <div className="relative">
              <div className="absolute -inset-10 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
              <CodeWindow />
            </div>
          </div>

        </div>
      </section>

      <TechMarquee />
    </div>
  );
}
