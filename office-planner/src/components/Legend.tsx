export function Legend() {
  return (
    <div className="legend">
      <span>
        <span className="legend-dot" style={{ background: 'rgba(34, 197, 94, 0.85)' }} /> Available
      </span>
      <span>
        <span className="legend-dot" style={{ background: 'rgba(250, 204, 21, 0.9)' }} /> Partially booked
      </span>
      <span>
        <span className="legend-dot" style={{ background: 'rgba(248, 113, 113, 0.9)' }} /> Fully booked
      </span>
      <span>
        <span className="legend-dot" style={{ background: 'rgba(59, 130, 246, 0.7)' }} /> Desks
      </span>
      <span>
        <span className="legend-dot" style={{ background: 'rgba(236, 72, 153, 0.7)' }} /> Rooms
      </span>
      <span>
        <span className="legend-dot" style={{ background: 'rgba(14, 165, 233, 0.7)' }} /> Zones
      </span>
    </div>
  );
}
