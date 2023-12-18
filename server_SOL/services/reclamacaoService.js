const client = require('../Database/database');
const currentDate = new Date();

module.exports = {
    Create: (req, res) => {
        client.query('call criar_reclamacao($1, $2, $3)', [req.query.id_utente, req.query.descricao, currentDate], (error, results) => {
            if (error) {
                throw error
            }

            res.send(results.rows)
        });
    },
    ResponderReclamacao: (req, res) => {
        client.query('call resposta_recla_adm($1, $2, $3)', [req.query.id_recl, req.query.id_adm, req.query.resp], (error, results) => {
            if (error) {
                throw error
            }

            res.send(results.rows)
        });
    },
    Read: (req, res) => {
        client.query("SELECT r.*, to_char(r.data_recl, \'dd/mm/yyyy HH24:MI:SS\') data_recl_format FROM reclamacao r WHERE estado_r = 'Submetido'", (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
        });
    },
    Update: (req, res) => {
        client.query('SELECT r.*, to_char(r.data_recl, \'dd/mm/yyyy HH24:MI:SS\') data_recl_format FROM reclamacao r', (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
        });     
    },
    Delete: (req, res) => {

    }
}