import { Home, Heart, MessageCircle, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

interface BottomNavProps {
  role: "owner" | "walker";
}

const BottomNav = ({ role }: BottomNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { icon: Home, label: "Accueil", path: `/${role}` },
    { icon: Heart, label: "Favoris", path: `/${role}/favoris` },
    { icon: MessageCircle, label: "Messages", path: `/${role}/messages` },
    { icon: User, label: "Profil", path: `/${role}/profil` },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-50">
      <div className="max-w-lg mx-auto flex items-center justify-around relative">
        {items.slice(0, 2).map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-0.5 py-3 px-4 transition-all duration-200 relative ${
                active ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" strokeWidth={active ? 2.5 : 2} />
              <span className="text-[10px] font-bold">{item.label}</span>
              {active && (
                <motion.div
                  layoutId="bottomnav-indicator"
                  className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-b-full gradient-primary"
                />
              )}
            </button>
          );
        })}

        {/* GO button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.08 }}
          onClick={() => navigate(role === "owner" ? "/owner/reserver" : "/walker/go")}
          className="absolute -top-7 left-1/2 -translate-x-1/2 w-[60px] h-[60px] rounded-full gradient-primary text-primary-foreground flex items-center justify-center shadow-glow-primary border-4 border-card"
        >
          <span className="text-lg font-black tracking-tight">GO</span>
        </motion.button>
        <div className="w-16" />

        {items.slice(2).map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-0.5 py-3 px-4 transition-all duration-200 relative ${
                active ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" strokeWidth={active ? 2.5 : 2} />
              <span className="text-[10px] font-bold">{item.label}</span>
              {active && (
                <motion.div
                  layoutId="bottomnav-indicator"
                  className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-b-full gradient-primary"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
