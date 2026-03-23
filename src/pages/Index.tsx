import { useNavigate } from "react-router-dom";
import { Dog, Footprints } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 gap-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-foreground">🐾 DogWalking Hub</h1>
        <p className="text-muted-foreground">Choisissez votre tableau de bord</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
        <button
          onClick={() => navigate("/owner")}
          className="bg-card rounded-2xl shadow-card p-8 flex flex-col items-center gap-3 hover:shadow-card-hover transition-shadow"
        >
          <Dog className="w-10 h-10 text-primary" />
          <span className="font-bold text-foreground">Propriétaire</span>
          <span className="text-xs text-muted-foreground text-center">Gérez vos chiens et réservations</span>
        </button>

        <button
          onClick={() => navigate("/walker")}
          className="bg-card rounded-2xl shadow-card p-8 flex flex-col items-center gap-3 hover:shadow-card-hover transition-shadow"
        >
          <Footprints className="w-10 h-10 text-accent" />
          <span className="font-bold text-foreground">Promeneur</span>
          <span className="text-xs text-muted-foreground text-center">Votre profil et missions</span>
        </button>
      </div>
    </div>
  );
};

export default Index;
