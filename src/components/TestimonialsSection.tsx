import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Codrin C.",
    role: "DJ Funky Events",
    quote:
      "Au înțeles din prima ce vreau. Am acum un site care arată profesionist și prin care primesc cereri de booking direct din Google. Recomand fără ezitare.",
  },
  {
    name: "Scuturasu C.",
    role: "InstalPro Pașcani",
    quote:
      "Aveam nevoie de un site serios pentru servicii și produse. S-a făcut treabă curată, rapid și cu suport real după lansare. Comunicare excelentă.",
  },
  {
    name: "David C.",
    role: "DJ Cozo",
    quote:
      "Site-ul arată exact cum mi-am dorit — modern și diferit. Mi-a crescut credibilitatea în fața clienților din evenimente.",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimoniale" className="py-20 lg:py-28 bg-gradient-card relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary font-semibold text-xs uppercase tracking-widest mb-5">
            Testimoniale
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ce spun <span className="text-gradient">clienții</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Părerile celor cu care am lucrat contează mai mult decât orice promisiune.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((t) => (
            <div key={t.name} className="card-premium rounded-2xl p-7 flex flex-col hover-lift">
              <Quote className="w-8 h-8 text-primary mb-4" />
              <div className="flex gap-1 mb-4" aria-label="5 din 5 stele">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground/90 leading-relaxed mb-6 flex-1">„{t.quote}"</p>
              <div className="border-t border-border pt-4">
                <div className="font-display font-semibold text-foreground">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
