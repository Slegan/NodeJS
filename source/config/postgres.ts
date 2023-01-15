const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'users',
  password: '123',
  port: 5432,
})

export {
  pool
}