// Wavy divider closing a dark hero into the cream section below.
export default function WaveDivider({ fill = "#FBF6EE" }: { fill?: string }) {
  return (
    <svg
      className="wave-divider absolute inset-x-0 bottom-[-1px] z-[5]"
      viewBox="0 0 1440 130"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        d="M-120,70 C140,130 380,8 620,52 C880,100 1140,132 1380,74 C1460,56 1520,62 1560,72 L1560,131 L-120,131 Z"
        fill={fill}
      />
    </svg>
  );
}
