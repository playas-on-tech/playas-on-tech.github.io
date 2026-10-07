"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/lang";
import { EVENT } from "@/lib/event";
import { remaining, type Remaining } from "@/lib/countdown";

const TARGET = new Date(EVENT.dateISO).getTime();

export default function Countdown() {
  const { t } = useLang();
  const [value, setValue] = useState<Remaining | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    setValue(remaining(TARGET));
    const id = setInterval(() => setValue(remaining(TARGET)), 1000);
    return () => clearInterval(id);
  }, []);

  if (mounted && value === null) {
    return <p className="text-[clamp(1.4rem,3vw,2rem)] font-semibold tracking-tight text-white">{t("aniversario.countdown.today")}</p>;
  }

  const units = ["days", "hours", "minutes", "seconds"] as const;

  return (
    <div className="flex items-stretch justify-center gap-3 sm:gap-4">
      {units.map((unit) => (
        <div
          key={unit}
          className="glass min-w-[68px] rounded-2xl border border-white/15 bg-white/10 px-3 py-4 text-center sm:min-w-[88px] sm:px-5"
        >
          <div className="text-[clamp(1.8rem,5vw,3rem)] font-bold leading-none tracking-tightest text-white tabular-nums">
            {mounted && value ? String(value[unit]).padStart(2, "0") : "--"}
          </div>
          <div className="mt-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/60">
            {t(`aniversario.countdown.${unit}`)}
          </div>
        </div>
      ))}
    </div>
  );
}
