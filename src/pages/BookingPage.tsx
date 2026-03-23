import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Dog, ArrowLeft, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useDogs } from "@/hooks/useDogs";
import { useCreateBooking } from "@/hooks/useBookings";
import { useNearbyWalkers } from "@/hooks/useNearbyWalkers";
import BottomNav from "@/components/dashboard/BottomNav";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { toast } from "sonner";
import avatarWalker from "@/assets/avatar-walker.jpg";

const BookingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: dogs = [] } = useDogs();
  const { data: walkers = [] } = useNearbyWalkers();
  const createBooking = useCreateBooking();

  const [step, setStep] = useState(1);
  const [selectedDog, setSelectedDog] = useState<string | null>(null);
  const [selectedWalker, setSelectedWalker] = useState<string | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState(30);
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [serviceType, setServiceType] = useState<"promenade" | "garde" | "visite">("promenade");

  const handleSubmit = async () => {
    if (!selectedDog || !date || !time) return toast.error("Champs requis manquants");
    try {
      await createBooking.mutateAsync({
        dog_id: selectedDog,
        walker_id: selectedWalker,
        scheduled_date: date,
        scheduled_time: time,
        duration_minutes: duration,
        address,
        notes,
        service_type: serviceType,
      });
      toast.success("Réservation créée !");
      navigate("/owner");
    } catch (err: any) {
      toast.error(err.message || "Erreur");
    }
  };

  const selectedDogData = dogs.find(d => d.id === selectedDog);

  return (
    <div className="min-h-screen bg-background pb-24 max-w-lg mx-auto">
      <div className="gradient-primary px-4 pt-14 pb-6">
        <DashboardHeader title="📅 Réserver" notificationCount={0} />
        <h1 className="text-2xl font-black text-white mt-2">Nouvelle Réservation</h1>
        <p className="text-white/70 text-sm mt-1">Étape {step}/3</p>
      </div>

      {/* Progress bar */}
      <div className="px-4 -mt-2 mb-4">
        <div className="bg-muted rounded-full h-1.5 overflow-hidden">
          <motion.div animate={{ width: `${(step / 3) * 100}%` }} className="h-full gradient-primary rounded-full" />
        </div>
      </div>

      <div className="px-4 space-y-4">
        {/* Step 1: Choose dog & service */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="bg-card rounded-2xl shadow-card p-4 space-y-3">
              <h3 className="font-bold text-foreground">🐕 Choisir un chien</h3>
              {dogs.length === 0 && <p className="text-sm text-muted-foreground">Ajoutez d'abord un chien depuis votre dashboard</p>}
              <div className="space-y-2">
                {dogs.map(dog => (
                  <button key={dog.id} onClick={() => setSelectedDog(dog.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                      selectedDog === dog.id ? "border-primary bg-primary/5" : "border-border"
                    }`}>
                    <Dog className={`w-5 h-5 ${selectedDog === dog.id ? "text-primary" : "text-muted-foreground"}`} />
                    <div className="text-left">
                      <span className="font-bold text-sm text-foreground">{dog.name}</span>
                      {dog.breed && <span className="text-xs text-muted-foreground ml-2">{dog.breed}</span>}
                    </div>
                    {selectedDog === dog.id && <Check className="w-4 h-4 text-primary ml-auto" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-2xl shadow-card p-4 space-y-3">
              <h3 className="font-bold text-foreground">🎯 Type de service</h3>
              <div className="grid grid-cols-3 gap-2">
                {([
                  { type: "promenade" as const, label: "Promenade", emoji: "🚶" },
                  { type: "garde" as const, label: "Garde", emoji: "🏠" },
                  { type: "visite" as const, label: "Visite", emoji: "👋" },
                ]).map(s => (
                  <button key={s.type} onClick={() => setServiceType(s.type)}
                    className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1 transition-all ${
                      serviceType === s.type ? "border-primary bg-primary/5" : "border-border"
                    }`}>
                    <span className="text-xl">{s.emoji}</span>
                    <span className="text-xs font-bold">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button onClick={() => selectedDog ? setStep(2) : toast.error("Sélectionnez un chien")}
              className="w-full py-3.5 rounded-xl gradient-primary text-white font-bold shadow-glow-primary">
              Continuer →
            </button>
          </motion.div>
        )}

        {/* Step 2: Date, time, location */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <button onClick={() => setStep(1)} className="text-primary font-bold text-sm flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Retour
            </button>

            <div className="bg-card rounded-2xl shadow-card p-4 space-y-3">
              <h3 className="font-bold text-foreground">📅 Date & Heure</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-muted-foreground font-semibold mb-1 block">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="date" value={date} onChange={e => setDate(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-muted text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" required />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground font-semibold mb-1 block">Heure</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="time" value={time} onChange={e => setTime(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-muted text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" required />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground font-semibold mb-1 block">Durée</label>
                <div className="flex gap-2">
                  {[30, 45, 60, 90].map(d => (
                    <button key={d} onClick={() => setDuration(d)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                        duration === d ? "gradient-primary text-white" : "bg-muted text-foreground"
                      }`}>
                      {d} min
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl shadow-card p-4 space-y-3">
              <h3 className="font-bold text-foreground">📍 Lieu de rendez-vous</h3>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <input type="text" value={address} onChange={e => setAddress(e.target.value)}
                  placeholder="Adresse ou lieu de rendez-vous"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-muted text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <textarea value={notes} onChange={e => setNotes(e.target.value)}
                placeholder="Instructions spéciales (optionnel)"
                className="w-full px-3 py-2.5 rounded-xl bg-muted text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30" rows={2} />
            </div>

            <button onClick={() => (date && time) ? setStep(3) : toast.error("Date et heure requises")}
              className="w-full py-3.5 rounded-xl gradient-primary text-white font-bold shadow-glow-primary">
              Continuer →
            </button>
          </motion.div>
        )}

        {/* Step 3: Choose walker & confirm */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <button onClick={() => setStep(2)} className="text-primary font-bold text-sm flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Retour
            </button>

            <div className="bg-card rounded-2xl shadow-card p-4 space-y-3">
              <h3 className="font-bold text-foreground">🏃 Choisir un promeneur (optionnel)</h3>
              <p className="text-xs text-muted-foreground">Laissez vide pour une attribution automatique</p>
              
              <button onClick={() => setSelectedWalker(null)}
                className={`w-full p-3 rounded-xl border-2 text-left transition-all ${
                  !selectedWalker ? "border-primary bg-primary/5" : "border-border"
                }`}>
                <span className="font-bold text-sm">🎲 Attribution automatique</span>
              </button>

              {walkers.map((w: any) => (
                <button key={w.id} onClick={() => setSelectedWalker(w.user_id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                    selectedWalker === w.user_id ? "border-primary bg-primary/5" : "border-border"
                  }`}>
                  <img src={w.profiles?.avatar_url || avatarWalker} alt="" className="w-10 h-10 rounded-full object-cover" />
                  <div className="flex-1 text-left">
                    <span className="font-bold text-sm text-foreground">{w.profiles?.first_name || "Walker"}</span>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>⭐ {Number(w.rating || 0).toFixed(1)}</span>
                      <span>{w.hourly_rate || 15}€/h</span>
                    </div>
                  </div>
                  {selectedWalker === w.user_id && <Check className="w-4 h-4 text-primary" />}
                </button>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-card rounded-2xl shadow-card p-4 space-y-2">
              <h3 className="font-bold text-foreground">📋 Résumé</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Chien</span><span className="font-bold">{selectedDogData?.name}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Service</span><span className="font-bold capitalize">{serviceType}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-bold">{date}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Heure</span><span className="font-bold">{time}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Durée</span><span className="font-bold">{duration} min</span></div>
                {address && <div className="flex justify-between"><span className="text-muted-foreground">Lieu</span><span className="font-bold truncate ml-2">{address}</span></div>}
              </div>
            </div>

            <button onClick={handleSubmit} disabled={createBooking.isPending}
              className="w-full py-3.5 rounded-xl gradient-cta text-white font-black text-base shadow-glow-cta disabled:opacity-50">
              {createBooking.isPending ? "Création..." : "✅ Confirmer la réservation"}
            </button>
          </motion.div>
        )}
      </div>

      <BottomNav role="owner" />
    </div>
  );
};

export default BookingPage;
