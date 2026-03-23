import StarRating from "./StarRating";
import avatarWalker from "@/assets/avatar-walker.jpg";

interface NearbyWalkerProps {
  name: string;
  rating: number;
  reviews: number;
  distance: string;
  price: string;
  avatar?: string;
  badges?: string[];
}

const NearbyWalkerCard = ({ name, rating, reviews, distance, price, avatar, badges = [] }: NearbyWalkerProps) => (
  <div className="bg-card rounded-2xl shadow-card p-3 flex items-center gap-3">
    <img
      src={avatar || avatarWalker}
      alt={name}
      className="w-12 h-12 rounded-full object-cover border-2 border-primary"
      loading="lazy"
    />
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <span className="font-bold text-sm text-foreground">{name}</span>
        {badges.map((b) => (
          <span key={b} className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
            {b}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-1 mt-0.5">
        <StarRating rating={rating} />
        <span className="text-[10px] text-muted-foreground">({reviews})</span>
        <span className="text-[10px] text-muted-foreground ml-1">· {distance}</span>
      </div>
    </div>
    <div className="text-right">
      <span className="text-sm font-extrabold text-foreground">{price}</span>
      <p className="text-[9px] text-muted-foreground">/balade</p>
    </div>
  </div>
);

export default NearbyWalkerCard;
