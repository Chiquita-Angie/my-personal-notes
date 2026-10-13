import React from 'react';
import { getInitialData } from '../utils';
import NoteInput from './NoteInput';
import NotesList from './NotesList';
import NoteSearch from './NoteSearch';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getInitialData(),
      searchKeyword: '',
    };

    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);
  }

  onAddNoteHandler({ title, body }) {
    const newNote = {
      id: +new Date(),
      title,
      body,
      createdAt: new Date().toISOString(),
      archived: false,
    };

    this.setState((prevState) => ({
      notes: [newNote, ...prevState.notes],
    }));
  }

  onDeleteHandler(id) {
    this.setState((prevState) => ({
      notes: prevState.notes.filter((note) => note.id !== id),
    }));
  }

  onArchiveHandler(id) {
    this.setState((prevState) => ({
      notes: prevState.notes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            archived: !note.archived,
          };
        }
        return note;
      }),
    }));
  }

  onSearchHandler(keyword) {
    this.setState({
      searchKeyword: keyword,
    });
  }

  render() {
    const { notes, searchKeyword } = this.state;

    const filteredNotes = (notes || []).filter((note) => {
      if (!searchKeyword || !searchKeyword.trim()) {
        return true;
      }
      const keyword = searchKeyword.trim().toLowerCase();
      const titleMatch = (note.title || '').toLowerCase().includes(keyword);
      const bodyMatch = (note.body || '').toLowerCase().includes(keyword);
      return titleMatch || bodyMatch;
    });

    const sortedNotes = [...filteredNotes].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const activeNotes = sortedNotes.filter((note) => !note.archived);
    const archivedNotes = sortedNotes.filter((note) => note.archived);

    return (
      <div className="note-app" data-testid="note-app">
        <div className="note-app__header" data-testid="note-app-header">
          <h1>Notes</h1>
          <NoteSearch
            searchKeyword={searchKeyword}
            onSearch={this.onSearchHandler}
          />
        </div>
        <div className="note-app__body" data-testid="note-app-body">
          <NoteInput addNote={this.onAddNoteHandler} />
          <section
            aria-labelledby="active-notes-title"
            data-testid="active-notes-section"
          >
            <h2 id="active-notes-title">
              <span>Catatan Aktif</span>{' '}
              <span className="notes-count">({activeNotes.length})</span>
            </h2>
            <NotesList
              notes={activeNotes}
              onDelete={this.onDeleteHandler}
              onArchive={this.onArchiveHandler}
              searchKeyword={searchKeyword}
              dataTestId="active-notes-list"
            />
          </section>
          <section
            aria-labelledby="archived-notes-title"
            data-testid="archived-notes-section"
          >
            <h2 id="archived-notes-title">
              <span>Arsip</span>{' '}
              <span className="notes-count">({archivedNotes.length})</span>
            </h2>
            <NotesList
              notes={archivedNotes}
              onDelete={this.onDeleteHandler}
              onArchive={this.onArchiveHandler}
              searchKeyword={searchKeyword}
              dataTestId="archived-notes-list"
            />
          </section>
        </div>
      </div>
    );
  }
}

export default App;
