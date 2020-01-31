import { useDispatch } from 'react-redux';
import React, { useState } from 'react';

import './Notepad.scss';
import { addNewNote } from './notesStore';

export const Notepad: React.FC = () => {
  const dispatch = useDispatch();
  const [newNote, setNewNote] = useState('');

  return (
    <div className="notepad-container">
      <div className="new-note-container">
        <label htmlFor="new-note">New Note</label>
        <textarea
          cols={50}
          id="new-note"
          name="new-note"
          onChange={event => setNewNote(event.target.value)}
          rows={10}
          value={newNote}
        />
        <button
          className="generic-btn"
          id="add-note-btn"
          onClick={() => {
            if (newNote.length > 0) {
              dispatch(addNewNote(newNote));
              setNewNote('');
            }
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};
