import { Check } from "../Icons";

const CIRCLE = {
  light: "bg-ocean/15 text-ocean",
  dark: "bg-ocean/20 text-ocean-300",
} as const;

type Props = {
  items: string[];
  className?: string;
  /** Smaller bullet (12px icon in a 20px circle), top-aligned. */
  small?: boolean;
  dark?: boolean;
};

export default function CheckList({
  items,
  className = "mt-8 space-y-3 text-navy/70",
  small = false,
  dark = false,
}: Props) {
  const bullet = small
    ? "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full"
    : "grid h-7 w-7 place-items-center rounded-full";

  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item} className={`flex ${small ? "items-start" : "items-center"} gap-3`}>
          <span className={`${bullet} ${CIRCLE[dark ? "dark" : "light"]}`}>
            <Check size={small ? 12 : 14} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
