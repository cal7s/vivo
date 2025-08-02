const bcrypt = require('bcryptjs');
const db = require('../db/conexao');
const conexao = require('./conexao');

exports.cadastrar = (req, res) => {
  const { nome, email, senha } = req.body;
  const senhaHash = bcrypt.hashSync(senha, 8);

  db.query(
    'INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)',
    [nome, email, senhaHash],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send('Usuário cadastrado com sucesso!');
    }
  );
};

exports.login = (req, res) => {
  const { email, senha } = req.body;

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(401).send('Usuário não encontrado');

    const usuario = results[0];
    const senhaCorreta = bcrypt.compareSync(senha, usuario.senha_hash);

    if (!senhaCorreta) return res.status(401).send('Senha incorreta');
    res.send('Login realizado com sucesso!');
  });
};

// Exemplo de consulta
conexao.query('SELECT * FROM usuarios', (err, results) => {
  if (err) throw err;
  console.log(results);
});

CREATE DATABASE reuse_jovem;
USE reuse_jovem;
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100),
  senha VARCHAR(255)
);
