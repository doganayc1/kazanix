import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KAZANIX | Reklamları ve Kampanyaları Keşfet",
  description:
    "KAZANIX ile markaları, kampanyaları ve sponsorlu reklamları keşfet. Markanı KAZANIX'ta tanıt.",
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


