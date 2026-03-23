import walkerHero from "@/assets/walker-hero.jpg";
import avatarWalker from "@/assets/avatar-walker.jpg";
import DogCard from "@/components/dashboard/DogCard";
import BookingCard from "@/components/dashboard/BookingCard";
import BottomNav from "@/components/dashboard/BottomNav";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import WeatherWidget from "@/components/dashboard/WeatherWidget";
import QuickActions from "@/components/dashboard/QuickActions";
import NearbyWalkerCard from "@/components/dashboard/NearbyWalkerCard";
import WalkReportCard from "@/components/dashboard/WalkReportCard";
import UpcomingBookings from "@/components/dashboard/UpcomingBookings";
import { CheckCircle2, TrendingUp, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { useDogs, useAddDog } from "@/hooks/useDogs";
import { useBookings } from "@/hooks/useBookings";
import { useNearbyWalkers } from "@/hooks/useNearbyWalkers";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import dogGolden from "@/assets/dog-golden.jpg";

const OwnerDashboard = () => {
  const { user } = useAuth();
  const { data: profile } = useProfile();
  const { data: dogs = [], isLoading: dogsLoading } = useDogs();
  const { data: bookings = [] } = useBookings("owner");
  const { data: nearbyWalkers = [] } = useNearbyWalkers();
  const addDog = useAddDog();
  const [showAddDog, setShowAddDog] = useState(false);
  const [newDogName, setNewDogName] = useState("");
  const [newDogBreed, setNewDogBreed] = useState("");

  const displayName = profile?.first_name || "Propriétaire";
  const upcomingBookings = bookings
    .filter(b => b.status === "confirmed" || b.status === "pending")
    .slice(0, 3)
    .map(b => ({
      id: b.id,
      dogName: (b as any).dogs?.name || "Chien",
      date: b.scheduled_date,
      time: b.scheduled_time,
      duration: `${b.duration_minutes || 30} min`,
      status: (b.status === "confirmed" ? "confirmée" : "en_attente") as "confirmée" | "en_attente",
    }));

  const handleAddDog = async () => {
    if (!newDogName.trim()) return toast.error("Nom du chien requis");
    try {
      await addDog.mutateAsync({ name: newDogName, breed: newDogBreed || null });
      toast.success(`${newDogName} ajouté !`);
      setNewDogName("");
      setNewDogBreed("");
      setShowAddDog(false);
    } catch { toast.error("Erreur lors de l'ajout"); }
  };

  const completedBookings = bookings.filter(b => b.status === "completed").length;

  return (
    <div className="min-h-screen bg-background pb-24 max-w-lg mx-auto">
      <div className="relative">
        <DashboardHeader title="🐾 DogWalking Hub" notificationCount={bookings.filter(b => b.status === "pending").length} />
        <img src={walkerHero} alt="Mes chiens" className="w-full h-56 object-cover" width={800} height={512} />
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl shadow-elevated p-4 flex items-center gap-4">
            <div className="relative">
              <img src={profile?.avatar_url || avatarWalker} alt={displayName} className="w-16 h-16 rounded-full object-cover ring-4 ring-primary/20" />
              <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full gradient-accent border-2 border-card flex items-center justify-center">
                <span className="text-[8px] text-white">✓</span>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-black text-foreground">{displayName}</h1>
              <p className="text-sm text-muted-foreground font-semibold">Propriétaire de {dogs.length} chien{dogs.length > 1 ? "s" : ""}</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="px-4 mt-14 space-y-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="gradient-accent text-white rounded-2xl p-3.5 flex items-center justify-center gap-2 font-bold shadow-card">
          <CheckCircle2 className="w-5 h-5" />
          {profile?.bio ? "Profil Complet 100%" : "Complétez votre profil"}
        </motion.div>

        <QuickActions role="owner" />

        {/* Dogs section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-bold text-foreground">🐕 Mes Chiens</h3>
            <button onClick={() => setShowAddDog(!showAddDog)} className="text-primary text-xs font-bold flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Ajouter
            </button>
          </div>

          {showAddDog && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
              className="bg-card rounded-2xl shadow-card p-4 space-y-2">
              <input value={newDogName} onChange={e => setNewDogName(e.target.value)} placeholder="Nom du chien"
                className="w-full px-3 py-2 rounded-xl bg-muted text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <input value={newDogBreed} onChange={e => setNewDogBreed(e.target.value)} placeholder="Race (optionnel)"
                className="w-full px-3 py-2 rounded-xl bg-muted text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <div className="flex gap-2">
                <button onClick={() => setShowAddDog(false)} className="flex-1 py-2 rounded-xl border border-border text-sm font-bold">Annuler</button>
                <button onClick={handleAddDog} disabled={addDog.isPending}
                  className="flex-1 py-2 rounded-xl gradient-primary text-white text-sm font-bold disabled:opacity-50">
                  {addDog.isPending ? "..." : "Ajouter"}
                </button>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-2 gap-3">
            {dogsLoading && <div className="col-span-2 text-center text-muted-foreground text-sm py-4">Chargement...</div>}
            {dogs.map(dog => (
              <DogCard key={dog.id} name={dog.name} breed={dog.breed || "Race inconnue"} image={dog.photo_url || dogGolden} emoji="🐕" status="Actif" />
            ))}
            {!dogsLoading && dogs.length === 0 && (
              <div className="col-span-2 text-center text-muted-foreground text-sm py-4">Ajoutez votre premier chien !</div>
            )}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl shadow-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-foreground">📊 Activité de vos chiens</h3>
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold">
              <TrendingUp className="w-3.5 h-3.5" />
              Cette semaine
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: String(completedBookings), label: "Balades" },
              { value: `${dogs.length}`, label: "Chiens" },
              { value: String(upcomingBookings.length), label: "À venir" },
            ].map((s) => (
              <div key={s.label} className="bg-muted/50 rounded-xl p-3 flex flex-col items-center gap-1">
                <span className="text-lg font-black text-foreground">{s.value}</span>
                <span className="text-[9px] text-muted-foreground font-semibold">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <WeatherWidget temp={18} condition="sunny" recommendation="Parfait pour promener vos chiens !" />

        {upcomingBookings.length > 0 && <UpcomingBookings bookings={upcomingBookings} />}

        {nearbyWalkers.length > 0 && (
          <div className="space-y-2.5">
            <h3 className="font-bold text-foreground px-1">🏃 Promeneurs à proximité</h3>
            {nearbyWalkers.slice(0, 3).map((w: any) => (
              <NearbyWalkerCard
                key={w.id}
                name={`${w.profiles?.first_name || "Walker"} ${(w.profiles?.last_name || "")[0] || ""}.`}
                rating={Number(w.rating || 0)}
                reviews={w.total_reviews || 0}
                distance="~"
                price={`${w.hourly_rate || 15}€`}
                avatar={w.profiles?.avatar_url || undefined}
                badges={w.verified ? ["Certifié"] : []}
              />
            ))}
          </div>
        )}

        <motion.button
          whileTap={{ scale: 0.97 }}
          className="w-full py-4 rounded-2xl gradient-primary text-white font-black text-lg shadow-glow-primary hover:opacity-90 transition-opacity"
        >
          🐕 Réserver une Promenade
        </motion.button>
      </div>

      <BottomNav role="owner" />
    </div>
  );
};

export default OwnerDashboard;
