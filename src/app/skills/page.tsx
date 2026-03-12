
"use client"

import React from 'react';
import { Languages, Brain, Code, Database, Cloud, Award } from 'lucide-react';
import { RadarChart } from '@/components/RadarChart';
import { Progress } from '@/components/ui/progress';

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
    <div className="pt-32 pb-24 px-4">
      <section id="skills" className="max-w-7xl mx-auto overflow-hidden">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-headline font-black uppercase tracking-tighter">
            Skill <span className="text-primary">Architecture</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Visualizing technical breadth and depth in AI and Data Engineering.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="p-8 glass rounded-3xl relative">
            <div className="absolute top-4 left-4 text-[10px] font-bold opacity-30 uppercase tracking-[0.3em]">Skill Radar Chart</div>
            <RadarChart skills={skills} theme="dark" />
          </div>
          
          <div className="grid gap-8">
            {skills.map((s) => (
              <div key={s.name} className="space-y-2">
                <div className="flex justify-between items-center font-headline font-bold text-xs uppercase tracking-widest">
                  <span className="flex items-center gap-2">
                    {s.name === 'NLP' && <Languages className="w-4 h-4 text-primary" />}
                    {s.name === 'GenAI' && <Brain className="w-4 h-4 text-primary" />}
                    {s.name === 'Backend' && <Code className="w-4 h-4 text-primary" />}
                    {s.name === 'Data' && <Database className="w-4 h-4 text-primary" />}
                    {s.name === 'ML' && <Brain className="w-4 h-4 text-primary" />}
                    {s.name === 'Cloud' && <Cloud className="w-4 h-4 text-primary" />}
                    {s.name}
                  </span>
                  <span>{s.value}%</span>
                </div>
                <Progress value={s.value} className="h-1.5" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <h3 className="text-xl font-headline font-bold uppercase tracking-widest text-center mb-12">Certifications</h3>
          <div className="grid sm:grid-cols-3 gap-6">
            {certifications.map((c, i) => (
              <div key={i} className="p-6 glass rounded-2xl border border-border flex items-center gap-4 hover:border-primary/50 transition-colors group cursor-default">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  {c.icon}
                </div>
                <div>
                  <div className="text-sm font-headline font-bold leading-tight">{c.title}</div>
                  <div className="text-[10px] font-bold uppercase text-muted-foreground tracking-tighter mt-1">{c.issuer} Certified</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
