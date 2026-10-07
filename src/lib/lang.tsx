"use client";

import { createContext, useCallback, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import type { Lang } from "@/i18n/lang";

const COOKIE_NAME = "playasontech_lang";

function readCookie(): Lang | null {
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]*)`));
  const value = match?.[1];
  return value === "en" || value === "es" ? value : null;
}

type Translator = ReturnType<typeof useTranslation>["t"];

type LangContextValue = {
  lang: Lang;
  t: Translator;
  setLang: (lang: Lang) => void;
};

const LangContext = createContext<LangContextValue | null>(null);

/** Language, translator and setter — the single i18n API components use. */
export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within a LangProvider");
  return ctx;
}

export default function LangProvider({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();

  useEffect(() => {
    const cookie = readCookie();
    if (cookie && cookie !== i18n.language) {
      i18n.changeLanguage(cookie);
      document.documentElement.lang = cookie;
    }
  }, []);

  const setLang = useCallback((lang: Lang) => {
    i18n.changeLanguage(lang);
    document.cookie = `${COOKIE_NAME}=${lang};path=/;max-age=31536000;SameSite=Lax`;
    document.documentElement.lang = lang;
  }, []);

  // i18n.language is the source of truth: react-i18next re-renders subscribers on
  // languageChanged, so no duplicate state is needed here.
  const value = { lang: i18n.language as Lang, t, setLang };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}
