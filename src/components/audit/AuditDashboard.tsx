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

      {/* CTA */}
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
