"use client"

import React, { useEffect, useRef } from 'react';

export const BinaryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Optimized font size for better clarity and less noise
    const fontSize = 24;
    const columns = Math.floor(width / fontSize);
    
    // Initial drop starts all at 0 for the "curtain drop" effect
    let drops: number[] = new Array(columns).fill(0);
    
    const colors = {
      bg: 'black', 
      fade: 'rgba(0, 0, 0, 0.12)', // Subtle trail
      text: '#3b82f6' // Tech Blue
    };

    const draw = () => {
      ctx.fillStyle = colors.fade;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = colors.text;
      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = Math.random() > 0.5 ? '0' : '1';
        
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        // After initial synchronized fall, randomize individual resets
        if (y > height && Math.random() > 0.98) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    // Moderate speed (60ms) for a smooth, non-distracting flow
    const interval = setInterval(draw, 60);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const newColumns = Math.floor(width / fontSize);
      drops = new Array(newColumns).fill(0);
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, width, height);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-15"
      style={{ filter: 'blur(0.5px)' }}
    />
  );
};
