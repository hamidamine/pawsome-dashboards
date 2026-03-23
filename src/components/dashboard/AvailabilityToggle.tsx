import { useState } from "react";
import { MapPin } from "lucide-react";

const AvailabilityToggle = () => {
  const [available, setAvailable] = useState(true);

  return (
    <div className="bg-card rounded-2xl shadow-card p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${available ? "bg-accent/15" : "bg-muted"}`}>
          <MapPin className={`w-5 h-5 ${available ? "text-accent" : "text-muted-foreground"}`} />
        </div>
        <div>
          <span className="font-bold text-foreground text-sm">
            {available ? "Disponible" : "Indisponible"}
          </span>
          <p className="text-[10px] text-muted-foreground">
            {available ? "Vous recevez des demandes" : "Vous ne recevez plus de demandes"}
          </p>
        </div>
      </div>
      <button
        onClick={() => setAvailable(!available)}
        className={`relative w-12 h-7 rounded-full transition-colors ${available ? "bg-accent" : "bg-muted"}`}
      >
        <span
          className={`absolute top-0.5 w-6 h-6 rounded-full bg-card shadow transition-transform ${
            available ? "left-[22px]" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
};

export default AvailabilityToggle;
