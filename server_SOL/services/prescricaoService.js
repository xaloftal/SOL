const client = require('../Database/database');

module.exports = {
    GetPrescricaoMedica: (req, res) => {
        if(req.query.id) {
            client.query('SELECT * FROM prescricao WHERE id_prescricao = $1', [req.query.id], (error, results) => {
                if (error) {
                    throw error
                }
                res.send(results.rows)
            });
        } else if (req.query.id_doente) {
            client.query("select COALESCE(to_char(horario , 'MM-DD-YYYY HH24:MI:SS'), '') horario, nom_med, nom_especi, medicamento, exame  from consultas c where c.id_doente = $1;", [req.query.id_doente], (error, results) => {
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
    }
}