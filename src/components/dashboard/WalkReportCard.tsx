import { MapPin, Clock, Camera, Footprints } from "lucide-react";

interface WalkReportProps {
  date: string;
  walkerName: string;
  dogName: string;
  duration: string;
  distance: string;
  photos: number;
}

const WalkReportCard = ({ date, walkerName, dogName, duration, distance, photos }: WalkReportProps) => (
  <div className="bg-card rounded-2xl shadow-card p-4">
    <div className="flex items-center justify-between mb-2">
      <h3 className="font-bold text-foreground text-sm">Rapport de Balade</h3>
      <span className="text-[10px] text-muted-foreground">{date}</span>
    </div>
    <p className="text-xs text-muted-foreground mb-3">
      {dogName} promené par <span className="font-semibold text-foreground">{walkerName}</span>
    </p>
    <div className="grid grid-cols-3 gap-2">
      {[
        { icon: Clock, label: "Durée", value: duration },
        { icon: Footprints, label: "Distance", value: distance },
        { icon: Camera, label: "Photos", value: `${photos}` },
      ].map((item) => (
        <div key={item.label} className="bg-muted rounded-xl p-2.5 flex flex-col items-center gap-1">
          <item.icon className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold text-foreground">{item.value}</span>
          <span className="text-[9px] text-muted-foreground">{item.label}</span>
        </div>
      ))}
    </div>
    <button className="w-full mt-3 py-2 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-muted transition-colors">
      Voir le détail
    </button>
  </div>
);

export default WalkReportCard;
