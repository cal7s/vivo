const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const produtosController = require('./produtosController');
const db = require('./conexao'); // Use a conexão centralizada

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Exemplo de rota para produtos
app.get('/', produtosController.obterProdutos);

// Cadastro de usuário
app.post('/cadastro', async (req, res) => {
  const { nome, email, senha, data_nascimento, genero, cidade, estado } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).send('Preencha todos os campos obrigatórios.');
  }
  try {
    const senha_hash = await bcrypt.hash(senha, 10);
    db.query(
      'INSERT INTO usuarios (nome, email, senha_hash, data_nascimento, genero, cidade, estado) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nome, email, senha_hash, data_nascimento, genero, cidade, estado],
      (err, results) => {
        if (err) return res.status(500).send('Erro ao cadastrar');
        res.send('Usuário cadastrado com sucesso!');
      }
    );
  } catch (err) {
    res.status(500).send('Erro ao processar senha.');
  }
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));

// Configurações do banco de dados
const DB_HOST = 'localhost';
const DB_USER = 'seu_usuario';
const DB_PASSWORD = 'sua_senha';
const DB_NAME = 'reuse_jovem';

// Caminho do arquivo: C:\Users\cauat\Documents\consumo consciente\consumo-consciente\back end\server.js
