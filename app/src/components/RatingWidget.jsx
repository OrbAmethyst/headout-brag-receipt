import { useState } from "react";

function Star({ filled, onClick, onEnter }) {
  return (
    <button className={filled ? "on" : ""} onClick={onClick} onMouseEnter={onEnter} aria-label="rate">
      <svg width="34" height="34" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.9 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z" />
      </svg>
    </button>
  );
}

export default function RatingWidget() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const active = hover || rating;

  return (
    <div className="rating" onMouseLeave={() => setHover(0)}>
      <div className="rating-left">
        <span className="q">Tell us how was your experience?</span>
        <div className="stars" role="radiogroup" aria-label="Rate your experience">
          {[1, 2, 3, 4, 5].map((n) => (
            <Star
              key={n}
              filled={n <= active}
              onEnter={() => setHover(n)}
              onClick={() => setRating(n)}
            />
          ))}
        </div>
      </div>
      <button className="submit" disabled={rating === 0}>Submit your rating</button>
    </div>
  );
}
