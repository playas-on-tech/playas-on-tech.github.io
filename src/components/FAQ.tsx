// Source-of-truth FAQ data — also consumed by the FAQPage JSON-LD on the
// home page (see src/app/page.tsx) so the answers stay in sync.
export const faqItems: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "¿Qué es Playas on Tech?",
    a: "Playas on Tech es la comunidad de tecnología de Manzanillo, Colima. Reúne a desarrolladores, diseñadores, founders y entusiastas de la tecnología en meetups gratuitos que se realizan cada dos meses, frente al mar. Desde julio de 2025 hemos celebrado seis ediciones, con más de 200 asistentes acumulados.",
  },
  {
    q: "¿Dónde se realiza Playas on Tech?",
    a: "Los meetups se realizan en Manzanillo, Colima, México — en venues de la zona hotelera, siempre cerca o frente al mar. La 7ª edición (julio 2026) será en el Hotel Marbella, sobre Playa Azul Salagua.",
  },
  {
    q: "¿Cuándo es el próximo evento?",
    a: "El próximo meetup es nuestro 7º aniversario: sábado 18 de julio de 2026, de 10:00 a 18:00 hrs, en el Hotel Marbella, Manzanillo. Después de esa fecha, mantenemos cadencia bimestral.",
  },
  {
    q: "¿Cuánto cuesta asistir?",
    a: "La asistencia a Playas on Tech es 100% gratuita. No cobramos entrada, registro ni materiales — nos sostenemos con donaciones de la comunidad y patrocinios.",
  },
  {
    q: "¿Quién puede asistir? ¿Necesito experiencia en tecnología?",
    a: "Cualquier persona interesada en tecnología puede asistir. No se requiere experiencia previa: recibimos desarrolladores senior, estudiantes, diseñadores, founders y curiosos. Si quieres aprender o conocer a la comunidad tech de la costa, aquí cabes.",
  },
  {
    q: "¿Cómo me registro?",
    a: "El registro se hace en playasontech.com, en la sección del próximo evento. Para el 7º aniversario gestionamos el registro vía Eventbrite — es gratuito, pero el cupo es limitado.",
  },
  {
    q: "¿Qué tipo de charlas se dan?",
    a: "Cubrimos temas amplios de tecnología: desarrollo web, animación con GSAP, IA y autenticación, open source, comunidad y código. Hay charlas técnicas profundas, lightning talks y paneles. Las grabaciones quedan en nuestro canal de YouTube @PlayasOnTech.",
  },
  {
    q: "¿Cómo propongo una charla?",
    a: "Cualquier persona puede proponer una charla a través de nuestro formulario público — el enlace está en la sección «Sé voluntario» y en el footer. Revisamos las propuestas en orden y respondemos antes del cierre de programa de cada edición.",
  },
  {
    q: "¿Quién organiza Playas on Tech?",
    a: "Playas on Tech es organizada por un equipo de voluntarios en su tiempo libre, sin fines de lucro. El equipo actual: Danny, Franky, H, Juaneque, Kev y Mane. Buscamos siempre manos nuevas para sumar al equipo.",
  },
  {
    q: "¿Hay comunidades tech similares en Manzanillo o Colima?",
    a: "Playas on Tech es la comunidad de tecnología activa más grande en la costa de Colima, con cadencia bimestral y entrada gratuita. Si conoces otra iniciativa tech local que quiera colaborar, escríbenos.",
  },
  {
    q: "¿Cómo apoyo a la comunidad?",
    a: "Puedes apoyar de tres formas: (1) donando vía PayPal o Patreon — los enlaces están en la sección Donaciones; (2) patrocinando una edición o el aniversario, con paquetes desde $5,000 MXN; (3) sumándote como voluntario al equipo organizador.",
  },
  {
    q: "¿Hay grabaciones de los eventos pasados?",
    a: "Sí. Todas las sesiones recientes están en nuestro canal de YouTube — @PlayasOnTech — bajo licencia Creative Commons (CC BY 4.0). Las puedes ver, compartir y reutilizar dando crédito.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="bg-cream-100 px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-[1100px]">
        <div className="reveal mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="inline-block rounded-full bg-navy px-3.5 py-1.5 text-[13px] font-semibold text-white">
              FAQ
            </span>
            <h2 className="mt-5 max-w-[22ch] text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-tightest">
              Preguntas frecuentes sobre Playas on Tech
            </h2>
          </div>
          <p className="max-w-[38ch] text-lg leading-relaxed text-navy/60">
            Todo lo que necesitas saber antes de unirte al meetup tech del Pacífico mexicano.
          </p>
        </div>

        <ul className="reveal divide-y divide-navy/10 rounded-3xl border border-navy/10 bg-cream">
          {faqItems.map((item) => (
            <li key={item.q}>
              <details className="group px-6 py-5 md:px-8 md:py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left text-lg font-semibold tracking-tight text-navy [&::-webkit-details-marker]:hidden">
                  <span>{item.q}</span>
                  <span
                    aria-hidden="true"
                    className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ocean/12 text-ocean transition-transform duration-200 group-open:rotate-45"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 max-w-[68ch] leading-relaxed text-navy/70">{item.a}</p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
