import request from 'supertest';

import { Note } from '../models/models';
import initDB, { knex, resetDB } from '../models/initDB';
import app from '../app';

describe('Notes', () => {
  beforeAll(async done => {
    await resetDB();
    await initDB();
    done();
  });

  afterAll(done => knex.destroy(done));

  test('POST /', async () => {
    const newNote: Partial<Note> = {
      content: 'Hello World!',
    };

    const res = await request(app)
      .post('/')
      .send(newNote);

    expect(res.status).toEqual(200);
    expect(res.body['id']).toBeGreaterThan(0);
  });

  test('GET /', async () => {
    const res = await request(app)
      .get('/')
      .send();

    expect(res.status).toEqual(200);
    expect(res.body['notes'].length).toEqual(1);
  });

  test('DELETE /:id', async () => {
    let res = await request(app)
      .delete(`/1`)
      .send();

    expect(res.status).toEqual(200);

    res = await request(app)
      .get(`/`)
      .send();

    expect(res.status).toEqual(200);
    expect(res.body['notes'].length).toEqual(0);
  });
});
