import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import Marquee from "@/components/Marquee";
import StatsStrip from "@/components/StatsStrip";
import Comunidad from "@/components/Comunidad";
import CodeOfConduct from "@/components/CodeOfConduct";
import Eventos from "@/components/Eventos";
import Venue from "@/components/Venue";
import Videos from "@/components/Videos";
import Donaciones from "@/components/Donaciones";
import Footer from "@/components/Footer";
import SiteEffects from "@/components/SiteEffects";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Statement />
        <Marquee />
        <StatsStrip />
        <Comunidad />
        <CodeOfConduct />
        <Eventos />
        <Venue />
        <Videos />
        <Donaciones />
      </main>
      <Footer />
      {/* Wires up the prototype's scroll-reveal, count-up and hero parallax. */}
      <SiteEffects />
    </>
  );
}
