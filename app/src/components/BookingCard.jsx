import RatingWidget from "./RatingWidget.jsx";

const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="4.5" width="18" height="17" rx="2.5" />
    <path d="M3 9h18M8 2.5v4M16 2.5v4" />
  </svg>
);

const GridIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

const WarnIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
    <path d="M12 3L1.5 21h21z" />
    <path d="M12 10v4" />
    <circle cx="12" cy="17.5" r=".4" fill="currentColor" />
  </svg>
);

export default function BookingCard({ booking, onBrag }) {
  const cancelled = booking.status === "cancelled";

  return (
    <article className="card">
      <div className="card-inner">
        <div className="thumb">
          <img src={booking.image} alt={booking.title} />
        </div>

        <div className="cbody">
          <div className="row1">
            <div>
              <h2 className="ctitle">{booking.title}</h2>
              <span className="bid">
                BOOKING ID: <b>{booking.id}</b>
              </span>
            </div>
            <div className="price">{booking.price}</div>
          </div>

          <hr className="divider" />

          <div className="row2">
            <div className="meta">
              <span className="line">
                <CalendarIcon />
                {booking.date}
              </span>
              {booking.badge && (
                <span className="line">
                  <GridIcon />
                  {booking.badge}
                </span>
              )}
              <a className="inclusions" role="button" tabIndex={0}>
                Show inclusions &amp; important info ›
              </a>
            </div>

            <div className="row2-right">
              {cancelled && (
                <span className="status-cancelled">
                  <WarnIcon />
                  Booking cancelled
                </span>
              )}
              <a className="btn" role="button" tabIndex={0}>View details</a>

              {/* Brag Receipt CTA — primary action, stacked below View details
                  for completed (rateable) bookings. */}
              {booking.receipt && (
                <button className="btn-brag" onClick={() => onBrag(booking)}>
                  <span className="brag-label"><span className="spark">✦</span> Brag Receipt</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {booking.rateable && <RatingWidget />}
    </article>
  );
}
