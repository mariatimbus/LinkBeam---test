import type { SpaceType } from '../data/floorSpaces';

interface SpaceFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  typeFilter: SpaceType | 'all';
  onTypeFilterChange: (value: SpaceType | 'all') => void;
  zoneFilter: string;
  onZoneFilterChange: (value: string) => void;
  availableZones: string[];
}

export function SpaceFilters({
  searchQuery,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  zoneFilter,
  onZoneFilterChange,
  availableZones
}: SpaceFiltersProps) {
  return (
    <div className="filters-row">
      <input
        type="search"
        placeholder="Search spaces"
        value={searchQuery}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <select value={typeFilter} onChange={(event) => onTypeFilterChange(event.target.value as SpaceType | 'all')}>
        <option value="all">All types</option>
        <option value="desk">Desk neighborhoods</option>
        <option value="room">Rooms</option>
        <option value="zone">Collaboration zones</option>
      </select>

      <select value={zoneFilter} onChange={(event) => onZoneFilterChange(event.target.value)}>
        <option value="all">All zones</option>
        {availableZones.map((zone) => (
          <option key={zone} value={zone}>
            {zone}
          </option>
        ))}
      </select>
    </div>
  );
}
