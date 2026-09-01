import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {

  const pages = [
    "",
    "/reklam-veren",
    "/reklamveren",
    "/reklamveren/giris",
    "/reklamveren/kayit",
    "/reklam-ver",
  ];

  return pages.map((page) => ({
    url: `${siteUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: page === "" ? 1 : 0.8,
  }));

}