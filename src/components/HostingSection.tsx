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
  RefreshCw,
  CheckCircle2,
} from "lucide-react";
import BillingToggle from "./hosting/BillingToggle";
import PlanCard from "./hosting/PlanCard";
import { defaultPeriod, hostingPlans, type BillingPeriodId } from "@/data/hostingPlans";

const includedFeatures = [
  { icon: Zap, label: "LiteSpeed Web Server" },
  { icon: HardDrive, label: "SSD NVMe" },
  { icon: Lock, label: "Certificat SSL Gratuit" },
  { icon: ShieldCheck, label: "Protecție Imunify360" },
  { icon: Archive, label: "Backup Zilnic" },
  { icon: Mail, label: "Email Profesional Nelimitat" },
  { icon: Rocket, label: "Instalare WordPress Gratuită" },
  { icon: RefreshCw, label: "Migrare Gratuită" },
  { icon: Wrench, label: "Suport Tehnic în Limba Română" },
];

const trustPoints = [
  "Activare rapidă",
  "Fără taxe ascunse",
  "Migrare gratuită de la alt furnizor",
  "Instalare WordPress gratuită",
  "Garanție 99.9% uptime",
  "Suport tehnic în limba română",
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
            Performanță, securitate și stabilitate pentru orice proiect online. Toate pachetele
            includ SSD NVMe, LiteSpeed, SSL Gratuit, Backup Zilnic și suport tehnic în limba
            română.
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
            Toate pachetele <span className="text-gradient">includ</span>
          </h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
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

        <div className="card-premium mx-auto mt-12 max-w-4xl rounded-3xl p-7">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trustPoints.map((t) => (
              <div key={t} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm text-foreground/90">{t}</span>
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
