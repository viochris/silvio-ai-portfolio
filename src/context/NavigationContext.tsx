
"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

type Vibe = 'blue' | 'lime' | 'purple' | 'red' | 'amber' | 'rose';

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
  const [vibe, setVibe] = useState<Vibe>('blue');

  // Global effect for tab transitions
  useEffect(() => {
    if (activeTab !== 'Skills') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [activeTab]);

  // Apply Vibe Theme to Root
  useEffect(() => {
    const root = document.documentElement;
    const themes = {
      blue: { primary: '217 91% 60%' },
      lime: { primary: '142 71% 45%' },
      purple: { primary: '270 91% 60%' },
      red: { primary: '0 84% 60%' },
      amber: { primary: '38 92% 50%' },
      rose: { primary: '330 81% 60%' }
    };

    const theme = themes[vibe];
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--ring', theme.primary);
  }, [vibe]);

  return (
    <NavigationContext.Provider value={{ 
      isReturning, setIsReturning, 
      activeTab, setActiveTab, 
      credentialTab, setCredentialTab,
      vibe, setVibe
    }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) throw new Error("useNavigation must be used within NavigationProvider");
  return context;
}
