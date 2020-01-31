import Knex from 'knex';

import { knexConfig } from './knexFile';

export const knex = Knex(knexConfig[process.env.NODE_ENV || 'development']);

const createNotes = async () => {
  if (await knex.schema.hasTable('notes')) {
    return;
  }

  await knex.schema.createTable('notes', table => {
    table.increments();
    table.string('content');
  });
};

export const resetDB = async () => {
  await knex.schema.dropTableIfExists('notes');
};

export default async () => {
  await createNotes();
};
