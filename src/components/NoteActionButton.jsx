import React from 'react';

function NoteActionButton({ variant, onClick, children, className = '', ...restProps }) {
  const isDelete = variant === 'delete';
  const defaultClassName = isDelete
    ? 'note-item__delete-button'
    : 'note-item__archive-button';
  const defaultTestId = isDelete
    ? 'note-item-delete-button'
    : 'note-item-archive-button';
  const defaultLabel = isDelete ? 'Delete' : 'Arsipkan';

  const combinedClassName = className ? `${defaultClassName} ${className}` : defaultClassName;
  const testId = restProps['data-testid'] || defaultTestId;
  const label = children || defaultLabel;

  return (
    <button
      type="button"
      className={combinedClassName}
      onClick={onClick}
      data-testid={testId}
      aria-label={typeof label === 'string' ? label : defaultLabel}
      {...restProps}
    >
      {label}
    </button>
  );
}

export default NoteActionButton;
