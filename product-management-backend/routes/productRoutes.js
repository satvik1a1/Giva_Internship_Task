const express = require('express');
const pool = require('../db');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM products');
        res.json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Add a new product (authenticated)
router.post('/', authMiddleware, async (req, res) => {
    const { name, description, price, quantity } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO products (name, description, price, quantity) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, description, price, quantity]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Edit product (authenticated)
router.put('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { name, description, price, quantity } = req.body;
    try {
        const result = await pool.query(
            'UPDATE products SET name=$1, description=$2, price=$3, quantity=$4 WHERE id=$5 RETURNING *',
            [name, description, price, quantity, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete product (authenticated)
router.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM products WHERE id=$1', [id]);
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
