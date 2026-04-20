import { Download, RotateCcw, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScoreCircle from "./ScoreCircle";
import CategoryCard from "./CategoryCard";
import type { AuditResult, Category } from "@/lib/audit/types";
import { generateAuditPdf } from "@/lib/audit/generatePdf";
import { useToast } from "@/hooks/use-toast";

interface Props {
  result: AuditResult;
  onReset: () => void;
}

const CATEGORIES: Category[] = ["security", "seo", "performance", "ux", "infrastructure"];

const AuditDashboard = ({ result, onReset }: Props) => {
  const { toast } = useToast();

  const handleDownload = () => {
    try {
      const pdf = generateAuditPdf(result);
      const safeName = new URL(result.url).hostname.replace(/[^a-z0-9]/gi, "-");
      pdf.save(`audit-${safeName}.pdf`);
      toast({ title: "PDF descărcat", description: "Raportul complet a fost salvat pe dispozitiv." });
    } catch (e) {
      toast({ title: "Eroare PDF", description: "Nu am reușit să generez PDF-ul.", variant: "destructive" });
    }
  };

  const issuesByCategory = (cat: Category) => result.issues.filter((i) => i.category === cat);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="card-premium rounded-2xl p-6 sm:p-10 text-center">
        <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm mb-3">
          <Globe size={16} />
          <span className="truncate max-w-md">{result.url}</span>
        </div>
        <ScoreCircle score={result.overallScore} size={200} label="Scor general" />
        <p className="text-muted-foreground mt-4 max-w-md mx-auto">
          {result.overallScore >= 80
            ? "Excelent! Site-ul tău este într-o formă foarte bună."
            : result.overallScore >= 50
              ? "Bun, dar există loc de îmbunătățire. Vezi recomandările de mai jos."
              : "Site-ul are probleme serioase care îi afectează vizibilitatea și performanța."}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <Button variant="professional" size="lg" onClick={handleDownload}>
            <Download size={18} /> Descarcă PDF
          </Button>
          <Button variant="outline" size="lg" onClick={onReset}>
            <RotateCcw size={18} /> Analizează alt site
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="grid gap-4">
        {CATEGORIES.map((cat) => (
          <CategoryCard key={cat} category={cat} score={result.categoryScores[cat]} issues={issuesByCategory(cat)} />
        ))}
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Timp răspuns", value: `${result.fetchMs}ms` },
          { label: "Mărime HTML", value: `${(result.htmlBytes / 1024).toFixed(0)} KB` },
          { label: "Imagini", value: `${result.metadata.imagesTotal}` },
          { label: "Probleme", value: `${result.issues.length}` },
        ].map((s) => (
          <div key={s.label} className="card-premium rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tech & infra detected */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card-premium rounded-xl p-5">
          <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">
            Tehnologii detectate
          </h4>
          {result.metadata.technologies.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nicio tehnologie cunoscută detectată.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {result.metadata.technologies.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/30"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="card-premium rounded-xl p-5 space-y-3">
          <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">
            Indexare & crawling
          </h4>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">robots.txt</span>
            <span className={result.metadata.robotsTxt.found ? "text-emerald-500 font-semibold" : "text-destructive font-semibold"}>
              {result.metadata.robotsTxt.found ? "✓ Găsit" : "✗ Lipsește"}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Sitemap în robots.txt</span>
            <span className={result.metadata.robotsTxt.hasSitemap ? "text-emerald-500 font-semibold" : "text-amber-500 font-semibold"}>
              {result.metadata.robotsTxt.hasSitemap ? "✓ Da" : "— Nu"}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">sitemap.xml</span>
            <span className={result.metadata.sitemapXml.found ? "text-emerald-500 font-semibold" : "text-destructive font-semibold"}>
              {result.metadata.sitemapXml.found
                ? `✓ ${result.metadata.sitemapXml.urlCount} URL-uri`
                : "✗ Lipsește"}
            </span>
          </div>
        </div>
      </div>

      {/* Web Vitals (heuristic) */}
      <div className="card-premium rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
            Core Web Vitals (estimat)
          </h4>
          <span className="text-xs text-muted-foreground">heuristic, nu Lighthouse real</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { key: "LCP", label: "Largest Contentful Paint", score: result.metadata.vitals.lcpScore },
            { key: "CLS", label: "Cumulative Layout Shift", score: result.metadata.vitals.clsScore },
          ].map((v) => {
            const color = v.score >= 80 ? "text-emerald-500" : v.score >= 50 ? "text-amber-500" : "text-destructive";
            return (
              <div key={v.key} className="bg-secondary/30 rounded-lg p-4">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className={`text-3xl font-bold ${color}`}>{v.score}</span>
                  <span className="text-sm font-semibold text-foreground">{v.key}</span>
                </div>
                <p className="text-xs text-muted-foreground">{v.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* DNS records */}
      {result.metadata.dns && (
        <div className="card-premium rounded-xl p-5 space-y-3">
          <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">
            DNS & email security (Cloudflare DoH)
          </h4>
          {[
            { label: "Record-uri A (IPv4)", ok: result.metadata.dns.hasA, value: result.metadata.dns.aRecords.slice(0, 2).join(", ") || "—" },
            { label: "Record-uri AAAA (IPv6)", ok: result.metadata.dns.hasAAAA, value: result.metadata.dns.hasAAAA ? "Da" : "Nu" },
            { label: "MX (servere email)", ok: result.metadata.dns.hasMx, value: result.metadata.dns.hasMx ? `${result.metadata.dns.mxRecords.length} record(uri)` : "Nu" },
            { label: "SPF", ok: result.metadata.dns.hasSpf, value: result.metadata.dns.hasSpf ? "Configurat" : "Lipsește" },
            { label: "DMARC", ok: result.metadata.dns.hasDmarc, value: result.metadata.dns.hasDmarc ? "Configurat" : "Lipsește" },
            { label: "CAA", ok: result.metadata.dns.hasCaa, value: result.metadata.dns.hasCaa ? "Configurat" : "Lipsește" },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between text-sm border-b border-border/50 pb-2 last:border-0 last:pb-0">
              <span className="text-muted-foreground">{row.label}</span>
              <span className={`font-semibold text-right truncate max-w-[60%] ${row.ok ? "text-emerald-500" : "text-amber-500"}`}>
                {row.ok ? "✓ " : "— "}
                {row.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Security Headers + Privacy */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card-premium rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
              Headere de securitate HTTP
            </h4>
            {!result.metadata.securityHeaders.available && (
              <span className="text-[10px] text-muted-foreground italic">indisponibile via proxy</span>
            )}
          </div>
          {result.metadata.securityHeaders.available ? (
            [
              { label: "HSTS", ok: result.metadata.securityHeaders.hsts },
              { label: "Content-Security-Policy", ok: result.metadata.securityHeaders.csp },
              { label: "X-Frame-Options", ok: result.metadata.securityHeaders.xFrameOptions },
              { label: "X-Content-Type-Options", ok: result.metadata.securityHeaders.xContentTypeOptions },
              { label: "Referrer-Policy", ok: result.metadata.securityHeaders.referrerPolicy },
              { label: "Permissions-Policy", ok: result.metadata.securityHeaders.permissionsPolicy },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between text-sm border-b border-border/50 pb-2 last:border-0 last:pb-0">
                <span className="text-muted-foreground">{row.label}</span>
                <span className={`font-semibold ${row.ok ? "text-emerald-500" : "text-amber-500"}`}>
                  {row.ok ? "✓ Activ" : "— Lipsește"}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              Proxy-ul CORS nu expune headerele site-ului real. Pentru verificare exactă folosește securityheaders.com.
            </p>
          )}
        </div>

        <div className="card-premium rounded-xl p-5 space-y-3">
          <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">
            Privacy & GDPR
          </h4>
          <div className="flex items-center justify-between text-sm border-b border-border/50 pb-2">
            <span className="text-muted-foreground">Banner de cookies</span>
            <span className={`font-semibold ${result.metadata.privacy.cookieBanner ? "text-emerald-500" : "text-amber-500"}`}>
              {result.metadata.privacy.cookieBanner ? "✓ Detectat" : "— Negăsit"}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm border-b border-border/50 pb-2">
            <span className="text-muted-foreground">Google Fonts CDN extern</span>
            <span className={`font-semibold ${!result.metadata.privacy.googleFontsExternal ? "text-emerald-500" : "text-amber-500"}`}>
              {result.metadata.privacy.googleFontsExternal ? "⚠ Da (risc GDPR)" : "✓ Nu"}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm border-b border-border/50 pb-2">
            <span className="text-muted-foreground">Scripturi de tracking</span>
            <span className="font-semibold text-foreground text-right max-w-[60%] truncate">
              {result.metadata.privacy.trackingScripts.length > 0
                ? result.metadata.privacy.trackingScripts.join(", ")
                : "Niciunul"}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm border-b border-border/50 pb-2">
            <span className="text-muted-foreground">security.txt</span>
            <span className={`font-semibold ${result.metadata.securityTxt ? "text-emerald-500" : "text-muted-foreground"}`}>
              {result.metadata.securityTxt ? "✓ Da" : "— Nu"}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">llms.txt (AI)</span>
            <span className={`font-semibold ${result.metadata.llmsTxt ? "text-emerald-500" : "text-muted-foreground"}`}>
              {result.metadata.llmsTxt ? "✓ Da" : "— Nu"}
            </span>
          </div>
        </div>
      </div>

      {/* Modern Web / PWA */}
      <div className="card-premium rounded-xl p-5">
        <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">
          Web modern & PWA
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Web Manifest", ok: result.metadata.modernWeb.hasManifest },
            { label: "theme-color", ok: result.metadata.modernWeb.hasThemeColor },
            { label: "Apple Touch Icon", ok: result.metadata.modernWeb.hasAppleTouchIcon },
            { label: "og:image", ok: result.metadata.modernWeb.hasOgImage },
          ].map((row) => (
            <div key={row.label} className="bg-secondary/30 rounded-lg p-3 text-center">
              <p className={`text-2xl font-bold ${row.ok ? "text-emerald-500" : "text-muted-foreground/60"}`}>
                {row.ok ? "✓" : "—"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{row.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl p-8 text-center bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/30">
        <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Vrei să remediem aceste probleme?</h3>
        <p className="text-muted-foreground max-w-xl mx-auto mb-6">
          WebCraft te ajută cu redesign profesional, optimizare SEO, hosting și mentenanță. Pachete fixe, fără surprize.
        </p>
        <Button variant="professional" size="xl" asChild>
          <a href="/#contact">Cere ofertă gratuită</a>
        </Button>
      </div>
    </div>
  );
};

export default AuditDashboard;
