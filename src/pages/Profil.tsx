import BottomNav from "@/components/dashboard/BottomNav";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { motion } from "framer-motion";
import avatarWalker from "@/assets/avatar-walker.jpg";
import { MapPin, Star, Shield, Calendar, Settings, LogOut, ChevronRight, Edit3, Camera } from "lucide-react";

const ProfileSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-card rounded-2xl shadow-card p-4">
    <h3 className="font-bold text-foreground mb-3">{title}</h3>
    {children}
  </div>
);

const MenuItem = ({ icon: Icon, label, value, danger }: { icon: typeof Star; label: string; value?: string; danger?: boolean }) => (
  <button className={`w-full flex items-center gap-3 py-3 border-b border-border/50 last:border-0 ${danger ? "text-destructive" : "text-foreground"}`}>
    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${danger ? "bg-destructive/10" : "bg-muted"}`}>
      <Icon className="w-4 h-4" />
    </div>
    <span className="flex-1 text-left text-sm font-semibold">{label}</span>
    {value && <span className="text-xs text-muted-foreground font-semibold">{value}</span>}
    <ChevronRight className="w-4 h-4 text-muted-foreground" />
  </button>
);

const Profil = ({ role }: { role: "owner" | "walker" }) => (
  <div className="min-h-screen bg-background pb-24 max-w-lg mx-auto">
    <div className="gradient-primary px-4 pt-14 pb-16 relative">
      <DashboardHeader title="👤 Profil" notificationCount={0} />
    </div>

    <div className="px-4 -mt-12 space-y-4">
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl shadow-elevated p-5 flex flex-col items-center text-center"
      >
        <div className="relative mb-3">
          <img src={avatarWalker} alt="Hamid" className="w-20 h-20 rounded-full object-cover ring-4 ring-primary/20" />
          <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full gradient-primary flex items-center justify-center border-2 border-card">
            <Camera className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
        <h2 className="text-xl font-black text-foreground">Hamid</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          {role === "owner" ? "Propriétaire de 2 chiens" : "Dog Walker Professionnel"}
        </p>
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold">
            <Shield className="w-3 h-3" />
            Vérifié
          </div>
          {role === "walker" && (
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-star/15 text-star text-xs font-bold">
              <Star className="w-3 h-3 fill-star" />
              4.9
            </div>
          )}
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
            <MapPin className="w-3 h-3" />
            Paris
          </div>
        </div>
        <button className="mt-4 px-6 py-2 rounded-full border-2 border-primary text-primary font-bold text-sm hover:bg-primary/5 transition-colors flex items-center gap-2">
          <Edit3 className="w-3.5 h-3.5" />
          Modifier le profil
        </button>
      </motion.div>

      {/* Info */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <ProfileSection title="📊 Informations">
          {role === "walker" ? (
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "128", label: "Balades" },
                { value: "45", label: "Chiens" },
                { value: "5 ans", label: "Expérience" },
              ].map((s) => (
                <div key={s.label} className="bg-muted/60 rounded-xl p-3 flex flex-col items-center">
                  <span className="text-lg font-black text-foreground">{s.value}</span>
                  <span className="text-[9px] text-muted-foreground font-semibold">{s.label}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: "2", label: "Chiens" },
                { value: "24", label: "Balades" },
              ].map((s) => (
                <div key={s.label} className="bg-muted/60 rounded-xl p-3 flex flex-col items-center">
                  <span className="text-lg font-black text-foreground">{s.value}</span>
                  <span className="text-[9px] text-muted-foreground font-semibold">{s.label}</span>
                </div>
              ))}
            </div>
          )}
        </ProfileSection>
      </motion.div>

      {/* Settings Menu */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <ProfileSection title="⚙️ Paramètres">
          <MenuItem icon={Calendar} label="Mes réservations" value="3" />
          <MenuItem icon={MapPin} label="Adresse" value="Paris 11e" />
          <MenuItem icon={Shield} label="Sécurité" value="Vérifié" />
          <MenuItem icon={Settings} label="Préférences" />
          <MenuItem icon={LogOut} label="Déconnexion" danger />
        </ProfileSection>
      </motion.div>
    </div>

    <BottomNav role={role} />
  </div>
);

export default Profil;
