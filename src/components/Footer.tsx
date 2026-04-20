import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import logo from "@/assets/webcraft-logo.png";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#" className="inline-flex items-center mb-4">
              <img src={logo} alt="WebCraft - Web Design Agency" className="h-20 w-auto drop-shadow-[0_4px_20px_hsl(var(--primary)/0.4)]" />
            </a>
            <p className="text-muted-foreground max-w-md mb-6">
              Creăm experiențe digitale memorabile care transformă vizitatorii în clienți fideli. 
              Fiecare proiect este unic, fiecare detaliu contează.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Link-uri Rapide</h4>
            <ul className="space-y-3">
              {["Acasă", "Portofoliu", "Servicii", "Hosting", "Prețuri", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace("ț", "t")}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Servicii</h4>
            <ul className="space-y-3">
              {["Web Design", "Dezvoltare Web", "SEO", "Hosting", "Mentenanță"].map((service) => (
                <li key={service}>
                  <a href="#servicii" className="text-muted-foreground hover:text-primary transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2026 WebCraft. Toate drepturile rezervate.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Termeni & Condiții
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Politica de Confidențialitate
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
