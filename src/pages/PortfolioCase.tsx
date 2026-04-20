import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, ArrowRight, Quote, Clock, Wrench } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { portfolioCases } from "@/data/portfolioCases";

const PortfolioCasePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const item = portfolioCases.find((p) => p.slug === slug);

  useEffect(() => {
    if (!item) return;
    document.title = `${item.title} — studiu de caz | WebCraft`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", `Cum am construit ${item.title} (${item.business}): provocare, soluție și rezultate concrete.`);
    window.scrollTo(0, 0);
  }, [item]);

  if (!item) return <Navigate to="/#portofoliu" replace />;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 lg:pt-36 pb-20">
        <article className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <Link
            to="/#portofoliu"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Înapoi la portofoliu
          </Link>

          <header className="mb-12">
            <span className="inline-block text-primary font-semibold text-xs uppercase tracking-widest mb-3">
              {item.business}
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-5">
              {item.title}
            </h1>
            <div className="flex flex-wrap gap-2 mb-6">
              {item.tags.map((t) => (
                <span key={t} className="px-3 py-1 text-xs rounded-full bg-secondary/60 text-muted-foreground border border-border">
                  {t}
                </span>
              ))}
            </div>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-glow font-semibold"
            >
              Vizitează site-ul live <ExternalLink className="w-4 h-4" />
            </a>
          </header>

          <div className="rounded-2xl overflow-hidden mb-12 aspect-[16/10] bg-muted card-premium">
            <img src={item.image} alt={`Screenshot ${item.title}`} className="w-full h-full object-cover object-top" />
          </div>

          {/* Results */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
            {item.results.map((r) => (
              <div key={r.label} className="card-premium rounded-2xl p-5 text-center">
                <div className="font-display text-2xl lg:text-3xl font-bold text-gradient mb-1">{r.value}</div>
                <div className="text-xs text-muted-foreground">{r.label}</div>
              </div>
            ))}
          </section>

          <div className="grid md:grid-cols-3 gap-10 mb-14">
            <div className="md:col-span-2 space-y-10">
              <section>
                <h2 className="font-display text-2xl lg:text-3xl font-bold mb-4">Provocarea</h2>
                <p className="text-foreground/85 leading-relaxed">{item.detailedChallenge}</p>
              </section>

              <section>
                <h2 className="font-display text-2xl lg:text-3xl font-bold mb-4">Soluția noastră</h2>
                <ul className="space-y-3">
                  {item.detailedSolution.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/15 text-primary font-bold text-sm flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span className="text-foreground/85 leading-relaxed pt-0.5">{step}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {item.testimonial && (
                <section className="card-premium glow-border rounded-2xl p-7">
                  <Quote className="w-8 h-8 text-primary mb-3" />
                  <p className="text-foreground/90 italic leading-relaxed mb-4">"{item.testimonial.quote}"</p>
                  <div className="text-sm font-semibold text-primary">— {item.testimonial.author}</div>
                </section>
              )}
            </div>

            <aside className="space-y-5">
              <div className="card-premium rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-primary" />
                  <h3 className="font-display font-bold">Durată proiect</h3>
                </div>
                <p className="text-muted-foreground text-sm">{item.duration}</p>
              </div>
              <div className="card-premium rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="w-4 h-4 text-primary" />
                  <h3 className="font-display font-bold">Tehnologii</h3>
                </div>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {item.technologies.map((t) => (
                    <li key={t}>• {t}</li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>

          <section className="card-premium glow-border rounded-3xl p-10 lg:p-14 text-center">
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
              Vrei ceva similar?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Spune-ne despre proiectul tău. Discutăm gratuit și îți facem o propunere clară.
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
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default PortfolioCasePage;
