"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

interface NavigationContextType {
  isReturning: boolean;
  setIsReturning: (val: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  credentialTab: 'Certifications' | 'Badges';
  setCredentialTab: (tab: 'Certifications' | 'Badges') => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [isReturning, setIsReturning] = useState(false);
  const [activeTab, setActiveTab] = useState('Skills');
  const [credentialTab, setCredentialTab] = useState<'Certifications' | 'Badges'>('Certifications');

  // Global effect for tab transitions
  useEffect(() => {
    if (activeTab !== 'Skills') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [activeTab]);

  return (
    <NavigationContext.Provider value={{ 
      isReturning, setIsReturning, 
      activeTab, setActiveTab, 
      credentialTab, setCredentialTab 
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
