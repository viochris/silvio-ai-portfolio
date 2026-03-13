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
        <div className="max-w-7xl mx-auto">
          
          {/* Row 1: Hero Content (2 Columns on Desktop) */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-16 lg:mb-24">
            
            {/* Left Column: Profile Image */}
            <div className="flex justify-center lg:justify-center">
              <div className="relative group shrink-0">
                <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full animate-pulse-glow" />
                <div className="relative z-10 w-56 h-56 md:w-64 md:h-64 lg:w-80 lg:h-80">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary animate-[spin_30s_linear_infinite]" />
                  <div className="absolute inset-4 rounded-full p-2 bg-black shadow-2xl overflow-hidden border border-primary/20">
                    <img 
                      src="/vio-image.png" 
                      alt="Silvio Christian Joe" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  {/* AI ENGINEER Badge Tag */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20">
                    <Badge className="bg-primary text-white px-8 py-2 shadow-2xl font-headline font-black text-[10px] md:text-xs tracking-[0.2em] uppercase border-none whitespace-nowrap rounded-full">
                      AI Engineer
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Text Content, Buttons, & Stats */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-10">
              <div className="space-y-6">
                <div className="space-y-4">
                  <Badge variant="outline" className="text-primary font-headline uppercase tracking-[0.3em] py-1.5 border-primary/30 text-[10px] md:text-xs">
                    Data Scientist & AI Engineer
                  </Badge>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-black leading-tight tracking-tighter text-white">
                    Silvio Christian <span className="text-primary">Joe</span>
                  </h1>
                </div>
                
                <div className="text-xl md:text-2xl lg:text-3xl font-headline text-white flex items-center gap-3 min-h-[40px] justify-center lg:justify-start">
                  <span className="hidden sm:inline">I </span>
                  <TypewriterEffect />
                </div>
                
                <p className="text-base md:text-lg text-white/80 leading-relaxed font-medium max-w-2xl">
                  Specializing in NLP and Tabular Data processing, I build and deploy production-grade AI systems that bridge the gap between complex research and scalable user applications.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 w-full">
                <Button size="lg" className="rounded-full px-10 font-headline uppercase font-bold tracking-widest h-14 w-full sm:w-auto shadow-lg shadow-primary/20" asChild>
                  <Link href="/projects">
                    View Projects <ChevronRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-10 font-headline uppercase font-bold tracking-widest h-14 border-white/20 text-white hover:bg-white/10 w-full sm:w-auto" asChild>
                  <Link href="/contact">Contact Me</Link>
                </Button>
              </div>

              {/* Stats Block */}
              <div className="grid grid-cols-3 gap-8 md:gap-12 py-10 border-t border-b border-white/10 w-full max-w-xl">
                <div className="text-center lg:text-left">
                  <div className="text-2xl md:text-4xl font-headline font-black text-primary">15+</div>
                  <div className="text-[10px] md:text-xs uppercase font-bold text-white/50 tracking-widest mt-2">Projects</div>
                </div>
                <div className="text-center border-x border-white/10">
                  <div className="text-2xl md:text-4xl font-headline font-black text-primary">4+</div>
                  <div className="text-[10px] md:text-xs uppercase font-bold text-white/50 tracking-widest mt-2">Awards</div>
                </div>
                <div className="text-center lg:text-right">
                  <div className="text-2xl md:text-4xl font-headline font-black text-primary">99%</div>
                  <div className="text-[10px] md:text-xs uppercase font-bold text-white/50 tracking-widest mt-2">Precision</div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Code Section (Placed Below) */}
          <div className="w-full max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute -inset-10 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
              <div className="relative z-10 scale-95 md:scale-100 transition-transform duration-500">
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