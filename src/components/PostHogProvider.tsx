"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

// Initialize PostHog globally on the client side at module load — skip in dev to avoid polluting production analytics.
if (typeof window !== "undefined") {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

  if (key && process.env.NODE_ENV !== "development") {
    posthog.init(key, {
      api_host: host,
      person_profiles: "identified_only", // GDPR compliant by default
      capture_pageview: false,
      persistence: "localStorage+cookie",
      autocapture: true,
    });
  }
}

// Client-side Pageview & Pageleave Tracker Component
function PostHogPageview() {
  const pathname = usePathname();
  const prevPathname = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prev = prevPathname.current;

    // Capture $pageleave for the previous page before recording the new view
    if (prev && prev !== pathname) {
      posthog.capture("$pageleave", { $current_url: window.origin + prev });
    }

    // Capture $pageview for the current page
    if (pathname) {
      posthog.capture("$pageview", { $current_url: window.origin + pathname });
    }

    prevPathname.current = pathname;
  }, [pathname]);

  // Capture $pageleave on tab close / browser-level navigation (back, forward, reload)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleBeforeUnload = () => {
      const current = prevPathname.current;
      if (current) {
        posthog.capture("$pageleave", { $current_url: window.origin + current });
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
