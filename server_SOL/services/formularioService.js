const client = require('../Database/database');

module.exports = {
    Create: (req, res) => {
        client.query('call criar_formulario($1, $2, $3)', [req.query.id_doente, req.query.especialidade, req.query.descricao], (error, results) => {
            if (error) {
                throw error
            }

            res.send(results.rows)
        });
    },
    Read: (req, res) => {
        if(req.query.id) {
            client.query('SELECT * FROM ver_formulario WHERE id_formulario = $1', [req.query.id], (error, results) => {
                if (error) {
                    throw error
                }
                res.send(results.rows)
            });
        } else if (req.query.id_doente) {
            client.query('select * from ver_formulario vf where vf.id_doente = $1;', [req.query.id_doente], (error, results) => {
                if (error) {
                    throw error
                }
                res.send(results.rows)
            });
        } else {
            client.query('SELECT * FROM ver_formulario', (error, results) => {
                if (error) {
                    throw error
                }
                res.send(results.rows)
            });
        }
    },
    Update: (req, res) => {
        client.query('call atualiza_formulario($1, $2, $3)', [req.query.id, req.query.id_medico, req.query.descricao], (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
        });
    },
    Delete: (req, res) => {
        client.query('call eliminar_formulario($1)', [req.query.id], (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
        });
    }
}