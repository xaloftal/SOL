const client = require('../Database/database');

module.exports = {
    DoLogin: (req, res) => {
        client.query('select u.* from utilizador lu inner join utilizador u on u.email like lu.email where lu.email like $1 and lu.password like $2;', [req.query.email, req.query.password], (error, results) => {

            if (error) {
                throw error
            }

            res.send(results.rows)
        });
    }
}