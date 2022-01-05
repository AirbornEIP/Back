require('dotenv').config({ path: `.env.${process.env.NODE_ENV.length ? process.env.NODE_ENV : 'development'}` });

import script from './script/getVacMap';
import connectDB from './database';
import app from './app';

const port = process.env.PORT;

connectDB();

app.listen(port, () => {
    console.log(`backend listening at http://localhost:${port}`);
});
script.script();
