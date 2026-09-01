import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL ||
  "https://kazanix-51h5.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Kazanix | Dijital Reklam Platformu",
    template: "%s | Kazanix",
  },

  description:
    "Kazanix ile markanızı ve reklamlarınızı dijital dünyada daha fazla kişiye ulaştırın.",

  keywords: [
    "reklam",
    "dijital reklam",
    "online reklam",
    "kampanya",
    "marka tanıtımı",
    "Kazanix",
  ],

  openGraph: {
    title: "Kazanix | Dijital Reklam Platformu",
    description:
      "Markanızı ve reklamlarınızı daha fazla kişiye ulaştırın.",
    url: siteUrl,
    siteName: "Kazanix",
    locale: "tr_TR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Kazanix | Dijital Reklam Platformu",
    description:
      "Markanızı ve reklamlarınızı daha fazla kişiye ulaştırın.",
  },

  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}