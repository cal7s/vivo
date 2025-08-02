const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');
const router = express.Router();
const produtosController = require('../controllers/produtosController');

router.get('/', produtosController.obterProdutos);

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const conexao = mysql.createConnection({
  host: 'localhost',
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'seu_banco'
});

app.post('/cadastro', async (req, res) => {
  const { nome, email, senha, data_nascimento, genero, cidade, estado } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).send('Preencha todos os campos obrigatórios.');
  }
  const senha_hash = await bcrypt.hash(senha, 10);
  conexao.query(
    'INSERT INTO usuarios (nome, email, senha_hash, data_nascimento, genero, cidade, estado) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [nome, email, senha_hash, data_nascimento, genero, cidade, estado],
    (err, results) => {
      if (err) return res.status(500).send('Erro ao cadastrar');
      res.send('Usuário cadastrado com sucesso!');
    }
  );
});

module.exports = router;

<form class="cadastro-box" action="http://localhost:3000/cadastro" method="POST">
    <h2>Cadastro</h2>
    <input type="text" name="nome" placeholder="Nome completo" required />
    <input type="email" name="email" placeholder="E-mail" required />
    <input type="password" name="senha" placeholder="Senha" required />
    <input type="password" name="confirmar_senha" placeholder="Confirme a senha" required />
    <input type="date" name="data_nascimento" placeholder="Data de nascimento" required />
    <select name="genero" required>
        <option value="" disabled selected>Gênero</option>
        <option value="Feminino">Feminino</option>
        <option value="Masculino">Masculino</option>
        <option value="Outro">Outro</option>
        <option value="Prefiro não dizer">Prefiro não dizer</option>
    </select>
    <input type="text" name="cidade" placeholder="Cidade" required />
    <input type="text" name="estado" placeholder="Estado" required />
    <button type="submit">Cadastrar</button>
    <a href="login.html" class="login-link">Já tem conta? Faça login</a>
    <a href="index.html" class="voltar-link">Voltar para página principal</a>
</form>
