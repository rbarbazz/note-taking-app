import { Router } from 'express';

import { insertNote, getAllNotes, deleteNote } from '../controllers/notes';
import { Note } from '../models/models';

export const notesRouter = Router();

notesRouter.get('/', async (_req, res) => {
  const notes = await getAllNotes();

  return res.send({ notes });
});

notesRouter.post('/', async (req, res) => {
  const { content }: Partial<Note> = req.body;

  const newNoteId = await insertNote({ content });

  return res.send({ id: newNoteId[0] });
});

notesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const noteId = parseInt(id);

  await deleteNote(noteId);

  return res.send();
});
