import { useNavigate } from "react-router-dom";
import { Dog, Footprints } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 gap-10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-1/2 gradient-primary opacity-[0.04] rounded-b-[60px]" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3 z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="text-5xl mb-2"
        >
          🐾
        </motion.div>
        <h1 className="text-3xl font-black text-foreground">
          Dog<span className="text-gradient-primary">Walking</span> Hub
        </h1>
        <p className="text-muted-foreground font-semibold">La meilleure plateforme pour vos compagnons</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md z-10">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ y: -4, boxShadow: "var(--shadow-elevated)" }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/owner")}
          className="bg-card rounded-2xl shadow-card p-8 flex flex-col items-center gap-4 border border-border/50"
        >
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-glow-primary">
            <Dog className="w-8 h-8 text-white" />
          </div>
          <span className="font-black text-lg text-foreground">Propriétaire</span>
          <span className="text-xs text-muted-foreground text-center font-semibold">Gérez vos chiens et réservations</span>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ y: -4, boxShadow: "var(--shadow-elevated)" }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/walker")}
          className="bg-card rounded-2xl shadow-card p-8 flex flex-col items-center gap-4 border border-border/50"
        >
          <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center shadow-card">
            <Footprints className="w-8 h-8 text-white" />
          </div>
          <span className="font-black text-lg text-foreground">Promeneur</span>
          <span className="text-xs text-muted-foreground text-center font-semibold">Votre profil et missions</span>
        </motion.button>
      </div>
    </div>
  );
};

export default Index;
