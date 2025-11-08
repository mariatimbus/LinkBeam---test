import { useMemo, useState } from 'react';
import { BookingProvider } from './context/BookingContext';
import { floorSpaces, type FloorSpace } from './data/floorSpaces';
import { FloorPlan } from './components/FloorPlan';
import { SpaceFilters } from './components/SpaceFilters';
import { Legend } from './components/Legend';
import { BookingSidebar } from './components/BookingSidebar';
import './styles/App.css';

function useToday() {
  return useMemo(() => new Date().toISOString().slice(0, 10), []);
}

function AppShell() {
  const [selectedSpaceId, setSelectedSpaceId] = useState<string | null>(floorSpaces[0]?.id ?? null);
  const [searchQuery, setSearchQuery] = useState('');
  const [zoneFilter, setZoneFilter] = useState<string>('all');
  const today = useToday();
  const [selectedDate, setSelectedDate] = useState<string>(today);

  const filteredSpaces = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return floorSpaces.filter((space) => {
      const matchesQuery =
        query.length === 0 || `${space.name} ${space.zone} ${space.label}`.toLowerCase().includes(query);
      const matchesZone = zoneFilter === 'all' || space.zone === zoneFilter;
      return matchesQuery && matchesZone;
    });
  }, [searchQuery, zoneFilter]);

  const selectedSpace: FloorSpace | undefined = useMemo(
    () => floorSpaces.find((space) => space.id === selectedSpaceId) ?? filteredSpaces[0],
    [filteredSpaces, selectedSpaceId]
  );

  const zones = useMemo(() => Array.from(new Set(floorSpaces.map((space) => space.zone))).sort(), []);

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Atlas Openspace Seat Planner</h1>
        <p>
          Browse the openspace map to find an available workstation. Seats turn green when free and red when already booked.
          Select any seat to review its details and reserve it for the day.
        </p>
      </header>

      <main className="app-content">
        <section className="panel" aria-label="Floor plan and seat selection">
          <SpaceFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            zoneFilter={zoneFilter}
            onZoneFilterChange={setZoneFilter}
            availableZones={zones}
          />

          <Legend />

          <FloorPlan
            spaces={filteredSpaces}
            selectedSpaceId={selectedSpace?.id ?? null}
            onSelect={setSelectedSpaceId}
            selectedDate={selectedDate}
          />
        </section>

        <BookingSidebar space={selectedSpace} selectedDate={selectedDate} onDateChange={setSelectedDate} />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BookingProvider>
      <AppShell />
    </BookingProvider>
  );
}
