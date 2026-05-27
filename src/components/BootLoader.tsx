"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BootLoaderProps {
  onComplete: () => void;
}

export const BootLoader: React.FC<BootLoaderProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Updated timeline as requested
  const fullLogs = [
    "CONTINUUM BIOS v2.0",
    "Memory Check: OK",
    "Secure Boot: ENABLED",
    "Release: 2026.01.05",
    "Updated: 2026.05.27",
    "",
    "MWBIOS (C)2026 Developer Portfolio System",
    "",
    "Loading Portfolio Resources...",
    "",
    "Loaded React Components .... 13%",
    "Loaded Framer Motion ....... 25%",
    "Loaded Tailwind CSS ........ 38%",
    "Loaded Genkit Engine ....... 50%",
    "Loaded AI Neural Assets .... 75%",
    "Finalizing Environment ..... 100%",
  ];

  useEffect(() => {
    setMounted(true);
    let currentLogIndex = 0;
    const logInterval = setInterval(() => {
      if (currentLogIndex < fullLogs.length) {
        setLogs(prev => [...prev, fullLogs[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 120);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(onComplete, 800);
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  const progressBar = () => {
    const totalBars = 20;
    const activeBars = Math.floor((progress / 100) * totalBars);
    const bars = "█".repeat(activeBars) + "░".repeat(totalBars - activeBars);
    return `Progress: ${bars} ${progress}%`;
  };

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center p-6 font-code"
          suppressHydrationWarning
        >
          <div className="max-w-2xl w-full">
            <div 
              className="text-white/90 text-sm md:text-base leading-relaxed h-[450px] overflow-hidden flex flex-col justify-start"
              suppressHydrationWarning
            >
              {mounted && logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.05 }}
                  className={log === "" ? "h-4" : ""}
                >
                  {log}
                </motion.div>
              ))}
              
              {mounted && logs.length === fullLogs.length && (
                <>
                  <div className="mt-8 text-primary font-bold">
                    {progressBar()}
                  </div>
                  <div className="mt-4 text-white font-bold animate-pulse">
                    {progress === 100 ? "SYSTEM STATUS: READY" : "SYSTEM STATUS: INITIALIZING..."}
                  </div>
                </>
              )}
            </div>
            
            <div className="mt-12 flex justify-between items-center text-[10px] text-white/30 uppercase tracking-[0.3em] border-t border-white/10 pt-4">
              <div>Kernel_V7.2.0</div>
              <div>Root_Access_Granted</div>
              <div>Port_9002_Active</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
