import SmartLink from "./SmartLink";

type ProseBlock = {
  title: string;
  body?: string;
  /** Inline link appended to the body, e.g. the CC BY license. */
  link?: { label: string; href: string };
  bullets?: string[];
  bulletTone?: string;
};

const LINK_CLASS = "font-semibold text-ocean underline-offset-4 hover:underline";

export default function Prose({ blocks, closing }: { blocks: ProseBlock[]; closing: string }) {
  return (
    <section className="bg-cream px-6 py-24 lg:py-28">
      <div className="mx-auto max-w-[760px] space-y-12">
        {blocks.map((block) => (
          <div key={block.title}>
            <h2 className="text-2xl font-semibold tracking-tight text-navy">{block.title}</h2>

            {block.body && (
              <p className="mt-3 text-lg leading-relaxed text-navy/70">
                {block.body}
                {block.link && (
                  <>
                    {" "}
                    <SmartLink href={block.link.href} className={LINK_CLASS}>
                      {block.link.label}
                    </SmartLink>
                    .
                  </>
                )}
              </p>
            )}

            {block.bullets && (
              <ul className="mt-4 space-y-3 text-lg text-navy/70">
                {block.bullets.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full ${block.bulletTone}`} />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <p className="border-t border-navy/10 pt-8 text-lg leading-relaxed text-navy/60">{closing}</p>
      </div>
    </section>
  );
}
