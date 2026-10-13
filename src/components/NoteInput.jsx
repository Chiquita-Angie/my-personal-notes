import React, { useState } from 'react';

function NoteInput({ addNote, onCreateNote }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddNote = addNote || onCreateNote;

  const onTitleChangeEventHandler = (event) => {
    const inputTitle = event.target.value.slice(0, 50);
    setTitle(inputTitle);
  };

  const onBodyChangeEventHandler = (event) => {
    const inputBody = event.target.value;
    setBody(inputBody);
    if (errorMessage && inputBody.length >= 10) {
      setErrorMessage('');
    }
  };

  const onSubmitEventHandler = (event) => {
    event.preventDefault();

    if (body.length < 10) {
      setErrorMessage('Isi catatan minimal harus 10 karakter');
      return;
    }

    if (handleAddNote) {
      handleAddNote({ title, body });
    }

    setTitle('');
    setBody('');
    setErrorMessage('');
  };

  const remainingChars = 50 - title.length;

  return (
    <div className="note-input" data-testid="note-input">
      <h2>Buat catatan</h2>

      {errorMessage && (
        <p className="note-input__feedback note-input__feedback--error">
          {errorMessage}
        </p>
      )}

      <form
        onSubmit={onSubmitEventHandler}
        data-testid="note-input-form"
      >
        <p
          className={`note-input__title__char-limit ${remainingChars < 10 ? 'note-input__title__char-limit--warn' : ''}`.trim()}
          data-testid="note-input-title-remaining"
        >
          Sisa karakter: {remainingChars}
        </p>
        <input
          className="note-input__title"
          type="text"
          placeholder="Ini adalah judul ..."
          value={title}
          onChange={onTitleChangeEventHandler}
          required
          data-testid="note-input-title-field"
        />
        <textarea
          className="note-input__body"
          placeholder="Tuliskan catatanmu di sini ..."
          value={body}
          onChange={onBodyChangeEventHandler}
          required
          data-testid="note-input-body-field"
        />
        <button type="submit" data-testid="note-input-submit-button">
          Buat
        </button>
      </form>
    </div>
  );
}

export default NoteInput;
