// Single source of truth for supported locales. Spanish is the default — it
// lives at the site root (/), English mirrors at /en/*. Components accept a
// `lang` prop (defaulting to "es") and look up their copy from a co-located
// COPY constant keyed by Lang.
export const LANGS = ["es", "en"] as const;
export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = "es";

// Maps a Spanish URL path to its English counterpart and vice versa.
// Used by the language switcher in the header.
const PATH_MAP: Record<string, { es: string; en: string }> = {
  home: { es: "/", en: "/en" },
  aniversario: { es: "/aniversario", en: "/en/aniversario" },
  patrocinadores: {
    es: "/patrocinadores",
    en: "/en/sponsors",
  },
  patrocinadoresAniversario: {
    es: "/aniversario/patrocinadores",
    en: "/en/aniversario/sponsors",
  },
  codigoConducta: { es: "/codigo-conducta", en: "/en/code-of-conduct" },
  terminos: { es: "/terminos", en: "/en/terms" },
};

export function altLangHref(currentPath: string, currentLang: Lang): string {
  const target: Lang = currentLang === "es" ? "en" : "es";
  // Strip trailing slash for matching
  const normalized = currentPath.replace(/\/$/, "") || "/";
  for (const entry of Object.values(PATH_MAP)) {
    if (entry[currentLang] === normalized) return entry[target];
  }
  return target === "en" ? "/en" : "/";
}
