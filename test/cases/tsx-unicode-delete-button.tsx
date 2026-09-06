function FlightLogEntry() {
  return (
    <div className="FlightLog-entry">
      <span className="FlightLog-entry-headerRight">
        {entry.canDelete && (
          <button
            className="FlightLog-entry-deleteBtn"
            onClick={() => onDelete(index)}
            title="Delete"
            aria-label="Delete entry"
          >
            ×
          </button>
        )}
      </span>
      {entry.type === "action" && entry.args && (
        <div className="FlightLog-entry-request">
          <pre className="FlightLog-entry-requestArgs">{entry.args}</pre>
        </div>
      )}
    </div>
  );
}

const after = true;
