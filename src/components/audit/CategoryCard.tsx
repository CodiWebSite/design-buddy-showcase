import { useState } from "react";
import { ChevronDown, AlertTriangle, AlertCircle, Info, CheckCircle2 } from "lucide-react";
import { scoreToGrade, scoreColor } from "@/lib/audit/runAudit";
import type { Category, Issue } from "@/lib/audit/types";
import { CATEGORY_LABELS } from "@/lib/audit/types";

const SEV_ICON = {
  critical: AlertCircle,
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle2,
};

const SEV_STYLES = {
  critical: "text-destructive bg-destructive/10 border-destructive/30",
  warning: "text-amber-500 bg-amber-500/10 border-amber-500/30",
  info: "text-primary bg-primary/10 border-primary/30",
  success: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
};

interface Props {
  category: Category;
  score: number;
  issues: Issue[];
}

const CategoryCard = ({ category, score, issues }: Props) => {
  const [open, setOpen] = useState(false);
  const grade = scoreToGrade(score);
  const color = scoreColor(score);

  return (
    <div className="card-premium rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-5 flex items-center justify-between hover:bg-secondary/30 transition-colors"
        aria-expanded={open}
      >
        <div className="flex items-center gap-4">
          <div
            className="h-14 w-14 rounded-full flex items-center justify-center font-bold text-xl"
            style={{ backgroundColor: `${color}20`, color }}
          >
            {grade}
          </div>
          <div className="text-left">
            <h3 className="font-bold text-lg text-foreground">{CATEGORY_LABELS[category]}</h3>
            <p className="text-sm text-muted-foreground">
              {issues.length === 0 ? "Niciun issue detectat" : `${issues.length} ${issues.length === 1 ? "issue" : "issues"}`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold" style={{ color }}>
            {score}
          </span>
          <ChevronDown size={20} className={`text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
        </div>
      </button>
      {open && issues.length > 0 && (
        <div className="border-t border-border bg-background/50 p-4 space-y-3">
          {issues.map((issue, idx) => {
            const Icon = SEV_ICON[issue.severity];
            return (
              <div key={idx} className={`rounded-lg border p-4 ${SEV_STYLES[issue.severity]}`}>
                <div className="flex items-start gap-3">
                  <Icon size={20} className="flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground mb-1">{issue.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{issue.description}</p>
                    <p className="text-sm text-foreground">
                      <span className="font-semibold text-primary">Recomandare: </span>
                      {issue.recommendation}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {open && issues.length === 0 && (
        <div className="border-t border-border bg-background/50 p-4 text-center text-emerald-500 text-sm font-medium">
          ✓ Această categorie nu are probleme detectate
        </div>
      )}
    </div>
  );
};

export default CategoryCard;
