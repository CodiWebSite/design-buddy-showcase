import { useEffect } from "react";
import LegalPageLayout, { LegalSection } from "@/components/LegalPageLayout";

const Privacy = () => {
  useEffect(() => {
    document.title = "Politica de Confidențialitate | WebCraft";
    const meta = document.querySelector('meta[name="description"]');
    const desc =
      "Politica de confidențialitate WebCraft: cum colectăm, folosim și protejăm datele tale conform GDPR (Regulamentul UE 2016/679).";
    if (meta) meta.setAttribute("content", desc);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = desc;
      document.head.appendChild(m);
    }
  }, []);

  return (
    <LegalPageLayout title="Politica de Confidențialitate" updated="20 aprilie 2026">
      <LegalSection title="1. Cine suntem">
        <p>
          WebCraft („noi", „operatorul") oferă servicii de web design, dezvoltare web, hosting
          și mentenanță în România. Această politică explică modul în care colectăm, folosim și
          protejăm datele tale cu caracter personal, în conformitate cu Regulamentul UE
          2016/679 (GDPR) și Legea nr. 190/2018.
        </p>
        <p>
          <strong>Date de contact operator:</strong>
          <br />
          Email:{" "}
          <a href="mailto:contact@webcraft.ro" className="text-primary hover:underline">
            contact@webcraft.ro
          </a>
          <br />
          Telefon:{" "}
          <a href="tel:+40755649856" className="text-primary hover:underline">
            +40 755 649 856
          </a>
        </p>
      </LegalSection>

      <LegalSection title="2. Ce date colectăm">
        <p>În funcție de modul în care interacționezi cu noi, putem prelucra:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Date de identificare și contact:</strong> nume, email, telefon, denumire
            companie, CUI (când este cazul).
          </li>
          <li>
            <strong>Date din formularul de contact:</strong> numele, emailul, telefonul și
            mesajul pe care ni-l trimiți.
          </li>
          <li>
            <strong>Date de facturare:</strong> date fiscale necesare emiterii facturilor
            conform legislației române.
          </li>
          <li>
            <strong>Date tehnice:</strong> adresă IP, tip de dispozitiv, browser, pagini
            vizitate, colectate automat prin loguri și instrumente analitice.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Scopurile prelucrării">
        <p>Folosim datele tale pentru:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Răspuns la cererile de ofertă și comunicarea pe parcursul proiectului.</li>
          <li>Executarea contractului de prestări servicii.</li>
          <li>Emiterea facturilor și îndeplinirea obligațiilor fiscale.</li>
          <li>Suport tehnic și mentenanță după lansare.</li>
          <li>Îmbunătățirea site-ului și a serviciilor oferite.</li>
          <li>Apărarea intereselor legitime în caz de litigii.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Temeiul legal">
        <p>Prelucrăm datele tale în baza:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Executării contractului</strong> — pentru livrarea serviciilor comandate
            (art. 6 alin. 1 lit. b GDPR).
          </li>
          <li>
            <strong>Obligației legale</strong> — pentru facturare și păstrarea documentelor
            contabile (art. 6 alin. 1 lit. c GDPR).
          </li>
          <li>
            <strong>Interesului legitim</strong> — pentru securitatea site-ului și
            îmbunătățirea serviciilor (art. 6 alin. 1 lit. f GDPR).
          </li>
          <li>
            <strong>Consimțământului tău</strong> — atunci când îți soliciți expres acordul
            (de exemplu, pentru newsletter, dacă va fi cazul).
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Cât timp păstrăm datele">
        <p>
          Datele de contact și conversațiile sunt păstrate pe durata colaborării și încă 3 ani
          după ultima interacțiune, pentru a putea oferi suport. Documentele contabile (facturi)
          se păstrează 10 ani, conform legislației române. Datele din loguri tehnice se
          păstrează maxim 12 luni.
        </p>
      </LegalSection>

      <LegalSection title="6. Cui transmitem datele">
        <p>Putem partaja date strict necesare cu:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Furnizori de hosting și infrastructură (de ex. Cloud-Center.ro).</li>
          <li>Furnizori de email și comunicare.</li>
          <li>Contabil / firmă de contabilitate, pentru facturare.</li>
          <li>Autorități publice, atunci când suntem obligați prin lege.</li>
        </ul>
        <p>
          Toți partenerii noștri sunt obligați contractual să respecte GDPR. Nu vindem și nu
          închiriem datele tale către terți.
        </p>
      </LegalSection>

      <LegalSection title="7. Transferuri în afara UE">
        <p>
          În principiu, datele sunt stocate pe servere din Uniunea Europeană. Atunci când
          folosim servicii cu infrastructură în afara UE, ne asigurăm că există garanții
          adecvate (clauze contractuale standard aprobate de Comisia Europeană).
        </p>
      </LegalSection>

      <LegalSection title="8. Drepturile tale conform GDPR">
        <p>În calitate de persoană vizată, ai următoarele drepturi:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Dreptul de acces</strong> — să afli ce date prelucrăm despre tine.
          </li>
          <li>
            <strong>Dreptul la rectificare</strong> — să corectezi date inexacte.
          </li>
          <li>
            <strong>Dreptul la ștergere („dreptul de a fi uitat")</strong> — să soliciți
            ștergerea datelor, cu excepția celor pe care trebuie să le păstrăm prin lege.
          </li>
          <li>
            <strong>Dreptul la restricționarea prelucrării.</strong>
          </li>
          <li>
            <strong>Dreptul la portabilitate</strong> — să primești datele într-un format
            structurat.
          </li>
          <li>
            <strong>Dreptul de opoziție</strong> — să te opui prelucrării bazate pe interes
            legitim.
          </li>
          <li>
            <strong>Dreptul de a-ți retrage consimțământul</strong> — oricând, fără să afecteze
            prelucrările anterioare.
          </li>
          <li>
            <strong>Dreptul de a depune plângere</strong> la Autoritatea Națională de
            Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP),{" "}
            <a
              href="https://www.dataprotection.ro"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              www.dataprotection.ro
            </a>
            .
          </li>
        </ul>
        <p>
          Pentru exercitarea oricărui drept, scrie-ne la{" "}
          <a href="mailto:contact@webcraft.ro" className="text-primary hover:underline">
            contact@webcraft.ro
          </a>
          . Răspundem în maxim 30 de zile.
        </p>
      </LegalSection>

      <LegalSection title="9. Cookies și tehnologii similare">
        <p>
          Site-ul folosește cookies tehnice strict necesare funcționării. Putem folosi și
          cookies de analiză (de exemplu, pentru statistici de trafic), doar cu consimțământul
          tău acolo unde este obligatoriu. Poți controla cookies din setările browserului.
        </p>
      </LegalSection>

      <LegalSection title="10. Securitatea datelor">
        <p>
          Aplicăm măsuri tehnice și organizatorice rezonabile pentru a proteja datele tale
          împotriva accesului neautorizat, pierderii sau divulgării: HTTPS, parole puternice,
          acces restricționat, backup-uri și actualizări de securitate.
        </p>
      </LegalSection>

      <LegalSection title="11. Minori">
        <p>
          Serviciile WebCraft se adresează companiilor și persoanelor adulte. Nu colectăm
          intenționat date personale de la persoane sub 16 ani.
        </p>
      </LegalSection>

      <LegalSection title="12. Modificări ale politicii">
        <p>
          Această politică poate fi actualizată periodic. Versiunea curentă este cea publicată
          pe site, cu data ultimei actualizări menționată în partea de sus.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
};

export default Privacy;
