const pg = require('pg');
const Pool = pg.Pool

const connectionString = 'postgres://admin:postgres://admin:lZGdAC9gx0MnSJcz8f4oJWSh2yn9Wtm1@dpg-cl2iqpiuuipc73d7p9t0-a.frankfurt-postgres.render.com/saude_online@dpg-cl2iqpiuuipc73d7p9t0-a.frankfurt-postgres.render.com/saude_online'
 
const pool = new Pool({
  connectionString,
})

module.exports = pool;