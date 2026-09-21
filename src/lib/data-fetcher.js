import { db } from "./firebase.js";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import {
  getCompanyId,
  getWebsiteId,
  isItemVisibleForWebsite,
  normalizeId,
} from "./catalog-config.js";

// Simple in-memory cache for Firestore documents (short-lived or for static pages)
const docCache = {};

export const makeSlug = (text = "") =>
  String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

/**
 * Fetch a single document and cache its promise/data.
 */
export async function fetchDocCached(path) {
  if (docCache[path]) {
    return docCache[path];
  }
  if (!docCache[path + "_promise"]) {
    docCache[path + "_promise"] = (async () => {
      try {
        const parts = path.split("/");
        const docRef = doc(db, ...parts);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const data = snap.data();
          docCache[path] = data;
          return data;
        }
        return null;
      } catch (err) {
        console.error(`Error fetching doc at ${path}:`, err);
        delete docCache[path + "_promise"];
        throw err;
      }
    })();
  }
  return docCache[path + "_promise"];
}

/**
 * Normalizes a product object from Firestore into standard format.
 */
function normalizeProduct(p, catId, catName, subId, subName, fallbackIdx = 0, companyId = "rajbiosis") {
  const title = p.title || p.name || "Untitled Product";
  const slug = p.slug || makeSlug(title);
  const images = Array.isArray(p.images) && p.images.length > 0
    ? p.images
    : (p.image ? [p.image] : (p.originalImages || []));
  const primaryImage = images[0] || p.image || "";

  // Authoritative clean category and subcategory names from Master Catalog
  const cleanCategory = catName || p.category || catId;
  const cleanSubCategory = subName || p.subCategory || subId;

  return {
    ...p,
    id: p.id || p.productId || `${catId}-${subId}-${fallbackIdx}`,
    productId: p.productId || p.id || `${catId}-${subId}-${fallbackIdx}`,
    uid: p.uid || p.id || p.productId || `${catId}-${subId}-${fallbackIdx}`,
    title,
    name: title,
    slug,
    price: p.price || "",
    desc: p.desc || p.description || "",
    description: p.description || p.desc || "",
    category: cleanCategory,
    categoryId: catId || p.categoryId,
    subCategory: cleanSubCategory,
    subcategoryId: subId || p.subcategoryId,
    companyId: p.companyId || companyId,
    images,
    image: primaryImage,
    video: p.video || "",
    pdf: p.pdf || "",
    brand: p.brand || "",
    model: p.model || "",
    capacity: p.capacity || "",
    throughput: p.throughput || "",
    instrument: p.instrument || "",
    usage: p.usage || "",
    parameters: p.parameters || "",
    automation: p.automation || "",
    availability: p.availability || "",
    size: p.size || "",
    isPublished: p.isPublished !== false,
    websiteIds: Array.isArray(p.websiteIds) ? p.websiteIds : [],
  };
}

/**
 * Fetches the entire Master Catalog from `companies/{companyId}/categories/{categoryId}/subcategories/{subcategoryId}`
 * with bulletproof hierarchical cascading visibility logic.
 *
 * Cascading Visibility:
 * 1. If Category is hidden -> Category and ALL its subcategories/products are excluded.
 * 2. If Subcategory is hidden -> Subcategory and ALL its products are excluded.
 * 3. If Product is hidden (isPublished === false or websiteIds not matching) -> Product is excluded.
 *
 * @param {Object} [options]
 * @param {string} [options.companyId] - Target company ID
 * @param {string} [options.websiteId] - Target website ID
 * @returns {Promise<Array>} List of visible products
 */
export async function fetchFullCatalog({ companyId, websiteId } = {}) {
  const targetCompany = companyId || getCompanyId();
  const targetWebsite = websiteId || getWebsiteId();
  const startTime = performance.now();

  try {
    const allProducts = [];

    // 1. Fetch categories from Master Catalog: companies/{companyId}/categories
    const categorySnap = await getDocs(
      collection(db, "companies", targetCompany, "categories")
    );

    // Filter visible categories
    const visibleCategoryDocs = categorySnap.docs.filter((catDoc) => {
      const catData = { id: catDoc.id, ...catDoc.data() };
      return isItemVisibleForWebsite(catData, targetWebsite);
    });

    // 2. Fetch all subcategories concurrently with Promise.all
    await Promise.all(
      visibleCategoryDocs.map(async (categoryDoc) => {
        const catData = categoryDoc.data();
        const categoryId = categoryDoc.id;
        const categoryName = catData.name || catData.category || categoryId;

        try {
          const subcategoriesSnap = await getDocs(
            collection(
              db,
              "companies",
              targetCompany,
              "categories",
              categoryId,
              "subcategories"
            )
          );

          subcategoriesSnap.docs.forEach((subDoc) => {
            const subData = { id: subDoc.id, ...subDoc.data() };

            // Check subcategory visibility
            if (!isItemVisibleForWebsite(subData, targetWebsite)) {
              return; // Subcategory hidden -> skip all its products
            }

            const subcategoryId = subDoc.id;
            const subCategoryName = subData.name || subData.subCategory || subcategoryId;
            const rawProducts = Array.isArray(subData.products) ? subData.products : [];

            // Filter and normalize visible products
            rawProducts.forEach((prod, pIdx) => {
              if (isItemVisibleForWebsite(prod, targetWebsite)) {
                allProducts.push(
                  normalizeProduct(
                    prod,
                    categoryId,
                    categoryName,
                    subcategoryId,
                    subCategoryName,
                    pIdx,
                    targetCompany
                  )
                );
              }
            });
          });
        } catch (subErr) {
          console.error(`Error fetching subcategories for category ${categoryId}:`, subErr);
        }

        // Check any direct products attached to category doc
        if (Array.isArray(catData.products)) {
          catData.products.forEach((prod, pIdx) => {
            if (isItemVisibleForWebsite(prod, targetWebsite)) {
              allProducts.push(
                normalizeProduct(
                  prod,
                  categoryId,
                  categoryName,
                  categoryId,
                  categoryName,
                  `direct-${pIdx}`,
                  targetCompany
                )
              );
            }
          });
        }
      })
    );

    // 3. Also check direct normal products collection at companies/{companyId}/products
    try {
      const directProdsSnap = await getDocs(
        collection(db, "companies", targetCompany, "products")
      );
      directProdsSnap.docs.forEach((pDoc, pIdx) => {
        const prodData = { id: pDoc.id, ...pDoc.data() };
        if (isItemVisibleForWebsite(prodData, targetWebsite)) {
          allProducts.push(
            normalizeProduct(
              prodData,
              prodData.categoryId || "normal",
              prodData.category || "General Products",
              prodData.subcategoryId || "general",
              prodData.subCategory || "General Products",
              `norm-${pIdx}`,
              targetCompany
            )
          );
        }
      });
    } catch (dpErr) {
      console.error("Error fetching direct company products:", dpErr);
    }

    const duration = performance.now() - startTime;
    console.log(
      `[data-fetcher] Master Catalog fetch for company="${targetCompany}", website="${targetWebsite}" returned ${allProducts.length} visible products in ${duration.toFixed(2)}ms`
    );

    return allProducts;
  } catch (err) {
    console.error("Error fetching full catalog from Master Catalog:", err);
    throw err;
  }
}

/**
 * Fetches the structured Category & Subcategory tree from Master Catalog with visibility filtering.
 */
export async function fetchCategoriesTree({ companyId, websiteId } = {}) {
  const targetCompany = companyId || getCompanyId();
  const targetWebsite = websiteId || getWebsiteId();

  try {
    const categorySnap = await getDocs(
      collection(db, "companies", targetCompany, "categories")
    );

    const visibleCategories = [];

    await Promise.all(
      categorySnap.docs.map(async (catDoc) => {
        const catData = { id: catDoc.id, ...catDoc.data() };
        if (!isItemVisibleForWebsite(catData, targetWebsite)) {
          return;
        }

        const categoryId = catDoc.id;
        const subcategoriesSnap = await getDocs(
          collection(
            db,
            "companies",
            targetCompany,
            "categories",
            categoryId,
            "subcategories"
          )
        );

        const visibleSubcategories = [];
        subcategoriesSnap.docs.forEach((subDoc) => {
          const subData = { id: subDoc.id, ...subDoc.data() };
          if (isItemVisibleForWebsite(subData, targetWebsite)) {
            const rawProds = Array.isArray(subData.products) ? subData.products : [];
            const visibleProds = rawProds.filter((p) => isItemVisibleForWebsite(p, targetWebsite));
            visibleSubcategories.push({
              ...subData,
              productsCount: visibleProds.length,
              products: visibleProds,
            });
          }
        });

        visibleCategories.push({
          ...catData,
          subcategories: visibleSubcategories,
          totalProductsCount: visibleSubcategories.reduce(
            (sum, s) => sum + (s.productsCount || 0),
            0
          ),
        });
      })
    );

    return visibleCategories;
  } catch (err) {
    console.error("Error fetching categories tree:", err);
    return [];
  }
}

/**
 * Helpers for cached document retrieval across pages
 */
export async function fetchHomeData() {
  return fetchDocCached("websites/rajbiosiscoin/pages/home");
}

export async function fetchContactData() {
  return fetchDocCached("websites/rajbiosiscoin/pages/contact");
}

export async function fetchServicesData() {
  return fetchDocCached("websites/rajbiosiscoin/pages/services");
}

export async function fetchDistrictData(district) {
  if (!district) return null;
  return fetchDocCached(`websites/rajbiosiscoin/districts/${district}`);
}
