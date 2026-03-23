import BottomNav from "@/components/dashboard/BottomNav";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import avatarWalker from "@/assets/avatar-walker.jpg";
import StarRating from "@/components/dashboard/StarRating";
import { useBookings } from "@/hooks/useBookings";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const WalkerFavoris = () => {
  const { user } = useAuth();
  const { data: bookings = [] } = useBookings("walker");

  // Get regular clients from bookings
  const { data: clients = [] } = useQuery({
    queryKey: ["walker-clients", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data: completedBookings } = await supabase
        .from("bookings")
        .select("owner_id, dogs(name)")
        .eq("walker_id", user.id)
        .eq("status", "completed");

      if (!completedBookings) return [];

      // Count walks per owner
      const ownerCounts = new Map<string, { count: number; dogName: string }>();
      for (const b of completedBookings) {
        const existing = ownerCounts.get(b.owner_id) || { count: 0, dogName: (b as any).dogs?.name || "Chien" };
        existing.count++;
        ownerCounts.set(b.owner_id, existing);
      }

      const ownerIds = Array.from(ownerCounts.keys());
      if (ownerIds.length === 0) return [];

      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, first_name, last_name, avatar_url")
        .in("id", ownerIds);

      return ownerIds.map(oid => {
        const p = profiles?.find(pr => pr.id === oid);
        const info = ownerCounts.get(oid)!;
        return {
          id: oid,
          name: `${p?.first_name || "Client"} ${(p?.last_name || "")[0] || ""}.`,
          avatar: p?.avatar_url || null,
          dogName: info.dogName,
          walks: info.count,
          rating: 5,
        };
      }).sort((a, b) => b.walks - a.walks);
    },
    enabled: !!user,
  });

  return (
    <div className="min-h-screen bg-background pb-24 max-w-lg mx-auto">
      <div className="gradient-primary px-4 pt-14 pb-6">
        <DashboardHeader title="⭐ Favoris" notificationCount={0} />
        <h1 className="text-2xl font-black text-white mt-2">Mes Clients Réguliers</h1>
        <p className="text-white/70 text-sm mt-1">Vos clients fidèles et leurs compagnons</p>
      </div>
      <div className="px-4 -mt-3 space-y-3">
        {clients.length === 0 && (
          <div className="text-center text-muted-foreground text-sm py-10">Aucun client régulier pour le moment</div>
        )}
        {clients.map((client, i) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-2xl shadow-card p-4 flex items-center gap-3"
          >
            <img src={client.avatar || avatarWalker} alt={client.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20" />
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
};

export default WalkerFavoris;
