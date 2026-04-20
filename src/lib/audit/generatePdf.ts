import { jsPDF } from "jspdf";
import type { AuditResult } from "./types";
import { CATEGORY_LABELS } from "./types";
import { scoreToGrade } from "./runAudit";

const SEVERITY_LABEL: Record<string, string> = {
  critical: "Critic",
  warning: "Atentionare",
  info: "Info",
  success: "OK",
};

const SEVERITY_COLOR: Record<string, [number, number, number]> = {
  critical: [220, 38, 38],
  warning: [217, 119, 6],
  info: [37, 99, 235],
  success: [22, 163, 74],
};

// Strip diacritics so default jsPDF Helvetica renders correctly
function clean(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u0102\u0103]/g, (c) => (c === "\u0102" ? "A" : "a"))
    .replace(/[\u00C2\u00E2]/g, (c) => (c === "\u00C2" ? "A" : "a"))
    .replace(/[\u00CE\u00EE]/g, (c) => (c === "\u00CE" ? "I" : "i"))
    .replace(/[\u0218\u0219\u015E\u015F]/g, (c) => (/[\u0218\u015E]/.test(c) ? "S" : "s"))
    .replace(/[\u021A\u021B\u0162\u0163]/g, (c) => (/[\u021A\u0162]/.test(c) ? "T" : "t"));
}

export function generateAuditPdf(result: AuditResult): jsPDF {
  const pdf = new jsPDF({ unit: "mm", format: "a4" });
  const W = pdf.internal.pageSize.getWidth();
  const H = pdf.internal.pageSize.getHeight();

  // ===== COVER (DARK) =====
  pdf.setFillColor(15, 23, 42); // #0F172A
  pdf.rect(0, 0, W, H, "F");

  // Accent gradient bar
  pdf.setFillColor(59, 130, 246);
  pdf.rect(0, 0, W, 4, "F");

  pdf.setTextColor(148, 163, 184);
  pdf.setFontSize(11);
  pdf.setFont("helvetica", "normal");
  pdf.text("WEBCRAFT AUDIT", 20, 25);

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(28);
  pdf.setFont("helvetica", "bold");
  pdf.text("Raport de analiza", 20, 50);
  pdf.text("website", 20, 62);

  pdf.setTextColor(148, 163, 184);
  pdf.setFontSize(11);
  pdf.setFont("helvetica", "normal");
  pdf.text("URL analizat:", 20, 80);
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(13);
  pdf.text(clean(result.url), 20, 88, { maxWidth: W - 40 });

  // Big score circle
  const cx = W / 2;
  const cy = 145;
  const radius = 32;
  const score = result.overallScore;
  const color: [number, number, number] = score >= 80 ? [34, 197, 94] : score >= 50 ? [234, 179, 8] : [239, 68, 68];

  pdf.setFillColor(30, 41, 59);
  pdf.circle(cx, cy, radius + 4, "F");
  pdf.setFillColor(...color);
  pdf.circle(cx, cy, radius, "F");

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(48);
  pdf.setFont("helvetica", "bold");
  const scoreText = String(score);
  const sw = pdf.getTextWidth(scoreText);
  pdf.text(scoreText, cx - sw / 2, cy + 6);
  pdf.setFontSize(11);
  pdf.setFont("helvetica", "normal");
  const grade = `Grad ${scoreToGrade(score)}`;
  const gw = pdf.getTextWidth(grade);
  pdf.text(grade, cx - gw / 2, cy + 16);

  pdf.setTextColor(148, 163, 184);
  pdf.setFontSize(10);
  const dateStr = new Date(result.fetchedAt).toLocaleDateString("ro-RO", {
    day: "2-digit", month: "long", year: "numeric",
  });
  pdf.text(clean(`Generat: ${dateStr}`), 20, H - 30);
  pdf.text("webcraft.djfunkyevents.ro", 20, H - 22);

  pdf.setTextColor(59, 130, 246);
  pdf.setFontSize(9);
  pdf.text("Audit gratuit oferit de WebCraft", W - 20, H - 22, { align: "right" });

  // ===== TOC PLACEHOLDER (page 2) — filled in at the end =====
  pdf.addPage();
  const tocPageNum = pdf.getCurrentPageInfo().pageNumber;

  // ===== PAGE 3+: LIGHT CONTENT =====
  pdf.addPage();
  let y = 20;

  const writePageHeader = () => {
    pdf.setFillColor(248, 250, 252);
    pdf.rect(0, 0, W, 14, "F");
    pdf.setTextColor(100, 116, 139);
    pdf.setFontSize(9);
    pdf.setFont("helvetica", "normal");
    pdf.text("WebCraft Audit", 20, 9);
    pdf.text(clean(result.url), W - 20, 9, { align: "right" });
    pdf.setDrawColor(226, 232, 240);
    pdf.line(0, 14, W, 14);
  };

  const ensureSpace = (needed: number) => {
    if (y + needed > H - 20) {
      pdf.addPage();
      writePageHeader();
      y = 22;
    }
  };

  // Track section anchors for TOC
  const tocEntries: { label: string; page: number; y: number }[] = [];
  const markSection = (label: string) => {
    tocEntries.push({ label, page: pdf.getCurrentPageInfo().pageNumber, y: y - 5 });
  };

  writePageHeader();
  y = 25;

  // Section: Scoruri pe categorii
  pdf.setTextColor(15, 23, 42);
  pdf.setFontSize(18);
  pdf.setFont("helvetica", "bold");
  markSection("Scoruri pe categorii");
  pdf.text("Scoruri pe categorii", 20, y);
  y += 10;

  const cats = Object.entries(result.categoryScores) as [keyof typeof result.categoryScores, number][];
  for (const [cat, sc] of cats) {
    ensureSpace(18);
    pdf.setFillColor(248, 250, 252);
    pdf.roundedRect(20, y, W - 40, 14, 2, 2, "F");

    pdf.setTextColor(15, 23, 42);
    pdf.setFontSize(11);
    pdf.setFont("helvetica", "bold");
    pdf.text(clean(CATEGORY_LABELS[cat]), 25, y + 9);

    // Bar
    const barX = 90;
    const barW = 70;
    pdf.setFillColor(226, 232, 240);
    pdf.roundedRect(barX, y + 5, barW, 4, 2, 2, "F");
    const barColor: [number, number, number] = sc >= 80 ? [34, 197, 94] : sc >= 50 ? [234, 179, 8] : [239, 68, 68];
    pdf.setFillColor(...barColor);
    pdf.roundedRect(barX, y + 5, (barW * sc) / 100, 4, 2, 2, "F");

    pdf.setTextColor(15, 23, 42);
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text(`${sc}/100`, W - 45, y + 9);
    pdf.setFontSize(9);
    pdf.setTextColor(100, 116, 139);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Grad ${scoreToGrade(sc)}`, W - 25, y + 9);

    y += 18;
  }

  // Section: Metadata
  y += 5;
  ensureSpace(50);
  pdf.setTextColor(15, 23, 42);
  pdf.setFontSize(16);
  pdf.setFont("helvetica", "bold");
  markSection("Informatii detectate");
  pdf.text("Informatii detectate", 20, y);
  y += 8;

  const meta = result.metadata;
  const techList = meta.technologies.length ? meta.technologies.join(", ") : "Niciuna detectata";
  const rows: [string, string][] = [
    ["Titlu pagina", meta.title || "(lipseste)"],
    ["Meta description", meta.description || "(lipseste)"],
    ["Numar H1", String(meta.h1Count)],
    ["Limba (lang)", meta.lang || "(lipseste)"],
    ["HTTPS activ", meta.isHttps ? "Da" : "Nu"],
    ["Viewport mobil", meta.viewport ? "Da" : "Nu"],
    ["Favicon", meta.favicon ? "Da" : "Nu"],
    ["Imagini totale / fara alt", `${meta.imagesTotal} / ${meta.imagesMissingAlt}`],
    ["Open Graph / Twitter", `${meta.ogTags} / ${meta.twitterTags}`],
    ["robots.txt", meta.robotsTxt.found ? (meta.robotsTxt.hasSitemap ? "Gasit (cu sitemap)" : "Gasit") : "Lipseste"],
    ["sitemap.xml", meta.sitemapXml.found ? `Gasit (${meta.sitemapXml.urlCount} URL-uri)` : "Lipseste"],
    ["Tehnologii detectate", techList],
    ["Timp raspuns", `${result.fetchMs} ms`],
    ["Marime HTML", `${(result.htmlBytes / 1024).toFixed(1)} KB`],
    ["LCP risk score (estimat)", `${meta.vitals.lcpScore}/100`],
    ["CLS risk score (estimat)", `${meta.vitals.clsScore}/100`],
  ];

  if (meta.dns) {
    rows.push(
      ["DNS A records", meta.dns.hasA ? meta.dns.aRecords.slice(0, 2).join(", ") : "Lipseste"],
      ["DNS AAAA (IPv6)", meta.dns.hasAAAA ? "Da" : "Nu"],
      ["MX (email servers)", meta.dns.hasMx ? `Da (${meta.dns.mxRecords.length})` : "Nu"],
      ["SPF record", meta.dns.hasSpf ? "Configurat" : "Lipseste"],
      ["DMARC record", meta.dns.hasDmarc ? "Configurat" : "Lipseste"],
      ["CAA record", meta.dns.hasCaa ? "Configurat" : "Lipseste"],
    );
  }

  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  for (const [k, v] of rows) {
    ensureSpace(7);
    pdf.setTextColor(100, 116, 139);
    pdf.text(clean(k), 22, y);
    pdf.setTextColor(15, 23, 42);
    const value = clean(String(v));
    const truncated = value.length > 70 ? value.slice(0, 67) + "..." : value;
    pdf.text(truncated, 75, y);
    y += 6;
  }

  // Privacy & accessibility extras
  y += 4;
  ensureSpace(40);
  pdf.setTextColor(15, 23, 42);
  pdf.setFontSize(13);
  pdf.setFont("helvetica", "bold");
  markSection("Privacy, headere & accesibilitate");
  pdf.text("Privacy, headere & accesibilitate", 20, y);
  y += 7;

  const extraRows: [string, string][] = [
    ["Banner cookies detectat", meta.privacy.cookieBanner ? "Da" : "Nu"],
    ["Google Fonts pe CDN extern", meta.privacy.googleFontsExternal ? "Da (risc GDPR)" : "Nu"],
    ["Scripturi tracking", meta.privacy.trackingScripts.length ? meta.privacy.trackingScripts.join(", ") : "Niciunul"],
    ["security.txt", meta.securityTxt ? "Da" : "Lipseste"],
    ["llms.txt (AI crawlers)", meta.llmsTxt ? "Da" : "Lipseste"],
    ["Web manifest", meta.modernWeb.hasManifest ? "Da" : "Nu"],
    ["theme-color", meta.modernWeb.hasThemeColor ? "Da" : "Nu"],
    ["apple-touch-icon", meta.modernWeb.hasAppleTouchIcon ? "Da" : "Nu"],
    ["og:image", meta.modernWeb.hasOgImage ? "Da" : "Nu"],
    ["Linkuri fara text accesibil", String(meta.accessibility.linksWithoutText)],
    ["Butoane fara text accesibil", String(meta.accessibility.buttonsWithoutText)],
    ["Inputuri fara label", String(meta.accessibility.inputsWithoutLabel)],
    ["Iframe fara title", String(meta.accessibility.iframesWithoutTitle)],
    ["Salturi in ierarhia heading", String(meta.accessibility.headingSkipsCount)],
    ["Viewport blocheaza zoom", meta.accessibility.viewportBlocksZoom ? "Da (problema)" : "Nu"],
  ];

  if (meta.securityHeaders.available) {
    extraRows.push(
      ["HSTS", meta.securityHeaders.hsts ? "Activ" : "Lipseste"],
      ["Content-Security-Policy", meta.securityHeaders.csp ? "Activ" : "Lipseste"],
      ["X-Frame-Options", meta.securityHeaders.xFrameOptions ? "Activ" : "Lipseste"],
      ["Referrer-Policy", meta.securityHeaders.referrerPolicy ? "Activ" : "Lipseste"],
      ["Permissions-Policy", meta.securityHeaders.permissionsPolicy ? "Activ" : "Lipseste"],
    );
  }

  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  for (const [k, v] of extraRows) {
    ensureSpace(7);
    pdf.setTextColor(100, 116, 139);
    pdf.text(clean(k), 22, y);
    pdf.setTextColor(15, 23, 42);
    const value = clean(String(v));
    const truncated = value.length > 70 ? value.slice(0, 67) + "..." : value;
    pdf.text(truncated, 75, y);
    y += 6;
  }
  // ===== ISSUES GROUPED BY SEVERITY =====
  const groups: { key: "critical" | "warning" | "info" | "success"; label: string; sublabel: string }[] = [
    { key: "critical", label: "Probleme critice", sublabel: "Necesita actiune imediata" },
    { key: "warning", label: "Probleme importante", sublabel: "Recomandam remediere in scurt timp" },
    { key: "info", label: "Recomandari & optionale", sublabel: "Imbunatatiri suplimentare" },
    { key: "success", label: "Verificate cu succes", sublabel: "Aspecte care functioneaza bine" },
  ];

  const grouped = groups.map((g) => ({
    ...g,
    items: result.issues.filter((i) => i.severity === g.key),
  }));

  // ----- Sumar pe nivele -----
  y += 8;
  ensureSpace(50);
  pdf.setTextColor(15, 23, 42);
  pdf.setFontSize(16);
  pdf.setFont("helvetica", "bold");
  markSection(`Sumar probleme (${result.issues.length})`);
  pdf.text(`Sumar probleme (${result.issues.length} in total)`, 20, y);
  y += 8;

  const cardW = (W - 40 - 9) / 4; // 4 carduri cu 3mm gap
  const startX = 20;
  ensureSpace(28);
  grouped.forEach((g, idx) => {
    const x = startX + idx * (cardW + 3);
    const col = SEVERITY_COLOR[g.key];
    pdf.setFillColor(248, 250, 252);
    pdf.roundedRect(x, y, cardW, 24, 2, 2, "F");
    pdf.setFillColor(...col);
    pdf.rect(x, y, 2, 24, "F");
    pdf.setTextColor(...col);
    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    pdf.text(String(g.items.length), x + 5, y + 11);
    pdf.setTextColor(15, 23, 42);
    pdf.setFontSize(8);
    pdf.setFont("helvetica", "bold");
    pdf.text(clean(g.label), x + 5, y + 17, { maxWidth: cardW - 7 });
    pdf.setTextColor(100, 116, 139);
    pdf.setFontSize(7);
    pdf.setFont("helvetica", "normal");
    pdf.text(clean(g.sublabel), x + 5, y + 21, { maxWidth: cardW - 7 });
  });
  y += 30;

  if (result.issues.length === 0) {
    ensureSpace(20);
    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(34, 197, 94);
    pdf.text(clean("Felicitari! Nu am detectat probleme majore."), 20, y);
  } else {
    // ----- Render fiecare grupa cu probleme -----
    for (const g of grouped) {
      if (g.items.length === 0) continue;
      const sevColor = SEVERITY_COLOR[g.key];

      ensureSpace(22);
      markSection(`${g.label} (${g.items.length})`);
      // Header de grupa
      pdf.setFillColor(...sevColor);
      pdf.roundedRect(20, y, 4, 10, 1, 1, "F");
      pdf.setTextColor(15, 23, 42);
      pdf.setFontSize(15);
      pdf.setFont("helvetica", "bold");
      pdf.text(`${clean(g.label)} (${g.items.length})`, 28, y + 7);
      y += 14;

      for (const issue of g.items) {
        const titleLines = pdf.splitTextToSize(clean(issue.title), W - 50);
        const descLines = pdf.splitTextToSize(clean(issue.description), W - 50);
        const recLines = pdf.splitTextToSize(clean(`Recomandare: ${issue.recommendation}`), W - 50);
        const blockH = 8 + titleLines.length * 5 + descLines.length * 4.5 + recLines.length * 4.5 + 8;
        ensureSpace(blockH);

        // Severity tag
        pdf.setFillColor(...sevColor);
        pdf.roundedRect(20, y, 22, 5.5, 1, 1, "F");
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(8);
        pdf.setFont("helvetica", "bold");
        pdf.text(SEVERITY_LABEL[issue.severity].toUpperCase(), 31, y + 3.8, { align: "center" });

        pdf.setTextColor(100, 116, 139);
        pdf.setFontSize(8);
        pdf.setFont("helvetica", "normal");
        pdf.text(clean(CATEGORY_LABELS[issue.category]), 45, y + 3.8);

        y += 9;
        pdf.setTextColor(15, 23, 42);
        pdf.setFontSize(11);
        pdf.setFont("helvetica", "bold");
        pdf.text(titleLines, 20, y);
        y += titleLines.length * 5 + 1;

        pdf.setTextColor(71, 85, 105);
        pdf.setFontSize(9.5);
        pdf.setFont("helvetica", "normal");
        pdf.text(descLines, 20, y);
        y += descLines.length * 4.5 + 1;

        pdf.setTextColor(37, 99, 235);
        pdf.setFontSize(9.5);
        pdf.text(recLines, 20, y);
        y += recLines.length * 4.5 + 6;

        pdf.setDrawColor(241, 245, 249);
        pdf.line(20, y - 2, W - 20, y - 2);
      }

      y += 4;
    }
  }

  // Final CTA page
  pdf.addPage();
  pdf.setFillColor(15, 23, 42);
  pdf.rect(0, 0, W, H, "F");
  pdf.setFillColor(59, 130, 246);
  pdf.rect(0, 0, W, 4, "F");

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont("helvetica", "bold");
  pdf.text(clean("Vrei sa remediem aceste probleme?"), W / 2, 80, { align: "center" });

  pdf.setTextColor(148, 163, 184);
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");
  const ctaLines = pdf.splitTextToSize(
    clean(
      "WebCraft te ajuta cu redesign profesional, optimizare SEO, hosting si mentenanta. Pachete fixe, fara surprize.",
    ),
    W - 60,
  );
  pdf.text(ctaLines, W / 2, 100, { align: "center" });

  pdf.setFillColor(59, 130, 246);
  pdf.roundedRect(W / 2 - 40, 130, 80, 14, 3, 3, "F");
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "bold");
  pdf.text("Cere oferta gratuita", W / 2, 139, { align: "center" });

  pdf.setTextColor(148, 163, 184);
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  pdf.text("webcraft.djfunkyevents.ro", W / 2, 160, { align: "center" });

  // ===== FILL TOC PAGE =====
  pdf.setPage(tocPageNum);
  // Light background
  pdf.setFillColor(255, 255, 255);
  pdf.rect(0, 0, W, H, "F");
  // Page header bar
  pdf.setFillColor(248, 250, 252);
  pdf.rect(0, 0, W, 14, "F");
  pdf.setTextColor(100, 116, 139);
  pdf.setFontSize(9);
  pdf.setFont("helvetica", "normal");
  pdf.text("WebCraft Audit", 20, 9);
  pdf.text(clean(result.url), W - 20, 9, { align: "right" });
  pdf.setDrawColor(226, 232, 240);
  pdf.line(0, 14, W, 14);

  // Title
  pdf.setTextColor(15, 23, 42);
  pdf.setFontSize(24);
  pdf.setFont("helvetica", "bold");
  pdf.text("Cuprins", 20, 35);
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(100, 116, 139);
  pdf.text(clean("Apasa pe oricare sectiune pentru a naviga direct."), 20, 43);

  // Entries
  let tocY = 58;
  pdf.setFontSize(11);
  for (let i = 0; i < tocEntries.length; i++) {
    const entry = tocEntries[i];
    if (tocY > H - 25) break; // single page TOC

    // Row background (zebra)
    if (i % 2 === 0) {
      pdf.setFillColor(248, 250, 252);
      pdf.rect(18, tocY - 5, W - 36, 8, "F");
    }

    pdf.setTextColor(15, 23, 42);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.text(`${String(i + 1).padStart(2, "0")}.`, 22, tocY);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);
    const labelClean = clean(entry.label);
    pdf.text(labelClean, 32, tocY, { maxWidth: W - 80 });

    // Dotted leader + page number
    pdf.setTextColor(100, 116, 139);
    pdf.setFontSize(10);
    const pageStr = `pag. ${entry.page}`;
    pdf.text(pageStr, W - 22, tocY, { align: "right" });

    // Clickable link region (covers full row)
    pdf.link(18, tocY - 5, W - 36, 9, { pageNumber: entry.page });

    tocY += 9;
  }

  // Footer
  pdf.setTextColor(148, 163, 184);
  pdf.setFontSize(9);
  pdf.setFont("helvetica", "italic");
  pdf.text(
    clean(`${tocEntries.length} sectiuni - Generat ${new Date(result.fetchedAt).toLocaleDateString("ro-RO")}`),
    20,
    H - 15,
  );

  return pdf;
}
