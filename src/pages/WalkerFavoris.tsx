import BottomNav from "@/components/dashboard/BottomNav";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";
import avatarWalker from "@/assets/avatar-walker.jpg";
import StarRating from "@/components/dashboard/StarRating";

interface FavClient {
  name: string;
  dogName: string;
  rating: number;
  walks: number;
}

const favClients: FavClient[] = [
  { name: "Marie P.", dogName: "Rex", rating: 5, walks: 12 },
  { name: "Sophie L.", dogName: "Luna", rating: 5, walks: 8 },
  { name: "Marc D.", dogName: "Buddy", rating: 4, walks: 5 },
];

const WalkerFavoris = () => (
  <div className="min-h-screen bg-background pb-24 max-w-lg mx-auto">
    <div className="gradient-primary px-4 pt-14 pb-6">
      <DashboardHeader title="⭐ Favoris" notificationCount={0} />
      <h1 className="text-2xl font-black text-white mt-2">Mes Clients Réguliers</h1>
      <p className="text-white/70 text-sm mt-1">Vos clients fidèles et leurs compagnons</p>
    </div>
    <div className="px-4 -mt-3 space-y-3">
      {favClients.map((client, i) => (
        <motion.div
          key={client.name}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-card rounded-2xl shadow-card p-4 flex items-center gap-3"
        >
          <img src={avatarWalker} alt={client.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-foreground">{client.name}</span>
              <Heart className="w-3.5 h-3.5 fill-passion text-passion" />
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">🐕 {client.dogName} · {client.walks} balades</p>
            <StarRating rating={client.rating} />
          </div>
          <button className="px-3 py-1.5 rounded-full gradient-primary text-white text-xs font-bold shadow-card">
            Contacter
          </button>
        </motion.div>
      ))}
    </div>
    <BottomNav role="walker" />
  </div>
);

export default WalkerFavoris;
