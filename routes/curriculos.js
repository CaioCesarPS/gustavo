const express = require('express');
const router = express.Router();
const { CurriculosController } = require('../controller/curriculos.controller');

const curriculosController = new CurriculosController();

// Listar todos os currículos
router.get('/', curriculosController.getCurriculos);

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
