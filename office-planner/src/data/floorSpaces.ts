export type SpaceType = 'desk' | 'room' | 'zone';
export type TimeSlot = 'Morning' | 'Afternoon' | 'Full Day';

export interface FloorSpace {
  id: string;
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

export const timeSlots: TimeSlot[] = ['Morning', 'Afternoon', 'Full Day'];

export const floorSpaces: FloorSpace[] = [
  {
    id: 'room-a',
    name: 'Meeting Room A',
    type: 'room',
    zone: 'Northwest',
    capacity: 10,
    amenities: ['Display', 'Hybrid VC', 'Whiteboard'],
    coordinates: { left: 9, top: 20, width: 9, height: 12 },
    description: 'Ideal for workshops and hybrid meetings with full AV support.'
  },
  {
    id: 'innovation-lab',
    name: 'Innovation Lab',
    type: 'room',
    zone: 'Central West',
    capacity: 14,
    amenities: ['Flexible seating', '3D Printer', 'Brainstorm wall'],
    coordinates: { left: 9, top: 48, width: 9, height: 12 },
    description: 'Creative lab with flexible furniture and prototyping gear.'
  },
  {
    id: 'room-b',
    name: 'Meeting Room B',
    type: 'room',
    zone: 'Southwest',
    capacity: 8,
    amenities: ['Display', 'Conference phone'],
    coordinates: { left: 9, top: 76, width: 9, height: 12 },
    description: 'Comfortable project room perfect for daily stand-ups.'
  },
  {
    id: 'quiet-pods',
    name: 'Quiet Pods',
    type: 'zone',
    zone: 'Northeast',
    capacity: 6,
    amenities: ['Soundproof', 'Focus lighting'],
    coordinates: { left: 91, top: 20, width: 9, height: 12 },
    description: 'A set of sound-dampening pods for deep focus work.'
  },
  {
    id: 'cafe-lounge',
    name: 'Café Lounge',
    type: 'zone',
    zone: 'Central East',
    capacity: 20,
    amenities: ['Coffee bar', 'Soft seating', 'Town hall'],
    coordinates: { left: 91, top: 48, width: 9, height: 12 },
    description: 'Hospitality-inspired lounge encouraging informal collaboration.'
  },
  {
    id: 'makers-space',
    name: 'Makers Space',
    type: 'zone',
    zone: 'Southeast',
    capacity: 12,
    amenities: ['Workbench', 'Storage', 'Tools'],
    coordinates: { left: 91, top: 76, width: 9, height: 12 },
    description: 'Hands-on workshop with modular benches and fabrication tools.'
  },
  {
    id: 'west-wing',
    name: 'West Wing Desks',
    type: 'desk',
    zone: 'West Wing',
    capacity: 42,
    amenities: ['Dual monitors', 'Sit/stand', 'Focus pods'],
    coordinates: { left: 32, top: 48, width: 24, height: 56 },
    description: 'Desk neighborhood with adjustable furniture and acoustic panels.'
  },
  {
    id: 'east-wing',
    name: 'East Wing Desks',
    type: 'desk',
    zone: 'East Wing',
    capacity: 44,
    amenities: ['Dual monitors', 'Sit/stand', 'Library wall'],
    coordinates: { left: 68, top: 48, width: 24, height: 56 },
    description: 'Bright desk area adjacent to project breakout spaces.'
  },
  {
    id: 'atrium',
    name: 'Atrium',
    type: 'zone',
    zone: 'Central Core',
    capacity: 18,
    amenities: ['Natural light', 'Projection wall'],
    coordinates: { left: 50, top: 38, width: 12, height: 42 },
    description: 'Open atrium connecting both wings with flexible seating tiers.'
  },
  {
    id: 'collab-zone',
    name: 'Collaboration Zone',
    type: 'zone',
    zone: 'Southwest',
    capacity: 16,
    amenities: ['Writable walls', 'Soft seating', 'Mobile displays'],
    coordinates: { left: 40, top: 84, width: 16, height: 12 },
    description: 'Casual team zone with modular seating for impromptu syncs.'
  },
  {
    id: 'project-zone',
    name: 'Project Zone',
    type: 'zone',
    zone: 'Southeast',
    capacity: 18,
    amenities: ['Pin-up boards', 'Storage', 'Touchdown tables'],
    coordinates: { left: 60, top: 84, width: 16, height: 12 },
    description: 'Project landing area with touchdown tables and storage.'
  }
];
