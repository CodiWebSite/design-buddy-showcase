import { Check, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

const pricingPlans = [
  {
    name: "Starter",
    tagline: "Pentru afaceri care își fac primul site profesionist",
    features: [
      "Site one-page sau până la 3 secțiuni",
      "Design personalizat",
      "Optimizare SEO de bază",
      "Formular de contact",
      "Hosting premium 1 an inclus",
      "Certificat SSL gratuit",
      "Suport 30 zile după lansare",
    ],
    popular: false,
  },
  {
    name: "Business",
    tagline: "Pentru companii care vor să atragă clienți constant",
    features: [
      "Site multi-pagină (până la 10)",
      "Design premium personalizat",
      "Optimizare SEO avansată",
      "Blog & galerie integrate",
      "Hosting premium 1 an inclus",
      "Certificat SSL gratuit",
      "Panou simplu de administrare",
      "Suport 90 zile + training",
    ],
    popular: true,
  },
  {
    name: "Premium",
    tagline: "Pentru proiecte complexe, branduri și e-commerce",
    features: [
      "Pagini nelimitate, structură custom",
      "UI/UX exclusiv, animații rafinate",
      "E-commerce sau funcționalități custom",
      "SEO avansat & integrări",
      "Hosting premium 1 an inclus",
      "Certificat SSL gratuit",
      "Integrări API & analytics",
      "Suport prioritar 12 luni",
    ],
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section id="preturi" className="py-20 lg:py-28 relative bg-background">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary font-semibold text-xs uppercase tracking-widest mb-5">
            Pachete
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Pachete clare. <span className="text-gradient">Ofertă personalizată.</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Fiecare proiect e diferit, așa că prețul îl stabilim împreună după o discuție scurtă.
            Toate pachetele includ hosting premium în primul an.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative card-premium rounded-2xl p-8 flex flex-col ${
                plan.popular ? "ring-2 ring-primary" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider">
                    Cel mai ales
                  </span>
                </div>
              )}

              <div className="text-center mb-6 pt-2">
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{plan.tagline}</p>
              </div>

              <div className="text-center mb-8 py-6 border-y border-border">
                <div className="font-display text-3xl font-bold text-gradient">La cerere</div>
                <span className="text-muted-foreground text-sm">Ofertă în 24h</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground/90 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "professional" : "outline"}
                size="lg"
                className="w-full"
                asChild
              >
                <a href="#contact">Cere ofertă</a>
              </Button>
            </div>
          ))}
        </div>

        {/* Maintenance upsell */}
        <div className="max-w-5xl mx-auto mt-12">
          <div className="card-premium glow-border rounded-2xl p-8 lg:p-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
              <Sparkles className="w-7 h-7 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
                Adaugă mentenanță lunară pentru liniște completă
              </h3>
              <p className="text-muted-foreground">
                Actualizări, modificări de conținut, backup-uri, securitate și suport — totul inclus
                într-un abonament lunar predictibil.
              </p>
            </div>
            <Button variant="professional" size="lg" asChild>
              <a href="#contact">Vreau detalii</a>
            </Button>
          </div>
        </div>

        <div className="text-center mt-10">
          <p className="text-muted-foreground">
            Ai nevoie de ceva personalizat?{" "}
            <a href="#contact" className="text-primary hover:underline font-medium">
              Discută cu noi
            </a>{" "}
            — răspundem în 24h.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
