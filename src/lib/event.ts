// Locale-independent facts about the 7th-anniversary event.
// Localized labels live in the i18n dictionaries.
export const EVENT = {
  dateISO: "2026-07-18T10:00:00-06:00",
  venue: "Hotel Marbella",
  venueAddress: "Marbella 7, Playa Azul Salagua, 28218 Manzanillo, Col.",
  mapQuery: "Hotel Marbella Manzanillo Colima",
  eventbriteUrl:
    "https://www.eventbrite.com.mx/e/7o-aniversario-playasontech-tickets-1990496734315?aff=oddtdtcreator",
} as const;

// Public ticket — symbolic donation that funds the operation of the community.
// Sponsor courtesy tickets do NOT charge this price but DO include the same shirt.
export const CONTACT_EMAIL = "contacto@playasontech.com";

export const TICKET = { priceMXN: 350, priceUSD: 19 } as const;

export function mapsShare(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function mapsEmbed(query: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}
