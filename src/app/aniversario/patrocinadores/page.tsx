"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OldSponsorsRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/patrocinadores");
  }, [router]);

  return (
    <p className="flex min-h-screen items-center justify-center bg-navy text-lg text-white/70">
      Redirigiendo a{" "}
      <a href="/patrocinadores" className="ml-1 text-ocean-300 underline">
        /patrocinadores
      </a>
      ...
    </p>
  );
}
