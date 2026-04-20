import { ArrowRight, Sparkles, Clock, Headphones, Server, Smartphone } from "lucide-react";
import { Button } from "./ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const trustItems = [
  { icon: Clock, label: "Livrare 14–30 zile" },
  { icon: Headphones, label: "Suport inclus" },
  { icon: Server, label: "Hosting premium" },
  { icon: Smartphone, label: "100% responsive" },
];

const HeroSection = () => {
  return (
    <section
      id="acasa"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
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

      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(217_91%_60%_/_0.04)_1px,transparent_1px),linear-gradient(to_bottom,hsl(217_91%_60%_/_0.04)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-24 pb-16">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-up">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground font-medium">
              Agenție de web design — România
            </span>
          </div>

          <h1
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-up leading-[1.05]"
            style={{ animationDelay: "0.1s" }}
          >
            Site-uri premium care îți aduc
            <br />
            <span className="text-gradient">clienți, nu doar complimente</span>
          </h1>

          <p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up leading-relaxed"
            style={{ animationDelay: "0.2s" }}
          >
            Pentru afaceri locale, branduri personale și business-uri din evenimente
            care vor să iasă din mulțime și să primească mai multe cereri.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Button variant="professional" size="xl" asChild>
              <a href="#contact">
                Cere ofertă
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <a href="#portofoliu">Vezi proiecte</a>
            </Button>
          </div>

          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-16 animate-fade-up max-w-4xl mx-auto"
            style={{ animationDelay: "0.4s" }}
          >
            {trustItems.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 justify-center glass rounded-xl px-4 py-3"
              >
                <Icon className="w-4 h-4 text-primary shrink-0" />
                <span className="text-xs md:text-sm text-foreground font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
