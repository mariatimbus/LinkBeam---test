import { createContext, ReactNode, useContext, useMemo, useReducer } from 'react';
import type { TimeSlot } from '../data/floorSpaces';

type BookingId = string;

export interface Booking {
  id: BookingId;
  spaceId: string;
  employeeName: string;
  date: string;
  timeSlot: TimeSlot;
  notes?: string;
  createdAt: string;
}

interface BookingState {
  bookings: Record<string, Booking[]>; // keyed by spaceId
}

interface BookSpacePayload {
  spaceId: string;
  employeeName: string;
  date: string;
  timeSlot: TimeSlot;
  notes?: string;
}

interface BookingContextValue extends BookingState {
  bookSpace: (payload: BookSpacePayload) => { success: boolean; message: string };
  cancelBooking: (bookingId: BookingId) => void;
  isSpaceAvailable: (spaceId: string, date: string, timeSlot: TimeSlot) => boolean;
  getBookingsForSpace: (spaceId: string) => Booking[];
}

type Action =
  | { type: 'BOOK'; payload: Booking }
  | { type: 'CANCEL'; payload: { bookingId: BookingId } };

const BookingContext = createContext<BookingContextValue | null>(null);

const initialState: BookingState = {
  bookings: {}
};

function bookingReducer(state: BookingState, action: Action): BookingState {
  switch (action.type) {
    case 'BOOK': {
      const existing = state.bookings[action.payload.spaceId] ?? [];
      return {
        bookings: {
          ...state.bookings,
          [action.payload.spaceId]: [...existing, action.payload]
        }
      };
    }
    case 'CANCEL': {
      const updated: Record<string, Booking[]> = {};
      for (const [spaceId, bookings] of Object.entries(state.bookings)) {
        updated[spaceId] = bookings.filter((booking) => booking.id !== action.payload.bookingId);
      }
      return { bookings: updated };
    }
    default:
      return state;
  }
}

function createBookingId(spaceId: string, date: string, timeSlot: TimeSlot) {
  return `${spaceId}-${date}-${timeSlot}-${Math.random().toString(36).slice(2, 8)}`;
}

function hasConflict(existing: Booking, date: string, timeSlot: TimeSlot) {
  if (existing.date !== date) {
    return false;
  }

  if (existing.timeSlot === 'Full Day' || timeSlot === 'Full Day') {
    return true;
  }

  return existing.timeSlot === timeSlot;
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  const value = useMemo<BookingContextValue>(() => {
    const bookSpace: BookingContextValue['bookSpace'] = ({ spaceId, employeeName, date, timeSlot, notes }) => {
      const existing = state.bookings[spaceId] ?? [];
      const conflict = existing.find((booking) => hasConflict(booking, date, timeSlot));

      if (conflict) {
        return {
          success: false,
          message: `Already booked by ${conflict.employeeName} for ${conflict.timeSlot.toLowerCase()} on ${date}.`
        };
      }

      const newBooking: Booking = {
        id: createBookingId(spaceId, date, timeSlot),
        spaceId,
        employeeName,
        date,
        timeSlot,
        notes,
        createdAt: new Date().toISOString()
      };

      dispatch({ type: 'BOOK', payload: newBooking });

      return {
        success: true,
        message: `${employeeName} booked for ${timeSlot.toLowerCase()} on ${date}.`
      };
    };

    const cancelBooking: BookingContextValue['cancelBooking'] = (bookingId) => {
      dispatch({ type: 'CANCEL', payload: { bookingId } });
    };

    const isSpaceAvailable: BookingContextValue['isSpaceAvailable'] = (spaceId, date, timeSlot) => {
      const existing = state.bookings[spaceId] ?? [];
      return existing.every((booking) => !hasConflict(booking, date, timeSlot));
    };

    const getBookingsForSpace: BookingContextValue['getBookingsForSpace'] = (spaceId) => {
      return [...(state.bookings[spaceId] ?? [])].sort((a, b) => a.date.localeCompare(b.date));
    };

    return {
      bookings: state.bookings,
      bookSpace,
      cancelBooking,
      isSpaceAvailable,
      getBookingsForSpace
    };
  }, [state.bookings]);

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBookingContext() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error('useBookingContext must be used inside a BookingProvider');
  }

  return context;
}
