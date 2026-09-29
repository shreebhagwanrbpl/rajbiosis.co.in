import { Wrench, Settings2, ShieldCheck, Truck, Cpu, FileCheck2, Activity, PenTool, CheckCircle2 } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import CTASection from "@/components/CTASection";
import PageBanner from "@/components/PageBanner";
import { fetchServicesData } from "@/lib/data-fetcher-server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Biomedical & Diagnostic Equipment Services | Raj Biosis",
  description: "Comprehensive preventive maintenance, clinical analyzer calibration, turnkey laboratory setup, genuine spare parts, and reagent management across India.",
  alternates: { canonical: "https://rajbiosis.co.in/services" },
};

const serviceIcons = [Wrench, Settings2, Cpu, Truck, PenTool, FileCheck2, Activity, ShieldCheck];

export default async function ServicesPage({ city = "" }) {
  const data = await fetchServicesData();
  const services = Array.isArray(data?.services) && data.services.length > 0 ? data.services : [];

  return (
    <>
      <PageBanner
        title={city ? `Biomedical Services in ${city}` : "Biomedical & Laboratory Services"}
        subtitle="End-to-end technical support, precision instrument calibration, turnkey lab setup, and reliable maintenance solutions."
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle
            badge="Our Core Services"
            title={city ? `Professional Support & Engineering Services in ${city}` : "Comprehensive Engineering & Diagnostic Lab Solutions"}
            description="Delivering OEM-grade calibration, certified maintenance contracts, and complete laboratory infrastructure support for healthcare facilities."
            center
          />

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((item, idx) => {
              const Icon = serviceIcons[idx % serviceIcons.length];
              return (
                <div
                  key={item.title || idx}
                  className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-[#E52428] mb-6 shadow-sm">
                      <Icon size={26} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-4 leading-7 text-slate-600">
                      {item.desc || item.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-sm font-semibold text-[#E52428]">
                    <CheckCircle2 size={16} className="mr-2 text-[#E52428]" /> Certified Quality & Support
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Execution Process Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <SectionTitle
            badge="Execution Process"
            title="How We Deliver Our Services"
            description="A structured, rapid-response methodology ensuring minimal equipment downtime and standard audit compliance."
            center
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Requirement Assessment",
                desc: "Detailed evaluation of analyzer parameters, facility layout, calibration standards, or spare part specifications.",
              },
              {
                step: "02",
                title: "Deployment & Calibration",
                desc: "On-site dispatch of certified biomedical engineers for precision tuning, installation, or supply replenishment.",
              },
              {
                step: "03",
                title: "Validation & Documentation",
                desc: "Issuance of traceable calibration certificates, verification logs, and ongoing operational support.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded-[28px] bg-white border border-slate-200 p-8 shadow-sm hover:border-red-200 transition"
              >
                <span className="text-4xl font-black text-[#E52428]/20">{s.step}</span>
                <h3 className="mt-4 text-2xl font-bold text-slate-900">{s.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection city={city} />
    </>
  );
}

