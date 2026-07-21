"use client";

import { useEffect } from "react";
import { useAniversarioFlag } from "@/lib/useAniversarioFlag";

/**
 * Client component that gates anniversary content behind the PostHog feature flag.
 * Redirects to home when the flag is disabled or still loading.
 */
export default function AniversarioGate({ children }: { children: React.ReactNode }) {
  const enabled = useAniversarioFlag();

  useEffect(() => {
    if (enabled !== true) {
      window.location.href = "/";
    }
  }, [enabled]);

  if (enabled !== true) return null;
  return <>{children}</>;
}
