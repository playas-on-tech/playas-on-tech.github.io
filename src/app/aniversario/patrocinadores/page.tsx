export default function OldSponsorsRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/patrocinadores" />
      <p className="flex min-h-screen items-center justify-center bg-navy text-lg text-white/70">
        Redirigiendo a{" "}
        <a href="/patrocinadores" className="ml-1 text-ocean-300 underline">
          /patrocinadores
        </a>
        ...
      </p>
    </>
  );
}
