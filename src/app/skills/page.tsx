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
        <div className="text-center mb-16 md:mb-20 space-y-4">
          <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase">Core Capabilities</Badge>
          <h2 className="text-4xl md:text-5xl font-headline font-black uppercase tracking-tighter text-white">
            Skill <span className="text-primary">Architecture</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-base md:text-lg font-medium">A technical breakdown of my proficiency in Artificial Intelligence and Data Engineering.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Radar Chart Container - Improved for Mobile */}
          <div className="p-6 md:p-10 glass rounded-[2.5rem] relative border border-primary/10 shadow-2xl flex justify-center items-center overflow-hidden">
            <div className="absolute top-6 left-6 text-[10px] font-bold opacity-60 uppercase tracking-[0.3em] text-white">Expertise Radar Map</div>
            <div className="w-full max-w-[300px] flex justify-center">
              <RadarChart skills={skills} />
            </div>
          </div>
          
          {/* Skills List - Better Spacing for Mobile */}
          <div className="grid gap-8 md:gap-10">
            {skills.map((s) => (
              <div key={s.name} className="space-y-4">
                <div className="flex justify-between items-center font-headline font-bold text-xs md:text-sm uppercase tracking-widest text-white">
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
                <Progress value={s.value} className="h-2.5 md:h-3 bg-white/5 border border-white/10" />
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section - Improved Spacing */}
        <div className="mt-24 md:mt-32">
          <h3 className="text-xl md:text-2xl font-headline font-bold uppercase tracking-widest text-center mb-12 md:mb-16 text-white">Certifications & Accreditations</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {certifications.map((c, i) => (
              <div key={i} className="p-6 md:p-8 glass rounded-3xl border border-white/10 flex items-center gap-5 md:gap-6 hover:border-primary/50 transition-all group cursor-default shadow-lg hover:shadow-primary/5">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-inner shrink-0">
                  {c.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-base md:text-lg font-headline font-bold leading-tight text-white truncate">{c.title}</div>
                  <div className="text-[10px] md:text-[11px] font-bold uppercase text-white/50 tracking-tighter mt-1.5">{c.issuer} Professional</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}