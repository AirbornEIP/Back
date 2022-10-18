import dotenv from 'dotenv';
import scripts from './script/getVacMap';
// eslint-disable-next-line import/extensions
import connectDB from './database';

const app = require('./app.ts');

dotenv.config({ path: `.env.${process.env.NODE_ENV.length ? process.env.NODE_ENV : 'development'}` });

const port = process.env.PORT;

connectDB().then((r) => console.log('Connected'));

app.listen(port, () => {
    console.log(`backend listening at http://localhost:${port}`);
});

// scripts.script();
