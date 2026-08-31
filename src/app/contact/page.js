"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  addDoc,
  collection,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import toast from "react-hot-toast";

import {
  Mail,
  Phone,
  MapPin,
  Clock3,
} from "lucide-react";

import PageBanner from "@/components/PageBanner";
import CTASection from "@/components/CTASection";

export default function ContactPage({ city = "" }) {
  const [loading, setLoading] = useState(true);
  const [districtData, setDistrictData] = useState(null);
  const [contactInfo, setContactInfo] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const pathname = usePathname();

  /* ================= DISTRICT ================= */

  const pathParts =
    pathname?.split("/").filter(Boolean) || [];

  const currentDistrict =
    pathParts.length > 0
      ? pathParts[0]
      : null;

  const displayCity =
    city ||
    (currentDistrict
      ? currentDistrict
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) =>
          char.toUpperCase()
        )
      : "");

  /* ================= FORM ================= */

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phoneRegex =
      /^[6-9]\d{9}$/;

    if (!form.name.trim()) {
      return toast.error("Name is required");
    }

    if (!emailRegex.test(form.email)) {
      return toast.error("Enter valid email");
    }

    if (!phoneRegex.test(form.phone)) {
      return toast.error(
        "Enter valid mobile number"
      );
    }

    if (!form.message.trim()) {
      return toast.error(
        "Message is required"
      );
    }

    try {
      setSubmitting(true);

      await addDoc(
        collection(
          db,
          "websitesQueries",
          "rajbiosiscoin",
          "contactQueries"
        ),
        {
          ...form,
          createdAt: new Date(),
        }
      );

      toast.success(
        "Message submitted successfully"
      );

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);

      toast.error(
        "Something went wrong"
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= LOAD DISTRICT ================= */

  useEffect(() => {
    const loadDistrict = async () => {
      if (!currentDistrict) return;

      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "rajbiosiscoin",
            "districts",
            currentDistrict
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
  }, [currentDistrict]);

  /* ================= LOAD CONTACT ================= */

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
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadContact();
  }, []);

  /* ================= CONTACT DATA ================= */

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

  const hours =
    contactInfo.find(
      (x) => x.label === "Working Hours"
    )?.value ||
    "Mon - Sat (10AM - 6PM)";

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

  const mapAddress = encodeURIComponent(
    dynamicAddress
  );

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <section className="section-padding bg-slate-50">
        <div className="container-custom grid lg:grid-cols-2 gap-14">

          <div className="space-y-6">

            <div className="h-10 w-48 bg-slate-200 rounded-full animate-pulse mb-8" />

            <div className="h-14 w-full bg-slate-200 rounded-2xl animate-pulse mb-4" />

            <div className="h-20 w-full bg-slate-200 rounded-2xl animate-pulse mb-8" />

            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-28 bg-slate-200 rounded-3xl animate-pulse mb-6"
              />
            ))}

          </div>

          <div className="bg-white p-10 rounded-3xl">

            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-14 bg-slate-200 rounded-2xl animate-pulse mb-5"
              />
            ))}

          </div>

        </div>
      </section>
    );
  }

  return (
    <>
      {/* =================================================
          BANNER
      ================================================= */}

      <PageBanner
        title={
          displayCity
            ? `Contact Us in ${displayCity}`
            : "Contact Us"
        }
        subtitle={
          displayCity
            ? `Get in touch with Raj Biosis in ${displayCity} for premium diagnostic and biomedical solutions.`
            : "Get in touch with Raj Biosis for premium diagnostic and biomedical solutions."
        }
      />

      {/* =================================================
          CONTACT SECTION
      ================================================= */}

      <section className="section-padding bg-white">

        <div className="container-custom grid lg:grid-cols-2 gap-14">

          {/* =================================================
              LEFT INFORMATION
          ================================================= */}

          <div>

            {/* Badge */}

            <span
              className="
                inline-block
                bg-[#FFF1F1]
                border
                border-red-100
                text-[#E52428]
                px-5
                py-2
                rounded-full
                font-semibold
                mb-5
              "
            >
              {displayCity
                ? `Contact Information in ${displayCity}`
                : "Contact Information"}
            </span>

            {/* Heading */}

            <h2 className="section-title text-[#2D1B21]">
              Let’s Start a Conversation
              {displayCity
                ? ` in ${displayCity}`
                : ""}
            </h2>

            {/* Description */}

            <p className="section-subtitle text-[#6B4A54]">
              Reach out to us for
              healthcare consultation,
              biomedical products, and
              advanced diagnostic support.
            </p>

            {/* =================================================
                CONTACT CARDS
            ================================================= */}

            <div className="space-y-6 mt-10">

              {/* PHONE */}

              <div
                className="
                  flex
                  items-start
                  gap-5
                  bg-slate-50
                  p-6
                  rounded-[28px]
                  border
                  border-slate-200
                  hover:border-red-100
                  hover:shadow-[0_15px_40px_rgba(229,36,40,0.07)]
                  transition-all
                  duration-300
                "
              >

                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-[#FFF1F1]
                    flex
                    items-center
                    justify-center
                    text-[#E52428]
                    flex-shrink-0
                  "
                >
                  <Phone size={24} />
                </div>

                <div>

                  <h4 className="font-semibold text-lg text-slate-900">
                    Phone Number
                  </h4>

                  <div className="space-y-1 mt-2">

                    {phoneNumbers.map(
                      (num, i) => (
                        <p
                          key={i}
                          className="text-slate-600"
                        >
                          <a
                            href={`tel:${num}`}
                            className="
                              hover:text-[#E52428]
                              transition
                            "
                          >
                            {num}
                          </a>
                        </p>
                      )
                    )}

                  </div>

                </div>

              </div>

              {/* EMAIL */}

              <div
                className="
                  flex
                  items-start
                  gap-5
                  bg-slate-50
                  p-6
                  rounded-[28px]
                  border
                  border-slate-200
                  hover:border-red-100
                  hover:shadow-[0_15px_40px_rgba(229,36,40,0.07)]
                  transition-all
                  duration-300
                "
              >

                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-[#FFF1F1]
                    flex
                    items-center
                    justify-center
                    text-[#E52428]
                    flex-shrink-0
                  "
                >
                  <Mail size={24} />
                </div>

                <div>

                  <h4 className="font-semibold text-lg text-slate-900">
                    Email Address
                  </h4>

                  <p className="text-slate-600 mt-2">
                    {email}
                  </p>

                </div>

              </div>

              {/* ADDRESS */}

              <div
                className="
                  flex
                  items-start
                  gap-5
                  bg-slate-50
                  p-6
                  rounded-[28px]
                  border
                  border-slate-200
                  hover:border-red-100
                  hover:shadow-[0_15px_40px_rgba(229,36,40,0.07)]
                  transition-all
                  duration-300
                "
              >

                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-[#FFF1F1]
                    flex
                    items-center
                    justify-center
                    text-[#E52428]
                    flex-shrink-0
                  "
                >
                  <MapPin size={24} />
                </div>

                <div>

                  <h4 className="font-semibold text-lg text-slate-900">
                    Office Address
                  </h4>

                  <p className="text-slate-600 mt-2">
                    {dynamicAddress}
                  </p>

                </div>

              </div>

              {/* WORKING HOURS */}

              <div
                className="
                  flex
                  items-start
                  gap-5
                  bg-slate-50
                  p-6
                  rounded-[28px]
                  border
                  border-slate-200
                  hover:border-red-100
                  hover:shadow-[0_15px_40px_rgba(229,36,40,0.07)]
                  transition-all
                  duration-300
                "
              >

                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-[#FFF1F1]
                    flex
                    items-center
                    justify-center
                    text-[#E52428]
                    flex-shrink-0
                  "
                >
                  <Clock3 size={24} />
                </div>

                <div>

                  <h4 className="font-semibold text-lg text-slate-900">
                    Working Hours
                  </h4>

                  <p className="text-slate-600 mt-2">
                    {hours}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              RIGHT FORM
          ================================================= */}

          <div
            className="
              bg-white
              rounded-[40px]
              p-8
              lg:p-10
              border
              border-slate-200
              shadow-[0_20px_60px_rgba(15,23,42,0.06)]
            "
          >

            <h3 className="text-3xl font-bold text-slate-900">
              Send Us Message
            </h3>

            <p className="text-slate-600 mt-3">
              Fill out the form and our
              team will contact you soon.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              {/* NAME */}

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="
                  w-full
                  border
                  border-slate-200
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  text-slate-900
                  placeholder:text-slate-400
                  focus:border-[#E52428]
                  focus:ring-2
                  focus:ring-[#E52428]/10
                  transition
                "
              />

              {/* EMAIL */}

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="
                  w-full
                  border
                  border-slate-200
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  text-slate-900
                  placeholder:text-slate-400
                  focus:border-[#E52428]
                  focus:ring-2
                  focus:ring-[#E52428]/10
                  transition
                "
              />

              {/* PHONE */}

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                maxLength={10}
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value.replace(
                      /\D/g,
                      ""
                    ),
                  })
                }
                className="
                  w-full
                  border
                  border-slate-200
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  text-slate-900
                  placeholder:text-slate-400
                  focus:border-[#E52428]
                  focus:ring-2
                  focus:ring-[#E52428]/10
                  transition
                "
              />

              {/* SUBJECT */}

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                className="
                  w-full
                  border
                  border-slate-200
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  text-slate-900
                  placeholder:text-slate-400
                  focus:border-[#E52428]
                  focus:ring-2
                  focus:ring-[#E52428]/10
                  transition
                "
              />

              {/* MESSAGE */}

              <textarea
                rows={5}
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                className="
                  w-full
                  border
                  border-slate-200
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  text-slate-900
                  placeholder:text-slate-400
                  focus:border-[#E52428]
                  focus:ring-2
                  focus:ring-[#E52428]/10
                  transition
                  resize-none
                "
              />

              {/* SUBMIT */}

              <button
                type="submit"
                disabled={submitting}
                className="
                  w-full
                  bg-[#E52428]
                  !text-white
                  py-4
                  rounded-2xl
                  font-semibold
                  hover:bg-[#C91D21]
                  hover:!text-white
                  hover:shadow-lg
                  hover:shadow-red-100
                  transition-all
                  duration-300
                  shadow-md
                  disabled:opacity-70
                  disabled:cursor-not-allowed
                "
              >
                {submitting
                  ? "Submitting..."
                  : "Send Message"}
              </button>

            </form>

          </div>

        </div>

      </section>

      {/* =================================================
          GOOGLE MAP
      ================================================= */}

      <section className="pb-24 bg-white">

        <div className="container-custom">

          <div
            className="
              rounded-[40px]
              overflow-hidden
              border
              border-slate-100
              card-shadow
            "
          >

            <iframe
              src={`https://maps.google.com/maps?q=${mapAddress}&z=13&output=embed`}
              width="100%"
              height="500"
              loading="lazy"
              className="border-0 w-full"
            />

          </div>

        </div>

      </section>

      {/* =================================================
          CTA
      ================================================= */}

      <CTASection />

    </>
  );
}