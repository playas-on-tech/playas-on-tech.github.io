import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import Marquee from "@/components/Marquee";
import StatsStrip from "@/components/StatsStrip";
import Comunidad from "@/components/Comunidad";
import CodeOfConduct from "@/components/CodeOfConduct";
import Eventos from "@/components/Eventos";
import EditionsTimeline from "@/components/EditionsTimeline";
import Venue from "@/components/Venue";
import Videos from "@/components/Videos";
import Organizadores from "@/components/Organizadores";
import SobreNosotros from "@/components/SobreNosotros";
import FAQ from "@/components/FAQ";
import { faqItems } from "@/components/faqItems";
import Donaciones from "@/components/Donaciones";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";
import SiteEffects from "@/components/SiteEffects";
import JsonLd from "@/components/JsonLd";

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.es.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

const faqPageSchemaEn = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.en.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function Home() {
  return (
    <>
      <JsonLd data={faqPageSchema} />
      <JsonLd data={faqPageSchemaEn} />
      <Header />
      <main>
        <Hero />
        <Statement />
        <Marquee />
        <StatsStrip />
        <Comunidad />
        <CodeOfConduct />
        <Eventos />
        <EditionsTimeline />
        <Venue />
        <Videos />
        <Organizadores />
        <SobreNosotros />
        <FAQ />
        <Donaciones />
        <Contacto />
      </main>
      <Footer />
      {/* Wires up the prototype's scroll-reveal, count-up and hero parallax. */}
      <SiteEffects />
    </>
  );
}

