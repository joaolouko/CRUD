const db = require('../config/db');

const Venda = {
    // Cria uma nova venda
    create: (venda, callback) => {
        const query = 'INSERT INTO vendas (user_id, produto_id, quantidade) VALUES (?, ?, ?)';
        db.query(query, [venda.user_id, venda.produto_id, venda.quantidade], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    // Encontra uma venda pelo ID
    findById: (id, callback) => {
        const query = 'SELECT * FROM vendas WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    // Obtém todas as vendas
    getAll: (callback) => {
        const query = 'SELECT * FROM vendas';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    // Atualiza uma venda pelo ID
    update: (id, venda, callback) => {
        const query = 'UPDATE vendas SET user_id = ?, produto_id = ?, quantidade = ? WHERE id = ?';
        db.query(query, [venda.user_id, venda.produto_id, venda.quantidade, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    // Exclui uma venda pelo ID
    delete: (id, callback) => {
        const query = 'DELETE FROM vendas WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    // Pesquisa vendas com base em critérios, como ID de usuário ou ID de produto
    searchByCriteria: (criteria, callback) => {
        const query = 'SELECT * FROM vendas WHERE user_id LIKE ? OR produto_id LIKE ?';
        db.query(query, [`%${criteria}%`, `%${criteria}%`], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    }
};

module.exports = Venda;
