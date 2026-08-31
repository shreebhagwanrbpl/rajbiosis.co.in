import ProductsPage from "@/app/items/page";

export async function generateMetadata({ params }) {
  const { district = "jaipur" } = await params;
  
  const districtName = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const title = `Biomedical Equipment & Laboratory Analyzers in ${districtName} | Raj Biosis`;
  const description = `Discover advanced biochemistry analyzers, hematology cell counters, and rapid diagnostic test kits in ${districtName}. Premium laboratory supplier with local delivery.`;

  return {
    title,
    description,
    alternates: {
      canonical: "https://rajbiosis.co.in/products", // Canonical consolidation to avoid listing duplication
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Page({ params }) {
  const { district = "jaipur" } = await params;

  const city = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return <ProductsPage city={city} />;
}