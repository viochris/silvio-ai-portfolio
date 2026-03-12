"use client"

import React from 'react';
import { Mail, Phone, MapPin, MessageSquare, Linkedin, Github, Twitter } from 'lucide-react';
import { Chatbot } from '@/components/Chatbot';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 px-4 min-h-screen">
      <section id="contact" className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24">
        <div className="space-y-12">
          <div className="space-y-4">
            <Badge variant="outline" className="text-primary tracking-[0.3em] uppercase">Connect</Badge>
            <h2 className="text-5xl font-headline font-black uppercase tracking-tighter text-foreground">
              Get In <span className="text-primary">Touch</span>
            </h2>
            <p className="text-muted-foreground text-xl leading-relaxed max-w-md">
              Interested in collaboration or have a project in mind? Reach out via contact details or chat with my AI assistant.
            </p>
          </div>

          <div className="space-y-10">
            <div className="flex items-center gap-8 group">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-xl border border-border/50">
                <Mail className="w-7 h-7" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1">Email Inquiry</div>
                <div className="text-xl font-headline font-bold text-foreground">silvio.christian@example.com</div>
              </div>
            </div>

            <div className="flex items-center gap-8 group">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-xl border border-border/50">
                <Phone className="w-7 h-7" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1">Voice Call</div>
                <div className="text-xl font-headline font-bold text-foreground">+62 812-3456-7890</div>
              </div>
            </div>

            <div className="flex items-center gap-8 group">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-xl border border-border/50">
                <MapPin className="w-7 h-7" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1">Base Location</div>
                <div className="text-xl font-headline font-bold text-foreground">Jakarta, Indonesia</div>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-border/50 flex flex-wrap gap-4">
            <Button variant="outline" size="lg" className="rounded-2xl px-10 font-headline font-bold hover:bg-primary/5 border-primary/20 text-foreground">
              <Linkedin className="mr-2 w-4 h-4 text-primary" /> LinkedIn
            </Button>
            <Button variant="outline" size="lg" className="rounded-2xl px-10 font-headline font-bold hover:bg-primary/5 border-primary/20 text-foreground">
              <Github className="mr-2 w-4 h-4 text-primary" /> GitHub
            </Button>
             <Button variant="outline" size="lg" className="rounded-2xl px-10 font-headline font-bold hover:bg-primary/5 border-primary/20 text-foreground">
              <Twitter className="mr-2 w-4 h-4 text-primary" /> Twitter
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-10 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
          <div className="relative">
             <Chatbot />
          </div>
        </div>
      </section>
    </div>
  );
}