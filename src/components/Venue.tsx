import { Check } from "./Icons";

const features = [
  "WiFi rápido y enchufes de sobra",
  "Estacionamiento cercano",
  "Café, snacks y buena vibra",
];

export default function Venue() {
  return (
    <section id="venue" className="bg-cream-100 px-6 py-28 lg:py-36">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-2">
        <div className="reveal relative overflow-hidden rounded-[2rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=1600&auto=format&fit=crop"
            alt=""
            className="h-full w-full object-cover transition duration-700 hover:scale-105"
          />
        </div>
        <div className="reveal">
          <span className="inline-block rounded-full bg-navy px-3.5 py-1.5 text-[13px] font-600 text-white">
            Venue
          </span>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3.2rem)] font-600 leading-[1.05] tracking-tightest">
            Donde sucede la magia.
          </h2>
          <p className="mt-5 max-w-[44ch] text-lg leading-relaxed text-navy/60">
            Un espacio cómodo, con buen internet y mejor ambiente, a unos pasos del mar. El lugar
            exacto se anuncia con cada edición.
          </p>
          <ul className="mt-8 space-y-3 text-navy/70">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-ocean/15 text-ocean">
                  <Check size={14} />
                </span>{" "}
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
