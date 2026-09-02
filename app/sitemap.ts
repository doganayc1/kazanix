import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/reklam-ver",
    "/reklam-veren",
    "/reklamveren",
    "/reklam-veren/giris",
    "/reklam-veren/kayit",
    "/gizlilik-politikasi",
    "/kvkk",
    "/kullanim-sartlari",
    "/iletisim",
  ];

  return pages.map((page) => ({
    url: `${siteUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: page === "" ? "weekly" : "monthly",
    priority: page === "" ? 1 : 0.7,
  }));
}
