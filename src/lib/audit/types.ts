export type Severity = "critical" | "warning" | "info" | "success";
export type Category = "security" | "seo" | "performance" | "infrastructure" | "ux";

export interface Issue {
  category: Category;
  severity: Severity;
  title: string;
  description: string;
  recommendation: string;
}

export interface AuditResult {
  url: string;
  finalUrl: string;
  fetchedAt: string;
  fetchMs: number;
  htmlBytes: number;
  overallScore: number;
  categoryScores: Record<Category, number>;
  issues: Issue[];
  metadata: {
    title: string | null;
    description: string | null;
    h1Count: number;
    lang: string | null;
    canonical: string | null;
    ogTags: number;
    twitterTags: number;
    imagesTotal: number;
    imagesMissingAlt: number;
    viewport: string | null;
    favicon: boolean;
    isHttps: boolean;
    server: string | null;
    technologies: string[];
    robotsTxt: { found: boolean; hasSitemap: boolean };
    sitemapXml: { found: boolean; urlCount: number };
  };
}

export const CATEGORY_LABELS: Record<Category, string> = {
  security: "Securitate",
  seo: "SEO",
  performance: "Performanță",
  infrastructure: "Infrastructură",
  ux: "UX & Accesibilitate",
};
