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

const WalkerDashboard = () => {
  return (
    <div className="min-h-screen bg-background pb-24 max-w-lg mx-auto">
      {/* Hero */}
      <div className="relative">
        <DashboardHeader title="🐾 DogWalking Hub" notificationCount={3} />
        <img src={walkerHero} alt="Promeneur avec chiens" className="w-full h-56 object-cover" width={800} height={512} />
        <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 px-4">
          <div className="bg-card rounded-2xl shadow-card p-4 flex items-center gap-4">
            <img
              src={avatarWalker}
              alt="Hamid"
              className="w-16 h-16 rounded-full object-cover border-4 border-card"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-foreground">Hamid</h1>
                <span className="text-sm text-muted-foreground font-semibold">4.9 · 128 avis</span>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <StarRating rating={5} />
                <span className="text-xs text-muted-foreground ml-1">des chiens · 5 ans d'expérience</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 mt-14 space-y-4">
        {/* Availability */}
        <AvailabilityToggle />

        {/* Quick Actions */}
        <QuickActions role="walker" />

        {/* About */}
        <div className="bg-card rounded-2xl shadow-card p-4">
          <h2 className="font-bold text-foreground mb-1">À propos de moi</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Passionné des chiens, je suis ici pour offrir les meilleures promenades
            à vos compagnons à quatre pattes !
          </p>
        </div>

        {/* Active Mission */}
        <ActiveMissionCard
          dogName="Rex"
          ownerName="Marie P."
          startTime="14:30"
          location="Parc des Buttes-Chaumont"
          status="en_cours"
        />

        {/* Earnings */}
        <EarningsCard today={45} week={280} month={1120} trend={12} />

        {/* Stats */}
        <StatsRow
          stats={[
            { value: 128, label: "Promenades" },
            { value: 45, label: "Chiens" },
            { value: "4.9", label: "Note", isStar: true },
          ]}
        />

        {/* Weather */}
        <WeatherWidget
          temp={18}
          condition="sunny"
          recommendation="Temps idéal pour une longue promenade !"
        />

        {/* Upcoming Bookings */}
        <UpcomingBookings />

        {/* Badges */}
        <BadgeGrid />

        {/* Reviews */}
        <div className="bg-card rounded-2xl shadow-card p-4">
          <h3 className="font-bold text-foreground mb-2">Avis récents</h3>
          <ReviewCard
            name="Sophie L."
            avatar={avatarWalker}
            rating={5}
            text="Hamid est super avec mon chien! Très professionnel et attentionné."
          />
          <div className="border-t border-border" />
          <ReviewCard
            name="Marc D."
            avatar={avatarWalker}
            rating={5}
            text="Excellent service, mon chien adore ses promenades avec Hamid !"
          />
        </div>

        {/* CTA */}
        <button className="w-full py-4 rounded-2xl bg-cta text-cta-foreground font-bold text-lg shadow-card hover:opacity-90 transition-opacity">
          Démarrer une Mission
        </button>
      </div>

      <BottomNav role="walker" />
    </div>
  );
};

export default WalkerDashboard;
