import React from "react";
import { FaTrash } from "react-icons/fa";

interface DeleteAllButtonProps {
  onDeleteAll: () => void;
}

const DeleteAllButton: React.FC<DeleteAllButtonProps> = ({ onDeleteAll }) => {
  const handleClick = () => {
    if (window.confirm("Are you sure you want to delete all notes?")) {
      onDeleteAll();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="btn rounded-circle shadow"
      style={{
        position: "fixed",
        bottom: "30px",
        right: "100px",
        width: "56px",
        height: "56px",
        fontSize: "20px",
        backgroundColor: "#dc3545",
        color: "white",
        border: "none",
        transition: "background-color 0.3s ease",
      }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#b02a37")}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#dc3545")}
      aria-label="Delete all notes"
    >
      <i className="bi bi-trash"></i>
    </button>
  );
};

export default DeleteAllButton;
