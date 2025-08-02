// conexao.js
const mysql = require('mysql2');
require('dotenv').config();

const conexao = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

conexao.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err.message);
    process.exit(1);
  }
  console.log('Conectado ao MySQL');
});

module.exports = conexao;

