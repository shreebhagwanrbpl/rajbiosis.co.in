/**
 * Dynamic Company & Website ID Configuration with Domain Normalization and Bulletproof Visibility Predicate.
 */

// Known company mappings
export const COMPANY_MAPPINGS = {
  rajbiosis: {
    name: "RajBiosis",
    defaultWebsiteId: "rajbiosiscoin",
  },
  human: {
    name: "Human Biomedical",
    defaultWebsiteId: "humanbiomedicalcom",
  },
  global: {
    name: "Global Biomedical",
    defaultWebsiteId: "globalbiomedicalcoin",
  },
};

/**
 * Normalizes any string ID or domain by removing dots (.), hyphens (-), underscores (_), and spaces,
 * and converting to lowercase.
 * Examples: "rajbiosis.co.in" -> "rajbiosiscoin", "rajbiosis-co-in" -> "rajbiosiscoin", "humanbiomedical.com" -> "humanbiomedicalcom"
 */
export function normalizeId(str = "") {
  if (!str) return "";
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, "");
}

/**
 * Dynamically detects the current Company ID ("rajbiosis" | "human" | "global").
 */
export function getCompanyId() {
  if (process.env.NEXT_PUBLIC_COMPANY_ID) {
    return process.env.NEXT_PUBLIC_COMPANY_ID.toLowerCase().trim();
  }
  if (process.env.COMPANY_ID) {
    return process.env.COMPANY_ID.toLowerCase().trim();
  }

  // Check website ID or package name or domain indicators
  const websiteHint = (
    process.env.NEXT_PUBLIC_WEBSITE_ID ||
    process.env.WEBSITE_ID ||
    "rajbiosiscoin"
  ).toLowerCase();

  if (websiteHint.includes("human")) return "human";
  if (websiteHint.includes("global")) return "global";
  return "rajbiosis";
}

/**
 * Dynamically detects the current Website ID (e.g., "rajbiosiscoin" / "rajbiosis.co.in").
 */
export function getWebsiteId() {
  if (process.env.NEXT_PUBLIC_WEBSITE_ID) {
    return process.env.NEXT_PUBLIC_WEBSITE_ID.trim();
  }
  if (process.env.WEBSITE_ID) {
    return process.env.WEBSITE_ID.trim();
  }
  return "rajbiosiscoin";
}

/**
 * Bulletproof visibility predicate for categories, subcategories, and products.
 *
 * Rules:
 * 1. isPublished === false -> Hide (false)
 * 2. status === 'inactive' -> Hide (false)
 * 3. websiteIds is empty array [] (0 websites selected) -> Hide (false)
 * 4. websiteIds contains "all" (or normalized "all") -> Show (true)
 * 5. Normalized match: matches if normalized website ID matches any normalized ID in item.websiteIds.
 *
 * @param {Object} item - Category, Subcategory or Product object
 * @param {string} [targetWebsiteId] - Target website ID (defaults to current detected website)
 * @returns {boolean}
 */
export function isItemVisibleForWebsite(item, targetWebsiteId = getWebsiteId()) {
  if (!item || typeof item !== "object") return false;

  // 1. Publish status check
  if (item.isPublished === false || item.status === "inactive" || item.status === "hidden") {
    return false;
  }

  // 2. websiteIds existence & emptiness check
  const websiteIds = Array.isArray(item.websiteIds) ? item.websiteIds : [];
  if (websiteIds.length === 0) {
    // 0 websites selected -> Hide
    return false;
  }

  const normTarget = normalizeId(targetWebsiteId);
  const normalizedList = websiteIds.map(normalizeId);

  // 3. "all" check
  if (normalizedList.includes("all")) {
    return true;
  }

  // 4. Normalized match check
  return normalizedList.includes(normTarget);
}
