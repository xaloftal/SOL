const pg = require('pg');
const Pool = pg.Pool

const connectionString = 'postgres://admin:postgres@dpg-cl2iqpiuuipc73d7p9t0-a.frankfurt-postgres.render.com/saude_online?ssl=true'

const pool = new Pool({
  connectionString,
})

module.exports = pool;