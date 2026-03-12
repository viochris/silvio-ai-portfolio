
"use client"

import React, { useState, useEffect } from 'react';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { BinaryBackground } from '@/components/BinaryBackground';
import { BootLoader } from '@/components/BootLoader';
import { AnimatePresence, motion } from 'framer-motion';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isBooting, setIsBooting] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Force dark mode on the HTML element
    document.documentElement.classList.add('dark');
  }, []);

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
              <footer className="py-10 px-4 border-t border-border bg-muted/20">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-white">
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
            </motion.div>
          )}
        </AnimatePresence>
      </body>
    </html>
  );
}
