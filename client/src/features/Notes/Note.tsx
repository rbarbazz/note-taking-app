import React from 'react';

import './Note.scss';
import { deleteNote } from './notesStore';
import { ReactComponent as CloseIcon } from '../../icons/Close.svg';
import { useDispatch } from 'react-redux';

export const Note: React.FC<{ content: string; noteId: number }> = ({
  content,
  noteId,
}) => {
  const dispatch = useDispatch();

  return (
    <p className="note-container">
      <button
        className="close-btn-container"
        onClick={() => dispatch(deleteNote(noteId))}
      >
        <CloseIcon />
      </button>
      {content}
    </p>
  );
};
