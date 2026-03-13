
"use client"

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Award, GraduationCap, Search, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { professionalCertifications, courseBadges } from '@/lib/credentials-data';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface AllCredentialsPageProps {
  setActiveTab: (tab: string) => void;
  credentialTab: 'Certifications' | 'Badges';
  setCredentialTab: (tab: 'Certifications' | 'Badges') => void;
  setIsReturning: (val: boolean) => void;
}

export const AllCredentialsPage: React.FC<AllCredentialsPageProps> = ({ 
  setActiveTab, 
  credentialTab, 
  setCredentialTab,
  setIsReturning
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const currentData = credentialTab === 'Certifications' ? professionalCertifications : courseBadges;
  const filteredData = currentData.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.issuer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-32 lg:pt-40 pb-24 px-6 md:px-12 lg:px-16 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-6">
            <button 
              onClick={() => {
                setIsReturning(true);
                setActiveTab('Skills');
              }}
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

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
          <input 
            type="text" 
            placeholder="Search credentials by title or issuer..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-white/20"
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${credentialTab}-${searchTerm}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredData.length > 0 ? (
              <div className={cn(
                "grid gap-8",
                credentialTab === 'Certifications' ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              )}>
                {filteredData.map((item) => (
                  <div key={item.id} className={cn(
                    "p-8 glass rounded-[2.5rem] border border-white/10 flex flex-col hover:border-primary/50 transition-all group shadow-xl h-full",
                    credentialTab === 'Badges' && "p-6 rounded-2xl"
                  )}>
                    <div className="flex items-center gap-6 mb-4">
                      <div className={cn(
                        "w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shrink-0",
                        credentialTab === 'Badges' && "w-10 h-10 rounded-xl"
                      )}>
                        {credentialTab === 'Certifications' ? <Award className="w-6 h-6" /> : <GraduationCap className="w-5 h-5" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className={cn(
                          "text-lg font-headline font-bold leading-tight text-white mb-2",
                          credentialTab === 'Badges' && "text-sm"
                        )}>{item.title}</div>
                        <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-tighter text-primary/70 border-primary/20">
                          {item.issuer} {credentialTab === 'Certifications' ? 'Professional' : 'Specialized'}
                        </Badge>
                      </div>
                    </div>
                    {/* External Link */}
                    <div className="mt-auto pt-4 flex justify-end">
                      <a 
                        href="#" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-primary hover:text-primary/80 transition-colors group/link"
                      >
                        <span>Verify Link</span>
                        <ExternalLink size={12} className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-white/30 font-bold uppercase tracking-widest text-sm">No credentials found matching your search.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
