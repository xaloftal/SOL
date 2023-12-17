const client = require('../Database/database');

module.exports = {
    RegistoUtente: (req, res) => {
        client.query('call signup_utente($1,$2,$3,$4,$5,$6,$7,$8)', [req.query.nome, req.query.email, req.query.password, req.query.nif, req.query.nmr_telefone,req.query.data_nascimento], (error, results) => {

            if (error) {
                throw error
            }
            console.log(results)
            res.send(results.rows)
        });
    },
    RegistoMedico: (req, res) => {
        client.query('call signup_medico($1,$2,$3,$4)', [req.query.nome, req.query.email, req.query.password, req.query.especialidade], (error, results) => {

            if (error) {
                throw error
            }
            console.log(results)
            res.send(results.rows)
        });
    },
    RegistoAdm: (req, res) => {
        client.query('call signup_adm($1, $2, $3)', [req.query.nome, req.query.email, req.query.password], (error, results) => {

            if (error) {
                throw error
            }
            console.log(results)
            res.send(results.rows)
        });
    },
}