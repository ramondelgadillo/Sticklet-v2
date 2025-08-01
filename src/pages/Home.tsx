import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase"; // your firebase config file
import NoteCard from "../components/NoteCard";
import FloatingButton from "../components/FloatingButton";
import DeleteAllButton from "../components/DeleteAllButton";
import { Note } from "../types";

// Helper function to format Firestore timestamps or ISO strings
function formatTimestamp(timestamp: any): string {
  const dateObj = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);
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

const Home: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    // Reference to notes collection, ordered by lastUpdated descending
    const notesRef = collection(db, "notes");
    const q = query(notesRef, orderBy("lastUpdated", "desc"));

    // Subscribe to realtime updates
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notesData: Note[] = [];
      querySnapshot.forEach((doc) => {
        notesData.push({ id: doc.id, ...doc.data() } as Note);
      });
      setNotes(notesData);
    });

    return () => unsubscribe();
  }, []);

  // Delete single note from Firestore
  const handleDelete = async (idToDelete: string) => {
    try {
      await deleteDoc(doc(db, "notes", idToDelete));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Delete all notes
  const handleDeleteAll = async () => {
    if (!window.confirm("Are you sure you want to delete all notes?")) return;
    try {
      // Delete all docs one by one (Firestore does not support batch delete in client SDK)
      for (const note of notes) {
        await deleteDoc(doc(db, "notes", note.id));
      }
    } catch (error) {
      console.error("Error deleting all notes:", error);
    }
  };

  return (
    <div className="container mt-4" style={{ color: "#fff" }}>
      {/* Header with icon and title */}
      <header className="d-flex align-items-center mb-4">
        <i
          className="bi bi-stickies"
          style={{ fontSize: "28px", marginRight: "10px", color: "#ffcc80" }}
          aria-hidden="true"
        ></i>
        <h1 style={{ fontWeight: 500, margin: 0 }}>Sticklet</h1>
      </header>

      {notes.length === 0 ? (
        <p className="text-center text-muted">No notes yet. Click "+" to add one!</p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {notes.map((note) => (
            <div className="col" key={note.id}>
              <NoteCard note={note} handleDelete={handleDelete} />
            </div>
          ))}
        </div>
      )}

      <FloatingButton />
      {notes.length > 0 && <DeleteAllButton onDeleteAll={handleDeleteAll} />}
    </div>
  );
};

export default Home;
