import ServicesPage from "@/app/services/page";

export async function generateMetadata({ params }) {
  const { district = "jaipur" } = await params;
  
  const districtName = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    title: `Certified Biomedical & Diagnostic Analyzer Services in ${districtName} | Raj Biosis`,
    description: `Professional technical diagnostics setup, biochemistry analyzer calibration, and clinical laboratory equipment maintenance in ${districtName}.`,
    alternates: {
      canonical: "https://rajbiosis.co.in/services", // Consolidate to main services page
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

  return <ServicesPage city={city} />;
}