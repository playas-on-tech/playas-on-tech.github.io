"use client";

import { useAniversarioFlag } from "@/lib/useAniversarioFlag";
import AniversarioThankYou from "@/components/AniversarioThankYou";

/**
 * Client component that gates anniversary content behind the PostHog feature flag.
 * Shows the thank-you + gallery page when the flag is disabled, children when enabled.
 */
export default function AniversarioGate({ children }: { children: React.ReactNode }) {
  const enabled = useAniversarioFlag();

  if (enabled !== true) return <AniversarioThankYou />;
  return <>{children}</>;
}
