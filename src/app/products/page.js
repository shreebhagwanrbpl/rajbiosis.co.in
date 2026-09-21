import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import ProductsClient from "../items/ProductsClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Biomedical Product Catalogue | Raj Biosis",
  description: "Explore a wide selection of biomedical equipment, diagnostic items, laboratory supplies and related products.",
  alternates: {
    canonical: "https://rajbiosis.co.in/products",
  },
  openGraph: {
    title: "Biomedical Product Catalogue | Raj Biosis",
    description: "Browse our comprehensive collection of biochemistry analyzers, cell counters, rapid test kits, and diagnostic instruments.",
    url: "https://rajbiosis.co.in/products",
    type: "website",
  },
};

export default async function ProductsPage({ district = null, city = null }) {
  // Fetch full catalog from server cache
  const allProducts = await fetchFullCatalog();

  return (
    <ProductsClient
      initialProducts={allProducts}
      district={district}
      city={city}
    />
  );
}