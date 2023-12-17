const client = require('../Database/database');
const currentDate = new Date().toDateString(); // Use toISOString to get a string in the format 'YYYY-MM-DDTHH:mm:ss.sssZ'

module.exports = {
    Create: (req, res) => {
        client.query('call criar_formulario($1, $2, $3, $4, $5)', [req.query.id_utente, req.query.descricao, currentDate, req.query.esp, res.id_form], (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
        });
    }
}