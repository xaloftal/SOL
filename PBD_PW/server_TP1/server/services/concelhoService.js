const client = require('../Database/database');

module.exports = {
    Create: (req, res) => {
        client.query('call inserir_concelho($1)', [req.query.nome], (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
        });
    },
    Read: (req, res) => {
        if(req.query.id) {
            client.query('SELECT * FROM concelho WHERE id_concelho = $1', [req.query.id], (error, results) => {
                if (error) {
                    throw error
                }
                res.send(results.rows)
            });
        } else {
            client.query('SELECT * FROM concelho', (error, results) => {
                if (error) {
                    throw error
                }
                res.send(results.rows)
            });
        }
    },
    Update: (req, res) => {
        client.query('call atualiza_concelho($1, $2)', [req.query.nomeOrigem, req.query.nomeFinal], (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
        });
    },
    
    Delete: (req, res) => {
        client.query('call eliminar_concelho($1)', [req.query.id], (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
        });
    }
}