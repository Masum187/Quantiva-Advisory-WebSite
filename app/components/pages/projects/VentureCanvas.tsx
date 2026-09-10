'use client';

import React, { useEffect, useRef } from 'react';
import type { VentureEffect } from '../../../lib/data/projects';

/**
 * Signature-Canvas-Hintergrund für die Venture-Detailseiten.
 * Vier Modi: network (Knoten + Verbindungen), threads (fließende Fäden),
 * radar (rotierender Sweep mit Blips), ledger (verkettete Evidenz-Zeilen).
 */
export default function VentureCanvas({
  effect,
  accent,
  className = '',
}: {
  effect: VentureEffect;
  accent: string;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const onResize = () => resize();
    window.addEventListener('resize', onResize);

    // ---- Effekt-Zustände ----
    type Node = { x: number; y: number; vx: number; vy: number; r: number };
    let nodes: Node[] = [];
    if (effect === 'network') {
      const count = 46;
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * (width || 1200),
        y: Math.random() * (height || 800),
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1 + Math.random() * 2,
      }));
    }

    type Blip = { angle: number; dist: number; born: number };
    let blips: Blip[] = [];
    if (effect === 'radar') {
      blips = Array.from({ length: 9 }, () => ({
        angle: Math.random() * Math.PI * 2,
        dist: 0.15 + Math.random() * 0.75,
        born: -10,
      }));
    }

    type Row = { y: number; chars: string; alpha: number };
    let rows: Row[] = [];
    const glyphs = '0123456789abcdef';
    const makeHash = (len: number) =>
      Array.from({ length: len }, () => glyphs[Math.floor(Math.random() * glyphs.length)]).join('');
    if (effect === 'ledger') {
      const rowCount = 22;
      rows = Array.from({ length: rowCount }, (_, i) => ({
        y: i,
        chars: makeHash(56),
        alpha: 0.04 + Math.random() * 0.1,
      }));
    }

    let t = 0;

    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, width, height);

      if (effect === 'network') {
        // Knoten bewegen
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < -20) n.x = width + 20;
          if (n.x > width + 20) n.x = -20;
          if (n.y < -20) n.y = height + 20;
          if (n.y > height + 20) n.y = -20;
        }
        // Verbindungen
        const maxDist = Math.min(width, height) * 0.22;
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const d = Math.hypot(dx, dy);
            if (d < maxDist) {
              ctx.strokeStyle = accent;
              ctx.globalAlpha = (1 - d / maxDist) * 0.22;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(nodes[i].x, nodes[i].y);
              ctx.lineTo(nodes[j].x, nodes[j].y);
              ctx.stroke();
            }
          }
        }
        // Knoten
        for (const n of nodes) {
          ctx.globalAlpha = 0.55;
          ctx.fillStyle = accent;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      if (effect === 'threads') {
        const lines = 14;
        for (let i = 0; i < lines; i++) {
          const yBase = (height / (lines + 1)) * (i + 1);
          const amp = 14 + (i % 5) * 9;
          const speed = 0.4 + (i % 4) * 0.18;
          const phase = t * speed + i * 1.3;
          ctx.strokeStyle = accent;
          ctx.globalAlpha = 0.05 + (i % 4) * 0.035;
          ctx.lineWidth = i % 6 === 0 ? 1.6 : 1;
          ctx.beginPath();
          for (let x = 0; x <= width; x += 12) {
            const y =
              yBase +
              Math.sin(x * 0.008 + phase) * amp +
              Math.sin(x * 0.021 + phase * 1.7) * amp * 0.35;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }

      if (effect === 'radar') {
        const cx = width / 2;
        const cy = height / 2;
        const maxR = Math.max(width, height) * 0.62;
        // Ringe
        for (let i = 1; i <= 4; i++) {
          ctx.strokeStyle = accent;
          ctx.globalAlpha = 0.07;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(cx, cy, (maxR / 4) * i, 0, Math.PI * 2);
          ctx.stroke();
        }
        // Sweep
        const sweep = t * 0.55;
        const grad = ctx.createConicGradient
          ? ctx.createConicGradient(sweep, cx, cy)
          : null;
        if (grad) {
          grad.addColorStop(0, `${accent}55`);
          grad.addColorStop(0.12, `${accent}00`);
          grad.addColorStop(1, `${accent}00`);
          ctx.fillStyle = grad;
          ctx.globalAlpha = 0.5;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.arc(cx, cy, maxR, 0, Math.PI * 2);
          ctx.fill();
        }
        // Blips leuchten auf, wenn der Sweep sie passiert
        for (const b of blips) {
          const diff = ((sweep - b.angle) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
          if (diff < 0.05) b.born = t;
          const age = t - b.born;
          if (age < 2.4) {
            const alpha = Math.max(0, 1 - age / 2.4);
            const bx = cx + Math.cos(b.angle) * b.dist * maxR * 0.62;
            const by = cy + Math.sin(b.angle) * b.dist * maxR * 0.62;
            ctx.globalAlpha = alpha * 0.9;
            ctx.fillStyle = accent;
            ctx.beginPath();
            ctx.arc(bx, by, 3.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = alpha * 0.25;
            ctx.beginPath();
            ctx.arc(bx, by, 10 + age * 9, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
        ctx.globalAlpha = 1;
      }

      if (effect === 'ledger') {
        ctx.font = '11px ui-monospace, SFMono-Regular, Menlo, monospace';
        const lineH = Math.max(26, height / (rows.length + 2));
        for (const r of rows) {
          const y = (r.y + 1) * lineH;
          // gelegentlich neue Hashes "schreiben"
          if (Math.random() < 0.012) {
            r.chars = makeHash(56);
            r.alpha = 0.28;
          }
          r.alpha = Math.max(0.045, r.alpha * 0.985);
          ctx.globalAlpha = r.alpha;
          ctx.fillStyle = accent;
          ctx.fillText(`${r.chars.slice(0, 8)}…${r.chars.slice(8, 40)}`, 24, y);
          // Verkettungs-Pfeil
          ctx.globalAlpha = r.alpha * 0.6;
          ctx.fillText('⛓', 8, y);
        }
        ctx.globalAlpha = 1;
      }

      if (!reduceMotion) raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [effect, accent]);

  return <canvas ref={canvasRef} className={`h-full w-full ${className}`} aria-hidden="true" />;
}
