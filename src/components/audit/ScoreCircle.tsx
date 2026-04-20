import { scoreColor } from "@/lib/audit/runAudit";

interface Props {
  score: number;
  size?: number;
  label?: string;
}

const ScoreCircle = ({ score, size = 180, label }: Props) => {
  const stroke = size * 0.08;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (score / 100) * circumference;
  const color = scoreColor(score);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="hsl(var(--secondary))" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={`${dash} ${circumference}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 1s ease-out" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-bold text-foreground" style={{ color }}>
          {score}
        </span>
        {label && <span className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{label}</span>}
      </div>
    </div>
  );
};

export default ScoreCircle;
