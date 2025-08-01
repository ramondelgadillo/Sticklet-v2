import React from "react";
import { useNavigate } from "react-router-dom";

const FloatingButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/new");
  };

  return (
    <button
      onClick={handleClick}
      className="btn btn-light rounded-circle shadow"
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        width: "56px",
        height: "56px",
        fontSize: "28px",
        fontWeight: "bold",
        lineHeight: 0,
        padding: 0,
        zIndex: 1000,
      }}
      aria-label="Add new note"
    >
      +
    </button>
  );
};

export default FloatingButton;
