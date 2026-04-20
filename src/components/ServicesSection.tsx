import { Code, Palette, RefreshCw, Search, Server, LifeBuoy } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Web Design",
    description:
      "Design personalizat, gândit pentru publicul tău și pentru obiectivele afacerii. Nu vinzi pixeli, vinzi încredere.",
  },
  {
    icon: Code,
    title: "Dezvoltare Web",
    description:
      "Cod modern, rapid și ușor de întreținut. Site-ul tău rulează curat pe orice dispozitiv și browser.",
  },
  {
    icon: RefreshCw,
    title: "Redesign Website",
    description:
      "Ai un site vechi care nu mai aduce rezultate? Îl reconstruim ca să arate și să convertească mai bine.",
  },
  {
    icon: Search,
    title: "SEO Setup",
    description:
      "Optimizare de bază pentru Google: structură curată, viteză, meta-date și vizibilitate locală.",
  },
  {
    icon: Server,
    title: "Hosting Premium",
    description:
      "Servere rapide, SSL inclus, backup-uri zilnice și uptime real. Site-ul tău e mereu online.",
  },
  {
    icon: LifeBuoy,
    title: "Mentenanță & Suport",
    description:
      "Actualizări, modificări de conținut, securitate și un om real căruia îi poți scrie când ai nevoie.",
  },
];

const ServicesSection = () => {
  return (
    <section id="servicii" className="py-20 lg:py-28 bg-gradient-card relative">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary font-semibold text-xs uppercase tracking-widest mb-5">
            Servicii
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Tot ce ai nevoie pentru o <span className="text-gradient">prezență online serioasă</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            De la primul concept până la mentenanța lunară. Lucrezi cu o singură echipă, nu cu cinci.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="group card-professional card-premium rounded-xl p-8 hover-lift"
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
