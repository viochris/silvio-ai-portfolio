"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Download, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const cvLink = "https://drive.google.com/file/d/1RiqkgvDZP4c1MoXTp2-8ZTnnVTo8fen5/view?usp=sharing";

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Skills', href: '/skills' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-headline font-bold text-xl tracking-tighter flex items-center gap-2 text-foreground">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">S</div>
          SILVIO.AI
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10 text-sm font-headline font-bold uppercase tracking-widest">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={cn(
                "hover:text-primary transition-colors",
                pathname === link.href ? "text-primary" : "text-foreground/80"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Actions (CV & Mobile Menu) */}
        <div className="flex items-center gap-4">
          <Button size="sm" className="hidden sm:flex gap-2 font-headline uppercase font-bold text-xs tracking-widest px-6" asChild>
            <a href={cvLink} target="_blank" rel="noopener noreferrer">
              <Download className="w-4 h-4" /> CV
            </a>
          </Button>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background/95 backdrop-blur-xl border-border w-[300px] p-0">
                <SheetHeader className="p-6 border-b border-border">
                  <SheetTitle className="text-left font-headline font-bold text-xl tracking-tighter flex items-center gap-2 text-foreground">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">S</div>
                    SILVIO.AI
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col p-6 gap-6 mt-4">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.href} 
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-lg font-headline font-bold uppercase tracking-widest transition-colors py-2",
                        pathname === link.href ? "text-primary border-l-4 border-primary pl-4" : "text-foreground/70 pl-4 hover:text-primary"
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="pt-6 border-t border-border mt-4">
                    <Button className="w-full gap-2 font-headline uppercase font-bold tracking-widest" asChild onClick={() => setIsOpen(false)}>
                      <a href={cvLink} target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4" /> Download CV
                      </a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
