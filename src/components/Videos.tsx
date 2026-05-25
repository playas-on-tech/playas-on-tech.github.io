import { ArrowRight, Play } from "./Icons";

const videos = [
  {
    img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
    title: "Construyendo productos con IA en 2026",
    meta: "Charla · Edición #6",
  },
  {
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    title: "De freelancer a fundador en la costa",
    meta: "Charla · Edición #5",
  },
  {
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop",
    title: "Open source: cómo dar tus primeros PRs",
    meta: "Taller · Edición #4",
  },
];

export default function Videos() {
  return (
    <section id="videos" className="bg-cream px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <span className="inline-block rounded-full bg-navy px-3.5 py-1.5 text-[13px] font-600 text-white">
              Videos
            </span>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3.2rem)] font-600 leading-[1.05] tracking-tightest">
              ¿Te lo perdiste?
            </h2>
          </div>
          <a
            href="#"
            className="hidden items-center gap-2 text-[15px] font-600 text-navy/70 transition hover:text-navy sm:flex"
          >
            Ver todas <ArrowRight size={16} />
          </a>
        </div>
        <div className="reveal grid gap-5 md:grid-cols-3">
          {videos.map((video) => (
            <a key={video.title} href="#" className="group">
              <div className="relative overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={video.img}
                  alt=""
                  className="aspect-video w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 grid place-items-center bg-navy/20 transition group-hover:bg-navy/30">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-white/90 text-navy">
                    <Play size={20} />
                  </span>
                </span>
              </div>
              <h3 className="mt-4 font-600 leading-snug">{video.title}</h3>
              <p className="mt-1 text-sm text-navy/50">{video.meta}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
