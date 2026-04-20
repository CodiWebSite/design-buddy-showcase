import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Target, Users, Zap, ShieldCheck, Award, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const values = [
  { icon: Heart, title: "Onestitate", desc: "Spunem clar ce poți și ce nu poți obține. Fără promisiuni gonflate." },
  { icon: Zap, title: "Viteză reală", desc: "Site-uri rapide, livrate la timp. Fără termene mutate la nesfârșit." },
  { icon: ShieldCheck, title: "Calitate fără compromis", desc: "Cod curat, design rafinat, optimizări reale — nu doar la suprafață." },
  { icon: Users, title: "Parteneriat", desc: "Nu suntem doar un furnizor. Înțelegem afacerea ta și te ajutăm să crești." },
];

const stats = [
  { value: "30+", label: "Site-uri livrate" },
  { value: "5 ani", label: "Experiență" },
  { value: "98%", label: "Clienți mulțumiți" },
  { value: "<24h", label: "Timp răspuns suport" },
];

const About = () => {
  useEffect(() => {
    document.title = "Despre WebCraft | Cine suntem și ce credem";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "Suntem WebCraft — echipa care construiește site-uri premium pentru afaceri din România. Află cine suntem, ce credem și cum lucrăm."
    );
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 lg:pt-36 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Hero */}
          <section className="max-w-4xl mx-auto text-center mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full glass text-primary font-semibold text-xs uppercase tracking-widest mb-5">
              Despre noi
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Construim site-uri <span className="text-gradient">care contează</span>
            </h1>
            <p className="text-muted-foreground text-lg lg:text-xl leading-relaxed">
              Suntem o echipă mică din România, pasionată de design și cod, care crede că o afacere
              merită mai mult decât un template generic luat de pe internet.
            </p>
          </section>

          {/* Stats */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 max-w-5xl mx-auto mb-24">
            {stats.map((s) => (
              <div key={s.label} className="card-premium rounded-2xl p-6 text-center">
                <div className="font-display text-3xl lg:text-4xl font-bold text-gradient mb-2">
                  {s.value}
                </div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </section>

          {/* Mission */}
          <section className="max-w-4xl mx-auto mb-24 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block text-primary font-semibold text-xs uppercase tracking-widest mb-3">
                Misiunea noastră
              </span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold mb-5">
                Site-uri pentru afaceri reale, nu doar pentru portofolii
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Am pornit pentru că vedeam zilnic afaceri serioase cu prezență online slabă —
                nu pentru că nu aveau buget, ci pentru că nu găseau pe cineva care să înțeleagă
                cu adevărat ce înseamnă un site care aduce clienți.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Astăzi lucrăm cu DJ-i, restaurante, magazine locale, branduri personale și
                companii de servicii. Fiecare proiect este tratat ca propria noastră afacere.
              </p>
            </div>
            <div className="card-premium glow-border rounded-2xl p-8 lg:p-10">
              <Target className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-display text-xl font-bold mb-3">Promisiunea noastră</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2"><Award className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /> Livrare la termenul promis</li>
                <li className="flex gap-2"><Award className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /> Cod curat, fără surprize ascunse</li>
                <li className="flex gap-2"><Award className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /> Suport real, nu chat-bot</li>
                <li className="flex gap-2"><Award className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /> Site-ul tău, pe domeniul tău, fără captivitate</li>
              </ul>
            </div>
          </section>

          {/* Values */}
          <section className="max-w-6xl mx-auto mb-24">
            <div className="text-center mb-12">
              <span className="inline-block text-primary font-semibold text-xs uppercase tracking-widest mb-3">
                Valorile noastre
              </span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold">
                Ce credem și cum lucrăm
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((v) => (
                <div key={v.title} className="card-premium rounded-2xl p-6 lg:p-7 hover-lift">
                  <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mb-4">
                    <v.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">{v.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="max-w-3xl mx-auto text-center card-premium glow-border rounded-3xl p-10 lg:p-14">
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
              Hai să discutăm despre proiectul tău
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Primă discuție gratuită. Îți spunem direct dacă te putem ajuta și cum.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="professional" size="lg" asChild>
                <Link to="/#contact">Cere ofertă <ArrowRight className="ml-1 w-4 h-4" /></Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/audit">Audit gratuit site</Link>
              </Button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
