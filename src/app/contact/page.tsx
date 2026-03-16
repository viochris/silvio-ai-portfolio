"use client"

import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Instagram, BarChart3 } from 'lucide-react';
import { Chatbot } from '@/components/Chatbot';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function ContactPage() {
  return (
    <div className="w-full max-w-full overflow-x-hidden pt-32 lg:pt-40 pb-24 px-6 md:px-12 lg:px-16 min-h-screen">
      <section id="contact" className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 lg:gap-32 items-start">
        {/* Left Column: Contact Information */}
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
            <a 
              href="mailto:viochristian12@gmail.com" 
              className="flex items-center gap-6 sm:gap-8 group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg p-2 -ml-2 rounded-3xl w-full"
            >
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-[1.5rem] bg-white/5 flex items-center justify-center text-white group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary/50 transition-all duration-300 shadow-2xl border border-white/10 shrink-0">
                <Mail className="w-7 h-7 lg:w-8 lg:h-8" />
              </div>
              <div className="min-w-0 overflow-hidden flex-1">
                <div className="text-[10px] sm:text-xs font-bold tracking-widest text-slate-500 uppercase mb-1">Email</div>
                <div className="text-lg font-semibold text-white break-all whitespace-normal group-hover:text-primary transition-colors">viochristian12@gmail.com</div>
              </div>
            </a>

            {/* Phone Contact Item */}
            <a 
              href="tel:+62895342637871" 
              className="flex items-center gap-6 sm:gap-8 group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg p-2 -ml-2 rounded-3xl w-full"
            >
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-[1.5rem] bg-white/5 flex items-center justify-center text-white group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary/50 transition-all duration-300 shadow-2xl border border-white/10 shrink-0">
                <Phone className="w-7 h-7 lg:w-8 lg:h-8" />
              </div>
              <div className="min-w-0 overflow-hidden flex-1">
                <div className="text-[10px] sm:text-xs font-bold tracking-widest text-slate-500 uppercase mb-1">Phone Number</div>
                <div className="text-lg font-semibold text-white break-all whitespace-normal group-hover:text-primary transition-colors">+62 895-3426-37871</div>
              </div>
            </a>

            {/* Location Contact Item */}
            <div className="flex items-center gap-6 sm:gap-8 group p-2 -ml-2 w-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg rounded-3xl cursor-default">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-[1.5rem] bg-white/5 flex items-center justify-center text-white border border-white/10 shrink-0 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary/50 transition-all duration-300 shadow-2xl">
                <MapPin className="w-7 h-7 lg:w-8 lg:h-8" />
              </div>
              <div className="min-w-0 overflow-hidden flex-1">
                <div className="text-[10px] sm:text-xs font-bold tracking-widest text-slate-500 uppercase mb-1">Location</div>
                <div className="text-lg font-semibold text-white break-words group-hover:text-primary transition-colors">Semarang, Central Java, Indonesia</div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="pt-12 border-t border-white/10 flex flex-wrap items-center gap-4 justify-center lg:justify-start w-full">
            <Button variant="outline" size="lg" className="rounded-2xl px-6 h-14 font-headline font-bold text-sm hover:bg-white/5 border-white/10 text-white min-w-[140px] flex-1 sm:flex-none transition-all" asChild>
              <a href="https://www.linkedin.com/in/silvio-christian-joe" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-3 w-5 h-5 text-primary" /> LinkedIn
              </a>
            </Button>
            <Button variant="outline" size="lg" className="rounded-2xl px-6 h-14 font-headline font-bold text-sm hover:bg-white/5 border-white/10 text-white min-w-[140px] flex-1 sm:flex-none transition-all" asChild>
              <a href="https://github.com/viochris" target="_blank" rel="noopener noreferrer">
                <Github className="mr-3 w-5 h-5 text-primary" /> GitHub
              </a>
            </Button>
            <Button variant="outline" size="lg" className="rounded-2xl px-6 h-14 font-headline font-bold text-sm hover:bg-white/5 border-white/10 text-white min-w-[140px] flex-1 sm:flex-none transition-all" asChild>
              <a href="https://www.kaggle.com/viochristian" target="_blank" rel="noopener noreferrer">
                <BarChart3 className="mr-3 w-5 h-5 text-primary" /> Kaggle
              </a>
            </Button>
            <Button variant="outline" size="lg" className="rounded-2xl px-6 h-14 font-headline font-bold text-sm hover:bg-white/5 border-white/10 text-white min-w-[140px] flex-1 sm:flex-none transition-all" asChild>
              <a href="https://www.instagram.com/silvio.codes?igsh=eTgxcGMybjNiYTlj" target="_blank" rel="noopener noreferrer">
                <Instagram className="mr-3 w-5 h-5 text-primary" /> Instagram
              </a>
            </Button>
          </div>
        </div>

        {/* Right Column: AI Assistant (Chatbot) */}
        <div className="relative mt-16 lg:mt-0 w-full lg:sticky lg:top-40 overflow-hidden">
          <div className="absolute -inset-10 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="relative w-full overflow-hidden rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10">
             <Chatbot />
          </div>
        </div>
      </section>
    </div>
  );
}