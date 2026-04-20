export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: "Web Design" | "SEO" | "Business";
  date: string;
  author: string;
  readTime: string;
  cover: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "cat-costa-un-site-de-prezentare-2026",
    title: "Cât costă un site de prezentare în 2026",
    excerpt:
      "Ghid complet cu toate costurile reale: design, dezvoltare, hosting, mentenanță. Plus ce să eviți când primești o ofertă.",
    category: "Business",
    date: "2026-04-15",
    author: "Echipa WebCraft",
    readTime: "7 min",
    cover:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    content: `
## De ce variază atât de mult prețurile

Probabil ai văzut oferte pentru un site de prezentare între **300 RON și 15.000 RON**. Diferența nu este o greșeală — reflectă diferențe reale în calitate, timp investit și rezultate.

### 1. Site-uri "ieftine" (300 - 1.500 RON)

De obicei sunt template-uri WordPress modificate superficial. Probleme frecvente:

- Viteză slabă (scor PageSpeed sub 50)
- Design generic, fără identitate
- Fără optimizare SEO reală
- Fără suport după lansare

Funcționează pentru un proiect personal, dar **nu sunt o investiție** pentru o afacere serioasă.

### 2. Site-uri profesionale (2.500 - 6.000 RON)

Aici intră majoritatea afacerilor mici și mijlocii din România. Ce primești:

- Design personalizat pe brandul tău
- Cod curat, viteză optimizată
- SEO de bază (meta-tag-uri, structură, sitemap)
- Hosting inclus în primul an
- Suport real în primele luni

### 3. Site-uri premium (6.000 - 15.000+ RON)

Pentru branduri care vor să iasă din mulțime: animații, integrări (rezervări, plăți, CRM), traduceri multiple, conținut copywriting inclus.

## Costuri ascunse de știut

- **Hosting:** 200-600 RON/an pentru ceva decent
- **Domeniu .ro:** ~80 RON/an
- **SSL:** ar trebui să fie gratuit (Let's Encrypt)
- **Mentenanță:** 100-300 RON/lună dacă vrei liniște completă

## Concluzie

Pentru o afacere reală, **bugetul minim sănătos este 3.000 RON**. Sub această sumă, fie compromiți calitatea, fie ascunzi costuri viitoare.
    `,
  },
  {
    slug: "wordpress-vs-site-custom",
    title: "WordPress vs site custom: ce alegi pentru afacerea ta",
    excerpt:
      "Comparație onestă între cele două abordări. Când are sens WordPress și când e mai bine să mergi pe cod custom.",
    category: "Web Design",
    date: "2026-04-08",
    author: "Echipa WebCraft",
    readTime: "6 min",
    cover:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80",
    content: `
## Ambele opțiuni sunt valide

Nu există un răspuns universal. Decizia depinde de tipul afacerii, bugetul și planurile de creștere.

## Când are sens WordPress

- Vrei să editezi singur conținutul des (blog, oferte)
- Bugetul este sub 5.000 RON
- Ai nevoie de funcționalități standard (formulare, magazin simplu)
- Vrei să poți schimba ușor furnizorul în viitor

## Când are sens un site custom

- Ai nevoie de performanță maximă (PageSpeed 95+)
- Vrei un design și interacțiuni unice
- Ai integrări complexe (CRM, ERP, API-uri)
- Securitatea este critică (date sensibile)

## Costuri pe termen lung

WordPress pare mai ieftin la început, dar plugin-urile premium, mentenanța și update-urile pot adăuga 500-1.500 RON/an. Un site custom are costuri inițiale mai mari, dar întreținere minimă.

## Recomandarea noastră

Pentru 80% din afacerile mici din România, **WordPress bine făcut este alegerea corectă**. Pentru branduri premium și aplicații, custom-ul câștigă.
    `,
  },
  {
    slug: "10-greseli-seo-frecvente",
    title: "10 greșeli SEO pe care le vedem pe 90% din site-urile românești",
    excerpt:
      "Audităm zilnic site-uri și aceleași probleme apar mereu. Verifică-le pe ale tale — sunt rapid de remediat.",
    category: "SEO",
    date: "2026-04-01",
    author: "Echipa WebCraft",
    readTime: "8 min",
    cover:
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1200&q=80",
    content: `
## Greșelile clasice care îți strică SEO-ul

### 1. Title-uri identice pe toate paginile

Fiecare pagină trebuie să aibă un title unic, sub 60 caractere, cu cuvântul-cheie principal.

### 2. Meta description lipsă sau auto-generată

Scrie un rezumat de 150-160 caractere care convinge utilizatorul să dea click.

### 3. Imagini fără atribut alt

Google nu "vede" imagini fără descriere text. Plus că pierzi accesibilitate.

### 4. Viteză slabă pe mobil

Peste 70% din traficul din România este mobil. Sub 3 secunde de încărcare = obligatoriu.

### 5. Lipsa unui sitemap.xml

Fișier simplu care spune Google ce pagini să indexeze. Multe site-uri nu îl au.

### 6. URL-uri urâte

\`/produs?id=4567\` vs \`/scaun-birou-ergonomic\`. Diferența contează.

### 7. Conținut duplicat

Aceleași texte pe mai multe pagini = penalizare. Folosește canonical sau rescrie.

### 8. Heading-uri haotice

Un singur H1 pe pagină. H2, H3 ierarhic. Nu sări de la H1 la H4.

### 9. Lipsa structured data (Schema.org)

Rich snippets în Google = CTR mai mare. JSON-LD se adaugă în 10 minute.

### 10. Ignorarea Search Console

Tool-ul gratuit de la Google îți spune exact ce probleme are site-ul. Verifică-l lunar.

## Vrei un audit complet?

Folosește [tool-ul nostru gratuit de audit](/audit) — îți spune în 2 minute ce probleme are site-ul tău și cum le repari.
    `,
  },
];

export const blogCategories = ["Toate", "Web Design", "SEO", "Business"] as const;
