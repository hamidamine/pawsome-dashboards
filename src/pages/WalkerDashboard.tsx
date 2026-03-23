import walkerHero from "@/assets/walker-hero.jpg";
import avatarWalker from "@/assets/avatar-walker.jpg";
import StarRating from "@/components/dashboard/StarRating";
import StatsRow from "@/components/dashboard/StatsRow";
import BadgeGrid from "@/components/dashboard/BadgeGrid";
import ReviewCard from "@/components/dashboard/ReviewCard";
import BottomNav from "@/components/dashboard/BottomNav";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import WeatherWidget from "@/components/dashboard/WeatherWidget";
import EarningsCard from "@/components/dashboard/EarningsCard";
import AvailabilityToggle from "@/components/dashboard/AvailabilityToggle";
import ActiveMissionCard from "@/components/dashboard/ActiveMissionCard";
import QuickActions from "@/components/dashboard/QuickActions";
import UpcomingBookings from "@/components/dashboard/UpcomingBookings";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile, useWalkerProfile } from "@/hooks/useProfile";
import { useEarnings } from "@/hooks/useEarnings";
import { useBookings } from "@/hooks/useBookings";

const WalkerDashboard = () => {
  const { user } = useAuth();
  const { data: profile } = useProfile();
  const { data: walkerProfile } = useWalkerProfile(user?.id);
  const { data: earnings } = useEarnings();
  const { data: bookings = [] } = useBookings("walker");

  const displayName = profile?.first_name || "Promeneur";
  const activeMission = bookings.find(b => b.status === "in_progress");
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

  return (
    <div className="min-h-screen bg-background pb-24 max-w-lg mx-auto">
      <div className="relative">
        <DashboardHeader title="🐾 DogWalking Hub" notificationCount={bookings.filter(b => b.status === "pending").length} />
        <img src={walkerHero} alt="Promeneur avec chiens" className="w-full h-60 object-cover" width={800} height={512} />
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl shadow-elevated p-4 flex items-center gap-4">
            <div className="relative">
              <img src={profile?.avatar_url || avatarWalker} alt={displayName} className="w-16 h-16 rounded-full object-cover ring-4 ring-primary/20" />
              <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full gradient-accent border-2 border-card flex items-center justify-center">
                <span className="text-[8px]">✓</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-foreground">{displayName}</h1>
                <span className="text-sm text-muted-foreground font-bold">
                  {Number(walkerProfile?.rating || 0).toFixed(1)} · {walkerProfile?.total_reviews || 0} avis
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <StarRating rating={Math.round(Number(walkerProfile?.rating || 0))} />
                <span className="text-[11px] text-muted-foreground font-semibold">
                  {walkerProfile?.experience_years || 0} ans d'expérience
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="px-4 mt-14 space-y-4">
        <AvailabilityToggle />
        <QuickActions role="walker" />

        {profile?.bio && (
          <div className="bg-card rounded-2xl shadow-card p-4">
            <h2 className="font-bold text-foreground mb-1">📝 À propos de moi</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{profile.bio}</p>
          </div>
        )}

        {activeMission && (
          <ActiveMissionCard
            dogName={(activeMission as any).dogs?.name || "Chien"}
            ownerName="Client"
            startTime={activeMission.scheduled_time}
            location={activeMission.address || "En cours"}
            status="en_cours"
          />
        )}

        <EarningsCard
          today={earnings?.today || 0}
          week={earnings?.week || 0}
          month={earnings?.month || 0}
          trend={earnings?.trend || 0}
        />

        <StatsRow
          stats={[
            { value: walkerProfile?.total_walks || 0, label: "Promenades" },
            { value: walkerProfile?.total_reviews || 0, label: "Avis" },
            { value: Number(walkerProfile?.rating || 0).toFixed(1), label: "Note", isStar: true },
          ]}
        />

        <WeatherWidget temp={18} condition="sunny" recommendation="Temps idéal pour une longue promenade !" />

        {upcomingBookings.length > 0 && <UpcomingBookings bookings={upcomingBookings} />}

        <BadgeGrid />

        <motion.button
          whileTap={{ scale: 0.97 }}
          className="w-full py-4 rounded-2xl gradient-cta text-white font-black text-lg shadow-glow-cta hover:opacity-90 transition-opacity"
        >
          🚀 Démarrer une Mission
        </motion.button>
      </div>

      <BottomNav role="walker" />
    </div>
  );
};

export default WalkerDashboard;
