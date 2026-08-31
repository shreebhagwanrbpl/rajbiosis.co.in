export default function SeoContent({ city = "", state = "" }) {
  const location = city ? `${city}, ${state}` : "India";
  const displayCity = city || "India";

  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="container-custom">
        <h2 className="text-4xl font-bold text-slate-900 mb-8">
          Biomedical Equipment Supplier in {location}
        </h2>

        <div className="space-y-6 text-slate-600 leading-8 text-lg">
          <p>
            Raj Biosis is a trusted supplier of biomedical and laboratory diagnostic equipment serving {location}. 
            We provide a comprehensive range of systems including CBC Machines, Hematology Analyzers, Biochemistry Analyzers, 
            Urine Analyzers, ELISA Readers, and clinical reagents for hospitals, pathology labs, and medical centers in {displayCity} and surrounding regions.
          </p>

          <p>
            Our mission is to empower healthcare providers and pathologists across {location} with premium, high-precision laboratory instruments. 
            By supplying state-of-the-art diagnostic analyzers, we help local clinics and laboratory chains enhance testing throughput and improve clinical accuracy.
          </p>

          <p>
            For laboratories in {displayCity}, we offer end-to-end guidance, selection support, and technical assistance. 
            Whether you are establishing a new laboratory facility or upgrading your analyzer systems, our team provides expert consultation and coordinates secure delivery and setup in {displayCity}, {state}.
          </p>
        </div>

        {/* Localized Details Section */}
        {city && (
          <div className="mt-12 bg-slate-50 rounded-[32px] p-8 border border-slate-200 grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Service & Delivery in {displayCity}
              </h3>
              <p className="text-slate-600 leading-7">
                We ensure secure shipping, local logistics handling, and onsite setup coordination for hematology and biochemistry systems across {displayCity} and neighboring areas.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Healthcare Entities Served
              </h3>
              <p className="text-slate-600 leading-7">
                Our customer network in {state} includes private diagnostic laboratories, multi-specialty hospitals, research centers, and clinical pathology hubs.
              </p>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-xl text-slate-900">
                Do you supply biomedical equipment to pathology labs in {displayCity}?
              </h3>
              <p className="text-slate-600 mt-2">
                Yes, we supply a complete range of laboratory and diagnostic equipment to healthcare institutions, clinical labs, and hospitals throughout {displayCity}, {state}.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-xl text-slate-900">
                What types of laboratory analyzers are available?
              </h3>
              <p className="text-slate-600 mt-2">
                We offer automatic hematology cell counters, semi-automatic and fully-automated biochemistry analyzers, electrolyte analyzers, ELISA plate readers, and blood collection accessories.
              </p>
            </div>

            {city && (
              <div>
                <h3 className="font-semibold text-xl text-slate-900">
                  What is the estimated delivery timeline for {displayCity}?
                </h3>
                <p className="text-slate-600 mt-2">
                  Delivery timelines to {displayCity} vary depending on specific model availability, transport networks, and state regulations, but typical order dispatches arrive within 3 to 7 business days.
                </p>
              </div>
            )}

            <div>
              <h3 className="font-semibold text-xl text-slate-900">
                How do we get a quote or specifications sheet for equipment?
              </h3>
              <p className="text-slate-600 mt-2">
                Simply select the product in our online catalog, click "Get Quote" or "Download Brochure," or use our contact form. Our service representatives will get back to you with the latest price quote.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}