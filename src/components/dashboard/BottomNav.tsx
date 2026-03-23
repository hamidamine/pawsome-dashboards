import { Home, Heart, MessageCircle, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

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
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="max-w-lg mx-auto flex items-center justify-around relative">
        {items.slice(0, 2).map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-0.5 py-3 px-4 transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-semibold">{item.label}</span>
            </button>
          );
        })}

        {/* GO button */}
        <button
          onClick={() => navigate(role === "owner" ? "/owner/reserver" : "/walker/go")}
          className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        >
          <span className="text-xl font-extrabold">GO</span>
        </button>
        <div className="w-16" /> {/* spacer */}

        {items.slice(2).map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-0.5 py-3 px-4 transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-semibold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
