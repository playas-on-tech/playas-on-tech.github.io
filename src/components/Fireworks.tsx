"use client";

import { useEffect, useRef } from "react";

// Design-token palette: sunset + ocean + white
const COLORS = ["#FF6B4A", "#FF8A5C", "#FFB066", "#15A6BC", "#2DD4BF", "#5EE0D0", "#FFFFFF"];
const BURST_COUNT = 9;
const BURST_INTERVAL = 450;
const PARTICLES_PER_BURST = 42;
const GRAVITY = 0.045;
const FADE = 0.012;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
}

/** One-shot canvas firework show; plays on mount, then stops and clears itself. */
export default function Fireworks() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const parent = canvas.parentElement as HTMLElement;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = parent.offsetWidth * dpr;
      canvas.height = parent.offsetHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = [];
    const burst = () => {
      const cx = canvas.width * (0.15 + Math.random() * 0.7);
      const cy = canvas.height * (0.15 + Math.random() * 0.4);
      const base = COLORS[(Math.random() * COLORS.length) | 0];
      for (let i = 0; i < PARTICLES_PER_BURST; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = (1.5 + Math.random() * 3.5) * dpr;
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          color: Math.random() < 0.7 ? base : COLORS[(Math.random() * COLORS.length) | 0],
          size: (1 + Math.random() * 2) * dpr,
        });
      }
    };

    burst();
    let bursts = 1;
    const interval = setInterval(() => {
      burst();
      if (++bursts >= BURST_COUNT) clearInterval(interval);
    }, BURST_INTERVAL);

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += GRAVITY * dpr;
        p.vx *= 0.99;
        p.life -= FADE;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (particles.length > 0 || bursts < BURST_COUNT) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[5] h-full w-full"
    />
  );
}
