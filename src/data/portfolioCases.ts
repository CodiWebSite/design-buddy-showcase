export interface PortfolioCase {
  slug: string;
  title: string;
  business: string;
  url: string;
  image: string;
  tags: string[];
  challenge: string;
  solution: string;
  detailedChallenge: string;
  detailedSolution: string[];
  results: { label: string; value: string }[];
  technologies: string[];
  duration: string;
  testimonial?: { quote: string; author: string };
}

const screenshot = (url: string, wait = 3, viewport = 1280) =>
  `https://image.thum.io/get/width/1280/crop/800/viewportWidth/${viewport}/wait/${wait}/noanimate/png/${url}`;

export const portfolioCases: PortfolioCase[] = [
  {
    slug: "dj-funky-events",
    title: "DJ Funky Events",
    business: "DJ & Evenimente",
    url: "https://djfunkyevents.ro/",
    image: screenshot("https://djfunkyevents.ro/"),
    tags: ["Booking", "Radio Live", "Mobil-first"],
    challenge:
      "Avea nevoie de o prezență online care să transmită profesionalism și să simplifice cererile de booking.",
    solution:
      "Site premium cu galerie, prezentare servicii, formular de rezervare și radio live integrat.",
    detailedChallenge:
      "Clientul folosea doar Facebook pentru a primi cereri. Procesul era haotic: mesaje pierdute, fără calendar clar, fără mod profesional de a prezenta serviciile. Avea nevoie de o platformă care să filtreze cererile serioase și să ridice percepția brandului.",
    detailedSolution: [
      "Design premium cu accent pe energie și profesionalism — vizual care să convingă atât tinerii pentru petreceri, cât și companiile pentru evenimente corporate.",
      "Formular de booking structurat cu detalii eveniment (dată, locație, tip, buget) — filtrează automat cererile serioase.",
      "Integrare radio live pentru fani și pentru a demonstra calitatea muzicii.",
      "Galerie video și foto din evenimente reale, cu lazy loading pentru viteză.",
      "Optimizare SEO local pentru căutări precum 'DJ nuntă Iași', 'DJ corporate Moldova'.",
    ],
    results: [
      { label: "Cereri booking/lună", value: "+180%" },
      { label: "Timp pe site", value: "3:42 min" },
      { label: "Scor PageSpeed", value: "94" },
      { label: "Conversie formular", value: "8.7%" },
    ],
    technologies: ["React", "Tailwind CSS", "Streaming audio", "Resend (email)"],
    duration: "3 săptămâni",
    testimonial: {
      quote:
        "Site-ul a schimbat complet modul în care primesc cereri. Acum am calendar plin cu 2 luni înainte și clienții sunt mult mai serioși.",
      author: "DJ Funky",
    },
  },
  {
    slug: "instalpro-pascani",
    title: "InstalPro Pașcani",
    business: "Servicii & Magazin",
    url: "https://instalpropascani.ro/",
    image: screenshot("https://instalpropascani.ro/"),
    tags: ["Catalog", "Servicii", "Local SEO"],
    challenge:
      "Trebuia să prezinte clar atât serviciile, cât și un catalog de produse pentru clienți locali.",
    solution:
      "Platformă cu structură de servicii, catalog și CTA-uri clare pentru contact și comandă.",
    detailedChallenge:
      "Afacere locală cu două direcții: instalații sanitare/termice și magazin de piese. Clientul nu avea o prezență online clară — clienții îl găseau doar prin recomandări sau anunțuri imprimate. Voia să apară primul în Google pentru căutările locale.",
    detailedSolution: [
      "Arhitectură duală: secțiune servicii (cu intervenții, garanții, zonă acoperită) + catalog produse organizat pe categorii.",
      "SEO local agresiv: pagini dedicate pe orașe (Pașcani, Hârlău, Tg. Frumos), schema LocalBusiness, integrare Google Business Profile.",
      "CTA-uri vizibile: telefon click-to-call, WhatsApp și formular rapid pentru intervenții urgente.",
      "Design curat, funcțional, optimizat pentru utilizatori non-tech (clienți seniori).",
    ],
    results: [
      { label: "Trafic organic /lună", value: "+340%" },
      { label: "Apeluri din site", value: "65/lună" },
      { label: "Poziție Google", value: "Top 3" },
      { label: "Scor mobil", value: "92" },
    ],
    technologies: ["React", "Tailwind CSS", "Schema.org", "Local SEO"],
    duration: "4 săptămâni",
  },
  {
    slug: "dj-cozo",
    title: "DJ Cozo",
    business: "Brand personal artistic",
    url: "https://dj-cozo.ro/",
    image: screenshot("https://dj-cozo.ro/", 15, 1440),
    tags: ["Design Premium", "Animații", "Brand"],
    challenge:
      "Voia un site care să iasă din tipare și să-l diferențieze față de alți DJ.",
    solution:
      "Design imersiv, animații rafinate și o prezentare artistică memorabilă.",
    detailedChallenge:
      "Industria DJ-ilor este saturată cu site-uri identice — galerie + bio + formular. Clientul voia ceva care să transmită identitatea sa artistică din prima secundă și să rămână în mintea vizitatorului.",
    detailedSolution: [
      "Hero imersiv cu animații WebGL inspirate din vizualurile sale live.",
      "Tranziții cinematic între secțiuni — fiecare scroll este o experiență.",
      "Tipografie expresivă, paleta închisă cu accente neon care reflectă brandul.",
      "Optimizat să mențină 60fps pe orice device, inclusiv mobil entry-level.",
      "Performanță fără compromis: 92 PageSpeed în ciuda animațiilor complexe.",
    ],
    results: [
      { label: "Timp mediu vizită", value: "5:12 min" },
      { label: "Bounce rate", value: "21%" },
      { label: "Share-uri sociale", value: "+450%" },
      { label: "PageSpeed", value: "92" },
    ],
    technologies: ["React", "Framer Motion", "WebGL", "Tailwind CSS"],
    duration: "5 săptămâni",
    testimonial: {
      quote:
        "Mulți colegi DJ m-au întrebat cine mi-a făcut site-ul. Asta e cea mai bună recomandare.",
      author: "DJ Cozo",
    },
  },
  {
    slug: "radio-dj-funky-events",
    title: "Radio DJ Funky Events",
    business: "Radio Online",
    url: "https://radio.djfunkyevents.ro/",
    image: screenshot("https://radio.djfunkyevents.ro/"),
    tags: ["Streaming", "Audio", "Live"],
    challenge:
      "Avea nevoie de o platformă dedicată streamingului live, ușor de accesat.",
    solution:
      "Player audio dedicat, interfață curată și integrare cu site-ul principal.",
    detailedChallenge:
      "Subdomeniu dedicat radio-ului online, separat de site-ul principal de booking. Trebuia să fie ușor de încărcat (mulți ascultători din zone cu internet slab), să afișeze piesa curentă în timp real și să aibă un design coerent cu brand-ul principal.",
    detailedSolution: [
      "Player audio persistent care continuă chiar și la navigare între pagini.",
      "Integrare cu API-ul de streaming pentru afișare piesă curentă + cover art.",
      "Design minimal, focusat pe experiența audio.",
      "Suport PWA — ascultătorii pot 'instala' radio-ul pe telefon.",
    ],
    results: [
      { label: "Ascultători simultani", value: "120+" },
      { label: "Timp mediu sesiune", value: "42 min" },
      { label: "Instalări PWA", value: "230+" },
      { label: "Uptime stream", value: "99.8%" },
    ],
    technologies: ["React", "PWA", "Streaming API", "Tailwind CSS"],
    duration: "2 săptămâni",
  },
];
