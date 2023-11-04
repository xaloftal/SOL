const client = require('../Database/database');

module.exports = {
    Create: (req, res) => {
        client.query('call inserir_exame($1, $2)', [req.query.id_consulta, req.query.nome_exame], (error, results) => {
            if (error) {
                throw error
            }

            res.send(results.rows)
        });
    },
    Read: (req, res) => {
        if(req.query.id) {
            client.query('SELECT * FROM exame WHERE id_consulta = $1', [req.query.id], (error, results) => {
                if (error) {
                    throw error
                }
                res.send(results.rows)
            });
        } else {
            client.query('SELECT * FROM exame', (error, results) => {
                if (error) {
                    throw error
                }
                res.send(results.rows)
            });
        }
    },
    Update: (req, res) => {
        client.query('call atualiza_exame($1, $2)', [req.query.id, req.query.nome_exame], (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
        });
    },
    Delete: (req, res) => {
        client.query('call eliminar_exame($1)', [req.query.id], (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
        });
    }
}