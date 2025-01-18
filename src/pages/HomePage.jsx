import React from 'react';
import NoteList from '../components/NoteList';
import { getAllNotes, addNote, deleteNote } from '../utils/local-data';
import { FaSearch, FaPlusCircle, FaRegFileAlt } from 'react-icons/fa';
import Footer from '../components/Footer';
import { Link, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';

function SearchPageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <NoteApp searchParams={searchParams} setSearchParams={setSearchParams} />
  );
}

class NoteApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getAllNotes(),
      searchNote: props.searchParams.get('title') || '',
    };
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);
  }

  componentDidMount() {
    window.ScrollReveal().reveal('.reveal', {
      duration: 1000,
      distance: '50px',
      origin: 'bottom',
      reset: true,
    });
    window.ScrollReveal().reveal('.reveal1', {
      duration: 2000,
      distance: '100px',
      origin: 'bottom',
      reset: true,
    });
  }

  onDeleteHandler(id) {
    deleteNote(id);
    this.setState({ notes: getAllNotes() });
  }

  onAddNoteHandler({ title, body }) {
    addNote({ title, body });
    this.setState({ notes: getAllNotes() });
  }

  onArchiveHandler(id) {
    const notes = this.state.notes.map((note) => {
      if (note.id === id) {
        return { ...note, archived: !note.archived };
      }
      return note;
    });
    this.setState({ notes });
  }

  onSearchHandler(event) {
    const searchNote = event.target.value;
    this.setState({ searchNote });
    this.props.setSearchParams({ title: searchNote });
  }

  render() {
    const activeNotes = this.state.notes.filter((note) => !note.archived);
    const archivedNotes = this.state.notes.filter((note) => note.archived);

    const filteredActiveNotes = activeNotes.filter((note) =>
      note.title.toLowerCase().includes(this.state.searchNote.toLowerCase())
    );

    const filteredArchivedNotes = archivedNotes.filter((note) =>
      note.title.toLowerCase().includes(this.state.searchNote.toLowerCase())
    );

    return (
      <div className="note-app">
        <h1 className="note-app__header">
          <FaRegFileAlt />
          <Link className="home" to="/">
            My Notes
          </Link>
        </h1>

        <i className="note-app__search-wrapper">
          <FaSearch />
          <input
            className="note-app__search"
            type="text"
            placeholder="Search notes..."
            value={this.state.searchNote}
            onChange={this.onSearchHandler}
          />
        </i>

        <button>
          <Link className="add" to="/notes/new">
            <FaPlusCircle />
            <span> Note</span>
          </Link>
        </button>

        <section className="wrap">
          <h3 className="note-app__title-item reveal">Active Notes</h3>
          <NoteList
            notes={filteredActiveNotes}
            onDelete={this.onDeleteHandler}
            onArchived={this.onArchiveHandler}
          />
          <br />
          <br />
          <h3 className="note-app__title-item-archived reveal">
            Archived Notes
          </h3>
          <NoteList
            notes={filteredArchivedNotes}
            onDelete={this.onDeleteHandler}
            onArchived={this.onArchiveHandler}
          />
        </section>

        <Footer />
      </div>
    );
  }
}

NoteApp.propTypes = {
  title: PropTypes.string,
  createdAt: PropTypes.string,
  body: PropTypes.string,
  id: PropTypes.string,
  archived: PropTypes.bool,
  notes: PropTypes.arrayOf(PropTypes.object),
  searchParams: PropTypes.shape({
    get: PropTypes.func,
  }),
  setSearchParams: PropTypes.func,
};

export default SearchPageWrapper;
