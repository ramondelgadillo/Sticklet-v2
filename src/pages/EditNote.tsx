import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, deleteDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "../firebase"; // Adjust import path
import { Note } from "../types";

const EditNote: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [note, setNote] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    console.log("Fetching note with id:", id);  // <-- Debug log

    const fetchNote = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "notes", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();

          // Handle possible field name differences for the body content
          const bodyContent = data.body ?? data.content ?? "";

          setNote({
            id: docSnap.id,
            title: data.title,
            body: bodyContent,
            color: data.color,
            lastUpdated:
              data.lastUpdated instanceof Timestamp
                ? data.lastUpdated.toDate().toISOString()
                : data.lastUpdated || new Date().toISOString(),
          });
          setTitle(data.title || "");
          setContent(bodyContent);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching note: ", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, navigate]);

  const handleSave = async () => {
    if (!note) return;
    try {
      const docRef = doc(db, "notes", note.id);
      await updateDoc(docRef, {
        title,
        body: content,
        lastUpdated: serverTimestamp(),
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating note: ", error);
      alert("Failed to save changes.");
    }
  };

  const handleDelete = async () => {
    if (!note) return;
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        const docRef = doc(db, "notes", note.id);
        await deleteDoc(docRef);
        navigate("/");
      } catch (error) {
        console.error("Error deleting note: ", error);
        alert("Failed to delete note.");
      }
    }
  };

  if (loading) {
    return <p style={{ color: "#fff", padding: "1rem" }}>Loading note...</p>;
  }

  if (!note) {
    return <p style={{ color: "#fff", padding: "1rem" }}>Note not found.</p>;
  }

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

      <h2 style={{ fontWeight: 500, marginBottom: "1rem" }}>Edit Note</h2>

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

      <div className="d-flex gap-2 mt-3">
        <button
          className="btn btn-danger"
          onClick={handleDelete}
          style={{ fontWeight: 500 }}
        >
          Delete
        </button>

        <button
          className="btn btn-primary"
          onClick={handleSave}
          style={{ fontWeight: 500 }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditNote;
