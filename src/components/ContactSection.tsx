import { Mail, Phone, MapPin, Send, MessageCircle, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const WHATSAPP_NUMBER = "40755649856";
const PHONE_DISPLAY = "+40 755 649 856";
const PHONE_HREF = "tel:+40755649856";
const EMAIL = "contact@webcraft.ro";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const prefilledRef = useRef(false);

  useEffect(() => {
    if (prefilledRef.current) return;
    const params = new URLSearchParams(window.location.search);
    const config = params.get("config");
    if (config) {
      prefilledRef.current = true;
      setFormData((prev) => ({
        ...prev,
        message: prev.message ? prev.message : config,
      }));
      setTimeout(() => {
        const el = document.getElementById("contact");
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
        messageRef.current?.focus({ preventScroll: true });
      }, 100);
      const url = new URL(window.location.href);
      url.searchParams.delete("config");
      window.history.replaceState({}, "", url.pathname + url.hash);
    }
  }, []);

  const validate = () => {
    const e: Record<string, string> = {};
    if (formData.name.trim().length < 2) e.name = "Te rugăm să introduci numele tău.";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) e.email = "Email invalid.";
    if (formData.message.trim().length < 10) e.message = "Mesajul trebuie să aibă minim 10 caractere.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    // Backend integration vine ulterior — momentan doar feedback UI
    toast({
      title: "Mesaj pregătit",
      description:
        "Trimiterea automată va fi activată în curând. Între timp, scrie-ne pe WhatsApp sau email.",
    });
  };

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Salut! Sunt interesat de un site nou. Aș vrea o ofertă.",
  )}`;

  return (
    <section id="contact" className="py-20 lg:py-28 bg-gradient-card relative">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary font-semibold text-xs uppercase tracking-widest mb-5">
            Contact
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Hai să discutăm <span className="text-gradient">proiectul tău</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Spune-ne pe scurt ce ai nevoie. Răspundem în maxim 24h cu o ofertă clară, fără surprize.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="card-premium rounded-2xl p-8">
              <h3 className="font-display text-xl font-semibold mb-6 text-foreground">
                Cele mai rapide căi
              </h3>

              <div className="space-y-4">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-primary/10 border border-primary/30 hover:bg-primary/15 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground">WhatsApp — răspuns rapid</div>
                    <div className="text-foreground font-semibold">{PHONE_DISPLAY}</div>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-muted-foreground text-sm mb-0.5">Telefon</div>
                    <a
                      href={PHONE_HREF}
                      className="text-foreground hover:text-primary transition-colors font-medium"
                    >
                      {PHONE_DISPLAY}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-muted-foreground text-sm mb-0.5">Email</div>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="text-foreground hover:text-primary transition-colors font-medium"
                    >
                      {EMAIL}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-muted-foreground text-sm mb-0.5">Locație</div>
                    <span className="text-foreground font-medium">România — lucrăm online</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-premium rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-primary" />
                <h3 className="font-display text-xl font-semibold text-foreground">Program</h3>
              </div>
              <div className="space-y-2.5 text-muted-foreground text-sm">
                <div className="flex justify-between">
                  <span>Luni – Vineri</span>
                  <span className="text-foreground font-medium">09:00 – 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sâmbătă</span>
                  <span className="text-foreground font-medium">10:00 – 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Duminică</span>
                  <span className="text-foreground font-medium">Doar urgențe</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card-premium rounded-2xl p-8">
            <h3 className="font-display text-xl font-semibold mb-2 text-foreground">
              Trimite-ne un mesaj
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Răspundem în maxim 24h cu o ofertă personalizată.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="name" className="block text-sm text-muted-foreground mb-2">
                  Nume complet
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground"
                  placeholder="Numele tău"
                  required
                />
                {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm text-muted-foreground mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground"
                    placeholder="email@exemplu.ro"
                    required
                  />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm text-muted-foreground mb-2">
                    Telefon (opțional)
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground"
                    placeholder="+40 7XX XXX XXX"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-muted-foreground mb-2">
                  Despre proiectul tău
                </label>
                <textarea
                  id="message"
                  ref={messageRef}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground resize-none"
                  placeholder="Ce tip de site îți dorești, pentru ce afacere și până când ai nevoie de el?"
                  required
                />
                {errors.message && (
                  <p className="text-destructive text-xs mt-1">{errors.message}</p>
                )}
              </div>

              <Button variant="professional" size="lg" type="submit" className="w-full">
                Trimite mesajul
                <Send className="w-4 h-4" />
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Sau scrie-ne direct pe{" "}
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  WhatsApp
                </a>{" "}
                — răspundem cel mai rapid acolo.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
