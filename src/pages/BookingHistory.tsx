import BottomNav from "@/components/dashboard/BottomNav";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, CheckCircle2, XCircle, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useBookings } from "@/hooks/useBookings";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { mockBookings } from "@/data/mockData";

const statusLabels: Record<string, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  pending: { label: "En attente", color: "bg-warning/12 text-warning", icon: Clock },
  confirmed: { label: "Confirmée", color: "bg-accent/12 text-accent", icon: CheckCircle2 },
  in_progress: { label: "En cours", color: "bg-primary/12 text-primary", icon: Calendar },
  completed: { label: "Terminée", color: "bg-muted text-muted-foreground", icon: CheckCircle2 },
  cancelled: { label: "Annulée", color: "bg-destructive/12 text-destructive", icon: XCircle },
};

const BookingHistory = ({ role }: { role: "owner" | "walker" }) => {
  const { user } = useAuth();
  const { data: realBookings = [], isLoading } = useBookings(role);
  const navigate = useNavigate();
  const isDemo = !user;
  const bookings = isDemo ? mockBookings : realBookings;

  const formatDate = (d: string) => {
    try { return format(new Date(d), "EEE d MMM", { locale: fr }); }
    catch { return d; }
  };

  return (
    <div className="min-h-screen bg-background pb-24 max-w-lg mx-auto">
      <div className="gradient-primary px-4 pt-14 pb-6 relative">
        <button onClick={() => navigate(`/${role}`)} className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h1 className="text-2xl font-black text-white mt-2 text-center">📋 Mes Réservations</h1>
        <p className="text-white/70 text-sm mt-1 text-center">{bookings.length} réservation{bookings.length > 1 ? "s" : ""}</p>
      </div>

      <div className="px-4 -mt-3 space-y-2">
        {!isDemo && isLoading && <div className="text-center text-muted-foreground text-sm py-10">Chargement...</div>}
        {!isLoading && bookings.length === 0 && (
          <div className="text-center text-muted-foreground text-sm py-10">Aucune réservation</div>
        )}
        {bookings.map((b, i) => {
          const status = statusLabels[b.status || "pending"];
          const StatusIcon = status.icon;
          return (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-2xl shadow-card p-4 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">🐕</span>
                  <span className="font-bold text-sm text-foreground">{(b as any).dogs?.name || "Chien"}</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${status.color}`}>
                  <StatusIcon className="w-3 h-3" />
                  {status.label}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(b.scheduled_date)}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{b.scheduled_time}</span>
                <span className="flex items-center gap-1">{b.duration_minutes || 30} min</span>
              </div>
              {b.address && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />{b.address}
                </div>
              )}
              <div className="flex items-center justify-between text-xs">
                <span className="capitalize text-muted-foreground">{b.service_type}</span>
                {b.price && <span className="font-bold text-foreground">{Number(b.price)}€</span>}
              </div>
            </motion.div>
          );
        })}
      </div>

      <BottomNav role={role} />
    </div>
  );
};

export default BookingHistory;
