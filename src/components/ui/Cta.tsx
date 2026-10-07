import SmartLink from "./SmartLink";
import { ArrowRight, ArrowUpRight } from "../Icons";

type Tone = "sunset" | "navy" | "white" | "glass" | "outline";

const TONE: Record<Tone, string> = {
  sunset: "bg-sunset text-white hover:bg-sunset-400 active:scale-[0.98]",
  navy: "bg-navy text-white hover:bg-navy-700",
  white: "bg-white text-navy hover:bg-cream",
  glass: "border border-white/30 bg-white/5 text-white glass hover:bg-white/10",
  outline: "border border-navy/15 bg-white text-navy hover:bg-navy hover:text-white",
};

const SHADOW: Record<Tone, string> = {
  sunset: "shadow-xl shadow-sunset/30",
  navy: "shadow-xl",
  white: "shadow-xl",
  glass: "",
  outline: "",
};

const DOT: Record<Tone, string> = {
  sunset: "bg-white/95 text-navy",
  navy: "bg-ocean text-white",
  white: "bg-sunset text-white",
  glass: "bg-ocean text-white",
  outline: "bg-navy text-white",
};

const SIZE: Record<"md" | "sm" | "wide", { pill: string; dot: string; icon: number }> = {
  md: { pill: "py-2 pl-6 pr-2 text-[16px]", dot: "h-9 w-9", icon: 16 },
  sm: { pill: "py-2 pl-6 pr-2 text-[15px]", dot: "h-8 w-8", icon: 15 },
  wide: { pill: "px-6 py-3 text-[16px]", dot: "", icon: 16 },
};

const ARROW: Record<"up-right" | "right", { Icon: typeof ArrowUpRight; motion: string }> = {
  "up-right": { Icon: ArrowUpRight, motion: "group-hover:rotate-45" },
  right: { Icon: ArrowRight, motion: "group-hover:translate-x-0.5" },
};

type Props = {
  href: string;
  children: React.ReactNode;
  tone?: Tone;
  arrow?: "up-right" | "right" | "none";
  size?: "md" | "sm" | "wide";
  /** Layout extras: margins, flex direction, width. */
  className?: string;
  /** Circle behind the arrow; defaults to the tone's own. */
  dot?: string;
  shadow?: string;
};

export default function Cta({
  href,
  children,
  tone = "sunset",
  arrow = "up-right",
  size = "md",
  className = "",
  dot,
  shadow,
}: Props) {
  const s = SIZE[size];
  const arrowConfig = arrow === "none" ? null : ARROW[arrow];
  const dotClass = dot ?? DOT[tone];
  const classes = [
    "group inline-flex items-center gap-2.5 rounded-full font-semibold transition",
    shadow ?? SHADOW[tone],
    TONE[tone],
    s.pill,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <SmartLink href={href} className={classes}>
      {children}
      {arrowConfig && (
        <span
          className={`grid ${s.dot} shrink-0 place-items-center rounded-full ${dotClass} transition ${arrowConfig.motion}`}
        >
          <arrowConfig.Icon size={s.icon} />
        </span>
      )}
    </SmartLink>
  );
}
