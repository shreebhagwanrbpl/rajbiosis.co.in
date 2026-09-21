import { fetchFullCatalog, fetchCategoriesTree } from "@/lib/data-fetcher";
import { getCompanyId, getWebsiteId } from "@/lib/catalog-config";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get("companyId") || getCompanyId();
    const websiteId = searchParams.get("websiteId") || getWebsiteId();

    const [products, categories] = await Promise.all([
      fetchFullCatalog({ companyId, websiteId }),
      fetchCategoriesTree({ companyId, websiteId }),
    ]);

    return NextResponse.json(
      {
        success: true,
        companyId,
        websiteId,
        count: products.length,
        products,
        categories,
        timestamp: Date.now(),
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
          "Pragma": "no-cache",
          "Expires": "0",
        },
      }
    );
  } catch (error) {
    console.error("API /api/catalog failed:", error);
    return NextResponse.json(
      {
        success: false,
        count: 0,
        products: [],
        categories: [],
        error: error.message || "Failed to fetch catalog",
        timestamp: Date.now(),
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        },
      }
    );
  }
}
