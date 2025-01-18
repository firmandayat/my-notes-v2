import React from "react";
import { addNote } from "../utils/local-data";
import NoteInput from "../components/NoteInput";
import { FaRegFileAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import PropTypes from "prop-types";

function AddPage() {
  const navigate = useNavigate();

  function onAddNoteHandler(title, body) {
    addNote(title, body);
    navigate("/");
  }

  return (
    <div className="add-note">
      <div className="note-app">
        <h1 className="note-app__header">
          <FaRegFileAlt />
          <Link className="home" to="/">
            My Notes
          </Link>
        </h1>
        <h3 className="note-app__title">Add Note</h3>
        <NoteInput addNote={onAddNoteHandler} />
      </div>
      <Footer />
    </div>
  );
}

AddPage.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string
}

export default AddPage;
