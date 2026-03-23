interface DogCardProps {
  name: string;
  breed: string;
  image: string;
  emoji: string;
  status: "Actif" | "Disponible";
}

const DogCard = ({ name, breed, image, emoji, status }: DogCardProps) => (
  <div className="bg-card rounded-2xl shadow-card overflow-hidden">
    <img src={image} alt={name} className="w-full aspect-square object-cover" loading="lazy" />
    <div className="p-3">
      <div className="flex items-center gap-1">
        <span className="text-lg">{emoji}</span>
        <span className="font-bold text-foreground">{name}</span>
        <span className="text-lg">{emoji}</span>
      </div>
      <p className="text-xs text-muted-foreground">{breed}</p>
      <span
        className={`inline-block mt-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${
          status === "Actif"
            ? "bg-accent/15 text-accent"
            : "bg-passion/15 text-passion"
        }`}
      >
        ● {status}
      </span>
    </div>
  </div>
);

export default DogCard;
