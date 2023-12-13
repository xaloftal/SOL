const client = require('../Database/database');

module.exports = {
    Create: (req, res) => {

    },
    Read: (req, res) => {
        client.query('SELECT * FROM utente WHERE id_utente = $1', [req.query.id], (error, results) => {
            if (error) {
                throw error
            }

            res.send(results.rows)
        });
    },
    Update: (req, res) => {

    },
    Delete: (req, res) => {

    } 
}