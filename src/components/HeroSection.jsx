"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Wrench,
  CheckCircle2,
  Sparkles,
  PhoneCall,
} from "lucide-react";

export default function HeroSection({ city = "", state = "", district = "", initialData = null }) {
  const [heroData, setHeroData] = useState(() => ({
    badge: initialData?.badge || (city ? `Certified Biomedical Partner in ${city}` : "Certified Biomedical & Diagnostic Partner"),
    title: initialData?.title || (city ? `Diagnostic Analyzers & Medical Equipment in ${city}` : "Complete Diagnostic Analyzers, Pathology Devices & Medical Equipment"),
    description: initialData?.description || (city 
      ? `Supplying high-precision automated & semi-automated clinical analyzers, diagnostic kits, reagents and turnkey laboratory equipment across ${city}${state ? `, ${state}` : ""}.`
      : "Experience unparalleled diagnostic accuracy with Raj Biosis's portfolio of fully automated and semi-automated clinical analyzers, high-grade laboratory consumables, and proactive maintenance contracts."),
    button1Text: initialData?.button1Text || "Explore Catalogue",
    button2Text: initialData?.button2Text || "Request Quote",
    imageUrl: initialData?.imageUrl || "/home.png",
    imageAlt: initialData?.imageAlt || "Raj Biosis Biomedical Equipment & Diagnostic Analyzers",
  }));

  const districtSlug = district || (city ? city.toLowerCase().replace(/\s+/g, "-") : "");
  const link = (path) => (districtSlug ? `/${districtSlug}${path}` : path);

  useEffect(() => {
    fetch("/api/site-data?pageType=home", {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" },
    })
      .then((r) => r.json())
      .then((json) => {
        if (json?.data) {
          setHeroData((prev) => ({
            ...prev,
            badge: json.data.badge || prev.badge,
            title: json.data.title || prev.title,
            description: json.data.description || prev.description,
            button1Text: json.data.button1Text || prev.button1Text,
            button2Text: json.data.button2Text || prev.button2Text,
            imageUrl: json.data.imageUrl || prev.imageUrl,
            imageAlt: json.data.imageAlt || prev.imageAlt,
          }));
        }
      })
      .catch((error) => console.error("Hero data sync failed:", error));
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-red-50/40 via-white to-slate-50 pt-10 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200/70">
      {/* Subtle background glow elements */}
      <div className="pointer-events-none absolute -top-24 right-0 h-[450px] w-[450px] rounded-full bg-red-100/50 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -left-20 h-[380px] w-[380px] rounded-full bg-slate-100 blur-3xl" />

      <div className="container-custom relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-4 py-1.5 shadow-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-[#E52428] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#E52428]">
                {heroData.badge}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-[1.1] text-left">
              {heroData.title}
            </h1>

            {/* Description Subtitle */}
            <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl text-left">
              {heroData.description}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <Link
                href={link("/items")}
                className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-[#E52428] px-8 py-4 font-bold text-white shadow-[0_10px_25px_rgba(229,36,40,0.3)] hover:bg-[#c91d21] hover:shadow-[0_15px_30px_rgba(229,36,40,0.4)] hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto text-center"
              >
                <span>{heroData.button1Text}</span>
                <ArrowRight size={19} className="transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href={link("/contact")}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-300 bg-white px-7 py-3.5 font-bold text-slate-800 hover:border-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-200 w-full sm:w-auto text-center"
              >
                <PhoneCall size={18} className="text-[#E52428]" />
                <span>{heroData.button2Text}</span>
              </Link>
            </div>

            {/* Trust Highlights Strip */}
            <div className="mt-10 pt-8 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#E52428]">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 uppercase">ISO Certified</p>
                  <p className="text-xs text-slate-500">Traceable Standards</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#E52428]">
                  <Wrench size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 uppercase">On-Site Service</p>
                  <p className="text-xs text-slate-500">Certified Engineers</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#E52428]">
                  <Truck size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 uppercase">Pan-India Supply</p>
                  <p className="text-xs text-slate-500">Reagents & Spares</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Image with Floating Trust Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            {/* Visual Container */}
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] border border-slate-200/80 bg-white p-2.5 shadow-[0_25px_60px_rgba(15,23,42,0.12)]">
                <Image
                  src={heroData.imageUrl || "/home.png"}
                  alt={heroData.imageAlt || "Biomedical Equipment & Diagnostic Instruments"}
                  width={1200}
                  height={800}
                  priority
                  className="h-[320px] sm:h-[420px] lg:h-[480px] w-full rounded-[26px] sm:rounded-[34px] object-cover"
                />
              </div>

              {/* Floating Badge 1: Experience & Trust */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 rounded-2xl border border-slate-200/80 bg-white/95 backdrop-blur-md p-4 shadow-xl flex items-center gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <p className="text-base font-black text-slate-900 leading-none">500+ Clients</p>
                  <p className="text-xs text-slate-500 mt-1 font-medium">Hospitals & Labs across India</p>
                </div>
              </div>

              {/* Floating Badge 2: Diagnostic Range */}
              <div className="hidden sm:flex absolute -top-4 -right-4 rounded-2xl border border-slate-200/80 bg-white/95 backdrop-blur-md p-3.5 shadow-xl items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-[#E52428]">
                  <Sparkles size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 leading-none">100+ Diagnostic</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Instruments & Kits</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

