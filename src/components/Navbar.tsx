
"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Download, Menu, ExternalLink, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useNavigation } from '@/app/layout';
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
  const [showViewer, setShowViewer] = useState(false);
  
  // Use global navigation context
  const { setIsReturning, setActiveTab } = useNavigation();

  const cvRawLink = "/vio-cv.pdf";

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Skills', href: '/skills' },
    { name: 'Contact', href: '/contact' },
  ];

  const CVDialogContent = () => (
    <DialogContent className={cn(
      "bg-card/95 backdrop-blur-xl border-border rounded-[2rem] transition-all duration-300 overflow-hidden",
      showViewer ? "sm:max-w-4xl w-[95vw] h-[90vh] flex flex-col" : "sm:max-w-md"
    )}>
      <DialogHeader className={showViewer ? "pb-4 border-b border-border" : ""}>
        <div className="flex items-center justify-between pr-8">
          <DialogTitle className="text-2xl font-headline font-bold text-foreground">
            {showViewer ? "Curriculum Vitae Preview" : "Curriculum Vitae"}
          </DialogTitle>
          {showViewer && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowViewer(false)}
              className="flex items-center gap-2 text-primary hover:bg-primary/10"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
          )}
        </div>
        {!showViewer && (
          <DialogDescription className="text-muted-foreground font-medium">
            Choose how you would like to access Silvio's professional profile.
          </DialogDescription>
        )}
      </DialogHeader>
      
      {showViewer ? (
        <div className="flex-1 w-full mt-4 overflow-hidden rounded-xl border border-border bg-black/20">
          <iframe 
            src={`${cvRawLink}#view=FitH&toolbar=0`} 
            className="w-full h-full border-none"
            title="CV Preview"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-4 py-4">
          <Button className="w-full h-16 rounded-2xl gap-3 font-headline font-bold uppercase tracking-widest text-xs shadow-lg shadow-primary/20" asChild>
            <a href={cvRawLink} download="vio-cv.pdf">
              <Download className="w-5 h-5" /> Download PDF Version
            </a>
          </Button>
          <Button 
            variant="outline" 
            className="w-full h-16 rounded-2xl gap-3 font-headline font-bold uppercase tracking-widest text-xs border-white/10 hover:bg-white/5"
            onClick={() => setShowViewer(true)}
          >
            <ExternalLink className="w-5 h-5 text-primary" /> View CV
          </Button>
        </div>
      )}
      
      {!showViewer && (
        <div className="text-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-50">
          Last updated: January 2024
        </div>
      )}
    </DialogContent>
  );

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          onClick={() => { 
            setIsReturning(false); 
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); 
            setActiveTab('Home'); 
          }} 
          className="flex items-center gap-2 sm:gap-3 group focus:outline-none"
        >
          <img 
            src="/icon.png" 
            alt="Silvio.AI Logo" 
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl object-cover shadow-[0_0_10px_rgba(6,182,212,0.1)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300" 
          />
          <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
            SILVIO<span className="text-primary">.AI</span>
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10 text-sm font-headline font-bold uppercase tracking-widest">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              onClick={() => {
                setIsReturning(false);
                setActiveTab(link.name);
              }}
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
          <Dialog open={isCVOpen} onOpenChange={(open) => {
            setIsCVOpen(open);
            if (!open) setShowViewer(false);
          }}>
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
                    <img 
                      src="/icon.png" 
                      alt="Silvio.AI Logo" 
                      className="w-8 h-8 rounded-lg object-cover" 
                    />
                    SILVIO.AI
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col p-6 gap-6 mt-4">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.href} 
                      href={link.href}
                      onClick={() => {
                        setIsOpen(false);
                        setIsReturning(false);
                        setActiveTab(link.name);
                      }}
                      className={cn(
                        "text-lg font-headline font-bold uppercase tracking-widest transition-colors py-2",
                        pathname === link.href ? "text-primary border-l-4 border-primary pl-4" : "text-foreground/70 pl-4 hover:text-primary"
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="pt-6 border-t border-border mt-4">
                    <Dialog open={isCVOpen} onOpenChange={(open) => {
                      setIsCVOpen(open);
                      if (!open) setShowViewer(false);
                    }}>
                      <DialogTrigger asChild>
                        <Button className="w-full gap-2 font-headline uppercase font-bold tracking-widest h-14 rounded-2xl">
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
