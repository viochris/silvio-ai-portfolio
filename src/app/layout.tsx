
"use client"

import React, { useState, useEffect, createContext, useContext } from 'react';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { BinaryBackground } from '@/components/BinaryBackground';
import { BootLoader } from '@/components/BootLoader';
import { AnimatePresence, motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

// Create a context to share navigation state across the app
interface NavigationContextType {
  isReturning: boolean;
  setIsReturning: (val: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  credentialTab: 'Certifications' | 'Badges';
  setCredentialTab: (tab: 'Certifications' | 'Badges') => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) throw new Error("useNavigation must be used within NavigationProvider");
  return context;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isBooting, setIsBooting] = useState(true);
  const [mounted, setMounted] = useState(false);
  
  // Navigation States
  const [isReturning, setIsReturning] = useState(false);
  const [activeTab, setActiveTab] = useState('Skills');
  const [credentialTab, setCredentialTab] = useState<'Certifications' | 'Badges'>('Certifications');

  useEffect(() => {
    setMounted(true);
    document.documentElement.classList.add('dark');
  }, []);

  // CENTRALIZED SCROLL LOGIC
  useEffect(() => {
    if (activeTab === 'Skills' && isReturning) {
      // We are returning from Credentials to Skills. Scroll to the specific section.
      const timer = setTimeout(() => {
        const targetId = credentialTab === 'Certifications' ? 'certifications-section' : 'badges-section';
        const element = document.getElementById(targetId);
        if (element) {
          const yOffset = -100; // Adjust for navbar
          const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
        setIsReturning(false); // Reset flag after scrolling
      }, 150); // Slightly longer delay to ensure DOM is fully rendered
      return () => clearTimeout(timer);
    } else {
      // For ANY OTHER tab change (including clicking Skills from Navbar), FORCE scroll to top immediately.
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      
      // Fallback: Force it again after a tiny delay in case React rendering overrides it
      const fallbackTimer = setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }, 50);
      return () => clearTimeout(fallbackTimer);
    }
  }, [activeTab, isReturning, credentialTab]);

  if (!mounted) {
    return (
      <html lang="en" className="dark">
        <body className="bg-black" />
      </html>
    );
  }

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=Source+Code+Pro:wght@400;500;600&display=swap" rel="stylesheet" />
        <title>Silvio.AI Portfolio | Silvio Christian Joe</title>
      </head>
      <body className="font-body antialiased bg-black overflow-x-hidden">
        <NavigationContext.Provider value={{ 
          isReturning, setIsReturning, 
          activeTab, setActiveTab, 
          credentialTab, setCredentialTab 
        }}>
          <AnimatePresence mode="wait">
            {isBooting ? (
              <BootLoader key="bootloader" onComplete={() => setIsBooting(false)} />
            ) : (
              <motion.div
                key="main-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative min-h-screen"
              >
                <BinaryBackground />
                <Navbar />
                <main className="min-h-screen">
                  {children}
                </main>
                
                <footer className="relative z-10 bg-black/80 backdrop-blur-xl border-t border-white/10 pt-20 pb-10 px-6 md:px-12 lg:px-16">
                  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
                    <div className="space-y-8">
                      <div className="text-3xl font-headline font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
                        SILVIO.AI
                      </div>
                      <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 w-fit">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">
                          Open for Data Science roles & collaborations
                        </span>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <h4 className="text-sm font-headline font-bold uppercase tracking-widest text-white">Quick Links</h4>
                      <nav className="flex flex-col gap-4">
                        {[
                          { name: 'Home', href: '/' },
                          { name: 'About', href: '/about' },
                          { name: 'Projects', href: '/projects' },
                          { name: 'Skills', href: '/skills' },
                          { name: 'Contact', href: '/contact' }
                        ].map((item) => (
                          <Link 
                            key={item.name} 
                            href={item.href}
                            onClick={() => {
                              if (item.name === 'Skills') {
                                setIsReturning(false);
                                setActiveTab('Skills');
                              }
                            }}
                            className="text-slate-400 hover:text-primary transition-colors w-fit text-sm font-medium"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </nav>
                    </div>

                    <div className="space-y-8">
                      <h4 className="text-sm font-headline font-bold uppercase tracking-widest text-white">Connect</h4>
                      <div className="flex gap-4">
                        {[
                          { icon: <Github className="w-5 h-5" />, href: "https://github.com/viochris" },
                          { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/silvio-christian-joe" },
                          { icon: <Mail className="w-5 h-5" />, href: "mailto:viochristian12@gmail.com" }
                        ].map((social, i) => (
                          <a 
                            key={i} 
                            href={social.href} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/10 hover:border-primary/20 transition-all transform hover:-translate-y-1 shadow-xl"
                          >
                            {social.icon}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="max-w-7xl mx-auto pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 text-center md:text-left">
                      © 2026 SILVIO CHRISTIAN, JOE. ALL RIGHTS RESERVED.
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
                      <span className="flex items-center gap-2">
                        HANDCRAFTED WITH <span className="text-primary">NEXT.JS</span>
                      </span>
                      <span className="hidden md:inline-block w-1 h-1 bg-white/10 rounded-full" />
                      <span className="flex items-center gap-2">
                        POWERED BY <span className="text-primary">GENKIT</span>
                      </span>
                    </div>
                  </div>
                </footer>
              </motion.div>
            )}
          </AnimatePresence>
        </NavigationContext.Provider>
      </body>
    </html>
  );
}
