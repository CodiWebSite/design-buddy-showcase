import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";

const HeroSection = () => {
  return (
    <section id="acasa" className="relative min-h-screen flex items-center justify-center bg-gradient-hero">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(220_12%_15%_/_0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(220_12%_15%_/_0.05)_1px,transparent_1px)] bg-[size:80px_80px]" />
      
      {/* Subtle accent gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-subtle opacity-50" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-up">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground font-medium">Agenție Web Design din România</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-up leading-tight" style={{ animationDelay: '0.1s' }}>
            Dezvoltăm Site-uri
            <br />
            <span className="text-primary">Profesionale</span> Pentru
            <br />
            Afacerea Ta
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up leading-relaxed" style={{ animationDelay: '0.2s' }}>
            Design modern, performanță excelentă și soluții complete de hosting. 
            Transformăm viziunea ta într-o prezență online de impact.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Button variant="professional" size="xl">
              Vezi Portofoliul
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="xl">
              Pachete & Prețuri
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 lg:mt-28 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            {[
              { value: "150+", label: "Proiecte Finalizate" },
              { value: "98%", label: "Clienți Mulțumiți" },
              { value: "5+", label: "Ani Experiență" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;