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

    const fontSize = 16;
    const columns = Math.floor(width / fontSize);
    
    // drops stores the current y-coordinate for each column
    let drops: number[] = new Array(columns).fill(1);
    
    // Futuristic Blue colors
    const colors = {
      bg: 'black', 
      fade: 'rgba(0, 0, 0, 0.1)', // Trail effect
      text: '#3b82f6' // Bright Blue
    };

    const draw = () => {
      // Create trailing effect by filling with semi-transparent black
      ctx.fillStyle = colors.fade;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = colors.text;
      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random 0 or 1
        const text = Math.random() > 0.5 ? '0' : '1';
        
        // Calculate x and y coordinates
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Draw the character
        ctx.fillText(text, x, y);

        // Reset drop to top randomly after hitting bottom
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Increment y coordinate
        drops[i]++;
      }
    };

    // Use setInterval for a consistent "Matrix" speed (around 30fps is classic)
    const interval = setInterval(draw, 33);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      // Reset drops on resize to fill new space
      const newColumns = Math.floor(width / fontSize);
      drops = new Array(newColumns).fill(1);
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
      className="fixed inset-0 z-0 pointer-events-none opacity-60"
    />
  );
};
