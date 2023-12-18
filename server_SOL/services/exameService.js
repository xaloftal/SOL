const client = require('../Database/database');

module.exports = {
    Create: (req, res) => {
        client.query('call inserir_exame($1)', [req.query.nome], (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
        });
    },
    Read: (req, res) => {
        client.query('SELECT * FROM exame', (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
        });
    }
}