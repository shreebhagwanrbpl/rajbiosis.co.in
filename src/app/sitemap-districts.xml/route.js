import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export const revalidate = 86400; // Cache for 24 hours

export async function GET() {
  const baseUrl = "https://rajbiosis.co.in";
  let xml = "";

  try {
    const districtSnap = await getDocs(
      collection(db, "websites", "rajbiosiscoin", "districts")
    );

    const districts = districtSnap.docs
      .map(doc => doc.data())
      .filter(d => d && d.slug);

    const urlNodes = districts.map(district => `  <url>
    <loc>${baseUrl}/${district.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`).join("\n");

    xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlNodes}
</urlset>`;

  } catch (error) {
    console.error("Districts sitemap generation failed:", error);
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
