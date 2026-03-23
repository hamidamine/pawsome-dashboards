import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useWalkerProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { MapPin, Clock, Euro, Users, Check } from "lucide-react";

const WalkerOnboarding = () => {
  const { user } = useAuth();
  const { data: walkerProfile } = useWalkerProfile(user?.id);
  const navigate = useNavigate();

  const [hourlyRate, setHourlyRate] = useState(15);
  const [maxDogs, setMaxDogs] = useState(3);
  const [experience, setExperience] = useState(0);
  const [bio, setBio] = useState("");
  const [services, setServices] = useState<string[]>(["promenade"]);
  const [saving, setSaving] = useState(false);

  const toggleService = (s: string) => {
    setServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      // Update walker profile
      const { error: wpError } = await supabase
        .from("walker_profiles")
        .update({
          hourly_rate: hourlyRate,
          max_dogs: maxDogs,
          experience_years: experience,
          services: services as any,
        })
        .eq("user_id", user.id);
      if (wpError) throw wpError;

      // Update main profile bio
      if (bio) {
        await supabase.from("profiles").update({ bio }).eq("id", user.id);
      }

      toast.success("Profil promeneur configuré !");
      navigate("/walker");
    } catch (err: any) {
      toast.error(err.message || "Erreur");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div className="text-center space-y-2">
          <div className="text-4xl">🐾</div>
          <h1 className="text-2xl font-black text-foreground">Configurez votre profil</h1>
          <p className="text-sm text-muted-foreground">Quelques infos pour commencer à recevoir des missions</p>
        </div>

        <div className="bg-card rounded-2xl shadow-card p-4 space-y-4">
          <h3 className="font-bold text-foreground">📝 À propos de vous</h3>
          <textarea value={bio} onChange={e => setBio(e.target.value)}
            placeholder="Décrivez-vous en quelques mots..."
            className="w-full px-3 py-2.5 rounded-xl bg-muted text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30" rows={3} />
        </div>

        <div className="bg-card rounded-2xl shadow-card p-4 space-y-4">
          <h3 className="font-bold text-foreground">🎯 Services proposés</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { type: "promenade", label: "Promenade", emoji: "🚶" },
              { type: "garde", label: "Garde", emoji: "🏠" },
              { type: "visite", label: "Visite", emoji: "👋" },
              { type: "veterinaire", label: "Vétérinaire", emoji: "🏥" },
            ].map(s => (
              <button key={s.type} onClick={() => toggleService(s.type)}
                className={`p-3 rounded-xl border-2 flex items-center gap-2 transition-all ${
                  services.includes(s.type) ? "border-primary bg-primary/5" : "border-border"
                }`}>
                <span>{s.emoji}</span>
                <span className="text-xs font-bold">{s.label}</span>
                {services.includes(s.type) && <Check className="w-3.5 h-3.5 text-primary ml-auto" />}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl shadow-card p-4 space-y-4">
          <h3 className="font-bold text-foreground">💰 Tarif & Capacité</h3>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground font-semibold flex items-center gap-1">
                <Euro className="w-4 h-4" /> Tarif horaire
              </span>
              <span className="font-black text-foreground">{hourlyRate}€/h</span>
            </div>
            <input type="range" min={5} max={50} value={hourlyRate} onChange={e => setHourlyRate(Number(e.target.value))}
              className="w-full accent-primary" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground font-semibold flex items-center gap-1">
                <Users className="w-4 h-4" /> Max chiens simultanés
              </span>
              <span className="font-black text-foreground">{maxDogs}</span>
            </div>
            <input type="range" min={1} max={6} value={maxDogs} onChange={e => setMaxDogs(Number(e.target.value))}
              className="w-full accent-primary" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground font-semibold flex items-center gap-1">
                <Clock className="w-4 h-4" /> Années d'expérience
              </span>
              <span className="font-black text-foreground">{experience}</span>
            </div>
            <input type="range" min={0} max={20} value={experience} onChange={e => setExperience(Number(e.target.value))}
              className="w-full accent-primary" />
          </div>
        </div>

        <button onClick={handleSave} disabled={saving}
          className="w-full py-4 rounded-2xl gradient-cta text-white font-black text-lg shadow-glow-cta disabled:opacity-50 transition-opacity">
          {saving ? "Enregistrement..." : "🚀 Commencer les missions"}
        </button>
      </motion.div>
    </div>
  );
};

export default WalkerOnboarding;
