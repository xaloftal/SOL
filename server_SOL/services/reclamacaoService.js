const client = require('../Database/database');

module.exports = {
    Create: (req, res) => {
        client.query('call criar_reclamacao($1, $2, $3)', [req.query.id_utente, req.query.descricao, req.query.data], (error, results) => {
            if (error) {
                throw error
            }

            res.send(results.rows)
        });
    },
    Read: (req, res) => {
            client.query('SELECT * FROM reclamacao', (error, results) => {
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