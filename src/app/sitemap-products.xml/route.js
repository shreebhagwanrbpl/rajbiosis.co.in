import { fetchFullCatalog } from "@/lib/data-fetcher-server";

export const revalidate = 86400; // Cache for 24 hours

export async function GET() {
  const baseUrl = "https://rajbiosis.co.in";
  let xml = "";

  try {
    const products = await fetchFullCatalog();
    const urls = products
      .filter(p => p && p.slug)
      .map(p => `${baseUrl}/products/${p.slug}`);

    const urlNodes = urls.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join("\n");

    xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlNodes}
</urlset>`;

  } catch (error) {
    console.error("Products sitemap generation failed:", error);
    xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;
  }

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
