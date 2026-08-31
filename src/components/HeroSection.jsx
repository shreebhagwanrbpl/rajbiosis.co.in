"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import {
  ArrowUpRight,
  ShieldCheck,
  Microscope,
  BadgeCheck,
  Activity,
} from "lucide-react";

export default function HeroSection({ city }) {
  const [loading, setLoading] = useState(true);

  const [heroData, setHeroData] = useState({
    title: "",
    description: "",
    button1Text: "",
    button2Text: "",
  });

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "rajbiosiscoin",
            "pages",
            "home"
          )
        );

        if (snap.exists()) {
          setHeroData(snap.data());
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  /* ================= DISTRICT ROUTING ================= */

  const districtSlug = city
    ? city.toLowerCase().replace(/\s+/g, "-")
    : "";

  const makeLink = (path) => {
    return districtSlug ? `/${districtSlug}${path}` : path;
  };

  return (
    <section className="relative overflow-hidden bg-white">

      {/* ================= SOFT BACKGROUND ================= */}

      <div
        className="
          pointer-events-none
          absolute
          right-[-180px]
          top-[-160px]
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#FFF1F1]
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-[-180px]
          left-[-180px]
          h-[420px]
          w-[420px]
          rounded-full
          bg-[#FFF8F8]
          blur-3xl
        "
      />

      <div className="container-custom relative">

        {/* ================= TOP LABEL ================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: -15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="pt-10 sm:pt-12 lg:pt-14"
        >
          <div className="flex items-center gap-3">

            <span className="h-[2px] w-12 bg-[#E52428]" />

            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-[#E52428]
                sm:text-xs
              "
            >
              Biomedical Excellence
            </span>

          </div>
        </motion.div>

        {/* ================= HERO ================= */}

        <div className="relative mt-7 pb-12 sm:mt-9 lg:mt-10">

          {/* ================= IMAGE ================= */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.94,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.85,
              ease: "easeOut",
            }}
            className="
              relative
              mx-auto
              max-w-[1080px]
            "
          >

            {/* Red geometric shape */}

            <div
              className="
                absolute
                -right-5
                top-10
                hidden
                h-[80%]
                w-10
                rounded-full
                bg-[#E52428]
                lg:block
              "
            />

            <div
              className="
                absolute
                -left-5
                bottom-10
                hidden
                h-28
                w-5
                rounded-full
                bg-[#E52428]
                lg:block
              "
            />

            {/* Image frame */}

            <div
              className="
                relative
                overflow-hidden
                rounded-[32px]
                bg-white
                p-2
                shadow-[0_35px_90px_rgba(15,23,42,0.14)]
                sm:rounded-[40px]
                sm:p-3
              "
            >

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[26px]
                  sm:rounded-[32px]
                "
              >

                <Image
                  src="/home.png"
                  alt="Biomedical healthcare solutions"
                  width={1600}
                  height={900}
                  priority
                  className="
                    h-[280px]
                    w-full
                    object-cover
                    object-center
                    sm:h-[360px]
                    lg:h-[470px]
                  "
                />

                {/* Image overlay */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-r
                    from-black/20
                    via-transparent
                    to-transparent
                  "
                />

              </div>

            </div>

            {/* ================= IMAGE NUMBER ================= */}

            <div
              className="
                absolute
                left-5
                top-5
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-white
                text-sm
                font-black
                text-[#E52428]
                shadow-lg
                sm:left-8
                sm:top-8
              "
            >
              01
            </div>

            {/* ================= IMAGE STATUS ================= */}

            <div
              className="
                absolute
                bottom-5
                right-5
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-white/80
                bg-white/95
                px-4
                py-3
                shadow-xl
                backdrop-blur
                sm:bottom-8
                sm:right-8
              "
            >

              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#FFF1F1]
                  text-[#E52428]
                "
              >
                <Activity size={18} />
              </div>

              <div>

                <p className="text-xs font-bold text-slate-900 sm:text-sm">
                  Precision Driven
                </p>

                <p className="text-[10px] text-slate-500 sm:text-xs">
                  Modern Healthcare
                </p>

              </div>

            </div>

          </motion.div>

          {/* ================= CONTENT AREA ================= */}

          <div
            className="
              relative
              z-20
              mx-auto
              -mt-3
              max-w-[1120px]
              px-2
              sm:-mt-5
              sm:px-4
              lg:-mt-14
            "
          >

            <div
              className="
                grid
                gap-6
                lg:grid-cols-[1fr_300px]
                lg:items-end
              "
            >

              {/* ================= TITLE CARD ================= */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: -30,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.25,
                }}
                className="
                  rounded-[28px]
                  bg-white
                  p-6
                  shadow-[0_25px_65px_rgba(15,23,42,0.12)]
                  sm:p-8
                  lg:p-9
                "
              >

                {/* Label */}

                <div className="mb-4 flex items-center gap-2">

                  <span className="h-2 w-2 rounded-full bg-[#E52428]" />

                  <span
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.22em]
                      text-slate-400
                    "
                  >
                    Trusted Biomedical Solutions
                  </span>

                </div>

                {/* Title */}

                {loading ? (
                  <div className="animate-pulse space-y-3">

                    <div className="h-10 w-[85%] rounded-lg bg-slate-200" />

                    <div className="h-10 w-[60%] rounded-lg bg-slate-200" />

                  </div>
                ) : (
                  <h1
                    className="
                      max-w-3xl
                      text-[36px]
                      font-black
                      leading-[1]
                      tracking-[-0.045em]
                      text-[#111827]
                      sm:text-5xl
                      lg:text-[60px]
                    "
                  >
                    {heroData.title}
                  </h1>
                )}

                {/* City */}

                {city && !loading && (
                  <div className="mt-4">

                    <span
                      className="
                        inline-flex
                        rounded-full
                        bg-[#FFF1F1]
                        px-4
                        py-1.5
                        text-sm
                        font-semibold
                        text-[#E52428]
                      "
                    >
                      Serving {city}
                    </span>

                  </div>
                )}

                {/* Description */}

                {loading ? (
                  <div className="mt-5 max-w-2xl animate-pulse space-y-3">

                    <div className="h-4 rounded bg-slate-200" />

                    <div className="h-4 w-[90%] rounded bg-slate-200" />

                    <div className="h-4 w-[70%] rounded bg-slate-200" />

                  </div>
                ) : (
                  <p
                    className="
                      mt-5
                      max-w-2xl
                      text-sm
                      leading-7
                      text-slate-600
                      sm:text-base
                      sm:leading-8
                    "
                  >
                    {heroData.description}

                    {city && (
                      <>
                        {" "}across{" "}
                        <strong className="font-semibold text-slate-800">
                          {city}
                        </strong>
                      </>
                    )}
                  </p>
                )}

                {/* Buttons */}

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">

                  {loading ? (
                    <>
                      <div className="h-12 w-44 animate-pulse rounded-xl bg-slate-200" />

                      <div className="h-12 w-36 animate-pulse rounded-xl bg-slate-200" />
                    </>
                  ) : (
                    <>
                      <Link href={makeLink("/items")}>

                        <button
                          className="
                            group
                            flex
                            h-12
                            w-full
                            items-center
                            justify-center
                            gap-3
                            rounded-xl
                            bg-[#E52428]
                            px-7
                            font-semibold
                            !text-white
                            shadow-lg
                            shadow-red-900/10
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:bg-[#C91D21]
                            hover:!text-white
                            hover:shadow-xl
                            sm:w-auto
                          "
                        >
                          {heroData.button1Text ||
                            "Explore Products"}

                          <ArrowUpRight
                            size={18}
                            className="
                              !text-white
                              transition-transform
                              duration-300
                              group-hover:translate-x-1
                              group-hover:-translate-y-1
                            "
                          />
                        </button>

                      </Link>

                      <Link href={makeLink("/contact")}>

                        <button
                          className="
                            flex
                            h-12
                            w-full
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            px-7
                            font-semibold
                            text-slate-800
                            transition-all
                            duration-300
                            hover:border-[#E52428]
                            hover:!text-[#E52428]
                            hover:shadow-md
                            sm:w-auto
                          "
                        >
                          {heroData.button2Text ||
                            "Contact Us"}
                        </button>

                      </Link>
                    </>
                  )}

                </div>

              </motion.div>

              {/* ================= SIDE INFO ================= */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: 30,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.4,
                }}
                className="
                  grid
                  grid-cols-2
                  gap-3
                  lg:grid-cols-1
                "
              >

                {/* Experience */}

                <div
                  className="
                    rounded-[24px]
                    border
                    border-slate-100
                    bg-white
                    p-5
                    shadow-lg
                  "
                >

                  <div className="flex items-center justify-between">

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-[#FFF1F1]
                        text-[#E52428]
                      "
                    >
                      <ShieldCheck size={19} />
                    </div>

                    <span className="text-xs font-bold text-slate-300">
                      01
                    </span>

                  </div>

                  <p className="mt-4 text-3xl font-black text-[#E52428]">
                    10+
                  </p>

                  <p className="mt-1 text-xs font-medium text-slate-500">
                    Years Experience
                  </p>

                </div>

                {/* Products */}

                <div
                  className="
                    rounded-[24px]
                    bg-[#111827]
                    p-5
                    shadow-lg
                  "
                >

                  <div className="flex items-center justify-between">

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-white/10
                        text-white
                      "
                    >
                      <Microscope size={19} />
                    </div>

                    <span className="text-xs font-bold text-white/30">
                      02
                    </span>

                  </div>

                  <p className="mt-4 text-3xl font-black text-white">
                    500+
                  </p>

                  <p className="mt-1 text-xs font-medium text-white/50">
                    Products Delivered
                  </p>

                </div>

              </motion.div>

            </div>

            {/* ================= BOTTOM TRUST LINE ================= */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.7,
                delay: 0.6,
              }}
              className="
                mt-7
                flex
                flex-wrap
                items-center
                justify-center
                gap-x-8
                gap-y-3
                border-t
                border-slate-100
                pt-5
                text-xs
                font-medium
                text-slate-400
              "
            >

              <span className="flex items-center gap-2">
                <BadgeCheck
                  size={16}
                  className="text-[#E52428]"
                />
                Quality Assured
              </span>

              <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

              <span className="flex items-center gap-2">
                <Microscope
                  size={16}
                  className="text-[#E52428]"
                />
                Laboratory Solutions
              </span>

              <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

              <span className="flex items-center gap-2">
                <ShieldCheck
                  size={16}
                  className="text-[#E52428]"
                />
                Trusted Performance
              </span>

            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}