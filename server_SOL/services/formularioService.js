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
    ResponderFormulario: (req, res) => {
        client.query('call responder_formulario($1, $2, $3)', [req.query.id_form, req.query.id_med, req.query.obsv], (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
        });
    },
    PrescreverForm: (req, res) => {
        client.query('call inserir_prescricao_form($1, $2)', [req.query.id_form, req.query.id_med, req.query.obsv], (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
        });
    },
    PrescreverExameForm: (req, res) => {
        client.query('call responder_formulario($1, $2, $3)', [req.query.id_form, req.query.id_med, req.query.obsv], (error, results) => {
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
        client.query("SELECT f.*, fp.* FROM formularios f INNER JOIN prescricoes_formulario pf ON f.id_utente = pf.id_utente AND estado_formulario = 'Respondido' AND pf.id_medico = $1", [req.query.id_med], (error, results) => {
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