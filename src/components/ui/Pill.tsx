const TONES = {
  navy: "bg-navy text-white",
  ink: "bg-navy/10 text-navy",
  light: "bg-white/10 text-white",
  ocean: "bg-white/10 text-ocean-300",
  oceanSoft: "bg-ocean/15 text-ocean",
} as const;

const SIZES = { md: "px-3.5 py-1.5 text-[13px]", sm: "px-3 py-1 text-[12px]", hero: "px-4 py-1.5 text-[13px]" } as const;

export default function Pill({
  children,
  tone = "navy",
  size = "md",
  className = "",
}: {
  children: React.ReactNode;
  tone?: keyof typeof TONES;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  return (
    <span className={`inline-block rounded-full font-semibold ${SIZES[size]} ${TONES[tone]} ${className}`}>
      {children}
    </span>
  );
}
