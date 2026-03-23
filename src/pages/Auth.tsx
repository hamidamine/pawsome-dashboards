import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Dog, Footprints, Mail, Lock, User, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userType, setUserType] = useState<"owner" | "walker">("owner");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (forgotMode) {
      const { error } = await import("@/integrations/supabase/client").then(m =>
        m.supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        })
      );
      setSubmitting(false);
      if (error) return toast.error(error.message);
      toast.success("Email de réinitialisation envoyé !");
      setForgotMode(false);
      return;
    }

    if (mode === "login") {
      const { error } = await signIn(email, password);
      setSubmitting(false);
      if (error) return toast.error(error.message);
      toast.success("Connexion réussie !");
      navigate("/");
    } else {
      if (!firstName.trim()) { setSubmitting(false); return toast.error("Prénom requis"); }
      const { error } = await signUp(email, password, {
        first_name: firstName,
        last_name: lastName,
        user_type: userType,
      });
      setSubmitting(false);
      if (error) return toast.error(error.message);
      toast.success("Compte créé ! Vérifiez votre email pour confirmer.");
    }
  };

  if (forgotMode) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm space-y-6">
          <button onClick={() => setForgotMode(false)} className="text-primary font-bold text-sm flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Retour
          </button>
          <h1 className="text-2xl font-black text-foreground">Mot de passe oublié</h1>
          <p className="text-sm text-muted-foreground">Entrez votre email pour recevoir un lien de réinitialisation.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" required />
            </div>
            <button type="submit" disabled={submitting}
              className="w-full py-3 rounded-xl gradient-primary text-white font-bold shadow-glow-primary disabled:opacity-50">
              {submitting ? "Envoi..." : "Envoyer le lien"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1/3 gradient-primary opacity-[0.06] rounded-b-[60px]" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm space-y-6 z-10">
        <div className="text-center space-y-2">
          <div className="text-4xl">🐾</div>
          <h1 className="text-2xl font-black text-foreground">
            Dog<span className="text-gradient-primary">Walking</span> Hub
          </h1>
          <p className="text-sm text-muted-foreground font-semibold">
            {mode === "login" ? "Connectez-vous à votre compte" : "Créez votre compte"}
          </p>
        </div>

        {/* Tab toggle */}
        <div className="flex bg-muted rounded-xl p-1">
          {(["login", "signup"] as const).map(m => (
            <button key={m} onClick={() => setMode(m)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${mode === m ? "bg-card shadow-card text-foreground" : "text-muted-foreground"}`}>
              {m === "login" ? "Connexion" : "Inscription"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === "signup" && (
            <>
              {/* User type selection */}
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setUserType("owner")}
                  className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1.5 transition-all ${
                    userType === "owner" ? "border-primary bg-primary/5" : "border-border"
                  }`}>
                  <Dog className={`w-6 h-6 ${userType === "owner" ? "text-primary" : "text-muted-foreground"}`} />
                  <span className="text-xs font-bold">Propriétaire</span>
                </button>
                <button type="button" onClick={() => setUserType("walker")}
                  className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1.5 transition-all ${
                    userType === "walker" ? "border-primary bg-primary/5" : "border-border"
                  }`}>
                  <Footprints className={`w-6 h-6 ${userType === "walker" ? "text-primary" : "text-muted-foreground"}`} />
                  <span className="text-xs font-bold">Promeneur</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Prénom"
                    className="w-full pl-10 pr-3 py-3 rounded-xl bg-muted text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" required />
                </div>
                <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Nom"
                  className="w-full px-3 py-3 rounded-xl bg-muted text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" required />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe"
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-muted text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" required minLength={6} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {mode === "login" && (
            <button type="button" onClick={() => setForgotMode(true)} className="text-xs text-primary font-semibold">
              Mot de passe oublié ?
            </button>
          )}

          <button type="submit" disabled={submitting}
            className="w-full py-3.5 rounded-xl gradient-primary text-white font-black text-base shadow-glow-primary disabled:opacity-50 transition-opacity">
            {submitting ? "Chargement..." : mode === "login" ? "Se connecter" : "Créer mon compte"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Auth;
