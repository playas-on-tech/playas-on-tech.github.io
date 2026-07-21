"use client";

import { useEffect } from "react";
import { useAniversarioFlag } from "@/lib/useAniversarioFlag";
import AniversarioThankYou from "@/components/AniversarioThankYou";

/**
 * Client component that gates anniversary content behind the PostHog feature flag.
 * Shows thank you page when flag is disabled, renders children when enabled.
 */
export default function AniversarioGate({ children }: { children: React.ReactNode }) {
  const enabled = useAniversarioFlag();

  useEffect(() => {
    if (enabled === false) {
      window.location.href = "/";
    }
  }, [enabled]);

  if (enabled === null) return <AniversarioThankYou />;
  if (enabled === false) return <AniversarioThankYou />;
  return <>{children}</>;
}
