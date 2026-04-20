import type { AuditResult, Category, Issue } from "./types";
import { detectTechnologies } from "./detectTech";
import { estimateWebVitals } from "./webVitals";
import { lookupDns, type DnsInfo } from "./dnsLookup";
import { runExtraChecks, checkSecurityHeaders } from "./extraChecks";

// Multiple CORS proxies tried in order until one succeeds.
// Each entry knows how to build the URL and how to extract the text body.
type ProxyAdapter = {
  name: string;
  build: (target: string) => string;
  parse: (res: Response) => Promise<string>;
};

const PROXIES: ProxyAdapter[] = [
  {
    name: "corsproxy.io",
    build: (t) => `https://corsproxy.io/?${encodeURIComponent(t)}`,
    parse: (r) => r.text(),
  },
  {
    name: "codetabs",
    build: (t) => `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(t)}`,
    parse: (r) => r.text(),
  },
  {
    name: "allorigins-raw",
    build: (t) => `https://api.allorigins.win/raw?url=${encodeURIComponent(t)}`,
    parse: (r) => r.text(),
  },
  {
    name: "allorigins-get",
    build: (t) => `https://api.allorigins.win/get?url=${encodeURIComponent(t)}`,
    parse: async (r) => {
      const data = await r.json();
      return typeof data?.contents === "string" ? data.contents : "";
    },
  },
  {
    name: "thingproxy",
    build: (t) => `https://thingproxy.freeboard.io/fetch/${t}`,
    parse: (r) => r.text(),
  },
];

function normalizeUrl(input: string): string {
  let u = input.trim();
  if (!/^https?:\/\//i.test(u)) u = "https://" + u;
  const parsed = new URL(u);
  return parsed.toString();
}

async function fetchWithTimeout(url: string, ms = 12000): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { signal: ctrl.signal, redirect: "follow" });
  } finally {
    clearTimeout(timer);
  }
}

/** Try each proxy in turn; return the first non-empty body that looks valid. */
async function fetchViaProxies(
  target: string,
  opts?: { allowEmpty?: boolean },
): Promise<{ body: string; proxy: string; headers: Headers } | null> {
  const errors: string[] = [];
  for (const p of PROXIES) {
    try {
      const res = await fetchWithTimeout(p.build(target));
      if (!res.ok) {
        errors.push(`${p.name}: HTTP ${res.status}`);
        continue;
      }
      const headers = res.headers;
      const body = await p.parse(res);
      if (!opts?.allowEmpty && (!body || body.length < 50)) {
        errors.push(`${p.name}: gol`);
        continue;
      }
      return { body: body || "", proxy: p.name, headers };
    } catch (e) {
      errors.push(`${p.name}: ${(e as Error).message}`);
    }
  }
  console.warn("Toate proxy-urile au eșuat pentru", target, errors);
  return null;
}

async function fetchSite(url: string): Promise<{ html: string; finalUrl: string; fetchMs: number; bytes: number; proxy: string; headers: Headers }> {
  const start = performance.now();
  const result = await fetchViaProxies(url);
  const fetchMs = Math.round(performance.now() - start);
  if (!result) {
    throw new Error("Nu am reușit să accesez site-ul. Toate proxy-urile CORS au eșuat. Verifică URL-ul sau încearcă din nou peste câteva minute.");
  }
  const html = result.body;
  const bytes = new Blob([html]).size;
  if (!/<html|<!doctype/i.test(html)) {
    throw new Error("Răspunsul primit nu pare a fi HTML. Site-ul ar putea bloca proxy-urile sau cere autentificare.");
  }
  return { html, finalUrl: url, fetchMs, bytes, proxy: result.proxy, headers: result.headers };
}

async function fetchText(url: string): Promise<{ ok: boolean; text: string }> {
  const result = await fetchViaProxies(url, { allowEmpty: true });
  if (!result) return { ok: false, text: "" };
  const text = result.body;
  if (!text || text.length < 5) return { ok: false, text: "" };
  // Detect HTML 404 pages returned instead of the real file
  if (/^<!doctype html|<html/i.test(text.trim()) && /not found|404/i.test(text)) {
    return { ok: false, text: "" };
  }
  return { ok: true, text };
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
  const { html, finalUrl, fetchMs, bytes, headers } = await fetchSite(url);

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

  // Insecure forms — forms posting to http://
  const forms = Array.from(doc.querySelectorAll("form"));
  const insecureForms = forms.filter((f) => /^http:\/\//i.test(f.getAttribute("action") || ""));
  const sensitiveInputs = doc.querySelectorAll('input[type="password"], input[type="email"]').length;
  if (insecureForms.length > 0) {
    penalize("security", 25, {
      category: "security",
      severity: "critical",
      title: `${insecureForms.length} formular(e) trimit datele prin HTTP necriptat`,
      description: "Datele introduse de utilizatori (parole, emailuri) sunt trimise în clar și pot fi interceptate.",
      recommendation: "Schimbă atributul action al formularelor în URL HTTPS și forțează HTTPS pe site.",
    });
  }
  if (!isHttps && sensitiveInputs > 0) {
    penalize("security", 30, {
      category: "security",
      severity: "critical",
      title: `${sensitiveInputs} câmp(uri) sensibile pe pagină HTTP`,
      description: "Pagina conține câmpuri de parolă/email dar nu folosește HTTPS — datele sunt vizibile în rețea.",
      recommendation: "Mută imediat tot site-ul pe HTTPS. Browserele blochează tot mai agresiv astfel de pagini.",
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

  // ---------- WEB VITALS (heuristic, from HTML) ----------
  const vitals = estimateWebVitals(doc, bytes);
  if (vitals.flags.heroImageNotPreloaded && vitals.lcpRiskScore < 80) {
    penalize("performance", 8, {
      category: "performance",
      severity: "warning",
      title: "Imaginea principală (LCP) nu este preîncărcată",
      description: "Fără <link rel=preload as=image>, browserul descoperă imaginea hero târziu, întârziind LCP.",
      recommendation: 'Adaugă <link rel="preload" as="image" href="/hero.jpg" fetchpriority="high"> în <head>.',
    });
  }
  if (vitals.flags.blockingScriptsInHead > 2) {
    penalize("performance", 8, {
      category: "performance",
      severity: "warning",
      title: `${vitals.flags.blockingScriptsInHead} scripturi blochează randarea (în <head>, fără async/defer)`,
      description: "Scripturile fără async sau defer în <head> opresc randarea paginii până se descarcă și execută.",
      recommendation: "Adaugă atributul defer (sau async) la tag-urile <script src=...> sau mută-le înainte de </body>.",
    });
  }
  if (vitals.flags.imagesWithoutDimensionsTotal > 3) {
    penalize("performance", 7, {
      category: "performance",
      severity: "warning",
      title: `${vitals.flags.imagesWithoutDimensionsTotal} imagini fără width/height (risc CLS ridicat)`,
      description: "Imaginile fără dimensiuni declarate cauzează layout shift când se încarcă — Core Web Vital negativ.",
      recommendation: "Adaugă atributele width și height pe fiecare <img> (browserul calculează spațiul rezervat).",
    });
  }
  if (vitals.flags.iframesWithoutDimensions > 0) {
    penalize("performance", 4, {
      category: "performance",
      severity: "info",
      title: `${vitals.flags.iframesWithoutDimensions} iframe fără dimensiuni`,
      description: "Iframe-urile fără width/height cauzează layout shift la încărcare.",
      recommendation: "Adaugă atributele width și height pe fiecare <iframe>.",
    });
  }
  if (vitals.flags.fontsWithoutDisplaySwap > 0) {
    penalize("performance", 4, {
      category: "performance",
      severity: "info",
      title: "Fonturi web fără font-display: swap",
      description: "Fără swap, textul rămâne invizibil până se descarcă fontul (FOIT) — afectează LCP și CLS.",
      recommendation: 'Adaugă &display=swap la URL-urile Google Fonts sau font-display: swap în @font-face.',
    });
  }

  // ---------- DNS via Cloudflare DoH ----------
  let dnsInfo: DnsInfo | null = null;
  try {
    const hostname = new URL(finalUrl).hostname;
    dnsInfo = await lookupDns(hostname);

    if (dnsInfo.hasMx && !dnsInfo.hasSpf) {
      penalize("security", 10, {
        category: "security",
        severity: "warning",
        title: "Domeniul are MX dar lipsește SPF",
        description:
          "Fără SPF, oricine poate trimite emailuri în numele domeniului tău — risc major de phishing și spam.",
        recommendation: 'Adaugă un record TXT: "v=spf1 include:_spf.providerul-tau.com -all".',
      });
    }
    if (dnsInfo.hasMx && !dnsInfo.hasDmarc) {
      penalize("security", 10, {
        category: "security",
        severity: "warning",
        title: "DMARC lipsește pentru un domeniu cu email",
        description: "DMARC instruiește serverele de email cum să gestioneze mesaje suspecte trimise în numele tău.",
        recommendation: 'Adaugă _dmarc.domeniu.ro TXT: "v=DMARC1; p=quarantine; rua=mailto:tine@domeniu.ro".',
      });
    }
    if (!dnsInfo.hasCaa && isHttps) {
      penalize("security", 3, {
        category: "security",
        severity: "info",
        title: "Lipsesc record-uri CAA",
        description: "CAA limitează ce autorități de certificare pot emite SSL pentru domeniul tău.",
        recommendation: 'Adaugă CAA: 0 issue "letsencrypt.org" pentru a restricționa emiterea SSL.',
      });
    }
    if (!dnsInfo.hasAAAA) {
      penalize("infrastructure", 2, {
        category: "infrastructure",
        severity: "info",
        title: "Domeniul nu are record-uri AAAA (IPv6)",
        description: "IPv6 e tot mai răspândit; lipsa lui poate încetini accesul pentru unii utilizatori.",
        recommendation: "Cere providerului de hosting activarea IPv6 și adaugă record AAAA.",
      });
    }
  } catch (e) {
    console.warn("DNS lookup eșuat:", e);
  }

  // ---------- EXTRA CHECKS (accessibility, privacy, modern web, SRI, etc.) ----------
  const extra = runExtraChecks(doc, html, isHttps);
  for (const issue of extra.issues) {
    // Use small penalties; many are info-level
    const points = issue.severity === "critical" ? 15 : issue.severity === "warning" ? 6 : 2;
    scores[issue.category] -= points;
    issues.push(issue);
  }

  // ---------- SECURITY HEADERS (only if proxy preserved them) ----------
  const headerCheck = checkSecurityHeaders(headers, isHttps);
  for (const issue of headerCheck.issues) {
    const points = issue.severity === "warning" ? 5 : 2;
    scores[issue.category] -= points;
    issues.push(issue);
  }

  // ---------- security.txt + llms.txt ----------
  const [securityTxtRes, llmsTxtRes] = await Promise.all([
    fetchText(`${origin}/.well-known/security.txt`),
    fetchText(`${origin}/llms.txt`),
  ]);
  const securityTxt = securityTxtRes.ok && /contact:/i.test(securityTxtRes.text);
  const llmsTxt = llmsTxtRes.ok && llmsTxtRes.text.length > 10;

  if (!securityTxt) {
    penalize("security", 2, {
      category: "security",
      severity: "info",
      title: "Lipsește fișierul security.txt (RFC 9116)",
      description: "security.txt oferă cercetătorilor de securitate un canal standardizat pentru a raporta vulnerabilități.",
      recommendation: "Creează /.well-known/security.txt cu cel puțin: Contact: mailto:security@domeniul-tau.ro",
    });
  }
  if (!llmsTxt) {
    penalize("seo", 1, {
      category: "seo",
      severity: "info",
      title: "Lipsește fișierul llms.txt pentru crawlerele AI",
      description: "llms.txt e un standard emergent pentru a oferi contextul site-ului către modelele LLM (ChatGPT, Claude, Perplexity).",
      recommendation: "Creează /llms.txt cu un sumar markdown al site-ului și link-uri către pagini-cheie.",
    });
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
      server: headerCheck.server,
      technologies,
      robotsTxt: { found: robotsRes.ok, hasSitemap: robotsHasSitemap },
      sitemapXml: { found: sitemapRes.ok, urlCount: sitemapUrlCount },
      vitals: {
        lcpScore: vitals.lcpRiskScore,
        clsScore: vitals.clsRiskScore,
      },
      dns: dnsInfo
        ? {
            hasA: dnsInfo.hasA,
            aRecords: dnsInfo.aRecords,
            hasAAAA: dnsInfo.hasAAAA,
            hasMx: dnsInfo.hasMx,
            mxRecords: dnsInfo.mxRecords,
            hasSpf: dnsInfo.hasSpf,
            hasDmarc: dnsInfo.hasDmarc,
            hasCaa: dnsInfo.hasCaa,
          }
        : null,
      privacy: extra.privacy,
      accessibility: {
        linksWithoutText: extra.accessibility.linksWithoutText,
        buttonsWithoutText: extra.accessibility.buttonsWithoutText,
        inputsWithoutLabel: extra.accessibility.inputsWithoutLabel,
        iframesWithoutTitle: extra.accessibility.iframesWithoutTitle,
        headingSkipsCount: extra.accessibility.headingSkips.length,
        viewportBlocksZoom: extra.accessibility.viewportBlocksZoom,
        skipLink: extra.accessibility.skipLink,
      },
      modernWeb: extra.modernWeb,
      securityHeaders: {
        available: headerCheck.headersAvailable,
        hsts: headerCheck.hsts,
        csp: headerCheck.csp,
        xFrameOptions: headerCheck.xFrameOptions,
        xContentTypeOptions: headerCheck.xContentTypeOptions,
        referrerPolicy: headerCheck.referrerPolicy,
        permissionsPolicy: headerCheck.permissionsPolicy,
        poweredBy: headerCheck.poweredBy,
        server: headerCheck.server,
      },
      securityTxt,
      llmsTxt,
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
