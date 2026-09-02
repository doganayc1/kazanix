import type { MetadataRoute } from "next";

const BASE_URL = "https://kazanix-51h5.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/reklam-veren/profil",
          "/reklam-veren/reklamlar",
          "/reklam-veren/odeme",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
