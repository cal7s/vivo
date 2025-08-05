const bcrypt = require('bcryptjs');
const db = require('./conexao');

// Cadastro de usuário
exports.cadastrar = async (req, res) => {
  try {
    const { nome, email, senha, data_nascimento, genero, cidade, estado } = req.body;
    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: 'Preencha todos os campos obrigatórios.' });
    }
    const senhaHash = await bcrypt.hash(senha, 8);

    db.query(
      'INSERT INTO usuarios (nome, email, senha_hash, data_nascimento, genero, cidade, estado) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nome, email, senhaHash, data_nascimento, genero, cidade, estado],
      (err) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ erro: 'E-mail já cadastrado.' });
          }
          console.error('Erro ao cadastrar usuário:', err);
          return res.status(500).json({ erro: 'Erro ao cadastrar usuário.' });
        }
        res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
      }
    );
  } catch (error) {
    console.error('Erro ao processar cadastro:', error);
    res.status(500).json({ erro: 'Erro interno ao cadastrar usuário.' });
  }
};

// Login de usuário
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).json({ erro: 'Preencha todos os campos.' });
    }

    db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
      if (err) {
        console.error('Erro ao buscar usuário:', err);
        return res.status(500).json({ erro: 'Erro ao realizar login.' });
      }
      if (results.length === 0) {
        return res.status(401).json({ erro: 'Usuário não encontrado.' });
      }

      const usuario = results[0];
      const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash);

      if (!senhaCorreta) {
        return res.status(401).json({ erro: 'Senha incorreta.' });
      }
      res.status(200).json({ mensagem: 'Login realizado com sucesso!' });
    });
  } catch (error) {
    console.error('Erro ao processar login:', error);
    res.status(500).json({ erro: 'Erro interno ao realizar login.' });
  }
};

// Remova qualquer código SQL ou comandos de criação de banco/tabela deste arquivo!
// Eles devem ser executados apenas no MySQL, não no código JavaScript.
