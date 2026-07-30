import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buildOrderUrl, type BillingPeriodId, type HostingPlan } from "@/data/hostingPlans";

interface Props {
  plan: HostingPlan;
  period: BillingPeriodId;
}

const PlanCard = ({ plan, period }: Props) => {
  const price = plan.prices[period];
  const months = Number(period);
  const href = buildOrderUrl(plan, period);
  const external = href.startsWith("http");

  return (
    <div
      className={cn(
        "card-premium hover-lift glow-border relative flex flex-col rounded-3xl p-8",
        plan.popular
          ? "ring-2 ring-primary lg:-my-4 lg:p-10 shadow-[var(--shadow-glow)]"
          : "lg:mt-0"
      )}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-primary px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
            <Star className="h-3.5 w-3.5 fill-current" />
            Cel mai popular
          </span>
        </div>
      )}

      <div className="mb-6 pt-2">
        <h3 className="font-display text-2xl font-bold text-foreground">{plan.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{plan.tagline}</p>
      </div>

      <div className="mb-7 border-y border-border py-6">
        <div className="flex items-end gap-1.5">
          <span
            key={`${plan.id}-${period}`}
            className="animate-fade-up font-display text-5xl font-bold text-gradient leading-none"
          >
            {price.monthly}
          </span>
          <span className="pb-1 text-sm font-medium text-muted-foreground">Lei/lună</span>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Facturat: <span className="font-semibold text-foreground">{price.total} Lei</span>
          {months > 1 && <span className="text-muted-foreground"> / {months} luni</span>}
        </p>
        {months > 1 && price.save > 0 && (
          <p className="mt-1.5 inline-block rounded-md bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
            Economisești {price.save} Lei
          </p>
        )}
      </div>

      <ul className="mb-8 flex-1 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20">
              <Check className="h-3 w-3 text-primary" />
            </div>
            <span className="text-sm text-foreground/90">{f}</span>
          </li>
        ))}
      </ul>

      <Button
        variant={plan.popular ? "professional" : "outline"}
        size="lg"
        className="w-full"
        asChild
      >
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          Alege Pachetul
        </a>
      </Button>
    </div>
  );
};

export default PlanCard;
