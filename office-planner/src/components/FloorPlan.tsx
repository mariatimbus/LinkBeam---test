import { memo } from 'react';
import type { FloorSpace } from '../data/floorSpaces';
import { useBookingContext } from '../context/BookingContext';
import '../styles/FloorPlan.css';

interface FloorPlanProps {
  spaces: FloorSpace[];
  selectedSpaceId: string | null;
  onSelect: (spaceId: string) => void;
  selectedDate: string;
}

type SpaceAvailability = 'available' | 'partial' | 'unavailable';

function getAvailabilityBadge(
  spaceId: string,
  selectedDate: string,
  isSpaceAvailable: ReturnType<typeof useBookingContext>['isSpaceAvailable'],
  bookings: ReturnType<typeof useBookingContext>['bookings']
): SpaceAvailability {
  const todayBookings = (bookings[spaceId] ?? []).filter((booking) => booking.date === selectedDate);

  if (todayBookings.length === 0) {
    return 'available';
  }

  const fullDayBooked = todayBookings.some((booking) => booking.timeSlot === 'Full Day');

  if (fullDayBooked) {
    return 'unavailable';
  }

  const morningBooked = !isSpaceAvailable(spaceId, selectedDate, 'Morning');
  const afternoonBooked = !isSpaceAvailable(spaceId, selectedDate, 'Afternoon');

  if (morningBooked && afternoonBooked) {
    return 'unavailable';
  }

  return 'partial';
}

function FloorPlanComponent({ spaces, selectedSpaceId, onSelect, selectedDate }: FloorPlanProps) {
  const bookingContext = useBookingContext();

  return (
    <div className="floor-plan">
      <img src="/floorplan.svg" alt="Simplified office floor plan" className="floor-plan__image" />
      {spaces.map((space) => {
        const availability = getAvailabilityBadge(space.id, selectedDate, bookingContext.isSpaceAvailable, bookingContext.bookings);
        const isSelected = selectedSpaceId === space.id;

        return (
          <button
            key={space.id}
            className={`floor-plan__space floor-plan__space--${space.type} floor-plan__space--${availability} ${
              isSelected ? 'floor-plan__space--selected' : ''
            }`}
            style={{
              left: `${space.coordinates.left}%`,
              top: `${space.coordinates.top}%`,
              width: space.coordinates.width ? `${space.coordinates.width}%` : undefined,
              height: space.coordinates.height ? `${space.coordinates.height}%` : undefined
            }}
            type="button"
            onClick={() => onSelect(space.id)}
          >
            <span className="space-name">{space.name}</span>
            <span className="space-meta">{space.type === 'desk' ? `${space.capacity} desks` : `${space.capacity} ppl`}</span>
            <span className={`availability-pill availability-pill--${availability}`}>
              {availability === 'available' && 'Available'}
              {availability === 'partial' && 'Partially booked'}
              {availability === 'unavailable' && 'Fully booked'}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export const FloorPlan = memo(FloorPlanComponent);
