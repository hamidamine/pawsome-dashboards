import { Calendar, MapPin, Clock, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface QuickAction {
  icon: LucideIcon;
  label: string;
  gradient: string;
}

const ownerActions: QuickAction[] = [
  { icon: Calendar, label: "Réserver", gradient: "gradient-primary" },
  { icon: MapPin, label: "Tracking", gradient: "gradient-accent" },
  { icon: Clock, label: "Historique", gradient: "gradient-passion" },
  { icon: Star, label: "Favoris", gradient: "gradient-community" },
];

const walkerActions: QuickAction[] = [
  { icon: Calendar, label: "Planning", gradient: "gradient-primary" },
  { icon: MapPin, label: "Carte", gradient: "gradient-accent" },
  { icon: Clock, label: "Historique", gradient: "gradient-passion" },
  { icon: Star, label: "Avis", gradient: "gradient-community" },
];

const QuickActions = ({ role }: { role: "owner" | "walker" }) => {
  const actions = role === "owner" ? ownerActions : walkerActions;
  return (
    <div className="grid grid-cols-4 gap-2">
      {actions.map((action, i) => (
        <motion.button
          key={action.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          whileTap={{ scale: 0.93 }}
          className="bg-card rounded-2xl shadow-card p-3 flex flex-col items-center gap-2 hover:shadow-card-hover transition-shadow"
        >
          <div className={`w-11 h-11 rounded-xl ${action.gradient} flex items-center justify-center shadow-card`}>
            <action.icon className="w-5 h-5 text-white" />
          </div>
          <span className="text-[10px] font-bold text-foreground">{action.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default QuickActions;
