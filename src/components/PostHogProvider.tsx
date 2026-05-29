"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

if (typeof window !== "undefined") {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

  const isLocal =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname.startsWith("192.168.") ||
    window.location.hostname.startsWith("10.") ||
    window.location.hostname.endsWith(".local");

  if (key && !isLocal) {
    // Initialize PostHog globally on the client side at module load
    posthog.init(key, {
      api_host: host,
      person_profiles: "identified_only", // GDPR compliant by default
      capture_pageview: false, // Turn off automatic pageviews to allow manual tracking below
      persistence: "localStorage+cookie", // Standard robust fallback
      autocapture: true, // Automatically captures clicks, inputs, and form submissions
    });
  } else if (isLocal) {
    console.log("🚧 PostHog: Running in local development. Ingestion is disabled to prevent polluting production analytics.");
  }
}

// Client-side Pageview Tracker Component
function PostHogPageview() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && pathname) {
      // Capture pageview manually on pathname transition
      const url = window.origin + pathname;
      posthog.capture("$pageview", { $current_url: url });
      console.log(`📡 PostHog: Captured pageview for ${url}`);
    }
  }, [pathname]);

  return null;
}

export default function PostHogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PHProvider client={posthog}>
      <PostHogPageview />
      {children}
    </PHProvider>
  );
}
