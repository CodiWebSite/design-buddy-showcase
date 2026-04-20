import { Server, Shield, Zap, HardDrive, Lock, Headphones } from "lucide-react";

const features = [
  { icon: Zap, title: "Viteză", desc: "SSD NVMe și infrastructură optimizată pentru site-uri rapide." },
  { icon: Lock, title: "SSL inclus", desc: "Certificat SSL gratuit pentru orice site, configurat de noi." },
  { icon: HardDrive, title: "Backup zilnic", desc: "Copii de siguranță automate. Nimic nu se pierde." },
  { icon: Shield, title: "Securitate", desc: "Protecție DDoS, firewall și monitorizare permanentă." },
  { icon: Server, title: "Uptime real", desc: "Servere stabile, cu disponibilitate ridicată în timp." },
  { icon: Headphones, title: "Suport real", desc: "Răspundem rapid când ai nevoie de ajutor, fără bile-te." },
];

const HostingSection = () => {
  return (
    <section id="hosting" className="py-24 lg:py-32 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary font-semibold text-xs uppercase tracking-widest mb-5">
            Hosting & Mentenanță
          </span>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
            Liniște completă, <span className="text-gradient">tot anul</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Nu ai timp să te ocupi de hosting, SSL, backup-uri și securitate? Ne ocupăm noi.
            Lucrăm cu Cloud-Center.ro, partener premium de hosting în România.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14 max-w-6xl mx-auto">
          {features.map((f) => (
            <div key={f.title} className="card-premium rounded-2xl p-6 hover-lift">
              <div className="w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2 text-foreground">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto card-premium rounded-3xl p-8 lg:p-10 glow-border">
          <div className="grid md:grid-cols-[1fr,auto] gap-6 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-4">
                <span className="text-primary text-xs font-semibold uppercase tracking-wider">
                  Partener oficial
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-3">
                Hosting premium prin Cloud-Center.ro
              </h3>
              <p className="text-muted-foreground mb-6 md:mb-0">
                Comandă direct prin link-ul nostru și beneficiezi de prețuri preferențiale la pachete
                de hosting web, gazduire jocuri și soluții cloud.
              </p>
            </div>
            <div className="relative z-20">
              <a
                href="https://www.cloud-center.ro/aff.php?aff=793"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-md text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Accesează Cloud-Center.ro
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HostingSection;
