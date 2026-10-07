"use client";

import { useLang } from "@/lib/lang";
import SectionHeader from "@/components/ui/SectionHeader";
import SmartLink from "@/components/ui/SmartLink";

const COMMUNITIES = [
  { name: "Proyecto Ada", logo: "/assets/comunidades-aliadas/Formato - Daniela Cruz.webp", href: "https://www.instagram.com/proyecto.ada" },
  { name: "0xC Community", logo: "/assets/comunidades-aliadas/oxc-community.webp", href: "https://www.instagram.com/0xc.ommunity" },
  { name: "Mobile Developer Community", logo: "/assets/comunidades-aliadas/mdc.webp", href: "https://www.instagram.com/mobiledevelopercommunity/" },
  { name: "GDG Tijuana", logo: "/assets/comunidades-aliadas/gdg-tijuana.webp", href: "https://www.instagram.com/gdg_tijuana/" },
  { name: "Cloud Native Colima", logo: "/assets/comunidades-aliadas/cloud-native-colima.webp", href: "https://www.instagram.com/cloudnativecolima" },
  { name: "Calzada Code", logo: "/assets/comunidades-aliadas/calzada-code.webp", href: "https://www.instagram.com/calzada.code/" },
  { name: "Guayaba Devs", logo: "/assets/comunidades-aliadas/guayaba-devs.webp", href: "https://linktr.ee/guayabadevs" },
  { name: "AWS UG Ensenada", logo: "/assets/comunidades-aliadas/aws-ug-ensenda.webp", href: "https://www.instagram.com/awscommunityens/" },
  { name: "Linuxeros Zapopan", logo: "/assets/comunidades-aliadas/linuxeros-zapopan.webp", href: "https://linuxeroszapopan.org" },
  { name: "KETHERLABS", logo: "/assets/comunidades-aliadas/ketherlabs.webp", href: "https://linktr.ee/ketherlabs" },
  { name: "GDG Guadalajara", logo: "/assets/comunidades-aliadas/GDG-guadalajara.webp", href: "https://gdg.community.dev/gdg-guadalajara/" },
  { name: "GDG Heroica Veracruz", logo: "/assets/comunidades-aliadas/gdg-heroica.webp", href: "https://gdg.community.dev/gdg-heroica-veracruz/" },
  { name: "Techy Events", logo: "/assets/comunidades-aliadas/techye-events.webp", href: "https://linktr.ee/techyevents" },
  { name: "Web Dev Talks", logo: "/assets/comunidades-aliadas/wdt.webp", href: "https://www.instagram.com/webdevtalksmx/" },
  { name: "AWS UG Colima", logo: "/assets/comunidades-aliadas/aws-ug-colima.webp", href: "https://www.instagram.com/awsugcolima/" },
  { name: "Codificadas", logo: "/assets/comunidades-aliadas/codificadas.webp", href: "https://www.instagram.com/codificadasmx/" },
  { name: "AWS Playa Vicente", logo: "/assets/comunidades-aliadas/aws-playa-vicente.webp", href: "https://linktr.ee/awsusergroupplayavicente" },
];

export default function ComunidadesAliadas() {
  const { t } = useLang();

  return (
    <section id="comunidades-aliadas" className="mesh-hero px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-[1100px]">
        <SectionHeader
          pill={t("aniversario.comunidadesAliadas.pill")}
          title={t("aniversario.comunidadesAliadas.h2")}
          sub={t("aniversario.comunidadesAliadas.sub")}
          layout="stack"
          align="center"
          dark
          subTone="text-white/60"
          subClass="mt-4 max-w-[52ch]"
          className="reveal mb-14 max-w-[640px]"
        />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-4">
          {COMMUNITIES.map((community) => (
            <SmartLink
              key={community.name}
              href={community.href}
              className="group flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white px-4 py-6 text-center transition-transform hover:border-white/25 hover:bg-white/10 lg:gap-5 lg:px-6 lg:py-8"
            >
              <div className="flex h-14 w-full items-center justify-center lg:h-20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={community.logo} alt={community.name} loading="lazy" className="max-h-14 max-w-full object-contain lg:max-h-20" />
              </div>
              <span className="text-[12px] font-medium leading-snug text-black/70 transition group-hover:text-white lg:text-[13px]">
                {community.name}
              </span>
            </SmartLink>
          ))}
        </div>
      </div>
    </section>
  );
}
