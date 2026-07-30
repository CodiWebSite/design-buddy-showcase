export type BillingPeriodId = "1" | "3" | "6" | "12";

export interface BillingPeriod {
  id: BillingPeriodId;
  label: string;
  months: number;
  badge?: string;
}

export const billingPeriods: BillingPeriod[] = [
  { id: "1", label: "Lunar", months: 1 },
  { id: "3", label: "3 Luni", months: 3 },
  { id: "6", label: "6 Luni", months: 6 },
  { id: "12", label: "12 Luni", months: 12, badge: "Economisești până la 15%" },
];

export const defaultPeriod: BillingPeriodId = "12";

export interface PlanPrice {
  monthly: number;
  total: number;
  save: number;
}

export interface HostingPlan {
  id: string;
  name: string;
  tagline: string;
  popular?: boolean;
  cta?: string;
  features: string[];
  prices: Record<BillingPeriodId, PlanPrice>;
  /** WHMCS integration: product id used to build the order URL */
  whmcsPid?: number;
}

/** Base WHMCS cart URL — periods map to WHMCS billing cycles */
export const WHMCS_BASE_URL = "https://www.cloud-center.ro/cart.php";

export const whmcsBillingCycle: Record<BillingPeriodId, string> = {
  "1": "monthly",
  "3": "quarterly",
  "6": "semiannually",
  "12": "annually",
};

export function buildOrderUrl(plan: HostingPlan, period: BillingPeriodId) {
  if (!plan.whmcsPid) return "#contact";
  return `${WHMCS_BASE_URL}?a=add&pid=${plan.whmcsPid}&billingcycle=${whmcsBillingCycle[period]}`;
}

export const hostingPlans: HostingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Ideal pentru site-uri personale, portofolii și afaceri aflate la început.",
    cta: "Alege Starter",
    features: [
      "10 GB SSD NVMe",
      "1 Website",
      "Trafic Nelimitat",
      "Certificat SSL Gratuit",
      "LiteSpeed Web Server",
      "Backup Zilnic",
      "Conturi Email Nelimitate",
      "Softaculous Installer",
      "WordPress Optimizat",
      "Protecție Imunify360",
      "Suport Tehnic",
    ],
    prices: {
      "1": { monthly: 19, total: 19, save: 0 },
      "3": { monthly: 18, total: 54, save: 3 },
      "6": { monthly: 17, total: 102, save: 12 },
      "12": { monthly: 15, total: 180, save: 48 },
    },
  },
  {
    id: "business",
    name: "Business",
    tagline: "Perfect pentru firme, site-uri de prezentare și magazine online mici.",
    popular: true,
    cta: "Alege Business",
    features: [
      "25 GB SSD NVMe",
      "Până la 5 Website-uri",
      "Trafic Nelimitat",
      "Certificat SSL Gratuit",
      "LiteSpeed Web Server",
      "Backup Zilnic",
      "Conturi Email Nelimitate",
      "Baze de Date Nelimitate",
      "Softaculous Installer",
      "WordPress Optimizat",
      "Migrare Gratuită",
      "Protecție Imunify360",
      "Suport Prioritar",
    ],
    prices: {
      "1": { monthly: 35, total: 35, save: 0 },
      "3": { monthly: 33, total: 99, save: 6 },
      "6": { monthly: 31.5, total: 189, save: 21 },
      "12": { monthly: 29, total: 348, save: 72 },
    },
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Pentru companii și proiecte care au nevoie de performanță maximă.",
    cta: "Alege Premium",
    features: [
      "50 GB SSD NVMe",
      "Website-uri Nelimitate",
      "Trafic Nelimitat",
      "Certificat SSL Gratuit",
      "LiteSpeed Web Server",
      "Backup Zilnic",
      "Conturi Email Nelimitate",
      "Baze de Date Nelimitate",
      "Softaculous Installer",
      "WordPress Optimizat",
      "Migrare Gratuită",
      "Protecție Imunify360",
      "Suport Prioritar",
    ],
    prices: {
      "1": { monthly: 59, total: 59, save: 0 },
      "3": { monthly: 56, total: 168, save: 9 },
      "6": { monthly: 53, total: 318, save: 36 },
      "12": { monthly: 49, total: 588, save: 120 },
    },
  },
];
