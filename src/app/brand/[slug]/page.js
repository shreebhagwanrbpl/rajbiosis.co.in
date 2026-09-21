import Link from "next/link";
import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import ProductCard from "@/components/ProductCard";
import SectionTitle from "@/components/SectionTitle";
import PageBanner from "@/components/PageBanner";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const brandName = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, char => char.toUpperCase());

  const title = `Authorized ${brandName} Laboratory Equipment Dealer | Raj Biosis`;
  const description = `Explore products listed under ${brandName}, including equipment, diagnostic items and related supplies.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://rajbiosis.co.in/brand/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://rajbiosis.co.in/brand/${slug}`,
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BrandPage({ params }) {
  const { slug } = await params;
  const brandName = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, char => char.toUpperCase());
  
  const allProducts = await fetchFullCatalog();
  
  // Filter products by brand matching the current slug
  const matchingProducts = allProducts.filter(product => {
    if (!product || !product.brand) return false;
    const bSlug = product.brand.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
    return bSlug === slug;
  });

  return (
    <>
      <PageBanner
        title={`${brandName} Equipment`}
        subtitle={`Browse catalogue entries associated with ${brandName} and review the information available for each product.`}
      />

      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          
          <div className="grid lg:grid-cols-[1fr_360px] gap-12">
            
            {/* Main Content Area */}
            <div>
              <div className="bg-white rounded-[32px] p-8 md:p-10 border border-slate-200 shadow-sm mb-12">
                <h1 className="text-3xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
                  About {brandName} Products
                </h1>
                <p className="text-slate-600 text-lg leading-8 mb-6">
                  {brandName} is a manufacturer or product brand represented in this catalogue. 
                  Renowned for superior engineering, automated calibration, and testing reliability, {brandName} analyzers are the standard in hospital laboratories and reference hubs.
                </p>
                <p className="text-slate-600 leading-8">
                  Raj Biosis lists relevant {brandName} products and provides enquiry-oriented information for buyers. 
                  and ongoing preventative maintenance packages. Explore our matching inventory below and request custom quotes.
                </p>
              </div>

              {/* Products Grid */}
              <div>
                <SectionTitle
                  badge="Brand Catalog"
                  title={`Featured ${brandName} Analyzers & Systems`}
                  description={`View the available ${brandName} catalogue entries.`}
                />

                {matchingProducts.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-8 mt-10">
                    {matchingProducts.map((product) => (
                      <ProductCard
                        key={product.uid}
                        product={product}
                        currentDistrict={null}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center mt-10">
                    <p className="text-slate-500 text-lg">
                      Currently cataloging models for this brand. Contact our sales office for custom enquiries.
                    </p>
                    <Link href="/contact" className="inline-block mt-6 primary-btn">
                      Contact Sales Office
                    </Link>
                  </div>
                )}
              </div>
              
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Quick Links
                </h3>
                <Link href="/products" className="block text-sky-700 hover:text-sky-800 font-medium py-2 border-b border-slate-100">
                  ← Full Products Catalog
                </Link>
                <Link href="/contact" className="block text-sky-700 hover:text-sky-800 font-medium py-2 border-b border-slate-100">
                  Request Custom Quote
                </Link>
              </div>

              <div className="bg-red-50 rounded-3xl p-8 border border-red-100 text-center">
                <h3 className="text-2xl font-bold text-red-900 mb-3">
                  Quote for {brandName}?
                </h3>
                <p className="text-red-700 text-sm leading-6 mb-6">
                  Get the latest pricing, specifications sheets, and service contract details for all {brandName} equipment.
                </p>
                <Link href="/contact" className="inline-block w-full bg-[#E52428] hover:bg-[#C91D21] text-white font-bold py-3.5 rounded-xl transition shadow-md">
                  Request Quote
                </Link>
              </div>
              
            </aside>
            
          </div>
          
        </div>
      </section>
    </>
  );
}
