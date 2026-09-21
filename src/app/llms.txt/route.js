import { fetchFullCatalog, fetchCategoriesTree } from "@/lib/data-fetcher-server";
import { getCompanyId, getWebsiteId } from "@/lib/catalog-config";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const baseUrl = "https://rajbiosis.co.in";
  const companyId = getCompanyId();
  const websiteId = getWebsiteId();

  try {
    const [products, categories] = await Promise.all([
      fetchFullCatalog(),
      fetchCategoriesTree(),
    ]);

    let text = `# Raj Biosis - Biomedical & Laboratory Equipment Catalogue
> Complete catalogue of clinical laboratory analyzers, diagnostic test kits, reagents, and biomedical equipment.

- Website: ${baseUrl}
- Company: RajBiosis (${companyId})
- Website ID: ${websiteId}
- Total Visible Products: ${products.length}
- Total Visible Categories: ${categories.length}

---

## Product Categories
`;

    categories.forEach((cat) => {
      const catName = cat.name || cat.category || cat.id;
      text += `\n### ${catName}\n`;
      if (cat.description) {
        text += `${cat.description}\n`;
      }
      if (Array.isArray(cat.subcategories)) {
        cat.subcategories.forEach((sub) => {
          const subName = sub.name || sub.subCategory || sub.id;
          text += `- **${subName}** (${sub.productsCount || 0} products)\n`;
        });
      }
    });

    text += `\n---

## Full Product Listing (${products.length} products)
`;

    products.forEach((prod, i) => {
      const title = prod.title || prod.name || `Product #${i + 1}`;
      const url = `${baseUrl}/products/${prod.slug}`;
      const category = prod.category || "Biomedical Equipment";
      const subCategory = prod.subCategory ? ` / ${prod.subCategory}` : "";
      const price = prod.price ? ` | Price: ₹${prod.price}` : "";
      const brand = prod.brand ? ` | Brand: ${prod.brand}` : "";
      const model = prod.model ? ` | Model: ${prod.model}` : "";
      const desc = prod.description || prod.desc || "";

      text += `\n### ${i + 1}. ${title}
- **URL**: ${url}
- **Category**: ${category}${subCategory}${brand}${model}${price}
`;
      if (desc) {
        text += `- **Description**: ${desc.slice(0, 300)}${desc.length > 300 ? "..." : ""}\n`;
      }
    });

    text += `\n---
## Contact & Sourcing
- Sales & Enquiries: rajbiosis@yahoo.in
- Phone: +91 9983123469, +91 9983333489
- Address: F-4, 1st Floor, Plot No. 16, D-Block Tagor Nagar, on Ajmer-Delhi, 200 Feet Bypass Rd, Jaipur, Rajasthan 302021
`;

    return new Response(text, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      },
    });
  } catch (error) {
    console.error("llms.txt generation failed:", error);
    return new Response("# Raj Biosis Catalogue\nUnable to generate live catalogue at this time.", {
      status: 500,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }
}
