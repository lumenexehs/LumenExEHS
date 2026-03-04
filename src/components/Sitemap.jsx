import { useEffect } from "react";

const generateSitemap = () => {
  const baseUrl = "https://lumenexehs.ca";
  const pages = [
    { path: "/", priority: "1.0", changefreq: "weekly" },
    { path: "/about", priority: "0.8", changefreq: "monthly" },
    { path: "/services", priority: "0.9", changefreq: "monthly" },
    { path: "/sector/education", priority: "0.7", changefreq: "monthly" },
    { path: "/sector/manufacturing", priority: "0.7", changefreq: "monthly" },
    { path: "/sector/public-sector", priority: "0.7", changefreq: "monthly" },
    { path: "/sector/healthcare", priority: "0.7", changefreq: "monthly" },
    { path: "/sector/construction", priority: "0.7", changefreq: "monthly" },
    { path: "/sector/residential", priority: "0.7", changefreq: "monthly" },
    { path: "/knowledge-hub", priority: "0.8", changefreq: "weekly" },
    { path: "/careers", priority: "0.7", changefreq: "monthly" },
    { path: "/contact", priority: "0.8", changefreq: "never" },
    { path: "/client-portal", priority: "0.5", changefreq: "never" },
    { path: "/privacy-policy", priority: "0.3", changefreq: "yearly" },
    { path: "/terms-and-conditions", priority: "0.3", changefreq: "yearly" }
  ];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  pages.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${page.path}</loc>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
};

export default function Sitemap() {
  useEffect(() => {
    // Store sitemap for reference - can be accessed via /sitemap.xml
    const sitemap = generateSitemap();
    console.log("Sitemap generated. Submit to Google Search Console: https://search.google.com/search-console");
  }, []);

  return null;
}