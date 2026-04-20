import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  onSubmit: (url: string) => void;
  loading: boolean;
}

const AuditForm = ({ onSubmit, loading }: Props) => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const trimmed = url.trim();
    if (!trimmed) {
      setError("Introdu un URL pentru a începe analiza.");
      return;
    }
    try {
      const test = trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
      new URL(test);
    } catch {
      setError("URL invalid. Exemplu: exemplu.ro sau https://exemplu.ro");
      return;
    }
    onSubmit(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            type="text"
            placeholder="exemplu.ro"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={loading}
            className="h-14 pl-12 text-base bg-card border-2 focus-visible:ring-primary"
            aria-label="URL site web pentru audit"
          />
        </div>
        <Button type="submit" variant="professional" size="xl" disabled={loading} className="h-14 px-8">
          {loading ? (
            <>
              <Loader2 className="animate-spin" /> Analizez...
            </>
          ) : (
            "Analizează gratuit"
          )}
        </Button>
      </div>
      {error && <p className="text-destructive text-sm mt-3 text-center">{error}</p>}
      <p className="text-muted-foreground text-xs text-center mt-4">
        Gratuit · Fără înregistrare · Rezultate în câteva secunde
      </p>
    </form>
  );
};

export default AuditForm;
