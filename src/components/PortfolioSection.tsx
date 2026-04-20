import { ExternalLink, ArrowUpRight } from "lucide-react";

const portfolioItems = [
  {
    title: "DJ Funky Events",
    category: "Site Evenimente & Booking",
    description: "Platformă premium pentru DJ profesionist cu sistem de rezervări, galerie și radio live integrat.",
    url: "https://djfunkyevents.ro/",
    image: `https://api.microlink.io/?url=https://djfunkyevents.ro/&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=800`,
    tags: ["Booking", "Galerie", "Radio Live"],
  },
  {
    title: "InstalPro Pașcani",
    category: "Magazin Online & Servicii",
    description: "Magazin online complet pentru servicii casnice și industriale: climatizare, centrale, scule profesionale.",
    url: "https://instalpropascani.ro/",
    image: `https://api.microlink.io/?url=https://instalpropascani.ro/&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=800`,
    tags: ["E-Commerce", "Catalog", "Servicii"],
  },
  {
    title: "DJ Cozo",
    category: "Portfolio Artistic",
    description: "Site personal pentru DJ Cozo cu design imersiv, animații premium și prezentare artistică.",
    url: "https://dj-cozo.ro/",
    image: `https://api.microlink.io/?url=https://dj-cozo.ro/&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=800`,
    tags: ["Portfolio", "Animații", "Design Premium"],
  },
  {
    title: "Radio DJ Funky Events",
    category: "Radio Online",
    description: "Platformă radio online live pentru DJ Funky Events cu streaming audio și interfață modernă.",
    url: "https://radio.djfunkyevents.ro/",
    image: `https://api.microlink.io/?url=https://radio.djfunkyevents.ro/&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=800`,
    tags: ["Radio Live", "Streaming", "Audio"],
  },
];

const PortfolioSection = () => {
  return (
    <section id="portofoliu" className="py-24 lg:py-32 relative bg-background overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary font-semibold text-xs uppercase tracking-widest mb-5">
            Portofoliu
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
            Proiecte <span className="text-gradient">Realizate</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Site-uri reale, livrate clienților reali. Fiecare proiect este construit cu atenție 
            la detalii și optimizat pentru rezultate.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {portfolioItems.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group card-premium glow-border rounded-2xl overflow-hidden hover-lift block"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden bg-muted">
                <img
                  src={item.image}
                  alt={`Screenshot ${item.title}`}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent opacity-60" />
                
                {/* External link badge */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                  <ArrowUpRight className="w-5 h-5 text-primary" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 lg:p-7">
                <span className="text-primary text-xs font-semibold uppercase tracking-wider">{item.category}</span>
                <h3 className="font-display text-xl lg:text-2xl font-bold mt-2 mb-3 text-foreground group-hover:text-gradient transition-all">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{item.description}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-xs rounded-full bg-secondary/60 text-muted-foreground font-medium border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <p className="text-muted-foreground mb-2">Mai multe proiecte se adaugă în curând</p>
          <a href="#contact" className="inline-flex items-center gap-2 text-primary hover:text-primary-glow font-semibold transition-colors">
            Vrei să fii următorul? <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
