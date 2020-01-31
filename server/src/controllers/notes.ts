import { knex } from '../models/initDB';
import { Note } from '../models/models';

export const insertNote = async (note: Partial<Note>) =>
  await knex<Note>('notes').insert(note);

export const getAllNotes = async () => await knex<Note>('notes');

export const deleteNote = async (id: number) =>
  await knex<Note>('notes')
    .delete()
    .where('id', id);
