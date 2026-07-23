"use client";

import { useEffect, useState } from "react";
import { ANIV_EVENT } from "./event";
import { useTranslation } from "react-i18next";

type Remaining = { days: number; hours: number; minutes: number; seconds: number };

const TARGET = new Date(ANIV_EVENT.dateISO).getTime();

function getRemaining(): Remaining | null {
  const diff = TARGET - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const { t } = useTranslation();
  const [remaining, setRemaining] = useState<Remaining | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    setRemaining(getRemaining());
    const id = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const units: { key: keyof Remaining; label: string }[] = [
    { key: "days", label: t("aniversario.countdown.days") },
    { key: "hours", label: t("aniversario.countdown.hours") },
    { key: "minutes", label: t("aniversario.countdown.minutes") },
    { key: "seconds", label: t("aniversario.countdown.seconds") },
  ];

  if (mounted && remaining === null) {
    return (
      <p className="text-[clamp(1.4rem,3vw,2rem)] font-semibold tracking-tight text-white">
        {t("aniversario.countdown.today")}
      </p>
    );
  }

  return (
    <div className="flex items-stretch justify-center gap-3 sm:gap-4">
      {units.map((unit) => (
        <div
          key={unit.key}
          className="glass min-w-[68px] rounded-2xl border border-white/15 bg-white/10 px-3 py-4 text-center sm:min-w-[88px] sm:px-5"
        >
          <div className="text-[clamp(1.8rem,5vw,3rem)] font-bold leading-none tracking-tightest text-white tabular-nums">
            {mounted && remaining ? String(remaining[unit.key]).padStart(2, "0") : "--"}
          </div>
          <div className="mt-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/60">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
}
