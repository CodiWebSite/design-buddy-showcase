// Additional checks runnable from a parsed Document + raw HTML.
// All return arrays of issues to be merged into the main audit.

import type { Issue } from "./types";

export interface ExtraResult {
  issues: Issue[];
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
    headingSkips: string[];
    viewportBlocksZoom: boolean;
    skipLink: boolean;
  };
  modernWeb: {
    hasManifest: boolean;
    hasThemeColor: boolean;
    hasAppleTouchIcon: boolean;
    hasOgImage: boolean;
  };
}

const TRACKING_SIGNATURES: { name: string; needle: RegExp }[] = [
  { name: "Google Analytics / GTM", needle: /googletagmanager\.com|google-analytics\.com|gtag\(/i },
  { name: "Facebook Pixel", needle: /connect\.facebook\.net|fbq\(/i },
  { name: "Hotjar", needle: /static\.hotjar\.com/i },
  { name: "Microsoft Clarity", needle: /clarity\.ms/i },
  { name: "TikTok Pixel", needle: /analytics\.tiktok\.com/i },
  { name: "LinkedIn Insight", needle: /snap\.licdn\.com/i },
];

export function runExtraChecks(doc: Document, html: string, isHttps: boolean): ExtraResult {
  const issues: Issue[] = [];

  // ============ ACCESSIBILITY ============
  const links = Array.from(doc.querySelectorAll("a"));
  const linksWithoutText = links.filter((a) => {
    const text = (a.textContent || "").trim();
    const aria = a.getAttribute("aria-label")?.trim();
    const title = a.getAttribute("title")?.trim();
    const hasImg = a.querySelector("img[alt]:not([alt=''])");
    return !text && !aria && !title && !hasImg;
  }).length;

  if (linksWithoutText > 0) {
    issues.push({
      category: "ux",
      severity: linksWithoutText > 5 ? "warning" : "info",
      title: `${linksWithoutText} link-uri fără text accesibil`,
      description: "Link-urile fără text vizibil sau aria-label sunt invizibile pentru cititoarele de ecran.",
      recommendation: "Adaugă text vizibil în <a> sau atributul aria-label=\"descriere\" pentru link-urile cu icon.",
    });
  }

  const buttons = Array.from(doc.querySelectorAll("button"));
  const buttonsWithoutText = buttons.filter((b) => {
    const text = (b.textContent || "").trim();
    const aria = b.getAttribute("aria-label")?.trim();
    return !text && !aria;
  }).length;

  if (buttonsWithoutText > 0) {
    issues.push({
      category: "ux",
      severity: "warning",
      title: `${buttonsWithoutText} butoane fără text accesibil`,
      description: "Butoanele fără text sau aria-label nu pot fi înțelese de utilizatorii cu cititoare de ecran.",
      recommendation: "Adaugă text în <button> sau atributul aria-label.",
    });
  }

  // Form inputs without labels
  const inputs = Array.from(doc.querySelectorAll('input:not([type="hidden"]):not([type="submit"]):not([type="button"]), textarea, select'));
  const inputsWithoutLabel = inputs.filter((inp) => {
    const id = inp.getAttribute("id");
    const aria = inp.getAttribute("aria-label") || inp.getAttribute("aria-labelledby");
    const placeholder = inp.getAttribute("placeholder");
    const labelFor = id ? doc.querySelector(`label[for="${CSS.escape(id)}"]`) : null;
    const wrappedInLabel = inp.closest("label");
    return !labelFor && !wrappedInLabel && !aria && !placeholder;
  }).length;

  if (inputsWithoutLabel > 0) {
    issues.push({
      category: "ux",
      severity: "warning",
      title: `${inputsWithoutLabel} câmpuri de formular fără etichete`,
      description: "Inputurile fără <label> sau aria-label sunt inaccesibile și greu de completat.",
      recommendation: 'Adaugă <label for="id-input">Etichetă</label> sau aria-label pentru fiecare input.',
    });
  }

  const iframes = Array.from(doc.querySelectorAll("iframe"));
  const iframesWithoutTitle = iframes.filter((f) => !(f.getAttribute("title") || "").trim()).length;
  if (iframesWithoutTitle > 0) {
    issues.push({
      category: "ux",
      severity: "info",
      title: `${iframesWithoutTitle} iframe-uri fără atribut title`,
      description: "Iframe-urile fără title nu pot fi descrise utilizatorilor de cititoare de ecran.",
      recommendation: 'Adaugă title="Descriere conținut" pe fiecare <iframe>.',
    });
  }

  // Viewport blocks zoom
  const viewport = doc.querySelector('meta[name="viewport"]')?.getAttribute("content") || "";
  const viewportBlocksZoom = /user-scalable\s*=\s*no|maximum-scale\s*=\s*1(\b|[^.])/i.test(viewport);
  if (viewportBlocksZoom) {
    issues.push({
      category: "ux",
      severity: "warning",
      title: "Viewport-ul împiedică zoom-ul (problemă de accesibilitate)",
      description: "Blocarea zoom-ului încalcă WCAG — utilizatorii cu deficiențe de vedere au nevoie să mărească pagina.",
      recommendation: 'Schimbă în <meta name="viewport" content="width=device-width, initial-scale=1">.',
    });
  }

  // Heading hierarchy skips (e.g. H2 → H4)
  const headings = Array.from(doc.querySelectorAll("h1,h2,h3,h4,h5,h6"));
  const levels = headings.map((h) => parseInt(h.tagName.substring(1), 10));
  const headingSkips: string[] = [];
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] - levels[i - 1] > 1) {
      headingSkips.push(`H${levels[i - 1]} → H${levels[i]}`);
    }
  }
  if (headingSkips.length > 0) {
    issues.push({
      category: "ux",
      severity: "info",
      title: `Ierarhia headingurilor sare nivele (${headingSkips.length} cazuri)`,
      description: `Exemple: ${headingSkips.slice(0, 3).join(", ")}. Ordinea logică e H1→H2→H3 fără salturi.`,
      recommendation: "Reorganizează headingurile astfel încât nivelurile să fie consecutive.",
    });
  }

  // Skip-to-content link
  const skipLink = links.some((a) => /^#(content|main|skip)/i.test(a.getAttribute("href") || "") || /sari la|skip to/i.test(a.textContent || ""));

  // ============ PRIVACY / GDPR ============
  const googleFontsExternal = !!doc.querySelector('link[href*="fonts.googleapis.com"], link[href*="fonts.gstatic.com"]');
  if (googleFontsExternal) {
    issues.push({
      category: "security",
      severity: "info",
      title: "Google Fonts încărcat de pe CDN extern (risc GDPR)",
      description: "Încărcarea fonturilor de pe googleapis.com transmite IP-ul vizitatorului către Google — instanțe judecătorești europene au sancționat această practică.",
      recommendation: "Self-hostează fonturile (descarcă woff2 și servește-le de pe domeniul tău) sau folosește Bunny Fonts.",
    });
  }

  const trackingScripts: string[] = [];
  for (const t of TRACKING_SIGNATURES) {
    if (t.needle.test(html)) trackingScripts.push(t.name);
  }

  // Cookie banner heuristic — common selectors / texts
  const cookieBanner =
    /cookiebot|cookie-consent|onetrust|cookielaw|cookie-banner|cookiehub|cookieconsent/i.test(html) ||
    /accept(ă|a) cookie|acceptare cookie|gestionare cookie/i.test(doc.body?.textContent || "");

  if (trackingScripts.length > 0 && !cookieBanner) {
    issues.push({
      category: "security",
      severity: "warning",
      title: `Tracking detectat fără banner de consimțământ vizibil: ${trackingScripts.join(", ")}`,
      description: "GDPR cere consimțământ explicit ÎNAINTE de încărcarea scripturilor de tracking. Lipsa banner-ului expune la sancțiuni.",
      recommendation: "Implementează un Consent Management Platform (Cookiebot, OneTrust, sau soluție GDPR self-hosted) și încarcă scripturile doar după accept.",
    });
  }

  // ============ MIXED-CONTENT FORMS (extended) ============
  const formsWithoutHttps = Array.from(doc.querySelectorAll("form")).filter((f) => {
    const action = f.getAttribute("action") || "";
    if (/^http:\/\//i.test(action)) return true;
    return !isHttps && !action; // form posts to current page = HTTP
  });
  const formsHasSensitive = formsWithoutHttps.some(
    (f) => f.querySelector('input[type="password"], input[type="email"], input[name*="card"]'),
  );
  if (formsHasSensitive && !issues.some((i) => i.title.includes("HTTP necriptat"))) {
    issues.push({
      category: "security",
      severity: "critical",
      title: "Formular cu date sensibile trimise nesigur",
      description: "Un formular cu parolă/email/card postează prin HTTP — datele pot fi furate.",
      recommendation: "Forțează HTTPS pe toate paginile cu formulare și schimbă action în https://.",
    });
  }

  // ============ TARGET=_BLANK FĂRĂ rel=noopener ============
  const externalTabLinks = links.filter((a) => {
    if (a.getAttribute("target") !== "_blank") return false;
    const rel = (a.getAttribute("rel") || "").toLowerCase();
    return !/noopener|noreferrer/.test(rel);
  }).length;
  if (externalTabLinks > 0) {
    issues.push({
      category: "security",
      severity: "info",
      title: `${externalTabLinks} link-uri target="_blank" fără rel="noopener"`,
      description: "Fără noopener, pagina deschisă poate manipula tab-ul original (tabnabbing) și scade performanța.",
      recommendation: 'Adaugă rel="noopener noreferrer" pe toate link-urile cu target="_blank".',
    });
  }

  // ============ SUBRESOURCE INTEGRITY (SRI) ============
  const externalScriptsWithoutSri = Array.from(doc.querySelectorAll("script[src]")).filter((s) => {
    const src = s.getAttribute("src") || "";
    return /^https?:\/\//i.test(src) && !s.getAttribute("integrity");
  }).length;
  if (externalScriptsWithoutSri > 3) {
    issues.push({
      category: "security",
      severity: "info",
      title: `${externalScriptsWithoutSri} scripturi externe fără SRI (Subresource Integrity)`,
      description: "Fără SRI, dacă un CDN extern e compromis, codul malițios e executat în pagină fără avertisment.",
      recommendation: 'Adaugă integrity="sha384-..." crossorigin="anonymous" pe scripturile externe critice.',
    });
  }

  // ============ MODERN WEB / PWA ============
  const hasManifest = !!doc.querySelector('link[rel="manifest"]');
  const hasThemeColor = !!doc.querySelector('meta[name="theme-color"]');
  const hasAppleTouchIcon = !!doc.querySelector('link[rel*="apple-touch-icon"]');
  const hasOgImage = !!doc.querySelector('meta[property="og:image"]');

  if (!hasThemeColor) {
    issues.push({
      category: "ux",
      severity: "info",
      title: "Lipsește meta theme-color",
      description: "theme-color colorează bara browser-ului pe mobil în culoarea brandului tău.",
      recommendation: 'Adaugă <meta name="theme-color" content="#0F172A"> în <head>.',
    });
  }

  if (!hasAppleTouchIcon) {
    issues.push({
      category: "ux",
      severity: "info",
      title: "Lipsește apple-touch-icon",
      description: "Fără acest icon, când utilizatorii iOS adaugă site-ul pe Home Screen apare un screenshot generic.",
      recommendation: 'Adaugă <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">.',
    });
  }

  if (!hasOgImage) {
    issues.push({
      category: "seo",
      severity: "warning",
      title: "Lipsește og:image",
      description: "Fără og:image, când cineva distribuie link-ul pe Facebook/LinkedIn/WhatsApp apare fără preview vizual — CTR mult mai mic.",
      recommendation: 'Adaugă <meta property="og:image" content="https://domeniu.ro/og.jpg"> (1200×630px ideal).',
    });
  }

  // ============ HREFLANG / INTERNATIONAL SEO ============
  // Just informational — flag if multilingual signals exist but no hreflang
  const langSwitchers = links.filter((a) => /\/(en|de|fr|es|it|ru|hu)(\/|$)/i.test(a.getAttribute("href") || "")).length;
  const hasHreflang = !!doc.querySelector('link[rel="alternate"][hreflang]');
  if (langSwitchers > 2 && !hasHreflang) {
    issues.push({
      category: "seo",
      severity: "info",
      title: "Site multilingv fără tag-uri hreflang",
      description: "Fără hreflang, Google poate afișa versiunea greșită a paginii utilizatorilor din alte țări.",
      recommendation: 'Adaugă <link rel="alternate" hreflang="en" href="..."> pentru fiecare limbă.',
    });
  }

  // ============ DEPRECATED / RISKY TECH ============
  if (/jquery-1\.|jquery-2\./i.test(html)) {
    issues.push({
      category: "security",
      severity: "warning",
      title: "Versiune jQuery învechită detectată (1.x sau 2.x)",
      description: "jQuery 1.x și 2.x au vulnerabilități XSS cunoscute și nu mai primesc patch-uri de securitate.",
      recommendation: "Actualizează la jQuery 3.7+ sau migrează la JavaScript modern (vanilla / framework).",
    });
  }

  // ============ X-POWERED-BY VIA META (rare, but checked) ============
  // (Real header check requires proxy that preserves headers — separate fn)

  return {
    issues,
    privacy: {
      googleFontsExternal,
      trackingScripts,
      cookieBanner,
    },
    accessibility: {
      linksWithoutText,
      buttonsWithoutText,
      inputsWithoutLabel,
      iframesWithoutTitle,
      headingSkips,
      viewportBlocksZoom,
      skipLink,
    },
    modernWeb: {
      hasManifest,
      hasThemeColor,
      hasAppleTouchIcon,
      hasOgImage,
    },
  };
}

// ============ HEADER-BASED CHECKS (when proxy preserves them) ============
export interface HeaderCheckResult {
  headersAvailable: boolean;
  hsts: boolean;
  csp: boolean;
  xFrameOptions: boolean;
  xContentTypeOptions: boolean;
  referrerPolicy: boolean;
  permissionsPolicy: boolean;
  poweredBy: string | null;
  server: string | null;
  issues: Issue[];
}

export function checkSecurityHeaders(headers: Headers, isHttps: boolean): HeaderCheckResult {
  const issues: Issue[] = [];
  // Many proxies strip headers. Detect by presence of any standard header.
  const hasAny = headers.has("content-type") || headers.has("server") || headers.has("x-powered-by");

  const get = (name: string) => headers.get(name);
  const hsts = !!get("strict-transport-security");
  const csp = !!get("content-security-policy");
  const xfo = !!get("x-frame-options");
  const xcto = !!get("x-content-type-options");
  const refPol = !!get("referrer-policy");
  const permPol = !!get("permissions-policy");
  const poweredBy = get("x-powered-by");
  const server = get("server");

  // Only emit issues if headers ARE actually available (otherwise we'd report false positives)
  if (hasAny) {
    if (isHttps && !hsts) {
      issues.push({
        category: "security",
        severity: "warning",
        title: "Lipsește header-ul HSTS (Strict-Transport-Security)",
        description: "HSTS forțează browserele să folosească mereu HTTPS, prevenind atacuri de tip downgrade.",
        recommendation: 'Adaugă: Strict-Transport-Security: max-age=31536000; includeSubDomains',
      });
    }
    if (!csp) {
      issues.push({
        category: "security",
        severity: "warning",
        title: "Lipsește Content Security Policy (CSP)",
        description: "CSP previne atacuri XSS limitând ce surse pot încărca scripturi/stiluri.",
        recommendation: "Adaugă header Content-Security-Policy cu directive default-src, script-src, style-src adaptate site-ului.",
      });
    }
    if (!xfo && !csp) {
      issues.push({
        category: "security",
        severity: "warning",
        title: "Lipsește protecția clickjacking (X-Frame-Options)",
        description: "Fără X-Frame-Options sau CSP frame-ancestors, site-ul poate fi încadrat în iframe pe alt site (clickjacking).",
        recommendation: "Adaugă: X-Frame-Options: SAMEORIGIN sau Content-Security-Policy: frame-ancestors 'self'.",
      });
    }
    if (!xcto) {
      issues.push({
        category: "security",
        severity: "info",
        title: "Lipsește X-Content-Type-Options",
        description: "Fără acest header, browserul poate ghici tipul fișierelor — risc de execuție neintenționată.",
        recommendation: "Adaugă: X-Content-Type-Options: nosniff",
      });
    }
    if (!refPol) {
      issues.push({
        category: "security",
        severity: "info",
        title: "Lipsește Referrer-Policy",
        description: "Fără politică, URL-uri sensibile pot fi trimise ca referrer către site-uri terțe.",
        recommendation: "Adaugă: Referrer-Policy: strict-origin-when-cross-origin",
      });
    }
    if (!permPol) {
      issues.push({
        category: "security",
        severity: "info",
        title: "Lipsește Permissions-Policy",
        description: "Permissions-Policy controlează ce API-uri (cameră, microfon, geolocație) pot fi folosite.",
        recommendation: "Adaugă: Permissions-Policy: camera=(), microphone=(), geolocation=()",
      });
    }
    if (poweredBy) {
      issues.push({
        category: "security",
        severity: "info",
        title: `Header X-Powered-By dezvăluie tehnologia: "${poweredBy}"`,
        description: "Expunerea versiunii ușurează atacurile țintite pe vulnerabilități cunoscute.",
        recommendation: "Configurează server-ul să elimine header-ul X-Powered-By (în PHP: expose_php=Off).",
      });
    }
  }

  return {
    headersAvailable: hasAny,
    hsts,
    csp,
    xFrameOptions: xfo,
    xContentTypeOptions: xcto,
    referrerPolicy: refPol,
    permissionsPolicy: permPol,
    poweredBy,
    server,
    issues,
  };
}
