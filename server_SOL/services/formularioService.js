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
        client.query('call inserir_prescricao($1, null, null, null)', [req.query.id_form], (error, results) => {
            if (error) {
                throw error
            }

            client.query('select max(p.id_prescricao) id_prescricao from prescricao p', [], (error, results) => {
                if (error) {
                    throw error
                }
                res.send(results.rows)
            });
        });
    },
    PrescreverConsulta: (req, res) => {
        client.query('call pedido_consulta($1, $2, null)', [req.query.id_medico, req.query.id_formulario], (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows);
        });
    },
    PrescreverExameForm: (req, res) => {
        client.query('call inserir_exame_prescricao($1, $2, $3)', [req.query.descricao, req.query.id_exame, req.query.id_prescricao], (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
        });
    },
    PrescreverMedicamentoForm: (req, res) => {
        client.query('call inserir_medicamento_prescricao($1, $2, $3)', [req.query.descricao, req.query.id_medicamento, req.query.id_prescricao], (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
        });
    },
    GetFormulariosNaoRespondidos: (req, res) => {
        if (req.query.id_utente) {
            client.query("SELECT f.*, to_char(f.data_formulario, \'dd/mm/yyyy HH24:MI:SS\') data_form_format FROM formularios f WHERE f.estado_formulario = 'Submetido' AND f.id_utente = $1", [req.query.id_utente], (error, results) => {
                if (error) {
                    throw error
                }
                res.send(results.rows)
            })
        } else {
            client.query("SELECT f.*, to_char(f.data_formulario, \'dd/mm/yyyy HH24:MI:SS\') data_form_format FROM formularios f WHERE f.estado_formulario = 'Submetido'", (error, results) => {
                if (error) {
                    throw error
                }
                res.send(results.rows)
            })
        }
    },
    GetFormulariosRespondidos: (req, res) => {
        if (req.query.id_med) {
            client.query("SELECT f.*, fp.* FROM formularios f INNER JOIN prescricoes_formularios pf ON f.id_utente = pf.id_utente AND estado_formulario = 'Respondido' AND pf.id_medico = $1", [req.query.id_med], (error, results) => {
                if (error) {
                    throw error
                }
                res.send(results.rows)
            });
        } else if (req.query.id_utente) {
            client.query("SELECT f.*, pf.* FROM formularios f INNER JOIN prescricoes_formularios pf ON f.id_utente = pf.id_utente AND estado_formulario = 'Respondido' AND pf.id_utente = $1", [req.query.id_utente], (error, results) => {
                if (error) {
                    throw error
                }
                res.send(results.rows)
            });
        }
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