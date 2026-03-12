"use client"

import React, { useEffect, useRef } from 'react';

interface BinaryBackgroundProps {
  theme: 'dark' | 'light';
}

export const BinaryBackground: React.FC<BinaryBackgroundProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const fontSize = 16;
    const columns = Math.floor(width / fontSize);
    
    // Initial state
    let drops: number[] = new Array(columns).fill(0);
    let speeds: number[] = new Array(columns).fill(1);
    let isInitialDrop = true;
    
    // FPS control for "Rain on Glass" effect (Slow & Elegant)
    const fps = 18;
    const fpsInterval = 1000 / fps;
    let lastTime = performance.now();

    // Precise color matching with globals.css to eliminate "greyish" haze
    // Dark: hsl(240, 15%, 15%) -> rgb(33, 33, 43)
    // Light: hsl(210, 40%, 98%) -> rgb(248, 250, 252)
    const bgColor = theme === 'dark' ? 'rgb(33, 33, 43)' : 'rgb(248, 250, 252)';
    const fadeColor = theme === 'dark' ? 'rgba(33, 33, 43, 0.15)' : 'rgba(248, 250, 252, 0.15)';
    const textColor = theme === 'dark' ? 'rgba(6, 182, 212, 0.4)' : 'rgba(59, 130, 246, 0.3)';

    // HARD RESET: Clear canvas with solid color on theme change
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    const draw = (currentTime: number) => {
      const elapsed = currentTime - lastTime;
      requestAnimationFrame(draw);

      if (elapsed < fpsInterval) return;
      lastTime = currentTime - (elapsed % fpsInterval);

      // Create trail effect
      ctx.fillStyle = fadeColor;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = textColor;
      ctx.font = `bold ${fontSize}px monospace`;

      let allHitBottom = true;

      for (let i = 0; i < drops.length; i++) {
        const text = Math.random() > 0.5 ? '0' : '1';
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (isInitialDrop) {
          // Phase 1: Simultaneous Drop (The Wave)
          drops[i] += 1.5; // Slightly faster for the initial drop
          if (y < height) {
            allHitBottom = false;
          }
        } else {
          // Phase 2: Randomized Rain (The Matrix)
          drops[i] += speeds[i];
          if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
            speeds[i] = 0.5 + Math.random() * 1.5;
          }
        }
      }

      if (isInitialDrop && allHitBottom) {
        isInitialDrop = false;
        // Initialize randomized speeds for Phase 2
        for (let i = 0; i < speeds.length; i++) {
          speeds[i] = 0.5 + Math.random() * 1.5;
        }
      }
    };

    const animationId = requestAnimationFrame(draw);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const newColumns = Math.floor(width / fontSize);
      drops = new Array(newColumns).fill(0);
      speeds = new Array(newColumns).fill(1);
      isInitialDrop = true;
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 pointer-events-none"
    />
  );
};
