import walkerHero from "@/assets/walker-hero.jpg";
import avatarWalker from "@/assets/avatar-walker.jpg";
import dogGolden from "@/assets/dog-golden.jpg";
import dogPoodle from "@/assets/dog-poodle.jpg";
import DogCard from "@/components/dashboard/DogCard";
import BookingCard from "@/components/dashboard/BookingCard";
import BottomNav from "@/components/dashboard/BottomNav";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import WeatherWidget from "@/components/dashboard/WeatherWidget";
import QuickActions from "@/components/dashboard/QuickActions";
import NearbyWalkerCard from "@/components/dashboard/NearbyWalkerCard";
import WalkReportCard from "@/components/dashboard/WalkReportCard";
import UpcomingBookings from "@/components/dashboard/UpcomingBookings";
import { CheckCircle2, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const OwnerDashboard = () => {
  return (
    <div className="min-h-screen bg-background pb-24 max-w-lg mx-auto">
      {/* Hero */}
      <div className="relative">
        <DashboardHeader title="🐾 DogWalking Hub" notificationCount={2} />
        <img src={walkerHero} alt="Mes chiens" className="w-full h-56 object-cover" width={800} height={512} />
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl shadow-elevated p-4 flex items-center gap-4"
          >
            <div className="relative">
              <img src={avatarWalker} alt="Hamid" className="w-16 h-16 rounded-full object-cover ring-4 ring-primary/20" />
              <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full gradient-accent border-2 border-card flex items-center justify-center">
                <span className="text-[8px] text-white">✓</span>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-black text-foreground">Hamid</h1>
              <p className="text-sm text-muted-foreground font-semibold">Propriétaire de 2 chiens</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 mt-14 space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="gradient-accent text-white rounded-2xl p-3.5 flex items-center justify-center gap-2 font-bold shadow-card"
        >
          <CheckCircle2 className="w-5 h-5" />
          Profil Complet 100%
        </motion.div>

        <QuickActions role="owner" />

        <div className="grid grid-cols-2 gap-3">
          <DogCard name="Max" breed="Golden Retriever" image={dogGolden} emoji="🐕" status="Actif" />
          <DogCard name="Bella" breed="Caniche" image={dogPoodle} emoji="🐩" status="Disponible" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl shadow-card p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-foreground">📊 Activité de vos chiens</h3>
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold">
              <TrendingUp className="w-3.5 h-3.5" />
              Cette semaine
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: "12", label: "Balades", gradient: "gradient-primary" },
              { value: "18km", label: "Distance", gradient: "gradient-accent" },
              { value: "6h", label: "Temps", gradient: "gradient-passion" },
            ].map((s) => (
              <div key={s.label} className="bg-muted/50 rounded-xl p-3 flex flex-col items-center gap-1">
                <span className="text-lg font-black text-foreground">{s.value}</span>
                <span className="text-[9px] text-muted-foreground font-semibold">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <WeatherWidget temp={18} condition="sunny" recommendation="Parfait pour promener Max et Bella !" />
        <BookingCard title="Promenade aujourd'hui 14:30" time="14:30" duration="30 minutes" />
        <UpcomingBookings />

        <WalkReportCard
          date="23 Mars 2026"
          walkerName="Sarah M."
          dogName="Max"
          duration="35 min"
          distance="2.4 km"
          photos={4}
        />

        <div className="space-y-2.5">
          <h3 className="font-bold text-foreground px-1">🏃 Promeneurs à proximité</h3>
          <NearbyWalkerCard name="Sarah M." rating={4.8} reviews={92} distance="500m" price="15€" badges={["Certifiée"]} />
          <NearbyWalkerCard name="Lucas B." rating={4.6} reviews={45} distance="1.2km" price="12€" badges={["Top 10%"]} />
        </div>

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
