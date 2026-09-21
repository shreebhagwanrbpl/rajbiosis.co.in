import Link from "next/link";
import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import { getCategoryDetails } from "@/lib/category-content";
import ProductCard from "@/components/ProductCard";
import SectionTitle from "@/components/SectionTitle";
import PageBanner from "@/components/PageBanner";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const details = getCategoryDetails(slug);
  const title = `${details.name} Catalogue | Specifications & Enquiry | Raj Biosis`;
  const description = `Explore ${details.name} products, specifications and related catalogue information for professional requirements.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://rajbiosis.co.in/category/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://rajbiosis.co.in/category/${slug}`,
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const details = getCategoryDetails(slug);
  
  const allProducts = await fetchFullCatalog();
  
  // Filter products by category matching the current category slug or categoryId
  const matchingProducts = allProducts.filter(product => {
    if (!product) return false;
    const catSlug = (product.category || "").toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
    const catId = (product.categoryId || "").toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
    return catSlug === slug || catId === slug;
  });

  return (
    <>
      <PageBanner
        title={details.name}
        subtitle={`Product information, practical details and enquiry guidance for this category.`}
      />

      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          
          <div className="grid lg:grid-cols-[1fr_360px] gap-12">
            
            {/* Main Content Area */}
            <div>
              <div className="bg-white rounded-[32px] p-8 md:p-10 border border-slate-200 shadow-sm">
                
                <h1 className="text-3xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
                  What is a {details.name}?
                </h1>
                <p className="text-slate-600 text-lg leading-8 mb-8">
                  {details.description}
                </p>

                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Primary Uses & Clinical Purpose
                </h2>
                <p className="text-slate-600 leading-7 mb-8">
                  {details.uses}
                </p>

                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Target Facilities & Users
                </h2>
                <p className="text-slate-600 leading-7 mb-8">
                  {details.whoUses}
                </p>

                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Key Technical Specifications
                </h2>
                <p className="text-slate-600 leading-7 mb-8">
                  {details.specifications}
                </p>

                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Clinical Applications
                </h2>
                <p className="text-slate-600 leading-7 mb-8">
                  {details.applications}
                </p>

                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Important Buying Considerations
                </h2>
                <p className="text-slate-600 leading-7 mb-8">
                  {details.considerations}
                </p>

                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Product & Enquiry Guidance
                </h2>
                <p className="text-slate-600 leading-7">
                  {details.support}
                </p>
                
              </div>

              {/* Products Grid */}
              <div className="mt-16">
                <SectionTitle
                  badge="Available Products"
                  title={`Select ${details.name} Systems`}
                  description={`Review the available models and product information in this category.`}
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
                      Currently cataloging models for this category. Contact our sales office for custom enquiries.
                    </p>
                    <Link href="/contact" className="inline-block mt-6 primary-btn">
                      Contact Sales Office
                    </Link>
                  </div>
                )}
              </div>
              
            </div>

            {/* Sidebar Information */}
            <aside className="space-y-8">
              
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Quick Navigator
                </h3>
                <Link href="/products" className="block text-sky-700 hover:text-sky-800 font-medium py-2 border-b border-slate-100">
                  ← Back to Full Catalog
                </Link>
                <Link href="/contact" className="block text-sky-700 hover:text-sky-800 font-medium py-2 border-b border-slate-100">
                  Request Custom Quotation
                </Link>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Related Equipment
                </h3>
                <div className="space-y-3">
                  {details.related.map(relSlug => {
                    const relName = relSlug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
                    return (
                      <Link 
                        key={relSlug} 
                        href={`/category/${relSlug}`} 
                        className="block text-slate-600 hover:text-red-600 transition text-sm py-1.5 border-b border-slate-50"
                      >
                        • {relName}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="bg-red-50 rounded-3xl p-8 border border-red-100 text-center">
                <h3 className="text-2xl font-bold text-red-900 mb-3">
                  Need Assistance?
                </h3>
                <p className="text-red-700 text-sm leading-6 mb-6">
                  If the right choice depends on your application or specifications, share the requirement for guidance.
                </p>
                <Link href="/contact" className="inline-block w-full bg-[#E52428] hover:bg-[#C91D21] text-white font-bold py-3.5 rounded-xl transition shadow-md">
                  Speak to Engineer
                </Link>
              </div>
              
            </aside>
            
          </div>
          
        </div>
      </section>
    </>
  );
}
