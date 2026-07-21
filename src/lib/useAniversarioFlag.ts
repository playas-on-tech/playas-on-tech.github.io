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

    // Fast path: flag already resolved
    const current = posthog.getFeatureFlag(FLAG);
    if (current !== undefined) {
      setEnabled(current === FLAG);
      return;
    }

    // Wait for PostHog to load flags, then resolve
    const onFlags = () => {
      const flag = posthog.getFeatureFlag(FLAG);
      setEnabled(flag === FLAG);
    };
    posthog.onFeatureFlags(onFlags);

  }, []);

  return enabled;
}
