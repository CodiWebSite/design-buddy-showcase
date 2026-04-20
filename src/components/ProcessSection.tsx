import { MessageCircle, Compass, Code2, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    title: "Discuție inițială",
    desc: "Înțelegem afacerea, obiectivele și publicul tău. Stabilim împreună scopul site-ului și bugetul.",
  },
  {
    icon: Compass,
    title: "Direcție & structură",
    desc: "Propunem o direcție vizuală clară și o structură de pagini gândită pentru conversie.",
  },
  {
    icon: Code2,
    title: "Dezvoltare",
    desc: "Construim site-ul cu cod curat, optimizat pentru viteză, mobil și motoarele de căutare.",
  },
  {
    icon: Rocket,
    title: "Lansare & suport",
    desc: "Punem site-ul live, te învățăm cum funcționează și rămânem alături pentru orice nevoie.",
  },
];

const ProcessSection = () => {
  return (
    <section id="proces" className="py-20 lg:py-28 bg-background relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary font-semibold text-xs uppercase tracking-widest mb-5">
            Proces
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Cum lucrăm <span className="text-gradient">împreună</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Un proces simplu, transparent și predictibil. Știi exact la ce să te aștepți la fiecare pas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, i) => (
            <div key={step.title} className="relative card-premium rounded-2xl p-7 hover-lift">
              <div className="absolute -top-4 -left-2 font-display text-6xl font-bold text-primary/15 leading-none select-none">
                0{i + 1}
              </div>
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-5">
                  <step.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
