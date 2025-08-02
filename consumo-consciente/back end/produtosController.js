const mysql = require('mysql2');
const db = mysql.createConnection({ /* ...config... */ });
module.exports = db;

const db = require('../db/conexao');

exports.obterProdutos = (req, res) => {
  db.query('SELECT * FROM produtos ORDER BY criado_em DESC', (err, resultados) => {
    if (err) return res.status(500).send(err.message); // Mostra mensagem de erro
    res.json(resultados);
  });
};
