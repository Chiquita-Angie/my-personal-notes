import React from 'react';

function NoteSearch({
  searchKeyword = '',
  keyword = '',
  onSearch,
  search,
  onSearchChange,
}) {
  const currentKeyword = searchKeyword || keyword || search || '';
  const handleSearch = onSearch || onSearchChange;

  return (
    <div className="note-search" data-testid="note-search">
      <input
        type="text"
        placeholder="Cari catatan ..."
        value={currentKeyword}
        onChange={(event) => handleSearch && handleSearch(event.target.value)}
        data-testid="note-search-input"
      />
      {currentKeyword && (
        <button
          type="button"
          className="note-search__clear"
          onClick={() => handleSearch && handleSearch('')}
          aria-label="Hapus kata kunci pencarian"
        >
          &times;
        </button>
      )}
    </div>
  );
}

export default NoteSearch;
