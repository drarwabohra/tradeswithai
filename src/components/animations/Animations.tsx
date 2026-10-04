"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HeroAnimation({ children }: { children: React.ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // Animate the main heading characters (if we split them) or just fade up lines
    const elements = container.current?.querySelectorAll(".hero-animate");
    if (!elements) return;
    
    gsap.fromTo(elements, 
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1.2, 
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.1
      }
    );

    // Subtle float animation for the hero image
    const image = container.current?.querySelector(".hero-image");
    if (image) {
      gsap.fromTo(image,
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power3.out", delay: 0.4 }
      );
      
      gsap.to(image, {
        y: -15,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.9
      });
    }
  }, { scope: container });

  return <div ref={container}>{children}</div>;
}

export function ScrollReveal({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const container = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    gsap.fromTo(
      container.current,
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: container });

  return <div ref={container} className={className}>{children}</div>;
}

export function StaggerChildren({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const container = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    const childrenElements = container.current?.children;
    if (!childrenElements || childrenElements.length === 0) return;
    
    gsap.fromTo(
      childrenElements,
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
        }
      }
    );
  }, { scope: container });

  return <div ref={container} className={className}>{children}</div>;
}

export function PageGlowBackground() {
  const bg = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    gsap.to(bg.current, {
      backgroundPosition: "200% center",
      duration: 20,
      ease: "none",
      repeat: -1
    });
  }, { scope: bg });

  return (
    <div 
      ref={bg}
      className="pointer-events-none fixed inset-0 -z-10 opacity-30"
      style={{
        backgroundImage: "radial-gradient(circle at center, rgba(25, 195, 218, 0.15) 0%, rgba(16, 17, 19, 0) 50%)",
        backgroundSize: "200% 200%"
      }}
    />
  );
}
