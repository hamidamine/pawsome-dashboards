import { Star } from "lucide-react";

const StarRating = ({ rating, max = 5 }: { rating: number; max?: number }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: max }).map((_, i) => (
      <Star
        key={i}
        className={`w-3.5 h-3.5 ${i < Math.round(rating) ? "fill-star text-star" : "text-muted-foreground/20"}`}
      />
    ))}
  </div>
);

export default StarRating;
