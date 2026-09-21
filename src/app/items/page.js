import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import ProductsClient from "./ProductsClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Biomedical Product Catalogue | Raj Biosis",
  description: "Browse instruments, test kits, reagents, consumables, monitoring devices and other biomedical product groups in one catalogue.",
  alternates: {
    canonical: "https://rajbiosis.co.in/products", // Canonical points to /products
  },
  openGraph: {
    title: "Biomedical Product Catalogue | Raj Biosis",
    description: "Explore a broad selection of biomedical products arranged for easier professional sourcing.",
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