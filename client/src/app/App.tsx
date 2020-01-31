import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';

import './App.scss';
import { getInitialNotes } from '../features/Notes/notesStore';
import { NoteList } from '../features/Notes/NoteList';
import { Notepad } from '../features/Notes/Notepad';
import { State } from './rootReducer';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const noteList = useSelector((state: State) => state.notes.noteList);

  useEffect(() => {
    dispatch(getInitialNotes());
  }, [dispatch]);

  return (
    <div className="App">
      <Notepad />
      <NoteList notes={noteList} />
    </div>
  );
};

export default App;
