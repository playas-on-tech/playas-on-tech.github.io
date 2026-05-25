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
} as const;

export const ANIV_NAV = [
  { href: "#programa", label: "Programa" },
  { href: "#ponentes", label: "Ponentes" },
  { href: "#ubicacion", label: "Ubicación" },
  { href: "#patrocinadores", label: "Patrocinadores" },
] as const;
