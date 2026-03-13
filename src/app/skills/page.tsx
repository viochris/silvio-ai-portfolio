
"use client"

import React, { useState, useEffect } from 'react';
import { Languages, Brain, Code, Database, Cloud, Award, Sparkles, Wrench, ShieldCheck, GraduationCap, ChevronRight } from 'lucide-react';
import { RadarChart } from '@/components/RadarChart';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { professionalCertifications, courseBadges } from '@/lib/credentials-data';
import { AllCredentialsPage } from '@/components/AllCredentialsPage';

const skills = [
  { name: "NLP", value: 90 },
  { name: "GenAI", value: 85 },
  { name: "Backend", value: 92 },
  { name: "Data", value: 95 },
  { name: "ML", value: 88 },
  { name: "Cloud", value: 75 }
];

const techStacks = [
  {
    category: "Languages",
    badges: [
      { name: "Python", url: "https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" },
      { name: "SQL", url: "https://img.shields.io/badge/SQL-4479A1?style=for-the-badge&logo=postgresql&logoColor=white" }
    ]
  },
  {
    category: "Data Science & ML",
    badges: [
      { name: "Pandas", url: "https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white" },
      { name: "NumPy", url: "https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white" },
      { name: "Scikit-Learn", url: "https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white" },
      { name: "TensorFlow", url: "https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white" }
    ]
  },
  {
    category: "NLP, GenAI & VectorDB",
    badges: [
      { name: "Google Gemini", url: "https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white" },
      { name: "Hugging Face", url: "https://img.shields.io/badge/-HuggingFace-FDEE21?style=for-the-badge&logo=HuggingFace&logoColor=black" },
      { name: "LangChain", url: "https://img.shields.io/badge/LangChain-1C3C3C?style=for-the-badge&logo=LangChain&logoColor=white" },
      { name: "FAISS", url: "https://img.shields.io/badge/FAISS-092E20?style=for-the-badge&logo=meta&logoColor=white" }
    ]
  },
  {
    category: "Web Frameworks & UI",
    badges: [
      { name: "Streamlit", url: "https://img.shields.io/badge/Streamlit-FF4B4B?style=for-the-badge&logo=streamlit&logoColor=white" },
      { name: "FastAPI", url: "https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi" },
      { name: "Flask", url: "https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" }
    ]
  },
  {
    category: "Automation & DevOps",
    badges: [
      { name: "Telegram", url: "https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white" },
      { name: "Prefect", url: "https://img.shields.io/badge/Prefect-0052FF?style=for-the-badge" },
      { name: "Docker", url: "https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" }
    ]
  },
  {
    category: "Visualization",
    badges: [
      { name: "Tableau", url: "https://img.shields.io/badge/Tableau-E97627?style=for-the-badge&logo=Tableau&logoColor=white" },
      { name: "Matplotlib", url: "https://img.shields.io/badge/Matplotlib-ffffff?style=for-the-badge&logo=Matplotlib&logoColor=black" },
      { name: "Seaborn", url: "https://img.shields.io/badge/Seaborn-444876?style=for-the-badge&logo=python&logoColor=white" }
    ]
  },
  {
    category: "Databases & Tools",
    badges: [
      { name: "MySQL", url: "https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" },
      { name: "Git", url: "https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white" },
      { name: "Google Colab", url: "https://img.shields.io/badge/Google_Colab-F9AB00?style=for-the-badge&logo=googlecolab&logoColor=white" },
      { name: "Kaggle", url: "https://img.shields.io/badge/Kaggle-20BEFF?style=for-the-badge&logo=Kaggle&logoColor=white" }
    ]
  },
  {
    category: "Cloud & MLOps",
    badges: [
      { name: "AWS", url: "https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white" },
      { name: "GCP", url: "https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white" },
      { name: "HuggingFace", url: "https://img.shields.io/badge/Hugging_Face-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black" }
    ]
  }
];

export default function SkillsPage() {
  const [activeTab, setActiveTab] = useState('Skills');
  const [credentialTab, setCredentialTab] = useState<'Certifications' | 'Badges'>('Certifications');

  useEffect(() => {
    if (activeTab === 'Skills') {
      const timer = setTimeout(() => {
        const targetId = credentialTab === 'Certifications' ? 'certifications-section' : 'badges-section';
        const element = document.getElementById(targetId);
        if (element) {
          // Offset by 100px to prevent the sticky navbar from hiding the title
          const yOffset = -100; 
          const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100); // 100ms delay to ensure DOM paints first

      return () => clearTimeout(timer);
    }
  }, [activeTab, credentialTab]);

  if (activeTab === 'Credentials') {
    return (
      <AllCredentialsPage 
        setActiveTab={setActiveTab} 
        credentialTab={credentialTab} 
        setCredentialTab={setCredentialTab} 
      />
    );
  }

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

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-40">
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

        {/* Tech Stack Section */}
        <div className="mb-40 space-y-20">
          <div className="text-center space-y-4">
            <h3 className="text-2xl md:text-3xl font-headline font-bold uppercase tracking-widest text-white flex items-center justify-center gap-4">
              <Wrench className="text-primary w-8 h-8" /> Tech Stack & Tools
            </h3>
            <p className="text-white/50 font-medium">The comprehensive ecosystem I use to build intelligent solutions.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
            {techStacks.map((stack, idx) => (
              <div key={idx} className="p-8 glass rounded-[2.5rem] border border-white/5 hover:border-primary/20 transition-all group flex flex-col h-full">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-6">{stack.category}</h4>
                <div className="flex flex-wrap gap-3">
                  {stack.badges.map((badge, bIdx) => (
                    <img 
                      key={bIdx} 
                      src={badge.url} 
                      alt={badge.name} 
                      className="h-7 md:h-8 hover:scale-110 hover:brightness-110 transition-all duration-300 drop-shadow-[0_0_8px_rgba(59,130,246,0.1)]" 
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Certifications Preview */}
        <div id="certifications-section" className="mb-40">
          <h3 className="text-2xl md:text-3xl font-headline font-bold uppercase tracking-widest text-center mb-16 text-white">Professional Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {professionalCertifications.slice(0, 4).map((c) => (
              <div key={c.id} className="p-8 md:p-10 glass rounded-[2rem] border border-white/10 flex items-center gap-6 sm:gap-8 hover:border-primary/50 transition-all group shadow-xl h-full">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-lg md:text-xl font-headline font-bold text-white leading-tight">{c.title}</div>
                  <div className="text-[11px] font-bold uppercase text-white/50 tracking-tighter mt-3">{c.issuer} Professional</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <button 
              onClick={() => {
                setCredentialTab('Certifications');
                setActiveTab('Credentials');
              }} 
              className="text-primary hover:text-primary/80 font-bold uppercase tracking-widest text-xs flex items-center gap-2 transition-all hover:gap-4"
            >
              Explore All Certifications <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Course Badges Preview */}
        <div id="badges-section" className="mt-20">
          <h3 className="text-2xl md:text-3xl font-headline font-bold uppercase tracking-widest text-center mb-16 text-white">Course Badges & Specializations</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {courseBadges.slice(0, 4).map((b) => (
              <div key={b.id} className="p-6 bg-white/5 rounded-[2rem] border border-white/10 flex flex-col gap-4 hover:border-primary/50 transition-all group shadow-xl">
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary/40 group-hover:text-primary transition-colors">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-white mb-2 leading-tight">{b.title}</div>
                  <div className="text-[10px] font-bold uppercase text-white/30 tracking-widest">{b.issuer} Specialized</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <button 
              onClick={() => {
                setCredentialTab('Badges');
                setActiveTab('Credentials');
              }} 
              className="text-primary hover:text-primary/80 font-bold uppercase tracking-widest text-xs flex items-center gap-2 transition-all hover:gap-4"
            >
              Explore All Badges <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
