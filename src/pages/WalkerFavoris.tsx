import BottomNav from "@/components/dashboard/BottomNav";
import { motion } from "framer-motion";
import { Heart, ArrowLeft, Users } from "lucide-react";
import avatarWalker from "@/assets/avatar-walker.jpg";
import StarRating from "@/components/dashboard/StarRating";
import { useAuth } from "@/contexts/AuthContext";
import { useBookings } from "@/hooks/useBookings";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const mockClients = [
  { id: "c1", name: "Marie D.", avatar: null, dogName: "Max", walks: 15, rating: 5 },
  { id: "c2", name: "Pierre L.", avatar: null, dogName: "Bella", walks: 8, rating: 4 },
  { id: "c3", name: "Julie M.", avatar: null, dogName: "Rocky", walks: 5, rating: 5 },
];

const WalkerFavoris = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isDemo = !user;

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

  const displayClients = isDemo ? mockClients : clients;

  return (
    <div className="min-h-screen bg-background pb-24 max-w-lg mx-auto">
      <div className="gradient-primary px-4 pt-14 pb-6 relative">
        <button onClick={() => navigate("/walker")} className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h1 className="text-2xl font-black text-white mt-2 text-center">⭐ Mes Clients</h1>
        <p className="text-white/70 text-sm mt-1 text-center">Vos clients fidèles et leurs compagnons</p>
      </div>
      <div className="px-4 -mt-3 space-y-3">
        {displayClients.length === 0 && (
          <div className="text-center py-16 space-y-3">
            <Users className="w-12 h-12 text-muted-foreground/30 mx-auto" />
            <p className="text-muted-foreground text-sm">Aucun client régulier pour le moment</p>
          </div>
        )}
        {displayClients.map((client, i) => (
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
