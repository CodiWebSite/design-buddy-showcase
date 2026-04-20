import { Check, Loader2 } from "lucide-react";

const STEPS = [
  "Conectare la site",
  "Analiză securitate",
  "Analiză SEO",
  "Analiză performanță",
  "Analiză infrastructură",
  "Analiză UX & accesibilitate",
];

interface Props {
  currentStep: number;
}

const AuditLoader = ({ currentStep }: Props) => {
  return (
    <div className="max-w-md mx-auto card-premium rounded-xl p-6 sm:p-8 space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-foreground mb-1">Analizez site-ul...</h3>
        <p className="text-sm text-muted-foreground">Durează ~10 secunde</p>
      </div>
      <ul className="space-y-3">
        {STEPS.map((label, idx) => {
          const done = idx < currentStep;
          const active = idx === currentStep;
          return (
            <li
              key={label}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                active ? "bg-primary/10 border border-primary/30" : done ? "opacity-60" : "opacity-40"
              }`}
            >
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  done ? "bg-primary text-primary-foreground" : active ? "bg-primary/20" : "bg-secondary"
                }`}
              >
                {done ? (
                  <Check size={16} />
                ) : active ? (
                  <Loader2 size={16} className="animate-spin text-primary" />
                ) : (
                  <span className="text-xs text-muted-foreground">{idx + 1}</span>
                )}
              </div>
              <span className={`text-sm ${active ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                {label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AuditLoader;
