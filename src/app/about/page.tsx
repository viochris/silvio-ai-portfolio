"use client"

import React from 'react';
import { Github, Linkedin, Mail, GraduationCap } from 'lucide-react';
import { Timeline } from '@/components/Timeline';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function AboutPage() {
  return (
    <div className="pt-32 lg:pt-40 pb-24 px-6 md:px-12 lg:px-16 min-h-screen">
      <section id="about" className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="space-y-12">
            <div className="space-y-6">
              <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase px-4">The Journey</Badge>
              <h2 className="text-5xl lg:text-6xl font-headline font-black uppercase tracking-tighter text-foreground">
                About <span className="text-primary">Experience</span>
              </h2>
            </div>
            
            <div className="space-y-8 text-muted-foreground leading-relaxed text-lg lg:text-xl font-medium">
              <p>
                My journey as an AI Engineer is fueled by a passion for solving real-world problems through data. I specialize in <span className="text-foreground font-bold underline decoration-primary/30">Natural Language Processing (NLP)</span> and building sophisticated models for <span className="text-foreground font-bold underline decoration-primary/30">Tabular Data analysis</span>.
              </p>
              <p>
                Beyond model training, I focus on <span className="text-foreground font-bold underline decoration-primary/30">end-to-end deployment</span>—ensuring that the intelligence I build is accessible via high-performance APIs and integrated seamlessly into production environments using Docker and Cloud providers.
              </p>
              <p>
                I believe that AI should be practical, accessible, and high-performing. This philosophy guides every project I undertake.
              </p>
            </div>

            <div className="flex gap-6 pt-4">
              <Button variant="outline" size="icon" className="w-14 h-14 rounded-2xl text-primary hover:bg-primary/10 border-primary/20 transition-all" asChild>
                <a href="https://github.com/viochris" target="_blank" rel="noopener noreferrer">
                  <Github className="w-6 h-6" />
                </a>
              </Button>
              <Button variant="outline" size="icon" className="w-14 h-14 rounded-2xl text-primary hover:bg-primary/10 border-primary/20 transition-all" asChild>
                <a href="https://www.linkedin.com/in/silvio-christian-joe" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-6 h-6" />
                </a>
              </Button>
              <Button variant="outline" size="icon" className="w-14 h-14 rounded-2xl text-primary hover:bg-primary/10 border-primary/20 transition-all" asChild>
                <a href="mailto:viochristian12@gmail.com">
                  <Mail className="w-6 h-6" />
                </a>
              </Button>
            </div>
          </div>

          <div className="space-y-12">
            <div className="p-10 lg:p-12 glass rounded-[2.5rem] space-y-10 border-primary/10 shadow-2xl">
              <div>
                <h3 className="text-xl md:text-2xl font-headline font-bold uppercase tracking-widest mb-10 flex items-center gap-4 text-foreground">
                  <GraduationCap className="text-primary w-7 h-7" /> Education Roadmap
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
