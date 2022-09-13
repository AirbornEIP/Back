import dotenv from 'dotenv';
import scripts from './script/getVacMap';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import test from './script/createTestUser';
import connectDB from './database';
import app from './app';

dotenv.config({ path: `.env.${process.env.NODE_ENV.length ? process.env.NODE_ENV : 'development'}` });

const port = process.env.PORT;

connectDB();

app.listen(port, () => {
    console.log(`backend listening at http://localhost:${port}`);
});
scripts.script();
