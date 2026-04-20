import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface LegalPageLayoutProps {
  title: string;
  updated: string;
  children: React.ReactNode;
}

const LegalPageLayout = ({ title, updated, children }: LegalPageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/85 backdrop-blur-md">
        <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Înapoi la site
          </Link>
          <span className="font-display font-bold text-foreground">WebCraft</span>
        </div>
      </header>

      <main className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full glass text-primary font-semibold text-xs uppercase tracking-widest mb-5">
            Document legal
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-3 text-foreground">
            {title}
          </h1>
          <p className="text-muted-foreground text-sm mb-10">Ultima actualizare: {updated}</p>

          <article className="prose prose-invert max-w-none space-y-8 text-foreground/90 leading-relaxed">
            {children}
          </article>

          <div className="mt-16 pt-8 border-t border-border">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-glow font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Înapoi la pagina principală
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export const LegalSection = ({ title, children }: SectionProps) => (
  <section>
    <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-3">
      {title}
    </h2>
    <div className="space-y-3 text-muted-foreground">{children}</div>
  </section>
);

export default LegalPageLayout;
