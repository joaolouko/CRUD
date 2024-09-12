const db = require('../config/db');

const Venda = {
    create: (venda, callback) => {
        const query = 'INSERT INTO vendas (user_id, produto_id) VALUES (?, ?)';
        db.query(query, [venda.user_id, venda.produto_id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM vendas WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM vendas';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    update: (id, venda, callback) => {
        const query = 'UPDATE vendas SET user_id = ?, produto_id = ? WHERE id = ?';
        db.query(query, [venda.user_id, venda.produto_id, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM vendas WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    }
};

module.exports = Venda;
