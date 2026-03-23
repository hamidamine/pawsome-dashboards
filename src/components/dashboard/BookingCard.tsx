import { Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface BookingCardProps {
  title: string;
  time: string;
  duration: string;
}

const BookingCard = ({ title, time, duration }: BookingCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-card rounded-2xl shadow-card p-4 border-l-4 border-primary"
  >
    <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold mb-2">
      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
        <Clock className="w-3.5 h-3.5 text-primary" />
      </div>
      <span>En cours de réservation</span>
    </div>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow-primary">
        <Calendar className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="font-bold text-sm text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{time} · Durée: {duration}</p>
      </div>
    </div>
  </motion.div>
);

export default BookingCard;
