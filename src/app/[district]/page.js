import Home from "@/app/page";
import { fetchDistrictData } from "@/lib/data-fetcher";
import { notFound } from "next/navigation";

export default async function DistrictPage({ params }) {
  const { district } = await params;

  if (!district) {
    notFound();
  }

  // Retrieve location document from Firestore database
  const districtDoc = await fetchDistrictData(district);

  // Programmatic SEO Safety Gate: if location is not in our serviceable database, return 404
  if (!districtDoc) {
    notFound();
  }

  const city = districtDoc.district || districtDoc.name || district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
    
  const state = districtDoc.state || "Rajasthan";

  return (
    <Home 
      city={city} 
      state={state} 
      district={district} 
    />
  );
}