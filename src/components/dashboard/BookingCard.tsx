import { Calendar, Clock } from "lucide-react";

interface BookingCardProps {
  title: string;
  time: string;
  duration: string;
}

const BookingCard = ({ title, time, duration }: BookingCardProps) => (
  <div className="bg-card rounded-2xl shadow-card p-4">
    <div className="flex items-center gap-2 text-muted-foreground text-xs font-semibold mb-2">
      <Clock className="w-4 h-4" />
      <span>En cours de réservation</span>
    </div>
    <div className="flex items-center gap-3">
      <Calendar className="w-5 h-5 text-primary" />
      <div>
        <p className="font-bold text-sm text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{time} · Durée: {duration}</p>
      </div>
    </div>
  </div>
);

export default BookingCard;
