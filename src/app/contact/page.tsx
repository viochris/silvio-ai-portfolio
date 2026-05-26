"use client"

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Instagram, Copy, Check, Send, Clock, HelpCircle, MessageSquare, Loader2 } from 'lucide-react';
import { Chatbot } from '@/components/Chatbot';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { KaggleIcon } from '@/components/SocialIcons';
import { useToast } from '@/hooks/use-toast';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase';

const faqs = [
  {
    question: "What is your primary tech stack?",
    answer: "My core expertise lies in Python-based AI development. I specialize in the Gemini ecosystem, LangGraph for agent orchestration, and FastAPI for production-grade backends. For data science, I rely on the classic stack: Pandas, Scikit-Learn, and SBERT for NLP tasks."
  },
  {
    question: "Are you open to freelance or full-time roles?",
    answer: "Yes, I am currently open to collaborations on innovative AI projects, data science research, or full-time roles that challenge my technical capabilities in Machine Learning and Agentic workflows."
  },
  {
    question: "Can you build custom AI agents for specific business needs?",
    answer: "Absolutely. I have experience building autonomous agents (like InsightSQL) that handle complex reasoning, tool calling, and self-correction. I can design agents for anything from data analysis to automated customer support."
  },
  {
    question: "How do you handle data privacy in AI applications?",
    answer: "Security is non-negotiable. I prioritize building stateless APIs whenever possible and utilize enterprise-grade vector databases with proper access controls. I also implement safety filters and sanitization layers to ensure LLM responses remain ethical and secure."
  }
];

export default function ContactPage() {
  const { toast } = useToast();
  const db = useFirestore();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Formspree Endpoint ID
  const FORMSPREE_ID = "mnjrggbv";

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        timeZone: 'Asia/Jakarta', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
      };
      setCurrentTime(now.toLocaleTimeString('en-US', options));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
    toast({
      title: "Copied to clipboard",
      description: `${text} has been saved.`,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        variant: "destructive",
        title: "Incomplete Form",
        description: "Please provide at least your name, email, and a message.",
      });
      return;
    }

    setIsSubmitting(true);

    // 1. Save to Firestore (Backup - Database Jakarta)
    if (db) {
      console.log("Attempting to sync with Firestore (Jakarta)...");
      try {
        const messagesRef = collection(db, 'contactMessages');
        const payload = {
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim() || 'General Inquiry',
          message: formData.message.trim(),
          createdAt: serverTimestamp(),
        };

        await addDoc(messagesRef, payload);
        console.log("Firestore sync successful!");
      } catch (error: any) {
        console.error("Firestore Sync Error Details:", error);
        console.error("Code:", error.code);
        console.error("Message:", error.message);
        // This won't stop the email from sending
      }
    } else {
      console.error("Firestore database instance not found. Check your Firebase config.");
    }

    // 2. Send to Formspree (Email Delivery)
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast({
          title: "Transmission Success",
          description: "Your message has been dispatched to my inbox. I'll get back to you soon!",
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Formspree response not OK');
      }
    } catch (err) {
      console.error("Submission error:", err);
      toast({
        variant: "destructive",
        title: "Dispatch Error",
        description: "Failed to send to email. Please check your network or try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden pt-32 lg:pt-40 pb-24 px-6 md:px-12 lg:px-16 min-h-screen">
      <section id="contact" className="max-w-7xl mx-auto space-y-32">
        {/* Top Section: Info + Chatbot */}
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-start">
          <div className="space-y-12 lg:space-y-16 w-full max-w-full">
            <div className="space-y-6 text-center lg:text-left">
              <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase px-4">Connect</Badge>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black uppercase tracking-tighter text-white">
                Get In <span className="text-primary">Touch</span>
              </h2>
              <p className="text-white/70 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                Interested in collaboration or have a project in mind? Reach out via contact details or chat with my AI assistant.
              </p>
            </div>

            <div className="space-y-8 lg:space-y-10 w-full">
              {/* Email Contact Item */}
              <div className="flex items-center gap-6 sm:gap-8 group p-2 -ml-2 rounded-3xl w-full">
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-[1.5rem] bg-white/5 flex items-center justify-center text-white border border-white/10 shrink-0 group-hover:bg-primary/10 transition-all duration-300 shadow-2xl">
                  <Mail className="w-7 h-7 lg:w-8 lg:h-8 text-primary" />
                </div>
                <div className="min-w-0 overflow-hidden flex-1">
                  <div className="text-[10px] sm:text-xs font-bold tracking-widest text-slate-500 uppercase mb-1">Email</div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-white break-all truncate">viochristian12@gmail.com</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-lg hover:bg-primary/20 text-primary"
                      onClick={() => copyToClipboard('viochristian12@gmail.com', 'email')}
                    >
                      {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Phone Contact Item */}
              <div className="flex items-center gap-6 sm:gap-8 group p-2 -ml-2 rounded-3xl w-full">
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-[1.5rem] bg-white/5 flex items-center justify-center text-white border border-white/10 shrink-0 group-hover:bg-primary/10 transition-all duration-300 shadow-2xl">
                  <Phone className="w-7 h-7 lg:w-8 lg:h-8 text-primary" />
                </div>
                <div className="min-w-0 overflow-hidden flex-1">
                  <div className="text-[10px] sm:text-xs font-bold tracking-widest text-slate-500 uppercase mb-1">Phone Number</div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-white truncate">+62 895-3426-37871</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-lg hover:bg-primary/20 text-primary"
                      onClick={() => copyToClipboard('+62895342637871', 'phone')}
                    >
                      {copiedPhone ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Location Contact Item */}
              <div className="flex items-center gap-6 sm:gap-8 group p-2 -ml-2 w-full rounded-3xl">
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-[1.5rem] bg-white/5 flex items-center justify-center text-white border border-white/10 shrink-0 group-hover:bg-primary/10 transition-all duration-300 shadow-2xl">
                  <MapPin className="w-7 h-7 lg:w-8 lg:h-8 text-primary" />
                </div>
                <div className="min-w-0 overflow-hidden flex-1">
                  <div className="text-[10px] sm:text-xs font-bold tracking-widest text-slate-500 uppercase mb-1">Location</div>
                  <div className="space-y-1">
                    <div className="text-lg font-semibold text-white break-words">Semarang, Central Java, ID</div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-primary/60">
                        <Clock className="w-3 h-3" /> {currentTime}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Local Time (GMT+7)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-12 border-t border-white/10 grid grid-cols-2 gap-4 w-full">
              <Button variant="outline" size="lg" className="rounded-2xl px-6 h-14 font-headline font-bold text-sm hover:bg-white/5 border-white/10 text-white transition-all w-full" asChild>
                <a href="https://www.linkedin.com/in/silvio-christian-joe" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-3 w-5 h-5 text-primary" /> LinkedIn
                </a>
              </Button>
              <Button variant="outline" size="lg" className="rounded-2xl px-6 h-14 font-headline font-bold text-sm hover:bg-white/5 border-white/10 text-white transition-all w-full" asChild>
                <a href="https://github.com/viochris" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-3 w-5 h-5 text-primary" /> GitHub
                </a>
              </Button>
              <Button variant="outline" size="lg" className="rounded-2xl px-6 h-14 font-headline font-bold text-sm hover:bg-white/5 border-white/10 text-white transition-all w-full" asChild>
                <a href="https://www.kaggle.com/viochristian" target="_blank" rel="noopener noreferrer">
                  <KaggleIcon className="mr-3 w-5 h-5 text-primary" /> Kaggle
                </a>
              </Button>
              <Button variant="outline" size="lg" className="rounded-2xl px-6 h-14 font-headline font-bold text-sm hover:bg-white/5 border-white/10 text-white transition-all w-full" asChild>
                <a href="https://www.instagram.com/silvio.codes?igsh=eTgxcGMybjNiYTlj" target="_blank" rel="noopener noreferrer">
                  <Instagram className="mr-3 w-5 h-5 text-primary" /> Instagram
                </a>
              </Button>
            </div>
          </div>

          {/* Right Side: Chatbot */}
          <div className="relative mt-16 lg:mt-0 w-full lg:sticky lg:top-40 overflow-hidden">
            <div className="absolute -inset-10 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="relative w-full overflow-hidden rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10">
               <Chatbot />
            </div>
          </div>
        </div>

        {/* Bottom Section: Contact Form + FAQ */}
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-start">
          {/* Contact Form */}
          <div className="p-8 md:p-12 glass rounded-[3rem] border-primary/10 relative overflow-hidden space-y-10 group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -mr-32 -mt-32" />
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MessageSquare className="text-primary w-6 h-6" />
                <h3 className="text-2xl font-headline font-bold text-white uppercase tracking-widest">Send a Message</h3>
              </div>
              <p className="text-white/50 text-sm font-medium">Use this form for formal inquiries or technical consultation.</p>
            </div>

            <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] ml-1">Your Name</label>
                  <Input 
                    placeholder="John Doe" 
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-primary text-white" 
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] ml-1">Email Address</label>
                  <Input 
                    type="email" 
                    placeholder="john@example.com" 
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-primary text-white" 
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] ml-1">Subject</label>
                <Input 
                  placeholder="Project Inquiry" 
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  className="h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-primary text-white" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] ml-1">Your Message</label>
                <Textarea 
                  placeholder="How can I help you?" 
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="min-h-[150px] bg-white/5 border-white/10 rounded-2xl focus:ring-primary text-white p-6" 
                  required
                />
              </div>
              <Button 
                type="submit" 
                size="lg" 
                disabled={isSubmitting}
                className="w-full h-16 rounded-2xl font-headline font-bold uppercase tracking-widest shadow-xl shadow-primary/20 group"
              >
                {isSubmitting ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Dispatching...</>
                ) : (
                  <>Dispatch Message <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                )}
              </Button>
            </form>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <HelpCircle className="text-primary w-6 h-6" />
                <h3 className="text-2xl font-headline font-bold text-white uppercase tracking-widest">Technical FAQ</h3>
              </div>
              <p className="text-white/60 font-medium leading-relaxed">Frequently asked questions about my workflow, availability, and technical expertise.</p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-none">
                  <AccordionTrigger className="flex p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 hover:bg-primary/5 transition-all text-left font-bold text-white hover:no-underline group [&[data-state=open]]:bg-primary/5 [&[data-state=open]]:border-primary/50">
                    <span className="text-sm md:text-base pr-4">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="p-6 text-white/60 text-sm leading-relaxed font-medium bg-white/[0.02] rounded-b-2xl -mt-4 border-x border-b border-white/5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Final Contact Note */}
            <div className="p-8 rounded-[2rem] bg-primary/5 border border-primary/20 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Clock className="text-primary w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">Quick Response</h4>
                <p className="text-xs text-white/50 leading-relaxed font-medium">I typically respond to serious inquiries within 24-48 business hours. For urgent technical consultation, please mention [URGENT] in the subject.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
