"use client"

import React from 'react';
import { Languages, Brain, Code, Database, Cloud, Award, Sparkles } from 'lucide-react';
import { RadarChart } from '@/components/RadarChart';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const skills = [
  { name: "NLP", value: 90 },
  { name: "GenAI", value: 85 },
  { name: "Backend", value: 92 },
  { name: "Data", value: 95 },
  { name: "ML", value: 88 },
  { name: "Cloud", value: 75 }
];

const certifications = [
  { title: "Oracle AI Vector Search", issuer: "Oracle", icon: <Award className="w-6 h-6" /> },
  { title: "IBM Regression Specialist", issuer: "IBM", icon: <Award className="w-6 h-6" /> },
  { title: "IBM Classification Certification", issuer: "IBM", icon: <Award className="w-6 h-6" /> },
];

export default function SkillsPage() {
  return (
    <div className="pt-32 pb-24 px-4 min-h-screen">
      <section id="skills" className="max-w-7xl mx-auto overflow-hidden">
        <div className="text-center mb-20 space-y-4">
          <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase">Core Capabilities</Badge>
          <h2 className="text-5xl font-headline font-black uppercase tracking-tighter text-foreground">
            Skill <span className="text-primary">Architecture</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">A technical breakdown of my proficiency in Artificial Intelligence and Data Engineering.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="p-10 glass rounded-[2.5rem] relative border border-primary/10 shadow-2xl">
            <div className="absolute top-6 left-6 text-[10px] font-bold opacity-40 uppercase tracking-[0.3em] text-foreground">Expertise Radar Map</div>
            <RadarChart skills={skills} theme="dark" />
          </div>
          
          <div className="grid gap-10">
            {skills.map((s) => (
              <div key={s.name} className="space-y-3">
                <div className="flex justify-between items-center font-headline font-bold text-xs uppercase tracking-widest text-foreground">
                  <span className="flex items-center gap-3">
                    {s.name === 'NLP' && <Languages className="w-4 h-4 text-primary" />}
                    {s.name === 'GenAI' && <Sparkles className="w-4 h-4 text-primary" />}
                    {s.name === 'Backend' && <Code className="w-4 h-4 text-primary" />}
                    {s.name === 'Data' && <Database className="w-4 h-4 text-primary" />}
                    {s.name === 'ML' && <Brain className="w-4 h-4 text-primary" />}
                    {s.name === 'Cloud' && <Cloud className="w-4 h-4 text-primary" />}
                    {s.name}
                  </span>
                  <span className="text-primary">{s.value}%</span>
                </div>
                <Progress value={s.value} className="h-2 bg-muted border border-border/50" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-32">
          <h3 className="text-2xl font-headline font-bold uppercase tracking-widest text-center mb-16 text-foreground">Certifications & Accreditations</h3>
          <div className="grid sm:grid-cols-3 gap-8">
            {certifications.map((c, i) => (
              <div key={i} className="p-8 glass rounded-3xl border border-border flex items-center gap-6 hover:border-primary/50 transition-all group cursor-default shadow-lg hover:shadow-primary/5">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-inner">
                  {c.icon}
                </div>
                <div>
                  <div className="text-lg font-headline font-bold leading-tight text-foreground">{c.title}</div>
                  <div className="text-[11px] font-bold uppercase text-muted-foreground tracking-tighter mt-1.5">{c.issuer} Professional</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}