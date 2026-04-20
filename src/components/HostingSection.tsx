import { Server, Shield, Zap, Tag } from "lucide-react";
import { Button } from "./ui/button";

const features = [
  { icon: Server, title: "Servere Premium", desc: "Infrastructură de top cu SSD NVMe și uptime garantat" },
  { icon: Zap, title: "Viteză Maximă", desc: "Performanță optimă pentru site-uri rapide și SEO de top" },
  { icon: Shield, title: "Securitate Avansată", desc: "Protecție DDoS, SSL gratuit și backup-uri automate" },
  { icon: Tag, title: "Reduceri Speciale", desc: "Prețuri preferențiale pentru clienții noștri" },
];

const HostingSection = () => {
  return (
    <section id="hosting" className="py-24 lg:py-32 relative overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary font-semibold text-xs uppercase tracking-widest mb-5">
            Hosting Premium
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
            Hosting prin <span className="text-gradient">Cloud-Center.ro</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Lucrăm cu Cloud-Center.ro, partenerul nostru de încredere pentru hosting în România. 
            Poți comanda hosting-ul direct prin noi cu <span className="text-primary font-semibold">reducere specială</span>.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <div key={i} className="card-premium rounded-2xl p-6 hover-lift">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2 text-foreground">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Banner card */}
        <div className="max-w-4xl mx-auto card-premium rounded-3xl p-8 lg:p-12 text-center glow-border">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <Tag className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-semibold">Reducere disponibilă</span>
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
            Comandă hosting cu reducere prin partenerul nostru
          </h3>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Click pe banner pentru a accesa Cloud-Center.ro și a beneficia de prețuri speciale 
            la pachete de hosting, gazduire jocuri și soluții cloud.
          </p>
          
          <a 
            href="https://www.cloud-center.ro/aff.php?aff=793" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all hover:scale-[1.02] mb-8"
          >
            <img 
              src="https://www.cloud-center.ro/resurse/banner-3.png" 
              alt="Cloud-Center.ro - Host MC, Gazduire MTA, Gazduire CS, Gazduire CSGO, Hosting"
              loading="lazy"
              className="block max-w-full h-auto"
            />
          </a>

          <div className="relative z-20">
            <a
              href="https://www.cloud-center.ro/aff.php?aff=793"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-md text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md transition-all duration-200"
            >
              Accesează Cloud-Center.ro
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HostingSection;
