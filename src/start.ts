import dotenv from 'dotenv';
import script from './script/getVacMap';
// eslint-disable-next-line import/extensions
import connectDB from './database';
import app from './app';

dotenv.config({ path: `.env.${process.env.NODE_ENV.length ? process.env.NODE_ENV : 'development'}` });

const port = process.env.PORT;

connectDB();

app.listen(port, () => {
    console.log(`backend listening at http://localhost:${port}`);
});
script.script();

// if (process.env.NODE_ENV === 'development') {
//     let
// }
