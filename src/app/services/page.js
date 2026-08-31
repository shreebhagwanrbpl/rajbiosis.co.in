import {
  Microscope,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
  Wrench,
  Activity,
} from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import PageBanner from "@/components/PageBanner";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const revalidate = 3600; // Cache for 1 hour

export const metadata = {
  title: "Certified Biomedical Equipment Calibration & Service | Raj Biosis",
  description: "Get professional diagnostics analyzer servicing, cell counter calibration, biochemistry analyzer repair, and preventative medical equipment maintenance.",
  alternates: {
    canonical: "https://rajbiosis.co.in/services",
  },
};

export default async function ServicesPage({ city = "" }) {
  let services = [];

  try {
    const snap = await getDoc(
      doc(db, "websites", "rajbiosiscoin", "pages", "services")
    );
    if (snap.exists()) {
      services = snap.data().services || [];
    }
  } catch (error) {
    console.error("Error fetching services server-side:", error);
  }

  const icons = [
    <Microscope size={30} />,
    <FlaskConical size={30} />,
    <ShieldCheck size={30} />,
    <Stethoscope size={30} />,
    <Wrench size={30} />,
    <Activity size={30} />,
  ];

  const displayLocation = city ? `in ${city}` : "across India";

  return (
    <>
      <PageBanner
        title={city ? `Services in ${city}` : "Our Services"}
        subtitle={`Delivering trusted biomedical and diagnostic services ${displayLocation} with innovation, precision, and healthcare excellence.`}
      />

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle
            badge="What We Offer"
            title="Premium Biomedical Services"
            description={`We provide innovative healthcare and biomedical solutions tailored to modern diagnostics and laboratory excellence ${displayLocation}.`}
            center
          />

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-16">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={icons[index % icons.length]}
                title={service.title}
                description={service.desc}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Working Process */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <SectionTitle
            badge="How We Work"
            title="Simple & Professional Process"
            description="We follow a streamlined process to ensure reliable biomedical and healthcare solutions."
            center
          />

          <div className="grid lg:grid-cols-3 gap-8 mt-16">
            {[
              {
                step: "01",
                title: "Consultation",
                desc: "Understanding healthcare requirements and diagnostics needs.",
              },
              {
                step: "02",
                title: "Implementation",
                desc: "Delivering biomedical equipment and technical setup.",
              },
              {
                step: "03",
                title: "Support",
                desc: "Providing maintenance and healthcare assistance.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-[30px] p-8 card-shadow border border-slate-100"
              >
                <span className="text-5xl font-bold text-sky-100">
                  {item.step}
                </span>
                <h3 className="text-2xl font-semibold mt-5">
                  {item.title}
                </h3>
                <p className="text-slate-600 mt-4 leading-7">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection city={city} />
    </>
  );
}