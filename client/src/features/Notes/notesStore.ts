import { Note } from '../../../../server/src/models/models';

// Actions
export const RECEIVE_NOTES = 'RECEIVE_NOTES';
export const ADD_NOTE = 'ADD_NOTE';

interface ReceiveNotesAction {
  type: typeof RECEIVE_NOTES;
  noteList: Note[];
}

interface AddNoteAction {
  type: typeof ADD_NOTE;
  newNote: Note;
}

export type NotesActionTypes = ReceiveNotesAction | AddNoteAction;

// Reducer
export type NotesState = {
  noteList: Note[];
};

const initialState: NotesState = {
  noteList: [],
};

export const notes = (state = initialState, action: NotesActionTypes) => {
  switch (action.type) {
    case RECEIVE_NOTES:
      return { ...state, noteList: action.noteList };
    case ADD_NOTE:
      return { ...state, noteList: [action.newNote, ...state.noteList] };
    default:
      return state;
  }
};

// Action Creators
const receiveNotes = (noteList: Note[]): NotesActionTypes => ({
  type: RECEIVE_NOTES,
  noteList,
});

const addNote = (newNote: Note): NotesActionTypes => ({
  type: ADD_NOTE,
  newNote,
});

// Side Effects
export const getInitialNotes = () => {
  return async (dispatch: Function) => {
    try {
      const res = await fetch('/api/notes', { method: 'GET' });
      if (res.status === 200) {
        const { notes }: { notes: Note[] } = await res.json();

        dispatch(receiveNotes(notes.reverse()));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const addNewNote = (content: string) => {
  return async (dispatch: Function) => {
    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      if (res.status === 200) {
        const { noteId }: { noteId: number } = await res.json();

        dispatch(addNote({ id: noteId, content }));
      }
    } catch (error) {
      console.error(error);
    }
  };
};
