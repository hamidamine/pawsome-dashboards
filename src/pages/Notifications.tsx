import BottomNav from "@/components/dashboard/BottomNav";
import { motion } from "framer-motion";
import { Bell, Check, Calendar, MessageCircle, Star, AlertTriangle, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNotifications, useMarkNotificationRead } from "@/hooks/useNotifications";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const iconMap: Record<string, typeof Bell> = {
  booking: Calendar,
  message: MessageCircle,
  review: Star,
  alert: AlertTriangle,
  info: Bell,
};

const mockNotifications = [
  { id: "n1", title: "Nouvelle réservation", message: "Max a une promenade confirmée pour demain à 9h", type: "booking", read: false, created_at: new Date().toISOString(), link: null, user_id: "demo" },
  { id: "n2", title: "Nouveau message", message: "Lucas vous a envoyé un message", type: "message", read: false, created_at: new Date(Date.now() - 3600000).toISOString(), link: null, user_id: "demo" },
  { id: "n3", title: "Avis reçu", message: "Sophie vous a donné 5 étoiles ⭐", type: "review", read: true, created_at: new Date(Date.now() - 86400000).toISOString(), link: null, user_id: "demo" },
  { id: "n4", title: "Rappel balade", message: "N'oubliez pas la promenade de Bella à 14h", type: "info", read: true, created_at: new Date(Date.now() - 172800000).toISOString(), link: null, user_id: "demo" },
];

const Notifications = ({ role }: { role: "owner" | "walker" }) => {
  const { user } = useAuth();
  const { data: realNotifications = [], isLoading } = useNotifications();
  const markRead = useMarkNotificationRead();
  const navigate = useNavigate();

  const isDemo = !user;
  const notifications = isDemo ? mockNotifications : realNotifications;

  const formatDate = (d: string | null) => {
    if (!d) return "";
    try { return format(new Date(d), "d MMM, HH:mm", { locale: fr }); }
    catch { return ""; }
  };

  return (
    <div className="min-h-screen bg-background pb-24 max-w-lg mx-auto">
      <div className="gradient-primary px-4 pt-14 pb-6 relative">
        <button onClick={() => navigate(`/${role}`)} className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h1 className="text-2xl font-black text-white mt-2 text-center">🔔 Notifications</h1>
        <p className="text-white/70 text-sm mt-1 text-center">
          {notifications.filter(n => !n.read).length} non lue{notifications.filter(n => !n.read).length > 1 ? "s" : ""}
        </p>
      </div>

      <div className="px-4 -mt-3 space-y-2">
        {!isDemo && isLoading && <div className="text-center text-muted-foreground text-sm py-10">Chargement...</div>}
        {notifications.length === 0 && (
          <div className="text-center py-16 space-y-3">
            <Bell className="w-12 h-12 text-muted-foreground/30 mx-auto" />
            <p className="text-muted-foreground text-sm">Aucune notification</p>
          </div>
        )}
        {notifications.map((notif, i) => {
          const Icon = iconMap[notif.type || "info"] || Bell;
          return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => !isDemo && !notif.read && markRead.mutate(notif.id)}
              className={`bg-card rounded-2xl shadow-card p-4 flex items-start gap-3 cursor-pointer transition-all ${
                !notif.read ? "ring-2 ring-primary/20" : "opacity-75"
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                !notif.read ? "gradient-primary" : "bg-muted"
              }`}>
                <Icon className={`w-5 h-5 ${!notif.read ? "text-white" : "text-muted-foreground"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-sm text-foreground truncate">{notif.title}</span>
                  {!notif.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{notif.message}</p>
                <p className="text-[10px] text-muted-foreground/70 mt-1 font-semibold">{formatDate(notif.created_at)}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <BottomNav role={role} />
    </div>
  );
};

export default Notifications;
