import AboutPage from "@/app/about/page";

export async function generateMetadata({ params }) {
  const { district = "jaipur" } = await params;
  
  const districtName = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    title: `About Our Biomedical Services in ${districtName} | Raj Biosis`,
    description: `Learn about Raj Biosis certified biomedical technologies and diagnostic services available in ${districtName}.`,
    alternates: {
      canonical: "https://rajbiosis.co.in/about", // Consolidate to main about page
    },
    robots: {
      index: false, // Prevent indexation of duplicate location variations
      follow: true,
    },
  };
}

export default async function Page({ params }) {
  const { district = "jaipur" } = await params;

  const city = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return <AboutPage city={city} />;
}