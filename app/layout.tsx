import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL &&
  /^https?:\/\//i.test(process.env.NEXT_PUBLIC_APP_URL)
    ? process.env.NEXT_PUBLIC_APP_URL
    : "https://kazanix-51h5.vercel.app";


export const metadata: Metadata = {

  metadataBase: new URL(siteUrl),

  title: {
    default: "Kazanix | Dijital Reklam Platformu",
    template: "%s | Kazanix",
  },

  description:
    "Kazanix ile markanızı dijital dünyada büyütün. Reklamlarınızı yayınlayın, hedef kitlenize ulaşın ve işletmenizi geliştirin.",

  keywords: [
    "Kazanix",
    "dijital reklam",
    "online reklam",
    "reklam platformu",
    "marka tanıtımı",
    "kampanya",
    "internet reklamı",
  ],

  authors: [
    {
      name: "Kazanix",
    },
  ],

  creator: "Kazanix",

  openGraph: {

    title:
      "Kazanix | Dijital Reklam Platformu",

    description:
      "Markanızı doğru kitleyle buluşturun. Kazanix ile dijital reklam fırsatlarını keşfedin.",

    url: siteUrl,

    siteName:
      "Kazanix",

    locale:
      "tr_TR",

    type:
      "website",

  },


  twitter: {

    card:
      "summary_large_image",

    title:
      "Kazanix | Dijital Reklam Platformu",

    description:
      "Dijital reklamlarınızı yönetin ve markanızı büyütün.",

  },


  robots: {

    index:
      true,

    follow:
      true,

  },


  alternates: {

    canonical:
      "/",

  },

};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html lang="tr">

      <body>

        {children}

      </body>

    </html>

  );

}