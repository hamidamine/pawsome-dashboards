import { TrendingUp, Euro } from "lucide-react";

interface EarningsCardProps {
  today: number;
  week: number;
  month: number;
  trend: number;
}

const EarningsCard = ({ today, week, month, trend }: EarningsCardProps) => (
  <div className="bg-card rounded-2xl shadow-card p-4">
    <div className="flex items-center justify-between mb-3">
      <h3 className="font-bold text-foreground">Revenus</h3>
      <div className="flex items-center gap-1 text-accent text-xs font-semibold">
        <TrendingUp className="w-3.5 h-3.5" />
        +{trend}%
      </div>
    </div>
    <div className="flex items-center justify-around divide-x divide-border">
      {[
        { label: "Aujourd'hui", value: today },
        { label: "Semaine", value: week },
        { label: "Mois", value: month },
      ].map((item) => (
        <div key={item.label} className="flex flex-col items-center px-3">
          <span className="text-lg font-extrabold text-foreground flex items-center gap-0.5">
            {item.value}<Euro className="w-3.5 h-3.5" />
          </span>
          <span className="text-[10px] text-muted-foreground font-medium">{item.label}</span>
        </div>
      ))}
    </div>
  </div>
);

export default EarningsCard;
