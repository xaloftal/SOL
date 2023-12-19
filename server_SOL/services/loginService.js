const client = require('../Database/database');

module.exports = {
    DoLogin: (req, res) => {
        client.query('select t1.*, u2.password, u2.estado_l  from (select id_utente id, nome_u nome, email_u email from utente u  union ALL select id_adm id, nome_a nome, email_a email from administrativo a  union ALL select id_medico id, nome_m nome, email_m from medico m ) t1 left join utilizador u2 on u2.email = t1.email where u2.email = $1 and u2.password = $2;', [req.query.email, req.query.password], (error, results) => {

            if (error) {
                throw error
            }

            res.send(results.rows)
        });
    }
}