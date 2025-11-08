import { useBookingContext } from '../context/BookingContext';
import type { FloorSpace } from '../data/floorSpaces';

interface BookingTimelineProps {
  space: FloorSpace;
}

export function BookingTimeline({ space }: BookingTimelineProps) {
  const { getBookingsForSpace, cancelBooking } = useBookingContext();
  const bookings = getBookingsForSpace(space.id);

  if (bookings.length === 0) {
    return <div className="empty-state">No reservations yet. Be the first to book it!</div>;
  }

  return (
    <div className="timeline">
      {bookings.map((booking) => (
        <div key={booking.id} className="timeline-entry">
          <div>
            <strong>
              {booking.date} · {booking.timeSlot}
            </strong>
            <span>Reserved for {booking.employeeName}</span>
          </div>
          <button type="button" className="cancel-link" onClick={() => cancelBooking(booking.id)}>
            Cancel
          </button>
        </div>
      ))}
    </div>
  );
}
