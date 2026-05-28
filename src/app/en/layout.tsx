import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "../globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Playas on Tech — The tech community by the sea",
  description:
    "The tech community of Manzanillo, Colima. We meet every two months by the sea to learn, connect and share. Free and open to all.",
  icons: { icon: "/assets/app-icon.webp" },
  openGraph: {
    title: "Playas on Tech — The tech community by the sea",
    description: "The tech community of Manzanillo, Colima. Every two months, by the sea.",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://playasontech.com/assets/app-icon.webp",
        width: 512,
        height: 512,
        alt: "Playas on Tech Icon",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Playas on Tech — The tech community by the sea",
    description: "The tech community of Manzanillo, Colima. Every two months, by the sea.",
    images: ["https://playasontech.com/assets/app-icon.webp"],
  },
};

export default function EnRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="font-sans text-navy antialiased">{children}</body>
    </html>
  );
}
