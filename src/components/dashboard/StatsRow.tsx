import { Star } from "lucide-react";

interface Stat {
  value: string | number;
  label: string;
  isStar?: boolean;
}

const StatsRow = ({ stats }: { stats: Stat[] }) => (
  <div className="bg-card rounded-2xl shadow-card p-4 flex items-center justify-around divide-x divide-border">
    {stats.map((stat, i) => (
      <div key={i} className="flex flex-col items-center px-4">
        <span className="text-xl font-extrabold text-foreground flex items-center gap-1">
          {stat.value}
          {stat.isStar && <Star className="w-4 h-4 fill-star text-star" />}
        </span>
        <span className="text-xs text-muted-foreground font-medium">{stat.label}</span>
      </div>
    ))}
  </div>
);

export default StatsRow;
