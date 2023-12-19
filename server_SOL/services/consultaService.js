const client = require('../Database/database');

module.exports = {
    Read: (req,res) => {
        client.query("SELECT * from consultas WHERE estado_consulta = 'Submetido'", (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
        });
    },
    MarcarConsulta: (req,res) => {
        client.query("call agendar_consulta($1,$2,$3,$4)",[req.query.id_med, req.query.id_utente, req.query.data_c, req.query.id_cons], (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
        });
    }
}