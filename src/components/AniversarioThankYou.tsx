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

const PHOTO_DELAY = 3000; // 3 seconds between photos
const SHRINK_DELAY = 1500; // Delay before stack shrinks

interface PhotoState {
  src: string;
  angle: number;
  opacity: number;
}

export default function AniversarioThankYou() {
  const [photos, setPhotos] = useState<PhotoState[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [stackShrunk, setStackShrunk] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    
    const addPhoto = () => {
      if (currentIndex >= PHOTOS.length) {
        // All photos added, wait then shrink
        setTimeout(() => {
          setStackShrunk(true);
          setShowMessage(true);
        }, SHRINK_DELAY);
        return;
      }

      const newPhoto: PhotoState = {
        src: PHOTOS[currentIndex],
        angle: (Math.random() - 0.5) * 4, // ±2 degrees
        opacity: 1,
      };

      setPhotos((prev) => [newPhoto, ...prev]);
      currentIndex++;

      setTimeout(addPhoto, PHOTO_DELAY);
    };

    // Start with first photo after a brief delay
    const timer = setTimeout(addPhoto, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="mesh-hero grain relative min-h-screen overflow-hidden">
      <div className="blobs cine-field">
        <span className="blob blob-teal" />
        <span className="blob blob-ocean" />
        <span className="blob blob-aqua" />
        <span className="blob blob-sunset" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 pt-8 pb-32">
        {/* Photo stack */}
        <div
          className={`transition-all duration-700 ease-out ${
            stackShrunk ? "max-h-[40vh] scale-95" : "max-h-screen"
          }`}
        >
          {photos.map((photo, index) => (
            <div
              key={photo.src}
              className="absolute inset-x-0 mx-auto rounded-xl overflow-hidden shadow-2xl shadow-navy/30 border border-white/10"
              style={{
                transform: `rotate(${photo.angle}deg)`,
                zIndex: index,
                opacity: photo.opacity,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Message - appears after stack shrinks */}
        {showMessage && (
          <div className="mt-16 text-center animate-[cine-in_0.5s_ease-out]">
            <h2 className="text-3xl font-bold leading-tight tracking-tightest text-white">
              ¡Gracias por ser parte de esta historia!
            </h2>

            <p className="mt-6 max-w-[50ch] mx-auto text-lg leading-relaxed text-white/80">
              Este 7º aniversario fue posible gracias a ustedes: nuestro increíble equipo de voluntarios, 
              los patrocinadores que creyeron en nosotros, y cada asistente que hizo de este evento 
              una celebración inolvidable frente al mar.
            </p>

            <p className="mt-4 max-w-[50ch] mx-auto text-lg leading-relaxed text-white/80">
              Juntos construimos algo especial. La comunidad tech del Pacífico mexicano sigue creciendo, 
              y cada meetup nos acerca un poco más.
            </p>

            <p className="mt-8 text-xl font-semibold text-white">
              ¡Nos vemos el próximo año!
            </p>
          </div>
        )}

        {/* Discrete CTA link at bottom */}
        <div className="mt-16 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/50 hover:text-white/80 transition"
          >
            Volver al inicio
            <ArrowUpRight size={12} />
          </Link>
        </div>

        {/* Postal footer */}
        <div className="mt-12 pt-6 border-t border-white/10 text-xs text-white/40 flex justify-between items-center px-6">
          <span>Playas on Tech · Manzanillo, Colima</span>
          <span>7º Aniversario</span>
        </div>
      </div>
    </section>
  );
}
