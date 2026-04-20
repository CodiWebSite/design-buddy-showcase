import { Menu, X, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import logo from "@/assets/webcraft-logo.png";

const navLinks = [
  { href: "/#portofoliu", label: "Portofoliu" },
  { href: "/#servicii", label: "Servicii" },
  { href: "/#proces", label: "Proces" },
  { href: "/#preturi", label: "Pachete" },
  { href: "/#testimoniale", label: "Testimoniale" },
  { href: "/#faq", label: "FAQ" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          <Link to="/" className="flex items-center" aria-label="WebCraft - acasă">
            <img
              src={logo}
              alt="WebCraft"
              className="h-12 lg:h-14 w-auto drop-shadow-[0_4px_20px_hsl(var(--primary)/0.4)]"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium text-sm focus:outline-none focus-visible:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/audit"
              className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors duration-200 font-semibold text-sm"
            >
              <ShieldCheck size={16} />
              Audit Gratuit
            </Link>
          </div>

          <div className="hidden lg:block">
            <Button variant="professional" size="lg" asChild>
              <a href="/#contact">Cere ofertă</a>
            </Button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            aria-label={isOpen ? "Închide meniul" : "Deschide meniul"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-up">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors duration-200 font-medium py-3 px-3 rounded-lg"
                >
                  {link.label}
                </a>
              ))}
              <Link
                to="/audit"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-2 text-primary hover:bg-primary/10 transition-colors duration-200 font-semibold py-3 px-3 rounded-lg"
              >
                <ShieldCheck size={16} />
                Audit Gratuit
              </Link>
              <Button variant="professional" size="lg" className="mt-3" asChild>
                <a href="/#contact" onClick={() => setIsOpen(false)}>
                  Cere ofertă
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
