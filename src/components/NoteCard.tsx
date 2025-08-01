import React from "react";
import { useNavigate } from "react-router-dom";
import { Note } from "../types";

// Helper to format Firestore Timestamp or ISO string
function formatTimestamp(timestamp: any): string {
  if (!timestamp) return "Unknown";

  // Firestore Timestamp object has toDate() method
  const dateObj = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);

  return dateObj.toLocaleString("en-US", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

interface NoteCardProps {
  note: Note;
  handleDelete: (idToDelete: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, handleDelete }) => {
  const { id, title, body, color, lastUpdated } = note;
  const navigate = useNavigate();

  return (
    <div
      className="card shadow-sm position-relative"
      style={{
        backgroundColor: color || "#f5f5f5",
        minHeight: "180px",
        maxHeight: "260px",
        overflow: "hidden",
        paddingBottom: "2.5rem",
      }}
    >
      {/* Edit Button (top right) */}
      <button
        onClick={() => navigate(`/edit/${id}`)}
        className="btn btn-light btn-sm rounded-circle position-absolute"
        style={{
          top: "10px",
          right: "10px",
          width: "32px",
          height: "32px",
          fontSize: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-label="Edit note"
      >
        <i className="bi bi-pencil"></i>
      </button>

      <div className="card-body text-dark">
        <h5
          className="card-title mb-2"
          style={{ fontWeight: 600, fontSize: "1.2rem" }}
        >
          {title || "Untitled"}
        </h5>
        <p
          className="card-text"
          style={{ fontSize: "0.9rem", color: "#444" }}
        >
          {body?.slice(0, 80) || "No content"}
          {body?.length > 80 ? "..." : ""}
        </p>
      </div>

      <div
        className="card-footer bg-transparent border-0 d-flex justify-content-between align-items-center px-3"
        style={{ color: "#666", fontSize: "0.8rem" }}
      >
        <small className="text-muted">
          Updated: {formatTimestamp(lastUpdated)}
        </small>

        {/* Trash Button (bottom right) */}
        <button
          onClick={() => handleDelete(id)}
          className="btn btn-danger btn-sm rounded-circle shadow"
          style={{
            width: "30px",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
          }}
          aria-label="Delete note"
        >
          <i className="bi bi-trash" style={{ fontSize: "12px" }}></i>
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
