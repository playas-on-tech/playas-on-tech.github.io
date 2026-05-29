import Link from "next/link";
import Footer from "@/components/Footer";

const expected = [
  "Treat others with respect and consideration.",
  "Contribute to a friendly, collaborative environment.",
  "Listen to and value different points of view and experiences.",
];

const unacceptable = [
  "Harassment or intimidation in any form.",
  "Sexual or inappropriate language or imagery.",
  "Discriminatory or derogatory comments toward others.",
  "Interrupting or sabotaging talks, activities or conversations.",
];

export default function CodeOfConductEnPage() {
  return (
    <>
      <main>
        <section className="mesh-hero grain relative overflow-hidden">
          <div className="blobs cine-field">
            <span className="blob blob-teal" />
            <span className="blob blob-ocean" />
            <span className="blob blob-aqua" />
            <span className="blob blob-sunset" />
          </div>
          <div className="relative z-10 mx-auto max-w-[900px] px-6 pb-28 pt-28 text-center lg:pt-32">
            <Link
              href="/en"
              className="cine cine-1 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-white"
            >
              ← Back to home
            </Link>
            <h1 className="cine cine-2 mt-6 text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-tightest text-white">
              Code of Conduct
            </h1>
            <p className="cine cine-3 mx-auto mt-5 max-w-[50ch] text-lg leading-relaxed text-white/80">
              We want every Playas on Tech meetup to be a safe, welcoming space for all people.
            </p>
          </div>
          <svg
            className="wave-divider absolute inset-x-0 bottom-[-1px] z-[5]"
            viewBox="0 0 1440 130"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M-120,70 C140,130 380,8 620,52 C880,100 1140,132 1380,74 C1460,56 1520,62 1560,72 L1560,131 L-120,131 Z"
              fill="#FBF6EE"
            />
          </svg>
        </section>

        <section className="bg-cream px-6 py-24 lg:py-28">
          <div className="mx-auto max-w-[760px] space-y-12">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-navy">Our commitment</h2>
              <p className="mt-3 text-lg leading-relaxed text-navy/70">
                We want every event to be a safe and welcoming space for everyone. We do not
                tolerate any form of harassment or discrimination on grounds of gender, sexual
                orientation, disability, appearance, race, age or religion.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-navy">Expected behavior</h2>
              <ul className="mt-4 space-y-3 text-lg text-navy/70">
                {expected.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ocean" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-navy">
                Unacceptable behavior
              </h2>
              <ul className="mt-4 space-y-3 text-lg text-navy/70">
                {unacceptable.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sunset" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-navy">How to report</h2>
              <p className="mt-3 text-lg leading-relaxed text-navy/70">
                If you witness or experience behavior that breaches this code, approach any
                organizing team member. You can also report it confidentially via our Instagram:{" "}
                <a
                  href="https://www.instagram.com/playasontech_mzo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-ocean underline-offset-4 hover:underline"
                >
                  @playasontech_mzo
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-navy">Consequences</h2>
              <p className="mt-3 text-lg leading-relaxed text-navy/70">
                The organizing team will take the measures it deems necessary, which may include a
                warning, expulsion from the event, or a ban from future events.
              </p>
            </div>

            <p className="border-t border-navy/10 pt-8 text-lg leading-relaxed text-navy/60">
              Thank you for helping us keep a safe and pleasant space for everyone.
            </p>
          </div>
        </section>
      </main>
      <Footer lang="en" />
    </>
  );
}
