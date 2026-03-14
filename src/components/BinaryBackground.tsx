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
    // Initialize at 0 so they all drop together from the top at the beginning
    let drops: number[] = new Array(columns).fill(0);
    
    // Matrix Blue theme
    const colors = {
      bg: 'black', 
      fade: 'rgba(0, 0, 0, 0.05)', // Longer trails for a "heavier" look
      text: '#3b82f6' // Classic Tech Blue
    };

    const draw = () => {
      // Create trailing effect
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

        // After hitting bottom, reset to top with a random delay 
        // this staggering creates the "one by one" effect after the first full sweep
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Increment y coordinate
        drops[i]++;
      }
    };

    // 50ms interval for a moderate, classic speed
    const interval = setInterval(draw, 50);

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
      className="fixed inset-0 z-0 pointer-events-none opacity-40"
    />
  );
};
