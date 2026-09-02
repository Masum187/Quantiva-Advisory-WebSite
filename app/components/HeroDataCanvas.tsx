'use client';

import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  glow: string;
  phase: number;
  pulseSpeed: number;
};

const ORANGE = ['255, 140, 66', '255, 179, 107', '255, 106, 26'];
const WHITE = ['255, 255, 255', '210, 225, 235'];

/**
 * Animated particle network over the hero data-landscape image.
 * Glowing dots drift slowly and connect with faint lines, echoing the
 * orange/white mesh of the background motif. Pure canvas, no deps.
 */
export default function HeroDataCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let raf = 0;
    let running = false;
    let last = performance.now();

    const spawn = (count: number) => {
      particles = Array.from({ length: count }, () => {
        const isOrange = Math.random() < 0.62;
        const palette = isOrange ? ORANGE : WHITE;
        const rgb = palette[Math.floor(Math.random() * palette.length)];
        // Concentrate particles in the lower 65% where the terrain sits
        const y = height * (0.35 + Math.random() * 0.65);
        const depth = (y - height * 0.35) / (height * 0.65); // 0 far, 1 near
        return {
          x: Math.random() * width,
          y,
          vx: (Math.random() - 0.5) * (8 + depth * 18),
          vy: -(2 + Math.random() * 6) * (0.4 + depth),
          radius: 0.8 + depth * 2.2 + Math.random() * 0.6,
          color: `rgba(${rgb}, 1)`,
          glow: rgb,
          phase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.4 + Math.random() * 1.1,
        };
      });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      spawn(Math.round(Math.min(110, Math.max(45, width / 16))));
    };

    const drawFrame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, width, height);

      const time = now / 1000;

      // Move + draw connection lines first (below the dots)
      for (const p of particles) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < height * 0.3) {
          p.y = height + 8;
          p.x = Math.random() * width;
        }
      }

      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < 110 * 110) {
            const alpha = 0.14 * (1 - Math.sqrt(dist2) / 110);
            ctx.strokeStyle = `rgba(255, 150, 80, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        const pulse = 0.55 + 0.45 * Math.sin(time * p.pulseSpeed + p.phase);
        const r = p.radius * (0.85 + 0.3 * pulse);
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4);
        grad.addColorStop(0, `rgba(${p.glow}, ${0.85 * pulse})`);
        grad.addColorStop(0.4, `rgba(${p.glow}, ${0.25 * pulse})`);
        grad.addColorStop(1, `rgba(${p.glow}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${p.glow}, ${0.9 * pulse})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (now: number) => {
      drawFrame(now);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    if (reduceMotion) {
      // Single static frame, no animation
      drawFrame(performance.now());
    } else {
      start();
    }

    // Pause when the hero scrolls out of view or tab is hidden
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0.05 }
    );
    io.observe(canvas);

    const onVisibility = () =>
      document.hidden ? stop() : start();
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('resize', resize);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
