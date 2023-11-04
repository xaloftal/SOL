const client = require('../Database/database');

module.exports = {
    GetDoentesFormConsultasMedicosCount: (req, res) => {
        client.query('select (select count(*) from doente) doentes, (select count(*) from formulario) formularios, (select count(*) from consulta) consultas, (select count(*) from medico) medicos;', (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
        });
    },
    GetMedicosByEspecialidade: (req, res) => {
        if(req.query.especialidade_id) {
            client.query('select * from medicos_especialidades me where ME.id_especi = $1;', [req.query.especialidade_id], (error, results) => {
                if (error) {
                    throw error
                }
                res.send(results.rows)
            });
        } else {
            client.query('select * from medicos_especialidades me;', (error, results) => {
                if (error) {
                    throw error
                }
                res.send(results.rows)
            });
        }
    },
    DoLogin: (req, res) => {
        client.query('select d.* from login_doe ld inner join doente d on d.email like ld.email where ld.email like $1 and ld.pass like $2;', [req.query.email, req.query.password], (error, results) => {

            if (error) {
                throw error
            }

            res.send(results.rows)
        });
    }
}