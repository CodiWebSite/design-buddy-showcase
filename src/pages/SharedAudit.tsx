import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Loader2, AlertTriangle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuditDashboard from "@/components/audit/AuditDashboard";
import { Button } from "@/components/ui/button";
import { loadAudit } from "@/lib/audit/saveAudit";
import type { AuditResult } from "@/lib/audit/types";

const SharedAudit = () => {
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<AuditResult | null>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "missing">("loading");

  useEffect(() => {
    if (!id) return;
    let active = true;
    loadAudit(id).then((r) => {
      if (!active) return;
      if (r) {
        setResult(r);
        setStatus("ok");
      } else {
        setStatus("missing");
      }
    });
    return () => {
      active = false;
    };
  }, [id]);

  useEffect(() => {
    if (!result) {
      document.title = "Raport audit | WebCraft";
      return;
    }
    try {
      const host = new URL(result.url).hostname;
      document.title = `Audit ${host} - scor ${result.overallScore}/100 | WebCraft`;
    } catch {
      document.title = "Raport audit | WebCraft";
    }
  }, [result]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          {status === "loading" && (
            <div className="flex flex-col items-center justify-center py-32 text-muted-foreground">
              <Loader2 className="w-10 h-10 animate-spin mb-4 text-primary" />
              <p>Se încarcă raportul...</p>
            </div>
          )}

          {status === "missing" && (
            <div className="max-w-md mx-auto text-center py-24">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 text-destructive mb-6">
                <AlertTriangle size={32} />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-3">Raport indisponibil</h1>
              <p className="text-muted-foreground mb-8">
                Linkul nu este valid sau raportul a fost șters. Poți rula un audit nou gratuit.
              </p>
              <Button variant="professional" size="lg" asChild>
                <Link to="/audit">Rulează un audit nou</Link>
              </Button>
            </div>
          )}

          {status === "ok" && result && id && (
            <div className="max-w-4xl mx-auto">
              <div className="mb-6 text-center">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
                  Raport partajat
                </span>
              </div>
              <AuditDashboard result={result} shareId={id} />
              <div className="mt-10 text-center">
                <Button variant="outline" size="lg" asChild>
                  <Link to="/audit">Auditează propriul site</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SharedAudit;