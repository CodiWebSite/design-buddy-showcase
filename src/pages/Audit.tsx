import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ShieldCheck, Zap, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuditForm from "@/components/audit/AuditForm";
import AuditLoader from "@/components/audit/AuditLoader";
import AuditDashboard from "@/components/audit/AuditDashboard";
import { runAudit } from "@/lib/audit/runAudit";
import type { AuditResult } from "@/lib/audit/types";
import { useToast } from "@/hooks/use-toast";

const Audit = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<AuditResult | null>(null);

  const handleAudit = async (url: string) => {
    setLoading(true);
    setResult(null);
    setStep(0);
    try {
      const res = await runAudit(url, (s) => setStep(s));
      setResult(res);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Eroare necunoscută";
      toast({
        title: "Audit eșuat",
        description: `${msg}. Verifică URL-ul și încearcă din nou.`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setStep(0);
  };

  return (
    <>
      <Helmet>
        <title>Audit Website Gratuit - SEO, Securitate, Performanță | WebCraft</title>
        <meta
          name="description"
          content="Analizează gratuit site-ul tău: SEO, securitate, performanță și UX. Primește raport PDF complet cu recomandări de remediere."
        />
        <link rel="canonical" href="https://webcraft.djfunkyevents.ro/audit" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-28 pb-20">
          <div className="container mx-auto px-4 lg:px-8">
            {!result && !loading && (
              <div className="text-center max-w-3xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-semibold mb-6">
                  <ShieldCheck size={16} />
                  Audit website 100% gratuit
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                  Cât de bun este <span className="text-gradient">site-ul tău</span>?
                </h1>
                <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
                  Analizez în câteva secunde SEO, securitate, performanță, infrastructură și UX. Primești scor 0-100 și
                  raport PDF cu recomandări concrete.
                </p>
              </div>
            )}

            {!result && (
              <div className="mb-12">
                <AuditForm onSubmit={handleAudit} loading={loading} />
              </div>
            )}

            {loading && (
              <div className="my-12">
                <AuditLoader currentStep={step} />
              </div>
            )}

            {!result && !loading && (
              <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
                {[
                  { icon: Search, title: "SEO complet", desc: "Title, meta, headings, Open Graph, structură" },
                  { icon: ShieldCheck, title: "Securitate", desc: "HTTPS, mixed content, headers, CMS expus" },
                  { icon: Zap, title: "Performanță", desc: "Timp răspuns, mărime, scripturi, cache" },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="card-premium rounded-xl p-6 text-center">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                      <Icon size={24} />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">{title}</h3>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                ))}
              </div>
            )}

            {result && (
              <div className="max-w-4xl mx-auto">
                <AuditDashboard result={result} onReset={handleReset} />
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Audit;
