import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export const revalidate = 86400; // Cache for 24 hours

export async function GET() {
  const baseUrl = "https://rajbiosis.co.in";
  let xml = "";

  try {
    const categorySnap = await getDocs(
      collection(db, "websites", "rajbiosiscoin", "pages", "categoryproducts", "categories")
    );

    const categories = categorySnap.docs.map(doc => doc.id);

    const urls = [];
    categories.forEach(slug => {
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
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
