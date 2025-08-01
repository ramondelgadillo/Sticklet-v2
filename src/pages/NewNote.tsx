import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { getAlternatingColor } from "../utils";

const NewNote: React.FC = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = async () => {
    if (!title && !content) {
      alert("Please enter a title or content.");
      return;
    }

    try {
      // Create new note WITHOUT id field
      const newNote = {
        title,
        body: content,
        color: getAlternatingColor(),
        lastUpdated: serverTimestamp(),
      };

      // Add the doc, get the reference
      const docRef = await addDoc(collection(db, "notes"), newNote);

      // Update the new doc with its own Firestore ID as 'id'
      await updateDoc(doc(db, "notes", docRef.id), { id: docRef.id });

      navigate("/");
    } catch (error) {
      console.error("Error adding note: ", error);
    }
  };

  return (
    <div className="container mt-4" style={{ color: "#fff" }}>
      <button
        onClick={() => navigate(-1)}
        className="btn btn-light rounded-circle mb-3"
        aria-label="Go back"
        style={{ width: "36px", height: "36px" }}
      >
        <i className="bi bi-arrow-left" style={{ fontSize: "18px" }}></i>
      </button>

      <h2 style={{ fontWeight: 500, marginBottom: "1rem" }}>New Note</h2>

      <input
        type="text"
        placeholder="Title"
        className="form-control mb-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          backgroundColor: "#212124",
          border: "none",
          color: "#fff",
          fontWeight: "600",
        }}
      />

      <textarea
        placeholder="Content"
        className="form-control"
        rows={8}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          backgroundColor: "#212124",
          border: "none",
          color: "#fff",
          resize: "none",
        }}
      />

      <button
        className="btn btn-primary mt-3"
        onClick={handleSave}
        style={{ fontWeight: 500 }}
      >
        Save
      </button>
    </div>
  );
};

export default NewNote;
