import ProductDetails from "../../../items/[slug]/ProductDetails";
import { fetchFullCatalog } from "@/lib/data-fetcher-server";

export async function generateMetadata({ params }) {
  const { slug, district } = await params;
  
  const districtName = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  let productName = slug
    ?.replace(/-/g, " ")
    ?.replace(/\b\w/g, (c) => c.toUpperCase());
  
  let categoryName = "Biomedical Equipment";
  let productDesc = "";

  try {
    const products = await fetchFullCatalog();
    const product = products.find(p => p.slug === slug);
    if (product) {
      productName = product.title;
      categoryName = product.category || categoryName;
      productDesc = product.description || product.desc || "";
    }
  } catch (error) {
    console.error("Error fetching product for metadata:", error);
  }

  const title = `${productName} Supplier in ${districtName} | Raj Biosis`;
  const description = `Looking for ${productName} in ${districtName}? Raj Biosis is a leading supplier of ${categoryName} and laboratory diagnostic equipment in ${districtName}. Contact us for best quotes.`;

  return {
    title,
    description,
    keywords: [
      productName,
      `${productName} in ${districtName}`,
      `${productName} supplier ${districtName}`,
      `laboratory equipment in ${districtName}`,
    ],
    alternates: {
      // Canonical URL points to the main canonical product page to avoid duplication penalties
      canonical: `https://rajbiosis.co.in/products/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Page({ params }) {
  const { slug, district } = await params;

  return (
    <ProductDetails
      slug={slug}
      district={district}
    />
  );
}