import React from 'react';

import './NoteList.scss';
import { Note } from './Note';
import { Note as NoteModel } from '../..//../../server/src/models/models';

export const NoteList: React.FC<{ notes: NoteModel[] }> = ({ notes }) => (
  <div className="note-list-container">
    {notes.map(note => (
      <Note content={note.content} key={`note-${note.id}`} />
    ))}
  </div>
);
