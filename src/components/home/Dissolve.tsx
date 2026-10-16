"use client";

import { useEffect, useRef, useState } from "react";

export type Box = { x: number; y: number; w: number; h: number };
type Pixel = { x: number; y: number; c: string };

const COUNT = 1700;
const SAMPLE_W = 170; // the robot is sampled on a 170px-wide grid; each particle lands on one cell

// Seeded random numbers so every visitor sees the same burst.
function seeded(seed: number) {
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

// Loose clusters the shards drift into before they assemble (x, y direction from the robot's centre).
const CLUSTERS = [[1, -1], [1, 1], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [-1, 0]] as const;

const PARTICLES = (() => {
  const r = seeded(0x7ade5);
  return Array.from({ length: COUNT }, () => {
    const roll = r();
    const angle = r() * Math.PI * 2;
    return {
      angle,
      cos: Math.cos(angle), // precomputed once, not every frame
      sin: Math.sin(angle),
      reach: 0.18 + 0.95 * r(),
      ox: r() - 0.5, // where on the window this shard starts
      oy: r() - 0.5,
      delay: 0.42 * r(), // when it breaks off during the burst
      land: 0.45 * r(), // when it starts flying to the robot
      cluster: CLUSTERS[Math.floor(r() * CLUSTERS.length)],
      sx: r() - 0.5,
      sy: r() - 0.5,
      curve: (r() - 0.5) * 0.55,
      kind: roll > 0.86 ? 2 : roll > 0.66 ? 1 : 0, // 0 dot · 1 streak · 2 big dot
      lime: r() > 0.86,
    };
  });
})();

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const hex = (r: number, g: number, b: number) =>
  "#" + [r, g, b].map((v) => Math.min(255, Math.round(v)).toString(16).padStart(2, "0")).join("");

/** Reads the robot image into a grid of coloured points for the particles to land on. */
async function samplePixels(src: string): Promise<Pixel[]> {
  const img = new Image();
  img.decoding = "async";
  img.src = src;
  await img.decode();
  const h = Math.max(1, Math.round((img.naturalHeight / img.naturalWidth) * SAMPLE_W));
  const cv = document.createElement("canvas");
  cv.width = SAMPLE_W;
  cv.height = h;
  const ctx = cv.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];
  ctx.drawImage(img, 0, 0, SAMPLE_W, h);
  const { data } = ctx.getImageData(0, 0, SAMPLE_W, h);
  const out: Pixel[] = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < SAMPLE_W; x++) {
      const i = (y * SAMPLE_W + x) * 4;
      if (data[i + 3] <= 150) continue;
      // Lift dark armour colours so they still glow against the background.
      out.push({ x: x / SAMPLE_W, y: y / h, c: hex(60 + data[i] * 0.86, 70 + data[i + 1] * 0.86, 78 + data[i + 2] * 0.86) });
    }
  }
  return out;
}

/**
 * The window shatters into glowing shards (`burst` 0→1), which drift into clusters and then
 * fly onto the robot's silhouette, taking its colours (`assemble` 0→1).
 * `from` is the window's box, `to` the robot's box, both in stage pixels.
 */
export default function Dissolve({
  burst,
  assemble,
  from,
  to,
  src,
}: {
  burst: number;
  assemble: number;
  from: Box | null;
  to: Box | null;
  src: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [pixels, setPixels] = useState<Pixel[] | null>(null);

  useEffect(() => {
    let live = true;
    samplePixels(src)
      .then((p) => live && p.length > 0 && setPixels(p))
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [src]);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const W = cv.clientWidth;
    const H = cv.clientHeight;
    if (cv.width !== Math.round(W * dpr) || cv.height !== Math.round(H * dpr)) {
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    if (burst <= 0.001 || assemble >= 0.999 || !from) return;

    const spread = 0.62 * Math.max(W, H);
    const hub = to ? { x: to.x + to.w / 2, y: to.y + to.h / 2 } : { x: W * 0.66, y: H / 2 };
    const landing = Boolean(pixels && to && assemble > 0);
    ctx.globalCompositeOperation = "lighter";

    PARTICLES.forEach((p, i) => {
      const s = clamp((burst - p.delay) / (1 - p.delay));
      if (s <= 0) return;
      const o = 1 - Math.pow(1 - s, 2.2);

      // 1. Fly outward from the window (biased right, toward the robot).
      const x0 = from.x + from.w * (0.5 + p.ox);
      const y0 = from.y + from.h * (0.5 + p.oy);
      const cos = p.cos;
      const fx = x0 + (cos < 0 ? 0.45 * cos : cos) * spread * p.reach * o;
      const fy = y0 + p.sin * spread * p.reach * o * 0.75;
      // 2. Drift into a loose cluster around the robot.
      const [cx, cy] = p.cluster;
      const ax = hub.x + cx * W * (cx < 0 ? 0.18 : 0.22) + p.sx * W * 0.12;
      const ay = hub.y + cy * H * 0.34 + p.sy * H * 0.14;
      const drift = o * o;
      let x = fx + (ax - fx) * drift;
      let y = fy + (ay - fy) * drift;
      let colour = p.lime ? "#a8e10d" : "#41c4e1";
      let e = 0;

      // 3. Fly onto a point of the robot, curving slightly, and take its colour.
      if (landing && pixels && to) {
        const px = pixels[Math.floor((i * pixels.length) / COUNT)];
        const tx = to.x + px.x * to.w;
        const ty = to.y + px.y * to.h;
        e = 1 - Math.pow(1 - clamp((assemble - p.land) / (1 - p.land)), 3);
        const bend = Math.sin(Math.PI * e) * p.curve * 0.18;
        const nx = x + (tx - x) * e + (ty - y) * bend;
        const ny = y + (ty - y) * e - (tx - x) * bend;
        x = nx;
        y = ny;
        if (e > 0.35) colour = px.c;
      }

      // Bright while bursting and in flight; fades as it lands and the real robot takes over.
      const alpha = Math.sin(Math.PI * clamp(burst)) * (1 - 0.45 * s) * (1 - 0.7 * e) + e * (1 - e) * 1.2;
      if (alpha <= 0.012) return;
      ctx.globalAlpha = Math.min(1, 1.7 * alpha);
      ctx.fillStyle = landing && e > 0.5 ? colour : o < 0.6 ? "#d9f7ff" : colour;
      const size = p.kind === 2 ? 3 : 1.9;
      const settle = 1 - Math.pow(1 - e, 2);
      if (p.kind === 1 && settle < 0.85) {
        // Streaks point along their direction of travel.
        const dir = landing ? Math.atan2(y - fy, x - fx) : p.angle;
        const len = 3.2 * size * (1 - settle);
        const c = Math.cos(dir);
        const sn = Math.sin(dir);
        ctx.setTransform(dpr * c, dpr * sn, -dpr * sn, dpr * c, dpr * x, dpr * y);
        ctx.fillRect(-len / 2, -0.6, len, 1.2);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      } else {
        ctx.fillRect(x - size / 2, y - size / 2, size, size);
      }
    });
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  }, [burst, assemble, from, to, pixels]);

  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />;
}
