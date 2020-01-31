import app, { port } from './app';
import initDB from './models/initDB';

/**
 * Init DB
 */
initDB();

app.listen(port, () => console.log(`App listening on port ${port}`));
