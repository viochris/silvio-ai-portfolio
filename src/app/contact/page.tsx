
"use client"

import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Chatbot } from '@/components/Chatbot';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 px-4">
      <section id="contact" className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
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
      </section>
    </div>
  );
}
