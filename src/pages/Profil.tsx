import BottomNav from "@/components/dashboard/BottomNav";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { motion } from "framer-motion";
import { MapPin, Star, Shield, Calendar, Settings, LogOut, ChevronRight, Edit3, Camera, History } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile, useUpdateProfile, useWalkerProfile } from "@/hooks/useProfile";
import { useDogs } from "@/hooks/useDogs";
import { useBookings } from "@/hooks/useBookings";
import { useAvatarUpload } from "@/hooks/useUpload";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import avatarWalker from "@/assets/avatar-walker.jpg";

const ProfileSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-card rounded-2xl shadow-card p-4">
    <h3 className="font-bold text-foreground mb-3">{title}</h3>
    {children}
  </div>
);

const MenuItem = ({ icon: Icon, label, value, danger, onClick }: { icon: typeof Star; label: string; value?: string; danger?: boolean; onClick?: () => void }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 py-3 border-b border-border/50 last:border-0 ${danger ? "text-destructive" : "text-foreground"}`}>
    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${danger ? "bg-destructive/10" : "bg-muted"}`}>
      <Icon className="w-4 h-4" />
    </div>
    <span className="flex-1 text-left text-sm font-semibold">{label}</span>
    {value && <span className="text-xs text-muted-foreground font-semibold">{value}</span>}
    <ChevronRight className="w-4 h-4 text-muted-foreground" />
  </button>
);

const Profil = ({ role }: { role: "owner" | "walker" }) => {
  const { signOut, user } = useAuth();
  const { data: profile } = useProfile();
  const { data: walkerProfile } = useWalkerProfile(role === "walker" ? user?.id : undefined);
  const { data: dogs = [] } = useDogs();
  const { data: bookings = [] } = useBookings(role);
  const updateProfile = useUpdateProfile();
  const { uploadAvatar } = useAvatarUpload();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [city, setCity] = useState("");

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try { await uploadAvatar(file); }
    catch { toast.error("Erreur upload photo"); }
  };

  const startEdit = () => {
    setFirstName(profile?.first_name || "");
    setLastName(profile?.last_name || "");
    setBio(profile?.bio || "");
    setCity(profile?.city || "");
    setEditing(true);
  };

  const saveProfile = async () => {
    try {
      await updateProfile.mutateAsync({ first_name: firstName, last_name: lastName, bio, city });
      toast.success("Profil mis à jour !");
      setEditing(false);
    } catch { toast.error("Erreur lors de la mise à jour"); }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/auth");
  };

  const displayName = profile ? `${profile.first_name || ""} ${profile.last_name || ""}`.trim() || "Utilisateur" : "...";
  const pendingBookings = bookings.filter(b => b.status === "pending" || b.status === "confirmed").length;

  return (
    <div className="min-h-screen bg-background pb-24 max-w-lg mx-auto">
      <div className="gradient-primary px-4 pt-14 pb-16 relative">
        <DashboardHeader title="👤 Profil" notificationCount={0} />
      </div>

      <div className="px-4 -mt-12 space-y-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl shadow-elevated p-5 flex flex-col items-center text-center">
          <div className="relative mb-3">
            <img src={profile?.avatar_url || avatarWalker} alt={displayName} className="w-20 h-20 rounded-full object-cover ring-4 ring-primary/20" />
            <input type="file" ref={fileInputRef} accept="image/*" onChange={handleAvatarChange} className="hidden" />
            <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-0 right-0 w-7 h-7 rounded-full gradient-primary flex items-center justify-center border-2 border-card">
              <Camera className="w-3.5 h-3.5 text-white" />
            </button>
          </div>

          {editing ? (
            <div className="w-full space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Prénom"
                  className="px-3 py-2 rounded-xl bg-muted text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Nom"
                  className="px-3 py-2 rounded-xl bg-muted text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <input value={city} onChange={e => setCity(e.target.value)} placeholder="Ville"
                className="w-full px-3 py-2 rounded-xl bg-muted text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="Bio" rows={2}
                className="w-full px-3 py-2 rounded-xl bg-muted text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <div className="flex gap-2">
                <button onClick={() => setEditing(false)} className="flex-1 py-2 rounded-xl border border-border text-sm font-bold">Annuler</button>
                <button onClick={saveProfile} disabled={updateProfile.isPending}
                  className="flex-1 py-2 rounded-xl gradient-primary text-white text-sm font-bold">
                  {updateProfile.isPending ? "..." : "Sauvegarder"}
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-black text-foreground">{displayName}</h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                {role === "owner" ? `Propriétaire de ${dogs.length} chien${dogs.length > 1 ? "s" : ""}` : "Dog Walker Professionnel"}
              </p>
              {profile?.bio && <p className="text-xs text-muted-foreground mt-1">{profile.bio}</p>}
              <div className="flex items-center gap-3 mt-3 flex-wrap justify-center">
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold">
                  <Shield className="w-3 h-3" />
                  Vérifié
                </div>
                {role === "walker" && walkerProfile && (
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-star/15 text-star text-xs font-bold">
                    <Star className="w-3 h-3 fill-star" />
                    {Number(walkerProfile.rating || 0).toFixed(1)}
                  </div>
                )}
                {profile?.city && (
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                    <MapPin className="w-3 h-3" />
                    {profile.city}
                  </div>
                )}
              </div>
              <button onClick={startEdit}
                className="mt-4 px-6 py-2 rounded-full border-2 border-primary text-primary font-bold text-sm hover:bg-primary/5 transition-colors flex items-center gap-2">
                <Edit3 className="w-3.5 h-3.5" />
                Modifier le profil
              </button>
            </>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <ProfileSection title="📊 Informations">
            {role === "walker" ? (
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: String(walkerProfile?.total_walks || 0), label: "Balades" },
                  { value: String(walkerProfile?.total_reviews || 0), label: "Avis" },
                  { value: `${walkerProfile?.experience_years || 0} ans`, label: "Expérience" },
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
                  { value: String(dogs.length), label: "Chiens" },
                  { value: String(bookings.length), label: "Balades" },
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

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <ProfileSection title="⚙️ Paramètres">
            <MenuItem icon={Calendar} label="Mes réservations" value={String(pendingBookings)} />
            <MenuItem icon={MapPin} label="Adresse" value={profile?.city || "Non défini"} />
            <MenuItem icon={Shield} label="Sécurité" value="Vérifié" />
            <MenuItem icon={Settings} label="Préférences" />
            <MenuItem icon={LogOut} label="Déconnexion" danger onClick={handleLogout} />
          </ProfileSection>
        </motion.div>
      </div>

      <BottomNav role={role} />
    </div>
  );
};

export default Profil;
