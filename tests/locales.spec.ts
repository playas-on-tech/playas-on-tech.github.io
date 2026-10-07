import { expect, test, locale } from "./helpers";

function keys(value: unknown, prefix = ""): string[] {
  if (value === null || typeof value !== "object") return [prefix];
  return Object.entries(value).flatMap(([key, entry]) => keys(entry, prefix ? `${prefix}.${key}` : key));
}

function values(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (value === null || typeof value !== "object") return [];
  return Object.values(value).flatMap(values);
}

test("the Spanish and English dictionaries hold the same keys", () => {
  expect(keys(locale("en")).sort()).toEqual(keys(locale("es")).sort());
});

// Every route serves both languages, so a dictionary must not point at a language-prefixed path.
test("no dictionary value points at a language-prefixed route", () => {
  for (const lang of ["es", "en"]) {
    expect(values(locale(lang)).filter((value) => value.startsWith("/en"))).toEqual([]);
  }
});
