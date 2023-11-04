const client = require('../Database/database');

module.exports = {
    Create: (req, res) => {
        client.query('call inserir_prescricao($1, $2)', [req.query.id_consulta, req.query.nome_medicamento], (error, results) => {
            if (error) {
                throw error
            }

            res.send(results.rows)
        });
    },
    Read: (req, res) => {
        if(req.query.id) {
            client.query('SELECT * FROM prescricao WHERE id_prescricao = $1', [req.query.id], (error, results) => {
                if (error) {
                    throw error
                }
                res.send(results.rows)
            });
        } else {
            client.query('SELECT * FROM prescricao', (error, results) => {
                if (error) {
                    throw error
                }
                res.send(results.rows)
            });
        }
    },
    Update: (req, res) => {
        client.query('call atualiza_prescricao($1, $2)', [req.query.id, req.query.medicamento], (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
        });
    },
    Delete: (req, res) => {
        client.query('call eliminar_prescricao($1)', [req.query.id], (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
        });
    }
}