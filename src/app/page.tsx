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
import Donaciones from "@/components/Donaciones";
import Merch from "@/components/Merch";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";
import SiteEffects from "@/components/SiteEffects";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";
import es from "@/i18n/locales/es.json";
import en from "@/i18n/locales/en.json";

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema(es.faq.items)} />
      <JsonLd data={faqSchema(en.faq.items)} />
      <Header />
      <main>
        <Hero />
        <Eventos />
        <Statement />
        <Marquee />
        <StatsStrip />
        <Comunidad />
        <CodeOfConduct />
        <EditionsTimeline />
        <Venue />
        <Videos />
        <Organizadores />
        <SobreNosotros />
        <FAQ />
        <Donaciones />
        <Merch />
        <Contacto />
      </main>
      <Footer />
      {/* Wires up the prototype's scroll-reveal, count-up and hero parallax. */}
      <SiteEffects />
    </>
  );
}
