
"use client"

import React, { useState, useEffect } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { BinaryBackground } from '@/components/BinaryBackground';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  if (!mounted) {
    return (
      <html lang="en">
        <body className="bg-[#21212c]" />
      </html>
    );
  }

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=Source+Code+Pro:wght@400;500;600&display=swap" rel="stylesheet" />
        <title>Silvio.AI Portfolio | Silvio Christian, Joe</title>
      </head>
      <body className="font-body antialiased transition-colors duration-300">
        <BinaryBackground theme={theme} />
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main className="min-h-screen">
          {children}
        </main>
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
      </body>
    </html>
  );
}
