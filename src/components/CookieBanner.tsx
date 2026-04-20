import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const STORAGE_KEY = "cookie-consent";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  const decide = (value: "accepted" | "rejected") => {
    localStorage.setItem(STORAGE_KEY, value);
    localStorage.setItem(`${STORAGE_KEY}-date`, new Date().toISOString());
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Consimțământ cookie-uri"
      className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-[60] animate-fade-up"
    >
      <div className="card-premium glow-border rounded-2xl p-5 lg:p-6 shadow-2xl border border-border bg-card/95 backdrop-blur-md">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
            <Cookie className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-display font-semibold text-foreground text-base mb-1">
              Folosim cookie-uri
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Folosim cookie-uri esențiale pentru funcționarea site-ului și, opțional, pentru a înțelege cum este utilizat. Detalii în{" "}
              <Link
                to="/politica-de-confidentialitate"
                className="text-primary hover:underline"
              >
                Politica de confidențialitate
              </Link>
              .
            </p>
          </div>
          <button
            onClick={() => decide("rejected")}
            aria-label="Închide"
            className="text-muted-foreground hover:text-foreground transition-colors p-1 -m-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <Button
            variant="professional"
            size="sm"
            className="flex-1"
            onClick={() => decide("accepted")}
          >
            Accept toate
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => decide("rejected")}
          >
            Doar esențiale
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
