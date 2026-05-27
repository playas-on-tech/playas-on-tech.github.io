import type { Lang } from "@/i18n/lang";

// Single source of truth for the 7th-anniversary event details.
// Target timestamp is pinned to Manzanillo time (UTC-6, no DST in Colima).
export const ANIV_EVENT = {
  edition: "7º Aniversario",
  editionTag: "Edición especial · 7ª edición",
  dateISO: "2026-07-18T10:00:00-06:00",
  dateLabel: "Sábado 18 de julio, 2026",
  timeLabel: "10:00 a 18:00 hrs",
  venue: "Hotel Marbella",
  venueCity: "Manzanillo, Colima",
  venueAddress: "Marbella 7, Playa Azul Salagua, 28218 Manzanillo, Col.",
  mapQuery: "Hotel Marbella Manzanillo Colima",
  eventbriteEventId: "1990496734315",
  eventbriteUrl: "https://www.eventbrite.com.mx/e/7o-aniversario-playasontech-tickets-1990496734315?aff=oddtdtcreator",
} as const;

// English-localized labels for the same event. Static data (dateISO, venue,
// venueAddress, URLs) is shared above.
export const ANIV_EVENT_EN = {
  edition: "7th Anniversary",
  editionTag: "Special edition · 7th meetup",
  dateLabel: "Saturday, July 18, 2026",
  timeLabel: "10:00 to 18:00",
  venueCity: "Manzanillo, Colima",
} as const;

// Lang-aware accessor — returns merged copy for the requested locale.
export function anivEvent(lang: Lang) {
  if (lang === "en") {
    return {
      ...ANIV_EVENT,
      edition: ANIV_EVENT_EN.edition,
      editionTag: ANIV_EVENT_EN.editionTag,
      dateLabel: ANIV_EVENT_EN.dateLabel,
      timeLabel: ANIV_EVENT_EN.timeLabel,
      venueCity: ANIV_EVENT_EN.venueCity,
    };
  }
  return ANIV_EVENT;
}

// Absolute links so the nav works from both /aniversario and its sub-pages.
const ANIV_NAV_ES = [
  { href: "/aniversario#programa", label: "Programa" },
  { href: "/aniversario#ponentes", label: "Ponentes" },
  { href: "/aniversario#ubicacion", label: "Ubicación" },
  { href: "/aniversario/patrocinadores", label: "Patrocinadores" },
] as const;

const ANIV_NAV_EN = [
  { href: "/en/aniversario#programa", label: "Program" },
  { href: "/en/aniversario#ponentes", label: "Speakers" },
  { href: "/en/aniversario#ubicacion", label: "Location" },
  { href: "/en/aniversario/sponsors", label: "Sponsors" },
] as const;

// Legacy export kept for components that haven't been refactored yet.
export const ANIV_NAV = ANIV_NAV_ES;

export function anivNav(lang: Lang) {
  return lang === "en" ? ANIV_NAV_EN : ANIV_NAV_ES;
}

// Sponsorship fundraising goal + link to the full breakdown of commitments.
export const SPONSORSHIP = {
  goalMXN: 130000,
  goalUSD: 7700, // rounded for display
  // Mix: 1 Title + 2 Platinum + 4 Gold + 2 Silver = $130K exact.
  raisedMXN: 0, // update as sponsors confirm
  // TODO: swap for the full sponsorship deck (Notion / Google Doc / PDF) when ready.
  detailsUrl: "https://www.instagram.com/playasontech_mzo",
} as const;

// Public ticket — symbolic donation that funds the operation of the community.
// Sponsor courtesy tickets do NOT charge this price but DO include the same shirt.
export const TICKET = {
  priceMXN: 150,
  priceUSD: 9,
  includes: [
    "Acceso al evento completo",
    "Playera oficial del 7º Aniversario",
  ],
} as const;
