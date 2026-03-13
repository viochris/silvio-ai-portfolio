"use client"

import React from 'react';
import { Github, Linkedin, Mail, GraduationCap, Target, Zap, ShieldCheck } from 'lucide-react';
import { Timeline } from '@/components/Timeline';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function AboutPage() {
  return (
    <div className="pt-32 lg:pt-40 pb-24 px-6 md:px-12 lg:px-16 min-h-screen">
      <section id="about" className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
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

        {/* Section: Professional Pillars (New) */}
        <div className="grid md:grid-cols-3 gap-10 mb-32">
          {[
            {
              title: "Innovation First",
              desc: "Always exploring the latest research papers and state-of-the-art architectures to stay at the cutting edge of AI.",
              icon: <Zap className="w-10 h-10 text-primary" />
            },
            {
              title: "Precision Driven",
              desc: "Data-driven decision making ensures every model is optimized for the highest accuracy and real-world reliability.",
              icon: <Target className="w-10 h-10 text-primary" />
            },
            {
              title: "Scalable Systems",
              desc: "Developing solutions that don't just work locally, but are architected to scale globally under high production loads.",
              icon: <ShieldCheck className="w-10 h-10 text-primary" />
            }
          ].map((pillar, idx) => (
            <div key={idx} className="p-12 glass rounded-[3rem] border-white/5 space-y-8 hover:bg-primary/5 transition-all">
              <div className="w-20 h-20 rounded-[1.5rem] bg-white/5 flex items-center justify-center">
                {pillar.icon}
              </div>
              <div className="space-y-4">
                <h4 className="text-2xl font-headline font-bold text-white uppercase tracking-tight">{pillar.title}</h4>
                <p className="text-muted-foreground font-medium leading-relaxed">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Section: Beyond The Code (New) */}
        <div className="p-16 lg:p-24 glass rounded-[4rem] border-primary/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full -mr-48 -mt-48" />
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase px-4">Personal Interests</Badge>
              <h3 className="text-4xl md:text-5xl font-headline font-black uppercase tracking-tighter text-white">
                Beyond The <span className="text-primary">Code</span>
              </h3>
              <div className="space-y-6 text-muted-foreground text-lg font-medium leading-relaxed">
                <p>
                  When I'm not architecting neural networks or optimizing ETL pipelines, I enjoy contributing to the open-source community and participating in AI hackathons. 
                </p>
                <p>
                  I'm a firm believer in lifelong learning and often spend my weekends experimenting with new LLM frameworks or exploring the intersections of AI and human psychology. 
                </p>
                <p>
                  My goal is to create technology that is not just powerful, but truly beneficial and intuitive for human users.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: "Open Source", val: "Contributor" },
                { label: "Hackathons", val: "Winner" },
                { label: "Mentorship", val: "Enthusiast" },
                { label: "Tech Blog", val: "Writer" }
              ].map((item, idx) => (
                <div key={idx} className="p-8 bg-white/5 rounded-[2rem] border border-white/5 text-center space-y-2">
                  <div className="text-primary font-headline font-bold text-xl">{item.val}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/50">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}