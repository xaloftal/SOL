const { Pool } = require('pg');
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'saude_online',
  password: '1234',
  port: 5432,
})

const getUserById = (req, res) => {
    pool.query('SELECT * FROM utente WHERE id_utente = $1', [req.id], (error, results) => {
        if (error) {
            throw error;
        }

        res.status(200).json(results.rows);
    })
}

const createUser = (req, res) => {
    pool.query('call signup_utente($1, $2, $3, $4, $5, $6)', [req.query._nom, req.query._ema, req.query._pass, req.query._nif, req.query._tele, req.query._dat], (error, results) => {
        if (error) {
            throw error
        }

        res.status(200).json(results.rows);
    });
}

module.exports = {
    getUserById,
    createUser
}
