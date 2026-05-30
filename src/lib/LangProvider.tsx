"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { Lang } from "@/i18n/lang";

const COOKIE_NAME = "playasontech_lang";

function readCookie(): Lang | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]*)`));
  const val = match?.[1];
  if (val === "en" || val === "es") return val;
  return null;
}

function detectBrowserLang(): Lang {
  if (typeof navigator === "undefined") return "es";
  for (const l of navigator.languages ?? []) {
    if (l.startsWith("en")) return "en";
  }
  return "es";
}

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangContextValue | null>(null);

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within a LangProvider");
  return ctx;
}

export default function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  // Detect language on first mount only (no cookie → browser detection)
  useEffect(() => {
    const cookie = readCookie();
    if (cookie) {
      setLangState(cookie);
      document.documentElement.lang = cookie;
    } else {
      const detected = detectBrowserLang();
      if (detected !== "es") {
        setLangState(detected);
        document.documentElement.lang = detected;
      }
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    document.cookie = `${COOKIE_NAME}=${l};path=/;max-age=31536000;SameSite=Lax`;
    document.documentElement.lang = l;
    setLangState(l);
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}
