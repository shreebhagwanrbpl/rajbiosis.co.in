import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import ProductsClient from "../items/ProductsClient";

export const revalidate = 3600; // Revalidate cache every hour

export const metadata = {
  title: "Premium Biomedical & Laboratory Equipment Catalog | Raj Biosis",
  description: "Browse our comprehensive collection of biochemistry analyzers, cell counters, rapid test kits, and diagnostic instruments. Trusted suppliers of laboratory equipment.",
  alternates: {
    canonical: "https://rajbiosis.co.in/products",
  },
  openGraph: {
    title: "Premium Biomedical & Laboratory Equipment Catalog | Raj Biosis",
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