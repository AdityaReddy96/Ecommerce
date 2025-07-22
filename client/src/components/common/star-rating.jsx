import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

export const Rating = ({ rating, handleRatingChange }) => {
  return [1, 2, 3, 4, 5].map((star) => (
    <Button
      key={star}
      variant="outline"
      size="icon"
      className={`p-2 rounded-full transition-colors ${
        star <= rating ? "text-yellow-500 hover:text-yellow-600" : ""
      }`}
      onClick={handleRatingChange ? () => handleRatingChange(star) : null}
    >
      <StarIcon
        className={`w-5! h-5! ${
          star <= rating ? "fill-yellow-500" : "fill-transparent"
        }`}
      />
    </Button>
  ));
};
