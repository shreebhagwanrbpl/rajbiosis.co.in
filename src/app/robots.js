export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/dashboard",
        "/api",
        "/search",
        "/*?", // Disallow crawl budget waste on URL query parameters
      ],
    },
    sitemap: "https://rajbiosis.co.in/sitemap.xml",
  };
}