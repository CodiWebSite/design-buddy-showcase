import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section id="acasa" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-40"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-gradient-mesh" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(217_91%_60%_/_0.04)_1px,transparent_1px),linear-gradient(to_bottom,hsl(217_91%_60%_/_0.04)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-up">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground font-medium">Web Design & Hosting Premium în România</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-up leading-[1.05]" style={{ animationDelay: '0.1s' }}>
            Site-uri care
            <br />
            <span className="text-gradient">vând și impresionează</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up leading-relaxed" style={{ animationDelay: '0.2s' }}>
            Design modern, performanță excelentă și hosting premium inclus. 
            Transformăm viziunea ta într-o prezență online care aduce rezultate.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Button variant="professional" size="xl" asChild>
              <a href="#portofoliu">
                Vezi Portofoliul
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <a href="#preturi">Pachete & Prețuri</a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-20 lg:mt-28 animate-fade-up max-w-3xl mx-auto" style={{ animationDelay: '0.4s' }}>
            {[
              { value: "4+", label: "Proiecte Finalizate" },
              { value: "99.9%", label: "Uptime Hosting" },
              { value: "100%", label: "Clienți Mulțumiți" },
            ].map((stat, index) => (
              <div key={index} className="text-center glass rounded-xl p-4 md:p-6">
                <div className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
