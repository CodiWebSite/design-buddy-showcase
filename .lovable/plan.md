

# WebCraft Audit - Tool de analiză website

Construim un tool public de audit website (similar softaudit.ro) la `/audit`, cu link shareable, scor combinat (heuristici + Google PageSpeed) și PDF brandat (copertă dark + conținut light).

## Ce primește utilizatorul

1. **Pagina `/audit`** — input URL + buton "Analizează gratuit"
2. **Loader animat** cu pași live (Securitate → SEO → Performanță → Infrastructură → UX)
3. **Dashboard rezultate** — scor general 0-100, grade A-F per categorie, listă issues cu explicații + recomandări
4. **Buton "Audit aprofundat"** — rulează Google PageSpeed Insights pentru scor Lighthouse real
5. **Buton "Descarcă PDF"** — raport complet brandat
6. **Link shareable** — `/audit/raport/{slug}` pe care îl trimiți clienților
7. **CTA contextual** — "Vrei să remediem aceste probleme? Cere ofertă" (link spre #contact)

## Categorii analizate

| Categorie | Verificări |
|-----------|------------|
| **Securitate** | HTTPS/SSL valid, certificat expirare, HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, mixed content |
| **SEO** | Title (lungime), meta description, H1 unic, structură headings, canonical, robots.txt, sitemap.xml, Open Graph, Twitter Cards, lang attribute, alt text imagini |
| **Performanță** | TTFB, mărime HTML, compresie (gzip/br), cache headers, număr requesturi, scor Lighthouse (opțional) |
| **Infrastructură** | DNS records (A, MX, TXT, SPF, DMARC), server headers, tehnologie detectată, IP/hosting |
| **UX/Accesibilitate** | Viewport meta, favicon, lang, alt text rate, font-size mobil, touch targets |

## Plan tehnic

### Backend (Lovable Cloud)

**Activare Lovable Cloud** (necesar pentru DB + edge functions + storage PDF).

**Tabel `audits`**:
```
id uuid pk
slug text unique          -- pentru /audit/raport/{slug}
url text
overall_score int         -- 0-100
category_scores jsonb     -- { security: 85, seo: 70, ... }
issues jsonb              -- array of { category, severity, title, description, recommendation }
metadata jsonb            -- title, description, ip, server, tech detected
lighthouse_data jsonb     -- nullable, populat la "audit aprofundat"
created_at timestamp
ip_address text           -- pentru rate limiting
```

RLS: SELECT public (oricine poate citi cu slug), INSERT prin edge function (cu service role).

**Tabel `audit_rate_limits`**:
```
ip_address text
audit_count int
window_start timestamp
```
Limit: 5 audituri/oră per IP.

**Edge Function `audit-website`**:
- Input: `{ url }`
- Validare URL cu Zod
- Check rate limit
- `fetch()` HTML + headers
- Parse cu regex/DOMParser pentru SEO
- Verifică SSL via `fetch` HEAD
- DNS lookup (opțional, prin Cloudflare DNS-over-HTTPS)
- Scoring algorithm (greutăți per categorie)
- Generează slug unic
- Insert în DB
- Return raport complet

**Edge Function `audit-pagespeed`**:
- Input: `{ audit_id, url }`
- Apelează Google PageSpeed Insights API (gratis, fără key pentru < 25k/zi)
- Update `lighthouse_data` în DB
- Recalculează scoruri

**Edge Function `generate-audit-pdf`**:
- Input: `{ slug }`
- Folosește `pdf-lib` (Deno-compatible)
- Pagina 1: copertă dark (#0F172A) cu logo, URL, scor mare, data
- Paginile 2-N: light theme cu issues, recomandări, scoruri per categorie
- Return PDF blob

### Frontend

**Rute noi**:
- `/audit` — formular + loader + dashboard live
- `/audit/raport/:slug` — raport persistent shareable

**Componente noi** în `src/components/audit/`:
- `AuditForm.tsx` — input URL + validare
- `AuditLoader.tsx` — animație multi-step cu progres
- `AuditDashboard.tsx` — scor circular general + grid categorii
- `CategoryCard.tsx` — grade A-F + listă issues expandabile
- `IssueItem.tsx` — severitate (critical/warning/info) + recomandare
- `AuditCTA.tsx` — "Cere ofertă pentru remediere"

**Update Navbar**: adăugăm link "Audit Gratuit" în meniu.

### Stilistică

- Dashboard match cu site-ul (dark theme, accente albastre, carduri `card-premium`)
- Scoruri vizuale: circular progress, culori semantic (verde 80-100, galben 50-79, roșu <50)
- Loader: pași secvențiali cu check icons + skeleton

## Limitări conștiente

- **CORS**: nu putem face audit din browser direct → tot prin edge function (OK)
- **Lighthouse real**: PageSpeed API ia 15-30s → opțional, separat de auditul rapid
- **Rate limit**: 5/oră per IP previne abuz, dar utilizatori în spatele NAT (operator mobile) pot fi afectați

## Pași de implementare

1. Activare Lovable Cloud + creare tabele + RLS
2. Edge function `audit-website` (heuristici complete)
3. Pagina `/audit` cu form + loader + dashboard
4. Pagina `/audit/raport/:slug` (shareable)
5. Edge function `audit-pagespeed` + buton "Audit aprofundat"
6. Edge function `generate-audit-pdf` + buton download
7. Link în Navbar + CTA către contact
8. Rate limiting + testare

