import { Bell, Settings } from "lucide-react";
import { motion } from "framer-motion";

interface DashboardHeaderProps {
  title: string;
  notificationCount?: number;
}

const DashboardHeader = ({ title, notificationCount = 0 }: DashboardHeaderProps) => (
  <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 pt-4 pb-3">
    <motion.h2
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="text-lg font-black text-white drop-shadow-lg"
    >
      {title}
    </motion.h2>
    <div className="flex items-center gap-2">
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="relative w-10 h-10 rounded-full bg-card/20 backdrop-blur-md flex items-center justify-center border border-white/20"
      >
        <Bell className="w-[18px] h-[18px] text-white" />
        {notificationCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full gradient-cta text-white text-[10px] font-black flex items-center justify-center shadow-glow-cta"
          >
            {notificationCount}
          </motion.span>
        )}
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="w-10 h-10 rounded-full bg-card/20 backdrop-blur-md flex items-center justify-center border border-white/20"
      >
        <Settings className="w-[18px] h-[18px] text-white" />
      </motion.button>
    </div>
  </div>
);

export default DashboardHeader;
