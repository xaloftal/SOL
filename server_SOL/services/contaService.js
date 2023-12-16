const client = require('../Database/database');

module.exports = {
    GetContasMedico: (req, res) => {
        client.query("SELECT m.*, ut.*, e.* FROM medico m INNER JOIN especialidade e ON m.id_especialidade = e.id_especialidade INNER JOIN utilizador ut ON m.email_m = ut.email AND ut.estado_l = 'Existente';", (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
        });
    },
    GetContasUtente: (req, res) => {
        client.query("SELECT u.*, ut.* FROM utente u INNER JOIN utilizador ut ON u.email_u = ut.email AND ut.estado_l = 'Existente';", (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
        });
    },
    RemoveConta: (req, res) => {
        client.query('call eliminar_conta($1)', [req.query.email], (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
        });
    }
}