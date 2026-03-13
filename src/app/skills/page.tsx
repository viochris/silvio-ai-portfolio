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
    <div className="pt-32 lg:pt-40 pb-24 px-6 md:px-12 lg:px-16 min-h-screen">
      <section id="skills" className="max-w-7xl mx-auto overflow-hidden">
        <div className="text-center mb-24 space-y-6">
          <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase px-4">Core Capabilities</Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black uppercase tracking-tighter text-white">
            Skill <span className="text-primary">Architecture</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg lg:text-xl font-medium">A technical breakdown of my proficiency in Artificial Intelligence and Data Engineering.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Radar Chart Container */}
          <div className="p-8 lg:p-14 glass rounded-[3rem] relative border border-primary/10 shadow-2xl flex justify-center items-center overflow-hidden w-full max-w-[550px] mx-auto aspect-square sm:aspect-auto">
            <div className="absolute top-8 left-8 text-[10px] font-bold opacity-60 uppercase tracking-[0.3em] text-white hidden sm:block">Expertise Radar Map</div>
            <div className="w-full flex justify-center">
              <RadarChart skills={skills} />
            </div>
          </div>
          
          {/* Skills List */}
          <div className="grid gap-10 md:gap-12 w-full">
            {skills.map((s) => (
              <div key={s.name} className="space-y-4">
                <div className="flex justify-between items-center font-headline font-bold text-sm md:text-base uppercase tracking-widest text-white">
                  <span className="flex items-center gap-4">
                    {s.name === 'NLP' && <Languages className="w-5 h-5 text-primary shrink-0" />}
                    {s.name === 'GenAI' && <Sparkles className="w-5 h-5 text-primary shrink-0" />}
                    {s.name === 'Backend' && <Code className="w-5 h-5 text-primary shrink-0" />}
                    {s.name === 'Data' && <Database className="w-5 h-5 text-primary shrink-0" />}
                    {s.name === 'ML' && <Brain className="w-5 h-5 text-primary shrink-0" />}
                    {s.name === 'Cloud' && <Cloud className="w-5 h-5 text-primary shrink-0" />}
                    {s.name}
                  </span>
                  <span className="text-primary ml-4">{s.value}%</span>
                </div>
                <div className="relative pt-1">
                  <Progress value={s.value} className="h-3.5 bg-white/5 border border-white/10" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div className="mt-32 lg:mt-40">
          <h3 className="text-2xl md:text-3xl font-headline font-bold uppercase tracking-widest text-center mb-16 text-white">Certifications & Accreditations</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((c, i) => (
              <div key={i} className="p-8 md:p-10 glass rounded-[2rem] border border-white/10 flex items-center gap-6 sm:gap-8 hover:border-primary/50 transition-all group cursor-default shadow-xl hover:shadow-primary/5 min-w-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-inner shrink-0">
                  {c.icon}
                </div>
                <div className="min-w-0 flex-1 overflow-hidden">
                  <div className="text-lg md:text-xl font-headline font-bold leading-tight text-white break-words whitespace-normal">{c.title}</div>
                  <div className="text-[11px] font-bold uppercase text-white/50 tracking-tighter mt-3">{c.issuer} Professional</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}