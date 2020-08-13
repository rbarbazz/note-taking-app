import request from 'supertest';

import { Note } from '../models/models';
import initDB, { knex, resetDB } from '../models/initDB';
import app from '../app';

const base = '/api/notes';

describe('Notes', () => {
  beforeAll(async (done) => {
    await resetDB();
    await initDB();
    done();
  });

  afterAll((done) => knex.destroy(done));

  test('POST /api/notes', async () => {
    const newNote: Partial<Note> = {
      content: 'Hello World!',
    };

    const res = await request(app).post(base).send(newNote);

    expect(res.status).toEqual(200);
    expect(res.body['id']).toBeGreaterThan(0);
  });

  test('GET /api/notes/', async () => {
    const res = await request(app).get(base).send();

    expect(res.status).toEqual(200);
    expect(res.body['notes'].length).toEqual(1);
  });

  test('DELETE /api/notes/:id', async () => {
    let res = await request(app).delete(`${base}/1`).send();

    expect(res.status).toEqual(200);

    res = await request(app).get(base).send();

    expect(res.status).toEqual(200);
    expect(res.body['notes'].length).toEqual(0);
  });
});
