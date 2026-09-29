import Link from "next/link";
import { ArrowRight, Wrench, Settings2, Cpu, Truck, PenTool, FileCheck2, Activity, ShieldCheck } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { fetchServicesData } from "@/lib/data-fetcher-server";

const serviceIcons = [Wrench, Settings2, Cpu, Truck, PenTool, FileCheck2, Activity, ShieldCheck];

export default async function ServicesPreview({ city, district }) {
  const data = await fetchServicesData();
  const allServices = Array.isArray(data?.services) && data.services.length > 0 ? data.services : [];
  const services = allServices.slice(0, 4);

  const base = district ? `/${district}` : "";

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionTitle
          badge="Specialized Services"
          title={city ? `Biomedical Support & Services in ${city}` : "Comprehensive Lab & Equipment Services"}
          description="Beyond equipment distribution, we provide certified calibration, maintenance contracts, workflow engineering, and genuine spare parts."
          center
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((item, idx) => {
            const Icon = serviceIcons[idx % serviceIcons.length];
            return (
              <div
                key={item.title || idx}
                className="rounded-[26px] border border-slate-200 p-7 bg-slate-50/50 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-[#E52428] mb-5">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-slate-600 leading-relaxed text-sm line-clamp-4">
                    {item.desc || item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Link
            href={`${base}/services`}
            className="inline-flex items-center gap-2 font-bold text-[#E52428] hover:gap-3 transition-all"
          >
            Explore all services & maintenance <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

