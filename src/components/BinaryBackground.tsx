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

    // Increased font size to reduce density and make it less "busy"
    const fontSize = 22;
    const columns = Math.floor(width / fontSize);
    
    // All columns start at 0 to create the "initial sweep" effect from top to bottom
    let drops: number[] = new Array(columns).fill(0);
    
    const colors = {
      bg: 'black', 
      fade: 'rgba(0, 0, 0, 0.08)', // Slightly slower fade for better trails
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

        // After hitting bottom, reset to top with a random chance 
        // This causes them to spread out after the first synchronized sweep
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    // Slower interval (60ms) for a more elegant, less distracting speed
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
      className="fixed inset-0 z-0 pointer-events-none opacity-30"
    />
  );
};
