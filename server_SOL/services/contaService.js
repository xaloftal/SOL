const client = require('../Database/database');

module.exports = {
    GetContasMedico: (req, res) => {
        client.query('SELECT * FROM medico', (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
        });
    },
    GetContasUtente: (req, res) => {
        client.query('SELECT * FROM utente', (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
        });
    }
}