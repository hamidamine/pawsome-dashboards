import { CheckCircle2, Clock, Heart, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Badge {
  icon: LucideIcon;
  label: string;
  sub?: string;
  color: string;
}

const defaultBadges: Badge[] = [
  { icon: CheckCircle2, label: "Certifié", color: "bg-primary" },
  { icon: Clock, label: "Expérience", sub: "5 ans", color: "bg-accent" },
  { icon: Heart, label: "Passion", color: "bg-passion" },
  { icon: Users, label: "Communauté", sub: "128 clients", color: "bg-community" },
];

const BadgeGrid = ({ badges = defaultBadges }: { badges?: Badge[] }) => (
  <div className="grid grid-cols-4 gap-2">
    {badges.map((badge, i) => (
      <div
        key={i}
        className={`${badge.color} text-primary-foreground rounded-2xl p-3 flex flex-col items-center justify-center gap-1 shadow-card`}
      >
        <badge.icon className="w-6 h-6" />
        <span className="text-xs font-bold text-center leading-tight">{badge.label}</span>
        {badge.sub && <span className="text-[10px] opacity-80">{badge.sub}</span>}
      </div>
    ))}
  </div>
);

export default BadgeGrid;
