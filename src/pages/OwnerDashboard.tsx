import walkerHero from "@/assets/walker-hero.jpg";
import avatarWalker from "@/assets/avatar-walker.jpg";
import dogGolden from "@/assets/dog-golden.jpg";
import dogPoodle from "@/assets/dog-poodle.jpg";
import DogCard from "@/components/dashboard/DogCard";
import BookingCard from "@/components/dashboard/BookingCard";
import BottomNav from "@/components/dashboard/BottomNav";
import { CheckCircle2 } from "lucide-react";

const OwnerDashboard = () => {
  return (
    <div className="min-h-screen bg-background pb-24 max-w-lg mx-auto">
      {/* Hero */}
      <div className="relative">
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

        {/* Dogs */}
        <div className="grid grid-cols-2 gap-3">
          <DogCard
            name="Max"
            breed="Golden Retriever"
            image={dogGolden}
            emoji="🐕"
            status="Actif"
          />
          <DogCard
            name="Bella"
            breed="Caniche"
            image={dogPoodle}
            emoji="🐩"
            status="Disponible"
          />
        </div>

        {/* Current booking */}
        <BookingCard
          title="Promenade aujourd'hui 14:30"
          time="14:30"
          duration="30 minutes"
        />

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
