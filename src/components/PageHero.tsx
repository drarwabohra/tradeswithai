import type { ReactNode } from "react";

export default function PageHero({
  eyebrow,
  title,
  sub,
  children,
  c = "#41c4e1",
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  children?: ReactNode;
  c?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-hairline pb-16 pt-32 sm:pt-36">
      <div className="hero-env pointer-events-none opacity-70" />
      <div className="bp-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,#000,transparent)]" />
      <div className="relative mx-auto max-w-6xl px-6" style={{ ["--c" as string]: c }}>
        <p className="eyebrow rise-in">
          <b>{eyebrow}</b>
        </p>
        <h1
          className="rise-in mt-4 max-w-[20ch] text-[clamp(2.3rem,5vw,4rem)] font-extrabold leading-[1.03] tracking-[-0.025em]"
          style={{ animationDelay: "80ms" }}
        >
          {title}
        </h1>
        {sub && (
          <p className="serif-sub rise-in mt-5 max-w-[52ch] text-[clamp(1.05rem,1.5vw,1.25rem)] leading-snug" style={{ animationDelay: "160ms" }}>
            {sub}
          </p>
        )}
        {children && (
          <div className="rise-in mt-8" style={{ animationDelay: "240ms" }}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
