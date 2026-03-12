"use client"

import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter } from 'lucide-react';
import { Chatbot } from '@/components/Chatbot';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 px-4 min-h-screen">
      <section id="contact" className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Left Column: Contact Information */}
        <div className="space-y-10 lg:space-y-12">
          <div className="space-y-4 text-center lg:text-left">
            <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase">Connect</Badge>
            <h2 className="text-4xl md:text-5xl font-headline font-black uppercase tracking-tighter text-white">
              Get In <span className="text-primary">Touch</span>
            </h2>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-md mx-auto lg:mx-0">
              Interested in collaboration or have a project in mind? Reach out via contact details or chat with my AI assistant.
            </p>
          </div>

          <div className="space-y-8 md:space-y-10">
            {/* Email Contact Item */}
            <div className="flex items-start gap-5 md:gap-8 group">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-xl border border-white/10 shrink-0">
                <Mail className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <div className="min-w-0 overflow-hidden">
                <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-1">Email Inquiry</div>
                <div className="text-lg md:text-xl font-headline font-bold text-white break-all md:break-words">viochristian12@gmail.com</div>
              </div>
            </div>

            {/* Phone Contact Item */}
            <div className="flex items-start gap-5 md:gap-8 group">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-xl border border-white/10 shrink-0">
                <Phone className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <div className="min-w-0 overflow-hidden">
                <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-1">Voice Call</div>
                <div className="text-lg md:text-xl font-headline font-bold text-white break-all md:break-words">62895342637871</div>
              </div>
            </div>

            {/* Location Contact Item */}
            <div className="flex items-start gap-5 md:gap-8 group">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-xl border border-white/10 shrink-0">
                <MapPin className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <div className="min-w-0 overflow-hidden">
                <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-1">Base Location</div>
                <div className="text-lg md:text-xl font-headline font-bold text-white break-words">Indonesia</div>
              </div>
            </div>
          </div>

          {/* Social Links - Responsive Layout */}
          <div className="pt-8 md:pt-12 border-t border-white/10 flex flex-wrap gap-3 md:gap-4 justify-center lg:justify-start">
            <Button variant="outline" size="lg" className="rounded-2xl px-6 md:px-10 font-headline font-bold text-xs md:text-sm hover:bg-white/5 border-white/10 text-white flex-1 md:flex-none">
              <Linkedin className="mr-2 w-4 h-4 text-primary" /> LinkedIn
            </Button>
            <Button variant="outline" size="lg" className="rounded-2xl px-6 md:px-10 font-headline font-bold text-xs md:text-sm hover:bg-white/5 border-white/10 text-white flex-1 md:flex-none">
              <Github className="mr-2 w-4 h-4 text-primary" /> GitHub
            </Button>
             <Button variant="outline" size="lg" className="rounded-2xl px-6 md:px-10 font-headline font-bold text-xs md:text-sm hover:bg-white/5 border-white/10 text-white flex-1 md:flex-none">
              <Twitter className="mr-2 w-4 h-4 text-primary" /> Twitter
            </Button>
          </div>
        </div>

        {/* Right Column: AI Assistant (Chatbot) */}
        <div className="relative mt-12 lg:mt-0 w-full">
          <div className="absolute -inset-10 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
          <div className="relative w-full overflow-hidden rounded-[2rem] shadow-2xl border border-white/10">
             <Chatbot />
          </div>
        </div>
      </section>
    </div>
  );
}