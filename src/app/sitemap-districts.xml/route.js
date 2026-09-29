import { fetchDistricts } from "@/lib/data-fetcher-server";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const baseUrl = "https://rajbiosis.co.in";
  try {
    const districts = await fetchDistricts();
    const urlNodes = districts
      .map((d) => d.slug || d.id)
      .filter(Boolean)
      .map((slug) => `  <url>\n    <loc>${baseUrl}/${slug}</loc>\n    <lastmod>${new Date().toISOString()}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.6</priority>\n  </url>`)
      .join("\n");
    return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlNodes}\n</urlset>`, {
      headers: { "Content-Type": "application/xml", "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Districts sitemap generation failed:", error);
    return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`, {
      status: 500,
      headers: { "Content-Type": "application/xml", "Cache-Control": "no-store" },
    });
  }
}
