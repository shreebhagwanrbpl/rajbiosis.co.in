"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Microscope, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import SectionTitle from "./SectionTitle";

const makeSlug = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

export default function HomeProducts({ city = "", district = "" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categorySnap = await getDocs(
          collection(
            db,
            "websites",
            "centralbiomedicals",
            "pages",
            "categoryproducts",
            "categories"
          )
        );

        const allProducts = [];

        categorySnap.forEach((categoryDoc) => {
          const data = categoryDoc.data();
          const categoryProducts = (data.products || [])
            .filter((p) => p.isPublished !== false)
            .map((item, index) => ({
              ...item,
              uid: `${categoryDoc.id}-${index}`,
              category: data.category || categoryDoc.id,
              slug: item.slug || makeSlug(item.title),
            }));

          allProducts.push(...categoryProducts);
        });

        const oldSnap = await getDoc(
          doc(db, "websites", "centralbiomedicals", "pages", "products")
        );

        if (oldSnap.exists()) {
          const oldProducts = (oldSnap.data().products || [])
            .filter((p) => p.isPublished !== false)
            .map((item, index) => ({
              ...item,
              uid: `other-${index}`,
              category: "Other Products",
              slug: item.slug || makeSlug(item.title),
            }));

          allProducts.push(...oldProducts);
        }

        // Keep first 3 products
        setProducts(allProducts.slice(0, 3));
      } catch (err) {
        console.error("Error fetching homepage products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="section-padding bg-slate-50">
      <div className="container-custom">
        {/* Section Header */}
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

        {loading ? (
          /* Loading Skeleton State */
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-16">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white rounded-[30px] border border-slate-200 p-8 shadow-sm animate-pulse"
              >
                <div className="h-[200px] bg-slate-100 rounded-2xl mb-6"></div>
                <div className="h-6 bg-slate-200 rounded w-1/3 mb-4"></div>
                <div className="h-8 bg-slate-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6 mb-6"></div>
                <div className="h-12 bg-slate-200 rounded-xl w-full"></div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          /* Products Grid */
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-16">
            {products.map((product, index) => {
              const detailUrl = district
                ? `/${district}/items/${product.slug}`
                : `/items/${product.slug}`;

              return (
                <motion.div
                  key={product.uid}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="group bg-white rounded-[30px] border border-slate-200/80 p-8 hover:border-red-500/40 hover:shadow-2xl hover:shadow-red-500/5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Image Area */}
                    <div className="relative h-[200px] rounded-2xl overflow-hidden bg-slate-100/60 mb-6 flex items-center justify-center border border-slate-100">
                      {!loadedImages[product.uid] && (
                        <div className="absolute inset-0 bg-slate-200 animate-pulse" />
                      )}
                      <img
                        src={product.images?.[0] || product.image || "/placeholder.jpg"}
                        alt={product.title}
                        onLoad={() =>
                          setLoadedImages((prev) => ({
                            ...prev,
                            [product.uid]: true,
                          }))
                        }
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.jpg";
                        }}
                        className={`w-full h-full object-contain p-4 transition-all duration-500 group-hover:scale-105 ${
                          loadedImages[product.uid] ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                        {product.category}
                      </div>
                    </div>

                    {/* Metadata & Title */}
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                      Brand: {product.brand || "N/A"}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-2 mb-3 group-hover:text-red-600 transition-colors duration-300">
                      {product.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                      {product.description ||
                        product.desc ||
                        "Premium biomedical equipment designed for laboratories, hospitals and diagnostic centres."}
                    </p>
                  </div>

                  {/* Buttons Section */}
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-50 rounded-xl p-2.5 text-center">
                        <p className="text-[10px] uppercase text-slate-400">Model</p>
                        <p className="font-semibold text-xs text-slate-700 mt-0.5 truncate">
                          {product.model || "N/A"}
                        </p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-2.5 text-center">
                        <p className="text-[10px] uppercase text-slate-400">Instrument</p>
                        <p className="font-semibold text-xs text-slate-700 mt-0.5 truncate">
                          {product.instrument || "N/A"}
                        </p>
                      </div>
                    </div>

                    <Link href={detailUrl} className="block mt-4">
                      <button className="w-full bg-slate-950 text-white hover:bg-red-600 px-5 py-3.5 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-md hover:shadow-lg">
                        Get Quote
                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <Microscope className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="text-slate-500 font-medium">No products found.</p>
          </div>
        )}

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <Link
            href={district ? `/${district}/items` : "/items"}
            className="inline-flex items-center gap-2 px-6 py-3.5 border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white hover:border-slate-900 rounded-2xl font-bold transition-all duration-300"
          >
            View All Products
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
