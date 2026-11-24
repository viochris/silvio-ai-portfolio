"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Download, Menu, ExternalLink, ArrowLeft, Palette, Search, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResumePreviewFrame } from '@/components/ResumePreviewFrame';
import { cn } from '@/lib/utils';
import { useNavigation, type Vibe } from '@/context/NavigationContext';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CV_RAW_LINK = "/Silvio-Christian-Joe-resume.pdf";
const CV_DOWNLOAD_LINK = "/api/resume?download=1";

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Skills', href: '/skills' },
  { name: 'Contact', href: '/contact' },
];

const VIBE_OPTIONS: { id: Vibe; label: string; dotClass: string }[] = [
  { id: 'purple', label: 'Synth Purple', dotClass: 'bg-purple-500' },
  { id: 'blue', label: 'Neural Blue', dotClass: 'bg-blue-500' },
  { id: 'lime', label: 'Cyber Lime', dotClass: 'bg-lime-500' },
  { id: 'red', label: 'Volcanic Red', dotClass: 'bg-red-500' },
  { id: 'amber', label: 'Amber Circuit', dotClass: 'bg-amber-500' },
  { id: 'rose', label: 'Neon Rose', dotClass: 'bg-rose-500' },
];

interface CVDialogBodyProps {
  showViewer: boolean;
  onToggleViewer: (show: boolean) => void;
}

const CVDialogBody: React.FC<CVDialogBodyProps> = ({ showViewer, onToggleViewer }) => (
  <DialogContent
    className={cn(
      "bg-card/95 backdrop-blur-xl border-border rounded-2xl transition-all duration-200 overflow-hidden",
      showViewer ? "sm:max-w-4xl w-[95vw] h-[90vh] flex flex-col" : "sm:max-w-md"
    )}
  >
    <DialogHeader className={cn(showViewer ? "pb-4 border-b border-border pr-10" : "text-left")}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <DialogTitle className="text-2xl font-headline font-bold text-foreground">
            {showViewer ? "Curriculum Vitae Preview" : "Curriculum Vitae"}
          </DialogTitle>
          <DialogDescription
            className={cn(
              "text-muted-foreground font-medium text-sm leading-relaxed",
              showViewer && "sr-only"
            )}
          >
            {showViewer
              ? "Preview of Silvio Christian, Joe's professional resume."
              : "Choose how you would like to access Silvio's resume."}
          </DialogDescription>
        </div>
        {showViewer && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onToggleViewer(false)}
            className="flex items-center gap-2 text-primary hover:bg-primary/10 shrink-0"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back
          </Button>
        )}
      </div>
    </DialogHeader>

    {showViewer ? (
      <ResumePreviewFrame downloadHref={CV_DOWNLOAD_LINK} rawPdfHref={CV_RAW_LINK} />
    ) : (
      <div className="flex flex-col gap-3 py-4">
        <Button
          className="w-full h-12 rounded-xl gap-2.5 font-headline font-bold uppercase tracking-wider text-xs"
          asChild
        >
          <a href={CV_DOWNLOAD_LINK} download="Silvio-Christian-Joe-resume.pdf">
            <Download className="w-4 h-4" aria-hidden="true" /> Download PDF Version
          </a>
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full h-12 rounded-xl gap-2.5 font-headline font-bold uppercase tracking-wider text-xs border-border hover:bg-white/5"
          onClick={() => onToggleViewer(true)}
        >
          <ExternalLink className="w-4 h-4 text-primary" aria-hidden="true" /> View Inline Preview
        </Button>
      </div>
    )}
  </DialogContent>
);

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isCVOpen, setIsCVOpen] = useState(false);
  const [showViewer, setShowViewer] = useState(false);

  const { setIsReturning, setActiveTab, vibe, setVibe } = useNavigation();

  return (
    <header className="fixed top-0 w-full z-50 glass-nav">
      <nav aria-label="Main navigation" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-16 sm:h-20 flex items-center justify-between">
        <Link
          href="/"
          onClick={() => {
            setIsReturning(false);
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            setActiveTab('Home');
          }}
          className="flex items-center gap-2.5 group shrink-0"
        >
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg overflow-hidden border border-border/60">
            <Image
              src="/icon.png"
              alt="Silvio.AI Logo"
              fill
              sizes="(max-width: 768px) 32px, 36px"
              className="rounded-lg object-cover ring-1 ring-white/10 group-hover:ring-primary/50 transition-all duration-200"
            />
          </div>
          <span className="text-lg sm:text-xl font-headline font-black text-white tracking-tight">
            SILVIO<span className="text-primary">.AI</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 lg:gap-10 text-xs font-headline font-bold uppercase tracking-widest">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.name === 'Projects' && pathname === '/repository');

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  setIsReturning(false);
                  setActiveTab(link.name);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  "py-2 transition-colors duration-150 hover:text-primary",
                  isActive ? "text-primary" : "text-zinc-300"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Desktop Command Palette Search Trigger with Ctrl+K Hint */}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event('open-command-palette'))}
            aria-label="Open quick search (Ctrl + K)"
            title="Quick search (Ctrl + K)"
            className="hidden lg:inline-flex items-center gap-2.5 h-10 px-3.5 rounded-xl bg-background/80 hover:bg-white/5 border border-border/80 hover:border-primary/40 text-zinc-400 hover:text-white transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
            <span className="text-xs font-medium">Search...</span>
            <kbd className="ml-1 inline-flex items-center px-1.5 py-0.5 rounded-md bg-secondary text-[10px] font-code font-bold text-zinc-300 border border-border">
              Ctrl K
            </kbd>
          </button>

          {/* Mobile / Tablet Search Icon Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => window.dispatchEvent(new Event('open-command-palette'))}
            aria-label="Open quick search"
            title="Quick search (Ctrl + K)"
            className="lg:hidden rounded-xl hover:bg-primary/10 transition-colors w-11 h-11"
          >
            <Search className="w-5 h-5 text-primary" aria-hidden="true" />
          </Button>

          {/* Interactive Terminal Trigger (Ctrl + .) */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => window.dispatchEvent(new Event('open-terminal-modal'))}
            aria-label="Open interactive terminal (Ctrl + .)"
            title="Interactive CLI Terminal (Ctrl + .)"
            className="rounded-xl hover:bg-primary/10 transition-colors w-11 h-11"
          >
            <Terminal className="w-5 h-5 text-primary" aria-hidden="true" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Switch color theme"
                title="Switch color theme"
                className="rounded-xl hover:bg-primary/10 transition-colors w-11 h-11"
              >
                <Palette className="w-5 h-5 text-primary" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-card border-border rounded-xl p-2 grid grid-cols-2 gap-1 min-w-[240px]"
            >
              {VIBE_OPTIONS.map((option) => (
                <DropdownMenuItem
                  key={option.id}
                  onClick={() => setVibe(option.id)}
                  className={cn(
                    "gap-2 cursor-pointer font-bold text-[11px] uppercase tracking-wider p-2.5 rounded-lg",
                    vibe === option.id && "bg-primary/15 text-primary"
                  )}
                >
                  <span className={cn("w-3 h-3 rounded-full shrink-0", option.dotClass)} aria-hidden="true" />
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog
            open={isCVOpen}
            onOpenChange={(open) => {
              setIsCVOpen(open);
              if (!open) setShowViewer(false);
            }}
          >
            <DialogTrigger asChild>
              <Button
                type="button"
                size="sm"
                className="hidden sm:flex gap-2 font-headline uppercase font-bold text-xs tracking-wider px-4 h-11 rounded-xl"
              >
                <Download className="w-4 h-4" aria-hidden="true" /> Resume
              </Button>
            </DialogTrigger>
            <CVDialogBody showViewer={showViewer} onToggleViewer={setShowViewer} />
          </Dialog>

          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Open navigation menu"
                  className="text-foreground w-11 h-11 hover:bg-white/5 rounded-xl"
                >
                  <Menu className="w-6 h-6" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background/95 backdrop-blur-xl border-border w-[300px] p-0">
                <SheetHeader className="p-6 border-b border-border">
                  <SheetTitle className="text-left font-headline font-bold text-xl tracking-tight flex items-center gap-2.5 text-foreground">
                    <div className="relative w-8 h-8">
                      <Image
                        src="/icon.png"
                        alt="Silvio.AI Logo"
                        fill
                        sizes="32px"
                        className="rounded-lg object-cover"
                      />
                    </div>
                    SILVIO<span className="text-primary">.AI</span>
                  </SheetTitle>
                  <SheetDescription className="sr-only">Mobile navigation menu</SheetDescription>
                </SheetHeader>
                <div className="flex flex-col p-6 gap-3 mt-2">
                  {NAV_LINKS.map((link) => {
                    const isActive = pathname === link.href || (link.name === 'Projects' && pathname === '/repository');

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => {
                          setIsOpen(false);
                          setIsReturning(false);
                          setActiveTab(link.name);
                        }}
                        aria-current={isActive ? 'page' : undefined}
                        className={cn(
                          "text-base font-headline font-bold uppercase tracking-widest transition-colors py-3 px-4 rounded-xl",
                          isActive
                            ? "text-primary bg-primary/10 border-l-4 border-primary"
                            : "text-zinc-300 hover:text-primary hover:bg-white/5"
                        )}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                  <div className="pt-4 sm:hidden">
                    <Button
                      type="button"
                      className="w-full h-12 rounded-xl gap-2.5 font-headline font-bold uppercase tracking-wider text-xs"
                      onClick={() => {
                        setIsOpen(false);
                        window.setTimeout(() => setIsCVOpen(true), 150);
                      }}
                    >
                      <Download className="w-4 h-4" aria-hidden="true" /> Access Resume
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
};
