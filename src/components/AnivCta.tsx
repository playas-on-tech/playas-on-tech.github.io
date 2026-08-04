"use client";

import { useAniversarioFlag } from "@/lib/useAniversarioFlag";

/**
 * Renders anniversary content when the flag is enabled, otherwise renders fallback.
 */
export default function AnivCta({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const enabled = useAniversarioFlag();

  if (enabled === true) return <>{children}</>;
  return <>{fallback ?? null}</>;
}
