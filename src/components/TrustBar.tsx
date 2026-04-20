import { Clock, Shield, Headphones, Award } from "lucide-react";

const items = [
  { icon: Clock, label: "Livrare 14–30 zile" },
  { icon: Award, label: "Design 100% personalizat" },
  { icon: Shield, label: "Hosting & SSL incluse" },
  { icon: Headphones, label: "Suport real, nu robot" },
];

const clientTypes = [
  "Afaceri locale",
  "DJ & Evenimente",
  "Branduri personale",
  "Servicii & Instalatori",
  "Artiști",
];

const TrustBar = () => {
  return (
    <section className="py-12 lg:py-16 border-y border-border bg-card/30">
      <div className="container mx-auto px-4 lg:px-8">
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-6">
          Lucrăm cu
        </p>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10">
          {clientTypes.map((c) => (
            <span key={c} className="text-foreground/80 font-display font-medium text-sm md:text-base">
              {c}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
