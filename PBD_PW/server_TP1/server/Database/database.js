const pg = require('pg');
const Pool = pg.Pool

const connectionString = 'postgres://adm:PLi0nrtRtGS8NbFsctud9ftbPdzcJyFr@dpg-ci0svahmbg5ffcg0tl20-a.frankfurt-postgres.render.com/tp1?ssl=true'
 
const pool = new Pool({
  connectionString,
})

module.exports = pool;