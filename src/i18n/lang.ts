// Single source of truth for supported locales. Spanish is the default.
// Components consume lang via LangProvider context or the WithLang bridge.
export const LANGS = ["es", "en"] as const;
export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = "es";

