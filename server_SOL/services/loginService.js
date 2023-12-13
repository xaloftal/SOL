const client = require('../Database/database');

module.exports = {
    DoLogin: (req, res) => {
        client.query('select d.* from utente ld inner join doente d on d.email like ld.email where ld.email like $1 and ld.pass like $2;', [req.query.email, req.query.password], (error, results) => {

            if (error) {
                throw error
            }

            res.send(results.rows)
        });
    }
}