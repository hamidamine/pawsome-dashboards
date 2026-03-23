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

const OwnerDashboard = () => {
  return (
    <div className="min-h-screen bg-background pb-24 max-w-lg mx-auto">
      {/* Hero */}
      <div className="relative">
        <DashboardHeader title="🐾 DogWalking Hub" notificationCount={2} />
        <img src={walkerHero} alt="Mes chiens" className="w-full h-52 object-cover" width={800} height={512} />
        <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 px-4">
          <div className="bg-card rounded-2xl shadow-card p-4 flex items-center gap-4">
            <img
              src={avatarWalker}
              alt="Hamid"
              className="w-16 h-16 rounded-full object-cover border-4 border-primary"
            />
            <div>
              <h1 className="text-xl font-extrabold text-foreground">Hamid</h1>
              <p className="text-sm text-muted-foreground">Propriétaire de 2 chiens</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 mt-14 space-y-4">
        {/* Profile complete badge */}
        <div className="bg-accent text-accent-foreground rounded-2xl p-3 flex items-center justify-center gap-2 font-bold shadow-card">
          <CheckCircle2 className="w-5 h-5" />
          Profil Complet 100%
        </div>

        {/* Quick Actions */}
        <QuickActions role="owner" />

        {/* Dogs */}
        <div className="grid grid-cols-2 gap-3">
          <DogCard name="Max" breed="Golden Retriever" image={dogGolden} emoji="🐕" status="Actif" />
          <DogCard name="Bella" breed="Caniche" image={dogPoodle} emoji="🐩" status="Disponible" />
        </div>

        {/* Dog Stats */}
        <div className="bg-card rounded-2xl shadow-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-foreground">Activité de vos chiens</h3>
            <div className="flex items-center gap-1 text-accent text-xs font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              Cette semaine
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: "12", label: "Balades", sub: "ce mois" },
              { value: "18km", label: "Distance", sub: "totale" },
              { value: "6h", label: "Temps", sub: "de balade" },
            ].map((s) => (
              <div key={s.label} className="bg-muted rounded-xl p-3 flex flex-col items-center">
                <span className="text-lg font-extrabold text-foreground">{s.value}</span>
                <span className="text-[10px] text-muted-foreground font-medium">{s.label}</span>
                <span className="text-[9px] text-muted-foreground">{s.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weather */}
        <WeatherWidget
          temp={18}
          condition="sunny"
          recommendation="Parfait pour promener Max et Bella !"
        />

        {/* Current booking */}
        <BookingCard title="Promenade aujourd'hui 14:30" time="14:30" duration="30 minutes" />

        {/* Upcoming Bookings */}
        <UpcomingBookings />

        {/* Last Walk Report */}
        <WalkReportCard
          date="23 Mars 2026"
          walkerName="Hamid"
          dogName="Max"
          duration="35 min"
          distance="2.4 km"
          photos={4}
        />

        {/* Nearby Walkers */}
        <div className="space-y-2">
          <h3 className="font-bold text-foreground px-1">Promeneurs à proximité</h3>
          <NearbyWalkerCard
            name="Sarah M."
            rating={4.8}
            reviews={92}
            distance="500m"
            price="15€"
            badges={["Certifiée"]}
          />
          <NearbyWalkerCard
            name="Lucas B."
            rating={4.6}
            reviews={45}
            distance="1.2km"
            price="12€"
            badges={["Top 10%"]}
          />
        </div>

        {/* CTA */}
        <button className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-lg shadow-card hover:opacity-90 transition-opacity">
          Réserver une Promenade
        </button>
      </div>

      <BottomNav role="owner" />
    </div>
  );
};

export default OwnerDashboard;
