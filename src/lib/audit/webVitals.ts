// Heuristic estimates for Core Web Vitals from static HTML.
// These are NOT real measurements (need a real browser for that — Lighthouse),
// but they catch common red flags that strongly correlate with poor scores.

export interface VitalsEstimate {
  lcpRiskScore: number; // 0-100, lower = worse
  clsRiskScore: number; // 0-100, lower = worse
  flags: {
    heroImageNotPreloaded: boolean;
    largeImagesWithoutDimensions: number;
    imagesWithoutDimensionsTotal: number;
    blockingScriptsInHead: number;
    renderBlockingStylesheets: number;
    iframesWithoutDimensions: number;
    fontsWithoutDisplaySwap: number;
    asyncImages: number;
  };
}

export function estimateWebVitals(doc: Document, htmlBytes: number): VitalsEstimate {
  const head = doc.head;

  // ---- LCP signals ----
  const heroImg = doc.querySelector("main img, header img, section img, img");
  const preloadedImages = Array.from(head?.querySelectorAll('link[rel="preload"][as="image"]') || []);
  const heroImageNotPreloaded = !!heroImg && preloadedImages.length === 0;

  const blockingScriptsInHead = head
    ? Array.from(head.querySelectorAll("script[src]")).filter(
        (s) => !s.hasAttribute("async") && !s.hasAttribute("defer") && s.getAttribute("type") !== "module",
      ).length
    : 0;

  const renderBlockingStylesheets = head
    ? Array.from(head.querySelectorAll('link[rel="stylesheet"]')).filter(
        (l) => !l.getAttribute("media") || l.getAttribute("media") === "all" || l.getAttribute("media") === "screen",
      ).length
    : 0;

  // Count async-loaded images (good for LCP if hero isn't lazy, bad if hero is lazy)
  const asyncImages = doc.querySelectorAll('img[loading="lazy"]').length;
  const heroIsLazy = heroImg?.getAttribute("loading") === "lazy";

  let lcp = 100;
  if (heroImageNotPreloaded) lcp -= 15;
  if (heroIsLazy) lcp -= 25; // critical hero shouldn't be lazy
  if (blockingScriptsInHead > 2) lcp -= Math.min(25, blockingScriptsInHead * 5);
  if (renderBlockingStylesheets > 3) lcp -= Math.min(20, (renderBlockingStylesheets - 3) * 5);
  if (htmlBytes > 200_000) lcp -= 10;
  if (htmlBytes > 500_000) lcp -= 10;

  // ---- CLS signals ----
  const allImages = Array.from(doc.querySelectorAll("img"));
  const imagesWithoutDimensions = allImages.filter(
    (img) =>
      !img.getAttribute("width") &&
      !img.getAttribute("height") &&
      !/width\s*:|height\s*:|aspect-ratio/.test(img.getAttribute("style") || ""),
  );

  // "Large" = appears above fold (first 5 images) and has no dimensions
  const largeImagesWithoutDimensions = imagesWithoutDimensions.slice(0, 5).length;

  const iframes = Array.from(doc.querySelectorAll("iframe"));
  const iframesWithoutDimensions = iframes.filter(
    (i) => !i.getAttribute("width") && !i.getAttribute("height"),
  ).length;

  // Web fonts without font-display: swap cause FOIT and layout shift
  const fontLinks = Array.from(doc.querySelectorAll('link[href*="fonts."], link[href*="font"]'));
  const fontsWithoutDisplaySwap = fontLinks.filter((l) => {
    const href = l.getAttribute("href") || "";
    return /\.(woff2?|ttf|otf)/i.test(href) && !/display=swap/i.test(href);
  }).length;

  let cls = 100;
  cls -= Math.min(40, imagesWithoutDimensions.length * 3);
  cls -= largeImagesWithoutDimensions * 5;
  cls -= iframesWithoutDimensions * 8;
  cls -= fontsWithoutDisplaySwap * 5;

  return {
    lcpRiskScore: Math.max(0, Math.round(lcp)),
    clsRiskScore: Math.max(0, Math.round(cls)),
    flags: {
      heroImageNotPreloaded,
      largeImagesWithoutDimensions,
      imagesWithoutDimensionsTotal: imagesWithoutDimensions.length,
      blockingScriptsInHead,
      renderBlockingStylesheets,
      iframesWithoutDimensions,
      fontsWithoutDisplaySwap,
      asyncImages,
    },
  };
}
