"use client";
import { useEffect } from "react";
import { Close } from "./Icons";

type Props = {
  src: string;
  alt: string;
  closeLabel?: string;
  onClose: () => void;
};

// Fullscreen image viewer: click backdrop or × / Esc to close; takes the image src — for single-image zoom-in.
// The Aniversario gallery lightbox (arrows, swipe, counter) is still inline in AniversarioThankYou.tsx.
export default function Lightbox({ src, alt, closeLabel = "Close", onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-900/95 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="max-h-full max-w-full rounded-lg object-contain"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        title={closeLabel}
        className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white"
      >
        <Close />
      </button>
    </div>
  );
}
