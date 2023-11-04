const client = require('../Database/database');

module.exports = {
  Create: (req, res) => {
    client.query('call inserir_distrito($1)', [req.query.nome], (error, results) => {
      if (error) {
        throw error
      }

      res.send(results.rows)
    });

  },
  Read: (req, res) => {
    if (req.query.id) {
      client.query('SELECT * FROM distrito WHERE id_distrito = $1', [req.query.id], (error, results) => {
        if (error) {
          throw error
        }

        res.send(results.rows)
      });
    } else {
      client.query('SELECT * FROM distrito', (error, results) => {
        if (error) {
          throw error
        }

        res.send(results.rows)
      });
    }

  },
  Update: (req, res) => {
    client.query('call atualiza_distrito($1, $2)', [req.query.nomeOrigem, rep.query.nomeFinal], (error, results) => {
      if (error) {
        throw error
      }

      res.send(results.rows)

    });

  },
  Delete: (req, res) => {
    client.query('call inserir_distrito($1)', [req.query.nome], (error, results) => {
      if (error) {
        throw error
      }

      res.send(results.rows)
    });
  }
}