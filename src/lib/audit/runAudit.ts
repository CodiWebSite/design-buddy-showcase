import type { AuditResult, Category, Issue } from "./types";
import { detectTechnologies } from "./detectTech";

// Public CORS proxy that returns raw HTML + headers (works in browser, no backend).
// allorigins returns JSON with `contents` (HTML) and `status` (HTTP info).
const PROXY = "https://api.allorigins.win/get?url=";
const PROXY_RAW = "https://api.allorigins.win/raw?url=";

function normalizeUrl(input: string): string {
  let u = input.trim();
  if (!/^https?:\/\//i.test(u)) u = "https://" + u;
  // Validate
  const parsed = new URL(u);
  return parsed.toString();
}

async function fetchSite(url: string): Promise<{ html: string; status: number; finalUrl: string; fetchMs: number; bytes: number }> {
  const start = performance.now();
  const res = await fetch(PROXY + encodeURIComponent(url), { method: "GET" });
  if (!res.ok) throw new Error(`Proxy a returnat ${res.status}`);
  const data = await res.json();
  const fetchMs = Math.round(performance.now() - start);
  const html: string = data.contents || "";
  const bytes = new Blob([html]).size;
  const status = data.status?.http_code ?? 0;
  const finalUrl = data.status?.url ?? url;
  if (status === 0 || status >= 400) {
    throw new Error(`Site-ul a returnat status ${status || "necunoscut"}`);
  }
  return { html, status, finalUrl, fetchMs, bytes };
}

async function fetchText(url: string): Promise<{ ok: boolean; text: string }> {
  try {
    const res = await fetch(PROXY_RAW + encodeURIComponent(url), { method: "GET" });
    if (!res.ok) return { ok: false, text: "" };
    const text = await res.text();
    // allorigins returns empty body for 404s sometimes; treat tiny / HTML 404 pages as missing
    if (!text || text.length < 5) return { ok: false, text: "" };
    if (/^<!doctype html|<html/i.test(text.trim()) && /not found|404/i.test(text)) {
      return { ok: false, text: "" };
    }
    return { ok: true, text };
  } catch {
    return { ok: false, text: "" };
  }
}

function parseDoc(html: string): Document {
  return new DOMParser().parseFromString(html, "text/html");
}

function clamp(n: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, Math.round(n)));
}

export async function runAudit(
  rawUrl: string,
  onProgress?: (step: number, label: string) => void,
): Promise<AuditResult> {
  const url = normalizeUrl(rawUrl);

  onProgress?.(0, "Conectare la site...");
  const { html, finalUrl, fetchMs, bytes } = await fetchSite(url);

  onProgress?.(1, "Analiză securitate...");
  const doc = parseDoc(html);
  const isHttps = new URL(finalUrl).protocol === "https:";

  const issues: Issue[] = [];
  const scores: Record<Category, number> = {
    security: 100,
    seo: 100,
    performance: 100,
    infrastructure: 100,
    ux: 100,
  };

  const penalize = (cat: Category, points: number, issue: Issue) => {
    scores[cat] -= points;
    issues.push(issue);
  };

  // ---------- SECURITY ----------
  if (!isHttps) {
    penalize("security", 50, {
      category: "security",
      severity: "critical",
      title: "Site-ul nu folosește HTTPS",
      description: "Conexiunea nu este criptată. Browserele moderne marchează site-ul ca „nesigur”.",
      recommendation: "Instalează un certificat SSL (Let's Encrypt e gratuit) și redirecționează tot traficul HTTP → HTTPS.",
    });
  }

  // Mixed content
  const httpAssets = Array.from(doc.querySelectorAll('img[src^="http://"], script[src^="http://"], link[href^="http://"]'));
  if (isHttps && httpAssets.length > 0) {
    penalize("security", 15, {
      category: "security",
      severity: "warning",
      title: `${httpAssets.length} resurse încărcate prin HTTP (mixed content)`,
      description: "Imagini sau scripturi încărcate prin HTTP pe o pagină HTTPS scad scorul de securitate și pot fi blocate.",
      recommendation: "Înlocuiește toate URL-urile http:// cu https:// în codul sursă.",
    });
  }

  // Inline scripts
  const inlineScripts = Array.from(doc.querySelectorAll("script:not([src])")).filter((s) => (s.textContent || "").trim().length > 50);
  if (inlineScripts.length > 5) {
    penalize("security", 5, {
      category: "security",
      severity: "info",
      title: `${inlineScripts.length} scripturi inline detectate`,
      description: "Scripturile inline complică implementarea unei politici CSP stricte.",
      recommendation: "Mută JavaScript-ul în fișiere externe și implementează Content-Security-Policy.",
    });
  }

  onProgress?.(2, "Analiză SEO...");

  // ---------- SEO ----------
  const titleEl = doc.querySelector("title");
  const title = titleEl?.textContent?.trim() || null;
  if (!title) {
    penalize("seo", 20, {
      category: "seo",
      severity: "critical",
      title: "Lipsește tag-ul <title>",
      description: "Title-ul este cel mai important factor SEO on-page și apare în rezultatele Google.",
      recommendation: "Adaugă <title>Titlu descriptiv 50-60 caractere</title> în <head>.",
    });
  } else if (title.length < 30 || title.length > 65) {
    penalize("seo", 8, {
      category: "seo",
      severity: "warning",
      title: `Titlul are ${title.length} caractere (recomandat: 30-65)`,
      description: `Title actual: „${title}”. Titlurile prea scurte sau prea lungi sunt trunchiate de Google.`,
      recommendation: "Rescrie titlul între 30 și 65 caractere, cu cuvântul-cheie principal la început.",
    });
  }

  const descEl = doc.querySelector('meta[name="description"]');
  const description = descEl?.getAttribute("content")?.trim() || null;
  if (!description) {
    penalize("seo", 15, {
      category: "seo",
      severity: "critical",
      title: "Lipsește meta description",
      description: "Descrierea apare sub titlu în Google și influențează rata de click (CTR).",
      recommendation: 'Adaugă <meta name="description" content="Descriere de 120-160 caractere"> în <head>.',
    });
  } else if (description.length < 70 || description.length > 170) {
    penalize("seo", 5, {
      category: "seo",
      severity: "warning",
      title: `Meta description are ${description.length} caractere (recomandat: 70-170)`,
      description: "Descrierile prea scurte sau prea lungi sunt trunchiate în rezultatele Google.",
      recommendation: "Ajustează descrierea între 70 și 170 caractere.",
    });
  }

  const h1s = doc.querySelectorAll("h1");
  if (h1s.length === 0) {
    penalize("seo", 12, {
      category: "seo",
      severity: "critical",
      title: "Pagina nu are nici un H1",
      description: "Tag-ul H1 este al doilea cel mai important element SEO on-page.",
      recommendation: "Adaugă exact un <h1> care descrie subiectul principal al paginii.",
    });
  } else if (h1s.length > 1) {
    penalize("seo", 6, {
      category: "seo",
      severity: "warning",
      title: `Pagina are ${h1s.length} tag-uri H1`,
      description: "Best practice SEO recomandă un singur H1 per pagină pentru claritate semantică.",
      recommendation: "Păstrează un singur H1 și folosește H2/H3 pentru subsecțiuni.",
    });
  }

  const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute("href") || null;
  if (!canonical) {
    penalize("seo", 5, {
      category: "seo",
      severity: "warning",
      title: "Lipsește tag-ul canonical",
      description: "Canonical previne probleme de conținut duplicat (ex: site cu și fără www).",
      recommendation: 'Adaugă <link rel="canonical" href="https://domain.com/pagina"> în <head>.',
    });
  }

  const ogTags = doc.querySelectorAll('meta[property^="og:"]').length;
  if (ogTags < 3) {
    penalize("seo", 6, {
      category: "seo",
      severity: "warning",
      title: "Open Graph incomplet sau absent",
      description: "Open Graph controlează cum arată link-ul când e distribuit pe Facebook, LinkedIn, WhatsApp.",
      recommendation: "Adaugă cel puțin og:title, og:description, og:image și og:url.",
    });
  }

  const twitterTags = doc.querySelectorAll('meta[name^="twitter:"]').length;
  if (twitterTags < 2) {
    penalize("seo", 3, {
      category: "seo",
      severity: "info",
      title: "Twitter Cards lipsesc",
      description: "Fără Twitter Cards, link-urile partajate pe X/Twitter apar fără preview vizual.",
      recommendation: "Adaugă twitter:card, twitter:title, twitter:description și twitter:image.",
    });
  }

  onProgress?.(3, "Analiză performanță...");

  // ---------- PERFORMANCE ----------
  if (fetchMs > 2500) {
    penalize("performance", 25, {
      category: "performance",
      severity: "critical",
      title: `Timp de răspuns lent: ${fetchMs}ms`,
      description: "Un site care încarcă peste 2.5s pierde semnificativ utilizatori și e penalizat în Google.",
      recommendation: "Optimizează server-ul, activează cache, folosește CDN și comprimă răspunsurile.",
    });
  } else if (fetchMs > 1200) {
    penalize("performance", 10, {
      category: "performance",
      severity: "warning",
      title: `Timp de răspuns moderat: ${fetchMs}ms`,
      description: "Sub 1 secundă e ținta pentru o experiență optimă.",
      recommendation: "Activează cache pe server și optimizează query-urile la baza de date.",
    });
  }

  const htmlKb = bytes / 1024;
  if (htmlKb > 500) {
    penalize("performance", 15, {
      category: "performance",
      severity: "warning",
      title: `HTML foarte mare: ${htmlKb.toFixed(0)} KB`,
      description: "HTML-ul ar trebui să stea sub 100 KB pentru încărcare rapidă pe mobil.",
      recommendation: "Reduce conținutul inline, mută CSS/JS în fișiere externe, elimină comentariile.",
    });
  } else if (htmlKb > 150) {
    penalize("performance", 5, {
      category: "performance",
      severity: "info",
      title: `HTML ușor încărcat: ${htmlKb.toFixed(0)} KB`,
      description: "Poți reduce dimensiunea pentru o încărcare mai rapidă.",
      recommendation: "Verifică dacă există CSS/JS inline care poate fi externalizat.",
    });
  }

  const totalScripts = doc.querySelectorAll("script[src]").length;
  if (totalScripts > 15) {
    penalize("performance", 8, {
      category: "performance",
      severity: "warning",
      title: `${totalScripts} scripturi externe încărcate`,
      description: "Prea multe scripturi externe blochează randarea și încetinesc pagina.",
      recommendation: "Combină scripturile, folosește bundling (Webpack/Vite) și lazy-loading.",
    });
  }

  const totalStyles = doc.querySelectorAll('link[rel="stylesheet"]').length;
  if (totalStyles > 8) {
    penalize("performance", 5, {
      category: "performance",
      severity: "info",
      title: `${totalStyles} fișiere CSS încărcate`,
      description: "Multe fișiere CSS separate cresc numărul de request-uri.",
      recommendation: "Combină fișierele CSS într-unul singur sau două (critical + non-critical).",
    });
  }

  onProgress?.(4, "Analiză infrastructură...");

  // ---------- INFRASTRUCTURE ----------
  const generator = doc.querySelector('meta[name="generator"]')?.getAttribute("content") || null;
  if (generator && /wordpress|drupal|joomla/i.test(generator)) {
    const versionMatch = generator.match(/(\d+\.\d+(?:\.\d+)?)/);
    if (versionMatch) {
      penalize("infrastructure", 8, {
        category: "infrastructure",
        severity: "warning",
        title: `Versiunea CMS expusă public (${generator})`,
        description: "Expunerea versiunii CMS facilitează atacurile țintite pe vulnerabilități cunoscute.",
        recommendation: 'Elimină tag-ul <meta name="generator"> din header sau folosește un plugin de securitate.',
      });
    }
  }

  // Check robots.txt indirect (presence of robots meta noindex)
  const robotsMeta = doc.querySelector('meta[name="robots"]')?.getAttribute("content") || "";
  if (/noindex/i.test(robotsMeta)) {
    penalize("infrastructure", 20, {
      category: "infrastructure",
      severity: "critical",
      title: "Pagina este marcată noindex",
      description: "Google nu va indexa această pagină. Dacă e intenționat, ignoră. Dacă nu, pierzi tot traficul organic.",
      recommendation: 'Elimină <meta name="robots" content="noindex"> dacă vrei trafic din Google.',
    });
  }

  // Schema.org structured data
  const jsonLd = doc.querySelectorAll('script[type="application/ld+json"]').length;
  if (jsonLd === 0) {
    penalize("infrastructure", 5, {
      category: "infrastructure",
      severity: "info",
      title: "Lipsesc datele structurate (Schema.org)",
      description: "Schema.org permite Google să afișeze rich snippets (rating, preț, FAQ) în rezultatele de căutare.",
      recommendation: "Adaugă JSON-LD pentru tipul potrivit (Organization, LocalBusiness, Product, FAQ etc.).",
    });
  }

  // robots.txt + sitemap.xml fetch
  const origin = new URL(finalUrl).origin;
  const [robotsRes, sitemapRes] = await Promise.all([
    fetchText(`${origin}/robots.txt`),
    fetchText(`${origin}/sitemap.xml`),
  ]);

  let robotsHasSitemap = false;
  if (robotsRes.ok && /^user-agent:/im.test(robotsRes.text)) {
    robotsHasSitemap = /^sitemap:\s*https?:\/\//im.test(robotsRes.text);
  } else {
    penalize("infrastructure", 8, {
      category: "infrastructure",
      severity: "warning",
      title: "Lipsește fișierul robots.txt",
      description: "robots.txt spune motoarelor de căutare ce pot și ce nu pot indexa pe site.",
      recommendation: "Creează un fișier robots.txt în rădăcina site-ului cu cel puțin User-agent: * și Sitemap: URL.",
    });
  }

  let sitemapUrlCount = 0;
  if (sitemapRes.ok && /<urlset|<sitemapindex/i.test(sitemapRes.text)) {
    sitemapUrlCount = (sitemapRes.text.match(/<loc>/gi) || []).length;
  } else {
    penalize("infrastructure", 10, {
      category: "infrastructure",
      severity: "warning",
      title: "Lipsește sitemap.xml",
      description: "Sitemap-ul ajută Google să descopere și indexeze toate paginile site-ului mai rapid.",
      recommendation: "Generează un sitemap.xml (plugin SEO sau manual) și adaugă-l la /sitemap.xml + în robots.txt.",
    });
  }

  if (robotsRes.ok && !robotsHasSitemap && sitemapRes.ok) {
    penalize("infrastructure", 3, {
      category: "infrastructure",
      severity: "info",
      title: "Sitemap nu este declarat în robots.txt",
      description: "Deși sitemap.xml există, robots.txt nu îl menționează — bots-urii s-ar putea să nu îl găsească.",
      recommendation: "Adaugă linia: Sitemap: https://domeniul-tau.ro/sitemap.xml în robots.txt.",
    });
  }

  // Technology detection
  const technologies = detectTechnologies(html, doc);

  onProgress?.(5, "Analiză UX & accesibilitate...");

  // ---------- UX / ACCESSIBILITY ----------
  const viewport = doc.querySelector('meta[name="viewport"]')?.getAttribute("content") || null;
  if (!viewport) {
    penalize("ux", 25, {
      category: "ux",
      severity: "critical",
      title: "Lipsește meta viewport (site nu e optimizat pentru mobil)",
      description: "Fără viewport, site-ul apare zoom-out pe telefon și e dificil de utilizat.",
      recommendation: 'Adaugă <meta name="viewport" content="width=device-width, initial-scale=1"> în <head>.',
    });
  }

  const lang = doc.documentElement.getAttribute("lang") || null;
  if (!lang) {
    penalize("ux", 8, {
      category: "ux",
      severity: "warning",
      title: "Atributul lang lipsește din <html>",
      description: "Atributul lang ajută cititoarele de ecran și SEO internațional.",
      recommendation: 'Adaugă lang="ro" în tag-ul <html>.',
    });
  }

  const favicon = !!doc.querySelector('link[rel*="icon"]');
  if (!favicon) {
    penalize("ux", 5, {
      category: "ux",
      severity: "info",
      title: "Lipsește favicon",
      description: "Favicon-ul apare în tab-ul browser-ului și în bookmark-uri. Lipsa lui face site-ul să pară neîngrijit.",
      recommendation: 'Adaugă <link rel="icon" href="/favicon.ico"> în <head>.',
    });
  }

  const images = Array.from(doc.querySelectorAll("img"));
  const missingAlt = images.filter((img) => !img.getAttribute("alt") || img.getAttribute("alt")?.trim() === "").length;
  if (images.length > 0) {
    const ratio = missingAlt / images.length;
    if (ratio > 0.5) {
      penalize("ux", 15, {
        category: "ux",
        severity: "critical",
        title: `${missingAlt} din ${images.length} imagini nu au atribut alt`,
        description: "Atributul alt e obligatoriu pentru accesibilitate (cititoare ecran) și SEO imagini.",
        recommendation: "Adaugă text descriptiv în alt pentru fiecare imagine. Imaginile decorative pot avea alt=\"\".",
      });
    } else if (ratio > 0.1) {
      penalize("ux", 6, {
        category: "ux",
        severity: "warning",
        title: `${missingAlt} din ${images.length} imagini fără alt`,
        description: "Imaginile fără alt nu sunt accesibile pentru utilizatorii cu deficiențe de vedere.",
        recommendation: "Completează atributul alt pentru toate imaginile relevante.",
      });
    }
  }

  // ---------- FINAL ----------
  const finalScores: Record<Category, number> = {
    security: clamp(scores.security),
    seo: clamp(scores.seo),
    performance: clamp(scores.performance),
    infrastructure: clamp(scores.infrastructure),
    ux: clamp(scores.ux),
  };

  // Weighted overall: SEO 25, Security 25, Performance 20, UX 20, Infra 10
  const overall = clamp(
    finalScores.seo * 0.25 +
      finalScores.security * 0.25 +
      finalScores.performance * 0.2 +
      finalScores.ux * 0.2 +
      finalScores.infrastructure * 0.1,
  );

  return {
    url,
    finalUrl,
    fetchedAt: new Date().toISOString(),
    fetchMs,
    htmlBytes: bytes,
    overallScore: overall,
    categoryScores: finalScores,
    issues,
    metadata: {
      title,
      description,
      h1Count: h1s.length,
      lang,
      canonical,
      ogTags,
      twitterTags,
      imagesTotal: images.length,
      imagesMissingAlt: missingAlt,
      viewport,
      favicon,
      isHttps,
      server: null,
    },
  };
}

export function scoreToGrade(score: number): "A" | "B" | "C" | "D" | "F" {
  if (score >= 90) return "A";
  if (score >= 75) return "B";
  if (score >= 60) return "C";
  if (score >= 45) return "D";
  return "F";
}

export function scoreColor(score: number): string {
  if (score >= 80) return "hsl(142 76% 45%)"; // green
  if (score >= 50) return "hsl(38 92% 55%)"; // amber
  return "hsl(0 84% 60%)"; // red
}
