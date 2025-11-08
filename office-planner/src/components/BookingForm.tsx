import { FormEvent, useMemo, useState } from 'react';
import { timeSlots } from '../data/floorSpaces';
import { useBookingContext } from '../context/BookingContext';

interface BookingFormProps {
  spaceId: string;
  date: string;
}

export function BookingForm({ spaceId, date }: BookingFormProps) {
  const { bookSpace } = useBookingContext();
  const defaultSlot = timeSlots[0];
  const [employeeName, setEmployeeName] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<(typeof timeSlots)[number]>(defaultSlot);
  const [notes, setNotes] = useState('');
  const [feedback, setFeedback] = useState<{ message: string; tone: 'positive' | 'negative' } | null>(null);

  const isValid = useMemo(() => employeeName.trim().length > 1, [employeeName]);
  const hasMultipleSlots = timeSlots.length > 1;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValid) {
      setFeedback({ message: 'Add the guest or employee name before reserving.', tone: 'negative' });
      return;
    }

    const result = bookSpace({ spaceId, employeeName: employeeName.trim(), date, timeSlot: selectedSlot, notes: notes.trim() || undefined });
    setFeedback({ message: result.message, tone: result.success ? 'positive' : 'negative' });

    if (result.success) {
      setEmployeeName('');
      setNotes('');
      setSelectedSlot(defaultSlot);
    }
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <label className="form-label">
        Team member
        <input type="text" value={employeeName} onChange={(event) => setEmployeeName(event.target.value)} placeholder="e.g. Jordan Lee" />
      </label>

      {hasMultipleSlots ? (
        <label className="form-label">
          Time slot
          <select value={selectedSlot} onChange={(event) => setSelectedSlot(event.target.value as (typeof timeSlots)[number])}>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </label>
      ) : (
        <div className="form-label">
          <span>Time slot</span>
          <span className="readonly-pill">{defaultSlot}</span>
        </div>
      )}

      <label className="form-label">
        Notes
        <textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Share purpose or guests" rows={3} />
      </label>

      <button type="submit" className="primary-button">
        Reserve seat
      </button>

      {feedback && <div className={`callout ${feedback.tone === 'negative' ? 'warning' : ''}`}>{feedback.message}</div>}
    </form>
  );
}
