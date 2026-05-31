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

// ══════════════════════════════════════════════════════════════════════
// Multi‑lingual support (es / en)
//
// Language switching is handled entirely on the client via a cookie and
// the DOM `lang` attribute.  Both languages share the same URL — there
// are no separate /es/ and /en/ routes.
//
// SEO note: hreflang tags in the <head> (set via Next.js Metadata
// `alternates.languages`) point both languages to the same canonical URL
// because we don't use URL‑based routing.  This is a known limitation of
// the static‑export + GitHub Pages setup.  If true multilingual SEO
// becomes critical, consider generating separate builds per language.
// ══════════════════════════════════════════════════════════════════════

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
