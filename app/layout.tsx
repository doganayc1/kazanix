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
    "Kazanix ile markanÄ±zÄ± dijital dünyada bÃ¼yÃ¼tÃ¼n. ReklamlarÄ±nÄ±zÄ± yayÄ±nlayÄ±n, hedef kitlenize ulaÅŸÄ±n ve iÅŸletmenizi geliÅŸtirin.",

  keywords: [
    "Kazanix",
    "dijital reklam",
    "online reklam",
    "reklam platformu",
    "marka tanÄ±tÄ±mÄ±",
    "kampanya",
    "internet reklamÄ±",
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
      "Markanızı doÄŸru kitleyle buluÅŸturun. Kazanix ile dijital reklam fÄ±rsatlarÄ±nÄ± keÅŸfedin.",

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
      "Dijital reklamlarınızı yÃ¶netin ve markanÄ±zÄ± bÃ¼yÃ¼tÃ¼n.",

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
