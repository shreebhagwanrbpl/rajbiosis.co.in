import ProductDetails from "./ProductDetails";
import { fetchFullCatalog } from "@/lib/data-fetcher-server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }) {
  const { slug } = await params;

  let productName = slug
    ?.replace(/-/g, " ")
    ?.replace(/\b\w/g, (c) => c.toUpperCase());
  
  let categoryName = "Biomedical Equipment";
  let description = `Explore ${productName} specifications, applications and enquiry details in the Raj Biosis biomedical catalogue.`;
  let imageUrl = "/logo.png";

  try {
    const products = await fetchFullCatalog();
    const product = products.find(p => p.slug === slug);
    if (product) {
      productName = product.title;
      categoryName = product.category || categoryName;
      description = product.description || product.desc || description;
      imageUrl = product.image || (product.images && product.images[0]) || imageUrl;
    }
  } catch (error) {
    console.error("Error generating metadata for product page:", error);
  }

  const title = `${productName} Supplier in India | Price, Specification & Dealer | Raj Biosis`;

  const url = `https://rajbiosis.co.in/products/${slug}`;

  return {
    title,
    description,
    keywords: [
      productName,
      `${productName} Supplier`,
      `${productName} Price`,
      `${productName} Dealer`,
      `${productName} Distributor`,
      "Biomedical Products India",
      "Laboratory Equipment",
      "Biomedical Product",
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: imageUrl }],
      type: "website",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
    metadataBase: new URL("https://rajbiosis.co.in"),
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <ProductDetails slug={slug} />;
}