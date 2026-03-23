import { Sun, CloudRain, Cloud, Thermometer } from "lucide-react";
import { motion } from "framer-motion";

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

const conditionLabels = {
  sunny: "☀️ Ensoleillé",
  cloudy: "☁️ Nuageux",
  rainy: "🌧️ Pluvieux",
};

const WeatherWidget = ({ temp, condition, recommendation }: WeatherWidgetProps) => {
  const Icon = icons[condition];
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl shadow-card p-4 flex items-center gap-3"
    >
      <div className="w-12 h-12 rounded-xl gradient-passion flex items-center justify-center shadow-card">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-black text-foreground text-lg">{temp}°</span>
          <span className="text-xs text-muted-foreground font-semibold">{conditionLabels[condition]}</span>
        </div>
        <p className="text-[11px] text-muted-foreground mt-0.5">{recommendation}</p>
      </div>
    </motion.div>
  );
};

export default WeatherWidget;
