import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms and licenses — Playas on Tech",
  description:
    "How Playas on Tech operates: an independent, non-profit community. Content under Creative Commons (CC BY 4.0), software under the MIT license, and a code of conduct for everyone.",
};

const CC_BY = "https://creativecommons.org/licenses/by/4.0/";
const REPO_LICENSE = "https://github.com/playas-on-tech/playas-on-tech.github.io/blob/main/LICENSE";

export default function TermsEnPage() {
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
              Terms and licenses
            </h1>
            <p className="cine cine-3 mx-auto mt-5 max-w-[52ch] text-lg leading-relaxed text-white/80">
              How Playas on Tech operates and under what conditions we share everything we do.
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
              <h2 className="text-2xl font-semibold tracking-tight text-navy">Who we are</h2>
              <p className="mt-3 text-lg leading-relaxed text-navy/70">
                Playas on Tech is an independent, non-profit community organized by a group of
                volunteers in Manzanillo, Colima. We are not a company nor do we sell a product:
                we exist to bring together those building tech on the coast and share knowledge
                openly and freely.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-navy">Non-profit</h2>
              <p className="mt-3 text-lg leading-relaxed text-navy/70">
                Events are free. We sustain ourselves with donations and sponsorships, and proceeds
                go solely to making the community possible: venue, audio and video, coffee and
                production. No profits are distributed; organizing work is volunteer-led.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-navy">
                Content — Creative Commons (CC BY 4.0)
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-navy/70">
                Talks, slides, recordings and other community materials are shared under{" "}
                <a
                  href={CC_BY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-ocean underline-offset-4 hover:underline"
                >
                  Creative Commons Attribution 4.0 (CC BY 4.0)
                </a>
                . You are free to copy, share and adapt the content, even commercially, as long as
                you credit Playas on Tech and the speaker. Each speaker&apos;s content is theirs
                and is published with their authorization.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-navy">
                Software — MIT License
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-navy/70">
                Demos, tools and this site&apos;s code are free software under the{" "}
                <a
                  href={REPO_LICENSE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-ocean underline-offset-4 hover:underline"
                >
                  MIT license
                </a>
                . You can use, modify and redistribute it freely, keeping the copyright notice. It
                is provided &ldquo;as is&rdquo;, without warranties.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-navy">Code of conduct</h2>
              <p className="mt-3 text-lg leading-relaxed text-navy/70">
                Participating in any Playas on Tech activity implies accepting our{" "}
                <Link
                  href="/en/code-of-conduct"
                  className="font-semibold text-ocean underline-offset-4 hover:underline"
                >
                  code of conduct
                </Link>
                , which ensures a safe and respectful space for everyone.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-navy">Notice</h2>
              <p className="mt-3 text-lg leading-relaxed text-navy/70">
                Brands, logos and content from speakers and sponsors belong to their respective
                owners. Event information may change; please confirm details when you register.
                This community is organized with the best intent and the materials are offered for
                educational and outreach purposes.
              </p>
            </div>

            <p className="border-t border-navy/10 pt-8 text-lg leading-relaxed text-navy/60">
              Questions about these terms? Write to us on{" "}
              <a
                href="https://www.instagram.com/playasontech_mzo"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-ocean underline-offset-4 hover:underline"
              >
                Instagram
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer lang="en" />
    </>
  );
}
