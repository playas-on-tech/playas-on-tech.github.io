"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { Lang } from "@/i18n/lang";
import i18n from "@/i18n";

const COOKIE_NAME = "playasontech_lang";

function readCookie(): Lang | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]*)`));
  const val = match?.[1];
  if (val === "en" || val === "es") return val;
  return null;
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
  const [lang, setLangState] = useState<Lang>(() => i18n.language as Lang);

  useEffect(() => {
    const cookie = readCookie();
    if (cookie && cookie !== i18n.language) {
      i18n.changeLanguage(cookie);
      document.documentElement.lang = cookie;
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    i18n.changeLanguage(l);
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
