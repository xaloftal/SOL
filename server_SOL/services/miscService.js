const client = require('../Database/database');

module.exports = {
    GetUtentesFormConsultasMedicosCount: (req, res) => {
        client.query("select (select count(*) from utente) utentes, (select count(*) from formulario) formularios, (select count(*) from consulta where estado_c = 'Agendado') consultas, (select count(*) from medico) medicos;", (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
        });
    },
    GetMedicosByEspecialidade: (req, res) => {
        client.query('SELECT m.*,e.* FROM medico m INNER JOIN especialidade e ON m.id_especialidade = e.id_especialidade where m.nome_esp = $1;', [req.query.nome_esp], (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
        });
    }
}