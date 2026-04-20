import { useMemo, useState } from "react";
import { Calculator, Check, ArrowRight } from "lucide-react";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";

type SiteType = "prezentare" | "magazin" | "custom";

const siteTypes: { id: SiteType; label: string; basePrice: number; desc: string }[] = [
  { id: "prezentare", label: "Site de prezentare", basePrice: 2500, desc: "Pentru afaceri locale, branduri personale, servicii." },
  { id: "magazin", label: "Magazin online", basePrice: 4500, desc: "E-commerce cu produse, coș, plăți, gestionare comenzi." },
  { id: "custom", label: "Aplicație custom", basePrice: 7500, desc: "Funcționalități unice, integrări, dashboard, automatizări." },
];

const options = [
  { id: "multilingv", label: "Multilingv (RO + EN)", price: 800 },
  { id: "blog", label: "Modul blog", price: 600 },
  { id: "rezervari", label: "Sistem rezervări online", price: 1200 },
  { id: "seo", label: "SEO Start (audit + optimizări)", price: 900 },
  { id: "copywriting", label: "Copywriting profesional", price: 700 },
] as const;

const PriceCalculator = () => {
  const [type, setType] = useState<SiteType>("prezentare");
  const [pages, setPages] = useState(5);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  const breakdown = useMemo(() => {
    const base = siteTypes.find((t) => t.id === type)!;
    const pagesExtra = Math.max(0, pages - 5) * 250;
    const opts = options.filter((o) => selected.has(o.id));
    const optionsTotal = opts.reduce((s, o) => s + o.price, 0);
    const total = base.basePrice + pagesExtra + optionsTotal;
    return { base, pagesExtra, opts, optionsTotal, total, pages };
  }, [type, pages, selected]);

  const buildContactHref = () => {
    const summary = encodeURIComponent(
      `Vreau o ofertă pentru: ${breakdown.base.label}, ${pages} pagini${
        breakdown.opts.length ? ", + " + breakdown.opts.map((o) => o.label).join(", ") : ""
      }. Estimare: ${breakdown.total.toLocaleString("ro-RO")} RON.`
    );
    return `/#contact?config=${summary}`;
  };

  return (
    <section id="calculator" className="py-24 lg:py-32 relative bg-background overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary font-semibold text-xs uppercase tracking-widest mb-5">
            Estimare instant
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Calculează <span className="text-gradient">prețul orientativ</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Configurează ce vrei, vezi estimarea în RON pe loc. Oferta finală o discutăm împreună.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6">
          {/* Configurator */}
          <div className="lg:col-span-2 card-premium glow-border rounded-3xl p-6 lg:p-8 space-y-8">
            {/* Type */}
            <div>
              <label className="block font-display font-semibold mb-3">Tipul de site</label>
              <div className="grid sm:grid-cols-3 gap-3">
                {siteTypes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setType(t.id)}
                    className={`text-left p-4 rounded-xl border-2 transition-all ${
                      type === t.id
                        ? "border-primary bg-primary/10"
                        : "border-border bg-secondary/40 hover:border-primary/50"
                    }`}
                  >
                    <div className="font-semibold text-sm mb-1">{t.label}</div>
                    <div className="text-xs text-muted-foreground leading-snug">{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Pages */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="font-display font-semibold">Număr de pagini</label>
                <span className="text-primary font-bold text-lg">{pages}</span>
              </div>
              <Slider value={[pages]} min={3} max={25} step={1} onValueChange={(v) => setPages(v[0])} />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>3</span><span>25+</span>
              </div>
            </div>

            {/* Options */}
            <div>
              <label className="block font-display font-semibold mb-3">Opțiuni adiționale</label>
              <div className="grid sm:grid-cols-2 gap-3">
                {options.map((o) => {
                  const active = selected.has(o.id);
                  return (
                    <button
                      key={o.id}
                      onClick={() => toggle(o.id)}
                      className={`flex items-center justify-between gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                        active
                          ? "border-primary bg-primary/10"
                          : "border-border bg-secondary/40 hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          active ? "border-primary bg-primary" : "border-border"
                        }`}>
                          {active && <Check className="w-3 h-3 text-primary-foreground" />}
                        </div>
                        <span className="text-sm font-medium">{o.label}</span>
                      </div>
                      <span className="text-xs text-primary font-semibold">+{o.price} RON</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="card-premium glow-border rounded-3xl p-6 lg:p-8 lg:sticky lg:top-28 self-start">
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="w-5 h-5 text-primary" />
              <h3 className="font-display font-bold">Estimarea ta</h3>
            </div>

            <div className="space-y-2 text-sm border-b border-border pb-4 mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{breakdown.base.label}</span>
                <span className="font-semibold">{breakdown.base.basePrice.toLocaleString("ro-RO")} RON</span>
              </div>
              {breakdown.pagesExtra > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">+ {pages - 5} pagini extra</span>
                  <span className="font-semibold">{breakdown.pagesExtra.toLocaleString("ro-RO")} RON</span>
                </div>
              )}
              {breakdown.opts.map((o) => (
                <div key={o.id} className="flex justify-between">
                  <span className="text-muted-foreground">+ {o.label}</span>
                  <span className="font-semibold">{o.price} RON</span>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <div className="text-xs text-muted-foreground mb-1">Total estimativ</div>
              <div className="font-display text-4xl font-bold text-gradient">
                {breakdown.total.toLocaleString("ro-RO")} RON
              </div>
              <div className="text-xs text-muted-foreground mt-1">+ TVA, dacă aplicabil</div>
            </div>

            <Button variant="professional" size="lg" className="w-full" asChild>
              <a href={buildContactHref()}>
                Cere ofertă fermă <ArrowRight className="ml-1 w-4 h-4" />
              </a>
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-3">
              Răspuns în maxim 24h
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceCalculator;
