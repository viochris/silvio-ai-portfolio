"use client"

import React, { useState, useEffect } from 'react';
import { ChevronRight, Brain, Database, Sparkles } from 'lucide-react';
import { TypewriterEffect } from '@/components/TypewriterEffect';
import { TechMarquee } from '@/components/TechMarquee';
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
    <div className="pt-32 lg:pt-40 min-h-screen">
      <section id="home" className="pb-20 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          
          {/* Row 1: Hero Content (Photo & Intro) */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
            
            {/* Left Column: Profile Image */}
            <div className="flex justify-center">
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
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20">
                    <Badge className="bg-primary text-white px-8 py-2 shadow-2xl font-headline font-black text-[10px] md:text-xs tracking-[0.2em] uppercase border-none whitespace-nowrap rounded-full">
                      AI Engineer
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Text Content & Buttons */}
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
            </div>
          </div>

          {/* Row 2: Stats Block - Full Width under Photo & Intro */}
          <div className="w-full mb-32">
            <div className="grid grid-cols-3 gap-8 md:gap-12 py-16 border-t border-b border-white/10 w-full max-w-5xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-5xl font-headline font-black text-primary">15+</div>
                <div className="text-[10px] md:text-xs uppercase font-bold text-white/50 tracking-[0.3em] mt-4">Projects Completed</div>
              </div>
              <div className="text-center border-x border-white/10">
                <div className="text-3xl md:text-5xl font-headline font-black text-primary">4+</div>
                <div className="text-[10px] md:text-xs uppercase font-bold text-white/50 tracking-[0.3em] mt-4">Awards & Honors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-5xl font-headline font-black text-primary">99%</div>
                <div className="text-[10px] md:text-xs uppercase font-bold text-white/50 tracking-[0.3em] mt-4">Model Precision</div>
              </div>
            </div>
          </div>

          {/* Row 3: Core Expertise (Replacing CodeWindow) */}
          <div className="space-y-16 pb-12">
            <div className="text-center space-y-4">
              <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase py-1">Expertise</Badge>
              <h2 className="text-3xl md:text-5xl font-headline font-black uppercase tracking-tighter text-white">
                Core <span className="text-primary">Focus</span>
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  title: "Natural Language Processing",
                  desc: "Advanced text analysis, sentiment extraction, and language modeling using state-of-the-art architectures.",
                  icon: <Brain className="w-8 h-8 text-primary" />,
                  label: "NLP"
                },
                {
                  title: "Data Engineering",
                  desc: "Building scalable pipelines for tabular data processing, feature engineering, and high-performance APIs.",
                  icon: <Database className="w-8 h-8 text-primary" />,
                  label: "DATA"
                },
                {
                  title: "Generative AI Systems",
                  desc: "Designing intelligent agents and LLM-powered applications focused on user experience and efficiency.",
                  icon: <Sparkles className="w-8 h-8 text-primary" />,
                  label: "GenAI"
                }
              ].map((skill, idx) => (
                <div key={idx} className="p-10 glass rounded-[2.5rem] border-white/5 hover:border-primary/30 transition-all duration-500 group">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    {skill.icon}
                  </div>
                  <Badge className="bg-primary/10 text-primary border-none mb-6 uppercase text-[10px] font-bold tracking-widest">{skill.label}</Badge>
                  <h3 className="text-xl md:text-2xl font-headline font-bold text-white mb-4">{skill.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed font-medium">{skill.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <TechMarquee />
    </div>
  );
}