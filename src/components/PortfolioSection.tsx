import { ExternalLink } from "lucide-react";

const portfolioItems = [
  {
    title: "E-Commerce Fashion",
    category: "Magazin Online",
    description: "Platformă modernă de e-commerce pentru brand de modă",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    tags: ["React", "Stripe", "SEO"],
  },
  {
    title: "Restaurant Gourmet",
    category: "Site Prezentare",
    description: "Design elegant pentru restaurant premium",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
    tags: ["WordPress", "Rezervări", "Mobile"],
  },
  {
    title: "Studio Arhitectură",
    category: "Portofoliu",
    description: "Showcase creativ pentru proiecte de arhitectură",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",
    tags: ["Gallery", "Animații", "3D"],
  },
  {
    title: "Clinică Medicală",
    category: "Site Corporate",
    description: "Platformă profesională cu sistem de programări",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop",
    tags: ["Programări", "Blog", "GDPR"],
  },
  {
    title: "Agenție Marketing",
    category: "Landing Page",
    description: "Site de conversie optimizat pentru leads",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
    tags: ["CRO", "Analytics", "A/B Test"],
  },
  {
    title: "Startup Tech",
    category: "SaaS Platform",
    description: "Dashboard modern pentru aplicație cloud",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop",
    tags: ["Dashboard", "API", "Dark Mode"],
  },
];

const PortfolioSection = () => {
  return (
    <section id="portofoliu" className="py-20 lg:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-glow opacity-50" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Portofoliu</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Proiecte <span className="text-gradient">Realizate</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Fiecare proiect este unic și creat cu atenție la detalii pentru a răspunde 
            nevoilor specifice ale fiecărui client.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {portfolioItems.map((item, index) => (
            <div
              key={index}
              className="group glass-card rounded-2xl overflow-hidden hover-glow cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-48 lg:h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                
                {/* Overlay Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center glow-effect">
                    <ExternalLink className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="text-primary text-sm font-medium">{item.category}</span>
                <h3 className="font-display text-xl font-semibold mt-2 mb-3 text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
