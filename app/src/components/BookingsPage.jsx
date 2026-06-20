import { useState } from "react";
import Header from "./Header.jsx";
import BookingCard from "./BookingCard.jsx";
import BragReceiptModal from "./BragReceiptModal.jsx";
import { BOOKINGS } from "../data.js";

export default function BookingsPage() {
  const [tab, setTab] = useState("completed");
  const [bragBooking, setBragBooking] = useState(null);

  return (
    <>
      <Header />

      <main className="bookings-main">
        <div className="wrap">
          <h1>My bookings</h1>

          <div className="tabs">
            <button className={"tab" + (tab === "upcoming" ? " active" : "")} onClick={() => setTab("upcoming")}>
              Upcoming
            </button>
            <button className={"tab" + (tab === "completed" ? " active" : "")} onClick={() => setTab("completed")}>
              Completed
            </button>
          </div>

          <div className="list">
            {tab === "completed" ? (
              BOOKINGS.map((b) => (
                <BookingCard key={b.id} booking={b} onBrag={setBragBooking} />
              ))
            ) : (
              <p style={{ color: "#888", padding: "40px 0" }}>No upcoming bookings.</p>
            )}
          </div>
        </div>
      </main>

      {bragBooking && (
        <BragReceiptModal booking={bragBooking} onClose={() => setBragBooking(null)} />
      )}
    </>
  );
}
