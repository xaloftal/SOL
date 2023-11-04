const client = require('../Database/database');

module.exports = {
    Create: (req, res) => {

    },
    Read: (req, res) => {
        client.query('SELECT * FROM doente WHERE id_doente = $1', [req.query.id, req.query.cheila], (error, results) => {
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