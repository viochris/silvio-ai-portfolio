
"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Download, Menu, ExternalLink, FileText, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isCVOpen, setIsCVOpen] = useState(false);

  const cvDriveLink = "https://drive.google.com/file/d/1RiqkgvDZP4c1MoXTp2-8ZTnnVTo8fen5/view?usp=sharing";
  const cvRawLink = "https://github.com/viochris/viochris/raw/main/CV_Silvio_Christian_Joe_Data_Scientist.pdf";

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Skills', href: '/skills' },
    { name: 'Contact', href: '/contact' },
  ];

  const CVDialogContent = () => (
    <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-xl border-border rounded-[2rem]">
      <DialogHeader>
        <DialogTitle className="text-2xl font-headline font-bold text-foreground">Curriculum Vitae</DialogTitle>
        <DialogDescription className="text-muted-foreground font-medium">
          Choose how you would like to access Silvio's professional profile.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-4 py-4">
        <Button className="w-full h-16 rounded-2xl gap-3 font-headline font-bold uppercase tracking-widest text-xs shadow-lg shadow-primary/20" asChild>
          <a href={cvRawLink} target="_blank" rel="noopener noreferrer">
            <Download className="w-5 h-5" /> Download PDF Version
          </a>
        </Button>
        <Button variant="outline" className="w-full h-16 rounded-2xl gap-3 font-headline font-bold uppercase tracking-widest text-xs border-white/10 hover:bg-white/5" asChild>
          <a href={cvDriveLink} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-5 h-5 text-primary" /> View on Google Drive
          </a>
        </Button>
      </div>
      <div className="text-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-50">
        Last updated: January 2024
      </div>
    </DialogContent>
  );

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
          <Dialog open={isCVOpen} onOpenChange={setIsCVOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="hidden sm:flex gap-2 font-headline uppercase font-bold text-xs tracking-widest px-6 h-10 rounded-xl shadow-lg shadow-primary/10">
                <Download className="w-4 h-4" /> CV
              </Button>
            </DialogTrigger>
            <CVDialogContent />
          </Dialog>

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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full gap-2 font-headline uppercase font-bold tracking-widest h-14 rounded-2xl" onClick={() => setIsOpen(false)}>
                          <Download className="w-4 h-4" /> Download CV
                        </Button>
                      </DialogTrigger>
                      <CVDialogContent />
                    </Dialog>
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
