import { useEffect } from "react";

export default function SchemaMarkup({ schema }) {
  useEffect(() => {
    if (!schema) return;
    
    let scriptTag = document.querySelector("script[type='application/ld+json'][data-schema]");
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.type = "application/ld+json";
      scriptTag.setAttribute("data-schema", "true");
      document.head.appendChild(scriptTag);
    }
    
    scriptTag.textContent = JSON.stringify(schema);
    
    return () => {
      if (scriptTag && scriptTag.parentNode) {
        scriptTag.parentNode.removeChild(scriptTag);
      }
    };
  }, [schema]);

  return null;
}