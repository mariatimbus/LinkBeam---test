export function Legend() {
  return (
    <div className="legend">
      <span>
        <span className="legend-dot" style={{ background: '#22c55e' }} /> Available seat
      </span>
      <span>
        <span className="legend-dot" style={{ background: '#dc2626' }} /> Occupied seat
      </span>
    </div>
  );
}
