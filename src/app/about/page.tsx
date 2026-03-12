
"use client"

import React from 'react';
import { Github, Linkedin, Mail, Terminal } from 'lucide-react';
import { Timeline } from '@/components/Timeline';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 px-4">
      <section id="about" className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20">
          <div className="space-y-8">
            <h2 className="text-4xl font-headline font-black uppercase tracking-tighter">
              About <span className="text-primary">Experience</span>
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
              <p>
                My journey as an AI Engineer is fueled by a passion for solving real-world problems through data. I specialize in <span className="text-foreground font-bold">Natural Language Processing (NLP)</span> and building sophisticated models for <span className="text-foreground font-bold">Tabular Data analysis</span>.
              </p>
              <p>
                Beyond model training, I focus on <span className="text-foreground font-bold">end-to-end deployment</span>—ensuring that the intelligence I build is accessible via high-performance APIs and integrated seamlessly into production environments using Docker and Cloud providers.
              </p>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10"><Github /></Button>
              <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10"><Linkedin /></Button>
              <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10"><Mail /></Button>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-headline font-bold uppercase tracking-widest mb-10 flex items-center gap-3">
              <Terminal className="text-primary w-5 h-5" /> Education & Roadmap
            </h3>
            <Timeline />
          </div>
        </div>
      </section>
    </div>
  );
}
