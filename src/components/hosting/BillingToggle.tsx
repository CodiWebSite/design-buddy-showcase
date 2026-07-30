import { billingPeriods, type BillingPeriodId } from "@/data/hostingPlans";
import { cn } from "@/lib/utils";

interface Props {
  value: BillingPeriodId;
  onChange: (v: BillingPeriodId) => void;
}

const BillingToggle = ({ value, onChange }: Props) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        role="radiogroup"
        aria-label="Perioadă de facturare"
        className="glass inline-flex flex-wrap justify-center gap-1 rounded-full p-1.5"
      >
        {billingPeriods.map((p) => {
          const active = p.id === value;
          return (
            <button
              key={p.id}
              role="radio"
              aria-checked={active}
              onClick={() => onChange(p.id)}
              className={cn(
                "relative rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                active
                  ? "bg-gradient-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {p.label}
            </button>
          );
        })}
      </div>
      <div className="h-6">
        {billingPeriods.find((p) => p.id === value)?.badge && (
          <span className="animate-fade-up inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            {billingPeriods.find((p) => p.id === value)?.badge}
          </span>
        )}
      </div>
    </div>
  );
};

export default BillingToggle;
