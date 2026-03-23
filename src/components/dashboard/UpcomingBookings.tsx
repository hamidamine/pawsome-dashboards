import { Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface Booking {
  id: string;
  dogName: string;
  date: string;
  time: string;
  duration: string;
  status: "confirmée" | "en_attente";
}

const defaultBookings: Booking[] = [
  { id: "1", dogName: "Max", date: "Lun 24 Mars", time: "09:00", duration: "30 min", status: "confirmée" },
  { id: "2", dogName: "Bella", date: "Mar 25 Mars", time: "14:00", duration: "45 min", status: "en_attente" },
];

const UpcomingBookings = ({ bookings = defaultBookings }: { bookings?: Booking[] }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-card rounded-2xl shadow-card p-4"
  >
    <h3 className="font-bold text-foreground mb-3">📅 Prochaines Promenades</h3>
    <div className="space-y-2.5">
      {bookings.map((b, i) => (
        <motion.div
          key={b.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-card">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-foreground">{b.dogName}</span>
              <span
                className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                  b.status === "confirmée"
                    ? "bg-accent/12 text-accent"
                    : "bg-warning/12 text-warning"
                }`}
              >
                {b.status === "confirmée" ? "✅ Confirmée" : "⏳ En attente"}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5 font-semibold">
              <span>{b.date}</span>
              <Clock className="w-3 h-3 ml-1" />
              <span>{b.time} · {b.duration}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default UpcomingBookings;
