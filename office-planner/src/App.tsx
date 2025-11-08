import { useEffect, useMemo, useState } from 'react';
import { BookingProvider } from './context/BookingContext';
import { floorSpaces, type FloorSpace, type SpaceType } from './data/floorSpaces';
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
  const [typeFilter, setTypeFilter] = useState<SpaceType | 'all'>('all');
  const [zoneFilter, setZoneFilter] = useState<string>('all');
  const today = useToday();
  const [selectedDate, setSelectedDate] = useState<string>(today);

  const filteredSpaces = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return floorSpaces.filter((space) => {
      const matchesQuery = query.length === 0 || `${space.name} ${space.zone}`.toLowerCase().includes(query);
      const matchesType = typeFilter === 'all' || space.type === typeFilter;
      const matchesZone = zoneFilter === 'all' || space.zone === zoneFilter;
      return matchesQuery && matchesType && matchesZone;
    });
  }, [searchQuery, typeFilter, zoneFilter]);

  useEffect(() => {
    if (filteredSpaces.length === 0) {
      if (selectedSpaceId !== null) {
        setSelectedSpaceId(null);
      }
      return;
    }

    const hasSelectedSpace = selectedSpaceId ? filteredSpaces.some((space) => space.id === selectedSpaceId) : false;

    if (!hasSelectedSpace) {
      setSelectedSpaceId(filteredSpaces[0].id);
    }
  }, [filteredSpaces, selectedSpaceId]);

  const selectedSpace: FloorSpace | undefined = useMemo(() => {
    if (filteredSpaces.length === 0) {
      return undefined;
    }

    if (!selectedSpaceId) {
      return filteredSpaces[0];
    }

    return filteredSpaces.find((space) => space.id === selectedSpaceId) ?? filteredSpaces[0];
  }, [filteredSpaces, selectedSpaceId]);

  const zones = useMemo(
    () => Array.from(new Set(floorSpaces.map((space) => space.zone))).sort((a, b) => a.localeCompare(b)),
    []
  );

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Atlas Office Planner</h1>
        <p>
          Visualize your workplace, reserve rooms, and find the right seat in seconds. Click any neighborhood or room on the map
          to get started.
        </p>
      </header>

      <main className="app-content">
        <section className="panel" aria-label="Floor plan and space selection">
          <SpaceFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            typeFilter={typeFilter}
            onTypeFilterChange={(value) => setTypeFilter(value)}
            zoneFilter={zoneFilter}
            onZoneFilterChange={(value) => setZoneFilter(value)}
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
