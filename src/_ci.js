require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

require("./database");

const _ = require("./app")


