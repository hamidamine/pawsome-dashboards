import { MapPin, Clock, Camera, Footprints } from "lucide-react";
import { motion } from "framer-motion";

interface WalkReportProps {
  date: string;
  walkerName: string;
  dogName: string;
  duration: string;
  distance: string;
  photos: number;
}

const WalkReportCard = ({ date, walkerName, dogName, duration, distance, photos }: WalkReportProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-card rounded-2xl shadow-card p-4"
  >
    <div className="flex items-center justify-between mb-3">
      <h3 className="font-bold text-foreground">📋 Rapport de Balade</h3>
      <span className="text-[10px] text-muted-foreground font-semibold bg-muted px-2 py-0.5 rounded-full">{date}</span>
    </div>
    <p className="text-xs text-muted-foreground mb-3">
      {dogName} promené par <span className="font-bold text-foreground">{walkerName}</span>
    </p>
    <div className="grid grid-cols-3 gap-2">
      {[
        { icon: Clock, label: "Durée", value: duration, gradient: "gradient-primary" },
        { icon: Footprints, label: "Distance", value: distance, gradient: "gradient-accent" },
        { icon: Camera, label: "Photos", value: `${photos}`, gradient: "gradient-passion" },
      ].map((item) => (
        <div key={item.label} className="bg-muted/60 rounded-xl p-3 flex flex-col items-center gap-1.5">
          <div className={`w-8 h-8 rounded-lg ${item.gradient} flex items-center justify-center`}>
            <item.icon className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-black text-foreground">{item.value}</span>
          <span className="text-[9px] text-muted-foreground font-semibold">{item.label}</span>
        </div>
      ))}
    </div>
    <button className="w-full mt-3 py-2.5 rounded-xl border-2 border-primary/20 text-sm font-bold text-primary hover:bg-primary/5 transition-colors">
      Voir le détail
    </button>
  </motion.div>
);

export default WalkReportCard;
