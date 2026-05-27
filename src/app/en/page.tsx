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
import FAQ, { faqItems } from "@/components/FAQ";
import Donaciones from "@/components/Donaciones";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";
import SiteEffects from "@/components/SiteEffects";
import JsonLd from "@/components/JsonLd";

const faqPageSchema = {
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

export default function HomeEn() {
  return (
    <>
      <JsonLd data={faqPageSchema} />
      <Header lang="en" />
      <main>
        <Hero lang="en" />
        <Statement lang="en" />
        <Marquee lang="en" />
        <StatsStrip lang="en" />
        <Comunidad lang="en" />
        <CodeOfConduct lang="en" />
        <Eventos lang="en" />
        <EditionsTimeline lang="en" />
        <Venue lang="en" />
        <Videos lang="en" />
        <Organizadores lang="en" />
        <SobreNosotros lang="en" />
        <FAQ lang="en" />
        <Donaciones lang="en" />
        <Contacto lang="en" />
      </main>
      <Footer lang="en" />
      <SiteEffects />
    </>
  );
}
