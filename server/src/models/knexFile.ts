import { Config } from 'knex';
import { knexSnakeCaseMappers } from 'objection';

export const knexConfig: { [env: string]: Config } = {
  test: {
    client: 'sqlite3',
    connection: {
      filename: './db_test.sqlite',
    },
    useNullAsDefault: true,
    ...knexSnakeCaseMappers(),
  },
  development: {
    client: 'sqlite3',
    connection: {
      filename: './db.sqlite',
    },
    useNullAsDefault: true,
    ...knexSnakeCaseMappers(),
  },
  production: {
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING_PROD,
    ...knexSnakeCaseMappers(),
  },
};
