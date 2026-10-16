"use client";

import { useEffect, useRef } from "react";

/* The robot is alive on its own: 48 frames of a head turn (frame 1 looks hard left, frame 48
   hard right). Left alone, it glances around — turns to a new spot, holds, looks elsewhere.
   When the visitor moves the mouse it follows the cursor instead, and drifts back to
   glancing around a couple of seconds after the mouse goes still. */
export const ROBOT_FRAMES = {
  count: 48,
  front: 26, // facing the viewer: used for the particle silhouette and the dive
  ratio: 1000 / 750,
  eye: { x: 0.5467, y: 0.2863 }, // eye centre on the front frame
  src: (n: number) => `/hero/robot/frame-${String(n).padStart(3, "0")}.webp`,
};

const FOLLOW_EASE = 0.18; // snappy when following the cursor
const GLANCE_EASE = 0.055; // calmer when looking around on its own
const IDLE_MS = 2000; // mouse still this long → back to looking around
const GLANCE_HOLD = [1100, 2600]; // ms it holds each look

export default function RobotHead({ lock }: { lock: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lockRef = useRef(lock);
  const kick = useRef<() => void>(() => {});

  useEffect(() => {
    lockRef.current = lock;
    kick.current();
  }, [lock]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const { count, front } = ROBOT_FRAMES;
    const frames: (ImageBitmap | null)[] = Array(count).fill(null);
    let current = front - 1;
    let pointer = front - 1; // where the cursor points (0-based frame)
    let lastMove = -Infinity; // when the mouse last moved
    let glance = front - 1; // where it is looking on its own
    let nextGlance = 0;
    let shown = -1;
    let raf = 0;
    let visible = true;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Nearest frame that has finished loading, so the head never blanks while the rest stream in.
    const nearestLoaded = (i: number) => {
      for (let d = 0; d < count; d++) {
        if (frames[i - d]) return i - d;
        if (frames[i + d]) return i + d;
      }
      return -1;
    };

    const draw = (i: number) => {
      const n = nearestLoaded(i);
      if (n < 0 || n === shown) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(frames[n]!, 0, 0, w, h);
      shown = n;
    };

    const following = (now: number) => now - lastMove < IDLE_MS;
    const idle = () => !lockRef.current && !still;

    const target = (now: number) => {
      if (!idle()) return front - 1;
      if (following(now)) return pointer;
      // Looking around: pick a fresh spot a good distance from the last one, hold, repeat.
      if (now >= nextGlance) {
        let next = glance;
        while (Math.abs(next - glance) < count * 0.25) next = 3 + Math.random() * (count - 7);
        glance = next;
        nextGlance = now + GLANCE_HOLD[0] + Math.random() * (GLANCE_HOLD[1] - GLANCE_HOLD[0]);
      }
      return glance;
    };

    const tick = (now: number) => {
      const t = target(now);
      current += (t - current) * (following(now) ? FOLLOW_EASE : GLANCE_EASE);
      draw(Math.round(current));
      // Runs while it is on screen and free to move; when locked it settles on the front and stops.
      raf = visible && (idle() || Math.abs(t - current) > 0.5) ? requestAnimationFrame(tick) : 0;
    };
    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    kick.current = start;

    const onMove = (e: MouseEvent) => {
      pointer = Math.round((e.clientX / window.innerWidth) * (count - 1));
      lastMove = performance.now();
      glance = pointer; // when the mouse rests, the next look starts from where it was pointing
      nextGlance = lastMove + IDLE_MS;
      start();
    };
    // Only animate while the hero is on screen.
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
    });
    io.observe(canvas);
    const onResize = () => {
      shown = -1;
      draw(Math.round(current));
    };

    // Frames are decoded in the background (createImageBitmap) as they arrive, at the size they
    // are shown, so drawing one is instant: no decode stalls the first time the head turns there.
    // Front frame first (it is what the particles assemble into), then the rest.
    let cancelled = false;
    const decodeWidth = Math.min(1000, Math.max(400, Math.round(canvas.clientWidth * Math.min(2, window.devicePixelRatio || 1))));
    const load = async (i: number) => {
      try {
        const blob = await (await fetch(ROBOT_FRAMES.src(i + 1))).blob();
        let bmp: ImageBitmap;
        try {
          bmp = await createImageBitmap(blob, {
            resizeWidth: decodeWidth,
            resizeHeight: Math.round(decodeWidth / ROBOT_FRAMES.ratio),
            resizeQuality: "high",
          });
        } catch {
          bmp = await createImageBitmap(blob);
        }
        if (cancelled) return bmp.close();
        frames[i] = bmp;
        if (i === Math.round(current) || shown < 0) {
          shown = -1;
          draw(Math.round(current));
        }
      } catch {
        // A missing frame just falls back to its nearest neighbour.
      }
    };
    load(front - 1).then(() => {
      for (let i = 0; i < count && !cancelled; i++) if (!frames[i]) load(i);
    });

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", onResize);
    start();
    return () => {
      cancelled = true;
      frames.forEach((f) => f?.close());
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="relative h-full w-full" aria-hidden="true" />;
}
