import BottomNav from "@/components/dashboard/BottomNav";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import NearbyWalkerCard from "@/components/dashboard/NearbyWalkerCard";
import { motion } from "framer-motion";
import { useFavorites } from "@/hooks/useFavorites";

const OwnerFavoris = () => {
  const { data: favorites = [], isLoading } = useFavorites();

  return (
    <div className="min-h-screen bg-background pb-24 max-w-lg mx-auto">
      <div className="gradient-primary px-4 pt-14 pb-6">
        <DashboardHeader title="❤️ Favoris" notificationCount={0} />
        <h1 className="text-2xl font-black text-white mt-2">Mes Promeneurs Favoris</h1>
        <p className="text-white/70 text-sm mt-1">Vos promeneurs préférés pour un rebooking rapide</p>
      </div>
      <div className="px-4 -mt-3 space-y-3">
        {isLoading && <div className="text-center text-muted-foreground text-sm py-10">Chargement...</div>}
        {!isLoading && favorites.length === 0 && (
          <div className="text-center text-muted-foreground text-sm py-10">Aucun favori pour le moment</div>
        )}
        {favorites.map((fav: any, i: number) => (
          <motion.div key={fav.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <NearbyWalkerCard
              name={`${fav.profiles?.first_name || "Walker"} ${(fav.profiles?.last_name || "")[0] || ""}.`}
              rating={Number(fav.walker_profiles?.rating || 0)}
              reviews={fav.walker_profiles?.total_reviews || 0}
              distance="~"
              price={`${fav.walker_profiles?.hourly_rate || 15}€`}
              avatar={fav.profiles?.avatar_url || undefined}
              badges={fav.walker_profiles?.verified ? ["⭐ Favoris", "Certifié"] : ["⭐ Favoris"]}
            />
          </motion.div>
        ))}
      </div>
      <BottomNav role="owner" />
    </div>
  );
};

export default OwnerFavoris;
