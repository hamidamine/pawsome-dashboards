import { Sun, CloudRain, Cloud, Thermometer } from "lucide-react";

interface WeatherWidgetProps {
  temp: number;
  condition: "sunny" | "cloudy" | "rainy";
  recommendation: string;
}

const icons = {
  sunny: Sun,
  cloudy: Cloud,
  rainy: CloudRain,
};

const WeatherWidget = ({ temp, condition, recommendation }: WeatherWidgetProps) => {
  const Icon = icons[condition];
  return (
    <div className="bg-card rounded-2xl shadow-card p-4 flex items-center gap-3">
      <div className="w-12 h-12 rounded-xl bg-warning/15 flex items-center justify-center">
        <Icon className="w-6 h-6 text-warning" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Thermometer className="w-4 h-4 text-muted-foreground" />
          <span className="font-bold text-foreground">{temp}°C</span>
          <span className="text-xs text-muted-foreground capitalize">{condition === "sunny" ? "Ensoleillé" : condition === "cloudy" ? "Nuageux" : "Pluvieux"}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">{recommendation}</p>
      </div>
    </div>
  );
};

export default WeatherWidget;
