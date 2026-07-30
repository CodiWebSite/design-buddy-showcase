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
  { id: "12", label: "12 Luni", months: 12, badge: "Economisești 20%" },
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
    tagline: "Ideal pentru un site de prezentare rapid și sigur.",
    features: [
      "5 GB SSD NVMe",
      "1 Website",
      "SSL Gratuit",
      "LiteSpeed",
      "Backup Zilnic",
      "Email Nelimitat",
      "Softaculous",
      "Imunify360",
      "WordPress Optimizat",
      "Suport",
    ],
    prices: {
      "1": { monthly: 39, total: 39, save: 0 },
      "3": { monthly: 37, total: 111, save: 6 },
      "6": { monthly: 35, total: 210, save: 24 },
      "12": { monthly: 32, total: 384, save: 84 },
    },
  },
  {
    id: "business",
    name: "Business",
    tagline: "Pentru afaceri cu trafic constant și mai multe site-uri.",
    popular: true,
    features: [
      "10 GB SSD NVMe",
      "Până la 5 Website-uri",
      "SSL Gratuit",
      "LiteSpeed",
      "Backup Zilnic",
      "Email Nelimitat",
      "Baze de Date Nelimitate",
      "Softaculous",
      "Imunify360",
      "Migrare Gratuită",
      "Suport Prioritar",
    ],
    prices: {
      "1": { monthly: 69, total: 69, save: 0 },
      "3": { monthly: 65, total: 195, save: 12 },
      "6": { monthly: 62, total: 372, save: 42 },
      "12": { monthly: 57, total: 684, save: 144 },
    },
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Resurse maxime pentru magazine online și proiecte complexe.",
    features: [
      "20 GB SSD NVMe",
      "Website-uri Nelimitate",
      "SSL Gratuit",
      "LiteSpeed",
      "Backup Zilnic",
      "Email Nelimitat",
      "Baze de Date Nelimitate",
      "Softaculous",
      "Imunify360",
      "Migrare Gratuită",
      "Suport Prioritar",
    ],
    prices: {
      "1": { monthly: 99, total: 99, save: 0 },
      "3": { monthly: 94, total: 282, save: 15 },
      "6": { monthly: 89, total: 534, save: 60 },
      "12": { monthly: 82, total: 984, save: 204 },
    },
  },
];
