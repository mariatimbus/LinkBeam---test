import type { FloorSpace } from '../data/floorSpaces';
import { BookingForm } from './BookingForm';
import { BookingTimeline } from './BookingTimeline';
import '../styles/Sidebar.css';

interface BookingSidebarProps {
  space: FloorSpace | undefined;
  selectedDate: string;
  onDateChange: (value: string) => void;
}

export function BookingSidebar({ space, selectedDate, onDateChange }: BookingSidebarProps) {
  if (!space) {
    return (
      <aside className="panel sidebar">
        <div className="empty-state">Select a space on the floor plan to review its details.</div>
      </aside>
    );
  }

  return (
    <aside className="panel sidebar">
      <section className="sidebar__section">
        <div className="space-summary">
          <div className="space-summary__title">
            <span>{space.zone}</span>
            <h2 style={{ margin: 0 }}>{space.name}</h2>
          </div>
          <div className="space-summary__body">{space.description}</div>
          <div className="space-summary__tags">
            <span className="tag">Capacity {space.capacity}</span>
            <span className="tag">{space.type === 'desk' ? 'Desk cluster' : space.type === 'room' ? 'Meeting room' : 'Collaboration zone'}</span>
            {space.amenities.map((amenity) => (
              <span key={amenity} className="tag">
                {amenity}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="sidebar__section">
        <h3>Reserve this space</h3>
        <label className="form-label" style={{ marginBottom: '1rem' }}>
          Choose a date
          <input type="date" value={selectedDate} onChange={(event) => onDateChange(event.target.value)} />
        </label>
        <BookingForm spaceId={space.id} date={selectedDate} />
      </section>

      <section className="sidebar__section">
        <h3>Upcoming reservations</h3>
        <BookingTimeline space={space} />
      </section>
    </aside>
  );
}
