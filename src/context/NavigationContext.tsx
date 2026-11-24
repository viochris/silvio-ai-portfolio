"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Vibe = 'blue' | 'lime' | 'purple' | 'red' | 'amber' | 'rose';

const VIBE_THEMES: Record<Vibe, { primary: string; glow: string; warm: string }> = {
  blue: { primary: '220 95% 64%', glow: '268 92% 68%', warm: '38 95% 68%' },
  lime: { primary: '152 78% 48%', glow: '188 90% 54%', warm: '45 95% 66%' },
  purple: { primary: '268 92% 68%', glow: '322 88% 66%', warm: '40 96% 70%' },
  red: { primary: '352 88% 62%', glow: '24 95% 60%', warm: '42 96% 70%' },
  amber: { primary: '38 95% 56%', glow: '16 92% 60%', warm: '268 88% 70%' },
  rose: { primary: '332 86% 64%', glow: '268 90% 68%', warm: '38 95% 70%' },
};

interface NavigationContextType {
  isReturning: boolean;
  setIsReturning: (val: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  credentialTab: 'Certifications' | 'Badges';
  setCredentialTab: (tab: 'Certifications' | 'Badges') => void;
  vibe: Vibe;
  setVibe: (vibe: Vibe) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [isReturning, setIsReturning] = useState(false);
  const [activeTab, setActiveTab] = useState('Skills');
  const [credentialTab, setCredentialTab] = useState<'Certifications' | 'Badges'>('Certifications');
  const [vibe, setVibeState] = useState<Vibe>('purple');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('silvio_vibe_v2') as Vibe | null;
      if (saved && saved in VIBE_THEMES) {
        setVibeState(saved);
      }
    } catch {
      // Ignore storage errors in restricted environments
    }
  }, []);

  const setVibe = (nextVibe: Vibe) => {
    setVibeState(nextVibe);
    try {
      window.localStorage.setItem('silvio_vibe_v2', nextVibe);
    } catch {
      // Ignore storage errors
    }
  };

  useEffect(() => {
    if (activeTab !== 'Skills') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [activeTab]);

  useEffect(() => {
    const root = document.documentElement;
    const theme = VIBE_THEMES[vibe];
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--primary-glow', theme.glow);
    root.style.setProperty('--accent-warm', theme.warm);
    root.style.setProperty('--ring', theme.primary);
  }, [vibe]);

  return (
    <NavigationContext.Provider
      value={{
        isReturning,
        setIsReturning,
        activeTab,
        setActiveTab,
        credentialTab,
        setCredentialTab,
        vibe,
        setVibe,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) throw new Error("useNavigation must be used within NavigationProvider");
  return context;
}
