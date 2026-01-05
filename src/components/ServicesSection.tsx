import { Code, Palette, Rocket, Shield, Server, Headphones } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Web Design",
    description: "Design-uri profesionale și moderne care reflectă identitatea brandului tău și inspiră încredere.",
  },
  {
    icon: Code,
    title: "Dezvoltare Web",
    description: "Cod curat și performant folosind cele mai noi tehnologii pentru o experiență utilizator excelentă.",
  },
  {
    icon: Rocket,
    title: "Optimizare SEO",
    description: "Strategii SEO profesionale pentru a-ți crește vizibilitatea în motoarele de căutare.",
  },
  {
    icon: Server,
    title: "Hosting Premium",
    description: "Servere rapide și sigure cu uptime 99.9%, backup-uri zilnice și suport tehnic dedicat.",
  },
  {
    icon: Shield,
    title: "Securitate Web",
    description: "Certificat SSL, protecție DDoS, firewall avansat și monitorizare 24/7.",
  },
  {
    icon: Headphones,
    title: "Suport Dedicat",
    description: "Asistență tehnică rapidă și profesională pentru orice întrebări sau modificări.",
  },
];

const ServicesSection = () => {
  return (
    <section id="servicii" className="py-20 lg:py-28 bg-gradient-card relative">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Servicii</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Soluții Complete Web
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            De la concept la lansare și mentenanță, oferim tot ce ai nevoie 
            pentru o prezență online de succes.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group card-professional rounded-xl p-8 hover-lift transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;