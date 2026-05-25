// Single source of truth for the 7th-anniversary event details.
// Target timestamp is pinned to Manzanillo time (UTC-6, no DST in Colima).
export const ANIV_EVENT = {
  edition: "7º Aniversario",
  editionTag: "Edición especial · 7ª edición",
  dateISO: "2026-07-18T17:00:00-06:00",
  dateLabel: "Sábado 18 de julio, 2026",
  timeLabel: "17:00 hrs",
  venue: "Hotel Marbella",
  venueCity: "Manzanillo, Colima",
  venueAddress: "Marbella 7, Playa Azul Salagua, 28218 Manzanillo, Col.",
  mapQuery: "Hotel Marbella Manzanillo Colima",
  // Registration is handled by Eventbrite Embedded Checkout.
  // Paste the numeric Eventbrite event ID here (from the event's URL,
  // e.g. .../e/mi-evento-1234567890 → "1234567890"). While empty, the
  // "Reservar" button falls back to linking out to `eventbriteUrl`.
  eventbriteEventId: "",
  eventbriteUrl: "https://www.eventbrite.com/o/playas-on-tech",
} as const;

// Absolute links so the nav works from both /aniversario and its sub-pages.
export const ANIV_NAV = [
  { href: "/aniversario#programa", label: "Programa" },
  { href: "/aniversario#ponentes", label: "Ponentes" },
  { href: "/aniversario#ubicacion", label: "Ubicación" },
  { href: "/aniversario/patrocinadores", label: "Patrocinadores" },
] as const;

// Sponsorship fundraising goal + link to the full breakdown of commitments.
export const SPONSORSHIP = {
  goalMXN: 130000,
  raisedMXN: 0, // update as sponsors confirm
  // TODO: swap for the full sponsorship deck (Notion / Google Doc / PDF) when ready.
  detailsUrl: "https://www.instagram.com/playasontech_mzo",
} as const;
