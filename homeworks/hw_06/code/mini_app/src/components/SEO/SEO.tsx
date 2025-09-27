import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  canonicalUrl?: string;
}

const SEO = ({ title, description, keywords, author }: SEOProps) => {
  useEffect(() => {
    // Title
    if (title) {
      document.title = title;
    }

    // Meta description
    updateMetaTag("description", description);

    // Meta keywords
    updateMetaTag("keywords", keywords);

    // Meta author
    updateMetaTag("author", author);
  }, [title, description, keywords, author]);

  const updateMetaTag = (name: string, content?: string) => {
    if (!content) return;

    let metaTag = document.querySelector(`meta[name="${name}"]`);
    if (!metaTag) {
      metaTag = document.createElement("meta");
      metaTag.setAttribute("name", name);
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute("content", content);
  };

  return null;
};

export default SEO;
