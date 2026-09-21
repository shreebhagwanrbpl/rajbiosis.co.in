import { fetchFullCatalog as fetchFullCatalogRaw, fetchCategoriesTree as fetchCategoriesTreeRaw } from "./data-fetcher";

/**
 * Server-side Master Catalog fetcher.
 * Fetches directly from Master Catalog with zero-stale cache.
 */
export async function fetchFullCatalog(options = {}) {
  const start = performance.now();
  const products = await fetchFullCatalogRaw(options);
  const end = performance.now();
  console.log(`[data-fetcher-server] fetchFullCatalog returned ${products.length} products in ${(end - start).toFixed(2)}ms`);
  return products;
}

export async function fetchCategoriesTree(options = {}) {
  return fetchCategoriesTreeRaw(options);
}
