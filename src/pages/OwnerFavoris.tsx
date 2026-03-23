import BottomNav from "@/components/dashboard/BottomNav";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import NearbyWalkerCard from "@/components/dashboard/NearbyWalkerCard";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const OwnerFavoris = () => (
  <div className="min-h-screen bg-background pb-24 max-w-lg mx-auto">
    <div className="gradient-primary px-4 pt-14 pb-6">
      <DashboardHeader title="❤️ Favoris" notificationCount={0} />
      <h1 className="text-2xl font-black text-white mt-2">Mes Promeneurs Favoris</h1>
      <p className="text-white/70 text-sm mt-1">Vos promeneurs préférés pour un rebooking rapide</p>
    </div>
    <div className="px-4 -mt-3 space-y-3">
      {[
        { name: "Sarah M.", rating: 4.9, reviews: 92, distance: "500m", price: "15€", badges: ["⭐ Favoris", "Certifiée"] },
        { name: "Lucas B.", rating: 4.7, reviews: 45, distance: "1.2km", price: "12€", badges: ["Top 10%"] },
        { name: "Emma D.", rating: 4.8, reviews: 67, distance: "800m", price: "14€", badges: ["Certifiée"] },
      ].map((w, i) => (
        <motion.div key={w.name} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
          <NearbyWalkerCard {...w} />
        </motion.div>
      ))}
    </div>
    <BottomNav role="owner" />
  </div>
);

export default OwnerFavoris;
