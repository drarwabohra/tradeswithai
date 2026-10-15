"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export function GalleryLightbox({
  images,
  productName,
}: {
  images: string[];
  productName: string;
}) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const close = useCallback(() => setActiveIdx(null), []);

  const prev = useCallback(() => {
    setActiveIdx((curr) => {
      if (curr === null) return null;
      return curr > 0 ? curr - 1 : images.length - 1;
    });
  }, [images.length]);

  const next = useCallback(() => {
    setActiveIdx((curr) => {
      if (curr === null) return null;
      return curr < images.length - 1 ? curr + 1 : 0;
    });
  }, [images.length]);

  useEffect(() => {
    if (activeIdx === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [activeIdx, close, prev, next]);

  return (
    <>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setActiveIdx(index)}
            className="group relative block aspect-[4/3] w-full overflow-hidden rounded-xl border border-hairline bg-surface min-h-[44px] text-left cursor-pointer transition hover:border-cyan/50 focus-visible:outline-2 focus-visible:outline-lime"
            aria-label={`Open ${productName} screenshot ${index + 1} in gallery lightbox`}
          >
            <Image
              src={src}
              alt={`${productName} screenshot ${index + 1}`}
              fill
              sizes="(max-width: 768px) 90vw, 400px"
              priority={index === 0}
              className="object-contain p-2 transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <span className="absolute bottom-2.5 right-2.5 rounded bg-surface/90 border border-hairline px-2 py-0.5 font-mono text-[11px] text-mist opacity-80 group-hover:opacity-100">
              {index + 1} / {images.length}
            </span>
          </button>
        ))}
      </div>

      {activeIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${productName} screenshot preview`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-abyss/95 backdrop-blur-md p-4 sm:p-8"
          onClick={close}
        >
          <div
            className="relative flex flex-col items-center max-w-5xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar */}
            <div className="w-full flex items-center justify-between pb-3 border-b border-hairline text-xs font-mono text-mist">
              <span className="text-ink font-semibold">
                {productName} · Screenshot {activeIdx + 1} of {images.length}
              </span>
              <button
                type="button"
                onClick={close}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-hairline bg-surface text-mist hover:text-ink hover:border-cyan min-h-[44px] transition"
                aria-label="Close lightbox (Esc)"
              >
                <span>Close</span>
                <X size={16} aria-hidden="true" />
              </button>
            </div>

            {/* Image viewer with nav arrows */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[72vh] my-4 rounded-xl overflow-hidden border border-hairline bg-surface">
              <Image
                src={images[activeIdx]}
                alt={`${productName} full screenshot ${activeIdx + 1}`}
                fill
                sizes="(max-width: 1200px) 90vw, 1100px"
                className="object-contain p-2 sm:p-4"
                priority
              />

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-11 w-11 rounded-full bg-deep/80 border border-hairline text-ink hover:border-cyan hover:bg-surface min-h-[44px] min-w-[44px] transition shadow-lg"
                    aria-label="Previous screenshot (Left arrow)"
                  >
                    <ChevronLeft size={22} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-11 w-11 rounded-full bg-deep/80 border border-hairline text-ink hover:border-cyan hover:bg-surface min-h-[44px] min-w-[44px] transition shadow-lg"
                    aria-label="Next screenshot (Right arrow)"
                  >
                    <ChevronRight size={22} aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            {/* Keyboard hint footer */}
            <div className="text-center font-mono text-[11px] text-dim">
              Use <kbd className="px-1.5 py-0.5 rounded border border-hairline bg-surface">←</kbd> and <kbd className="px-1.5 py-0.5 rounded border border-hairline bg-surface">→</kbd> to navigate · <kbd className="px-1.5 py-0.5 rounded border border-hairline bg-surface">Esc</kbd> to exit
            </div>
          </div>
        </div>
      )}
    </>
  );
}
