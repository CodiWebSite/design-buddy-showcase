// Lightweight client-side technology detection from HTML + DOM.
// Returns a deduped list of friendly names.

export function detectTechnologies(html: string, doc: Document): string[] {
  const found = new Set<string>();
  const lower = html.toLowerCase();

  const has = (...needles: string[]) => needles.every((n) => lower.includes(n.toLowerCase()));
  const any = (...needles: string[]) => needles.some((n) => lower.includes(n.toLowerCase()));

  const generator = doc.querySelector('meta[name="generator"]')?.getAttribute("content") || "";

  // ---- CMS / Site builders ----
  if (any("/wp-content/", "/wp-includes/", "wp-json") || /wordpress/i.test(generator)) found.add("WordPress");
  if (any("cdn.shopify.com", "shopify.theme", "x-shopify")) found.add("Shopify");
  if (/drupal/i.test(generator) || any("/sites/default/files/", "drupal-settings-json")) found.add("Drupal");
  if (/joomla/i.test(generator) || any("/components/com_", "joomla!")) found.add("Joomla");
  if (any("static.parastorage.com", "wix.com", "wixstatic.com")) found.add("Wix");
  if (any("squarespace.com", "static1.squarespace.com", "squarespace-cdn")) found.add("Squarespace");
  if (any("webflow.com", "assets.website-files.com")) found.add("Webflow");
  if (/ghost/i.test(generator) || any("ghost.io", "/ghost/")) found.add("Ghost");
  if (any("/skin/frontend/", "mage/cookies", "magento")) found.add("Magento");
  if (any("/_prestashop", "prestashop")) found.add("PrestaShop");
  if (any("hubspot.com", "hs-scripts.com", "hsforms.net")) found.add("HubSpot");

  // ---- JS Frameworks ----
  if (any('id="__next"', "/_next/static/", "__next_data__")) found.add("Next.js");
  if (any('id="root"', "react", "react-dom") && doc.querySelector("[data-reactroot], #root")) found.add("React");
  if (any("nuxt", "__nuxt", "/_nuxt/")) found.add("Nuxt");
  if (any("data-v-", "vue.js", "/vue@") || doc.querySelector("[data-server-rendered]")) found.add("Vue");
  if (any("ng-version", "ng-app", "angular")) found.add("Angular");
  if (any("svelte", "/_app/immutable/")) found.add("Svelte");
  if (any("astro-island", "data-astro")) found.add("Astro");
  if (any("gatsby", "___gatsby")) found.add("Gatsby");
  if (any("remix-route", "/_remix/", "__remix")) found.add("Remix");
  if (any("lovable.dev", "lovable.app")) found.add("Lovable");

  // ---- Analytics / Marketing ----
  if (any("googletagmanager.com/gtm.js", "gtm.start")) found.add("Google Tag Manager");
  if (any("google-analytics.com/ga.js", "googletagmanager.com/gtag", "ga('create'", "gtag('config'")) found.add("Google Analytics");
  if (any("connect.facebook.net", "fbq(")) found.add("Meta Pixel");
  if (any("static.hotjar.com", "hj(")) found.add("Hotjar");
  if (any("cdn.matomo.cloud", "matomo.js")) found.add("Matomo");
  if (any("plausible.io/js")) found.add("Plausible");

  // ---- CDN / Hosting hints ----
  if (any("cloudflare", "cdn-cgi/")) found.add("Cloudflare");
  if (any("vercel.app", "vercel-insights")) found.add("Vercel");
  if (any("netlify.app", "netlify.com")) found.add("Netlify");

  // ---- UI / CSS ----
  if (any("tailwindcss", "tw-class", "data-tailwind") || /tailwind/i.test(html)) {
    if (any("tailwind")) found.add("Tailwind CSS");
  }
  if (any("bootstrap.min.css", "/bootstrap@", "bootstrap.bundle")) found.add("Bootstrap");
  if (any("fonts.googleapis.com")) found.add("Google Fonts");
  if (any("font-awesome", "fontawesome")) found.add("Font Awesome");
  if (any("jquery", "/jquery@", "jquery.min.js")) found.add("jQuery");

  // ---- Payments / E-commerce ----
  if (any("js.stripe.com", "stripe.com/v3")) found.add("Stripe");
  if (any("paypal.com/sdk", "paypalobjects.com")) found.add("PayPal");
  if (any("woocommerce", "wc-block")) found.add("WooCommerce");

  // Avoid double-listing React when Next.js is detected
  if (found.has("Next.js")) found.delete("React");
  if (found.has("Nuxt")) found.delete("Vue");

  return Array.from(found).sort();
}
