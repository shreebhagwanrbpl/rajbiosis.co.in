"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Layers3, SearchCheck, ClipboardList } from "lucide-react";

export default function HeroSection({ city }) {
  const districtSlug = city ? city.toLowerCase().replace(/\s+/g, "-") : "";
  const link = (p) => districtSlug ? `/${districtSlug}${p}` : p;
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute -right-40 -top-32 h-96 w-96 rounded-full bg-red-50 blur-3xl" />
      <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-slate-50 blur-3xl" />
      <div className="container-custom relative py-12 lg:py-16">
        <div className="mb-7 flex items-center gap-3">
          <span className="h-px w-12 bg-[#E52428]" />
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#E52428]">Biomedical Product Directory</span>
        </div>
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <motion.div initial={{ opacity: 0, x: -25 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .65 }}>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">Equipment • Kits • Reagents • Consumables</p>
            <h1 className="max-w-3xl text-5xl font-black leading-[1.02] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              One catalogue for everyday biomedical requirements.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
              Browse laboratory instruments, diagnostic products, testing materials, patient-care devices and supporting supplies from one organised marketplace. {city ? `Serving requirements around ${city} and nearby areas.` : "Built for hospitals, laboratories, clinics, institutions and professional buyers across India."}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={link("/items")} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#E52428] px-7 py-4 font-bold !text-white shadow-lg hover:-translate-y-0.5 transition">
                Browse Catalogue <ArrowUpRight size={19} />
              </Link>
              <Link href={link("/contact")} className="inline-flex items-center justify-center rounded-2xl border border-slate-300 px-7 py-4 font-bold text-slate-900 hover:bg-slate-50 transition">
                Discuss a Requirement
              </Link>
            </div>
            <div className="mt-9 grid max-w-xl grid-cols-3 gap-3">
              {[[Layers3, "Multiple categories"], [SearchCheck, "Specification-led"], [ClipboardList, "Enquiry friendly"]].map(([Icon, text]) => (
                <div key={text} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <Icon size={20} className="text-[#E52428]" /><p className="mt-2 text-sm font-semibold text-slate-700">{text}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8 }} className="relative">
            <div className="overflow-hidden rounded-[38px] border border-slate-200 bg-slate-100 p-2 shadow-[0_30px_80px_rgba(15,23,42,.12)]">
              <Image src="/home.png" alt="Biomedical products and laboratory supplies" width={1600} height={900} priority className="h-[330px] w-full rounded-[30px] object-cover sm:h-[430px] lg:h-[520px]" />
            </div>
            <div className="absolute -bottom-5 left-5 rounded-2xl bg-white p-5 shadow-xl border border-slate-100 sm:left-8">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Built around the buyer</p>
              <p className="mt-1 font-bold text-slate-900">Compare categories, then enquire.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
