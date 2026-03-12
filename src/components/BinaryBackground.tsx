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
    
    let drops: number[] = new Array(columns).fill(0);
    let speeds: number[] = new Array(columns).fill(1);
    let isInitialDrop = true;
    
    // FPS DIBUAT SANGAT LAMBAT: 10 FPS untuk efek "hujan di kaca" yang tenang
    const fps = 10; 
    const fpsInterval = 1000 / fps;
    let lastTime = performance.now();

    // SINKRONISASI WARNA: Menggunakan warna solid yang identik dengan globals.css
    const getColors = () => {
      if (theme === 'dark') {
        return {
          bg: 'rgb(33, 33, 44)', // Presisi dengan HSL(240, 15, 15)
          fade: 'rgba(33, 33, 44, 0.15)', // Trail tipis agar tetap hitam pekat
          text: 'rgba(6, 182, 212, 0.25)'
        };
      }
      return {
        bg: 'rgb(248, 250, 252)', // Presisi dengan HSL(210, 40, 98)
        fade: 'rgba(248, 250, 252, 0.15)',
        text: 'rgba(59, 130, 246, 0.15)'
      };
    };

    let colors = getColors();

    // HARD RESET: Membersihkan kanvas total dengan warna solid saat tema berubah
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, width, height);

    const draw = (currentTime: number) => {
      const elapsed = currentTime - lastTime;
      requestAnimationFrame(draw);

      if (elapsed < fpsInterval) return;
      lastTime = currentTime - (elapsed % fpsInterval);

      // Trail effect
      ctx.fillStyle = colors.fade;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = colors.text;
      ctx.font = `bold ${fontSize}px monospace`;

      let allHitBottom = true;

      for (let i = 0; i < drops.length; i++) {
        const text = Math.random() > 0.5 ? '0' : '1';
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (isInitialDrop) {
          // PHASE 1: JATUH SERENTAK
          drops[i] += 1; 
          if (y < height) allHitBottom = false;
        } else {
          // PHASE 2: HUJAN ACAK
          drops[i] += speeds[i];
          if (drops[i] * fontSize > height && Math.random() > 0.98) {
            drops[i] = 0;
            speeds[i] = 0.4 + Math.random() * 0.6; // Kecepatan lambat
          }
        }
      }

      if (isInitialDrop && allHitBottom) {
        isInitialDrop = false;
        for (let i = 0; i < speeds.length; i++) {
          speeds[i] = 0.4 + Math.random() * 0.6;
        }
      }
    };

    const animationId = requestAnimationFrame(draw);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      ctx.fillStyle = colors.bg;
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