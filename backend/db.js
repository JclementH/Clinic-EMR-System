const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    password: "ateethtant",
    host: "localhost",
    port: 5432,
    database: "clinic"
});
module.exports = pool;