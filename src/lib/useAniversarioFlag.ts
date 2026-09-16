"use client";

import { useEffect, useState } from "react";
import posthog from "posthog-js";

const FLAG = "Aniversario";

/**
 * Returns whether the "Aniversario" feature flag is enabled.
 * While PostHog loads flags, `enabled` is `null` (unknown).
 * Callers should treat `null` as `false` to avoid flashing gated content.
 */
export function useAniversarioFlag(): boolean | null {
  const [enabled, setEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Wait for PostHog to resolve flags, then sync; fires immediately if already resolved
    posthog.onFeatureFlags((flags) => setEnabled(flags.includes(FLAG)));
  }, []);

  return enabled;
}
