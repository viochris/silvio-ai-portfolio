"use client"

import React from 'react';
import { Download, ExternalLink, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResumePreviewFrameProps {
  downloadHref?: string;
  rawPdfHref?: string;
  previewImageSrc?: string;
}

export const ResumePreviewFrame: React.FC<ResumePreviewFrameProps> = ({
  downloadHref = '/api/resume?download=1',
  rawPdfHref = '/Silvio-Christian-Joe-resume.pdf',
  previewImageSrc = '/resume-preview.png',
}) => {
  return (
    <div className="flex-1 min-h-0 flex flex-col mt-4 rounded-xl border border-border bg-black/40 overflow-hidden">
      <div className="shrink-0 flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-b border-border/80 bg-secondary/40">
        <div className="inline-flex items-center gap-2 text-xs text-zinc-300 font-medium">
          <FileText className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
          <span>Silvio Christian, Joe &bull; Resume (1 Page)</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 px-3 rounded-lg border-border bg-background/80 hover:bg-white/5 text-[11px] font-bold uppercase tracking-wider gap-1.5"
            asChild
          >
            <a href={rawPdfHref} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
              <span>Open PDF</span>
            </a>
          </Button>
          <Button
            type="button"
            size="sm"
            className="h-8 px-3 rounded-lg text-[11px] font-bold uppercase tracking-wider gap-1.5"
            asChild
          >
            <a href={downloadHref} download="Silvio-Christian-Joe-resume.pdf">
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Download</span>
            </a>
          </Button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-5 bg-zinc-950/70">
        <img
          src={previewImageSrc}
          alt="Curriculum Vitae preview of Silvio Christian, Joe"
          className="w-full max-w-[780px] mx-auto h-auto rounded-lg shadow-2xl border border-white/10 bg-white block"
        />
      </div>
    </div>
  );
};
