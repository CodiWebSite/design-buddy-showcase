import { useState } from "react";
import {
  Zap,
  HardDrive,
  Lock,
  ShieldCheck,
  Archive,
  Mail,
  Rocket,
  Wrench,
} from "lucide-react";
import BillingToggle from "./hosting/BillingToggle";
import PlanCard from "./hosting/PlanCard";
import { defaultPeriod, hostingPlans, type BillingPeriodId } from "@/data/hostingPlans";

const includedFeatures = [
  { icon: Zap, label: "LiteSpeed Web Server" },
  { icon: HardDrive, label: "SSD NVMe" },
  { icon: Lock, label: "SSL Gratuit" },
  { icon: ShieldCheck, label: "Protecție Imunify360" },
  { icon: Archive, label: "Backup Zilnic" },
  { icon: Mail, label: "Email Nelimitat" },
  { icon: Rocket, label: "Softaculous Installer" },
  { icon: Wrench, label: "Suport Tehnic" },
];

const HostingSection = () => {
  const [period, setPeriod] = useState<BillingPeriodId>(defaultPeriod);

  return (
    <section id="hosting" className="relative overflow-hidden bg-background py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-mesh opacity-40" />
      <div className="absolute right-0 top-1/3 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="glass mb-5 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Hosting & Mentenanță
          </span>
          <h2 className="font-display mb-6 text-3xl font-bold md:text-5xl lg:text-6xl">
            Hosting Web <span className="text-gradient">Profesional</span>
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Performanță ridicată, securitate și stabilitate pentru orice proiect online. Toate
            pachetele includ LiteSpeed, SSD NVMe, SSL Gratuit și Backup Zilnic.
          </p>
        </div>

        <div className="mb-14 flex justify-center">
          <BillingToggle value={period} onChange={setPeriod} />
        </div>

        <div className="mx-auto grid max-w-6xl items-start gap-6 lg:grid-cols-3 lg:gap-8">
          {hostingPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} period={period} />
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          <h3 className="font-display mb-8 text-center text-xl font-bold text-foreground md:text-2xl">
            Incluse în <span className="text-gradient">toate abonamentele</span>
          </h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {includedFeatures.map((f) => (
              <div
                key={f.label}
                className="card-premium hover-lift flex flex-col items-center gap-3 rounded-2xl p-5 text-center"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary">
                  <f.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-sm font-medium text-foreground/90">{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Nu știi ce pachet ți se potrivește?{" "}
          <a href="#contact" className="font-medium text-primary hover:underline">
            Discută cu noi
          </a>{" "}
          — răspundem în 24h.
        </p>
      </div>
    </section>
  );
};

export default HostingSection;
