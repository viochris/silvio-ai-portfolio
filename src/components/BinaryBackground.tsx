"use client"

import React, { useEffect, useRef } from 'react';

interface ThemeHsl {
  primary: string;
  glow: string;
  warm: string;
}

function parseHslVar(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (!raw) return fallback;
  const parts = raw.split(/\s+/);
  if (parts.length >= 3) {
    return `${parts[0]}, ${parts[1]}, ${parts[2]}`;
  }
  return fallback;
}

function getThemeHsl(): ThemeHsl {
  return {
    primary: parseHslVar('--primary', '268, 92%, 68%'),
    glow: parseHslVar('--primary-glow', '322, 88%, 66%'),
    warm: parseHslVar('--accent-warm', '40, 96%, 70%'),
  };
}

type Tone = 'primary' | 'glow' | 'warm';

interface FloatingSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  tone: Tone;
  phase: number;
}

interface SpriteBank {
  headWhite: Record<'0' | '1', HTMLCanvasElement>;
  headWarm: Record<'0' | '1', HTMLCanvasElement>;
  body: Record<Tone, Record<'0' | '1', HTMLCanvasElement>>;
  tail: Record<Tone, Record<'0' | '1', HTMLCanvasElement>>;
  spark: Record<Tone, HTMLCanvasElement>;
}

const TILE_SIZE = 36;
const HALF_TILE = TILE_SIZE / 2;

function createGlyphSprite(
  bit: '0' | '1',
  fontSize: number,
  fillStyle: string,
  shadowColor: string,
  shadowBlur: number
): HTMLCanvasElement {
  const off = document.createElement('canvas');
  off.width = TILE_SIZE;
  off.height = TILE_SIZE;
  const octx = off.getContext('2d');
  if (!octx) return off;

  octx.font = `700 ${fontSize - 3}px monospace`;
  octx.textAlign = 'center';
  octx.textBaseline = 'middle';
  if (shadowBlur > 0) {
    octx.shadowBlur = shadowBlur;
    octx.shadowColor = shadowColor;
  }
  octx.fillStyle = fillStyle;
  octx.fillText(bit, HALF_TILE, HALF_TILE);
  return off;
}

function createSparkSprite(hsl: string): HTMLCanvasElement {
  const size = 28;
  const half = size / 2;
  const off = document.createElement('canvas');
  off.width = size;
  off.height = size;
  const octx = off.getContext('2d');
  if (!octx) return off;

  const grad = octx.createRadialGradient(half, half, 0, half, half, half);
  grad.addColorStop(0, `hsla(${hsl}, 0.36)`);
  grad.addColorStop(1, `hsla(${hsl}, 0)`);
  octx.fillStyle = grad;
  octx.beginPath();
  octx.arc(half, half, half, 0, Math.PI * 2);
  octx.fill();
  return off;
}

function buildSpriteBank(theme: ThemeHsl, fontSize: number): SpriteBank {
  const tones: Tone[] = ['primary', 'glow', 'warm'];
  const getHsl = (t: Tone) => (t === 'glow' ? theme.glow : t === 'warm' ? theme.warm : theme.primary);

  const headWhite = {
    '0': createGlyphSprite('0', fontSize, 'rgba(255, 255, 255, 0.95)', `hsla(${theme.primary}, 0.95)`, 12),
    '1': createGlyphSprite('1', fontSize, 'rgba(255, 255, 255, 0.95)', `hsla(${theme.primary}, 0.95)`, 12),
  };
  const headWarm = {
    '0': createGlyphSprite('0', fontSize, `hsla(${theme.warm}, 0.95)`, `hsla(${theme.warm}, 0.95)`, 12),
    '1': createGlyphSprite('1', fontSize, `hsla(${theme.warm}, 0.95)`, `hsla(${theme.warm}, 0.95)`, 12),
  };

  const body = {} as SpriteBank['body'];
  const tail = {} as SpriteBank['tail'];
  const spark = {} as SpriteBank['spark'];

  for (const t of tones) {
    const hsl = getHsl(t);
    body[t] = {
      '0': createGlyphSprite('0', fontSize, `hsla(${hsl}, 0.88)`, `hsla(${hsl}, 0.65)`, 7),
      '1': createGlyphSprite('1', fontSize, `hsla(${hsl}, 0.88)`, `hsla(${hsl}, 0.65)`, 7),
    };
    tail[t] = {
      '0': createGlyphSprite('0', fontSize, `hsla(${hsl}, 0.52)`, 'transparent', 0),
      '1': createGlyphSprite('1', fontSize, `hsla(${hsl}, 0.52)`, 'transparent', 0),
    };
    spark[t] = createSparkSprite(hsl);
  }

  return { headWhite, headWarm, body, tail, spark };
}

export const BinaryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const fontSize = 18;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let columns = Math.max(1, Math.floor(width / fontSize));

    let dropsA: number[] = [];
    let dropsB: number[] = [];
    let speeds: number[] = [];
    let tones: Tone[] = [];
    let sparks: FloatingSpark[] = [];

    let theme = getThemeHsl();
    let sprites = buildSpriteBank(theme, fontSize);
    let intervalId: number | null = null;

    const initStreams = () => {
      columns = Math.max(1, Math.floor(width / fontSize));
      const maxRows = Math.max(20, Math.ceil(height / fontSize));
      dropsA = new Array(columns).fill(0).map(() => Math.floor(Math.random() * maxRows) - maxRows);
      dropsB = new Array(columns)
        .fill(0)
        .map((_, i) => dropsA[i] - Math.floor(maxRows * (0.45 + Math.random() * 0.35)));
      speeds = new Array(columns).fill(0).map(() => 0.7 + Math.random() * 0.75);
      tones = new Array(columns)
        .fill('primary')
        .map((_, i) => (i % 6 === 0 ? 'warm' : i % 2 === 0 ? 'glow' : 'primary'));

      const sparkCount = Math.min(28, Math.max(14, Math.floor(width / 56)));
      const toneList: Tone[] = ['primary', 'glow', 'warm'];
      sparks = Array.from({ length: sparkCount }, (_, idx) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: -0.25 - Math.random() * 0.45,
        size: 16 + Math.random() * 14,
        tone: toneList[idx % 3],
        phase: Math.random() * Math.PI * 2,
      }));
    };

    initStreams();

    const drawStreamHead = (colIndex: number, rowPos: number) => {
      const x = Math.round(colIndex * fontSize + fontSize * 0.5 - HALF_TILE);
      const row = Math.floor(rowPos);
      const y = row * fontSize;
      if (y < -fontSize * 2 || y > height + fontSize * 2) return;

      const tone = tones[colIndex];
      const headBit: '0' | '1' = Math.random() > 0.5 ? '1' : '0';
      const bodyBit: '0' | '1' = headBit === '1' ? '0' : '1';
      const tailBit: '0' | '1' = Math.random() > 0.5 ? '1' : '0';

      // Fast GPU texture blits from pre-rendered glowing glyph sprites (zero per-frame shadowBlur cost)
      if (y - fontSize * 2 > 0) {
        ctx.drawImage(sprites.tail[tone][tailBit], x, y - fontSize * 2 - HALF_TILE);
      }
      if (y - fontSize > 0) {
        ctx.drawImage(sprites.body[tone][bodyBit], x, y - fontSize - HALF_TILE);
      }
      const headSprite =
        Math.random() > 0.35 ? sprites.headWhite[headBit] : sprites.headWarm[headBit];
      ctx.drawImage(headSprite, x, y - HALF_TILE);
    };

    const draw = () => {
      if (document.hidden) return;

      ctx.fillStyle = 'rgba(6, 7, 14, 0.13)';
      ctx.fillRect(0, 0, width, height);

      // Rising ambient cyber sparks via pre-rendered radial sprite
      for (let s = 0; s < sparks.length; s++) {
        const sp = sparks[s];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.phase += 0.06;

        if (sp.y < -20) {
          sp.y = height + 20;
          sp.x = Math.random() * width;
        }
        if (sp.x < -20) sp.x = width + 20;
        if (sp.x > width + 20) sp.x = -20;

        ctx.drawImage(
          sprites.spark[sp.tone],
          Math.round(sp.x - sp.size * 0.5),
          Math.round(sp.y - sp.size * 0.5),
          sp.size,
          sp.size
        );
      }

      const maxRows = Math.ceil(height / fontSize);

      for (let i = 0; i < columns; i++) {
        if (Math.random() > 0.08) {
          drawStreamHead(i, dropsA[i]);
        }
        if (Math.random() > 0.14) {
          drawStreamHead(i, dropsB[i]);
        }

        dropsA[i] += speeds[i];
        dropsB[i] += speeds[i];

        if (dropsA[i] > maxRows + 4 && Math.random() > 0.92) {
          dropsA[i] = Math.floor(Math.random() * -10) - 2;
        }
        if (dropsB[i] > maxRows + 4 && Math.random() > 0.92) {
          dropsB[i] = Math.floor(Math.random() * -12) - 4;
        }
      }
    };

    const startLoop = () => {
      if (intervalId !== null) window.clearInterval(intervalId);
      intervalId = window.setInterval(draw, 62);
    };

    const stopLoop = () => {
      if (intervalId !== null) {
        window.clearInterval(intervalId);
        intervalId = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else {
        startLoop();
      }
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStreams();
    };

    const styleObserver = new MutationObserver(() => {
      theme = getThemeHsl();
      sprites = buildSpriteBank(theme, fontSize);
    });
    styleObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style'],
    });

    startLoop();
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      stopLoop();
      styleObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden [contain:strict]"
    >
      {/* Filter-free Multi-Tone Ambient Aurora Layer (zero CSS blur-filter compositor overhead) */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(600px circle at 8% 6%, hsl(var(--primary) / 0.24) 0%, transparent 72%),
            radial-gradient(560px circle at 92% 28%, hsl(var(--primary-glow) / 0.20) 0%, transparent 72%),
            radial-gradient(580px circle at 24% 92%, hsl(var(--accent-warm) / 0.14) 0%, hsl(var(--primary) / 0.08) 48%, transparent 75%)
          `,
        }}
      />

      {/* Subtle Cyber Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.16] [mask-image:radial-gradient(ellipse_90%_80%_at_50%_40%,#000_35%,transparent_100%)]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--primary) / 0.16) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary-glow) / 0.14) 1px, transparent 1px)
          `,
          backgroundSize: '54px 54px',
        }}
      />

      {/* Hardware-Accelerated Sprite-Blitted Matrix Rain & Cyber Sparks Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-[0.38]"
      />
    </div>
  );
};
