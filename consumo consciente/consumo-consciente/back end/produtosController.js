// produtosController.js
const db = require('./conexao');

exports.obterProdutos = (req, res) => {
  db.query('SELECT * FROM produtos ORDER BY criado_em DESC', (err, resultados) => {
    if (err) {
      console.error('Erro ao buscar produtos:', err);
      return res.status(500).json({ erro: 'Erro ao buscar produtos.' });
    }
    res.status(200).json(resultados);
  });
};