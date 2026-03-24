import BottomNav from "@/components/dashboard/BottomNav";
import NearbyWalkerCard from "@/components/dashboard/NearbyWalkerCard";
import { motion } from "framer-motion";
import { ArrowLeft, Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/hooks/useFavorites";
import { useNavigate } from "react-router-dom";
import { mockNearbyWalkers } from "@/data/mockData";

const OwnerFavoris = () => {
  const { user } = useAuth();
  const { data: favorites = [], isLoading } = useFavorites();
  const navigate = useNavigate();
  const isDemo = !user;

  const demoFavorites = mockNearbyWalkers.slice(0, 2).map(w => ({
    id: w.id,
    profiles: w.profiles,
    walker_profiles: w,
  }));

  const displayFavorites = isDemo ? demoFavorites : favorites;

  return (
    <div className="min-h-screen bg-background pb-24 max-w-lg mx-auto">
      <div className="gradient-primary px-4 pt-14 pb-6 relative">
        <button onClick={() => navigate("/owner")} className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h1 className="text-2xl font-black text-white mt-2 text-center">❤️ Mes Favoris</h1>
        <p className="text-white/70 text-sm mt-1 text-center">Vos promeneurs préférés pour un rebooking rapide</p>
      </div>
      <div className="px-4 -mt-3 space-y-3">
        {!isDemo && isLoading && <div className="text-center text-muted-foreground text-sm py-10">Chargement...</div>}
        {displayFavorites.length === 0 && (
          <div className="text-center py-16 space-y-3">
            <Heart className="w-12 h-12 text-muted-foreground/30 mx-auto" />
            <p className="text-muted-foreground text-sm">Aucun favori pour le moment</p>
          </div>
        )}
        {displayFavorites.map((fav: any, i: number) => (
          <motion.div key={fav.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <NearbyWalkerCard
              name={`${fav.profiles?.first_name || "Walker"} ${(fav.profiles?.last_name || "")[0] || ""}.`}
              rating={Number(fav.walker_profiles?.rating || 0)}
              reviews={fav.walker_profiles?.total_reviews || 0}
              distance="~2 km"
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
