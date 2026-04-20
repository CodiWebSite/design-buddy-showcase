import { useEffect } from "react";

interface SchemaProps {
  schemas: Record<string, unknown>[];
  id: string;
}

/**
 * Injects multiple JSON-LD scripts into the document head and cleans them up
 * when the component unmounts. Use one instance per page with a unique `id`.
 */
const StructuredData = ({ schemas, id }: SchemaProps) => {
  useEffect(() => {
    const nodes: HTMLScriptElement[] = schemas.map((schema, i) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.dataset.sd = `${id}-${i}`;
      s.text = JSON.stringify(schema);
      document.head.appendChild(s);
      return s;
    });
    return () => {
      nodes.forEach((n) => n.remove());
    };
  }, [schemas, id]);

  return null;
};

export default StructuredData;
