import { useState } from "react";

function Star({ filled, onClick, onEnter }) {
  return (
    <button className={filled ? "on" : ""} onClick={onClick} onMouseEnter={onEnter} aria-label="rate">
      <svg width="32" height="32" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.9 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z" />
      </svg>
    </button>
  );
}

const Chevron = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 15l6-6 6 6" />
  </svg>
);

export default function RatingWidget() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const active = hover || rating;

  return (
    <div className={"rating" + (collapsed ? " collapsed" : "")} onMouseLeave={() => setHover(0)}>
      <div className="rating-head">
        <span className="q">Tell us how was your experience?</span>
        <button className="rating-chev" onClick={() => setCollapsed((c) => !c)} aria-label={collapsed ? "Expand" : "Collapse"}>
          <Chevron />
        </button>
      </div>

      <div className="rating-row">
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
        <button className="submit" disabled={rating === 0}>Submit your rating</button>
      </div>
    </div>
  );
}
