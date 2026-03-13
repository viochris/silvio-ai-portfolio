"use client"

import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter } from 'lucide-react';
import { Chatbot } from '@/components/Chatbot';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function ContactPage() {
  return (
    <div className="pt-32 lg:pt-40 pb-24 px-6 md:px-12 lg:px-16 min-h-screen">
      <section id="contact" className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 lg:gap-32 items-start">
        {/* Left Column: Contact Information */}
        <div className="space-y-12 lg:space-y-16">
          <div className="space-y-6 text-center lg:text-left">
            <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase px-4">Connect</Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black uppercase tracking-tighter text-white">
              Get In <span className="text-primary">Touch</span>
            </h2>
            <p className="text-white/70 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
              Interested in collaboration or have a project in mind? Reach out via contact details or chat with my AI assistant.
            </p>
          </div>

          <div className="space-y-10 lg:space-y-12">
            {/* Email Contact Item */}
            <div className="flex items-start gap-8 group">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-[1.5rem] bg-white/5 flex items-center justify-center text-white group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-2xl border border-white/10 shrink-0">
                <Mail className="w-7 h-7 lg:w-8 lg:h-8" />
              </div>
              <div className="min-w-0 overflow-hidden pt-2">
                <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/50 mb-2">Email Inquiry</div>
                <div className="text-xl lg:text-2xl font-headline font-bold text-white break-all md:break-words">viochristian12@gmail.com</div>
              </div>
            </div>

            {/* Phone Contact Item */}
            <div className="flex items-start gap-8 group">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-[1.5rem] bg-white/5 flex items-center justify-center text-white group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-2xl border border-white/10 shrink-0">
                <Phone className="w-7 h-7 lg:w-8 lg:h-8" />
              </div>
              <div className="min-w-0 overflow-hidden pt-2">
                <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/50 mb-2">Voice Call</div>
                <div className="text-xl lg:text-2xl font-headline font-bold text-white break-all md:break-words">62895342637871</div>
              </div>
            </div>

            {/* Location Contact Item */}
            <div className="flex items-start gap-8 group">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-[1.5rem] bg-white/5 flex items-center justify-center text-white group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-2xl border border-white/10 shrink-0">
                <MapPin className="w-7 h-7 lg:w-8 lg:h-8" />
              </div>
              <div className="min-w-0 overflow-hidden pt-2">
                <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/50 mb-2">Base Location</div>
                <div className="text-xl lg:text-2xl font-headline font-bold text-white break-words">Indonesia</div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="pt-12 border-t border-white/10 flex flex-wrap gap-5 justify-center lg:justify-start">
            <Button variant="outline" size="lg" className="rounded-2xl px-10 h-14 font-headline font-bold text-sm hover:bg-white/5 border-white/10 text-white flex-1 md:flex-none transition-all">
              <Linkedin className="mr-3 w-5 h-5 text-primary" /> LinkedIn
            </Button>
            <Button variant="outline" size="lg" className="rounded-2xl px-10 h-14 font-headline font-bold text-sm hover:bg-white/5 border-white/10 text-white flex-1 md:flex-none transition-all">
              <Github className="mr-3 w-5 h-5 text-primary" /> GitHub
            </Button>
             <Button variant="outline" size="lg" className="rounded-2xl px-10 h-14 font-headline font-bold text-sm hover:bg-white/5 border-white/10 text-white flex-1 md:flex-none transition-all">
              <Twitter className="mr-3 w-5 h-5 text-primary" /> Twitter
            </Button>
          </div>
        </div>

        {/* Right Column: AI Assistant (Chatbot) */}
        <div className="relative mt-16 lg:mt-0 w-full lg:sticky lg:top-40">
          <div className="absolute -inset-10 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="relative w-full overflow-hidden rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10">
             <Chatbot />
          </div>
        </div>
      </section>
    </div>
  );
}