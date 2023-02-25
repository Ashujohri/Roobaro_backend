var dotenv = require("dotenv");
dotenv.config();
const Pool = require("pg").Pool;

var pool = new Pool({
  host: process.env.HOST,
  port: process.env.PORTT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
module.exports = pool;
