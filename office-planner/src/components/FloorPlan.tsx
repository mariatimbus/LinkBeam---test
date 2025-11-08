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

type SeatAvailability = 'available' | 'unavailable';

function getSeatAvailability(
  spaceId: string,
  selectedDate: string,
  bookings: ReturnType<typeof useBookingContext>['bookings']
): SeatAvailability {
  const todaysBookings = (bookings[spaceId] ?? []).filter((booking) => booking.date === selectedDate);
  return todaysBookings.length === 0 ? 'available' : 'unavailable';
}

function FloorPlanComponent({ spaces, selectedSpaceId, onSelect, selectedDate }: FloorPlanProps) {
  const bookingContext = useBookingContext();

  return (
    <div className="floor-plan">
      <img src="/floorplan.svg" alt="Openspace floor plan" className="floor-plan__image" />
      {spaces.map((space) => {
        const availability = getSeatAvailability(space.id, selectedDate, bookingContext.bookings);
        const isSelected = selectedSpaceId === space.id;
        const label = space.label;

        return (
          <button
            key={space.id}
            className={`floor-plan__seat floor-plan__seat--${availability} ${
              isSelected ? 'floor-plan__seat--selected' : ''
            }`}
            style={{
              left: `${space.coordinates.left}%`,
              top: `${space.coordinates.top}%`
            }}
            type="button"
            onClick={() => onSelect(space.id)}
            aria-label={`${space.name}. ${availability === 'available' ? 'Available' : 'Occupied'} on ${selectedDate}.`}
            title={`${space.name} · ${space.zone}`}
          >
            <span className="sr-only">{space.name}</span>
            <span className="floor-plan__seat-label" aria-hidden="true">
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export const FloorPlan = memo(FloorPlanComponent);
