"use client";
import { ArrowRight, Play } from "./SocialIcons";
import { useTranslation } from "react-i18next";

const CHANNEL_URL = "https://www.youtube.com/@PlayasOnTech";

type VideoItem = { id: string; title: string; meta: string };

export default function Videos() {
  const { t } = useTranslation();
  return (
    <section id="videos" className="bg-cream px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <span className="inline-block rounded-full bg-navy px-3.5 py-1.5 text-[13px] font-semibold text-white">
              {t("videos.pill")}
            </span>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-tightest">
              {t("videos.h2")}
            </h2>
          </div>
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 text-[15px] font-semibold text-navy/70 transition hover:text-navy sm:flex"
          >
            {t("videos.seeAll")} <ArrowRight size={16} />
          </a>
        </div>
        <div className="reveal grid gap-5 md:grid-cols-3">
          {(t("videos.videos", { returnObjects: true }) as VideoItem[]).map((video) => (
            <a
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.title}
                  loading="lazy"
                  className="aspect-video w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 grid place-items-center bg-navy/20 transition group-hover:bg-navy/30">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-white/90 text-navy">
                    <Play size={20} />
                  </span>
                </span>
              </div>
              <h3 className="mt-4 font-semibold leading-snug">{video.title}</h3>
              <p className="mt-1 text-sm text-navy/50">{video.meta}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
