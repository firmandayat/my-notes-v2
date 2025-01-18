 
import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AddNote from "../pages/AddNote";
import DetailNote from "../pages/DetailNote";
import NotFoundPage from "../pages/NotFound";

function NoteApp() {
  return (
    <div className="note-app">
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/notes/new" element={<AddNote />} />
          <Route path="/notes/:id" element={<DetailNote />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default NoteApp;
