import Pill from "./Pill";

type Props = {
  pill: string;
  title: string;
  sub?: string;
  /** "split": title left, sub right. "stack": title then sub below. */
  layout?: "split" | "stack";
  align?: "left" | "center";
  /** Section on a dark background: lighter pill and sub text. */
  dark?: boolean;
  titleClass?: string;
  subClass?: string;
  subTone?: string;
  subSize?: string;
  className?: string;
};

const classes = (...parts: (string | false | undefined)[]) => parts.filter(Boolean).join(" ");

export default function SectionHeader({
  pill,
  title,
  sub,
  layout = "split",
  align = "left",
  dark = false,
  titleClass = "",
  subClass = "",
  subTone = dark ? "text-white/70" : "text-navy/60",
  subSize = "text-lg",
  className = "",
}: Props) {
  const center = align === "center";
  const wrapper =
    layout === "split"
      ? classes("flex flex-col items-start justify-between gap-6 md:flex-row md:items-end", className)
      : classes(center && "mx-auto text-center", className);

  const subText = classes(subSize, "leading-relaxed", subTone, center && "mx-auto");

  return (
    <div className={wrapper}>
      <div>
        <Pill tone={dark ? "ocean" : "navy"}>{pill}</Pill>
        <h2 className={classes("mt-5", titleClass, "text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-tightest")}>
          {title}
        </h2>
        {sub && layout === "stack" && <p className={classes(subClass, subText)}>{sub}</p>}
      </div>
      {sub && layout === "split" && <p className={classes(subClass, subText)}>{sub}</p>}
    </div>
  );
}
