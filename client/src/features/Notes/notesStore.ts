import { Note } from '../../../../server/src/models/models';

// Actions
export const RECEIVE_NOTES = 'RECEIVE_NOTES';
export const ADD_NOTE = 'ADD_NOTE';
export const REMOVE_NOTE = 'REMOVE_NOTE';

interface ReceiveNotesAction {
  type: typeof RECEIVE_NOTES;
  noteList: Note[];
}

interface AddNoteAction {
  type: typeof ADD_NOTE;
  newNote: Note;
}

interface RemoveNoteAction {
  type: typeof REMOVE_NOTE;
  noteId: number;
}

export type NotesActionTypes =
  | ReceiveNotesAction
  | AddNoteAction
  | RemoveNoteAction;

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
    case REMOVE_NOTE:
      return {
        ...state,
        noteList: state.noteList.filter(
          element => element.id !== action.noteId,
        ),
      };
    default:
      return state;
  }
};

// Action Creators
const receiveNotes = (noteList: Note[]): NotesActionTypes => ({
  type: RECEIVE_NOTES,
  noteList,
});

const addNoteToList = (newNote: Note): NotesActionTypes => ({
  type: ADD_NOTE,
  newNote,
});

const removeNoteFromList = (noteId: number): NotesActionTypes => ({
  type: REMOVE_NOTE,
  noteId,
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
        const { id }: { id: number } = await res.json();

        dispatch(addNoteToList({ id, content }));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteNote = (noteId: number) => {
  return async (dispatch: Function) => {
    try {
      const res = await fetch(`/api/notes/${noteId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.status === 200) dispatch(removeNoteFromList(noteId));
    } catch (error) {
      console.error(error);
    }
  };
};
