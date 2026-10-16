"use client";

import { useEffect, useRef } from "react";

/**
 * Drifting "market data" points behind the hero window. `boost` (0..1) speeds the
 * drift and pulls points toward the centre — used for the dive at the end of the hero.
 * Pauses when off-screen and stays still under reduced motion.
 */
export default function ParticleField({ boost = 0 }: { boost?: number }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const boostRef = useRef(boost);
  useEffect(() => {
    boostRef.current = boost;
  }, [boost]);

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    type P = { x: number; y: number; vx: number; vy: number; r: number; hue: number };
    let pts: P[] = [];

    const resize = () => {
      w = c.clientWidth;
      h = c.clientHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(110, (w * h) / 14000));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.4,
        hue: Math.random() < 0.7 ? 0 : 1,
      }));
    };

    // Drawing is batched: one path per colour for the dots and one per strength band for the
    // links, so a frame is a handful of draw calls instead of thousands.
    const LINK_BANDS = [0.03, 0.06, 0.09, 0.12];
    const DOT_COLOURS = ["rgba(65,196,225,0.55)", "rgba(168,225,13,0.55)"];
    // The drift is slow, so 30 fps looks identical and halves the work; full rate during the dive.
    let odd = false;
    const draw = () => {
      const b = boostRef.current;
      odd = !odd;
      if (odd && b === 0 && !still) {
        if (visible) raf = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      if (!still) {
        for (const p of pts) {
          const step = b === 0 ? 2 : 1; // two frames' worth of drift when drawing every other frame
          p.x += (p.vx * (1 + b * 6) + (cx - p.x) * 0.004 * b) * step;
          p.y += (p.vy * (1 + b * 6) + (cy - p.y) * 0.004 * b) * step;
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
          if (p.y < -10) p.y = h + 10;
          if (p.y > h + 10) p.y = -10;
        }
      }
      for (let hue = 0; hue < 2; hue++) {
        ctx.beginPath();
        for (const p of pts) {
          if (p.hue !== hue) continue;
          const r = p.r * (1 + b);
          ctx.moveTo(p.x + r, p.y);
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        }
        ctx.fillStyle = DOT_COLOURS[hue];
        ctx.fill();
      }
      // Faint links between near neighbours, grouped by strength.
      ctx.lineWidth = 0.6;
      const bands = LINK_BANDS.map(() => new Path2D());
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 9000) {
            const band = Math.min(LINK_BANDS.length - 1, Math.floor((1 - d2 / 9000) * LINK_BANDS.length));
            bands[band].moveTo(pts[i].x, pts[i].y);
            bands[band].lineTo(pts[j].x, pts[j].y);
          }
        }
      }
      bands.forEach((path, i) => {
        ctx.strokeStyle = `rgba(65,196,225,${LINK_BANDS[i]})`;
        ctx.stroke(path);
      });
      if (!still && visible) raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(draw);
    });

    resize();
    draw();
    io.observe(c);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvas} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
