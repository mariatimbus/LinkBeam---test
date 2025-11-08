export type SpaceType = 'desk' | 'room' | 'zone';
export type TimeSlot = 'Morning' | 'Afternoon' | 'Full Day';

export interface FloorSpace {
  id: string;
  label: string;
  name: string;
  type: SpaceType;
  zone: string;
  capacity: number;
  amenities: string[];
  coordinates: {
    left: number;
    top: number;
    width?: number;
    height?: number;
  };
  description: string;
}

export const timeSlots: TimeSlot[] = ['Full Day'];

const sharedAmenities = ['Dual monitor arm', 'Ergonomic chair', 'Power + USB'];

const zoneDescriptions: Record<string, string> = {
  'West North Row': 'North run of the west workstation bank overlooking the exterior windows.',
  'West South Row': 'South run of the west workstation bank bordering the central atrium.',
  'East North Row': 'North run of the east workstation bank adjacent to the café breakout.',
  'East South Row': 'South run of the east workstation bank closest to the maker pods.'
};

interface SeatConfig {
  id: string;
  label: string;
  zone: keyof typeof zoneDescriptions;
  left: number;
  top: number;
}

const seats: SeatConfig[] = [
  { id: 'desk-west-1', label: 'W1', zone: 'West North Row', left: 18, top: 32 },
  { id: 'desk-west-2', label: 'W2', zone: 'West North Row', left: 26, top: 32 },
  { id: 'desk-west-3', label: 'W3', zone: 'West North Row', left: 34, top: 32 },
  { id: 'desk-west-4', label: 'W4', zone: 'West North Row', left: 42, top: 32 },
  { id: 'desk-west-5', label: 'W5', zone: 'West South Row', left: 18, top: 64 },
  { id: 'desk-west-6', label: 'W6', zone: 'West South Row', left: 26, top: 64 },
  { id: 'desk-west-7', label: 'W7', zone: 'West South Row', left: 34, top: 64 },
  { id: 'desk-west-8', label: 'W8', zone: 'West South Row', left: 42, top: 64 },
  { id: 'desk-east-1', label: 'E1', zone: 'East North Row', left: 58, top: 32 },
  { id: 'desk-east-2', label: 'E2', zone: 'East North Row', left: 66, top: 32 },
  { id: 'desk-east-3', label: 'E3', zone: 'East North Row', left: 74, top: 32 },
  { id: 'desk-east-4', label: 'E4', zone: 'East North Row', left: 82, top: 32 },
  { id: 'desk-east-5', label: 'E5', zone: 'East South Row', left: 58, top: 64 },
  { id: 'desk-east-6', label: 'E6', zone: 'East South Row', left: 66, top: 64 },
  { id: 'desk-east-7', label: 'E7', zone: 'East South Row', left: 74, top: 64 },
  { id: 'desk-east-8', label: 'E8', zone: 'East South Row', left: 82, top: 64 }
];

export const floorSpaces: FloorSpace[] = seats.map((seat) => ({
  id: seat.id,
  label: seat.label,
  name: `Seat ${seat.label}`,
  type: 'desk',
  zone: seat.zone,
  capacity: 1,
  amenities: sharedAmenities,
  coordinates: { left: seat.left, top: seat.top },
  description: zoneDescriptions[seat.zone]
}));
