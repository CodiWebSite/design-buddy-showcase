import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = `https://wa.me/40755649856?text=${encodeURIComponent(
  "Salut! Sunt interesat de un site nou. Aș vrea o ofertă.",
)}`;

const WhatsAppFloat = () => {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Scrie-ne pe WhatsApp"
      className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-50 group"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping" aria-hidden="true" />
      <span className="relative flex items-center gap-2 bg-[#25D366] text-white pl-4 pr-5 py-3 rounded-full shadow-2xl hover:scale-105 transition-transform duration-200 focus:outline-none">
        <MessageCircle className="w-6 h-6" strokeWidth={2.2} />
        <span className="hidden sm:inline font-semibold text-sm">WhatsApp</span>
      </span>
    </a>
  );
};

export default WhatsAppFloat;
