import { Calendar, MapPin, Clock, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface QuickAction {
  icon: LucideIcon;
  label: string;
  color: string;
}

const ownerActions: QuickAction[] = [
  { icon: Calendar, label: "Réserver", color: "bg-primary" },
  { icon: MapPin, label: "Tracking", color: "bg-accent" },
  { icon: Clock, label: "Historique", color: "bg-warning" },
  { icon: Star, label: "Favoris", color: "bg-passion" },
];

const walkerActions: QuickAction[] = [
  { icon: Calendar, label: "Planning", color: "bg-primary" },
  { icon: MapPin, label: "Carte", color: "bg-accent" },
  { icon: Clock, label: "Historique", color: "bg-warning" },
  { icon: Star, label: "Avis", color: "bg-passion" },
];

const QuickActions = ({ role }: { role: "owner" | "walker" }) => {
  const actions = role === "owner" ? ownerActions : walkerActions;
  return (
    <div className="grid grid-cols-4 gap-2">
      {actions.map((action) => (
        <button
          key={action.label}
          className="bg-card rounded-2xl shadow-card p-3 flex flex-col items-center gap-1.5 hover:shadow-card-hover transition-shadow"
        >
          <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center`}>
            <action.icon className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-[10px] font-bold text-foreground">{action.label}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
