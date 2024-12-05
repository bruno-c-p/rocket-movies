import { Star } from "@phosphor-icons/react";

export function StarRating({ rating, size, maxRating = 5 }) {
  return (
    <ul className="text-pink flex mt-2">
      {Array.from({ length: maxRating }, (_, index) => (
        <li key={index}>
          <Star size={size} weight={index < rating ? "fill" : "bold"} />
        </li>
      ))}
    </ul>
  );
}
