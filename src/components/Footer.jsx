"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";

import { fetchFullCatalog } from "@/lib/data-fetcher";

/* =========================================================
   FOOTER
========================================================= */

export default function Footer() {
  const [contactInfo, setContactInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [districtData, setDistrictData] = useState(null);
  const [categories, setCategories] = useState([]);

  const pathname = usePathname();

  /* =========================================================
     DISTRICT
  ========================================================= */

  const pathParts =
    pathname?.split("/").filter(Boolean) || [];

  const staticRoutes = [
    "about",
    "services",
    "products",
    "contact",
    "items",
  ];

  const district =
    pathParts.length > 0 &&
      !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  /* =========================================================
     CONTACT INFO
  ========================================================= */

  useEffect(() => {
    const loadContact = async () => {
      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "rajbiosiscoin",
            "pages",
            "contact"
          )
        );

        if (snap.exists()) {
          setContactInfo(
            snap.data().contactInfo || []
          );
        }

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    loadContact();
  }, []);

  /* =========================================================
     DISTRICT DATA
  ========================================================= */

  useEffect(() => {
    const loadDistrict = async () => {
      if (!district) return;

      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "rajbiosiscoin",
            "districts",
            district
          )
        );

        if (snap.exists()) {
          setDistrictData(snap.data());
        }
      } catch (err) {
        console.log(err);
      }
    };

    loadDistrict();
  }, [district]);

  /* =========================================================
     CATEGORIES
  ========================================================= */

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const catalog =
          await fetchFullCatalog();

        const uniqueCategories =
          Array.from(
            new Set(
              catalog
                .map((item) => item.category)
                .filter(Boolean)
            )
          );

        setCategories(
          uniqueCategories.slice(0, 7)
        );
      } catch (err) {
        console.error(
          "Error loading categories in footer:",
          err
        );
      }
    };

    loadCategories();
  }, []);

  /* =========================================================
     CONTACT VALUES
  ========================================================= */

  const phone =
    contactInfo.find(
      (x) => x.label === "Phone" || x.label === "Phone Number"
    )?.value ||
    "+91 9983123469\n+91 9983333489";

  const email =
    contactInfo.find(
      (x) => x.label === "Email" || x.label === "Email Address"
    )?.value ||
    "rajbiosis@yahoo.in";

  const address =
    contactInfo.find(
      (x) => x.label === "Address" || x.label === "Office Address"
    )?.value ||
    "F-4, 1st Floor, Plot No. 16, D-Block Tagor Nagar, on Ajmer-Delhi, 200 Feet Bypass Rd, Jaipur, Rajasthan 302021";

  const dynamicAddress =
    districtData
      ? `${districtData.district}, ${districtData.state}, India`
      : address;

  const phoneStr = phone ? String(phone) : "";
  const phoneNumbers = phoneStr
    ? phoneStr
      .split(/[\n,]+/)
      .map((num) => num.trim())
      .filter(Boolean)
    : [];

  /* =========================================================
     ROUTING
  ========================================================= */

  const makeLink = (path) => {
    if (!district) return path;

    if (path === "/") {
      return `/${district}`;
    }

    return `/${district}${path}`;
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <footer className="bg-white border-t border-slate-200">

        <div className="container-custom py-16">

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10">

            {[...Array(4)].map((_, i) => (
              <div key={i}>

                <div
                  className="
                    h-8
                    w-40
                    bg-slate-200
                    rounded
                    animate-pulse
                    mb-6
                  "
                />

                {[...Array(5)].map((_, j) => (
                  <div
                    key={j}
                    className="
                      h-5
                      bg-slate-200
                      rounded
                      animate-pulse
                      mb-4
                    "
                  />
                ))}

              </div>
            ))}

          </div>

          <div className="border-t border-slate-200 mt-12 pt-6">

            <div
              className="
                h-5
                w-72
                bg-slate-200
                rounded
                animate-pulse
              "
            />

          </div>

        </div>

      </footer>
    );
  }

  /* =========================================================
     FOOTER
  ========================================================= */

  return (
    <footer className="bg-slate-50 border-t border-slate-200">

      <div className="container-custom py-16">

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10">

          {/* =================================================
              BRAND
          ================================================= */}

          <div>

            <h2 className="text-2xl font-bold text-[#E52428]">

              Raj

              <span className="text-slate-900">
                {" "}Biosis
              </span>

            </h2>

            <p className="mt-5 text-slate-600 leading-7">

              Delivering trusted diagnostic
              and biomedical solutions with
              innovation, quality, and
              precision healthcare support.

            </p>

            {/* Social Icons */}

            <div className="flex gap-4 mt-6">

              <a
                href="https://www.facebook.com/rajbiosispvtltd/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-white
                  border
                  border-slate-200
                  flex
                  items-center
                  justify-center
                  text-[#E52428]
                  hover:bg-[#E52428]
                  hover:text-white
                  transition
                  shadow-sm
                "
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="https://www.instagram.com/rajbiosisindia/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-white
                  border
                  border-slate-200
                  flex
                  items-center
                  justify-center
                  text-[#E52428]
                  hover:bg-[#E52428]
                  hover:text-white
                  transition
                  shadow-sm
                "
              >
                <FaInstagram size={18} />
              </a>

            </div>

          </div>

          {/* =================================================
              QUICK LINKS
          ================================================= */}

          <div className="w-fit">

            <h3
              className="
                text-lg
                font-semibold
                mb-5
                text-slate-900
              "
            >
              Quick Links
            </h3>

            <div
              className="
                flex
                w-fit
                flex-col
                gap-3
                text-slate-600
              "
            >

              <Link
                href={makeLink("/")}
                className="
                  hover:text-[#E52428]
                  transition
                "
              >
                Home
              </Link>

              <Link
                href={makeLink("/about")}
                className="
                  hover:text-[#E52428]
                  transition
                "
              >
                About
              </Link>

              <Link
                href={makeLink("/services")}
                className="
                  hover:text-[#E52428]
                  transition
                "
              >
                Services
              </Link>

              <Link
                href={makeLink("/items")}
                className="
                  hover:text-[#E52428]
                  transition
                "
              >
                Products
              </Link>

              <Link
                href={makeLink("/contact")}
                className="
                  hover:text-[#E52428]
                  transition
                "
              >
                Contact
              </Link>

            </div>

          </div>

          {/* =================================================
              CATEGORIES
          ================================================= */}

          <div className="w-fit">

            <h3
              className="
                text-lg
                font-semibold
                mb-5
                text-slate-900
              "
            >
              Our Categories
            </h3>

            <div
              className="
                flex
                w-fit
                flex-col
                gap-3
                text-slate-600
              "
            >

              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={makeLink(
                    `/items#${cat
                      .replace(/\s+/g, "-")
                      .toLowerCase()}`
                  )}
                  className="
                    w-fit
                    hover:text-[#E52428]
                    transition
                    text-left
                  "
                >
                  {cat}
                </Link>
              ))}

              {categories.length === 0 && (
                <>
                  <p>Diagnostic Equipment</p>
                  <p>Laboratory Solutions</p>
                  <p>Biomedical Instruments</p>
                  <p>Maintenance Support</p>
                </>
              )}

            </div>

          </div>

          {/* =================================================
              CONTACT
          ================================================= */}

          <div>

            <h3
              className="
                text-lg
                font-semibold
                mb-5
                text-slate-900
              "
            >
              Contact Info
            </h3>

            <div className="space-y-4 text-slate-600">

              {/* Address */}

              <div className="flex items-start gap-4">

                <div
                  className="
                    w-12
                    h-12
                    rounded-2xl
                    bg-[#FFF1F1]
                    flex
                    items-center
                    justify-center
                    flex-shrink-0
                  "
                >

                  <MapPin
                    size={24}
                    className="text-[#E52428]"
                  />

                </div>

                <p className="leading-7 pt-2">
                  {dynamicAddress}
                </p>

              </div>

              {/* Phone */}

              <div className="flex flex-col gap-2">

                {phoneNumbers.map((num, i) => (

                  <div
                    key={i}
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <Phone
                      size={18}
                      className="
                        text-[#E52428]
                        flex-shrink-0
                      "
                    />

                    <a
                      href={`tel:${num}`}
                      className="
                        hover:text-[#E52428]
                        transition
                      "
                    >
                      {num}
                    </a>

                  </div>

                ))}

              </div>

              {/* Email */}

              <div className="flex items-center gap-3">

                <Mail
                  size={18}
                  className="text-[#E52428]"
                />

                <p>

                  <a
                    href={`mailto:${email}`}
                    className="
                      hover:text-[#E52428]
                      transition
                    "
                  >
                    {email}
                  </a>

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            BOTTOM
        ================================================= */}

        <div
          className="
            border-t
            border-slate-200
            mt-12
            pt-6
            flex
            flex-col
            md:flex-row
            justify-between
            items-center
            text-sm
            text-slate-500
          "
        >

          <p>
            © 2026 Raj Biosis.
            All rights reserved.
          </p>

          <p className="mt-3 md:mt-0">
            Designed with precision for
            modern diagnostics.
          </p>

        </div>

      </div>

    </footer>
  );
}