import { Check } from "lucide-react";
import { Button } from "./ui/button";

const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect pentru freelanceri și afaceri mici",
    price: "499",
    period: "proiect",
    features: [
      "Site one-page responsive",
      "Design modern personalizat",
      "Optimizare SEO de bază",
      "Formular de contact",
      "Hosting 1 an inclus",
      "Certificat SSL gratuit",
      "Suport 30 zile",
    ],
    popular: false,
    hosting: {
      price: "99",
      period: "an",
      features: ["5GB spațiu", "10GB trafic/lună", "1 email inclus"],
    },
  },
  {
    name: "Business",
    description: "Ideal pentru companii în creștere",
    price: "999",
    period: "proiect",
    features: [
      "Site multi-pagină (până la 10)",
      "Design premium exclusiv",
      "Optimizare SEO avansată",
      "Blog integrat",
      "Hosting 1 an inclus",
      "Certificat SSL gratuit",
      "Panou administrare",
      "Suport 90 zile",
      "Training utilizare",
    ],
    popular: true,
    hosting: {
      price: "199",
      period: "an",
      features: ["20GB spațiu", "100GB trafic/lună", "5 email-uri", "Backup zilnic"],
    },
  },
  {
    name: "Enterprise",
    description: "Soluții complete pentru afaceri mari",
    price: "2499",
    period: "proiect",
    features: [
      "Site nelimitat pagini",
      "Design exclusiv cu UI/UX",
      "E-commerce integrat",
      "SEO & Marketing digital",
      "Hosting 1 an inclus",
      "Certificat SSL gratuit",
      "Integrări API custom",
      "Suport prioritar 12 luni",
      "Rapoarte analytics",
      "Mentenanță inclusă",
    ],
    popular: false,
    hosting: {
      price: "399",
      period: "an",
      features: ["100GB spațiu", "Trafic nelimitat", "Email-uri nelimitate", "Backup orar", "CDN Global"],
    },
  },
];

const PricingSection = () => {
  return (
    <section id="preturi" className="py-20 lg:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Prețuri</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Pachete <span className="text-gradient">Transparente</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Alegem împreună pachetul potrivit pentru afacerea ta. 
            Toate prețurile includ hosting primul an.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-6 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative glass-card rounded-2xl p-8 ${
                plan.popular ? "ring-2 ring-primary glow-effect" : ""
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-sm font-semibold px-4 py-1 rounded-full">
                    Cel mai popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-display font-bold text-gradient">{plan.price}</span>
                  <span className="text-muted-foreground">€</span>
                </div>
                <span className="text-muted-foreground text-sm">/{plan.period}</span>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Hosting Info */}
              <div className="border-t border-border pt-6 mb-8">
                <div className="text-center mb-4">
                  <span className="text-sm text-muted-foreground">Reînnoire hosting anual:</span>
                  <div className="font-display font-bold text-foreground">
                    {plan.hosting.price}€<span className="text-muted-foreground font-normal">/{plan.hosting.period}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {plan.hosting.features.map((feature, hIndex) => (
                    <span key={hIndex} className="text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <Button
                variant={plan.popular ? "hero" : "outline"}
                size="lg"
                className="w-full"
              >
                Solicită Ofertă
              </Button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Ai nevoie de ceva personalizat? <a href="#contact" className="text-primary hover:underline">Contactează-ne</a> pentru o ofertă specială.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
