import { expect, test } from "./helpers";
import { remaining } from "../src/lib/countdown";
import { editionCount } from "../src/lib/editions";
import { subjectFor } from "../src/lib/contact";
import { localeTag, money } from "../src/lib/format";

test("the countdown reports the time left, and nothing once the date has passed", () => {
  const event = Date.UTC(2026, 6, 18, 18, 0, 0);

  expect(remaining(event, event - 90_061_000)).toEqual({ days: 1, hours: 1, minutes: 1, seconds: 1 });
  expect(remaining(event, event)).toBeNull();
  expect(remaining(event, event + 1000)).toBeNull();
});

test("the edition count follows the every-two-months calendar", () => {
  expect(editionCount(new Date(2019, 5, 1))).toBe(1);
  expect(editionCount(new Date(2019, 7, 1))).toBe(2);
  expect(editionCount(new Date(2026, 6, 1))).toBe(43);
});

test("the contact subject keeps the sponsor prefix and falls back to the default", () => {
  expect(subjectFor({ category: "Sponsor", subject: "Gold package" }, "Nuevo Mensaje")).toBe("[Patrocinador] Gold package");
  expect(subjectFor({ category: "Speaker", subject: "" }, "Nuevo Mensaje")).toBe("[Playas on Tech - Speaker] Nuevo Mensaje");
});
test("numbers are read in the language the visitor is using", () => {
  expect(localeTag("es")).toBe("es-MX");
  expect(localeTag("en")).toBe("en-US");
  expect(money(5000, "es-MX")).toBe("5,000");
  expect(money(45000, "en-US")).toBe("45,000");
});
