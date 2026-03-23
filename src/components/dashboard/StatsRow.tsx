import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface Stat {
  value: string | number;
  label: string;
  isStar?: boolean;
}

const StatsRow = ({ stats }: { stats: Stat[] }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-card rounded-2xl shadow-card p-4 flex items-center justify-around"
  >
    {stats.map((stat, i) => (
      <div key={i} className="flex flex-col items-center px-3 relative">
        {i > 0 && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-8 bg-border" />}
        <span className="text-xl font-black text-foreground flex items-center gap-1">
          {stat.value}
          {stat.isStar && <Star className="w-4 h-4 fill-star text-star" />}
        </span>
        <span className="text-[10px] text-muted-foreground font-semibold mt-0.5">{stat.label}</span>
      </div>
    ))}
  </motion.div>
);

export default StatsRow;
