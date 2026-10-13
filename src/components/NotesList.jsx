import React from 'react';
import NoteItem from './NoteItem';

function NotesList({
  notes,
  onDelete,
  onArchive,
  searchKeyword = '',
  dataTestId = 'notes-list',
}) {
  const hasNotes = Boolean(notes && notes.length > 0);

  if (!hasNotes) {
    return (
      <div className="notes-list" data-testid={dataTestId}>
        <p
          className="notes-list__empty-message"
          data-testid={`${dataTestId}-empty`}
        >
          Tidak ada catatan
        </p>
      </div>
    );
  }

  const groupedNotes = notes.reduce((accumulator, note) => {
    const date = note?.createdAt ? new Date(note.createdAt) : new Date();
    const month = date.toLocaleDateString('id-ID', { month: 'long' });
    const year = date.getFullYear();
    const cleanMonth = month.toLowerCase().replace(/[^a-z0-9]/g, '');
    const groupKey = `${cleanMonth}-${year}`;
    const groupTitle = `${month} ${year}`;

    if (!accumulator[groupKey]) {
      accumulator[groupKey] = {
        groupKey,
        groupTitle,
        items: [],
      };
    }

    accumulator[groupKey].items.push(note);
    return accumulator;
  }, {});

  const groups = Object.values(groupedNotes);

  return (
    <div className="notes-list notes-list--grouped" data-testid={dataTestId}>
      {groups.map((group) => (
        <section
          key={group.groupKey}
          className="notes-group"
          data-testid={`${group.groupKey}-group`}
        >
          <div className="notes-group__header">
            <h3 className="notes-group__title">{group.groupTitle}</h3>
            <span
              className="notes-group__count"
              data-testid={`${group.groupKey}-group-count`}
            >
              {group.items.length}
            </span>
          </div>
          <div className="notes-group__items">
            {group.items.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={onDelete}
                onArchive={onArchive}
                searchKeyword={searchKeyword}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default NotesList;
