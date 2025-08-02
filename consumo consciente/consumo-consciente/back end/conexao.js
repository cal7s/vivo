const mysql = require('mysql2');
require('dotenv').config();

const conexao = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

conexao.connect(err => {
  if (err) throw err;
  console.log('Conectado ao MySQL');
});

module.exports = conexao;
