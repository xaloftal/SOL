const client = require('../Database/database');

module.exports = {
    Read: (req,res) => {
        client.query("SELECT * from consultas WHERE estado_consulta = 'Submetido'", (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
        });
    }
}