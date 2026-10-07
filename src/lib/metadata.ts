import type { Metadata } from "next";

const BASE_URL = "https://playasontech.com";

type PageMeta = {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  image?: string;
  alt?: string;
  size?: [number, number];
  /** Canonical path; omit to inherit the root layout's. */
  path?: string;
};

export function pageMetadata({
  title,
  description,
  ogTitle = title,
  ogDescription = description,
  image = "/assets/metadata/og-playasontech.jpg",
  alt = ogTitle,
  size = [1200, 630],
  path,
}: PageMeta): Metadata {
  const ogImage = `${BASE_URL}${image}`;

  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      locale: "es_MX",
      type: "website",
      images: [{ url: ogImage, width: size[0], height: size[1], alt }],
    },
    twitter: { card: "summary_large_image", title: ogTitle, description: ogDescription, images: [ogImage] },
  };

  if (path) {
    const url = `${BASE_URL}${path}`;
    metadata.alternates = { canonical: path, languages: { "x-default": url, "es-MX": url, en: url } };
  }

  return metadata;
}
