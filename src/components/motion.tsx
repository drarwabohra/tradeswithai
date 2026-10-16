"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { flushSync } from "react-dom";

/* Shared scroll engine: one rAF pass per frame for every scroll-driven section.
   Each section's page position is measured once and cached, and only re-measured when
   something changes size. Per frame, progress comes from window.scrollY alone, so
   scrolling never forces the browser to recalculate layout. */
type Box = { top: number; bottom: number; height: number };
type Entry = { el: HTMLElement; docTop: number; height: number; fn: (r: Box, vh: number) => void };
const entries = new Set<Entry>();
let ticking = false;
let dirty = true;
let ro: ResizeObserver | null = null;
// Scroll position, read in the scroll event (before any animation writes to the page this
// frame) so reading it never makes the browser stop and redo layout.
let scrollTop = 0;

function frame() {
  ticking = false;
  if (dirty) {
    // All reads in one batch (a single layout), before any section writes anything.
    dirty = false;
    scrollTop = window.scrollY;
    entries.forEach((e) => {
      const r = e.el.getBoundingClientRect();
      e.docTop = r.top + scrollTop;
      e.height = r.height;
    });
  }
  const sy = scrollTop;
  const vh = window.innerHeight;
  entries.forEach((e) => {
    const top = e.docTop - sy;
    e.fn({ top, bottom: top + e.height, height: e.height }, vh);
  });
}
function schedule() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(frame);
}
function onScroll() {
  scrollTop = window.scrollY;
  schedule();
}
function remeasure() {
  dirty = true;
  schedule();
}
function subscribe(el: HTMLElement, fn: (r: Box, vh: number) => void) {
  if (entries.size === 0) {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", remeasure);
    window.addEventListener("load", remeasure);
    ro = new ResizeObserver(remeasure);
    ro.observe(document.body);
  }
  const entry: Entry = { el, docTop: 0, height: 0, fn };
  entries.add(entry);
  ro?.observe(el);
  remeasure();
  return () => {
    entries.delete(entry);
    ro?.unobserve(el);
    if (entries.size === 0) {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", remeasure);
      window.removeEventListener("load", remeasure);
      ro?.disconnect();
      ro = null;
    }
  };
}

/**
 * A tall section whose inner stage sticks to the viewport while you scroll.
 * Reports progress k (0 → 1) to children via render prop, rendered in the same frame.
 */
export function Pin({
  vh = 300,
  className = "",
  stageClassName = "",
  style,
  children,
  id,
}: {
  vh?: number;
  className?: string;
  stageClassName?: string;
  style?: CSSProperties;
  id?: string;
  children: ReactNode | ((k: number) => ReactNode);
}) {
  const ref = useRef<HTMLElement>(null);
  const [k, setK] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const static_ = window.matchMedia("(max-width: 1024px), (prefers-reduced-motion: reduce)");
    let last = -1;
    return subscribe(el, (r, vh) => {
      const span = r.height - vh;
      const p = static_.matches ? 1 : span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 1;
      // Only re-render when progress really moved; render inside this frame so motion never lags a frame.
      if (Math.abs(p - last) < 0.0015 && !(p !== last && (p === 0 || p === 1))) return;
      last = p;
      flushSync(() => setK(p));
    });
  }, []);

  return (
    <section ref={ref} id={id} className={`pin ${className}`} style={{ ["--vh" as string]: vh, ...style }}>
      <div className={`pin-stage ${stageClassName}`}>{typeof children === "function" ? children(k) : children}</div>
    </section>
  );
}

/** Fades/rises children in the first time they enter the viewport. */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={`reveal ${className}`} style={{ ["--d" as string]: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

/**
 * Counts up from 0 when scrolled into view.
 * Renders the real final number in server HTML so SSR & SEO always show real numbers.
 */
export function CountUp({
  to,
  decimals = 0,
  suffix = "",
  duration = 1600,
}: {
  to: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // Default to final value so SSR output and fallback HTML renders the actual figure!
  const [val, setVal] = useState<number>(to);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion - leave the real number untouched
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let raf = 0;
    let animated = false;

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || animated) return;
        animated = true;
        io.disconnect();

        // Start animation from 0 to target
        setVal(0);
        const start = performance.now();
        const step = (t: number) => {
          const p = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(to * eased);
          if (p < 1) {
            raf = requestAnimationFrame(step);
          } else {
            setVal(to);
          }
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.1 }
    );

    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span ref={ref}>
      {val.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

/** Infinite horizontal ticker. */
export function Marquee({ items }: { items: string[] }) {
  const run = (
    <div className="flex items-center gap-8 pr-8">
      {items.map((t) => (
        <span key={t} className="flex items-center gap-8 font-mono text-xs tracking-[0.2em] text-mist">
          {t}
          <span className="text-cyan">◆</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee py-5">
      <div className="marquee-track">
        {run}
        {run}
      </div>
    </div>
  );
}

/** Types a list of phrases into a fake input, then deletes and moves on. */
export function useTyping(phrases: string[], active = true) {
  const [text, setText] = useState("");
  const phrasesRef = useRef(phrases);
  useEffect(() => {
    phrasesRef.current = phrases;
  });

  useEffect(() => {
    if (!active || phrasesRef.current.length === 0) return;
    let i = 0;
    let n = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const list = phrasesRef.current;
      const full = list[i % list.length];
      n += deleting ? -1 : 1;
      setText(full.slice(0, n));

      let wait = deleting ? 24 : 50;
      if (!deleting && n >= full.length) {
        deleting = true;
        wait = 2000;
      } else if (deleting && n <= 0) {
        deleting = false;
        i = (i + 1) % list.length;
        wait = 450;
      }
      timer = setTimeout(tick, wait);
    };

    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, [active]);

  return text;
}

/**
 * Scroll progress for a section that is NOT pinned.
 * `measure` maps the element's rect + viewport height to 0..1. Returns 1 under reduced motion.
 */
export function useScrollProgress<T extends HTMLElement>(measure: (r: Box, vh: number) => number) {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);
  const fn = useRef(measure);
  useEffect(() => {
    fn.current = measure;
  });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let last = -1;
    return subscribe(el, (r, vh) => {
      const v = still ? 1 : Math.min(1, Math.max(0, fn.current(r, vh)));
      if (Math.abs(v - last) < 0.003 && !(v !== last && (v === 0 || v === 1))) return;
      last = v;
      flushSync(() => setP(v));
    });
  }, []);
  return [ref, p] as const;
}

/** Window into a 0..1 progress value: 0 before `a`, 1 after `b`. */
export const span = (k: number, a: number, b: number) => Math.min(1, Math.max(0, (k - a) / (b - a)));
