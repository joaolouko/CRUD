const express = require('express');
const vendaController = require('../controllers/vendaController'); // Certifique-se de que o caminho está correto
const router = express.Router();

// Rota para listar todas as vendas
router.get('/', vendaController.getAllVendas);

// Rota para renderizar o formulário de criação de uma nova venda
router.get('/new', vendaController.renderCreateForm);

// Rota para criar uma nova venda
router.post('/', vendaController.createVenda);

// Rota para visualizar uma venda específica
router.get('/:id', vendaController.getVendaById);

// Rota para atualizar uma venda existente
router.put('/:id', vendaController.updateVenda);

// Rota para excluir uma venda
router.delete('/:id', vendaController.deleteVenda);

// Rota para pesquisa de vendas (opcional)
router.get('/search', vendaController.searchVendas);

module.exports = router;
