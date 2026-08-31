"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const makeSlug = (text = "") =>
    text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

const ProductCard = React.memo(function ProductCard({
    product,
    district,
}) {
    const pathname = usePathname();

    // Use passed district first.
    // If missing, get district from current URL.
    const pathParts =
        pathname?.split("/").filter(Boolean) || [];

    const staticRoutes = [
        "about",
        "services",
        "items",
        "contact",
    ];

    const currentDistrict =
        district ||
        (pathParts.length > 0 &&
            !staticRoutes.includes(pathParts[0])
            ? pathParts[0]
            : "");

    const productSlug =
        product.slug ||
        product.productSlug ||
        makeSlug(product.title);

    return (
        <div
            id={product.slug || productSlug}
            className="
                group
                bg-white
                rounded-[30px]
                border
                border-slate-200
                shadow-lg
                hover:shadow-2xl
                hover:border-red-100
                transition-all
                duration-300
                p-8
            "
        >
            <div
                className="
                    grid
                    grid-cols-1
                    lg:grid-cols-[240px_1fr_180px]
                    gap-5
                    lg:gap-8
                    items-center
                "
            >

                {/* ================= IMAGE ================= */}

                <div
                    className="
                        relative
                        h-[180px]
                        sm:h-[220px]
                        rounded-2xl
                        lg:rounded-3xl
                        overflow-hidden
                        bg-slate-50
                        border
                        border-slate-100
                        transition-all
                        duration-300
                        group-hover:bg-[#FFF8F8]
                    "
                >
                    <img
                        src={
                            product.images?.[0] ||
                            product.image ||
                            "/placeholder.svg"
                        }
                        alt={product.title}
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
                        onError={(e) => {
                            e.currentTarget.src =
                                "/placeholder.svg";
                        }}
                    />
                </div>

                {/* ================= CONTENT ================= */}

                <div>

                    <h3
                        className="
                            text-2xl
                            font-bold
                            text-slate-900
                            transition-colors
                            duration-300
                            group-hover:text-[#E52428]
                        "
                    >
                        {product.title}
                    </h3>

                    <p
                        className="
                            mt-4
                            text-slate-600
                            leading-8
                        "
                    >
                        {product.description ||
                            product.desc ||
                            "Premium biomedical equipment designed for laboratories, hospitals and diagnostic centres."}
                    </p>

                    {/* ================= PRODUCT INFO ================= */}

                    <div
                        className="
                            grid
                            md:grid-cols-2
                            gap-4
                            mt-6
                        "
                    >

                        {/* Brand */}

                        <div
                            className="
                                bg-slate-50
                                rounded-xl
                                p-4
                                border
                                border-transparent
                                hover:border-red-100
                                transition
                            "
                        >
                            <p
                                className="
                                    text-xs
                                    uppercase
                                    tracking-wide
                                    text-slate-400
                                "
                            >
                                Brand
                            </p>

                            <p
                                className="
                                    font-semibold
                                    mt-1
                                    text-slate-800
                                "
                            >
                                {product.brand || "N/A"}
                            </p>
                        </div>

                        {/* Model */}

                        <div
                            className="
                                bg-slate-50
                                rounded-xl
                                p-4
                                border
                                border-transparent
                                hover:border-red-100
                                transition
                            "
                        >
                            <p
                                className="
                                    text-xs
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
                                    mt-1
                                    text-slate-800
                                "
                            >
                                {product.model || "N/A"}
                            </p>
                        </div>

                        {/* Instrument */}

                        <div
                            className="
                                bg-slate-50
                                rounded-xl
                                p-4
                                border
                                border-transparent
                                hover:border-red-100
                                transition
                            "
                        >
                            <p
                                className="
                                    text-xs
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
                                    mt-1
                                    text-slate-800
                                "
                            >
                                {product.instrument ||
                                    "N/A"}
                            </p>
                        </div>

                        {/* Category */}

                        <div
                            className="
                                bg-slate-50
                                rounded-xl
                                p-4
                                border
                                border-transparent
                                hover:border-red-100
                                transition
                            "
                        >
                            <p
                                className="
                                    text-xs
                                    uppercase
                                    tracking-wide
                                    text-slate-400
                                "
                            >
                                Category
                            </p>

                            <p
                                className="
                                    font-semibold
                                    mt-1
                                    text-slate-800
                                "
                            >
                                {product.category ||
                                    "N/A"}
                            </p>
                        </div>

                    </div>
                </div>

                {/* ================= BUTTON ================= */}

                <div
                    className="
                        flex
                        justify-center
                        lg:justify-end
                    "
                >
                    <Link
                        href={
                            currentDistrict
                                ? `/${currentDistrict}/items/${productSlug}`
                                : `/products/${productSlug}`
                        }
                        className="
                            inline-flex
                            items-center
                            justify-center
                            rounded-xl
                            bg-[#E52428]
                            px-7
                            py-3
                            font-semibold
                            !text-white
                            shadow-md
                            transition-all
                            duration-300
                            hover:-translate-y-0.5
                            hover:bg-[#C91D21]
                            hover:!text-white
                            hover:shadow-lg
                            hover:shadow-red-100
                        "
                    >
                        Get Quote
                    </Link>
                </div>

            </div>
        </div>
    );
});

export default ProductCard;