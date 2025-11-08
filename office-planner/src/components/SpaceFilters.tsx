interface SpaceFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  zoneFilter: string;
  onZoneFilterChange: (value: string) => void;
  availableZones: string[];
}

export function SpaceFilters({ searchQuery, onSearchChange, zoneFilter, onZoneFilterChange, availableZones }: SpaceFiltersProps) {
  return (
    <div className="filters-row">
      <input
        type="search"
        placeholder="Search by seat or zone"
        value={searchQuery}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <select value={zoneFilter} onChange={(event) => onZoneFilterChange(event.target.value)}>
        <option value="all">All rows</option>
        {availableZones.map((zone) => (
          <option key={zone} value={zone}>
            {zone}
          </option>
        ))}
      </select>
    </div>
  );
}
