import { Calendar, Clock } from "lucide-react";

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
  <div className="bg-card rounded-2xl shadow-card p-4">
    <h3 className="font-bold text-foreground mb-3">Prochaines Promenades</h3>
    <div className="space-y-3">
      {bookings.map((b) => (
        <div key={b.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/50">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-foreground">{b.dogName}</span>
              <span
                className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                  b.status === "confirmée"
                    ? "bg-accent/15 text-accent"
                    : "bg-warning/15 text-warning"
                }`}
              >
                {b.status === "confirmée" ? "Confirmée" : "En attente"}
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              <span>{b.date}</span>
              <Clock className="w-3 h-3 ml-1" />
              <span>{b.time} · {b.duration}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default UpcomingBookings;
