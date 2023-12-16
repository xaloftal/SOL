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
    },
    GetFormulariosNaoRespondidos: (req, res) => {
        client.query("SELECT * FROM formularios where estado_formulario = 'Submetido'", (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
        });
    },
    GetFormulariosRespondidos: (req, res) => {
        client.query("SELECT * FROM formularios where estado_formulario = 'Respondido'", (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
        });
    },
    IgnorarFormulario: (req, res) => {
      client.query('call ignorar_formulario($1, $2)', [req.query.id_form, req.query.id_med], (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
        });
    },
}