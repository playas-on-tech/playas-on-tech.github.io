import { useEffect, useRef } from "react";
import { Close, ChevronRight, Download } from "../Icons";

const BUTTON =
  "grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white";

const SWIPE_THRESHOLD = 48;

type LightboxLabels = {
  close: string;
  prev?: string;
  next?: string;
  download?: string;
  counter?: string;
};

type Props = {
  src: string;
  alt: string;
  labels: LightboxLabels;
  onClose: () => void;
  /** Present when the lightbox is part of a gallery: adds prev/next and swipe. */
  onStep?: (delta: number) => void;
};

export default function Lightbox({ src, alt, labels, onClose, onStep }: Props) {
  const touchStart = useRef(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (onStep && e.key === "ArrowLeft") onStep(-1);
      else if (onStep && e.key === "ArrowRight") onStep(1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onStep]);

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-900/95 p-4 backdrop-blur-sm"
      onClick={onClose}
      onTouchStart={(e) => (touchStart.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (!onStep) return;
        const dx = e.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(dx) > SWIPE_THRESHOLD) onStep(dx < 0 ? 1 : -1);
      }}
    >
      {onStep && (
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-3 sm:p-4">
          <span className="px-2 text-sm font-medium text-white/70">{labels.counter}</span>
          <div className="flex gap-2">
            <a href={src} download aria-label={labels.download} title={labels.download} className={BUTTON} onClick={stop}>
              <Download size={20} />
            </a>
            <button type="button" onClick={onClose} aria-label={labels.close} title={labels.close} className={BUTTON}>
              <Close />
            </button>
          </div>
        </div>
      )}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={onStep ? "max-h-[82vh] max-w-full rounded-xl object-contain shadow-2xl" : "max-h-full max-w-full rounded-lg object-contain"}
        onClick={stop}
      />

      {onStep && (
        <>
          <button type="button" onClick={(e) => { stop(e); onStep(-1); }} aria-label={labels.prev} title={labels.prev} className={`${BUTTON} absolute left-2 top-1/2 -translate-y-1/2 sm:left-4`}>
            <ChevronRight size={20} className="rotate-180" />
          </button>
          <button type="button" onClick={(e) => { stop(e); onStep(1); }} aria-label={labels.next} title={labels.next} className={`${BUTTON} absolute right-2 top-1/2 -translate-y-1/2 sm:right-4`}>
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {!onStep && (
        <button type="button" onClick={onClose} aria-label={labels.close} title={labels.close} className={`${BUTTON} absolute right-4 top-4`}>
          <Close />
        </button>
      )}
    </div>
  );
}
