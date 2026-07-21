"use client";

import Link from "next/link";
import { ArrowUpRight } from "./SocialIcons";
import { useEffect, useState } from "react";

const PHOTOS = [
  "/assets/7aniversario/1.webp",
  "/assets/7aniversario/2.webp",
  "/assets/7aniversario/3.webp",
  "/assets/7aniversario/4.webp",
  "/assets/7aniversario/5.webp",
  "/assets/7aniversario/6.webp",
  "/assets/7aniversario/7.webp",
  "/assets/7aniversario/8.webp",
  "/assets/7aniversario/9.webp",
  "/assets/7aniversario/10.webp",
];

const PHOTO_INTERVAL = 5000;
const DROP_DURATION = 800;

export default function AniversarioThankYou() {
  const [droppedCount, setDroppedCount] = useState(0);
  const [stackShrunk, setStackShrunk] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDroppedCount(i);
      if (i >= PHOTOS.length) {
        clearInterval(interval);
        setTimeout(() => setStackShrunk(true), 1200);
        setTimeout(() => setShowMessage(true), 1900);
      }
    }, PHOTO_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const angles = [
    -2.5, 1.8, -1.2, 3.0, -0.8, 2.2, -1.8, 1.0, -2.0, 1.5,
  ];

  return (
    <>
      <style>{`
        @keyframes drop-in {
          0% {
            transform: translateY(-110vh) rotate(var(--angle)) scale(1.1);
            opacity: 0;
          }
          60% {
            opacity: 1;
          }
          100% {
            transform: translateY(0) rotate(var(--angle)) scale(1);
            opacity: 1;
          }
        }
        @keyframes drop-in-curve {
          0% {
            transform: translateY(-110vh) translateX(var(--drift)) rotate(var(--angle)) scale(1.1);
            opacity: 0;
          }
          60% {
            opacity: 1;
          }
          100% {
            transform: translateY(0) translateX(0) rotate(var(--angle)) scale(1);
            opacity: 1;
          }
        }
        @keyframes settle {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(0.55) translateY(-15vh);
          }
        }
        @keyframes fade-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <section className="mesh-hero grain relative min-h-screen overflow-hidden">
        <div className="blobs cine-field">
          <span className="blob blob-teal" />
          <span className="blob blob-ocean" />
          <span className="blob blob-aqua" />
          <span className="blob blob-sunset" />
        </div>

        {/* Photo stack - centered in viewport */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div
            className="relative transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            style={{
              width: "min(92vw, 750px)",
              aspectRatio: "4/3",
              transform: stackShrunk
                ? "scale(0.45) translateY(-38vh)"
                : "scale(1) translateY(0)",
            }}
          >
            {PHOTOS.slice(0, droppedCount).map((src, i) => {
              const angle = angles[i % angles.length];
              const drift = ((i % 3) - 1) * 15;
              const isNewest = i === droppedCount - 1;

              return (
                <div
                  key={src}
                  className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl shadow-navy/40 border border-white/10"
                  style={{
                    zIndex: i,
                    "--angle": `${angle}deg`,
                    "--drift": `${drift}px`,
                    animation: isNewest
                      ? `drop-in-curve ${DROP_DURATION}ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards`
                      : "none",
                    transform: isNewest
                      ? undefined
                      : `translateY(0) translateX(0) rotate(${angle}deg)`,
                    opacity: isNewest ? 0 : 1,
                  } as React.CSSProperties}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Message and footer - appears after stack shrinks */}
        <div
          className="relative z-20 mx-auto max-w-[600px] px-6 pt-[60vh] text-center"
          style={{
            opacity: showMessage ? 1 : 0,
            transform: showMessage ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <h2 className="text-3xl font-bold leading-tight tracking-tightest text-white">
            ¡Gracias por ser parte de esta historia!
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-white/80">
            Este 7º aniversario fue posible gracias a ustedes: nuestro
            increíble equipo de voluntarios, los patrocinadores que creyeron en
            nosotros, y cada asistente que hizo de este evento una celebración
            inolvidable frente al mar.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-white/80">
            Juntos construimos algo especial. La comunidad tech del Pacífico
            mexicano sigue creciendo, y cada meetup nos acerca un poco más.
          </p>

          <p className="mt-8 text-xl font-semibold text-white">
            ¡Nos vemos el próximo año!
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 mt-12 text-sm font-medium text-white/40 hover:text-white/70 transition"
          >
            Volver al inicio
            <ArrowUpRight size={12} />
          </Link>

          <div className="mt-10 pt-6 border-t border-white/10 text-xs text-white/30 flex justify-between items-center">
            <span>Playas on Tech · Manzanillo, Colima</span>
            <span>7º Aniversario</span>
          </div>
        </div>
      </section>
    </>
  );
}
