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
    vitals: {
      lcpScore: number;
      clsScore: number;
    };
    dns: {
      hasA: boolean;
      aRecords: string[];
      hasAAAA: boolean;
      hasMx: boolean;
      mxRecords: string[];
      hasSpf: boolean;
      hasDmarc: boolean;
      hasCaa: boolean;
    } | null;
    privacy: {
      googleFontsExternal: boolean;
      trackingScripts: string[];
      cookieBanner: boolean;
    };
    accessibility: {
      linksWithoutText: number;
      buttonsWithoutText: number;
      inputsWithoutLabel: number;
      iframesWithoutTitle: number;
      headingSkipsCount: number;
      viewportBlocksZoom: boolean;
      skipLink: boolean;
    };
    modernWeb: {
      hasManifest: boolean;
      hasThemeColor: boolean;
      hasAppleTouchIcon: boolean;
      hasOgImage: boolean;
    };
    securityHeaders: {
      available: boolean;
      hsts: boolean;
      csp: boolean;
      xFrameOptions: boolean;
      xContentTypeOptions: boolean;
      referrerPolicy: boolean;
      permissionsPolicy: boolean;
      poweredBy: string | null;
      server: string | null;
    };
    securityTxt: boolean;
    llmsTxt: boolean;
  };
}

export const CATEGORY_LABELS: Record<Category, string> = {
  security: "Securitate",
  seo: "SEO",
  performance: "Performanță",
  infrastructure: "Infrastructură",
  ux: "UX & Accesibilitate",
};
