"use client"

import React, { useState, useEffect } from 'react';
import { 
  Sun, Moon, Download, Github, Linkedin, Mail, ExternalLink, 
  Code, Database, Brain, Cloud, Terminal, Award, Phone, MapPin,
  ChevronRight, Sparkles, Languages
} from 'lucide-react';
import { BinaryBackground } from '@/components/BinaryBackground';
import { TypewriterEffect } from '@/components/TypewriterEffect';
import { TechMarquee } from '@/components/TechMarquee';
import { CodeWindow } from '@/components/CodeWindow';
import { RadarChart } from '@/components/RadarChart';
import { Chatbot } from '@/components/Chatbot';
import { Timeline } from '@/components/Timeline';
import { Progress } from '@/components/ui/progress';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

const projects = [
  { 
    id: 1, 
    title: "Conversational AI Companion", 
    desc: "A personalized AI girlfriend built using LangChain and OpenAI for emotional support and conversation.",
    tech: ["LangChain", "OpenAI", "Python", "Streamlit"],
    link: "https://simple-ai-girlfriend-95ej5tnshixobcpdgwx2pn.streamlit.app/",
    problem: "Loneliness and lack of accessible conversational partners for emotional practice.",
    solution: "A fine-tuned LLM with memory capabilities and a friendly persona to provide empathetic interaction.",
    image: "https://picsum.photos/seed/ai-gf/600/400"
  },
  { 
    id: 2, 
    title: "Stuntify API & Prediction", 
    desc: "Health monitoring API predicting child stunting risks using environmental and nutritional data.",
    tech: ["FastAPI", "Scikit-Learn", "Docker", "Pandas"],
    link: "#",
    problem: "Difficult early detection of growth stunting in children without expert consultation.",
    solution: "A random forest classification model deployed via FastAPI to provide instant risk assessments based on key metrics.",
    image: "https://picsum.photos/seed/health/600/400"
  },
  { 
    id: 3, 
    title: "Review Sentiment Analyzer API", 
    desc: "Production-ready sentiment analysis for marketplace reviews using RoBERTa.",
    tech: ["RoBERTa", "HuggingFace", "PyTorch", "Docker"],
    link: "https://silvio0-simple-sentiment-analyst.hf.space/docs",
    problem: "Manual analysis of thousands of customer reviews is inefficient for businesses.",
    solution: "An automated sentiment extraction tool using state-of-the-art NLP models to categorize feedback with high precision.",
    image: "https://picsum.photos/seed/sentiment/600/400"
  },
  { 
    id: 4, 
    title: "Chef AI: Culinary Assistant", 
    desc: "Vision-based recipe generator that identifies ingredients from photos.",
    tech: ["Gemini Vision", "Streamlit", "Python", "Pillow"],
    link: "https://ai-recipe-generator-6fajjxbnjpb2dcnqjvvvvy.streamlit.app/",
    problem: "Indecisiveness when looking at a fridge full of disparate ingredients.",
    solution: "A multimodal AI system that takes an image input, identifies items, and generates personalized recipes using Google's Gemini.",
    image: "https://picsum.photos/seed/chef/600/400"
  }
];

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

export default function Home() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);
  const avatarImage = "/vio-image.png";

  useEffect(() => {
    setMounted(true);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  if (!mounted) {
    return <div className="min-h-screen bg-[#21212c]" />;
  }

  return (
    <div className={`min-h-screen selection:bg-primary/30 transition-colors duration-500`}>
      <BinaryBackground theme={theme} />
      
      <nav className="fixed top-0 w-full z-50 glass border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-headline font-bold text-xl tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">S</div>
            SILVIO.AI
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-headline font-bold uppercase tracking-widest text-muted-foreground">
            <a href="#home" className="hover:text-primary transition-colors">Home</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
            <a href="#skills" className="hover:text-primary transition-colors">Skills</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="w-12 h-6 rounded-full bg-muted relative flex items-center px-1 transition-colors"
            >
              <div className={`w-4 h-4 rounded-full bg-white shadow-sm flex items-center justify-center transition-transform duration-300 ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`}>
                {theme === 'dark' ? <Moon className="w-2.5 h-2.5 text-slate-900" /> : <Sun className="w-2.5 h-2.5 text-yellow-500" />}
              </div>
            </button>
            <Button size="sm" className="hidden sm:flex gap-2 font-headline uppercase font-bold text-xs tracking-widest">
              <Download className="w-4 h-4" /> CV
            </Button>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8 order-1">
              <div className="space-y-2">
                <Badge variant="outline" className="text-primary font-headline uppercase tracking-[0.3em] py-1 border-primary/30">
                  Data Scientist & AI Engineer
                </Badge>
                <div className="flex flex-col md:flex-row md:items-center gap-8">
                  <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-headline font-black leading-tight tracking-tighter">
                      Silvio Christian <span className="text-primary">Joe</span>
                    </h1>
                    <div className="text-2xl md:text-3xl font-headline text-muted-foreground flex items-center gap-3">
                      <span>I </span>
                      <TypewriterEffect />
                    </div>
                    <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                      Specializing in NLP and Tabular Data processing, I build and deploy production-grade AI systems that bridge the gap between complex research and scalable user applications.
                    </p>
                  </div>
                  
                  <div className="relative group shrink-0">
                    <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full animate-pulse-glow" />
                    <div className="relative z-10 w-48 h-48 md:w-56 md:h-56">
                      <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary animate-[spin_20s_linear_infinite]" />
                      <div className="absolute inset-3 rounded-full border border-primary/20" />
                      <div className="absolute inset-[8px] rounded-full p-1.5 bg-background shadow-2xl">
                        <img 
                          src={avatarImage} 
                          alt="Silvio Christian Joe" 
                          className="w-full h-full object-cover rounded-full border-4 border-primary/10"
                        />
                      </div>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20">
                        <Badge className="bg-primary text-white border-none px-4 py-1 shadow-xl font-headline font-bold text-[10px] tracking-widest uppercase whitespace-nowrap">
                          AI Engineer
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="rounded-full px-8 font-headline uppercase font-bold tracking-widest" asChild>
                  <a href="#projects">View Projects</a>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8 font-headline uppercase font-bold tracking-widest" asChild>
                  <a href="#contact">Chat with AI</a>
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
                <div>
                  <div className="text-3xl font-headline font-black text-primary">15+</div>
                  <div className="text-xs uppercase font-bold opacity-60 tracking-widest">Projects</div>
                </div>
                <div>
                  <div className="text-3xl font-headline font-black text-primary">4+</div>
                  <div className="text-xs uppercase font-bold opacity-60 tracking-widest">Awards</div>
                </div>
                <div>
                  <div className="text-3xl font-headline font-black text-primary">99%</div>
                  <div className="text-xs uppercase font-bold opacity-60 tracking-widest">Precision</div>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full order-2">
              <CodeWindow />
            </div>
          </div>
        </div>
      </section>

      <TechMarquee />

      <section id="about" className="py-24 px-4 bg-muted/20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20">
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

      <section id="projects" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-2">
              <h2 className="text-4xl font-headline font-black uppercase tracking-tighter">
                Featured <span className="text-primary">Projects</span>
              </h2>
              <p className="text-muted-foreground text-lg">Deployments that solve specific user problems.</p>
            </div>
            <Button variant="link" className="font-headline font-bold uppercase tracking-widest gap-2">
              Browse Github <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((p) => (
              <Card key={p.id} className="group overflow-hidden border-border bg-card/50 hover:bg-card transition-all duration-300 hover:shadow-2xl">
                <div className="relative h-64 overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="flex gap-4">
                      <Button size="sm" variant="secondary" className="font-bold text-xs" asChild>
                        <a href={p.link} target="_blank" rel="noopener noreferrer"><ExternalLink className="w-3 h-3 mr-2" /> Live Demo</a>
                      </Button>
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex gap-2 mb-3">
                    {p.tech.slice(0, 3).map(t => (
                      <Badge key={t} variant="secondary" className="text-[10px] uppercase font-bold tracking-tighter">{t}</Badge>
                    ))}
                  </div>
                  <CardTitle className="text-2xl font-headline font-bold group-hover:text-primary transition-colors">{p.title}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2">{p.desc}</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between items-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="font-headline font-bold uppercase tracking-widest text-xs">
                        Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-3xl font-headline font-bold mb-4">{p.title}</DialogTitle>
                      </DialogHeader>
                      <div className="grid md:grid-cols-2 gap-10">
                        <div className="space-y-6">
                          <img src={p.image} alt={p.title} className="w-full rounded-xl shadow-lg" />
                          <div className="flex flex-wrap gap-2">
                            {p.tech.map(t => <Badge key={t} variant="secondary">{t}</Badge>)}
                          </div>
                        </div>
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-sm font-bold uppercase text-primary mb-2 flex items-center gap-2">
                              <Brain className="w-4 h-4" /> The Problem
                            </h4>
                            <p className="text-muted-foreground">{p.problem}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-bold uppercase text-primary mb-2 flex items-center gap-2">
                              <Sparkles className="w-4 h-4" /> The Solution
                            </h4>
                            <p className="text-muted-foreground">{p.solution}</p>
                          </div>
                          <Separator />
                          <Button className="w-full font-headline font-bold" asChild>
                            <a href={p.link} target="_blank" rel="noopener noreferrer">Visit Repository <ExternalLink className="ml-2 w-4 h-4" /></a>
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="py-24 px-4 bg-muted/20 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-headline font-black uppercase tracking-tighter">
              Skill <span className="text-primary">Architecture</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Visualizing technical breadth and depth in AI and Data Engineering.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="p-8 glass rounded-3xl relative">
              <div className="absolute top-4 left-4 text-[10px] font-bold opacity-30 uppercase tracking-[0.3em]">Skill Radar Chart</div>
              <RadarChart skills={skills} theme={theme} />
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
        </div>
      </section>

      <section id="contact" className="py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-5xl font-headline font-black uppercase tracking-tighter">
                Get In <span className="text-primary">Touch</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                Interested in collaboration or have a project in mind? Reach out via contact details or chat with my AI assistant.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Me</div>
                  <div className="text-lg font-headline font-bold">silvio.christian@example.com</div>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Call Me</div>
                  <div className="text-lg font-headline font-bold">+62 812-3456-7890</div>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Location</div>
                  <div className="text-lg font-headline font-bold">Jakarta, Indonesia</div>
                </div>
              </div>
            </div>

            <div className="pt-10 border-t border-border flex gap-4">
              <Button variant="outline" size="lg" className="rounded-xl px-10 font-headline font-bold">LinkedIn</Button>
              <Button variant="outline" size="lg" className="rounded-xl px-10 font-headline font-bold">GitHub</Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-full" />
            <div className="relative">
               <Chatbot />
            </div>
          </div>
        </div>
      </section>

      <footer className="py-10 px-4 border-t border-border bg-muted/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
          <div className="font-headline font-bold tracking-tighter">
            © {new Date().getFullYear()} SILVIO.AI PORTFOLIO
          </div>
          <div className="flex gap-8 font-bold uppercase text-[10px] tracking-widest">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
          </div>
          <div className="text-[10px] font-code opacity-50 uppercase tracking-widest">
            Handcrafted with Next.js & Genkit
          </div>
        </div>
      </footer>
    </div>
  );
}