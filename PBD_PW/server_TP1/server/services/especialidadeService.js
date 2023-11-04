const client = require('../Database/database');

module.exports = {
    Create: (req, res) => {
        client.query('call inserir_especialidade($1)', [req.query.nome], (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
        });
    },
    Read: (req, res) => {
        if (req.query.id) {
            client.query('SELECT * FROM especialidade WHERE id_especi = $1', [req.query.id], (error, results) => {
                if (error) {
                    throw error
                }
                res.send(results.rows)
            });
        } else {
            client.query('SELECT * FROM especialidade', (error, results) => {
                if (error) {
                    throw error
                }
                res.send(results.rows)
            });
        }
    },
    Update: (req, res) => {
        client.query('call atualiza_especialidade($1, $2)', [req.query.id, req.query.nome], (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
        });
    },
    Delete: (req, res) => {
        client.query('call eliminar_especialidade($1)', [req.query.id], (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
        });
    },
    Count: (req, res) => {
        client.query('select count(*) from especialidade where nom_especi = $1;', [req.query.nome], (error, results) => {
            if (error) {
                throw error
            }

            res.send(results.rows)
        });
    }
}