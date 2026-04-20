import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const faqs = [
  {
    q: "Cât durează realizarea unui site?",
    a: "În medie între 14 și 30 de zile lucrătoare, în funcție de complexitatea proiectului și de viteza cu care primim conținutul (texte, poze, branding).",
  },
  {
    q: "Ce include prețul unui pachet?",
    a: "Design personalizat, dezvoltare, implementare, optimizare de bază pentru SEO, hosting în primul an, certificat SSL și suport după lansare. Detaliile exacte le stabilim în oferta personalizată.",
  },
  {
    q: "Se poate plăti în etape?",
    a: "Da. Lucrăm cu un avans la începutul proiectului și restul la livrare. Pentru pachete mai mari putem împărți plata pe etape.",
  },
  {
    q: "Mă ajuți și după lansare?",
    a: "Sigur. Oferim suport și pachete de mentenanță lunară pentru actualizări, modificări de conținut, backup-uri și securitate.",
  },
  {
    q: "Pot cere modificări pe parcurs?",
    a: "Da. Includem runde de feedback pe direcția vizuală și pe conținut. Modificările majore în afara scopului inițial pot fi cotate separat.",
  },
  {
    q: "Hostingul este inclus?",
    a: "Primul an de hosting este inclus la toate pachetele. Ulterior îți recomandăm o soluție premium prin partenerul nostru Cloud-Center.ro, cu preț preferențial.",
  },
  {
    q: "Pot veni cu un exemplu de design?",
    a: "Absolut. Orice referință (alt site, branding, mood) ne ajută să înțelegem mai repede direcția pe care o vrei.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary font-semibold text-xs uppercase tracking-widest mb-5">
            Întrebări frecvente
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Răspundem la <span className="text-gradient">ce te interesează</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Dacă mai ai întrebări, scrie-ne. Răspundem în maxim 24h.
          </p>
        </div>

        <div className="max-w-3xl mx-auto card-premium rounded-2xl p-2 md:p-4">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border last:border-b-0 px-4">
                <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:no-underline py-5">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
