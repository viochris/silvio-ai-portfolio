
"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Moon, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Skills', href: '/skills' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-headline font-bold text-xl tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">S</div>
          SILVIO.AI
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-headline font-bold uppercase tracking-widest">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={cn(
                "hover:text-primary transition-colors",
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
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
  );
};
