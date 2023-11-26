const express = require('express');
const router = express.Router();
const db_connection = require('../controller/db');

// Listar todos os currículos
router.get('/', async (req, res) => {
  try {
    const gen_db = await db_connection.setup_db();
    const result = await db_connection.get_curriculos();
    res.render('listar', { curriculos: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro no servidor');
  }
});

// Formulário para cadastrar um novo currículo
router.get('/cadastrar', (req, res) => {
  res.render('cadastrar');
});

// Cadastrar um novo currículo
router.post('/cadastrar', async (req, res) => {
  // Lógica para inserir dados no banco de dados
});

// Consultar informações de um currículo
router.get('/consultar/:id', async (req, res) => {
  // Lógica para consultar dados no banco de dados
});

module.exports = router;
