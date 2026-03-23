import { MapPin, Clock, Dog } from "lucide-react";

interface ActiveMissionProps {
  dogName: string;
  ownerName: string;
  startTime: string;
  location: string;
  status: "en_route" | "en_cours" | "terminée";
}

const statusConfig = {
  en_route: { label: "En route", className: "bg-warning/15 text-warning" },
  en_cours: { label: "En cours", className: "bg-accent/15 text-accent" },
  terminée: { label: "Terminée", className: "bg-muted text-muted-foreground" },
};

const ActiveMissionCard = ({ dogName, ownerName, startTime, location, status }: ActiveMissionProps) => {
  const s = statusConfig[status];
  return (
    <div className="bg-card rounded-2xl shadow-card p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-foreground text-sm">Mission Active</h3>
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${s.className}`}>
          {s.label}
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Dog className="w-4 h-4 text-primary" />
          <span className="text-foreground font-semibold">{dogName}</span>
          <span className="text-muted-foreground">· {ownerName}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          <span>{startTime}</span>
          <MapPin className="w-3.5 h-3.5 ml-2" />
          <span>{location}</span>
        </div>
      </div>
      {status === "en_cours" && (
        <button className="w-full mt-3 py-2.5 rounded-xl bg-cta text-cta-foreground font-bold text-sm shadow-card hover:opacity-90 transition-opacity">
          Terminer la Promenade
        </button>
      )}
    </div>
  );
};

export default ActiveMissionCard;
