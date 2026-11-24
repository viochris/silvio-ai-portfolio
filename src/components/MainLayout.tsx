"use client"

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { BootLoader } from '@/components/BootLoader';
import { BinaryBackground } from '@/components/BinaryBackground';
import { JakartaClock } from '@/components/JakartaClock';
import { CommandPalette } from '@/components/CommandPalette';
import { TerminalModal } from '@/components/TerminalModal';
import { Chatbot } from '@/components/Chatbot';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { Github, Linkedin, ArrowUp, Instagram, Youtube, Mail, Copy, Check, Send, MapPin, Bot } from 'lucide-react';
import Link from 'next/link';
import { NavigationProvider, useNavigation } from '@/context/NavigationContext';
import { KaggleIcon, TikTokIcon, MediumIcon, XIcon, WhatsAppIcon } from '@/components/SocialIcons';

const CONTACT_EMAIL = "viochristian12@gmail.com";

const socialLinks = [
  { label: "LinkedIn", icon: <Linkedin className="w-5 h-5" aria-hidden="true" />, href: "https://www.linkedin.com/in/silvio-christian-joe", external: true },
  { label: "GitHub", icon: <Github className="w-5 h-5" aria-hidden="true" />, href: "https://github.com/viochris", external: true },
  { label: "Kaggle", icon: <KaggleIcon className="w-5 h-5" aria-hidden="true" />, href: "https://www.kaggle.com/viochristian", external: true },
  { label: "Instagram", icon: <Instagram className="w-5 h-5" aria-hidden="true" />, href: "https://www.instagram.com/silvio.codes?igsh=eTgxcGMybjNiYTlj", external: true },
  { label: "X (Twitter)", icon: <XIcon className="w-5 h-5" aria-hidden="true" />, href: "https://x.com/SilvioCodes", external: true },
  { label: "YouTube", icon: <Youtube className="w-5 h-5" aria-hidden="true" />, href: "https://youtube.com/@silviocodes", external: true },
  { label: "TikTok", icon: <TikTokIcon className="w-5 h-5" aria-hidden="true" />, href: "https://www.tiktok.com/@silvio.codes?_r=1&_t=ZS-96drUPoz4zP", external: true },
  { label: "Medium", icon: <MediumIcon className="w-5 h-5" aria-hidden="true" />, href: "https://medium.com/@silviochristian", external: true },
  { label: "WhatsApp", icon: <WhatsAppIcon className="w-5 h-5" />, href: "https://wa.me/62895342637871", external: true },
];

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Repository', href: '/repository' },
  { name: 'Skills', href: '/skills' },
  { name: 'Credentials', href: '/skills' },
  { name: 'Contact', href: '/contact' },
];

function LayoutContent({ children }: { children: React.ReactNode }) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [floatingAiOpen, setFloatingAiOpen] = useState(false);
  const [hasOpenedFloatingAi, setHasOpenedFloatingAi] = useState(false);
  const { setIsReturning, setActiveTab, setCredentialTab } = useNavigation();
  const { toast } = useToast();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setFloatingAiOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!floatingAiOpen) return undefined;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFloatingAiOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [floatingAiOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopiedEmail(true);
      toast({
        title: "Email copied",
        description: `${CONTACT_EMAIL} copied to your clipboard.`,
      });
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  };

  const handleAskAiClick = () => {
    if (pathname === '/contact') {
      setIsReturning(false);
      setActiveTab('Contact');
      const el = document.getElementById('ai-assistant');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        window.setTimeout(() => {
          document.getElementById('chatbot-input')?.focus();
        }, 450);
        return;
      }
      router.push('/contact#ai-assistant');
      return;
    }

    setHasOpenedFloatingAi(true);
    setFloatingAiOpen(true);
  };

  return (
    <div className="min-h-screen relative bg-background">
      <BinaryBackground />
      <BootLoader />
      <CommandPalette />
      <TerminalModal />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        <main className="relative flex-1 bg-transparent">
          {children}
        </main>

        <footer className="relative z-10 bg-card/70 border-t border-border/80 pt-14 pb-36 sm:pb-24 lg:pb-20 px-4 sm:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-12">
            <div className="sm:col-span-2 lg:col-span-5 space-y-5">
              <div className="text-2xl font-headline font-bold tracking-tight text-foreground">
                SILVIO<span className="text-primary">.AI</span>
              </div>
              <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
                Data Scientist and AI Engineer building practical machine learning pipelines and autonomous agent systems.
              </p>
              <div className="flex flex-col gap-3 items-start">
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.04] border border-border/80 w-fit max-w-full">
                  <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300">
                    Open for Roles, Freelance &amp; Collaboration
                  </span>
                </div>

                <div className="inline-flex items-stretch rounded-xl bg-white/[0.04] border border-border/80 w-fit max-w-full overflow-hidden">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label={`Copy email address ${CONTACT_EMAIL}`}
                    title="Copy email address"
                    className="group inline-flex items-center gap-2 px-3.5 py-2 hover:bg-primary/10 transition-colors text-xs text-zinc-300 hover:text-white min-w-0"
                  >
                    <Mail className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
                    <span className="font-mono text-[11px] sm:text-xs tracking-tight truncate">{CONTACT_EMAIL}</span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-primary pl-2 border-l border-border/80 shrink-0">
                      {copiedEmail ? (
                        <>
                          <Check className="w-3 h-3" aria-hidden="true" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 opacity-80 group-hover:opacity-100" aria-hidden="true" />
                          <span>Copy</span>
                        </>
                      )}
                    </span>
                  </button>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    aria-label={`Send email to ${CONTACT_EMAIL}`}
                    title="Send email"
                    className="inline-flex items-center gap-1 px-3 py-2 border-l border-border/80 text-[10px] font-bold uppercase tracking-wider text-zinc-300 hover:text-primary hover:bg-primary/10 transition-colors shrink-0"
                  >
                    <Send className="w-3 h-3 text-primary" aria-hidden="true" />
                    <span>Send</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 grid grid-cols-2 gap-8">
              <div className="space-y-5">
                <h2 className="text-xs font-headline font-bold uppercase tracking-widest text-zinc-200">
                  Quick Links
                </h2>
                <nav aria-label="Footer navigation" className="flex flex-col gap-3">
                  {quickLinks.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => {
                        if (item.name === 'Skills') {
                          setIsReturning(false);
                          setActiveTab('Skills');
                        } else if (item.name === 'Credentials') {
                          setIsReturning(false);
                          setCredentialTab('Certifications');
                          setActiveTab('Credentials');
                        }
                      }}
                      className="text-zinc-400 hover:text-primary transition-colors w-fit text-sm font-medium"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="space-y-5">
                <h2 className="text-xs font-headline font-bold uppercase tracking-widest text-zinc-200">
                  Resources
                </h2>
                <nav aria-label="Portfolio resources and tools" className="flex flex-col gap-3">
                  <a
                    href="/api/resume?download=1"
                    download="Silvio-Christian-Joe-resume.pdf"
                    className="text-zinc-400 hover:text-primary transition-colors w-fit text-sm font-medium"
                  >
                    Resume (PDF)
                  </a>
                  <a
                    href="/llms.txt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-primary transition-colors w-fit text-sm font-medium"
                  >
                    AI Profile (llms.txt)
                  </a>
                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new Event('open-command-palette'))}
                    className="text-zinc-400 hover:text-primary transition-colors w-fit text-sm font-medium text-left flex items-center gap-2"
                  >
                    <span>Search</span>
                    <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white/[0.04] border border-border/80 rounded text-zinc-400">
                      Ctrl+K
                    </kbd>
                  </button>
                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new Event('open-terminal-modal'))}
                    className="text-zinc-400 hover:text-primary transition-colors w-fit text-sm font-medium text-left flex items-center gap-2"
                  >
                    <span>CLI Terminal</span>
                    <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white/[0.04] border border-border/80 rounded text-zinc-400">
                      Ctrl+.
                    </kbd>
                  </button>
                </nav>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-5">
              <h2 className="text-xs font-headline font-bold uppercase tracking-widest text-zinc-200">
                Connect
              </h2>
              <div className="grid grid-cols-3 gap-3 w-fit">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.external ? "_blank" : undefined}
                    rel={social.external ? "noopener noreferrer" : undefined}
                    aria-label={social.label}
                    title={social.label}
                    className="w-11 h-11 rounded-xl bg-white/[0.04] border border-border/80 flex items-center justify-center text-zinc-400 hover:text-primary hover:bg-primary/10 hover:border-primary/30 transition-colors"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-border/60 sm:pr-16 2xl:pr-0">
            <p className="text-xs sm:text-sm font-medium text-zinc-400 tracking-wide text-center sm:text-left">
              &copy; {new Date().getFullYear()} Silvio Christian, Joe. All rights reserved.
            </p>

            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-300">
              <MapPin className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
              <span>Semarang, Indonesia</span>
              <span className="text-zinc-600" aria-hidden="true">&bull;</span>
              <JakartaClock className="text-primary font-mono tabular-nums min-w-[72px] text-right" />
            </div>
          </div>
        </footer>

        {/* Dynamic Floating Ask Silvio.AI Button (Circle by default -> Pill on hover, moves up when Scroll-to-Top appears) */}
        <button
          type="button"
          onClick={handleAskAiClick}
          aria-label={pathname === '/contact' ? 'Scroll to Silvio.AI Assistant' : 'Open floating Silvio.AI Assistant'}
          className={`group fixed right-6 sm:right-8 z-40 h-12 rounded-full bg-card/95 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/45 shadow-lg shadow-primary/25 flex items-center justify-center px-3.5 transition-all duration-300 ease-out ${
            showScrollTop
              ? 'bottom-20 sm:bottom-24'
              : 'bottom-6 sm:bottom-8'
          } ${
            floatingAiOpen && pathname !== '/contact'
              ? 'opacity-0 scale-90 pointer-events-none invisible'
              : 'opacity-100 scale-100 visible'
          }`}
        >
          <Bot size={20} className="shrink-0 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-[140px] group-hover:opacity-100 group-hover:ml-2.5 transition-all duration-300 ease-out font-headline font-bold uppercase tracking-wider text-xs">
            Ask Silvio.AI
          </span>
        </button>

        {/* Global Floating Mini Chat Overlay (disabled on /contact where the full assistant already lives) */}
        {pathname !== '/contact' && hasOpenedFloatingAi && (
          <div
            role="dialog"
            aria-label="Silvio.AI Assistant floating chat"
            aria-hidden={!floatingAiOpen}
            className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[430px] h-[min(78vh,620px)] transition-all duration-200 ease-out ${
              floatingAiOpen
                ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                : 'opacity-0 translate-y-4 pointer-events-none invisible'
            }`}
          >
            <Chatbot
              compact
              isOpen={floatingAiOpen}
              onClose={() => setFloatingAiOpen(false)}
              onOpenFullPage={() => {
                setFloatingAiOpen(false);
                setIsReturning(false);
                setActiveTab('Contact');
                router.push('/contact#ai-assistant');
              }}
              className="shadow-2xl shadow-black/75 border-primary/40"
            />
          </div>
        )}

        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 hover:-translate-y-0.5 flex items-center justify-center transition-all duration-300 z-40 ${
            showScrollTop ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-6 invisible pointer-events-none'
          }`}
        >
          <ArrowUp size={20} className="stroke-[2.5px]" aria-hidden="true" />
        </button>
      </div>

      <Toaster />
    </div>
  );
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <NavigationProvider>
      <LayoutContent>{children}</LayoutContent>
    </NavigationProvider>
  );
}
