export async function GET() {
  const content = `User-agent: *
Allow: /

Disallow: /admin
Disallow: /api

Sitemap: ${
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://kazanix-51h5.vercel.app"
  }/sitemap.xml`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}