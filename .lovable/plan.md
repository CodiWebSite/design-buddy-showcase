

# Plan îmbunătățiri WebCraft (fără Lovable Cloud)

Toate adăugirile sunt 100% client-side — fără backend, DB sau edge functions. Datele sunt statice (în cod) sau salvate în `localStorage`.

## 1. Cookie consent banner GDPR
- Componentă nouă `src/components/CookieBanner.tsx` cu accept/reject + link spre Politica de confidențialitate
- Salvează alegerea în `localStorage` (`cookie-consent: accepted|rejected`)
- Apare doar dacă nu există alegere salvată
- Mount în `App.tsx` (vizibil pe toate paginile)

## 2. Blog static (MDX-free, date în cod)
- Rută nouă `/blog` — listă articole cu card + filtrare pe categorie
- Rută nouă `/blog/:slug` — articol individual cu typography Tailwind prose
- Date în `src/data/blogPosts.ts` (titlu, slug, excerpt, content markdown, categorie, dată, autor, imagine)
- 3 articole exemplu: "Cât costă un site de prezentare în 2026", "WordPress vs site custom: ce alegi", "10 greșeli SEO frecvente"
- Render markdown cu `react-markdown` (deja compatibil)
- Link "Blog" în Navbar + secțiune "Articole recente" pe homepage (opțional)

## 3. Studii de caz portofoliu
- Rută nouă `/portofoliu/:slug`
- Extindere `portfolioItems` în `PortfolioSection.tsx` cu: provocare detaliată, soluție pas cu pas, rezultate (metrici), tehnologii, durată, testimonial client
- Card-urile actuale devin clickable → pagină detaliu
- CTA "Vrei ceva similar?" pe fiecare studiu

## 4. Calculator preț instant
- Componentă nouă `src/components/PriceCalculator.tsx` plasată într-o secțiune pe homepage (între Pricing și Process)
- Selectoare: tip site (prezentare/magazin/custom), nr. pagini (slider), opțiuni (multilingv +X RON, blog +X, rezervări +X, SEO start +X)
- Calculează estimare RON live + breakdown
- CTA "Cere ofertă fermă cu această configurație" → `#contact` cu detaliile pre-completate via query string sau context

## 5. Schema.org structured data
- JSON-LD injectat în `index.html` sau via `useEffect` în `Index.tsx`:
  - `LocalBusiness` (nume, telefon, email, locație, ore)
  - `Service` (servicii oferite cu prețuri)
  - `FAQPage` (din `FAQSection`)
  - `BreadcrumbList` pe paginile interne

## 6. Pagina "Despre"
- Rută nouă `/despre`
- Conținut: misiune, valori, experiență, proces de lucru, foto/avatar
- Link în Navbar și Footer

## 7. Optimizări tehnice
- `og:image` custom în `index.html` (folosim un asset existent sau generăm unul)
- Lazy loading explicit pe imagini portofoliu (`loading="lazy"`)
- `sitemap.xml` static în `public/` cu toate rutele noi
- `robots.txt` actualizat

## Ordine recomandată de implementare
1. **Cookie banner** (rapid, legal obligatoriu)
2. **Schema.org + optimizări tehnice** (SEO instant, fără UI nou)
3. **Pagina Despre** (simplu, încredere)
4. **Blog + 3 articole** (volum mai mare, dar mare impact SEO)
5. **Studii de caz portofoliu** (conversie)
6. **Calculator preț** (lead gen)

## Detalii tehnice

- **Routing**: toate rutele noi adăugate în `src/App.tsx` (deja folosește `react-router-dom`)
- **Markdown**: instalare `react-markdown` + `remark-gfm` pentru blog
- **State global**: niciunul necesar — totul prop-drilling sau `localStorage` pentru cookie
- **Stilistică**: refolosim `card-premium`, gradient-urile și paleta dark existentă din `index.css` și `tailwind.config.ts`
- **Navbar**: adăugăm linkuri "Blog" și "Despre" (poate într-un dropdown "Mai multe" pe desktop pentru a nu aglomera)
- **Footer**: linkuri către Blog, Despre, Studii de caz

## Ce NU includem (necesită Lovable Cloud)
- Salvare audituri în DB + link shareable persistent
- Newsletter cu salvare email-uri
- Comentarii pe blog
- Form contact cu trimitere reală pe email (rămâne pe toast + WhatsApp link)

Spune-mi de unde să încep — pot face toate cele 7 secvențial, sau alegi un subset.

