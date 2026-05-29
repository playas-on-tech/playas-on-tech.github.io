"use client";

import { useEffect, useRef } from "react";
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

// Client-side Pageview & Pageleave Tracker Component
// Captures $pageview on pathname transition and $pageleave on both internal
// SPA navigation and tab-close / external browser navigation.
function PostHogPageview() {
  const pathname = usePathname();
  const prevPathname = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prev = prevPathname.current;

    // Capture $pageleave for the previous page before recording the new view
    if (prev && prev !== pathname) {
      const leaveUrl = window.origin + prev;
      posthog.capture("$pageleave", { $current_url: leaveUrl });
      console.log(`📡 PostHog: Captured pageleave for ${leaveUrl}`);
    }

    // Capture $pageview for the current page
    if (pathname) {
      const url = window.origin + pathname;
      posthog.capture("$pageview", { $current_url: url });
      console.log(`📡 PostHog: Captured pageview for ${url}`);
    }

    prevPathname.current = pathname;
  }, [pathname]);

  // Capture $pageleave on tab close / browser-level navigation (back, forward, reload)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleBeforeUnload = () => {
      const current = prevPathname.current;
      if (current) {
        const url = window.origin + current;
        // posthog-js uses sendBeacon under the hood on page unload
        posthog.capture("$pageleave", { $current_url: url });
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

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
