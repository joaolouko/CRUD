const Venda = require('../models/vendaModel');
const User = require('../models/userModel'); // Para obter usuários
const Produto = require('../models/produtoModel'); // Para obter produtos

const vendaController = {
    // Renderiza o formulário para criar uma nova venda
    renderCreateForm: (req, res) => {
        // Obtém todos os usuários e produtos para preencher os selects no formulário
        User.getAll((err, users) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            Produto.getAll((err, produtos) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.render('vendas/create', { users, produtos });
            });
        });
    },

    // Cria uma nova venda
    createVenda: (req, res) => {
        const newVenda = {
            user_id: req.body.user_id,
            produto_id: req.body.produto_id,
            quantidade: req.body.quantidade,
        };

        Venda.create(newVenda, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/vendas');
        });
    },

    // Obtém todos as vendas
    getAllVendas: (req, res) => {
        Venda.getAll((err, vendas) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('vendas/index', { vendas });
        });
    },

    // Obtém uma venda específica pelo ID
    getVendaById: (req, res) => {
        const vendaId = req.params.id;

        Venda.findById(vendaId, (err, venda) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!venda) {
                return res.status(404).json({ message: 'Venda not found' });
            }
            res.render('vendas/show', { venda });
        });
    },

    // Atualiza uma venda específica
    updateVenda: (req, res) => {
        const vendaId = req.params.id;
        const updatedVenda = {
            user_id: req.body.user_id,
            produto_id: req.body.produto_id,
            quantidade: req.body.quantidade,
        };

        Venda.update(vendaId, updatedVenda, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/vendas');
        });
    },

    // Exclui uma venda específica
    deleteVenda: (req, res) => {
        const vendaId = req.params.id;

        Venda.delete(vendaId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/vendas');
        });
    },

    // Pesquisa vendas com base em algum critério (opcional)
    searchVendas: (req, res) => {
        const search = req.query.search || '';

        Venda.searchByCriteria(search, (err, vendas) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ vendas });
        });
    },
};

module.exports = vendaController;
