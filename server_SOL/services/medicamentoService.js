const client = require('../Database/database');

module.exports = {
    Create: (req, res) => {
        client.query('call inserir_medicamento($1, $2)', [req.query.nome, req.query.forma], (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
        });
    },
    Read: (req, res) => {
        client.query('SELECT * FROM medicamento', (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
        });
    }
}