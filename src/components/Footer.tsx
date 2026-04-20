import { Mail, Phone, MessageCircle, Facebook } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/webcraft-logo.png";

const quickLinks = [
  { href: "/#portofoliu", label: "Portofoliu" },
  { href: "/#servicii", label: "Servicii" },
  { href: "/#preturi", label: "Pachete" },
  { href: "/blog", label: "Blog", isRoute: true },
  { href: "/despre", label: "Despre", isRoute: true },
  { href: "/audit", label: "Audit gratuit", isRoute: true },
  { href: "/#contact", label: "Contact" },
];

const services = [
  "Web Design",
  "Dezvoltare Web",
  "Redesign Website",
  "SEO Setup",
  "Hosting Premium",
  "Mentenanță & Suport",
];

const Footer = () => {
  return (
    <footer className="py-14 border-t border-border bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#acasa" className="inline-flex items-center mb-5" aria-label="WebCraft">
              <img
                src={logo}
                alt="WebCraft"
                className="h-16 w-auto drop-shadow-[0_4px_20px_hsl(var(--primary)/0.4)]"
              />
            </a>
            <p className="text-muted-foreground max-w-md mb-6 leading-relaxed">
              Construim site-uri premium pentru afaceri din România care vor să arate profesionist
              și să primească mai multe cereri de la clienți reali.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/40755649856"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-foreground hover:bg-primary/20 transition-colors text-sm font-medium"
              >
                <MessageCircle className="w-4 h-4 text-primary" />
                WhatsApp
              </a>
              <a
                href="tel:+40755649856"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary border border-border text-foreground hover:bg-secondary/70 transition-colors text-sm font-medium"
              >
                <Phone className="w-4 h-4 text-primary" />
                +40 755 649 856
              </a>
              <a
                href="mailto:contact@webcraft.ro"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary border border-border text-foreground hover:bg-secondary/70 transition-colors text-sm font-medium"
              >
                <Mail className="w-4 h-4 text-primary" />
                Email
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61570975541766"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary border border-border text-foreground hover:bg-secondary/70 transition-colors text-sm font-medium"
              >
                <Facebook className="w-4 h-4 text-primary" />
                Facebook
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Navigare</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  {link.isRoute ? (
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Servicii</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#servicii"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2026 WebCraft. Toate drepturile rezervate.
          </p>
          <div className="flex gap-6 text-sm">
            <Link
              to="/termeni-si-conditii"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Termeni & Condiții
            </Link>
            <Link
              to="/politica-de-confidentialitate"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Politica de Confidențialitate
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
