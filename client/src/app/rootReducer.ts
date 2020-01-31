import { combineReducers } from 'redux';
import { notes, NotesState } from '../features/Notes/notesStore';

export interface State {
  notes: NotesState;
}

const reducers = combineReducers({ notes });

export default reducers;
