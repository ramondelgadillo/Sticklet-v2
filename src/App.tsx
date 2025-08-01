import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewNote from "./pages/NewNote";
import EditNote from "./pages/EditNote";  // Import EditNote page
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<NewNote />} />
      <Route path="/edit/:id" element={<EditNote />} />  {/* Add this */}
    </Routes>
  );
};

export default App;
