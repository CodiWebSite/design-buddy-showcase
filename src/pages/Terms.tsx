import { useEffect } from "react";
import LegalPageLayout, { LegalSection } from "@/components/LegalPageLayout";

const Terms = () => {
  useEffect(() => {
    document.title = "Termeni și Condiții | WebCraft";
    const meta = document.querySelector('meta[name="description"]');
    const desc =
      "Termenii și condițiile de utilizare a serviciilor WebCraft: web design, dezvoltare, hosting și mentenanță în România.";
    if (meta) meta.setAttribute("content", desc);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = desc;
      document.head.appendChild(m);
    }
  }, []);

  return (
    <LegalPageLayout title="Termeni și Condiții" updated="20 aprilie 2026">
      <LegalSection title="1. Introducere">
        <p>
          Acești Termeni și Condiții reglementează utilizarea site-ului web WebCraft și a
          serviciilor oferite (web design, dezvoltare web, redesign, SEO, hosting și mentenanță).
          Prin accesarea site-ului sau prin contractarea serviciilor noastre, ești de acord cu
          prevederile de mai jos.
        </p>
      </LegalSection>

      <LegalSection title="2. Date de identificare">
        <p>
          Serviciile sunt oferite de WebCraft, prin reprezentantul său legal, cu sediul în
          România. Pentru orice solicitare, ne poți contacta la{" "}
          <a href="mailto:contact@webcraft.ro" className="text-primary hover:underline">
            contact@webcraft.ro
          </a>{" "}
          sau la telefon{" "}
          <a href="tel:+40755649856" className="text-primary hover:underline">
            +40 755 649 856
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="3. Servicii oferite">
        <p>WebCraft oferă următoarele tipuri de servicii:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Creare site-uri web de prezentare și magazine online</li>
          <li>Dezvoltare web personalizată</li>
          <li>Redesign și optimizare site-uri existente</li>
          <li>Optimizare SEO de bază</li>
          <li>Hosting premium prin parteneri</li>
          <li>Mentenanță lunară și suport tehnic</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Comenzi și contracte">
        <p>
          Orice colaborare începe cu o discuție inițială și o ofertă personalizată. După
          acceptarea ofertei, se semnează un contract sau un acord scris (poate fi și prin email)
          care specifică scopul, termenele, costurile și etapele de plată.
        </p>
      </LegalSection>

      <LegalSection title="5. Plăți și facturare">
        <p>
          Plata se efectuează în RON, pe baza facturii emise. De regulă lucrăm cu un avans la
          începutul proiectului și restul la livrare. Pentru pachete extinse putem împărți plata
          pe etape, conform contractului.
        </p>
        <p>
          Facturile se emit electronic și se transmit prin email. Termenul standard de plată
          este de 7 zile calendaristice de la emitere, dacă nu se convine altfel.
        </p>
      </LegalSection>

      <LegalSection title="6. Livrare și termene">
        <p>
          Termenul de livrare se stabilește individual și depinde de complexitatea proiectului
          și de viteza cu care primim conținutul (texte, imagini, branding) din partea ta.
          Termenele estimate sunt comunicate înainte de începerea proiectului.
        </p>
      </LegalSection>

      <LegalSection title="7. Drepturi de proprietate intelectuală">
        <p>
          După plata integrală a serviciilor, clientul devine proprietarul site-ului final
          (cod sursă, design și conținut realizat de WebCraft pentru proiect). Componentele
          terțe (biblioteci open-source, fonturi, imagini stoc) rămân sub licențele lor
          originale.
        </p>
        <p>
          WebCraft își rezervă dreptul de a folosi proiectele realizate ca referință în
          portofoliul propriu, cu excepția cazului în care clientul solicită expres
          confidențialitate.
        </p>
      </LegalSection>

      <LegalSection title="8. Modificări și revizii">
        <p>
          Fiecare proiect include un număr de runde de feedback agreate în contract.
          Modificările majore care depășesc scopul inițial se pot factura separat, după o
          ofertă suplimentară.
        </p>
      </LegalSection>

      <LegalSection title="9. Hosting și servicii partenere">
        <p>
          Hostingul recomandat și banner-ele afiliate (de exemplu, Cloud-Center.ro) sunt
          oferite prin parteneri externi. WebCraft poate primi un comision de afiliere fără
          costuri suplimentare pentru tine. Termenii de utilizare ai serviciilor partenerilor
          se aplică direct între tine și furnizorul respectiv.
        </p>
      </LegalSection>

      <LegalSection title="10. Garanție și suport">
        <p>
          Oferim suport gratuit pentru remedierea bug-urilor în perioada specificată în
          contract (de obicei 30–90 zile după lansare). După această perioadă, suportul se
          poate continua printr-un pachet de mentenanță lunară.
        </p>
      </LegalSection>

      <LegalSection title="11. Limitarea răspunderii">
        <p>
          WebCraft nu poate fi tras la răspundere pentru pierderi indirecte, pierderi de
          profit, întreruperi cauzate de furnizori terți (hosting, domenii, servicii externe)
          sau de modificările făcute de client după livrare.
        </p>
      </LegalSection>

      <LegalSection title="12. Încetarea colaborării">
        <p>
          Oricare dintre părți poate înceta colaborarea cu o notificare scrisă. Sumele plătite
          pentru serviciile deja prestate nu se restituie. Munca finalizată parțial poate fi
          predată clientului proporțional cu plățile efectuate.
        </p>
      </LegalSection>

      <LegalSection title="13. Soluționarea litigiilor">
        <p>
          Eventualele neînțelegeri se rezolvă pe cale amiabilă. Dacă nu este posibil, sunt
          competente instanțele române. Conform OUG nr. 38/2015, consumatorii au dreptul de a
          apela la platforma SOL a Comisiei Europene:{" "}
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            ec.europa.eu/consumers/odr
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="14. Modificări ale termenilor">
        <p>
          WebCraft își rezervă dreptul de a actualiza acești termeni. Versiunea în vigoare este
          cea publicată pe site la momentul accesării. Modificările se aplică doar pentru
          contractele noi.
        </p>
      </LegalSection>

      <LegalSection title="15. Contact">
        <p>
          Pentru întrebări legate de acești termeni, scrie-ne la{" "}
          <a href="mailto:contact@webcraft.ro" className="text-primary hover:underline">
            contact@webcraft.ro
          </a>
          .
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
};

export default Terms;
