import { useEffect } from "react";

export default function SEOHead({ 
  title, 
  description, 
  keywords, 
  canonicalUrl,
  ogImage,
  pageType = "website"
}) {
  useEffect(() => {
    // Update title
    document.title = title;
    
    // Update or create meta tags
    const updateMeta = (name, content) => {
      let element = document.querySelector(`meta[name="${name}"]`) || 
                   document.querySelector(`meta[property="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        const attr = name.startsWith("og:") ? "property" : "name";
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    updateMeta("description", description);
    updateMeta("keywords", keywords);
    updateMeta("og:title", title);
    updateMeta("og:description", description);
    updateMeta("og:type", pageType);
    
    if (ogImage) {
      updateMeta("og:image", ogImage);
    }
    
    if (canonicalUrl) {
      let canonical = document.querySelector("link[rel='canonical']");
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = canonicalUrl;
    }
    
    // Add robots meta
    updateMeta("robots", "index, follow");
    
    // Add language
    updateMeta("language", "English");
    
  }, [title, description, keywords, canonicalUrl, ogImage, pageType]);

  return null;
}