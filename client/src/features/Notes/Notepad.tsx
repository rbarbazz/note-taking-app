import React, { useState } from 'react';

import './Notepad.scss';

export const Notepad: React.FC = () => {
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
            console.log(newNote);
            setNewNote('');
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};
