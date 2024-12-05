import { Link } from "react-router-dom";
import { Tag } from "../Tag";
import { StarRating } from "../StarRating/StarRating";

export function MovieNoteItem({ movieNote }) {
  function truncate(text, maxLength) {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  }

  return (
    <li>
      <Link
        to={`/details/${movieNote.movie_notes_id}`}
        className="p-8 bg-pink bg-opacity-5 rounded-2xl block"
      >
        <h2 className="text-card-title text-base-title">{movieNote.title}</h2>
        <StarRating rating={movieNote.rating} size={12} />
        <p className="text-card-text mt-4">
          {truncate(movieNote.description, 350)}
        </p>
        <ul className="flex gap-2 mt-4 overflow-hidden">
          {movieNote.tags?.map((name, index) => (
            <Tag key={name + index} name={name} />
          ))}
        </ul>
      </Link>
    </li>
  );
}
