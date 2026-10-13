import React from 'react';
import { showFormattedDate } from '../utils';
import NoteActionButton from './NoteActionButton';

function highlightText(text, searchKeyword) {
  if (!text) {
    return '';
  }

  if (!searchKeyword || !searchKeyword.trim()) {
    return text;
  }

  const keyword = searchKeyword.trim();
  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedKeyword})`, 'gi');
  const parts = String(text).split(regex);

  return parts.map((part, index) => {
    if (part.toLowerCase() === keyword.toLowerCase()) {
      return <mark key={index}>{part}</mark>;
    }
    return part;
  });
}

function NoteItem({ note, onDelete, onArchive, searchKeyword = '' }) {
  return (
    <div
      className="note-item"
      data-testid="note-item"
      data-note-id={note?.id}
    >
      <div className="note-item__content" data-testid="note-item-content">
        <h3 className="note-item__title" data-testid="note-item-title">
          {highlightText(note?.title, searchKeyword)}
        </h3>
        <p className="note-item__date" data-testid="note-item-date">
          {showFormattedDate(note?.createdAt)}
        </p>
        <p className="note-item__body" data-testid="note-item-body">
          {highlightText(note?.body, searchKeyword)}
        </p>
      </div>
      <div className="note-item__action" data-testid="note-item-action">
        <NoteActionButton
          variant="delete"
          onClick={() => onDelete && onDelete(note?.id)}
          data-testid="note-item-delete-button"
        >
          Delete
        </NoteActionButton>
        <NoteActionButton
          variant="archive"
          onClick={() => onArchive && onArchive(note?.id)}
          data-testid="note-item-archive-button"
        >
          {note?.archived ? 'Pindahkan' : 'Arsipkan'}
        </NoteActionButton>
      </div>
    </div>
  );
}

export { highlightText };
export default NoteItem;
