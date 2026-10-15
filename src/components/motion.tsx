"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/** Shared rAF scroll loop so every pinned section updates in one pass. */
const listeners = new Set<() => void>();
let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    ticking = false;
    listeners.forEach((fn) => fn());
  });
}
function subscribe(fn: () => void) {
  if (listeners.size === 0) {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  }
  listeners.add(fn);
  fn();
  return () => {
    listeners.delete(fn);
    if (listeners.size === 0) {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    }
  };
}

/**
 * A tall section whose inner stage sticks to the viewport while you scroll.
 * Writes --k (0 → 1) on itself and reports progress to children via render prop.
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
    const static_ = window.matchMedia("(max-width: 860px), (prefers-reduced-motion: reduce)");
    return subscribe(() => {
      if (static_.matches) {
        el.style.setProperty("--k", "1");
        setK(1);
        return;
      }
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 1;
      el.style.setProperty("--k", p.toFixed(4));
      el.classList.toggle("is-on", r.top < window.innerHeight && r.bottom > 0);
      setK((prev) => (Math.abs(prev - p) > 0.004 ? p : prev));
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

/** Counts up from 0 when scrolled into view. */
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
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const step = (t: number) => {
        const p = Math.min(1, (t - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(to * eased);
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
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
  useEffect(() => {
    if (!active) return;
    let i = 0;
    let n = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const full = phrases[i % phrases.length];
      n += deleting ? -1 : 1;
      setText(full.slice(0, n));
      let wait = deleting ? 22 : 48;
      if (!deleting && n === full.length) {
        deleting = true;
        wait = 1800;
      } else if (deleting && n === 0) {
        deleting = false;
        i++;
        wait = 400;
      }
      timer = setTimeout(tick, wait);
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [phrases, active]);
  return text;
}
