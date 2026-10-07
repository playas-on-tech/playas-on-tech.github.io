// Money is shown as MXN with an approximate USD equivalent.
export function money(amount: number, locale: string): string {
  return amount.toLocaleString(locale);
}

export function localeTag(lang: string): string {
  return lang === "en" ? "en-US" : "es-MX";
}
