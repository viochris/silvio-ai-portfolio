"use client"

import React from 'react';
import { Github, Linkedin, Mail, GraduationCap, Target, Zap, ShieldCheck, BarChart3, Users } from 'lucide-react';
import { Timeline } from '@/components/Timeline';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function AboutPage() {
  const cvDriveLink = "https://drive.google.com/file/d/1RiqkgvDZP4c1MoXTp2-8ZTnnVTo8fen5/view?usp=sharing";
  const cvRawLink = "https://github.com/viochris/viochris/raw/main/CV_Silvio_Christian_Joe_Data_Scientist.pdf";

  return (
    <div className="pt-32 lg:pt-40 pb-24 px-6 md:px-12 lg:px-16 min-h-screen">
      <section id="about" className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
          <div className="space-y-12">
            <div className="space-y-6">
              <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase px-4">The Journey</Badge>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black uppercase tracking-tighter text-foreground">
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

            <div className="flex gap-4 sm:gap-6 pt-4">
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
            <div className="p-8 md:p-10 lg:p-12 glass rounded-[2.5rem] space-y-10 border-primary/10 shadow-2xl">
              <div>
                <h3 className="text-xl md:text-2xl font-headline font-bold uppercase tracking-widest mb-10 flex items-center gap-4 text-foreground">
                  <GraduationCap className="text-primary w-7 h-7" /> Education Roadmap
                </h3>
                <Timeline />
              </div>
            </div>
          </div>
        </div>

        {/* Section: Professional Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-10 mb-32">
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
            },
            {
              title: "User Centric",
              desc: "Creating AI experiences that are intuitive and truly beneficial, bridging the gap between math and human needs.",
              icon: <Users className="w-10 h-10 text-primary" />
            }
          ].map((pillar, idx) => (
            <div key={idx} className="p-10 lg:p-12 glass rounded-[3rem] border-white/5 space-y-8 hover:bg-primary/5 transition-all flex flex-col h-full">
              <div className="w-20 h-20 rounded-[1.5rem] bg-white/5 flex items-center justify-center shrink-0">
                {pillar.icon}
              </div>
              <div className="space-y-4 flex-1">
                <h4 className="text-2xl font-headline font-bold text-white uppercase tracking-tight leading-tight">{pillar.title}</h4>
                <p className="text-muted-foreground font-medium leading-relaxed">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Section: GitHub Performance */}
        <div className="mb-32 space-y-16">
          <div className="text-center space-y-4">
            <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase px-4">Activity</Badge>
            <h3 className="text-3xl md:text-4xl font-headline font-black uppercase tracking-tighter text-white flex items-center justify-center gap-4">
              <BarChart3 className="text-primary w-8 h-8" /> GitHub Performance
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 md:p-8 glass rounded-[2.5rem] border-white/10 flex items-center justify-center bg-white/[0.02] overflow-hidden shadow-2xl">
              <img 
                src="https://github-readme-streak-stats.herokuapp.com/?user=viochris&theme=radical&hide_border=true" 
                alt="GitHub Streak" 
                className="w-full h-auto max-w-lg object-contain"
              />
            </div>
            <div className="p-6 md:p-8 glass rounded-[2.5rem] border-white/10 flex items-center justify-center bg-white/[0.02] overflow-hidden shadow-2xl">
              <img 
                src="https://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=viochris&theme=radical" 
                alt="Productive Time" 
                className="w-full h-auto max-w-lg object-contain"
              />
            </div>
          </div>
        </div>

        {/* Section: Beyond The Code */}
        <div className="p-10 md:p-16 lg:p-24 glass rounded-[4rem] border-primary/10 relative overflow-hidden mb-24">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full -mr-48 -mt-48" />
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase px-4">Personal Interests</Badge>
              <h3 className="text-4xl md:text-5xl font-headline font-black uppercase tracking-tighter text-white">
                Beyond The <span className="text-primary">Code</span>
              </h3>
              <div className="space-y-6 text-muted-foreground text-lg font-medium leading-relaxed">
                <p>
                  When I'm not architecting neural networks or optimizing ETL pipelines, I enjoy contributing to the open-source community and participating in AI hackathons. 
                </p>
                <p>
                  I'm a firm believer in lifelong learning and often spend my weekends experimenting with new LLM frameworks atau menjelajahi persimpangan antara AI dan psikologi manusia. 
                </p>
                <p>
                  Tujuan saya adalah menciptakan teknologi yang tidak hanya kuat, tetapi benar-benar bermanfaat dan intuitif bagi pengguna manusia.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {[
                { label: "Open Source", val: "Contributor" },
                { label: "Hackathons", val: "Winner" },
                { label: "Mentorship", val: "Enthusiast" },
                { label: "Tech Blog", val: "Writer" }
              ].map((item, idx) => (
                <div key={idx} className="p-6 sm:p-8 bg-white/5 rounded-[2rem] border border-white/5 text-center space-y-2">
                  <div className="text-primary font-headline font-bold text-lg sm:text-xl">{item.val}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/50">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section: Connect & Resume Badges */}
        <div className="text-center space-y-12">
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-headline font-bold uppercase tracking-widest text-white">Connect & Resume</h3>
            <Separator className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a href={cvRawLink} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
              <img src="https://img.shields.io/badge/Download_CV_(PDF)-ED2224?style=for-the-badge&logo=adobe-acrobat-reader&logoColor=white" alt="Download CV" className="h-10 md:h-12 shadow-xl rounded-lg" />
            </a>
            <a href={cvDriveLink} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
              <img src="https://img.shields.io/badge/View_on_Drive-4285F4?style=for-the-badge&logo=google-drive&logoColor=white" alt="View CV" className="h-10 md:h-12 shadow-xl rounded-lg" />
            </a>
            <a href="mailto:viochristian12@gmail.com" className="hover:scale-110 transition-transform">
              <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" className="h-10 md:h-12 shadow-xl rounded-lg" />
            </a>
            <a href="https://www.linkedin.com/in/silvio-christian-joe" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
              <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" className="h-10 md:h-12 shadow-xl rounded-lg" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
