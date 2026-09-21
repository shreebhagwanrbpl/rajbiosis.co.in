import { fetchCategoriesTree } from "@/lib/data-fetcher-server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const baseUrl = "https://rajbiosis.co.in";
  let xml = "";

  try {
    const categories = await fetchCategoriesTree();

    const urls = [];
    categories.forEach(cat => {
      const slug = cat.slug || cat.id;
      if (!slug) return;
      // Create canonical urls for categories
      urls.push(`${baseUrl}/category/${slug}`);
      urls.push(`${baseUrl}/laboratory-equipment/${slug}`);
      urls.push(`${baseUrl}/diagnostic-equipment/${slug}`);
      urls.push(`${baseUrl}/biomedical-equipment/${slug}`);
    });

    const urlNodes = urls.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join("\n");

    xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlNodes}
</urlset>`;

  } catch (error) {
    console.error("Categories sitemap generation failed:", error);
    xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;
  }

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
    },
  });
}
