
"use client"

import React, { useEffect } from 'react';
import { ArrowLeft, Award, GraduationCap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { professionalCertifications, courseBadges } from '@/lib/credentials-data';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface AllCredentialsPageProps {
  setActiveTab: (tab: string) => void;
  credentialTab: 'Certifications' | 'Badges';
  setCredentialTab: (tab: 'Certifications' | 'Badges') => void;
}

export const AllCredentialsPage: React.FC<AllCredentialsPageProps> = ({ 
  setActiveTab, 
  credentialTab, 
  setCredentialTab 
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="pt-32 lg:pt-40 pb-24 px-6 md:px-12 lg:px-16 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-6">
            <button 
              onClick={() => setActiveTab('Skills')}
              className="flex items-center gap-2 text-primary font-headline font-bold uppercase tracking-widest text-xs hover:gap-4 transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Skills
            </button>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black uppercase tracking-tighter text-white">
              Verified <span className="text-primary">Credentials</span>
            </h2>
            <p className="text-white/50 font-medium max-w-xl">
              A complete list of my professional certifications and academic specializations in AI and Data Science.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10 w-fit">
            <button 
              onClick={() => setCredentialTab('Certifications')}
              className={cn(
                "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                credentialTab === 'Certifications' ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-white/40 hover:text-white"
              )}
            >
              Certifications ({professionalCertifications.length})
            </button>
            <button 
              onClick={() => setCredentialTab('Badges')}
              className={cn(
                "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                credentialTab === 'Badges' ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-white/40 hover:text-white"
              )}
            >
              Course Badges ({courseBadges.length})
            </button>
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={credentialTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {credentialTab === 'Certifications' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {professionalCertifications.map((c) => (
                  <div key={c.id} className="p-8 md:p-10 glass rounded-[2.5rem] border border-white/10 flex items-center gap-6 sm:gap-8 hover:border-primary/50 transition-all group shadow-xl">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shrink-0">
                      <Award className="w-6 h-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-lg md:text-xl font-headline font-bold leading-tight text-white mb-2">{c.title}</div>
                      <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-tighter text-primary/70 border-primary/20">
                        {c.issuer} Professional
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {courseBadges.map((b) => (
                  <div key={b.id} className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-primary/30 transition-all group flex flex-col gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary/50 group-hover:text-primary transition-colors">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white leading-tight mb-2">{b.title}</div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-white/30">{b.issuer} Specialized</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
