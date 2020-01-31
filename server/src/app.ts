import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';

import { notesRouter } from './routes/notes';

/**
 * Init Express
 */
const app = express();
export const port = process.env.port || 8000;
export const appUrl = `http://127.0.0.1:${port}`;
const staticFolder = [__dirname, '../../client/build'];

app.use(express.static(path.join(...staticFolder)));
app.use(bodyParser.json());

app.use('/api/notes', notesRouter);

// Default route
app.get('*', (_req, res) => res.send());

export default app;
