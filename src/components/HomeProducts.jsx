import Link from "next/link";
import { ArrowRight, Microscope } from "lucide-react";

import SectionTitle from "./SectionTitle";
import { fetchFullCatalog } from "@/lib/data-fetcher-server";

/* ================= SLUG ================= */

const makeSlug = (text = "") =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

/* ================= HOME PRODUCTS ================= */

export default async function HomeProducts({
  city = "",
  district = "",
}) {
  let products = [];

  try {
    const allProducts = await fetchFullCatalog();

    console.log(
      "HomeProducts - Total products:",
      Array.isArray(allProducts)
        ? allProducts.length
        : 0
    );

    /*
     * Same catalog used by Items page.
     * Only published products.
     * First 3 are displayed on homepage.
     */
    products = (
      Array.isArray(allProducts)
        ? allProducts
        : []
    )
      .filter(
        (product) =>
          product &&
          product.isPublished !== false
      )
      .slice(0, 3);

    console.log(
      "HomeProducts - Showing:",
      products.length
    );
  } catch (error) {
    console.error(
      "HomeProducts fetch error:",
      error
    );

    products = [];
  }

  /* ================= PRODUCT DETAIL URL ================= */

  const getDetailUrl = (product) => {
    const productSlug =
      product?.slug ||
      product?.productSlug ||
      makeSlug(
        product?.title ||
        product?.name ||
        product?.productName ||
        "product"
      );

    if (district) {
      return `/${district}/items/${productSlug}`;
    }

    if (city) {
      const citySlug = city
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");

      return `/${citySlug}/items/${productSlug}`;
    }

    return `/products/${productSlug}`;
  };

  /* ================= ALL PRODUCTS URL ================= */

  const getProductsUrl = () => {
    if (district) {
      return `/${district}/items`;
    }

    if (city) {
      const citySlug = city
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");

      return `/${citySlug}/items`;
    }

    return "/products";
  };

  return (
    <section className="section-padding bg-slate-50">
      <div className="container-custom">

        {/* ================= SECTION HEADER ================= */}

        <SectionTitle
          badge="Featured Products"
          title={
            city
              ? `Premium Biomedical Equipment in ${city}`
              : "Premium Biomedical Equipment & Systems"
          }
          description="Explore our top-of-the-line diagnostic instruments, analyzers, and medical support equipment certified for reliability."
          center
        />

        {/* ================= PRODUCTS ================= */}

        {products.length > 0 ? (
          <div
            className="
              grid
              lg:grid-cols-3
              md:grid-cols-2
              gap-8
              mt-16
            "
          >
            {products.map((product, index) => {
              const productId =
                product?.id ||
                product?.uid ||
                product?.productId ||
                product?.slug ||
                `product-${index}`;

              /*
               * No onError here.
               * Server Components cannot use event handlers.
               */
              const image =
                product?.images?.[0] ||
                product?.image ||
                product?.imageUrl ||
                "/placeholder.jpg";

              const title =
                product?.title ||
                product?.name ||
                product?.productName ||
                "Biomedical Product";

              const description =
                product?.description ||
                product?.desc ||
                "Premium biomedical equipment designed for laboratories, hospitals and diagnostic centres.";

              const category =
                product?.category ||
                "Biomedical";

              return (
                <div
                  key={productId}
                  className="
                    group
                    bg-white
                    rounded-[30px]
                    border
                    border-slate-200
                    p-7
                    transition-all
                    duration-300
                    hover:border-red-200
                    hover:shadow-2xl
                    hover:shadow-red-900/5
                    flex
                    flex-col
                    justify-between
                  "
                >

                  {/* ================= PRODUCT CONTENT ================= */}

                  <div>

                    {/* Image */}

                    <div
                      className="
                        relative
                        h-[210px]
                        rounded-[24px]
                        overflow-hidden
                        bg-slate-50
                        mb-6
                        flex
                        items-center
                        justify-center
                        border
                        border-slate-100
                      "
                    >

                      <img
                        src={image}
                        alt={title}
                        loading="lazy"
                        decoding="async"
                        className="
                          w-full
                          h-full
                          object-contain
                          p-5
                          transition-transform
                          duration-500
                          group-hover:scale-105
                        "
                      />

                      {/* Category */}

                      <div
                        className="
                          absolute
                          top-4
                          left-4
                          max-w-[75%]
                          truncate
                          rounded-full
                          bg-[#E52428]
                          px-3
                          py-1
                          text-[11px]
                          font-semibold
                          text-white
                          shadow-md
                        "
                      >
                        {category}
                      </div>

                    </div>

                    {/* Brand */}

                    <span
                      className="
                        text-xs
                        uppercase
                        tracking-wider
                        text-slate-400
                        font-semibold
                      "
                    >
                      Brand:{" "}
                      {product?.brand || "N/A"}
                    </span>

                    {/* Title */}

                    <h3
                      className="
                        text-xl
                        font-bold
                        text-slate-900
                        mt-2
                        mb-3
                        line-clamp-2
                        transition-colors
                        duration-300
                        group-hover:text-[#E52428]
                      "
                    >
                      {title}
                    </h3>

                    {/* Description */}

                    <p
                      className="
                        text-slate-600
                        text-sm
                        leading-relaxed
                        mb-6
                        line-clamp-3
                      "
                    >
                      {description}
                    </p>

                  </div>

                  {/* ================= PRODUCT DETAILS ================= */}

                  <div
                    className="
                      space-y-3
                      pt-4
                      border-t
                      border-slate-100
                    "
                  >

                    <div className="grid grid-cols-2 gap-3">

                      {/* Model */}

                      <div
                        className="
                          bg-slate-50
                          rounded-xl
                          p-3
                          text-center
                        "
                      >
                        <p
                          className="
                            text-[10px]
                            uppercase
                            tracking-wide
                            text-slate-400
                          "
                        >
                          Model
                        </p>

                        <p
                          className="
                            font-semibold
                            text-xs
                            text-slate-700
                            mt-1
                            truncate
                          "
                        >
                          {product?.model || "N/A"}
                        </p>
                      </div>

                      {/* Instrument */}

                      <div
                        className="
                          bg-slate-50
                          rounded-xl
                          p-3
                          text-center
                        "
                      >
                        <p
                          className="
                            text-[10px]
                            uppercase
                            tracking-wide
                            text-slate-400
                          "
                        >
                          Instrument
                        </p>

                        <p
                          className="
                            font-semibold
                            text-xs
                            text-slate-700
                            mt-1
                            truncate
                          "
                        >
                          {product?.instrument ||
                            "N/A"}
                        </p>
                      </div>

                    </div>

                    {/* ================= GET QUOTE ================= */}

                    <Link
                      href={getDetailUrl(product)}
                      className="
                        group/btn
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-2xl
                        bg-[#E52428]
                        px-5
                        py-3.5
                        font-semibold
                        !text-white
                        shadow-md
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:bg-[#C91D21]
                        hover:!text-white
                        hover:shadow-lg
                      "
                    >
                      Get Quote

                      <ArrowRight
                        size={16}
                        className="
                          !text-white
                          transition-transform
                          duration-300
                          group-hover/btn:translate-x-1
                        "
                      />
                    </Link>

                  </div>

                </div>
              );
            })}
          </div>
        ) : (

          /* ================= EMPTY STATE ================= */

          <div
            className="
              mt-16
              rounded-[30px]
              border
              border-slate-200
              bg-white
              py-16
              text-center
              shadow-sm
            "
          >

            <div
              className="
                mx-auto
                mb-5
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-red-50
                text-[#E52428]
              "
            >
              <Microscope size={38} />
            </div>

            <h3
              className="
                text-xl
                font-bold
                text-slate-900
              "
            >
              No Products Available
            </h3>

            <p
              className="
                mt-2
                text-slate-500
              "
            >
              Products will appear here once they are published.
            </p>

          </div>
        )}

        {/* ================= VIEW ALL ================= */}

        <div className="flex justify-center mt-12">

          <Link
            href={getProductsUrl()}
            className="
              inline-flex
              items-center
              gap-2
              rounded-2xl
              border-2
              border-slate-900
              px-7
              py-3.5
              font-bold
              text-slate-900
              transition-all
              duration-300
              hover:bg-slate-900
              hover:!text-white
            "
          >
            View All Products

            <ArrowRight size={18} />

          </Link>

        </div>

      </div>
    </section>
  );
}