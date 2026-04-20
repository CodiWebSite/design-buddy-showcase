import { ArrowUpRight } from "lucide-react";

const screenshot = (url: string, wait = 3, viewport = 1280) =>
  `https://image.thum.io/get/width/1280/crop/800/viewportWidth/${viewport}/wait/${wait}/noanimate/png/${url}`;

const portfolioItems = [
  {
    title: "DJ Funky Events",
    business: "DJ & Evenimente",
    challenge:
      "Avea nevoie de o prezență online care să transmită profesionalism și să simplifice cererile de booking.",
    solution:
      "Site premium cu galerie, prezentare servicii, formular de rezervare și radio live integrat.",
    url: "https://djfunkyevents.ro/",
    image: screenshot("https://djfunkyevents.ro/"),
    tags: ["Booking", "Radio Live", "Mobil-first"],
  },
  {
    title: "InstalPro Pașcani",
    business: "Servicii & Magazin",
    challenge:
      "Trebuia să prezinte clar atât serviciile, cât și un catalog de produse pentru clienți locali.",
    solution:
      "Platformă cu structură de servicii, catalog și CTA-uri clare pentru contact și comandă.",
    url: "https://instalpropascani.ro/",
    image: screenshot("https://instalpropascani.ro/"),
    tags: ["Catalog", "Servicii", "Local SEO"],
  },
  {
    title: "DJ Cozo",
    business: "Brand personal artistic",
    challenge:
      "Voia un site care să iasă din tipare și să-l diferențieze față de alți DJ.",
    solution:
      "Design imersiv, animații rafinate și o prezentare artistică memorabilă.",
    url: "https://dj-cozo.ro/",
    image: screenshot("https://dj-cozo.ro/", 15, 1440),
    tags: ["Design Premium", "Animații", "Brand"],
  },
  {
    title: "Radio DJ Funky Events",
    business: "Radio Online",
    challenge:
      "Avea nevoie de o platformă dedicată streamingului live, ușor de accesat.",
    solution:
      "Player audio dedicat, interfață curată și integrare cu site-ul principal.",
    url: "https://radio.djfunkyevents.ro/",
    image: screenshot("https://radio.djfunkyevents.ro/"),
    tags: ["Streaming", "Audio", "Live"],
  },
];

const PortfolioSection = () => {
  return (
    <section id="portofoliu" className="py-24 lg:py-32 relative bg-background overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary font-semibold text-xs uppercase tracking-widest mb-5">
            Studii de caz
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
            Proiecte <span className="text-gradient">care au sens</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Site-uri reale, livrate clienților reali. Fiecare proiect a pornit de la o problemă concretă
            și s-a încheiat cu o soluție de care suntem mândri.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {portfolioItems.map((item) => (
            <a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group card-premium glow-border rounded-2xl overflow-hidden hover-lift block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <div className="relative h-56 overflow-hidden bg-muted">
                <img
                  src={item.image}
                  alt={`Screenshot ${item.title}`}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent opacity-60" />
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="w-5 h-5 text-primary" />
                </div>
              </div>

              <div className="p-6 lg:p-7">
                <span className="text-primary text-xs font-semibold uppercase tracking-wider">
                  {item.business}
                </span>
                <h3 className="font-display text-xl lg:text-2xl font-bold mt-2 mb-4 text-foreground">
                  {item.title}
                </h3>

                <div className="space-y-3 mb-5">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-1">
                      Provocare
                    </div>
                    <p className="text-sm text-foreground/90 leading-relaxed">{item.challenge}</p>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-1">
                      Soluție
                    </div>
                    <p className="text-sm text-foreground/90 leading-relaxed">{item.solution}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
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

        <div className="text-center mt-14">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-glow font-semibold transition-colors"
          >
            Vrei să fii următorul proiect? <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
