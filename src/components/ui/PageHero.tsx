import Blobs from "./Blobs";
import SmartLink from "./SmartLink";
import WaveDivider from "./WaveDivider";

/** Dark hero shared by the standalone content pages. */
export default function PageHero({
  back,
  title,
  sub,
  subClass = "max-w-[52ch]",
}: {
  back: string;
  title: string;
  sub: string;
  subClass?: string;
}) {
  return (
    <section className="mesh-hero grain relative overflow-hidden">
      <Blobs />

      <div className="relative z-10 mx-auto max-w-[900px] px-6 pb-28 pt-28 text-center lg:pt-32">
        <SmartLink
          href="/"
          className="cine cine-1 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-white"
        >
          {back}
        </SmartLink>
        <h1 className="cine cine-2 mt-6 text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-tightest text-white">
          {title}
        </h1>
        <p className={`cine cine-3 mx-auto mt-5 ${subClass} text-lg leading-relaxed text-white/80`}>{sub}</p>
      </div>

      <WaveDivider />
    </section>
  );
}
