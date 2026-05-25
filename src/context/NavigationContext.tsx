
"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

type Vibe = 'blue' | 'lime' | 'purple';

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
    if (vibe === 'lime') {
      root.style.setProperty('--primary', '142 71% 45%');
      root.style.setProperty('--ring', '142 71% 45%');
    } else if (vibe === 'purple') {
      root.style.setProperty('--primary', '270 91% 60%');
      root.style.setProperty('--ring', '270 91% 60%');
    } else {
      root.style.setProperty('--primary', '217 91% 60%');
      root.style.setProperty('--ring', '217 91% 60%');
    }
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
