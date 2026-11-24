"use client"

import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  Award,
  GraduationCap,
  Search,
  ExternalLink,
  Filter,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import { IssuerLogo } from '@/components/IssuerLogo';
import { professionalCertifications, courseBadges } from '@/lib/credentials-data';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

type IssuerFilter = 'All' | 'Oracle' | 'IBM' | 'Dicoding' | 'Coursera';
type ProofFilter = 'All' | 'Verified' | 'Pending';

const ISSUER_OPTIONS: IssuerFilter[] = ['All', 'Oracle', 'IBM', 'Dicoding', 'Coursera'];
const PROOF_OPTIONS: { value: ProofFilter; label: string }[] = [
  { value: 'All', label: 'All Status' },
  { value: 'Verified', label: 'Verified Proof' },
  { value: 'Pending', label: 'Pending Proof' },
];

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
  setIsReturning,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeIssuer, setActiveIssuer] = useState<IssuerFilter>('All');
  const [activeProof, setActiveProof] = useState<ProofFilter>('All');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const currentData = credentialTab === 'Certifications' ? professionalCertifications : courseBadges;

  const filteredData = useMemo(() => {
    return currentData.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.issuer.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesIssuer =
        activeIssuer === 'All' ||
        item.issuer.toLowerCase() === activeIssuer.toLowerCase() ||
        (activeIssuer === 'Coursera' && Boolean(item.verifyLink?.toLowerCase().includes('coursera.org')));

      const hasProof = Boolean(item.verifyLink && item.verifyLink.trim().length > 0);
      const matchesProof =
        activeProof === 'All' ||
        (activeProof === 'Verified' && hasProof) ||
        (activeProof === 'Pending' && !hasProof);

      return matchesSearch && matchesIssuer && matchesProof;
    });
  }, [currentData, searchTerm, activeIssuer, activeProof]);

  const activeProofLabel =
    activeProof === 'All' ? 'All' : activeProof === 'Verified' ? 'Verified' : 'Pending';

  return (
    <div className="pt-28 lg:pt-36 pb-20 px-4 sm:px-6 lg:px-12 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => {
                setIsReturning(true);
                setActiveTab('Skills');
              }}
              className="inline-flex items-center gap-2 text-primary font-headline font-bold uppercase tracking-wider text-xs hover:gap-3 transition-all"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to Skills
            </button>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-black uppercase tracking-tight text-white">
              Verified <span className="text-primary">Credentials</span>
            </h1>
            <p className="text-zinc-300 text-base max-w-xl">
              A complete archive of my professional certifications and academic specializations in AI and Data Science.
            </p>
          </div>

          <div
            className="flex p-1 bg-card rounded-xl border border-border w-full sm:w-fit"
            role="tablist"
            aria-label="Credential categories"
          >
            <button
              type="button"
              role="tab"
              aria-selected={credentialTab === 'Certifications'}
              onClick={() => setCredentialTab('Certifications')}
              className={cn(
                'flex-1 sm:flex-initial px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors min-h-[40px] text-center',
                credentialTab === 'Certifications'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-zinc-400 hover:text-white'
              )}
            >
              Certifications ({professionalCertifications.length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={credentialTab === 'Badges'}
              onClick={() => setCredentialTab('Badges')}
              className={cn(
                'flex-1 sm:flex-initial px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors min-h-[40px] text-center',
                credentialTab === 'Badges'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-zinc-400 hover:text-white'
              )}
            >
              Course Badges ({courseBadges.length})
            </button>
          </div>
        </div>

        {/* Search & Filters Bar */}
        <div className="flex flex-col xl:flex-row gap-3 mb-6 bg-card p-3.5 rounded-2xl border border-border/80 items-stretch">
          <div className="relative flex-1">
            <label htmlFor="credentials-search" className="sr-only">
              Search credentials by title or issuer
            </label>
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
              size={16}
              aria-hidden="true"
            />
            <input
              id="credentials-search"
              type="text"
              placeholder="Search credentials by title or issuer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-12 bg-background border border-border rounded-xl pl-11 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-zinc-500"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Filter 1: Issuer / Platform */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 min-h-[48px] px-5 rounded-xl border-border bg-background hover:bg-white/5 text-white font-headline font-bold uppercase tracking-wider text-[11px] flex gap-2.5 min-w-[180px] flex-1 shrink-0"
                >
                  <Filter className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                  <span>Issuer: {activeIssuer}</span>
                  <ChevronDown className="w-4 h-4 opacity-60 ml-auto shrink-0" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-card border-border rounded-xl p-1 z-50">
                {ISSUER_OPTIONS.map((iss) => (
                  <DropdownMenuItem
                    key={iss}
                    onClick={() => setActiveIssuer(iss)}
                    className={cn(
                      'cursor-pointer font-headline font-bold uppercase tracking-wider text-[11px] px-3.5 py-2.5 rounded-lg transition-colors flex items-center gap-2.5',
                      activeIssuer === iss
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-white/5 text-zinc-300'
                    )}
                  >
                    {iss !== 'All' && <IssuerLogo issuer={iss} className="w-4 h-4 shrink-0" />}
                    <span>{iss === 'All' ? 'All Issuers' : iss}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Filter 2: Credential Proof / Verification Status */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 min-h-[48px] px-5 rounded-xl border-border bg-background hover:bg-white/5 text-white font-headline font-bold uppercase tracking-wider text-[11px] flex gap-2.5 min-w-[190px] flex-1 shrink-0"
                >
                  <ShieldCheck className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                  <span>Credential: {activeProofLabel}</span>
                  <ChevronDown className="w-4 h-4 opacity-60 ml-auto shrink-0" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-card border-border rounded-xl p-1 z-50">
                {PROOF_OPTIONS.map((opt) => (
                  <DropdownMenuItem
                    key={opt.value}
                    onClick={() => setActiveProof(opt.value)}
                    className={cn(
                      'cursor-pointer font-headline font-bold uppercase tracking-wider text-[11px] px-3.5 py-2.5 rounded-lg transition-colors',
                      activeProof === opt.value
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-white/5 text-zinc-300'
                    )}
                  >
                    {opt.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400 font-bold uppercase tracking-widest px-1">
          <span>
            Showing {filteredData.length} of {currentData.length}{' '}
            {credentialTab === 'Certifications' ? 'Certifications' : 'Course Badges'}
          </span>
          {(activeIssuer !== 'All' || activeProof !== 'All' || searchTerm.trim() !== '') && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setActiveIssuer('All');
                setActiveProof('All');
              }}
              className="text-primary hover:underline text-[11px] font-bold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          )}
        </div>

        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredData.map((item) => (
              <div
                key={`${credentialTab}-${item.id}`}
                className="p-6 bg-card rounded-2xl border border-border/80 flex flex-col justify-between hover:border-primary/40 transition-colors h-full"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-12 h-12 rounded-xl bg-background border border-border/80 flex items-center justify-center shrink-0">
                    <IssuerLogo issuer={item.issuer} className="w-7 h-7" />
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center ring-2 ring-card"
                    >
                      {credentialTab === 'Certifications' ? (
                        <Award className="w-3 h-3" />
                      ) : (
                        <GraduationCap className="w-3 h-3" />
                      )}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="text-base sm:text-lg font-headline font-bold leading-snug text-white mb-2">
                      {item.title}
                    </h2>
                    <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-primary border border-primary/25 px-2.5 py-0.5 rounded-md bg-primary/10">
                      {item.issuer}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-border/50 flex justify-end">
                  {item.verifyLink ? (
                    <a
                      href={item.verifyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors py-1"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink size={13} aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                      Verification Pending
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card/40 rounded-2xl border border-border/60">
            <p className="text-zinc-400 font-semibold text-sm mb-3">
              No credentials found matching the active search and filters.
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setActiveIssuer('All');
                setActiveProof('All');
              }}
              className="rounded-xl border-border text-xs font-bold uppercase tracking-wider"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
