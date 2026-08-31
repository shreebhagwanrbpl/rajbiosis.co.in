import ContactPage from "@/app/contact/page";

export async function generateMetadata({ params }) {
  const { district = "jaipur" } = await params;
  
  const districtName = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    title: `Contact Our Biomedical Offices in ${districtName} | Raj Biosis`,
    description: `Get in touch with Raj Biosis support team in ${districtName} for pricing, quotes, and installation technical support.`,
    alternates: {
      canonical: "https://rajbiosis.co.in/contact", // Consolidate to main contact page
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

  return <ContactPage city={city} />;
}