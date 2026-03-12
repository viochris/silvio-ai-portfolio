"use client"

import React from 'react';
import { Github, Linkedin, Mail, Terminal, GraduationCap, Briefcase } from 'lucide-react';
import { Timeline } from '@/components/Timeline';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 px-4 min-h-screen">
      <section id="about" className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20">
          <div className="space-y-10">
            <div className="space-y-4">
              <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase">The Journey</Badge>
              <h2 className="text-5xl font-headline font-black uppercase tracking-tighter text-foreground">
                About <span className="text-primary">Experience</span>
              </h2>
            </div>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
              <p>
                My journey as an AI Engineer is fueled by a passion for solving real-world problems through data. I specialize in <span className="text-foreground font-bold">Natural Language Processing (NLP)</span> and building sophisticated models for <span className="text-foreground font-bold">Tabular Data analysis</span>.
              </p>
              <p>
                Beyond model training, I focus on <span className="text-foreground font-bold">end-to-end deployment</span>—ensuring that the intelligence I build is accessible via high-performance APIs and integrated seamlessly into production environments using Docker and Cloud providers.
              </p>
              <p>
                I believe that AI should be practical, accessible, and high-performing. This philosophy guides every project I undertake.
              </p>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" size="icon" className="w-12 h-12 rounded-xl text-primary hover:bg-primary/10 border-primary/20">
                <Github />
              </Button>
              <Button variant="outline" size="icon" className="w-12 h-12 rounded-xl text-primary hover:bg-primary/10 border-primary/20">
                <Linkedin />
              </Button>
              <Button variant="outline" size="icon" className="w-12 h-12 rounded-xl text-primary hover:bg-primary/10 border-primary/20">
                <Mail />
              </Button>
            </div>
          </div>

          <div className="space-y-12">
            <div className="p-8 glass rounded-3xl space-y-10">
              <div>
                <h3 className="text-xl font-headline font-bold uppercase tracking-widest mb-8 flex items-center gap-3 text-foreground">
                  <GraduationCap className="text-primary w-6 h-6" /> Education Roadmap
                </h3>
                <Timeline />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}